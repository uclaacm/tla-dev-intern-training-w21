import React, { useState, useEffect } from 'react';
import './App.css';

const BACKEND_URL = "http://localhost:8081";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  // Get posts on load
  useEffect(() => {
    fetch(`${BACKEND_URL}/msg`, {
      method: 'get',
      mode: 'cors'
    })
      .then(r => r.json())
      .then(j => setPosts(j.posts))
      .catch(e => setError(`${e}`));
  }, []);

  const submit = formEvent => {
    formEvent.preventDefault();
    const form = formEvent.target.elements;

    const newPost = {
      author: form["author"].value,
      content: form["content"].value,
    };
    console.log('Sending to the backend', newPost);

    fetch(`${BACKEND_URL}/msg`, {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify({
        post: newPost,
      }),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(r => r.json())
      .then(j => setPosts(j.posts))
      .catch(e => setError(`${e}`));
  };

  return (
    <div className="App">
      <h1>Message Board</h1>
      <form onSubmit={submit}>
        <h2>Create a Post</h2>
        <input name="author" placeholder="Your name" required />
        <br />
        <textarea name="content" placeholder="Write your post!" required />
        <br />
        <button type="submit">Post!</button>
      </form>

      {error ?
        <p className="error">Error was encountered: {error}</p>
        : posts ?
          posts.map((v, i) => (
            <div className="post" key={i}>
              {v.content}
              by
              {v.author}
            </div>
        ))
          : <p>Post something!</p>
      }
    </div>
  );
}
