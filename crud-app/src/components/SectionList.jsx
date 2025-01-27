
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSection, updateSection } from '../features/sectionsSlice';
const SectionList = () => {
    const dispatch = useDispatch();
    const sections = useSelector((state) => state.sections.data);
    const [editingSection, setEditingSection] = useState(null);
    const [formData, setFormData] = useState({ name: '' });
  
    const handleDelete = (id) => {
      dispatch(deleteSection(id));
    };
  
    const handleEdit = (section) => {
      setEditingSection(section.id);
      setFormData({ name: section.name });
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const updatedSection = { id: editingSection, name: formData.name };
      dispatch(updateSection(updatedSection));
      setEditingSection(null);
      setFormData({ name: '' });
    };
  
    return (
      <div>
        <h2>Section List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section) => (
              <tr key={section.id}>
                <td>
                  {editingSection === section.id ? (
                    <input name="name" value={formData.name} onChange={handleChange} />
                  ) : (
                    section.name
                  )}
                </td>
                <td>
                  {editingSection === section.id ? (
                    <button onClick={handleSubmit}>Save</button>
                  ) : (
                    <button onClick={() => handleEdit(section)}>Edit</button>
                  )}
                  <button onClick={() => handleDelete(section.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default SectionList;
  