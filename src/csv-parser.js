import Papa from 'papaparse';

export default function fileToObject(file, fileName) {
    // Convert processed data to CSV string
    const csvContent = Papa.unparse(file);

    // Create a Blob object from the CSV string
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Create a File object from the Blob
    const processedFile = new File([blob], `${fileName}-processed.csv`);

    return processedFile;
}
