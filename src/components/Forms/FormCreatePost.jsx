import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../../firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const FormCreatePost = () => {
  const postsCollectionRef = collection(db, "posts");
  const { id, email } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const createdAt = new Date().toLocaleDateString();

  const navigate = useNavigate();

  const handleAddPost = async (e) => {
    e.preventDefault();
    try {
      const fileStorageRef = ref(storage, `projectImages/${file.name}`);
      const snapshot = await uploadBytes(fileStorageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      await addDoc(postsCollectionRef, {
        title,
        text,
        createdAt,
        userId: id,
        creator: email,
        image: url,
      });
      setFile(null);
      setText("");
      setTitle("");
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleAddFile = (e) => {
    setFile(e.target.files[0]);
    const img = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = function () {
      setPreview(reader.result);
    };
  };

  const handleCleanFile = () => {
    setFile(null);
    setPreview(null);
  };
  return (
    <form onSubmit={handleAddPost}>
      <input
        type="text"
        placeholder="Enter title..."
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter text..."
        onChange={(e) => setText(e.target.value)}
      />
      <label>
        <input type="file" onChange={(e) => handleAddFile(e)} />
      </label>
      {preview && (
        <div className="preview">
          <img src={preview} alt="preview" />
          <button onClick={handleCleanFile}>X</button>
        </div>
      )}

      <button>Create post</button>
    </form>
  );
};

export default FormCreatePost;
