import React from "react";
import IconButton from "./IconButton.js";
import Add from '../icon/add.png'
import MyProfile from '../icon/profile.png'
import Reload from '../icon/synchronize.png'
import Wrapper from './Wrapper.js'

const Toolbar = ({addClickd, profileClicked, reloadClicked}) => {
    return(    
        <Wrapper flexDirection={"row"} padding={"10px"} width={"370px"} justifyContent={"space-around"}>
            <IconButton filter={true} Icon={Add} Text={"Add"} OnClick={addClickd}/>
            <IconButton filter={true} Icon={MyProfile} Text={"MyProfile"} OnClick={profileClicked}/>
            <IconButton filter={true} Icon={Reload} Text={"Reload"} OnClick={reloadClicked}/>
        </Wrapper>
    )
}

export default Toolbar