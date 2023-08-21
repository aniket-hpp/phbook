import React, { useState } from "react";
import NavbarButton from "./NavbarButton.js";
import './ComponentCss/Navbar.css'
import iconImg from '../icon/icon.png'
import iconGif from '../icon/icon.gif'
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase/firebase.js'

//backend
import Client from "../Data/Client.js";
import ClientModel from "../Model/communicationModel.js";

const client = Client
var clientModel = ClientModel

const Navbar = ({TypeOfPage}) => {

    const navigate = useNavigate()
    const [icon, setIcon] = useState(iconImg)
    const changeIcon = () => {
        setIcon((icon === iconImg)?iconGif:iconImg)
    }

    const SignOut = async () => {
            if(auth.currentUser){
                clientModel.type = 'signOut'
                clientModel.uid = auth.currentUser.email
    
                await auth.signOut()
                console.log(await client(clientModel))
                navigate('/')
                console.log('User signed out successfully!')
            }else{
                console.log('Error Signing out!')
                navigate('/')
            }

    }

    const handelTitle = () => {

        auth.onAuthStateChanged((user) => {
            if(user){
                navigate('/user')
            }else{
                navigate('/')
            }
        })
    }

    return (
        <div className="navbar" id="navbar">
            <img 
                onMouseLeave={changeIcon}
                className="icon" 
                src={icon} 
                alt=""
            />
            <div className="name" onClick={handelTitle}>PhoneBook</div>
            {/* <div style={{display: (TypeOfPage === 'home')?'block':'none'}}>
                <NavbarButton  
                    Color={"#4056A1"} 
                    Name={"Home"}
                    onClick={() => window.location.reload(true)}
                />
            </div>

            <div style={{display: (TypeOfPage === 'home')?'block':'none'}}>
                <NavbarButton
                    Color={"#4056A1"} 
                    Name={"About"}
                />
            </div> */}

            <div style={{display: (TypeOfPage === 'user')?'block':'none'}}>
                <NavbarButton
                    Color={"#4056A1"} 
                    Name={"Signout"}
                    onClick={SignOut}
                />
            </div>
        </div>
    )
}

export default Navbar