import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../store/UserSlice.js";
import Post from "../../components/Post/Post.jsx";

const Home = () => {
  const { posts } = useSelector((state) => state.user);
  const postsCollectionRef = collection(db, "posts");
  const dispatch = useDispatch();
  const getPosts = async () => {
    try {
      const data = await getDocs(postsCollectionRef);
      const fireStoreData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(setPosts(fireStoreData));
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h1 className="section-title">Blogs</h1>
      <div className="posts">
        {posts &&
          posts.map((post) => (
            <Post key={post.id} {...post} getPosts={getPosts} />
          ))}
      </div>
    </div>
  );
};

export default Home;
