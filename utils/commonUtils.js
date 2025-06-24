export function convertBooleanToPascalCaseString(value) {
    // Converts a boolean value to a PascalCase string representation
    if (typeof value !== 'boolean') {
        throw new Error('Input must be a boolean');
    }
    return value ? 'True' : 'False';
}