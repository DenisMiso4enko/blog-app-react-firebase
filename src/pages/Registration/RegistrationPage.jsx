import FormRegistration from "../../components/Forms/FormRegistration.jsx";
import { Link } from "react-router-dom";
import React from "react";

const RegistrationPage = () => {
  return (
    <div>
      <FormRegistration />
      <div>
        If dont have account -<Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default RegistrationPage;
