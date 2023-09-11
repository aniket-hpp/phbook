/*
      Created By: Aniket Biswas
      Github: https://github.com/thesmartaniket
      LinkedIn: https://www.linkedin.com/in/thesmartaniket/
*/

//libaries
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.js";
import { sendEmailVerification } from "firebase/auth";
import Stylesheet from "reactjs-stylesheet";

//components
import Navbar from '../Components/Navbar.js'
import ContactPannel from "../Components/ContactPannel.js";
import ContactCard from "../Components/ContactCard.js";
import Seacrh from "../Components/Search.js";
import TabSwitcher from "../Components/TabSwitcher.js";
import Toolbar from "../Components/Toolbar.js";
import Wrapper from "../Components/Wrapper.js";
import Loading from "../Components/Loading.js";
import Icon from "../Components/Icon.js"
import Dialog from "../Components/Dialog";

//data models and its functions
import Client from "../Data/Client.js";
import ClientModel from "../Model/communicationModel";
import Category from "../Data/Category.js";
import Filter from '../Data/Filter.js'
import Sort from "../Data/Sort.js";

//css
import '../css/user.css'

//global objects
var clientModel = ClientModel
const client = Client

const User = () => {
    const navigate = useNavigate()

    //useState variables
    const [Data, setData] = useState([])

    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('name')
    const [tab, setTab] = useState('tab1')
    const [reload, setReload] = useState(false)
    const [showSeacrhResult, setShowSearchResult] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)

    const [msg, setMsg] = useState()
    const [dialog, setDialog] = useState(false)
    const [button1, setButton1] = useState()

    //function to handel search button
    const handelSearch = async () => {
        if(search !== ''){
            setSearchResult(Filter(Data, filter, search))
        }else{
            setShowSearchResult(false)

        }
    }

    //hook1
    useEffect(() => {
        if(searchResult.length !== 0){
            setShowSearchResult(true)
        }else if(search !== ''){   
            setMsg('No result found')
            setButton1('OK')
            setDialog(true)
        }
    }, [searchResult])

    //hook2
    useEffect(() => {
        const isUser = async () => {
            if(!auth.currentUser){
                navigate('/')
                return
            }else{
                setLoading(true)
                clientModel.uid = auth.currentUser.email
                clientModel.type = 'getData'
                setReload(false)


                try{
                    let Data = await client(clientModel)
                    setData(Data)
                }catch(error){
                    setMsg(error)
                    setButton1('OK')
                    setDialog(true)
                }

                setLoading(false)
                
                if(auth.currentUser){
                    if(!(auth.currentUser.emailVerified)){
                        if(window.confirm('Your email is not verified!\nResend verification email?')){
                            sendEmailVerification(auth.currentUser)
                            .then(console.log('Verification email sent'))
                            .catch((e) => console.log(e))
                        }

                        alert('You will be signed out. Verify your email and re-login to continue.')
                        auth.signOut()
                        navigate('/')
                    }                    
                }
            }
        }

        //to handle redirection to home if no user is found
        auth.onAuthStateChanged((user) => {
            if(!user){
                navigate('/')
            }
        })

        isUser()
    }, [navigate, reload])

    //style
    const UserStyle = Stylesheet.create({
        usercontainer: {
            overflowY: loading?'hidden':'auto'
        },
        search: {
            display: "flex",
            flexDirection: "column",  
            gap: "25px"
        },
        AllPanel: {
            display: (tab === 'tab1')?'block':"none"
        },
        SortedPanel: {
            display: (tab === 'tab2')?'flex':"none",
            flexDirection: "column",
            gap: "10px"
        },
        SortedSubBlock: {
            width: '100%', 
            display: 'flex', 
            flexDirection:'row', 
            justifyContent: 'center', 
            alignItems: 'center'
        },
        sortedTab:{
            margin: "0", 
            cursor: 'default'
        }
    })

    return (
        <div>
            <Navbar TypeOfPage={'user'}/>

            <Loading loading={loading}/>

            <Dialog Message={msg} Show={dialog} button1={button1} Ok={() => {setDialog(false)}}/>

            <div className="maincontainer">
                <div style={UserStyle.usercontainer} className="usercontainer"> 
                    {/* Search Bar Block */}
                    <div style={UserStyle.search}>
                        <Seacrh 
                            setSearch={setSearch} 
                            setFilter={setFilter} 
                            filter={filter} 
                            OnClick={handelSearch}
                            showData={showSeacrhResult}
                            Data={searchResult}
                            setShowData={setShowSearchResult}
                        />

                        <div style={{display: 'none'}}>
                            <Wrapper>
                                <ContactCard data={Data[0]}/>
                            </Wrapper>
                        </div>
                        
                        {/* TOOLBAR BLOCK */}

                        <Toolbar 
                            addClickd={() => navigate('/add')}
                            profileClicked={() => navigate('/myprofile')}
                            reloadClicked={() => setReload(true)}
                        />
                    </div>

                    <div className="contacts">
                        {/* TAB SWITCHING BLOCK */}
                        <TabSwitcher 
                            heading={"Contacts"}
                            tab1={'All'} 
                            tab2={'Sorted'} 
                            tabSelcted={(tab === 'tab1')?1:2}
                            OnTab1Click={() => setTab('tab1')}
                            OnTab2Click={() => {setTab('tab2')}}
                        />
                        
                        {/* ALL BLOCK */}
                        <div style={UserStyle.AllPanel}>
                            <ContactPannel setReload={setReload} List={Sort(Data)}/>
                        </div>

                        {/* SORTED BLOCK */}
                        <div style={UserStyle.SortedPanel}>
                            <Wrapper 
                                display={(!Filter(Sort(Data), 'cat', 'fr').length)?'none':''}  
                                width={"390px"} 
                                flexDirection={"column"} 
                                padding={"10px 0 0 0"} 
                                margin={"auto"}
                            >
                                <div style={UserStyle.SortedSubBlock}>
                                    <Icon display={true} icon={Category[0].image} width={"30px"}/>
                                    <p style={UserStyle.sortedTab}>{Category[0].name}</p> 
                                </div>

                                <ContactPannel setReload={setReload} List={Filter(Sort(Data), 'cat', 'fr')}/>
                            </Wrapper>

                            <Wrapper 
                                display={(!Filter(Sort(Data), 'cat', 'fa').length)?'none':''} 
                                width={"390px"} 
                                flexDirection={"column"} 
                                padding={"10px 0 0 0"} 
                            >
                                <div style={UserStyle.SortedSubBlock}>
                                    <Icon display={true} icon={Category[1].image} width={"30px"}/>
                                    <p style={UserStyle.sortedTab}>{Category[1].name}</p> 
                                </div>

                                <ContactPannel setReload={setReload} List={Filter(Sort(Data), 'cat', 'fa')}/>
                            </Wrapper>

                            <Wrapper 
                                display={(!Filter(Sort(Data), 'cat', 'of').length)?'none':''} 
                                width={"390px"} 
                                flexDirection={"column"} 
                                padding={"10px 0 0 0"} 
                                margin={"auto"}
                            >
                                <div style={UserStyle.SortedSubBlock}>
                                    <Icon display={true} icon={Category[2].image} width={"30px"}/>
                                    <p style={UserStyle.sortedTab}>{Category[2].name}</p> 
                                </div>

                                <ContactPannel setReload={setReload} List={Filter(Sort(Data), 'cat', 'of')}/>
                            </Wrapper>

                            <Wrapper 
                                display={(!Filter(Sort(Data), 'cat', 'ot').length)?'none':''} 
                                width={"390px"} 
                                flexDirection={"column"} 
                                padding={"10px 0 0 0"} 
                                margin={"auto"}
                            >
                                <div style={UserStyle.SortedSubBlock}>
                                    <Icon display={true} icon={Category[3].image} width={"30px"}/>
                                    <p style={UserStyle.sortedTab}>{Category[3].name}</p> 
                                </div>

                                <ContactPannel setReload={setReload} List={Filter(Sort(Data), 'cat', 'ot')}/>
                            </Wrapper>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default User
