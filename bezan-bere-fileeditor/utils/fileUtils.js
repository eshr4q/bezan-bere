const fs = require('fs').promises;
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');

// Helper function to get the file path for a given year and month
const getMonthFile = (year, month) => {
    // Ensure month is two digits (e.g., 5 -> "05")
    const monthStr = String(month).padStart(2, '0');
    return path.join(dataDir, `habits-${year}-${monthStr}.json`);
};

// Ensures the data directory and the specific month file exist.
// Creates them with a default structure if they don't.
const ensureMonthFile = async (year, month) => {
    try {
        await fs.mkdir(dataDir, { recursive: true });
        const filePath = getMonthFile(year, month);
        try {
            await fs.access(filePath);
        } catch (error) {
            // File doesn't exist, create it with default content
            const defaultData = { year, month, habits: [] };
            await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2), 'utf8');
        }
    } catch (error) {
        console.error("Error ensuring month file:", error);
        throw new Error('Could not ensure file existence.');
    }
};

// Reads data for a given year and month.
// THIS IS THE MOST IMPORTANT FIX.
const readMonthData = async (year, month) => {
    const filePath = getMonthFile(year, month);
    try {
        // Ensure the file exists before reading
        await ensureMonthFile(year, month); 
        
        const fileContent = await fs.readFile(filePath, 'utf8');
        
        // If file is empty, return default structure
        if (fileContent.trim() === '') {
            return { year, month, habits: [] };
        }
        
        const data = JSON.parse(fileContent);

        // Validate that the parsed data has the correct structure
        if (typeof data === 'object' && data !== null && Array.isArray(data.habits)) {
            return data;
        } else {
            // If structure is invalid, return the default
            console.warn(`Warning: Invalid data structure in ${filePath}. Returning default.`);
            return { year, month, habits: [] };
        }

    } catch (error) {
        console.error(`Error reading or parsing file ${filePath}:`, error);
        // If any error occurs (read error, parse error), return a safe default structure
        return { year, month, habits: [] };
    }
};

// Writes data for a given year and month
const writeMonthData = async (year, month, data) => {
    try {
        await fs.mkdir(dataDir, { recursive: true });
        const filePath = getMonthFile(year, month);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error("Error writing month data:", error);
        throw new Error('Could not write to file.');
    }
};

module.exports = {
    ensureMonthFile,
    readMonthData,
    writeMonthData
};
