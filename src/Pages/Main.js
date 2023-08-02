// Main.js
import React, { useEffect, useState } from 'react';
import './Main.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './About';
import Share from './ShareFile'
import GetFile from './GetFile'
import { Card } from 'primereact/card';
import MyFilesList from './MyFilesList';
import Footer from './Footer';


function Main() {

    const [homeSelected , setHomeSelected] = useState(true) ;
    const [shareSelected, setShareSelected] = useState(false) ;
    const [getFileSelected, setgetFileSelected] = useState(false) ;
    const [aboutSelected , setaboutSelected] = useState(false) ;
    const [filesCount , setFilesCount] = useState(0) ;
    const [myFilesSelect , setmyFilesSelect] = useState(false);

    const countDocuments = async() =>{
        try{
            const response = await fetch("http://localhost:8080/getDocumentCount");
            if(response.ok){
                const data = await response.json();
                const count = data.count;
                setFilesCount(count) ;
            }
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() =>{
        countDocuments();
    });

    const selectAbout = ()=>{
        setaboutSelected(true);
        setShareSelected(false) ;
        setgetFileSelected(false) ;
        setHomeSelected(false) ;
        setmyFilesSelect(false);
    }

    const selectHome = () => {
        setHomeSelected(true) ;
        setShareSelected(false) ;
        setgetFileSelected(false) ;
        setaboutSelected(false);
        setmyFilesSelect(false);
    }

    const selectShare = () => {
        setHomeSelected(false) ;
        setShareSelected(true) ;
        setgetFileSelected(false) ;
        setaboutSelected(false);
        setmyFilesSelect(false);
    }

    const selectGetFile = () => {
        setHomeSelected(false) ;
        setShareSelected(false) ;
        setgetFileSelected(true) ;
        setaboutSelected(false);
        setmyFilesSelect(false);
    }

    const selectMyFiles = ()=>{
        setHomeSelected(false) ;
        setShareSelected(false) ;
        setgetFileSelected(false) ;
        setaboutSelected(false);
        setmyFilesSelect(true);
    }

    return (
        <div className="prototype-3">
            <Router>
                <nav className='head-nav-container-3'>
                    <div className='project-name'>
                        <span>ShareWithMe</span>
                    </div>
                    <div className='head-nav-options'>
                        <Link to="/" id="linkToStyle" onClick={selectHome} className={homeSelected?'active-state-style':'none'} ><span>Home</span></Link>
                        <Link to="/share" id="linkToStyle" onClick={selectShare} className={shareSelected?'active-state-style':'none'}><span>Share File</span></Link>
                        <Link to="/getFiles" id="linkToStyle" onClick={selectGetFile} className={getFileSelected?'active-state-style':'none'}><span>Get File</span></Link>
                        <Link to='/myFilesList' id='linkToStyle' onClick={selectMyFiles} className={myFilesSelect?'active-state-style':'none'}><span>My Files</span></Link>
                        <Link to="/" id="linkToStyle" onClick={selectAbout} className={aboutSelected?'active-state-style':'none'}><span>About Us</span></Link>
                    </div>
                </nav>
                <aside className='left-aside'></aside>
                <main className='main-block-3'>
                    <div>
                        <Routes>
                            <Route exact path="/" element={<About />} />
                            <Route path='/share' element = {<Share />} />
                            <Route path='/getFiles' element={<GetFile />} />
                            <Route path='/myFilesList' element={<MyFilesList />}></Route>
                        </Routes>
                    </div>
                    
                </main>
                <aside className='right-aside'>
                    <div className='count-files-container'>
                        <div className='count-docs'>
                            <div className='counter-card'>
                                <span>Files Shared</span>
                                <span>{filesCount}</span>
                            </div>
                        </div>
                    </div>
                </aside>
                <footer className='footer-3'>
                    <Footer />
                </footer>
            </Router>
        </div>
    );
}

export default Main;
