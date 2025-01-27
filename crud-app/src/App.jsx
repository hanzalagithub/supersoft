import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchStudents } from './features/studentsSlice';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import ExportButton from './components/ExportButton';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-6">Student Management System</h1>
      <StudentForm />
      <StudentList />
      <ExportButton />
    </div>
  );
}

export default App;