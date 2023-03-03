import React from "react";
import FormAuth from "../../components/Forms/FormAuth.jsx";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div>
      <FormAuth />
      <div>
        If you dont have account -<Link to="/registration">Register</Link>
      </div>
    </div>
  );
};

export default LoginPage;
