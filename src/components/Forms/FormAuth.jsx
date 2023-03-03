import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase.js";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/UserSlice.js";
import { useNavigate } from "react-router-dom";

const FormAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const request = await signInWithEmailAndPassword(auth, email, password);
      const { user } = await request;

      // console.log("user login", user);
      dispatch(
        setUser({
          accessToken: user.accessToken,
          id: user?.uid,
          email: user.email,
        })
      );
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleLoginWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const request = await signInWithPopup(auth, googleProvider);
      console.log(request);
      const { user } = request;
      dispatch(
        setUser({
          id: user.uid,
          accessToken: user.accessToken,
          email: user.email,
        })
      );
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Sign in</button>
      </form>
      <button onClick={handleLoginWithGoogle}>Or login with google</button>
    </>
  );
};

export default FormAuth;
