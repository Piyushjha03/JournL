import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import ProtectedRoute from "./components/protectedRoute";
import Search from "./pages/search/search";
import Account from "./pages/account/account";
import Feed from "./pages/feed/feed";
import { MyAccount } from "./pages/myAccount/myAccount";
import { TrackFeed } from "./pages/trackFeed/trackFeed";
import { Chat } from "./pages/chat/chat";
import { EachChat } from "./components/eachChat/eachChat";
import { AddChat } from "./components/addChat/addChat";
import Create from "./pages/create/create";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />}>
              <Route path="search" element={<Search />} />
              <Route path="create" element={<Create />} />
              {/* <Route path='myTrack' element={<MyTracks/>} />
              <Route path='newTrack' element={<NewTrack/>} />
            */}
              <Route path="/" element={<Feed />} />
              <Route path="/u/:username" element={<Account />} />
              <Route path="/myAccount" element={<MyAccount />} />
              <Route path="/track/:id" element={<TrackFeed />} />
            </Route>
            <Route path="/chat" element={<Chat />}>
              <Route path="/chat" element={<AddChat />} />
              <Route path="/chat/:id" element={<EachChat />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/invite/:id" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
