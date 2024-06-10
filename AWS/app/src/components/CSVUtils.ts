// CSVUtils.ts
import Papa from 'papaparse';

export const convertToCSV = (data: any[]) => {
  const csv = Papa.unparse(data);
  return csv;
};
