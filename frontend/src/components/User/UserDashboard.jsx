// src/components/UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';

const UserDashboard = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get('/progress');
        setProgress(response.data.percentage);
      } catch (error) {
        console.error('Failed to fetch progress:', error);
      }
    };
    fetchProgress();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Progress</h2>
      <div className="flex justify-center">
        <div className="w-32 h-32">
          <CircularProgressbar
            value={progress}
            text={`${progress}%`}
            styles={{
              path: { stroke: '#3B82F6' },
              text: { fill: '#1E3A8A', fontSize: '16px' },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;