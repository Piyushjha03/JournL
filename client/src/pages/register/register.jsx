import { useState } from "react";
import style from "./register.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postUser } from "../../redux/features/userDetailsSlice";

function Register() {
  const { id } = useParams();
  console.log("====================================");
  console.log(id);
  console.log("====================================");
  const [signUpInfo, setSignUpInfo] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSignUpInfo(() => ({ ...signUpInfo, [e.target.name]: e.target.value }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    if (id) {
      dispatch(postUser({ ...signUpInfo, following: [id] }));
    } else {
      dispatch(postUser(signUpInfo));
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <div className={style.register_page_wrapper}>
        <div className={style.register_card}>
          <form className={style.register_form}>
            <input
              type="text"
              name="firstName"
              placeholder="Firstname"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Lastname"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="username"
              name="userName"
              placeholder="Username"
              onChange={(e) => handleChange(e)}
            />{" "}
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => handleChange(e)}
            />
            <button
              className={style.createAccount_bttn}
              onClick={(e) => handleSignUp(e)}
            >
              <span className={style.register_bttn_text}>CREATE ACCOUNT</span>
            </button>
            <button
              className={style.gotoLogin_bttn}
              onClick={() => {
                navigate("/login");
              }}
            >
              <span className={style.gotoLogin_bttn_text}>LOGIN</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
