import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import profile from "../../images/Profile.png"
import Loader from "../layout/Loader/loader";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FaceIcon from '@mui/icons-material/Face';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { toast } from 'react-toastify';

const LoginSignUp = () => {
    const navigate = useNavigate();
    const location = useLocation();
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const [toggleVisibility, setToggleVisibility] = useState(true);
  let spanVisibilityRef = useRef(null);
  let spanVisibilityOffRef = useRef(null);
  let spanVisibilityRefsign = useRef(null);
  let spanVisibilityOffRefsign = useRef(null);
  let passwordRef = useRef(null);
  let passwordRefsign = useRef(null);

  function toggleEye(){
    if(toggleVisibility){
      spanVisibilityRef.current.style.display = "block"
      spanVisibilityOffRef.current.style.display = "none"
      spanVisibilityRefsign.current.style.display = "block"
      spanVisibilityOffRefsign.current.style.display = "none"
      passwordRef.current.type = "text"
      passwordRefsign.current.type = "text"
    }else{
      spanVisibilityRef.current.style.display = "none"
      spanVisibilityOffRef.current.style.display = "block"
      spanVisibilityRefsign.current.style.display = "none"
      spanVisibilityOffRefsign.current.style.display = "block"
      passwordRef.current.type = "password"
      passwordRefsign.current.type = "password"
    }
    setToggleVisibility(!toggleVisibility)
  }

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const [avatar, setAvatar] = useState(profile);
  const [avatarPreview, setAvatarPreview] = useState(profile);

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    if(avatar === "/static/media/Profile.697fdcd21f6d157b9073.png"){
      toast.error("Please Upload Profile Image")
    }else{
      const myForm = new FormData();
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("password", password);
      myForm.set("avatar", avatar);
      dispatch(register(myForm));
    }
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.onerror = (error) => {
        console.error("Error reading the file:", error);
      };
      reader.readAsDataURL(e.target.files[0]);
      const selectedFile = e.target.files[0];
        if (selectedFile) {
            const fileSize = selectedFile.size; // File size in bytes
            const maxFileSize = 700000; // 700kb in bytes
            if (fileSize > maxFileSize) {
                toast.error('File size exceeds the maximum limit of 700 kb.');
            }
        }
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const redirect = location.search ? location.search.split("=")[1] : "/account";
  useEffect(() => {
    if (error) {
      toast.error(error); 
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, isAuthenticated,redirect, navigate ]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    ref={passwordRef}
                  />
                  <span className="visible" onClick={toggleEye} ref={spanVisibilityRef}>
                    <VisibilityIcon />
                    </span>
                  <span className="invisible" onClick={toggleEye} ref={spanVisibilityOffRef}>
                    <VisibilityOffIcon />
                    </span>
                </div>
                <Link to="/password/forgot">Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <p className="para">Password must be at least 8 charactor <span>*</span></p>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                    ref={passwordRefsign}
                  />
                  <span className="visible" onClick={toggleEye} ref={spanVisibilityRefsign}>
                    <VisibilityIcon />
                    </span>
                  <span className="invisible" onClick={toggleEye} ref={spanVisibilityOffRefsign}>
                    <VisibilityOffIcon />
                    </span>
                </div>
                <p className="para">Image Size must be less than 700kb <span>*</span></p>
                <div id="registerImage">
                  <img src={avatarPreview} loading="lazy" alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
