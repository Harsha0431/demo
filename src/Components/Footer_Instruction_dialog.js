
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import ButtonMUI from '@mui/material/Button';
import { Link } from "react-router-dom";

export default function Instructions() {

    const scrollScreen = ()=>{
        window.scrollTo({top:0 , behavior:'smooth'});
    }

    const handleClick = ()=>{
        scrollScreen();
        setVisible(false)
    }

    const [visible, setVisible] = useState(false);
    const footerContent = (
        <div style={{display:'flex' , justifyContent:'space-between' , flexWrap:'wrap'}}>
            <div style={{display:'flex' , gap:'2rem' , flexWrap:'wrap'}}>
                <Link to="/share"><Button label="Share File" icon="pi pi-check"  onClick={() => handleClick() } /></Link>
                <Link to="/getFiles"><Button label="Get File" icon="pi pi-check" onClick={() => handleClick()} /></Link>
                <Link to='/myFilesList'><Button label="My Files" icon="pi pi-check" onClick={() => handleClick()} /></Link>
            </div>
            <Button label="Got It" icon="pi pi-check" onClick={() => handleClick()} autoFocus />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <ButtonMUI style={{fontSize:'18px'}} variant="text" onClick={() => setVisible(true)}>Instructions</ButtonMUI>
            <Dialog header="Welcome to ShareWithMe" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                <div className="m-0" style={{lineHeight:'1.6' , display:'grid' , gap:'0.5rem'}}>
                    <>
                        <strong>Steps to Share a File</strong>
                        <ol>
                            <li>Navigate to the "Share File" section on our platform.</li>
                            <li><strong>Select File:</strong> Click on the "Select File" button to choose the file you want to share from your device.</li>
                            <li><strong>Rename (Optional):</strong> If desired, you can rename the file before sharing. Our platform will further customize the name to ensure its uniqueness.</li>
                            <li><strong>Click on Upload:</strong> Once you've selected the file and, if necessary, renamed it, click on the "Upload" button to begin the upload process.</li>
                            <li><strong>Note Down the Unique ID:</strong> After the upload is complete, a unique ID will be generated for your file. Make sure to note down this ID as it will be required to access the shared file.</li>
                            <li><strong>My Files Section: </strong>To view the files you have uploaded, navigate to the "My Files" section. 
                                Here, you will find the list of files you have shared along with their corresponding unique IDs.
                                Keep in mind that this information will not be retained after you exit the page or refresh it, so remember to note it down for future reference.</li>
                        </ol>
                    </>
                    <>
                        <strong>Steps to Retrieve a File</strong>
                        <ol>
                            <li> Navigate to the <strong>Get File</strong> section on our platform.</li>
                            <li><strong>Enter Unique ID: </strong>Enter the unique ID of the file you want to retrieve in the provided field.</li>
                            <li><strong>Check for Availability: </strong>If the file is still available on our platform, it will be displayed automatically. 
                                If the file has been removed or the ID is incorrect, the file won't be accessible.</li>
                        </ol>
                    </>
                </div>
            </Dialog>
        </div>
    )
}
        