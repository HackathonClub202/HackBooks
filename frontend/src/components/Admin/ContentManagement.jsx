import React, { useState } from "react";
import { uploadChapter, fetchChapters } from "../../utils/api";

const ContentManagement = () => {
  const [chapter, setChapter] = useState({ title: "", pdf: null });
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setChapter({ ...chapter, pdf: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("title", chapter.title);
      formData.append("pdf", chapter.pdf);

      await uploadChapter(formData);
      const { data } = await fetchChapters();
      setChapters(data);
      setChapter({ title: "", pdf: null });
    } catch (err) {
      setError("Failed to upload chapter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Content Management</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Chapter Title"
          value={chapter.title}
          onChange={(e) => setChapter({ ...chapter, title: e.target.value })}
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 border rounded-lg"
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
        >
          {loading ? "Uploading..." : "Upload Chapter"}
        </button>
      </form>
    </div>
  );
};

export default ContentManagement;
