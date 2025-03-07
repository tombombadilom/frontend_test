#!/usr/bin/env bash

# Exit on error, undefined variables, and prevent pipe errors
set -euo pipefail

# Check if a component name is provided
if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <component-name>"
  echo "Example: $0 button"
  exit 1
fi

COMPONENT_NAME="$1"

# Create a temporary file to store the results
TEMP_FILE=$(mktemp)

# Clean up on exit
trap 'rm -f "${TEMP_FILE}"' EXIT

# Find all source files
SOURCE_FILES=$(find src -type f \( -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" \) -not -path "src/components/ui/*")

# Check for imports of the component
for FILE in ${SOURCE_FILES}; do
  if grep -q "import.*from.*components/ui/${COMPONENT_NAME}" "${FILE}" || grep -q "import.*from.*[\"']/ui/${COMPONENT_NAME}[\"']" "${FILE}" || grep -q "import.*from.*[\"']\.\.*/ui/${COMPONENT_NAME}[\"']" "${FILE}"; then
    echo "${FILE}" >> "${TEMP_FILE}"
  fi
done

# Check if any files were found
if [[ -s "${TEMP_FILE}" ]]; then
  echo "true"
  echo "Component '${COMPONENT_NAME}' is used in the following files:"
  cat "${TEMP_FILE}"
  exit 0
else
  echo "false"
  echo "Component '${COMPONENT_NAME}' is not used in any file."
  exit 1
fi 