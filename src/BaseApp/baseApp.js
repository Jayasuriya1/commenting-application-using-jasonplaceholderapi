import React from "react";
import SendIcon from '@mui/icons-material/Send';

export default function BaseApp({children}){
    return(
        <div className="base-container">
            <div className="nav-bar">
                <SendIcon fontSize="large"/>
                <h4>Post Maker</h4>
            </div>
            <div className="content-container">
                {children}
            </div>
        </div>
    )
}