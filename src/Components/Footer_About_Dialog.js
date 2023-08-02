
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import ButtonMUI from '@mui/material/Button';
import { Link } from "react-router-dom";

export default function FooterAbout() {
    const [visible, setVisible] = useState(false);

    const scrollScreen = ()=>{
        window.scrollTo({top:0 , behavior:'smooth'});
    }

    const handleClick = ()=>{
        scrollScreen();
        setVisible(false)
    }

    const footerContent = (
        <div>
            <Link to="/"><Button label="Get Started" icon="pi pi-check" onClick={() =>handleClick() } autoFocus /></Link>
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <ButtonMUI style={{fontSize:'18px'}} variant="text" onClick={() => setVisible(true)}>ABOUT</ButtonMUI>
            <Dialog header="Welcome to ShareWithMe" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                <div className="m-0">
                    <p>Welcome to our cutting-edge platform for secure and anonymous file sharing.</p>
                    <p>
                        No account registration required. Simply upload your file, and we'll generate a unique ID for easy access.
                        Your privacy is our priority, and all files are securely stored for temporary periods. 
                        Fast, reliable, and hassle-free file sharing. Start sharing today!
                    </p>
                    <p style={{color:'red'}}><strong>Note:</strong> Please do not share any sensitive or personal content using ShareWithMe.
                            The unique ID acts as a direct link to the file, and anyone with the ID can access it.
                    </p>
                </div>
            </Dialog>
        </div>
    )
}
        