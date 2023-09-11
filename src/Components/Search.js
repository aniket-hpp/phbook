/*
      Created By: Aniket Biswas
      Github: https://github.com/thesmartaniket
      LinkedIn: https://www.linkedin.com/in/thesmartaniket/
*/

//libaries
import React, { useState } from "react";

//components
import Icon from '../Components/Icon.js'
import ContactCard from '../Components/ContactCard.js'
import Button from './Button.js'

//assests
import Cross from '../icon/exit.png'
import searchIcon from '../icon/search.png'
import filterIcon from '../icon/filter.png'

//css
import './ComponentCss/Search.css'

const Seacrh = ({setSearch, setFilter, filter, OnClick, showData, setShowData, Data}) => {
    //declaration
    let SearchData

    //assigning
    if(Data){
        SearchData = Data
    }else{
        SearchData = []
    }
    
    //useState variable
    const [display, setDisplay] = useState(false)

    return (
        <div className="main-search-container">
            {/* MAIN SEARCH BAR */}
            <div className="search">
                <input placeholder="Search" onChange={e => setSearch(e.target.value)}/>

                <img src={filterIcon} onClick={() => setDisplay(!display)} alt="F"/>

                <img src={searchIcon} onClick={OnClick} alt="S"/>
            </div>

            {/* EXTRA FILTER OPTIONS */}
            <div style={{display: display?'flex':'none'}} className="filterbox">
                <Button 
                    enable={true} 
                    Text={"Name"} 
                    isSelected={(filter === 'name')} 
                    OnClick={() => setFilter('name')}
                />

                <Button 
                    enable={true} 
                    Text={"Number"} 
                    isSelected={(filter === 'num')} 
                    OnClick={() => setFilter('num')}
                />

                <Button 
                    enable={true}
                    Text={"Email"} 
                    isSelected={(filter === 'email')} 
                    OnClick={() => setFilter('email')}
                />
            </div>

            {/* SEARCH RESULTS */}
            <div style={{display: showData?'flex':'none', marginTop: "5px", flexDirection: "column", gap: "10px"}}>
                {/* CROSS TO CANCEL */}
                <div style={{margin: "auto 0 auto auto"}}>
                    <Icon 
                        icon={Cross} 
                        OnClick={() => setShowData(false)} 
                        display={true}
                    />
                </div>

                {/* SEARCH DATA */}
                {
                    SearchData.map((item, key) => {
                        return (
                            <ContactCard key={key} data={item}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Seacrh
