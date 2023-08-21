import React, { useEffect, useState } from "react";
import '../css/user.css'
import Navbar from '../Components/Navbar.js'
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.js";
import Sort from "../Data/Sort";
import ContactPannel from "../Components/ContactPannel";
import ContactCard from "../Components/ContactCard";
import Seacrh from "../Components/Search";
import TabSwitcher from "../Components/TabSwitcher";
import Toolbar from "../Components/Toolbar";
import Wrapper from "../Components/Wrapper";
import Loading from "../Components/Loading";
import Icon from "../Components/Icon.js"
import Category from "../Data/Category";
import Stylesheet from "reactjs-stylesheet";

//backend libaries
import ClientModel from "../Model/communicationModel";
import Client from "../Data/Client.js";
import Filter from '../Data/Filter.js'
import { sendEmailVerification } from "firebase/auth";
import Dialog from "../Components/Dialog";

var clientModel = ClientModel
const client = Client

const User = () => {
    const navigate = useNavigate()

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

    const handelSearch = async () => {
        if(search !== ''){
            setSearchResult(Filter(Data, filter, search))
        }else{
            setShowSearchResult(false)

        }
    }

    useEffect(() => {
        if(searchResult.length !== 0){
            setShowSearchResult(true)
        }else if(search !== ''){   
            setMsg('No result found')
            setButton1('OK')
            setDialog(true)
        }
    }, [searchResult])

    useEffect(() => {
        const isUser = async () => {
            if(!auth.currentUser){
                navigate('/')
                return
            }else{
                setLoading(true)
                clientModel.uid = auth.currentUser.uid
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

        auth.onAuthStateChanged((user) => {
            if(!user){
                navigate('/')
            }
        })

        isUser()
    }, [navigate, reload])

    return (
        <div>
            <Navbar TypeOfPage={'user'}/>
            <Loading loading={loading}/>
            <Dialog Message={msg} Show={dialog} button1={button1} Ok={() => {setDialog(false)}}/>
            <div className="maincontainer">
                <div style={UserStyle.usercontainer} className="usercontainer"> 
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

                        <Toolbar 
                            addClickd={() => navigate('/add')}
                            profileClicked={() => navigate('/myprofile')}
                            reloadClicked={() => setReload(true)}
                        />
                    </div>

                    <div className="contacts">
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
