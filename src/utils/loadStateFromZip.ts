import Papa from 'papaparse';

interface ZipCodeMapping {
  zipCode: string;
  state: string;
}

export const loadStateFromZip = async (): Promise<Record<string, string>> => {
  const response = await fetch('/path-to-your-csv-file/zip-to-state.csv'); // Adjust the path
  const csvText = await response.text();
  return new Promise((resolve) => {
    Papa.parse<ZipCodeMapping>(csvText, {
      header: true,
      complete: (results) => {
        const zipToStateMap: Record<string, string> = {};
        results.data.forEach((entry) => {
          zipToStateMap[entry.zipCode] = entry.state;
        });
        resolve(zipToStateMap);
      },
    });
  });
};
