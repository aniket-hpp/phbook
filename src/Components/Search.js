import React, { useState } from "react";
import './ComponentCss/Search.css'
import searchIcon from '../icon/search.png'
import filterIcon from '../icon/filter.png'
import ContactCard from '../Components/ContactCard.js'
import Button from './Button.js'
import Icon from '../Components/Icon.js'
import Cross from '../icon/exit.png'

const Seacrh = ({setSearch, setFilter, filter, OnClick, showData, setShowData, Data}) => {
    let SearchData

    if(Data){
        SearchData = Data
    }else{
        SearchData = []
    }
        
    const [display, setDisplay] = useState(false)

    return (
        <div className="main-search-container">
            <div className="search">
                <input onChange={e => setSearch(e.target.value)}/>
                <img src={filterIcon} onClick={() => setDisplay(!display)} alt="F"/>
                <img src={searchIcon} onClick={OnClick} alt="S"/>
            </div>

            <div style={{display: display?'flex':'none'}} className="filterbox">
                <Button enable={true} Text={"Name"} isSelected={(filter === 'name')} OnClick={() => setFilter('name')}/>
                <Button enable={true} Text={"Number"} isSelected={(filter === 'num')} OnClick={() => setFilter('num')}/>
                <Button enable={true} Text={"Email"} isSelected={(filter === 'email')} OnClick={() => setFilter('email')}/>
            </div>
            <div style={{display: showData?'flex':'none', marginTop: "5px", flexDirection: "column", gap: "10px"}}>
                <div style={{margin: "auto 0 auto auto"}}>
                    <Icon icon={Cross} OnClick={() => setShowData(false)} display={true}/>
                </div>

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