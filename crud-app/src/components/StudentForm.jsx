import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStudent, updateStudent } from '../features/studentsSlice';

const StudentForm = ({ student }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: student?.id || '',
    name: student?.name || '',
    class: student?.class || '',
    section: student?.section || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (student) {
      dispatch(updateStudent(formData));
    } else {
      dispatch(addStudent(formData));
    }
    setFormData({ id: '', name: '', class: '', section: '' });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{student ? 'Edit Student' : 'Add Student'}</h2>
      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Class</label>
          <input
            type="text"
            name="class"
            value={formData.class}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Section</label>
          <input
            type="text"
            name="section"
            value={formData.section}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-auto"
        >
          {student ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;