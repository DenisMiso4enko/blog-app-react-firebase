import React from "react";
import { Link } from "react-router-dom";

const Post = ({ id, userId, title, text, createdAt, getPosts }) => {
  return (
    <div className="posts__item" id={id}>
      <div className="post__head">
        <h1>{title}</h1>
        <span>Create at: {createdAt}</span>
      </div>

      <p>{text}</p>

      <button>
        <Link to={`/post/${id}`}>More ---></Link>
      </button>
    </div>
  );
};

export default Post;
