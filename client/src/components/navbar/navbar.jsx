import { useLocation, useNavigate } from "react-router-dom";
import style from "./navbar.module.css";

import { PiHouseDuotone } from "react-icons/pi";
import { RiSearch2Line } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";

import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { PiChatCircle } from "react-icons/pi";
import { IoAddCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const loc = useLocation();
  const user = useSelector(
    (state) => state?.userDetailsSlice?.userInfo?.userName
  );
  console.log("====================================");
  console.log(user);
  console.log("====================================");
  const invitelink = `http://journl.onrender.com/register/invite/${user}`;

  const [currentPath, setCurrentPath] = useState(loc.pathname);

  function handleNav(e) {
    setCurrentPath(e);
  }
  useEffect(() => {
    setCurrentPath(loc.pathname);
  }, [loc]);
  const navigate = useNavigate();

  const [isCopied, setIsCopied] = useState(false);
  const [isCopyText, setIsCopyText] = useState(false);

  const handleCopyToClipboard = () => {
    const copyText = invitelink;
    try {
      navigator.clipboard.writeText(copyText);
      console.log("Content copied to clipboard");
      setIsCopyText(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  const openHandleCopyToClipboard = () => {
    setIsCopied(true);
  };

  return (
    <>
      <div className={style.navbar_wrapper}>
        <div className={style.navbar_content}>
          <div
            className={style.navbar_logo}
            onClick={() => {
              navigate("/");
            }}
          >
            Journl
          </div>
          <div className={style.navbar_options}>
            <div
              className={`${style.navbar_home} ${
                currentPath === "/" ? style.activeElement : ""
              }`}
              onClick={() => {
                handleNav("/");
                navigate("/");
              }}
            >
              <div className={style.home_hover}>
                <div className={style.home_content}>
                  <div className={style.home_icon}>
                    <PiHouseDuotone />
                  </div>
                  <div className={style.home_name}>Home</div>
                </div>
              </div>
            </div>
            <div
              className={`${style.navbar_search} ${
                currentPath === "/search" ? style.activeElement : ""
              }`}
              onClick={() => {
                handleNav("/search");
                navigate("/search");
              }}
            >
              <div className={style.search_hover}>
                <div className={style.search_content}>
                  <div className={style.search_icon}>
                    <RiSearch2Line />
                  </div>
                  <div className={style.search_name}>Search</div>
                </div>
              </div>
            </div>
            <div
              className={`${style.navbar_account} ${
                currentPath === "/myAccount" ? style.activeElement : ""
              }`}
              onClick={() => {
                handleNav("/myAccount");
                navigate("/myAccount");
              }}
            >
              <div className={style.account_hover}>
                <div className={style.account_content}>
                  <div className={style.account_icon}>
                    <FiUser />
                  </div>
                  <div className={style.account_name}>Account</div>
                </div>
              </div>
            </div>
            <div
              className={`${style.navbar_chat} ${
                currentPath === "/chat" ? style.activeElement : ""
              }`}
              onClick={() => {
                handleNav("/chat");
                navigate("/chat");
              }}
            >
              <div className={style.chat_hover}>
                <div className={style.chat_content}>
                  <div className={style.chat_icon}>
                    <PiChatCircle />
                  </div>
                  <div className={style.chat_name}>chat</div>
                </div>
              </div>
            </div>
            <div
              className={`${style.navbar_create} ${
                currentPath === "/create" ? style.activeElement : ""
              }`}
              onClick={() => {
                handleNav("/create");
                navigate("/create");
              }}
            >
              <div className={style.create_hover}>
                <div className={style.create_content}>
                  <div className={style.create_icon}>
                    <IoAddCircleOutline />
                  </div>
                  <div className={style.create_name}>create</div>
                </div>
              </div>
            </div>
            <div
              className={`${style.navbar_invite} `}
              onClick={openHandleCopyToClipboard}
            >
              <div className={style.invite_hover}>
                <div className={style.invite_content}>
                  <div className={style.invite_icon}>
                    <FaUsers />
                  </div>
                  <div className={style.invite_name}>Invite</div>
                </div>
              </div>
            </div>
            {isCopied && (
              <div className={style.invite_copied}>
                <div className={style.invite_dialogue_box}>
                  <div
                    className={style.invite_close_button}
                    onClick={() => {
                      setIsCopied(false);
                      setIsCopyText(false);
                    }}
                  >
                    X
                  </div>
                  <div className={style.invite_copied_text}>{invitelink}</div>
                  <div
                    className={style.invite_copied_button}
                    onClick={handleCopyToClipboard}
                  >
                    {isCopyText ? "Copied" : "Copy"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
