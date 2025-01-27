import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { deleteStudent, updateStudent } from '../features/studentsSlice';

const StudentList = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.data);
  const status = useSelector((state) => state.students.status);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({ name: '', class: '', section: '' });

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
  };

  const handleEdit = (student) => {
    setEditingStudent(student.id);
    setFormData({ name: student.name, class: student.class, section: student.section });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedStudent = {
      id: editingStudent,
      name: formData.name,
      class: formData.class,
      section: formData.section,
    };
    dispatch(updateStudent(updatedStudent));
    setEditingStudent(null); // Reset editing state
    setFormData({ name: '', class: '', section: '' }); // Reset form data
  };

  if (status === 'loading') {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center mt-4 text-red-500">Error loading students.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Student List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Class</th>
              <th className="py-2 px-4 border-b">Section</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-center">{student.id}</td>
                <td className="py-2 px-4 border-b text-center">
                  {editingStudent === student.id ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="border p-1"
                    />
                  ) : (
                    student.name
                  )}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {editingStudent === student.id ? (
                    <input
                      type="text"
                      name="class"
                      value={formData.class}
                      onChange={handleChange}
                      className="border p-1"
                    />
                  ) : (
                    student.class
                  )}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {editingStudent === student.id ? (
                    <input
                      type="text"
                      name="section"
                      value={formData.section}
                      onChange={handleChange}
                      className="border p-1"
                    />
                  ) : (
                    student.section
                  )}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {editingStudent === student.id ? (
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                      onClick={() => handleEdit(student)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;