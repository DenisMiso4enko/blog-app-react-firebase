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
      <div className="big-post__head">
        <h1 className="big-post__title">{title}</h1>
        <div className="actions">
          {userCanDelete && <button>edit</button>}
          {userCanDelete && <button onClick={handleDeletePost}>delete</button>}
        </div>
      </div>

      <div className="big-post__image">
        {image && <img src={image} alt="postImage" />}
      </div>

      <div className="big-post__info">
        <p>Create by: {creator}</p>
        <p>{createdAt}</p>
        <p>{text}</p>
      </div>

      <div className="comments">
        <h2>Comments (3)</h2>
        <div className="comments-container">
          <div className="comments__item">Коментарий один</div>
          <div className="comments__item">Коментарий 2</div>
          <div className="comments__item">Коментарий 3</div>
        </div>
      </div>
    </div>
  );
};

export default BigPost;
