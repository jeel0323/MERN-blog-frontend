import React, { useEffect, useState } from "react";
import Post from "../components/Post";

function IndexPage() {
  const[posts,setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        console.log(posts);
        setPosts(posts);
      });
    });
  },[]);
  return (
    <>{
      posts.length>0 && posts.map(post=>{
        return <Post {...post}/>
      })
    }
    </>
  );
}

export default IndexPage;
