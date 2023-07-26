import React, { useState,useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import Editor from "../Editor";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const Navigate = useNavigate();
  const createnewPost = async (e) => {
    e.preventDefault();

    if (!title || !summary || !content) {
      alert(
        "Please fill in all required fields (Title, Summary, and Content)."
      );
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("files", files[0]);

    try {
      const response = await fetch("http://localhost:4000/post", {
        method: "POST",
        body: formData,
        credentials:'include',
      });
      if (response.ok) {
        setRedirect(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (redirect) {
      Navigate("/");
    }
  }, [redirect, Navigate]);


  return (
    <form onSubmit={createnewPost} encType="multipart/form-data">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      <input type="file" onChange={(e) => setFiles(e.target.files)} />

      <Editor value={content} onChange={setContent}/>

      <button type="submit" style={{ marginTop: "10px" }}>
        Create blog
      </button>
    </form>
  );
};

export default CreatePost;
