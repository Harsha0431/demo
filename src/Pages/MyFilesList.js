import React from 'react'
import { mapToExport as filesList } from './ShareFile';
import Table from '../Components/Table_MUI'


function MyFilesList() {
    return (
        <div>
            <Table list={filesList}/>
            {/* <ul>
                {Array.from(filesList.keys()).map((key)=>(
                    <li key={key}>{key}:{filesList.get(key)}</li>
                ))}
                
            </ul> */}
        </div>
    )
}

export default MyFilesList