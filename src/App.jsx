import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import CreatePost from "./pages/CreatePost/CreatePost.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import RegistrationPage from "./pages/Registration/RegistrationPage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import Header from "./components/Header/Header.jsx";
import ContentWrapper from "./components/ContentWrapper/ContentWrapper.jsx";
import OnePostPage from "./pages/OnePost/OnePostPage.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./store/UserSlice.js";

function App() {
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user);
          dispatch(
            setUser({
              id: user.uid,
              accessToken: user.accessToken,
              email: user.email,
            })
          );
        } else {
          console.log("юзера нету!!!");
        }
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ContentWrapper>
          <Routes>
            <Route>
              <Route index element={<Home />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registration" element={<RegistrationPage />} />
              <Route path="/post/:postId" element={<OnePostPage />} />
            </Route>
          </Routes>
        </ContentWrapper>
      </div>
    </BrowserRouter>
  );
}

export default App;
