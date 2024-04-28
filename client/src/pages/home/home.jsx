import { Link, Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/navbar/navbar";
import style from "./home.module.css";
import { useSelector } from "react-redux";
import { FaSignOutAlt, FaUserEdit } from "react-icons/fa";
import { httpLogoutUser } from "../../redux/APIs";

function Home() {
  const nav = useNavigate();

  const handleLogoutAction = async () => {
    await httpLogoutUser();
    nav("/login");
  };
  const currentUser = useSelector((state) => state?.userDetailsSlice?.userInfo);
  return (
    <>
      <div className={style.home_page_wrapper}>
        <div className={style.navbar}>
          <Navbar />
        </div>
        <div className={style.main_content}>
          <Outlet />
        </div>
        <div className={style.right_content}>
          <>
            <div className={style.myAccount_wrapper}>
              <div className={style.userInfo}>
                <button
                  onClick={() => {
                    handleLogoutAction();
                  }}
                >
                  <FaSignOutAlt />
                </button>

                <div
                  className={style.profilePicture_container}
                  onClick={() => {
                    nav("/myAccount");
                  }}
                >
                  <img
                    src={`${
                      currentUser?.profilePicture?.includes("cloudinary")
                        ? currentUser.profilePicture
                        : `${currentUser.profilePicture}/60`
                    }`}
                    alt="pfp"
                    draggable="false"
                  />
                </div>
                <div
                  className={style.userdetails}
                  onClick={() => {
                    nav("/myAccount");
                  }}
                >
                  <div
                    className={style.userName}
                  >{`${currentUser.userName}`}</div>
                  <div className={style.Name}>
                    {currentUser.firstName + " " + currentUser.lastName}
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default Home;
