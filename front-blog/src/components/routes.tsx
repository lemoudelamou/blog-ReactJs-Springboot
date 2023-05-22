import { Routes, Route } from "react-router-dom";
import Home from "./home";
import Blog from "./blog";
import Profile from "./profile";
import Login from "./login";
import Register from "./register";
import VerifySuccess from "./verificationSucceed";
import VerifyFailed from "./verificationFailed";
import Verify from "./verify";
import AccountActivated from "./accountActivated";
import PublicProfile from "./public_profile";
import AddPost from "./add-post";
import  Edit from "./edit"

type Props = {
}

export default function AppRoutes({}: Props) {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/add" element={<AddPost />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/showProfile/:id" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<Verify/>} />
            <Route path="/verifySuccess" element={<VerifySuccess />} />
            <Route path="/verifyFailed" element={<VerifyFailed />} />
            <Route path="/activated" element={<AccountActivated />} />
            <Route path="/user/:userName" element={<PublicProfile />} />
            <Route path="/edit" element={<Edit />} />



        </Routes>
    </div>
  )
}