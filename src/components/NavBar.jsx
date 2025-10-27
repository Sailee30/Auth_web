import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function NavBar() {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
    // Also listen to storage changes (another tab)
    const onStorage = () => setEmail(localStorage.getItem("email"));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <div className="nav">
      {email === null && <Link to="/">Login</Link>}
      {email === null && <Link to="/su">SignUp</Link>}
      {email === null && <Link to="/fp">ForgotPassword</Link>}
      {email !== null && <Link to="/ho">Home</Link>}
      {email !== null && <Link to="/au">AboutUs</Link>}
      {email !== null && <Link to="/cp">ChangePassword</Link>}
      {email !== null && <Link to="/do">Doubt</Link>}
    </div>
  );
}
