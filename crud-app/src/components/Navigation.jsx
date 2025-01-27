import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-around">
        <Link to="/" className="hover:underline">Students</Link>
        <Link to="/classes" className="hover:underline">Classes</Link>
        <Link to="/sections" className="hover:underline">Sections</Link>
      </div>
    </nav>
  );
};

export default Navigation;