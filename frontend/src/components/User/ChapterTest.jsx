// src/components/ChapterTest.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChapterTest = ({ chapterId }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`/chapter/${chapterId}/test`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    };
    fetchQuestions();
  }, [chapterId]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(`/chapter/${chapterId}/test/submit`, { answers });
      alert('Test submitted successfully');
    } catch (error) {
      console.error('Failed to submit test:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Chapter Test</h2>
      {questions.map((q, idx) => (
        <div key={q._id} className="mb-6">
          <p className="text-lg font-semibold text-gray-700 mb-2">{q.question}</p>
          <input
            type="text"
            value={answers[q._id] || ''}
            onChange={(e) => setAnswers({ ...answers, [q._id]: e.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        {loading ? 'Submitting...' : 'Submit Test'}
      </button>
    </div>
  );
};

export default ChapterTest;