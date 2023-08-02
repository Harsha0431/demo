import React from 'react';
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";


export default function SearchBar({ onValueChange , clickHandler }) {
    return (
        <div className="card flex flex-wrap justify-content-center gap-3">
            <span className="p-input-icon-right" style={{display:'flex' , overflow:'hidden' , justifyContent:'center' , alignItems:'center'}}>
                <InputText placeholder="Search File ID" id='input-text-search' size={35} onChange={onValueChange} />
                <i className="fa fa-search" aria-hidden="true" style={{cursor:'pointer'}} id='search-icon' onClick={clickHandler}></i>
            </span>
            <span id='extarct-file-link'></span>
        </div>
    )
}