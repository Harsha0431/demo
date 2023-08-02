/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import About from '../Components/Footer_About_Dialog';
import Instructions from '../Components/Footer_Instruction_dialog';
import './Footer.css'
import { FacebookOutlined, Instagram, MailOutlineOutlined, Twitter } from '@mui/icons-material';



function Footer() {
    return (
        <>
            <div className='footer-container-3'>
                <div className='footer-info-container-3'>
                    <div className='footer-about-3'>
                        <About />
                    </div>

                    <div className='footer-instructions'>
                        <Instructions />
                    </div>
                </div>
                
                <div style={{display:'grid' , color:'black',gap:'20%',justifyContent:'center',alignItems:'center',fontWeight:'600',fontSize:'25px'}}>
                    <span style={{ userSelect: 'none' }}>Connect With Us</span>
                    <div className='footer-social-media-container'>
                        <a><FacebookOutlined color='primary' fontSize='large'/></a>
                        <a><Instagram color='primary' fontSize='large'/></a>
                        <a><Twitter color='primary' fontSize='large'/></a>
                        <a><MailOutlineOutlined color='primary' fontSize='large'/></a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer