import NavBar from "../components/NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useRef, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import validator from "validator";

export default function SignUp() {
  const nav = useNavigate();
  useEffect(() => {
    let e = localStorage.getItem("email");
    if (e !== null) nav("/ho");
  }, [nav]);

  const rEmail = useRef();
  const rPass1 = useRef();
  const rPass2 = useRef();

  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [msg, setMsg] = useState("");

  const save = async (event) => {
    event.preventDefault();
    if (!email) {
      toast.error("Email cannot be empty", { autoClose: 1000 });
      setMsg("");
      rEmail.current.focus();
      return;
    }
    if (!pass1) {
      toast.error("Password cannot be empty", { autoClose: 1000 });
      setMsg("");
      rPass1.current.focus();
      return;
    }
    if (!pass2) {
      toast.error("Confirm password cannot be empty", { autoClose: 1000 });
      setMsg("");
      rPass2.current.focus();
      return;
    }
    const checks = { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 };
    if (!validator.isStrongPassword(pass1, checks)) {
      toast.error("Weak password: must include uppercase, lowercase, number, symbol, and 6+ characters", { autoClose: 2000 });
      setMsg("");
      rPass1.current.focus();
      return;
    }
    if (pass1 !== pass2) {
      setMsg("Passwords did not match");
      setPass1("");
      setPass2("");
      rPass1.current.focus();
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, pass1);
      setMsg("Registration successful. Please login.");
      nav("/");
    } catch (err) {
      console.error(err);
      setMsg("Issue: " + err.message);
    }
  };

  return (
    <>
      <NavBar />
      <ToastContainer />
      <h1>SignUp</h1>
      <form onSubmit={save}>
        <input type="email" placeholder="enter email to register" ref={rEmail} onChange={(e) => setEmail(e.target.value)} value={email} />
        <br />
        <br />
        <input type="password" placeholder="enter password" ref={rPass1} onChange={(e) => setPass1(e.target.value)} value={pass1} />
        <br />
        <br />
        <input type="password" placeholder="confirm password" ref={rPass2} onChange={(e) => setPass2(e.target.value)} value={pass2} />
        <br />
        <br />
        <input type="submit" value="Register" />
      </form>
      <h2>{msg}</h2>
    </>
  );
}
