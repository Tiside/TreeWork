import "/src/Css/profile.css";
import { useEffect, useRef, useState } from "react";
import {data} from "react-router-dom";

function Profile() {
    // ============ PFP LOGIC ============
    const [pfpBg, setPfpBg] = useState("/user.jpg");
    const [showPfp, setShowPfp] = useState(false);
    const [pfpPreview, setPfpPreview] = useState("/user.jpg");
    const fileInputRef2 = useRef(null);
    const [selectedPfpFile, setSelectedPfpFile] = useState(null);


    const handleChoosePfp = () => fileInputRef2.current?.click();

    const handlePfpChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedPfpFile(file);               // <-- запоминаем файл
        const url = URL.createObjectURL(file);
        setPfpPreview(url);                     // <-- превью
    };


    const handleCancelPfp = () => {
        setShowPfp(false);
        setPfpPreview(pfpBg);
        setSelectedPfpFile(null);
    };

    const handleApplyPfp = async () => {
        const fullUrl = `http://localhost:3000${data.profile_picture}`;
        setPfpBg(fullUrl);
        setPfpPreview(fullUrl);
        localStorage.setItem("avatarUrl", fullUrl);
        // если файла нет (например просто закрыли) — ничего не шлём
        if (!selectedPfpFile) {
            setShowPfp(false);
            return;
        }

        try {
            const fd = new FormData();
            fd.append("avatar", selectedPfpFile);

            const res = await fetch("http://localhost:3000/api/profile/avatar", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: fd,
            });

            if (!res.ok) throw new Error("Failed to upload avatar");

            const data = await res.json();

            // полный урл до аватарки с backend-а
            const fullUrl = `http://localhost:3000${data.profile_picture}`;
            setPfpBg(fullUrl);
            setPfpPreview(fullUrl);
            setSelectedPfpFile(null);
            setShowPfp(false);
        } catch (err) {
            console.error("avatar upload error:", err);
        }
    };


    // ============ PROFILE LOGIC ============

    const [profile, setProfile] = useState({
        name_and_surname: "",
        nickname: "",
        profession: "",
        position: "",
        country: "",
        city: "",
    });

    const [originalProfile, setOriginalProfile] = useState(null);
    const [editSection, setEditSection] = useState(null); // "identity" | "job" | "location" | null
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const token = localStorage.getItem("token");

    // ======== LOAD PROFILE ========
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error("Failed to load profile");

                const data = await res.json();

                if (data.profile_picture) {
                    const fullUrl = `http://localhost:3000${data.profile_picture}`;
                    setPfpBg(fullUrl);
                    setPfpPreview(fullUrl);
                    localStorage.setItem("avatarUrl", fullUrl);
                }

                const mapped = {
                    name_and_surname: data.name_and_surname ?? "",
                    nickname: data.nickname ?? "",
                    profession: data.profession ?? "",
                    position: data.position ?? "",
                    country: data.country ?? "",
                    city: data.city ?? "",
                    linkedin_url: data.linkedin_url,
                    instagram_url: data.instagram_url,
                    facebook_url: data.facebook_url,

                };

                setProfile(mapped);
                setOriginalProfile(mapped);
            } catch (err) {
                console.error("loadProfile error:", err);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            loadProfile();
        } else {
            setLoading(false);
        }
    }, [token]);

    // ======== FIELD CHANGE ========
    const handleFieldChange = (field, value) => {
        setProfile((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // ======== SAVE PROFILE ========
    const handleSaveSection = async () => {
        setSaving(true);
        try {
            const res = await fetch("http://localhost:3000/api/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(profile),
            });

            if (!res.ok) throw new Error("Failed to save profile");

            setOriginalProfile(profile);
            setEditSection(null);
        } catch (err) {
            console.error("save profile error:", err);
        } finally {
            setSaving(false);
        }
    };

    // ======== CANCEL EDIT ========
    const handleCancelSection = () => {
        if (originalProfile) {
            setProfile(originalProfile);
        }
        setEditSection(null);
    };

    if (loading) {
        return <div className="profile-container">Loading profile...</div>;
    }
    return (
        <>
            {/* модалка смены pfp */}
            <div
                className="change-pfp"
                style={{ display: showPfp ? "block" : "none" }}
            >
                <div className="change-content">
                    <div className="choose-pfp" onClick={handleChoosePfp}>
                        <i className="bx bx-image-add"></i>
                        <p>Add image to change</p>
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef2}
                        style={{ display: "none" }}
                        onChange={handlePfpChange}
                    />

                    <div className="active-pfp">
                        <div className="user-pfp">
                            <img src={pfpPreview} alt="pfp" />
                        </div>
                    </div>
                </div>

                <div className="buttons">
                    <button className="cncl-btn" onClick={handleCancelPfp}>
                        Cancel
                    </button>
                    <button className="apply-btn" onClick={handleApplyPfp}>
                        Apply
                    </button>
                </div>
            </div>

            {/* основная страница профиля */}
            <div className="profile-container">
                <div className="profile-header">
                    <h2>Profile</h2>
                    <p>View of your profile details here</p>
                    <hr />
                </div>

                <div className="user">
                    <div className="user-side-pfp">
                        <h2>{profile.name_and_surname || "No name"}</h2>
                        <h4>{profile.nickname || "No nickname"}</h4>
                        <div
                            className="user-pfp"
                            onClick={() => {
                                setPfpPreview(pfpBg);
                                setShowPfp(true);
                            }}
                            style={{ backgroundImage: `url(${pfpBg})` }}
                        >
                            <div className="edit">
                                <i className="bx bx-edit-alt"></i>
                            </div>
                        </div>
                    </div>

                    <div className="user-info">
                        <h3>Bio & other details</h3>

                        {/* NAME + NICKNAME */}
                        <div className="line-info">
                            <div className="name">
                                <h4>Name and Surname</h4>
                                {editSection === "identity" ? (
                                    <input
                                        type="text"
                                        value={profile.name_and_surname}
                                        onChange={(e) =>
                                            handleFieldChange(
                                                "name_and_surname",
                                                e.target.value
                                            )
                                        }
                                    />
                                ) : (
                                    <p>{profile.name_and_surname}</p>
                                )}
                            </div>
                            <div className="nickname">
                                <h4>Nickname</h4>
                                {editSection === "identity" ? (
                                    <input
                                        type="text"
                                        value={profile.nickname}
                                        onChange={(e) =>
                                            handleFieldChange(
                                                "nickname",
                                                e.target.value
                                            )
                                        }
                                    />
                                ) : (
                                    <p>{profile.nickname}</p>
                                )}
                            </div>
                            <div className="edit">
                                {editSection === "identity" ? (
                                    <>
                                        <button
                                            className="save-btn"
                                            onClick={handleSaveSection}
                                            disabled={saving}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="cancel-btn"
                                            onClick={handleCancelSection}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <i
                                        className="bx bxs-edit-alt"
                                        onClick={() => setEditSection("identity")}
                                    ></i>
                                )}
                            </div>
                        </div>

                        {/* PROFESSION + POSITION */}
                        <div className="line-info">
                            <div className="profession">
                                <h4>Profession</h4>
                                {editSection === "job" ? (
                                    <input
                                        type="text"
                                        value={profile.profession}
                                        onChange={(e) =>
                                            handleFieldChange(
                                                "profession",
                                                e.target.value
                                            )
                                        }
                                    />
                                ) : (
                                    <p>{profile.profession}</p>
                                )}
                            </div>
                            <div className="position">
                                <h4>Position</h4>
                                {editSection === "job" ? (
                                    <input
                                        type="text"
                                        value={profile.position}
                                        onChange={(e) =>
                                            handleFieldChange(
                                                "position",
                                                e.target.value
                                            )
                                        }
                                    />
                                ) : (
                                    <p>{profile.position}</p>
                                )}
                            </div>
                            <div className="edit">
                                {editSection === "job" ? (
                                    <>
                                        <button
                                            className="save-btn"
                                            onClick={handleSaveSection}
                                            disabled={saving}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="cancel-btn"
                                            onClick={handleCancelSection}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <i
                                        className="bx bxs-edit-alt"
                                        onClick={() => setEditSection("job")}
                                    ></i>
                                )}
                            </div>
                        </div>

                        {/* COUNTRY + CITY */}
                        <div className="line-info">
                            <div className="country">
                                <h4>Country</h4>
                                {editSection === "location" ? (
                                    <input
                                        type="text"
                                        value={profile.country}
                                        onChange={(e) =>
                                            handleFieldChange(
                                                "country",
                                                e.target.value
                                            )
                                        }
                                    />
                                ) : (
                                    <p>{profile.country}</p>
                                )}
                            </div>
                            <div className="city">
                                <h4>City</h4>
                                {editSection === "location" ? (
                                    <input
                                        type="text"
                                        value={profile.city}
                                        onChange={(e) =>
                                            handleFieldChange(
                                                "city",
                                                e.target.value
                                            )
                                        }
                                    />
                                ) : (
                                    <p>{profile.city}</p>
                                )}
                            </div>
                            <div className="edit">
                                {editSection === "location" ? (
                                    <>
                                        <button
                                            className="save-btn"
                                            onClick={handleSaveSection}
                                            disabled={saving}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="cancel-btn"
                                            onClick={handleCancelSection}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <i
                                        className="bx bxs-edit-alt"
                                        onClick={() => setEditSection("location")}
                                    ></i>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="social">
                    <h4>Social Media</h4>
                    <div className="socials">
                        {profile.linkedin_url && (
                            <a
                                href={profile.linkedin_url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <i className="bx bxl-linkedin"></i>
                            </a>
                        )}

                        {profile.instagram_url && (
                            <a
                                href={profile.instagram_url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <i className="bx bxl-instagram"></i>
                            </a>
                        )}

                        {profile.facebook_url && (
                            <a
                                href={profile.facebook_url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <i className="bx bxl-facebook"></i>
                            </a>
                        )}
                    </div>
                </div>

            </div>
        </>
    );
}

export default Profile;
