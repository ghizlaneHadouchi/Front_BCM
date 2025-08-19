// src/utils/stringUtils.js

/**
 * Formats a camelCase string into a human-readable format
 * @param {string} text - The camelCase text to format
 * @returns {string} - The formatted text with proper spacing and capitalization
 * @example
 * formatCamelCase("dataDeclarationJob") // returns "Data Declaration Job"
 * formatCamelCase("dataProcessingJob") // returns "Data Processing Job"
 * formatCamelCase("batchAPIJob") // returns "Batch API Job"
 */
export const formatCamelCase = (text) => {
  if (!text) return ''

  return (
    text
      // Add space before capital letters
      .replace(/([A-Z])/g, ' $1')
      // Handle consecutive capital letters (like "API")
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
      // Trim extra spaces and capitalize first letter
      .trim()
      .replace(/^./, (str) => str.toUpperCase())
  )
}
