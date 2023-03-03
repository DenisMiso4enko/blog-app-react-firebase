import React from "react";
import { useSelector } from "react-redux";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.js";
import { useNavigate } from "react-router-dom";

const BigPost = ({
  title,
  text,
  id,
  userId,
  createdAt,
  creator,
  postId,
  image,
}) => {
  const user = useSelector((state) => state.user.id);
  const userCanDelete = user === userId;
  const navigate = useNavigate();

  const handleDeletePost = async () => {
    try {
      console.log(id);
      const postDoc = doc(db, "posts", postId);
      await deleteDoc(postDoc);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div id={id}>
      <h1>{title}</h1>
      <p>Create by: {creator}</p>
      <p>{text}</p>
      <p>{createdAt}</p>
      {image && <img style={{ width: "500px" }} src={image} alt="postImage" />}
      {userCanDelete && <button onClick={handleDeletePost}>delete</button>}
    </div>
  );
};

export default BigPost;
