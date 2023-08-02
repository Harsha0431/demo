import { React, useState ,useEffect } from 'react';
import './ShareFile.css';
import storage from '../Config/firebase'
import {getDownloadURL, ref , uploadBytes} from 'firebase/storage'
import { v4 } from 'uuid';
import axios from 'axios';
import Uploading from '../Components/Uploading_Loader_Percentage_MUI'
import { NotificationManager } from 'react-notifications'; // Add this line
import Alert from '@mui/material/Alert';
import { Button } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';




const generateUniqueID = () => {
    // Helper function to generate a random 4-digit string
    function generateRandomDigits() {
      return Math.floor(1000 + Math.random() * 9000).toString();
    }

    // Get the current date and time
    const now = new Date();
    const date = now.toLocaleDateString("en-GB").replace(/\//g, ""); // Format: DDMMYY
    const time = now.toLocaleTimeString("en-GB", { hour12: false }).replace(/:/g, ""); // Format: HHMMSS
    const randomDigits = generateRandomDigits();

    // Combine the parts to form the uniqueID
    const uniqueID = `${date}${'-'}${time}${'-'}${randomDigits}`;
    return uniqueID ;
}

class FileClass{
    constructor(name , id){
        this.name = name;
        this.id = id;
    }
}


let mapToExport = [new FileClass('No file Found' , 'NULL')];


function ShareFile() {
    const [file, setFile] = useState(null);
    const [isRenaming, setIsRenaming] = useState(false);
    const [newName, setNewName] = useState('');
    const [uniqueID, setUniqueID] = useState(generateUniqueID());
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [idToDisplay, setIdToDisplay] = useState('');
    const [filesList , setFilesList] = useState(mapToExport);
    const [openBackDrop, setOpenBackDrop] = useState(false);


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        const maxSize = 12 * 1024 * 1024; // 12MB

        if (selectedFile) {
            if (selectedFile.size <= maxSize) {
                setFile(selectedFile);
            } else {
                setOpenBackDrop(true);
            }
        }
    };

    const formatSize = (sizeInBytes) => {
        if (sizeInBytes >= 1024 * 1024) {
            return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
        } else if (sizeInBytes >= 1024) {
            return `${(sizeInBytes / 1024).toFixed(2)} KB`;
        } else {
            return `${sizeInBytes} bytes`;
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    useEffect( ()=>{
        mapToExport = filesList ;
    })

    const handleUpload = async () => {
        try{
            setUploading(true);
            setIdToDisplay(uniqueID);
            const id = generateUniqueID();
            setUniqueID(id);
            console.log('ID : ' + uniqueID) ;

            if(file == null){
                return ;
            }
            const temp = file.name;
            const imageRef = ref(storage , `ShareWithMe/${temp}` );
            await uploadBytes(imageRef , file) ;
            const url = await getDownloadURL(imageRef);
            setUploaded(true);
            setUploading(false);
            const map = new FileClass(file.name , uniqueID) ;
            await setFilesList((filesList) => [...filesList, map]);
            // console.log(url) ;
            axios.post("http://localhost:8080/register" ,
            {
                uniqueID: uniqueID,
                url: url,
                name:file.name,
            })
            .then( res =>{
                NotificationManager.success('File uploaded successfully!', 'Success!', 2000);
            })
            .catch(error=>{
                console.log('Error uploading file:', error);
                setUploading(false);
                NotificationManager.error('Error uploading the file!', 'Error!');
            })
        }
        catch (error) {
            console.log('Error uploading file:', error);
            setUploading(false);
            NotificationManager.error('Error uploading the file!', 'Error!');
        }
    };

    const handleCancel = () => {
        setFile(null);
    };

    const calculateProgress = () => {
        const maxSize = 12 * 1024 * 1024;
        return file ? file.size / maxSize : 0;
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const selectedFile = e.dataTransfer.files[0];
        const maxSize = 12 * 1024 * 1024; // 12MB

        if (selectedFile) {
            if (selectedFile.size <= maxSize) {
                setFile(selectedFile);
            } else {
                setOpenBackDrop(true);
            }
        }
    };

    const handleRenameClick = () => {
        setIsRenaming(true);
        setNewName(file.name.split('.')[0]);
    };

    const handleRenameChange = (e) => {
        setNewName(e.target.value);
    };


    const handleRenameSubmit = () => {
        setIsRenaming(false);
        if (newName.trim() !== '') {
            const nameParts = file.name.split('.');
            const extension = nameParts.pop();
            const updatedName = `${newName.trim()}${'_'+Math.floor(Math.random()*1000)}.${extension}`;
            const updatedFile = new File([file], updatedName, { type: file.type });
            setFile(updatedFile);
        }
    };

    const handleRenameCancel = () => {
        setIsRenaming(false);
    };




    const getIconForFileType = (fileType) => {
        const iconMapping = {
            'image/jpeg': 'file-image',
            'image/png': 'file-image',
            'image/gif': 'file-image',
            'application/pdf': 'file-pdf',
            'application/msword': 'file-word',
            'application/vnd.ms-excel': 'file-excel',
            'application/vnd.ms-powerpoint': 'file-powerpoint',
            'audio/mpeg': 'file-audio',
            'audio/wav': 'file-audio',
            'audio/ogg': 'file-audio',
            'audio/midi': 'file-audio',
            'audio/aac': 'file-audio',
            'audio/mp4': 'file-audio',
            'audio/3gpp': 'file-audio',
            'video/mp4': 'file-video',
            'video/mpeg': 'file-video',
            'video/ogg': 'file-video',
            'video/webm': 'file-video',
            'video/3gpp': 'file-video',
        };
    
        return iconMapping[fileType] || 'file';
    };






    return (
        <div className='share-file-container-3'>
            {openBackDrop?
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={openBackDrop}
                    onClick={()=>{
                        setOpenBackDrop(false);
                    }}
            >
                <Alert severity='warning' variant='outlined' style={{fontSize:'18px' , fontWeight:'800' , color:'black' }}><span style={{fontWeight:'500'}}>File size exceeded <strong>12MB</strong></span>{idToDisplay}</Alert>
            </Backdrop>:
            uploading ? <div className='file-uploading-wait-container'>
                            {/* {NotificationManager.success('File uploaded successfully!', 'Success!')} */}
                            <div style={{marginLeft:'13vw'}}>
                                <Uploading value={0}/>
                            </div>
                            <div style={{display:'flex' , gap:'1rem'}}>
                                <span>File is uploading, </span>
                                <div className='please-wait-container' style={{display:'flex' , gap:'1rem'}}>
                                    <div>
                                        <span style={{'--i':'1'}}>p</span> <span style={{'--i':'2'}}>l</span> 
                                        <span style={{'--i':'3'}}>e</span>  <span style={{'--i':'4'}}>a</span>
                                        <span style={{'--i':'5'}}>s</span> <span style={{'--i':'6'}}>e</span>
                                    </div>
                                    <div>
                                        <span style={{'--i':'7'}}>w</span> <span style={{'--i':'8'}}>a</span>
                                        <span style={{'--i':'9'}}>i</span> <span style={{'--i':'10'}}>t</span>
                                    </div>
                                    <div>
                                        <span style={{'--i':'11'}}>.</span> <span style={{'--i':'12'}}>.</span> <span style={{'--i':'13'}}>.</span>
                                    </div>

                                    
                                </div>
                                
                            </div>
                        </div> :
                    uploaded ? (
                    <div className='updated-note-container'>
                        <Alert severity="success" variant='filled' style={{fontSize:'18px' , userSelect:'none'}}>File Successfully uploaded<br></br><strong>Note ID</strong></Alert>
                        <Alert severity='warning' variant='outlined' style={{fontSize:'18px' , fontWeight:'800' }}><span style={{fontWeight:'600'}}>ID : </span>{idToDisplay}</Alert>
                        <div>
                            <Button variant='contained' onClick={() => setUploaded(false)}>Continue</Button>
                        </div>
                    </div>
                ):
                    <div className='file-share-card'>
                        <div className='file-share-head-bar'>
                            <div className='file-upload-btn'>
                                <input
                                    type="file"
                                    id="file-input"
                                    accept=".jpg, .jpeg, .png, .gif, .bmp, .pdf, .pptx, .mp3"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="file-input" id="file-label" className='choose-file-btn'>+ Choose</label>
                            </div>
                            <div className='upload-cancel-btn-container'>
                                <button
                                    className="upload-btn"
                                    onClick={handleUpload}
                                    disabled={!file}
                                >Upload</button>
                                <button
                                    className="cancel-btn"
                                    onClick={handleCancel}
                                    disabled={!file}
                                >Cancel</button>
                            </div>
                            <div className="progress-bar-container">
                                {file && (
                                    <>
                                        <p>Total file size: {formatSize(file.size)}</p>
                                        {file.size > 12 * 1024 * 1024 && (
                                            <p className="error">File size exceeds 12MB limit.</p>
                                        )}
                                        <progress value={calculateProgress()} max="1" />
                                    </>
                                )}
                            </div>
                        </div>
                        <div className='file-upload-container-body'>
                            <div
                                className="file-upload-container"
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            >
                            <div className="file-list-container">
                                <h3>Selected File:</h3>
                                <div className="file-preview">
                                    {file && (
                                        <div key={file.lastModified} className="file-item">
                                            <p className="file-name">{file.name}</p>
                                            {file.type && file.type.includes('image') ? (
                                                    <img src={URL.createObjectURL(file)} alt={`Preview ${file.name}`} />
                                                ) : (
                                                    <i className={`file-icon far fa-${getIconForFileType(file.type)} fa-4x`} id='file-icon-display' />
                                            )}
                                            <div className='rename-remove-file'>
                                                {isRenaming ? (
                                                    <div className="rename-input-container">
                                                        <input
                                                            type="text"
                                                            value={newName}
                                                            onChange={handleRenameChange}
                                                        />
                                                        <div className='image-rename-controller'>
                                                            <button
                                                                className="rename-submit-btn"
                                                                onClick={handleRenameSubmit}
                                                            >
                                                                Rename
                                                            </button>
                                                            <button
                                                                className="rename-cancel-btn"
                                                                onClick={handleRenameCancel}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <button
                                                        className="rename-btn"
                                                        onClick={handleRenameClick}
                                                        style={{ marginLeft: '10px', backgroundColor: '#ea4335', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                                                    >
                                                        Rename
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
        
    )
}


export {mapToExport};
export default ShareFile;
