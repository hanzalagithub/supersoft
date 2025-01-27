import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClasses, addClass, deleteClass } from "../features/classesSlice";

const ClassList = () => {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes.data);
  const [className, setClassName] = useState("");
  const [classDesc, setClassDesc] = useState("");

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  const handleAddClass = () => {
    dispatch(addClass({ name: className, description: classDesc }));
    setClassName("");
    setClassDesc("");
  };

  const handleDeleteClass = (id) => {
    dispatch(deleteClass(id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Classes</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Class Name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={classDesc}
          onChange={(e) => setClassDesc(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddClass}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Class
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => (
            <tr key={cls.id}>
              <td className="py-2 px-4 border-b text-center">{cls.id}</td>
              <td className="py-2 px-4 border-b text-center">{cls.name}</td>
              <td className="py-2 px-4 border-b text-center">{cls.description}</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleDeleteClass(cls.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassList;
