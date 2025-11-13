import "/src/Css/settings.css"

function Settings() {
    return (
        <>

            {/*<div className="change-links">*/}
            {/*    <div className="change-content">*/}
            {/*        <div className="choose-icon">*/}
            {/*            <i className='bx bx-image-add'></i>*/}
            {/*            <p>Add image to change</p>*/}
            {/*        </div>*/}
            {/*        <div className="icon-now">*/}
            {/*            <div className="icon"></div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <label htmlFor="link">Link</label>*/}
            {/*    <input type="link" id="link" placeholder="Enter your link" />*/}
            {/*    <div className="buttons">*/}
            {/*        <button className="cncl-btn">Cancel</button>*/}
            {/*        <button className="apply-btn">Apply</button>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="settings">
                <div className="personal-info-content">
                    <div className="nav-container">
                        <h2>Personal Information</h2>
                    </div>
                    <div className="user-pfp"></div>
                    <div className="info">
                        <div className="mail">
                            <label htmlFor="mail">Email</label>
                            <input type="mail" id="mail" name="mail" placeholder="cosfajnego@gmail.com"/>
                        </div>
                        <div className="phone">
                            <label htmlFor="phone-number">Email</label>
                            <input type="number" id="phone-number" name="phone-number" placeholder="123 456 789"/>
                        </div>
                    </div>
                </div>

                <div className="password-content">
                    <div className="nav-container">
                        <h2>Change Password</h2>
                    </div>
                    <div className="passwords">
                        <div className="old-password">
                            <label htmlFor="old-password">Old Password</label>
                            <input type="password" id="old-password" placeholder="Enter your old password"/>
                        </div>
                        <div className="new-password">
                            <label htmlFor="new-password">New Password</label>
                            <input type="password" id="new-password" placeholder="Enter new password"/>
                        </div>
                        <div className="new-password-again">
                            <label htmlFor="new-password-again">New Password Again</label>
                            <input type="password" id="new-password-again" placeholder="Enter password again"/>
                        </div>
                    </div>
                </div>

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
                            <i className='bx bxl-linkedin'></i>
                            <input type="link" id="link-lin" placeholder="Enter your link"/>
                            <button className="apply-btn">Apply</button>
                        </div>
                        <div className="social">
                            <i className='bx bxl-instagram'></i>
                            <input type="link" id="link-inst" placeholder="Enter your link"/>
                            <button className="apply-btn">Apply</button>
                        </div>
                        <div className="social">
                            <i className='bx bxl-facebook'></i>
                            <input type="link" id="link-face" placeholder="Enter your link"/>
                            <button className="apply-btn">Apply</button>
                        </div>
                    </div>

                </div>
                <div className="link-content">
                    <div className="nav-container">
                        <h2>Connected Links</h2>
                    </div>
                    <div className="links">
                        <div className="link">
                            <img src="/IMG/link-alt-regular-24.png" alt=""/>
                            <input type="link" id="link-lin" placeholder="Enter your link"/>
                            <button className="edit-btn">Edit</button>
                        </div>
                        <div className="link">
                            <img src="/IMG/link-alt-regular-24.png" alt=""/>
                            <input type="link" id="link-inst" placeholder="Enter your link"/>
                            <button className="edit-btn">Edit</button>
                        </div>
                        <div className="link">
                            <img src="/IMG/link-alt-regular-24.png" alt=""/>
                            <input type="link" id="link-face" placeholder="Enter your link"/>
                            <button className="edit-btn">Edit</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Settings