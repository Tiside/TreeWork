import {Link} from "react-router-dom";


function RightSide(){
    return (
        <>
            <div className="right-side">
                <div className="integration-content">
                    <h3>Integration</h3>
                    <p>Add integrations to your project to simplify your work.</p>

                    <div className="integrations">
                        <div className="integration">
                            <i className='bx bx-stats'></i>
                            <p>Stats</p>
                        </div>
                        <div className="integration">
                            <i className='bx bx-note'></i>
                            <p>Note</p>
                        </div>
                        <div className="integration">
                            <i className='bx bx-file'></i>
                            <p>File</p>
                        </div>
                        <div className="integration">
                            <i className='bx bx-analyse'></i>
                            <p>Analyse</p>
                        </div>
                    </div>
                </div>

                <div className="tools-content">
                    <div className="tools">
                        <div className="tools-zoom">
                            <i className='bx bx-plus'></i>
                            <i className='bx bx-minus'></i>
                        </div>
                        <div className="tools-main">
                            <Link to="/workspace">
                                <i className='bx bx-briefcase-alt-2'></i>
                            </Link>

                            <i className='bx bx-check'></i>
                            <Link to="/work">
                                <i className='bx bx-arrow-back'></i>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RightSide