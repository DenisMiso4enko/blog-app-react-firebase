import { signOut } from "firebase/auth";
import { auth } from "../../firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/UserSlice.js";
import { useNavigate } from "react-router-dom";
import Post from "../../components/Post/Post.jsx";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const userPosts = user?.posts?.filter((el) => el.userId === user.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      dispatch(logOut());
      navigate("/login");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div>
      <h1>{user?.email}</h1>
      <p>{user?.id}</p>
      <button onClick={handleLogOut}>Выйти из аккаунта</button>

      <div>
        <h3>My posts</h3>
        {userPosts && userPosts.map((post) => <Post key={post.id} {...post} />)}
      </div>
    </div>
  );
};

export default Profile;
