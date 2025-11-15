import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({setToken}) {
    const [activeTab, setActiveTab] = useState("login");
    const [showPwdLogin, setShowPwdLogin] = useState(false);
    const [showPwdReg, setShowPwdReg] = useState(false);
    const [message, setMessage] = useState("");


    const [name , setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/login", {email, password,});
            console.log(res.data);

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                setToken(res.data.token);
                navigate("/notes", { replace: true });
            } else {
                setMessage("Brak tokenu w odpowiedzi serwera");
            }
        } catch (err) {
            setMessage(err.response?.data?.error || "Błąd serwera");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/register", {name, email, password,});
            setMessage(res.data.message);
            setActiveTab("login");
        } catch (err) {
            setMessage(err.response.data.error);
        }
    };

    return (
        <div className="main-form">
            <div className="additional-info">
                <div className="header">
                    <img src="/logo2.png" alt=""/>
                    <h3>Tree Work</h3>
                </div>
                <div className="text">
                    <h2>Welcome to TreeWork WebApplication. 👋</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita numquam quas minus architecto…
                    </p>
                </div>
            </div>

            <div className="forms">
                <div className="buttons-change">
                    <button
                        id="btnLogin"
                        className={activeTab === "login" ? "active" : ""}
                        onClick={() => setActiveTab("login")}
                    >
                        Login
                    </button>
                    <button
                        id="btnRegister"
                        className={activeTab === "register" ? "active" : ""}
                        onClick={() => setActiveTab("register")}
                    >
                        Registration
                    </button>
                </div>

                {/* LOGIN */}
                {activeTab === "login" && (
                    <form className="login-form form-pane show" id="loginForm" autoComplete="on" onSubmit={handleLogin}>
                        <div className="field">
                            <i className="bx bx-at input-icon"></i>
                            <input type="email" name="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="field">
                            <i className="bx bx-lock-alt input-icon"></i>
                            <input type={showPwdLogin ? "text" : "password"} name="password" placeholder="Password" minLength={6} required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button type="button" className="toggle" aria-label="Show password" onClick={() => setShowPwdLogin(v => !v)}>
                                <i className={showPwdLogin ? "bx bx-show" : "bx bx-low-vision"}></i>
                            </button>
                        </div>
                        <div
                            className="actions"
                            style={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8}}
                        >
                            <label style={{display: "flex", alignItems: "center", gap: 8, cursor: "pointer"}}>
                                <input type="checkbox" name="remember"/> Remember me
                            </label>
                            <a href="#">Forgot password?</a>
                        </div>
                        <button className="btn-primary" type="submit">Sign in</button>
                        {message}
                        <div className="helper">
                            No account?{" "}
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                setActiveTab("register");
                            }} id="goToRegister">
                                Create one
                            </a>
                        </div>
                    </form>
                )}

                {/* REGISTER */}
                {activeTab === "register" && (
                    <form className="registration-form form-pane show" id="registerForm" autoComplete="on" onSubmit={handleRegister}>
                        <div className="field">
                            <i className="bx bx-user input-icon"></i>
                            <input type="text" name="name" placeholder="Full name" required value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="field">
                            <i className="bx bx-at input-icon"></i>
                            <input type="email" name="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="field">
                            <i className="bx bx-lock-alt input-icon"></i>
                            <input type={showPwdReg ? "text" : "password"} name="password" placeholder="Password (min. 6)" minLength={6} required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button type="button" className="toggle" aria-label="Show password" onClick={() => setShowPwdReg(v => !v)}
                            >
                                <i className={showPwdReg ? "bx bx-show" : "bx bx-low-vision"}></i>
                            </button>
                        </div>
                        <button className="btn-primary" type="submit">Create account</button>
                        {message}
                        <div className="helper">
                            Have an account?{" "}
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                setActiveTab("login");
                            }} id="goToLogin">
                                Sign in
                            </a>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
