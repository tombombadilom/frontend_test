#!/usr/bin/env bash

# Exit on error, undefined variables, and prevent pipe errors
set -euo pipefail

# Function to clean up temporary files
cleanup() {
  if [[ -f "${TEMP_FILE}" ]]; then
    rm -f "${TEMP_FILE}"
  fi
  if [[ -f "${INSTALLED_COMPONENTS_FILE}" ]]; then
    rm -f "${INSTALLED_COMPONENTS_FILE}"
  fi
  if [[ -f "${USED_COMPONENTS_FILE}" ]]; then
    rm -f "${USED_COMPONENTS_FILE}"
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
INSTALLED_COMPONENTS_FILE=$(mktemp)
USED_COMPONENTS_FILE=$(mktemp)

if [[ ! -f "${TEMP_FILE}" || ! -f "${INSTALLED_COMPONENTS_FILE}" || ! -f "${USED_COMPONENTS_FILE}" ]]; then
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
fi

# Sort the installed components file
sort "${INSTALLED_COMPONENTS_FILE}" -o "${INSTALLED_COMPONENTS_FILE}"

echo "Found $(wc -l < "${INSTALLED_COMPONENTS_FILE}") installed components."

# Step 2: Find all TSX files in src directory excluding src/components/ui
echo "Finding components used in the codebase..."
FILES=$(find src -name "*.tsx" -not -path "src/components/ui/*")

# Extract component imports from @/components/ui
for FILE in ${FILES}; do
  if [[ -f "${FILE}" ]]; then
    grep -o "from \"@/components/ui/[^\"]*\"" "${FILE}" 2>/dev/null | \
      sed 's/from "@\/components\/ui\///g' | \
      sed 's/"//g' >> "${TEMP_FILE}" || true
  fi
done

# Check if we found any components
if [[ ! -s "${TEMP_FILE}" ]]; then
  echo "No Shadcn UI components found in the project."
  exit 0
fi

# Clean up the component names and create a unique sorted list
cat "${TEMP_FILE}" | \
  sort | \
  uniq > "${USED_COMPONENTS_FILE}"

echo "Found $(wc -l < "${USED_COMPONENTS_FILE}") components used in the codebase."

# Step 3: Find components that are used but not installed
echo "Identifying missing components..."
MISSING_COMPONENTS=$(comm -23 "${USED_COMPONENTS_FILE}" "${INSTALLED_COMPONENTS_FILE}")

# Check if there are any missing components
if [[ -z "${MISSING_COMPONENTS}" ]]; then
  echo "All used components are already installed. No action needed."
  exit 0
fi

echo "Found the following components that need to be installed:"
echo "${MISSING_COMPONENTS}" | tr '\n' ' '
echo -e "\n"

# Generate the installation command
INSTALL_CMD="nvm use 23 && pnpm dlx shadcn@latest add"
while IFS= read -r COMPONENT; do
  # Skip empty lines
  if [[ -z "${COMPONENT}" ]]; then
    continue
  fi
  
  INSTALL_CMD="${INSTALL_CMD} ${COMPONENT}"
done <<< "${MISSING_COMPONENTS}"

echo "Installation command:"
echo "${INSTALL_CMD}"
echo -e "\n"

echo "To execute this command, run:"
echo "bash find-shadcn-components.sh | grep '^nvm use' | bash"

# Make the script executable
chmod +x "$(basename "$0")" 