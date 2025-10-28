import NavBar from "../components/NavBar";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { updatePassword } from "firebase/auth";
import { auth } from "../firebase";
import validator from "validator";

export default function ChangePassword() {
  const nav = useNavigate();
  useEffect(() => {
    let e = localStorage.getItem("email");
    if (e === null) nav("/");
  }, [nav]);

  const rPass1 = useRef();
  const rPass2 = useRef();

  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [msg, setMsg] = useState("");

  const save = async (event) => {
    event.preventDefault();
    if (!pass1) {
      toast.error("Password cannot be empty", { autoClose: 1000 });
      setMsg("");
      rPass1.current.focus();
      return;
    }
    if (!pass2) {
      toast.error("Confirm Password cannot be empty", { autoClose: 1000 });
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
      const user = auth.currentUser;
      if (!user) {
        setMsg("No authenticated user found. Please login again.");
        localStorage.removeItem("email");
        nav("/");
        return;
      }
      await updatePassword(user, pass1);
      localStorage.removeItem("email");
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
      <h1>Change Password</h1>
      <form onSubmit={save}>
        <input type="password" placeholder="Enter new password" ref={rPass1} onChange={(e) => setPass1(e.target.value)} value={pass1} />
        <br />
        <br />
        <input type="password" placeholder="Confirm new password" ref={rPass2} onChange={(e) => setPass2(e.target.value)} value={pass2} />
        <br />
        <br />
        <input type="submit" value="Change Password" />
      </form>
      <h2>{msg}</h2>
    </>
  );
}
