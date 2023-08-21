import React, { useState } from "react";
import Navbar from "./Components/Navbar.js";
import './css/home.css'
import CustomButton from './Components/CustomButton.js'
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase/firebase.js";
import Simple from './images/simple.gif'
import Stylesheet from "reactjs-stylesheet";

const Home = () => {

    const navigate = useNavigate()
    const [isHovering, setHovering] = useState(false)

    const handleContinue = async () => {
        console.log(window.innerWidth)
            if(auth.currentUser){
                navigate('/user')
                return
            }else{
                navigate('/signup')
                return
            }
    }

    const HomeStyle = Stylesheet.create({
        Card:{
            transition: '1s',
            margin: 'auto',
            height: 'fit-content',
            width: (window.innerWidth <= 400)?(`${window.innerWidth - 40}px`):'350px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.1)',
            border: `1px solid ${isHovering?'crimson':'#254d4f'}`,
            borderRadius: "10px",
            backdropFilter: 'blur(4px)',
            cursor: 'default',
            boxShadow: `4px 4px 10px ${isHovering?'crimson':'#254d4f'}`
        },
        topA:{
            opacity: '0.5',
            margin: 'auto auto 0px auto',
            filter: 'invert(100%)',
            width: '100%',
            textAlign: 'center',
            paddingTop: '50px',
            fontSize: 'larger'
        },
        midGif:{
            opacity: '0.5',
            margin: '-40px auto -40px auto',
            filter: 'invert(100%)',
            width: '100%',
        },
        bottomText:{
            opacity: '0.5',
            margin: '0px auto 10px auto',
            filter: 'invert(100%)',
            width: '100%',
            textAlign: 'center',
            paddingBottom: '50px',
        }
    })

    return (
        <div className="home-container">
            <Navbar TypeOfPage={'home'}/>

            <div
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
             style={HomeStyle.Card}>
                    <p style={HomeStyle.topA}>A</p>
                    <img style={HomeStyle.midGif} 
                        src={Simple}
                        alt="Simple"
                    />
                    <p style={HomeStyle.bottomText}>way to store Contacts in cloud</p>
            </div>

            <div style={{
                margin: "0px auto auto",
                zIndex:1
            }}>
                <CustomButton 
                    Text={"Continue"} 
                    hoverBackgroundColor={'cornflowerblue'}
                    OnClick={handleContinue}
                />
            </div>

            <div className="footer">
                <p>Made by <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/thesmartaniket/">Aniket Biswas</a></p>
            </div>
        </div>
    )
}

export default Home
