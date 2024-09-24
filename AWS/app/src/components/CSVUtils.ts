import Papa from 'papaparse'; // Importing the papaparse library for CSV parsing

/**
 * Converts a data array to CSV format.
 * 
 * This function uses the `Papa.unparse` method from the `papaparse` library to convert the provided
 * data array into a CSV string.
 * 
 * @param {any[]} data - The data array to be converted into CSV format. Each element in the array is expected
 * to be an object where keys are column names and values are cell values.
 * 
 * @returns {string} - A string representing the data in CSV format.
 */
export const convertToCSV = (data: any[]) => {
  const csv = Papa.unparse(data); // Use Papa.unparse to convert the data array to a CSV string
  return csv; // Return the resulting CSV string
};
