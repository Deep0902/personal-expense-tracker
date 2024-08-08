// src/utils/csvUtils.ts

export function downloadCSV(data: any[], filename: string) {
  if (!data || data.length === 0) {
    alert("No data available to download.");
    return;
  }

  // Convert JSON data to CSV format
  const csvRows: string[] = [];
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(','));

  for (const row of data) {
    const values = headers.map(header => JSON.stringify(row[header], (_key, value) => value ?? ''));
    csvRows.push(values.join(','));
  }

  // Create a Blob with CSV data and trigger download
  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
