import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js";
import { setUser } from "../../store/UserSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const FormRegistration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = await request;
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
      <form onSubmit={handleSubmit}>
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
        <button>Sign up</button>
      </form>

      <button>Or login with google</button>
    </>
  );
};

export default FormRegistration;
