import "/src/Css/settings.css";
import { useEffect, useRef, useState } from "react";

function Settings() {
    const [showLinks, setShowLinks] = useState(false);
    const [iconPreview, setIconPreview] = useState(null);

    // --- Личные данные из профиля ---
    const [profileEmail, setProfileEmail] = useState("");
    const [profilePhone, setProfilePhone] = useState("");

    // то, что пользователь реально вводит
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    // пароли
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordAgain, setNewPasswordAgain] = useState("");

    const [loading, setLoading] = useState(true);
    const [savingContact, setSavingContact] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);

    // socials из профиля
    const [profileLinkedin, setProfileLinkedin] = useState("");
    const [profileInstagram, setProfileInstagram] = useState("");
    const [profileFacebook, setProfileFacebook] = useState("");

// то, что пользователь вводит
    const [linkedin, setLinkedin] = useState("");
    const [instagram, setInstagram] = useState("");
    const [facebook, setFacebook] = useState("");

    const [savingSocials, setSavingSocials] = useState(null);

    const [links, setLinks] = useState([]);
    const [activeLinkId, setActiveLinkId] = useState(null);
    const [linkValue, setLinkValue] = useState("");
    const [savingLink, setSavingLink] = useState(false);


    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) return;

        const loadLinks = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/links", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) return;
                const data = await res.json();
                setLinks(data);
            } catch (err) {
                console.error("load links error:", err);
            }
        };

        loadLinks();
    }, [token]);

    const openLinkEditor = (linkItem) => {
        if (linkItem) {
            setActiveLinkId(linkItem.id);
            setLinkValue(linkItem.link || "");

            if (linkItem.image_url) {
                const fullUrl = `http://localhost:3000${linkItem.image_url}`;
                setIconPreview(fullUrl);
            } else {
                setIconPreview(null);
            }
        } else {
            setActiveLinkId(null);
            setLinkValue("");
            setIconPreview(null);
        }

        setShowLinks(true);
    };


    // ========== загрузка профиля для плейсхолдеров ==========
    useEffect(() => {
        const loadProfile = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await fetch("http://localhost:3000/api/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    console.error("Settings profile load error:", res.status);
                    setLoading(false);
                    return;
                }

                const data = await res.json();

                setProfileEmail(data.email || "");
                setProfilePhone(data.phone_number || "");
                setProfileLinkedin(data.linkedin_url || "");
                setProfileInstagram(data.instagram_url || "");
                setProfileFacebook(data.facebook_url || "");


                // по желанию можно сразу проставить в value:
                // setEmail(data.email || "");
                // setPhone(data.phone_number || "");
            } catch (err) {
                console.error("Settings profile error:", err);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [token]);

    // ========== модалка ссылок ==========
    const toggleLinks = () => {
        setShowLinks(prev => !prev);
    };

    const fileInputRef = useRef(null);

    const handleChooseIconClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        setIconPreview(prev => {
            if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev);
            return url;
        });
    };


    const handleCancel = () => {
        setShowLinks(false);
        setActiveLinkId(null);
        setLinkValue("");
        setIconPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };


    useEffect(() => {
        return () => {
            if (iconPreview && iconPreview.startsWith("blob:")) {
                URL.revokeObjectURL(iconPreview);
            }
        };
    }, [iconPreview]);

    // ========== сохранение email + phone ==========
    const handleSaveContact = async () => {
        setSavingContact(true);

        // если поля пустые — берём значения из профиля (без изменения)
        const finalEmail = email || profileEmail;
        const finalPhone = phone || profilePhone;

        try {
            const res = await fetch("http://localhost:3000/api/settings/contact", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    email: finalEmail,
                    phone_number: finalPhone,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("save contact error:", data);
                alert(data.error || "Failed to save contact data");
                return;
            }

            setProfileEmail(finalEmail);
            setProfilePhone(finalPhone);
            setEmail("");
            setPhone("");
            alert("Contact data updated");
        } catch (err) {
            console.error("save contact error:", err);
            alert("Error while saving contact data");
        } finally {
            setSavingContact(false);
        }
    };

    // ========== смена пароля ==========
    const handleChangePassword = async () => {
        if (!oldPassword || !newPassword || !newPasswordAgain) {
            alert("Fill all password fields");
            return;
        }

        if (newPassword !== newPasswordAgain) {
            alert("New passwords do not match");
            return;
        }

        setSavingPassword(true);

        try {
            const res = await fetch("http://localhost:3000/api/settings/password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    oldPassword,
                    newPassword,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("password change error:", data);
                alert(data.error || "Failed to change password");
                return;
            }

            setOldPassword("");
            setNewPassword("");
            setNewPasswordAgain("");
            alert("Password updated");
        } catch (err) {
            console.error("password change error:", err);
            alert("Error while changing password");
        } finally {
            setSavingPassword(false);
        }
    };

    const handleSaveSocial = async (kind) => {
        if (!token) {
            alert("No token, please log in again");
            return;
        }

        setSavingSocials(kind);

        const finalLinkedin  = kind === "linkedin"
            ? (linkedin  || profileLinkedin)
            : profileLinkedin;

        const finalInstagram = kind === "instagram"
            ? (instagram || profileInstagram)
            : profileInstagram;

        const finalFacebook  = kind === "facebook"
            ? (facebook  || profileFacebook)
            : profileFacebook;

        try {
            const res = await fetch("http://localhost:3000/api/settings/socials", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    linkedin_url: finalLinkedin  || null,
                    instagram_url: finalInstagram || null,
                    facebook_url: finalFacebook  || null,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("save social error:", data);
                alert(data.error || "Failed to save social link");
                return;
            }

            // Обновляем профильные значения
            setProfileLinkedin(finalLinkedin);
            setProfileInstagram(finalInstagram);
            setProfileFacebook(finalFacebook);

            // Чистим только то поле, которое редактировали
            if (kind === "linkedin") setLinkedin("");
            if (kind === "instagram") setInstagram("");
            if (kind === "facebook") setFacebook("");

            alert("Social link updated");
        } catch (err) {
            console.error("save social error:", err);
            alert("Error while saving social link");
        } finally {
            setSavingSocials(null);
        }
    };



    if (loading) {
        return <div className="settings">Loading settings...</div>;
    }

    const handleApplyLink = async () => {
        if (!token) {
            alert("No token, please log in again");
            return;
        }

        if (!linkValue) {
            alert("Link cannot be empty");
            return;
        }

        setSavingLink(true);

        try {
            const fd = new FormData();
            fd.append("link", linkValue);
            if (activeLinkId) fd.append("id", activeLinkId);

            const file = fileInputRef.current?.files?.[0];
            if (file) {
                fd.append("image", file);
            }

            const res = await fetch("http://localhost:3000/api/links", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: fd,
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("save link error:", data);
                alert(data.error || "Failed to save link");
                return;
            }

            // перезагружаем список ссылок
            const res2 = await fetch("http://localhost:3000/api/links", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res2.ok) {
                const data2 = await res2.json();
                setLinks(data2);
            }

            handleCancel(); // закрыть модалку и очистить
        } catch (err) {
            console.error("save link error:", err);
            alert("Error while saving link");
        } finally {
            setSavingLink(false);
        }
    };

    const handleEditSlot = (slotIndex) => {
        const item = links[slotIndex] || null; // если слота ещё нет — создаём новый
        openLinkEditor(item);
    };

    return (
        <>
            <div
                className="change-links"
                style={{ display: showLinks ? "flex" : "none" }}
            >
                <div className="change-content">
                    <div className="choose-icon" onClick={handleChooseIconClick}>
                        <i className="bx bx-image-add"></i>
                        <p>Add image to change</p>
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />

                    <div className="icon-now">
                        <div className="icon">
                            {iconPreview && <img src={iconPreview} alt="icon" />}
                        </div>
                    </div>
                </div>

                <label htmlFor="link">Link</label>
                <input
                    type="link"
                    id="link"
                    placeholder="Enter your link"
                    value={linkValue}
                    onChange={(e) => setLinkValue(e.target.value)}
                />

                <div className="buttons">
                    <button
                        className="cncl-btn"
                        type="button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="apply-btn"
                        type="button"
                        onClick={handleApplyLink}
                        disabled={savingLink}
                    >
                        {savingLink ? "Saving..." : "Apply"}
                    </button>

                </div>
            </div>

            <div className="settings">
                <div className="personal-info-content">
                    <div className="nav-container">
                        <h2>Personal Information</h2>
                    </div>
                    <div
                        className="user-pfp"
                        style={{
                            backgroundImage: `url(${localStorage.getItem("avatarUrl") || "/user.jpg"})`,
                        }}
                    ></div>
                    <div className="info">
                        <div className="mail">
                            <label htmlFor="mail">Email</label>
                            <input
                                type="email"
                                id="mail"
                                name="mail"
                                placeholder={profileEmail || "Your email"}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="phone">
                            <label htmlFor="phone-number">Phone Number</label>
                            <input
                                type="tel"
                                id="phone-number"
                                name="phone-number"
                                placeholder={profilePhone || "123 456 789"}
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        className="apply-btn"
                        type="button"
                        onClick={handleSaveContact}
                        disabled={savingContact}
                        style={{ marginTop: "12px" }}
                    >
                        {savingContact ? "Saving..." : "Save contact"}
                    </button>
                </div>

                <div className="password-content">
                    <div className="nav-container">
                        <h2>Change Password</h2>
                    </div>
                    <div className="passwords">
                        <div className="old-password">
                            <label htmlFor="old-password">Old Password</label>
                            <input
                                type="password"
                                id="old-password"
                                placeholder="Enter your old password"
                                value={oldPassword}
                                onChange={e => setOldPassword(e.target.value)}
                            />
                        </div>
                        <div className="new-password">
                            <label htmlFor="new-password">New Password</label>
                            <input
                                type="password"
                                id="new-password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="new-password-again">
                            <label htmlFor="new-password-again">
                                New Password Again
                            </label>
                            <input
                                type="password"
                                id="new-password-again"
                                placeholder="Enter password again"
                                value={newPasswordAgain}
                                onChange={e =>
                                    setNewPasswordAgain(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <button
                        className="apply-btn"
                        type="button"
                        onClick={handleChangePassword}
                        disabled={savingPassword}
                        style={{ marginTop: "12px" }}
                    >
                        {savingPassword ? "Saving..." : "Change password"}
                    </button>
                </div>

                {/* дальше оставляю твои блоки как были */}

                <div className="preference-content">
                    <div className="nav-container">
                        <h2>Preferences</h2>
                    </div>
                    <div className="preferences">
                        <div className="language">
                            <label htmlFor="language">Language</label>
                            <select id="language">
                                <option>English</option>
                                <option>Polish</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="social-content">
                    <div className="nav-container">
                        <h2>Connected Socials</h2>
                    </div>
                    <div className="socials">
                        <div className="social">
                            <i className="bx bxl-linkedin"></i>
                            <input
                                type="url"
                                id="link-lin"
                                placeholder={profileLinkedin || "Enter your LinkedIn link"}
                                value={linkedin}
                                onChange={e => setLinkedin(e.target.value)}
                            />
                            <button
                                className="apply-btn"
                                type="button"
                                onClick={() => handleSaveSocial("linkedin")}
                                disabled={savingSocials === "linkedin"}
                                style={{ marginTop: "12px" }}
                            >
                                {savingSocials === "linkedin" ? "Saving..." : "Apply"}
                            </button>
                        </div>

                        <div className="social">
                            <i className="bx bxl-instagram"></i>
                            <input
                                type="url"
                                id="link-inst"
                                placeholder={profileInstagram || "Enter your Instagram link"}
                                value={instagram}
                                onChange={e => setInstagram(e.target.value)}
                            />
                            <button
                                className="apply-btn"
                                type="button"
                                onClick={() => handleSaveSocial("instagram")}
                                disabled={savingSocials === "instagram"}
                                style={{ marginTop: "12px" }}
                            >
                                {savingSocials === "instagram" ? "Saving..." : "Apply"}
                            </button>
                        </div>

                        <div className="social">
                            <i className="bx bxl-facebook"></i>
                            <input
                                type="url"
                                id="link-face"
                                placeholder={profileFacebook || "Enter your Facebook link"}
                                value={facebook}
                                onChange={e => setFacebook(e.target.value)}
                            />
                            <button
                                className="apply-btn"
                                type="button"
                                onClick={() => handleSaveSocial("facebook")}
                                disabled={savingSocials === "facebook"}
                                style={{ marginTop: "12px" }}
                            >
                                {savingSocials === "facebook" ? "Saving..." : "Apply"}
                            </button>
                        </div>
                    </div>
                </div>


                <div className="link-content">
                    <div className="nav-container">
                        <h2>Connected Links</h2>
                    </div>

                    <div className="links">
                        {/* LINK 1 */}
                        <div className="link">
                            <img
                                src={
                                    links[0]?.image_url
                                        ? `http://localhost:3000${links[0].image_url}`
                                        : "/IMG/link-alt-regular-24.png"
                                }
                                alt=""
                            />
                            <input
                                type="text"
                                readOnly
                                value={links[0]?.link || ""}
                                placeholder="Enter your link"
                            />
                            <button
                                className="edit-btn"
                                type="button"
                                onClick={() => handleEditSlot(0)}
                            >
                                Edit
                            </button>
                        </div>

                        {/* LINK 2 */}
                        <div className="link">
                            <img
                                src={
                                    links[1]?.image_url
                                        ? `http://localhost:3000${links[1].image_url}`
                                        : "/IMG/link-alt-regular-24.png"
                                }
                                alt=""
                            />
                            <input
                                type="text"
                                readOnly
                                value={links[1]?.link || ""}
                                placeholder="Enter your link"
                            />
                            <button
                                className="edit-btn"
                                type="button"
                                onClick={() => handleEditSlot(1)}
                            >
                                Edit
                            </button>
                        </div>

                        {/* LINK 3 */}
                        <div className="link">
                            <img
                                src={
                                    links[2]?.image_url
                                        ? `http://localhost:3000${links[2].image_url}`
                                        : "/IMG/link-alt-regular-24.png"
                                }
                                alt=""
                            />
                            <input
                                type="text"
                                readOnly
                                value={links[2]?.link || ""}
                                placeholder="Enter your link"
                            />
                            <button
                                className="edit-btn"
                                type="button"
                                onClick={() => handleEditSlot(2)}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Settings;
