import NavBar from "../components/NavBar";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "@emailjs/browser";

export default function Doubt() {
  const nav = useNavigate();
  useEffect(() => {
    let e = localStorage.getItem("email");
    if (e == null) nav("/");
  }, [nav]);

  const rName = useRef();
  const rPhone = useRef();
  const rDoubt = useRef();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [doubt, setDoubt] = useState("");
  const [msg, setMsg] = useState("");

  const sm = async (event) => {
    event.preventDefault();
    if (!name) {
      toast.error("Name cannot be empty", { autoClose: 1000 });
      setMsg("");
      rName.current.focus();
      return;
    }
    if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      toast.error("Enter 10 digits phone number", { autoClose: 1000 });
      return;
    }
    if (!doubt) {
      toast.error("Doubt cannot be empty", { autoClose: 1000 });
      setMsg("");
      rDoubt.current.focus();
      return;
    }
    const data = { name, phone, doubt };
    try {
      // fill these with your EmailJS credentials in real use
      await emailjs.send("service_112233", "template_112233", data, "RgH-VLokueXQsvtmH");
      setMsg("We will get back to you");
      setName("");
      setPhone("");
      setDoubt("");
      rName.current.focus();
    } catch (err) {
      console.error(err);
      setMsg("Issue: " + err.message);
    }
  };

  return (
    <>
      <NavBar />
      <h1>Ask Your Doubt</h1>
      <ToastContainer />
      <form onSubmit={sm}>
        <input type="text" placeholder="enter name" ref={rName} onChange={(e) => setName(e.target.value)} value={name} />
        <br />
        <br />
        <input type="number" placeholder="enter phone number" ref={rPhone} onChange={(e) => setPhone(e.target.value)} value={phone} />
        <br />
        <br />
        <textarea rows={4} cols={28} placeholder="enter doubt" ref={rDoubt} onChange={(e) => setDoubt(e.target.value)} value={doubt}></textarea>
        <br />
        <br />
        <input type="submit" />
      </form>
      <h2>{msg}</h2>
    </>
  );
}
