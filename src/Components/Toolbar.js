/*
      Created By: Aniket Biswas
      Github: https://github.com/thesmartaniket
      LinkedIn: https://www.linkedin.com/in/thesmartaniket/
*/

//libaries
import React from "react";

//component
import IconButton from "./IconButton.js";
import Wrapper from './Wrapper.js'

//assest
import Add from '../icon/add.png'
import MyProfile from '../icon/profile.png'
import Reload from '../icon/synchronize.png'

const Toolbar = ({addClickd, profileClicked, reloadClicked}) => {
    return(    
        <Wrapper 
            flexDirection={"row"} 
            padding={"10px"} 
            width={"370px"} 
            justifyContent={"space-around"}
        >
            {/* TOOLBAR: 1 */}
            <IconButton 
                filter={true} 
                Icon={Add} 
                Text={"Add"} 
                OnClick={addClickd}
            />
            {/* TOOLBAR: 2 */}
            <IconButton 
                filter={true} 
                Icon={MyProfile} 
                Text={"My Profile"} 
                OnClick={profileClicked}
            />
            {/* TOOLBAR: 3 */}
            <IconButton 
                filter={true} 
                Icon={Reload} 
                Text={"Reload"} 
                OnClick={reloadClicked}
            />
        </Wrapper>
    )
}

export default Toolbar
