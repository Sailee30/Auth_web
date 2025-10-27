import NavBar from "../components/NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useRef, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  useEffect(() => {
    let e = localStorage.getItem("email");
    if (e !== null) nav("/ho");
  }, [nav]);

  const rEmail = useRef();
  const rPass = useRef();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");

  const save = async (event) => {
    event.preventDefault();
    if (!email) {
      toast.error("Email cannot be empty", { autoClose: 1000 });
      setMsg("");
      rEmail.current.focus();
      return;
    }
    if (!pass) {
      toast.error("Password cannot be empty", { autoClose: 1000 });
      setMsg("");
      rPass.current.focus();
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, pass);
      localStorage.setItem("email", email);
      setMsg("");
      nav("/ho");
    } catch (err) {
      console.error(err);
      setMsg("Login issue: " + err.message);
    }
  };

  return (
    <>
      <NavBar />
      <ToastContainer />
      <h1>Login</h1>
      <form onSubmit={save}>
        <input
          type="email"
          placeholder="enter registered email"
          ref={rEmail}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="enter password"
          ref={rPass}
          onChange={(e) => setPass(e.target.value)}
          value={pass}
        />
        <br />
        <br />
        <input type="submit" value="Login" />
      </form>
      <h2>{msg}</h2>
    </>
  );
}
