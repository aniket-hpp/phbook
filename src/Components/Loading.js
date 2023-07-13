import React from "react";
import LoadingIcon from '../icon/loading.gif'
import Icon from '../Components/Icon.js'

const Loading = ({loading}) => {
    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: loading?'flex':'none',
            justifyContent: "center",
            alignItems: "center",
            zIndex: "8",
            position: "fixed",
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(5px)",
            overflowY: "hidden"
        }}>
            <Icon icon={LoadingIcon} display={true}/>
        </div>
    )
}

export default Loading
