import NavBar from "../components/NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const abortRef = useRef(null);

  // ESP32 hotspot IP is 192.168.4.1 by default — we'll use that.
  const ESP32_IP = process.env.REACT_APP_ESP32_IP; 
  const SECRET = process.env.REACT_APP_SECRET;

  useEffect(() => {
    let e = localStorage.getItem("email");
    if (e !== null) {
      setEmail(e);
    } else {
      nav("/");
    }
  }, [nav]);

  // cleanup any pending fetch on unmount
  useEffect(() => {
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, []);

  const logout = (e) => {
    e && e.preventDefault();
    localStorage.removeItem("email");
    nav("/");
  };

  // Send unlock request to ESP32
  const unlock = async () => {
    try {
      setMsg("Sending unlock request...");
      // abort previous if any
      if (abortRef.current) {
        abortRef.current.abort();
      }
      const controller = new AbortController();
      abortRef.current = controller;

      // Make sure your computer/phone is connected to ESP32 hotspot before sending.
      const res = await fetch(`${ESP32_IP}/unlock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, secret: SECRET }),
        signal: controller.signal
      });

      const text = await res.text();
      let j;
      try {
        j = text ? JSON.parse(text) : {};
      } catch {
        j = { message: text || res.statusText || "No message" };
      }

      if (res.ok) {
        const successMsg = `Unlocked: ${j.message || "OK"}`;
        setMsg(successMsg);
        toast.success(successMsg);
      } else {
        const errMsg = `ESP32 error: ${j.message || res.statusText || res.status}`;
        setMsg(errMsg);
        toast.error(errMsg);
      }
    } catch (err) {
      if (err.name === "AbortError") {
        setMsg("Request cancelled.");
        return;
      }
      console.error(err);
      const networkMsg = "Network error: " + (err?.message || err) + ". Make sure you are connected to ESP32 hotspot.";
      setMsg(networkMsg);
      toast.error(networkMsg);
    } finally {
      abortRef.current = null;
    }
  };

  return (
    <>
      <NavBar />
      <ToastContainer />
      <h1>Home</h1>
      <h2>Welcome {email}</h2>

      <div className="container">
        <button onClick={unlock}>Unlock Locker (ESP32)</button>
        <p style={{ textAlign: "center", marginTop: "10px" }}>{msg}</p>
        <p style={{ textAlign: "center" }}>
          Tip: Connect your phone/laptop to the ESP32 network (name shown on ESP32 serial) before pressing Unlock.
        </p>
      </div>

      <form onSubmit={logout}>
        <input type="submit" value="Logout" />
      </form>
    </>
  );
}
