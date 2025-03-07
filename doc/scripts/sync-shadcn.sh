#!/usr/bin/env bash

# Exit on error, undefined variables, and prevent pipe errors
set -euo pipefail

# Default values
AUTO_YES=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    --yes)
      AUTO_YES=true
      shift
      ;;
    *)
      echo "Unknown option: $1"
      echo "Usage: $0 [--yes]"
      exit 1
      ;;
  esac
done

# Function to clean up temporary files
cleanup() {
  if [[ -f "${TEMP_FILE}" ]]; then
    rm -f "${TEMP_FILE}"
  fi
  if [[ -f "${USED_COMPONENTS_FILE}" ]]; then
    rm -f "${USED_COMPONENTS_FILE}"
  fi
  if [[ -f "${INSTALLED_COMPONENTS_FILE}" ]]; then
    rm -f "${INSTALLED_COMPONENTS_FILE}"
  fi
  if [[ -f "${UNUSED_COMPONENTS_FILE}" ]]; then
    rm -f "${UNUSED_COMPONENTS_FILE}"
  fi
  if [[ -f "${DIRECT_IMPORTS_FILE}" ]]; then
    rm -f "${DIRECT_IMPORTS_FILE}"
  fi
}

# Set up trap to ensure cleanup on exit
trap cleanup EXIT INT TERM

echo "Analyzing Shadcn UI components..."

# Check if required tools are available
for cmd in grep sed find tr sort uniq mktemp comm; do
  if ! command -v "${cmd}" &> /dev/null; then
    echo "Error: ${cmd} command not found" >&2
    exit 1
  fi
done

# Create temporary files
TEMP_FILE=$(mktemp)
USED_COMPONENTS_FILE=$(mktemp)
INSTALLED_COMPONENTS_FILE=$(mktemp)
UNUSED_COMPONENTS_FILE=$(mktemp)
DIRECT_IMPORTS_FILE=$(mktemp)

if [[ ! -f "${TEMP_FILE}" || ! -f "${USED_COMPONENTS_FILE}" || ! -f "${INSTALLED_COMPONENTS_FILE}" || ! -f "${UNUSED_COMPONENTS_FILE}" || ! -f "${DIRECT_IMPORTS_FILE}" ]]; then
  echo "Error: Failed to create temporary files" >&2
  exit 1
fi

# Step 1: Find all installed components in src/components/ui
echo "Finding installed components..."
if [[ -d "src/components/ui" ]]; then
  find "src/components/ui" -maxdepth 1 -name "*.tsx" | while read -r FILE; do
    # Extract filename without path and extension
    FILENAME=$(basename "${FILE}" .tsx)
    echo "${FILENAME}" >> "${INSTALLED_COMPONENTS_FILE}"
  done
else
  echo "Warning: src/components/ui directory not found" >&2
  exit 1
fi

# Sort the installed components file
sort "${INSTALLED_COMPONENTS_FILE}" -o "${INSTALLED_COMPONENTS_FILE}"

INSTALLED_COUNT=$(wc -l < "${INSTALLED_COMPONENTS_FILE}")
echo "Found ${INSTALLED_COUNT} installed components."

# Step 2: Find all source files
echo "Finding components used in the codebase..."
SOURCE_FILES=$(find src -type f \( -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" \) -not -path "src/components/ui/*")

# Extract component imports from @/components/ui
for FILE in ${SOURCE_FILES}; do
  if [[ -f "${FILE}" ]]; then
    # Find imports from @/components/ui
    grep -o "from \"@/components/ui/[^\"]*\"" "${FILE}" 2>/dev/null | \
      sed 's/from "@\/components\/ui\///g' | \
      sed 's/"//g' >> "${TEMP_FILE}" || true
    
    # Also check for direct imports from packages (like sonner)
    grep -o "from \"sonner\"" "${FILE}" 2>/dev/null && echo "sonner" >> "${DIRECT_IMPORTS_FILE}" || true
    # Add other special cases here if needed
  fi
done

# Check if we found any components
if [[ ! -s "${TEMP_FILE}" && ! -s "${DIRECT_IMPORTS_FILE}" ]]; then
  echo "No Shadcn UI components found in the project."
  exit 0
fi

# Clean up the component names and create a unique sorted list
cat "${TEMP_FILE}" > "${USED_COMPONENTS_FILE}"
if [[ -s "${DIRECT_IMPORTS_FILE}" ]]; then
  cat "${DIRECT_IMPORTS_FILE}" >> "${USED_COMPONENTS_FILE}"
fi

sort "${USED_COMPONENTS_FILE}" | uniq > "${TEMP_FILE}"
mv "${TEMP_FILE}" "${USED_COMPONENTS_FILE}"

USED_COUNT=$(wc -l < "${USED_COMPONENTS_FILE}")
echo "Found ${USED_COUNT} components used in the codebase."

# Step 3: Find components that are installed but not used (unused)
echo "Identifying unused components..."
UNUSED_COMPONENTS=$(comm -23 "${INSTALLED_COMPONENTS_FILE}" "${USED_COMPONENTS_FILE}")
echo "${UNUSED_COMPONENTS}" > "${UNUSED_COMPONENTS_FILE}"

# Check if there are any unused components
if [[ ! -s "${UNUSED_COMPONENTS_FILE}" ]]; then
  echo "No unused components found. All installed components are being used."
else
  UNUSED_COUNT=$(wc -l < "${UNUSED_COMPONENTS_FILE}")
  echo "Found ${UNUSED_COUNT} unused components:"
  echo "${UNUSED_COMPONENTS}" | tr '\n' ' '
  echo -e "\n"
  
  # Ask for confirmation to remove unused components
  if [[ "${AUTO_YES}" == true ]]; then
    REMOVE_UNUSED=true
  else
    echo "Do you want to remove these unused components? This will delete the following files:"
    while IFS= read -r COMPONENT; do
      echo "  - src/components/ui/${COMPONENT}.tsx"
    done <<< "${UNUSED_COMPONENTS}"
    echo
    
    read -p "Remove unused components? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      REMOVE_UNUSED=true
    else
      REMOVE_UNUSED=false
      echo "Unused components will not be removed."
    fi
  fi
  
  # Remove unused components if confirmed
  if [[ "${REMOVE_UNUSED}" == true ]]; then
    echo "Removing unused components..."
    while IFS= read -r COMPONENT; do
      if [[ -f "src/components/ui/${COMPONENT}.tsx" ]]; then
        rm -f "src/components/ui/${COMPONENT}.tsx"
        echo "Removed: src/components/ui/${COMPONENT}.tsx"
      fi
    done <<< "${UNUSED_COMPONENTS}"
    echo "Unused components have been removed."
  fi
fi

# Step 4: Generate the update command for used components
USED_COMPONENTS=$(cat "${USED_COMPONENTS_FILE}")
echo "Components to update:"
echo "${USED_COMPONENTS}" | tr '\n' ' '
echo -e "\n"

# Generate the update command
UPDATE_CMD="nvm use 23 && pnpm dlx shadcn@latest add"
while IFS= read -r COMPONENT; do
  # Skip empty lines
  if [[ -z "${COMPONENT}" ]]; then
    continue
  fi
  
  UPDATE_CMD="${UPDATE_CMD} ${COMPONENT}"
done <<< "${USED_COMPONENTS}"
UPDATE_CMD="${UPDATE_CMD} --override"

# Ask for confirmation unless --yes is provided
if [[ "${AUTO_YES}" != true ]]; then
  echo "This will update the following Shadcn UI components with the latest version:"
  echo "${USED_COMPONENTS}" | tr '\n' ' '
  echo -e "\n"
  echo "Update command to be executed:"
  echo "${UPDATE_CMD}"
  echo -e "\n"
  
  read -p "Do you want to continue with the update? (y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Update operation cancelled."
    exit 0
  fi
fi

# Execute the update command
echo "Updating Shadcn UI components..."
eval "${UPDATE_CMD}"

echo "Shadcn UI components have been updated successfully."

# Make the script executable
chmod +x "$(basename "$0")" 