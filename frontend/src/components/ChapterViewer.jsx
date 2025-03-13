import React from 'react';
import { useParams } from 'react-router-dom';

const ChapterViewer = () => {
  const { chapterId } = useParams();

  return (
    <div>
      <h1>Chapter {chapterId}</h1>
      <p>Content for Chapter {chapterId} goes here...</p>
    </div>
  );
};

export default ChapterViewer;
