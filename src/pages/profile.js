/*
      Created By: Aniket Biswas
      Github: https://github.com/thesmartaniket
      LinkedIn: https://www.linkedin.com/in/thesmartaniket/
*/

//libaries
import React, { useEffect, useState } from "react";
import { auth } from '../firebase/firebase.js'
import { useNavigate } from "react-router-dom";
import Stylesheet from "reactjs-stylesheet";

//data models and its functions
import Client from "../Data/Client.js";
import Filter from "../Data/Filter.js";
import ClientModel from "../Model/communicationModel.js";

//components
import Navbar from "../Components/Navbar.js";
import AddNewContact from "./add.js";
import Wrapper from "../Components/Wrapper.js";
import Icon from "../Components/Icon.js"
import Loading from "../Components/Loading.js";
import Dialog from "../Components/Dialog.js";
import TextButton from "../Components/TextButton.js";

//assets
import DeleteIcon from '../icon/delete.png'
import Back from '../icon/back.png'

const Profile = () => {
    //variables & useState variables
    let Model = ClientModel
    const [loading, setLoading] = useState(true)
    const [Data, setData] = useState([])
    const [User, setUser] = useState([{name: '', num: '', email: '', cat: '', isWp: false, isProfile: false}])
    const [dialog, setDialog] = useState(false)
    const navigate = useNavigate()

    //function to delete a contact
    const Delete = async () => {
        setDialog(false)

        if(auth.currentUser){
            Model.type = 'deleteData'
            Model.uid = auth.currentUser.email
            Model.data = User[0]

            let result = await Client(Model)
                
            if(result === 'removed'){
                alert('User removed!')
                navigate('/user')
            } else {
                alert('Error!')
            }
        }

    }

    //function to fetch updated contactList [refresh]
    const Update = async () => {
        Model.type = 'getData'
        Model.uid = auth.currentUser.email

        setData(await Client(Model))
        setUser(await Filter(Data, 'isProfile', true))
    }

    useEffect(() => {
        const isUser = async () =>{
            auth.onAuthStateChanged(async (user) => {
                if(!user){
                    navigate('/')
                    return
                }else{
                    await Update()
                    setLoading(false)
                }
            })
        }

        isUser()
    }, [navigate, Data, User])

    //style
    const ProfileStyle = Stylesheet.create({
        maincontainer:{
            display: (Data.length !== 0 && User[0])?'flex':'none',
            width: "100vw", height: "100vh", margin: "auto", justifyContent: "center", alignItems: "center"
        },
        topbar:{ 
            width: "95%", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between"
        },
        warning:{
            margin: "auto auto auto 10px", 
            fontSize: "x-small", 
            color: "red"
        }
    })

    return (
        <div>
            <Navbar TypeOfPage={'user'}/>
            <Loading loading={loading}/>
            <Dialog 
                Show={dialog}
                Ok={Delete} 
                Cancel={() => setDialog(false)} 
                button1={'Delete'} 
                button2={'Cancel'}
                Message={'Delete your profile data?'}
            />

            <div style={{display: (Data.length === 0 || !User[0])?'block':'none'}}>
                <AddNewContact TypeOfPage={'myprofile'} tittle={'Add Your Details'}/>
            </div>

            <div style={ProfileStyle.maincontainer}>
                <Wrapper 
                    width={(window.innerWidth < 450)?`${window.innerWidth - 80}px`:'370px'} 
                    height={"fit-content"} 
                    justifyContent={"center"} 
                    alignItems={"center"} 
                    flexDirection={"column"}
                >
                    <div style={ProfileStyle.topbar}>
                        <Icon name={'Back'} icon={Back} display={true} OnClick={() => navigate(-1)}/>
                        <p style={{fontSize: "large", fontWeight: "bold", padding: "10px"}}>Your Profile</p>
                        <Icon name={'Delete your profile'} icon={DeleteIcon} display={true} OnClick={() => setDialog(true)}/>
                    </div>

                    <div style={ProfileStyle.warning}>**Do not share your uid with anyone</div>  

                    <Wrapper width={(window.innerWidth < 450)?`${window.innerWidth - 120}px`:'90%'} height={"fit-content"} backgroundColor={"white"}>
                        <span style={{fontSize: (window.innerWidth < 450)?'small':'medium'}}>{'uid: '}</span>
                        <p style={{margin: "auto auto auto 0", fontSize: (window.innerWidth < 450)?'small':'medium'}}>{`${(auth.currentUser)?(auth.currentUser.uid):''}`}</p>
                    </Wrapper>

                    {
                        User.map((user, index1) => {
                            return (
                                Object.keys(user).map((Key, index2) => {
                                    if(Key !== '_id' && Key !== 'cat' && Key !== '__v'){
                                        return (
                                            <Wrapper 
                                                key={`w + ${Key} + ${index1} + ${index2}`} 
                                                width={(window.innerWidth < 450)?`${window.innerWidth - 120}px`:'90%'} 
                                                height={"fit-content"} backgroundColor={"white"}>
                                                    <span 
                                                        style={{fontSize: (window.innerWidth < 450)?'small':'medium'}} 
                                                        key={`s + ${Key} + ${index1} + ${index2}`}
                                                    >
                                                        {`${Key}: `}
                                                    </span>
                                                    <p 
                                                        style={{fontSize: (window.innerWidth < 450)?'small':'medium', margin: "auto auto auto 0"}} 
                                                        key={`p + ${Key} + ${index1} + ${index2}`}
                                                    >
                                                        {`${user[Key]}`}
                                                    </p>
                                            </Wrapper>
                                            )
                                        }
                                        
                                        return <div key={`d + ${Key} + ${index1} + ${index2}`}></div>
                                    })
                                )
                            }
                        )
                    }

                    <TextButton text={'Delete my Account'} onClick={() => {}}/>

                </Wrapper>  
            </div>
        </div> 
    )
}

export default Profile