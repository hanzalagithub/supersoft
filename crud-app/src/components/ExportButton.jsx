import { useSelector } from 'react-redux';
import * as XLSX from 'xlsx';

const ExportButton = () => {
  const students = useSelector((state) => state.students.data);

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
    XLSX.writeFile(workbook, 'students.xlsx');
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={handleExport}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
      >
        Export to Excel
      </button>
    </div>
  );
};

export default ExportButton;