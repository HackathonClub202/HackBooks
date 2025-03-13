import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const chapters = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      <h2>Chapters</h2>
      <ul>
        {chapters.map((chapter) => (
          <li key={chapter}>
            <Link to={`/chapter/${chapter}`}>Chapter {chapter}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
