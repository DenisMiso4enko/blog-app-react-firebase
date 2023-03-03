import React from "react";
import { Link } from "react-router-dom";

const Post = ({ id, userId, title, text, createdAt, getPosts }) => {
  return (
    <div className="post" id={id}>
      <h1>
        <Link to={`/post/${id}`}>{title}</Link>
      </h1>
      <p>{text}</p>
    </div>
  );
};

export default Post;
