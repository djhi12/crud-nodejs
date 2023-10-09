// Sample data validation function
function validateItem(item) {
    if (!item || typeof item !== 'object') {
        return false;
    }
    if (!item.name || typeof item.name !== 'string' || item.name.trim() === '') {
        return false;
    }
    if (!item.description || typeof item.description !== 'string') {
        return false;
    }
    // Add more validation rules as needed
    return true;
}

module.exports = validateItem;
