import React, { useEffect, useState } from 'react'
import SearchBar from '../Components/PrimeReactSearchBar'
import './GetFile.css'
import { Button } from '@mui/material';
import AlertMessage from '../Components/Alert_message'

function GetFile() {
    // const [fileSrc , setFileSrc] = useState('#');
    const [uniqueId , setUniqueId] = useState('');
    const [fileFound , setFileFound] = useState(true);


    const fetchUniqueId = (e)=>{
        setUniqueId(e.target.value);
    }

    const fetchFile = async () => {
        if (!uniqueId) {
            setFileFound(false);
            // setFileSrc('#');
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/getFileURI?uniqueId=${uniqueId}`);
            if (response.ok) {
                const data = await response.json();
                if(data.status){
                    // setFileSrc(data.url);
                    setFileFound(true);
                    window.open(data.url, '_blank');
                }
                else{
                    setFileFound(false);
                    // setFileSrc('#');
                }
            } else {
                setFileFound(false);
                // setFileSrc('#');
                console.error('Failed to fetch file URI');
            }
            } catch (error) {
                console.error('Error fetching file URI:', error);
            }
    }

    const handleContinue = ()=>{
        setFileFound(true);
    }

    return (
        <div>
            <div className='file-search-container'>
                {fileFound ? (
                    <div className='file-search-card'>
                        <SearchBar onValueChange={fetchUniqueId} clickHandler={fetchFile} />
                        <div className='click-here-to-open-file'>
                            <Button variant='outlined' onClick={fetchFile}>
                                GET FILE
                            </Button>
                        </div>
                        <div className={!fileFound ? 'file-not-found' : 'file-found'}>
                            {fileFound ? null : 'Invalid ID ... File Not Found'}
                        </div>
                    </div>
                ) : (
                    <div className='error-message'>
                        <div className='message-not-found'>
                            <AlertMessage />
                        </div>
                        <div style={{display:'grid' , justifyContent:'center' , alignItems:'center'}}>
                            <Button variant='contained' color='primary' onClick={handleContinue} style={{marginTop:'1rem'}}>
                                Continue
                            </Button>
                        </div>
                        
                    </div>
                )}
            </div>
        </div>
    )
}

export default GetFile