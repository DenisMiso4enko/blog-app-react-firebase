import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.js";
import BigPost from "../BigPost/BigPost.jsx";

const OnePostPage = () => {
  const [data, setData] = useState(null);
  console.log(data);
  const { postId } = useParams();
  const getPostInfo = async () => {
    try {
      const docRef = doc(db, "posts", postId);
      const docSnap = await getDoc(docRef);
      setData(docSnap.data());
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getPostInfo();
  }, []);

  return <div>{data && <BigPost {...data} postId={postId} />}</div>;
};

export default OnePostPage;
