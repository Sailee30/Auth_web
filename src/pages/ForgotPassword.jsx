import NavBar from "../components/NavBar";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const nav = useNavigate();
  useEffect(() => {
    let e = localStorage.getItem("email");
    if (e !== null) nav("/ho");
  }, [nav]);

  const rEmail = useRef();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const reset = async (event) => {
    event.preventDefault();
    if (!email) {
      toast.error("Email cannot be empty", { autoClose: 1000 });
      rEmail.current.focus();
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMsg("Check your email for reset instructions.");
    } catch (err) {
      console.error(err);
      setMsg("Issue: " + err.message);
    }
  };

  return (
    <>
      <NavBar />
      <ToastContainer />
      <h1>Forgot Password</h1>
      <form onSubmit={reset}>
        <input type="email" placeholder="Enter registered email" ref={rEmail} onChange={(e) => setEmail(e.target.value)} value={email} />
        <br />
        <br />
        <input type="submit" value="Reset Password" />
      </form>
      <h3>{msg}</h3>
    </>
  );
}
