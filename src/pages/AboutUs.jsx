import NavBar from "../components/NavBar";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AboutUs() {
  const nav = useNavigate();
  useEffect(() => {
    let e = localStorage.getItem("email");
    if (e == null) nav("/");
  }, [nav]);
  return (
    <>
      <NavBar />
      <ToastContainer />
      <h1>AboutUs</h1>
      <h2><u>Welcome to my Web App!</u></h2>
      <p>This platform allows users to sign up, log in and unlock a demo locker using an ESP32 and a solenoid lock.</p>
    </>
  );
}
