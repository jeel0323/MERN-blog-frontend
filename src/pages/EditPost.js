import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../Editor";

function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((res) => {
      res.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
    });
  }, [id]);

  async function updatePost(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append('id',id)
    if (files?.[0]) {
      formData.append("files", files?.[0]);
    }

    const response = await fetch("http://localhost:4000/post", {
      method: "PUT",
      body: formData,
      credentials:'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  useEffect(() => {
    if (redirect) {
      Navigate(`/post/${id}`);
    }
  }, [redirect, Navigate, id]);

  return (
    <form onSubmit={updatePost} encType="multipart/form-data">
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

      <Editor onChange={setContent} value={content} />

      <button type="submit" style={{ marginTop: "10px" }}>
        Update Post
      </button>
    </form>
  );
}

export default EditPost;
