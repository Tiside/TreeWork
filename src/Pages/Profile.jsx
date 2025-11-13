import "/src/Css/profile.css"
import {useRef, useState} from "react";

function Profile() {

    const [pfpBg, setPfpBg] = useState("/IMG/piderman.jpg");
    const [showPfp, setShowPfp] = useState(false);
    const [pfpPreview, setPfpPreview] = useState("/IMG/piderman.jpg");

    const fileInputRef2 = useRef(null);

    const handleChoosePfp = () => {
        fileInputRef2.current?.click();
    };

    const handlePfpChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        setPfpPreview(url);
    };

    const handleCancelPfp = () => {
        setShowPfp(false);
        setPfpPreview("/IMG/piderman.jpg");
    };

    const handleApplyPfp = () => {
        setPfpBg(pfpPreview);
        setShowPfp(false);
    };


    return (
        <>
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
                    <button className="apply-btn" onClick={handleApplyPfp}>Apply</button>
                </div>
            </div>

            <div className="profile-container">
                <div className="profile-header">
                    <h2>Profile</h2>
                    <p>View of your profile details here</p>
                    <hr/>
                </div>

                <div className="user">
                    <div className="user-side-pfp">
                        <h2>Stanislav Bazhan</h2>
                        <h4>Tiside</h4>
                        <div className="user-pfp"
                             onClick={() => {
                                 setPfpPreview(pfpBg);
                                 setShowPfp(true);
                             }}
                             style={{ backgroundImage: `url(${pfpBg})` }}
                        >
                            <div className="edit">
                                <i className='bx bx-edit-alt'></i>
                            </div>
                        </div>
                    </div>
                    <div className="user-info">
                        <h3>Bio & other details</h3>

                        <div className="line-info">
                            <div className="name">
                                <h4>Name and Surname</h4>
                                <p>Stanislav Bazhan</p>
                            </div>
                            <div className="nickname">
                                <h4>Nickname</h4>
                                <p>Tiside</p>
                            </div>
                            <div className="edit">
                                <i className='bx bxs-edit-alt'></i>
                            </div>
                        </div>

                        <div className="line-info">
                            <div className="profession">
                                <h4>Profession</h4>
                                <p>Web Developer</p>
                            </div>
                            <div className="position">
                                <h4>Position</h4>
                                <p>Frontend</p>
                            </div>
                            <div className="edit">
                                <i className='bx bxs-edit-alt'></i>
                            </div>
                        </div>

                        <div className="line-info">
                            <div className="country">
                                <h4>Country</h4>
                                <p>Poland</p>
                            </div>
                            <div className="city">
                                <h4>City</h4>
                                <p>Wroclaw</p>
                            </div>
                            <div className="edit">
                                <i className='bx bxs-edit-alt'></i>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="social">
                    <h4>Social Media</h4>
                    <div className="socials">
                        <i className='bx bxl-linkedin'></i>
                        <i className='bx bxl-instagram'></i>
                        <i className='bx bxl-facebook'></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;