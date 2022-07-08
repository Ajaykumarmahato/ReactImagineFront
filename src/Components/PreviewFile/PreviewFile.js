import React, { useEffect, useState } from "react";
import FileViewer from 'react-file-viewer';
import { fileUrl } from "../../Utils/Constant";


function PreviewFile(props){

  const [previewedFilePath,setPreviewedFilePath]=useState(null);
  const [previewedFileExtension,setPreviewedFileExtension]=useState(null);
  
   useEffect(()=>{
    if(props.media.length>0){
        setPreviewedFilePath(fileUrl+'/'+props.media[0].id+'/'+props.media[0].file_name);
        setPreviewedFileExtension(getExtension(fileUrl+'/'+props.media[0].id+'/'+props.media[0].file_name));
    }
   },[])
const getExtension=(url)=>{
    return url.split('.').pop();
}
const changeFile=(file)=>{
    setPreviewedFilePath(fileUrl+'/'+file.id+'/'+file.file_name);
    setPreviewedFileExtension(getExtension(fileUrl+'/'+file.id+'/'+file.file_name));
}

const onError=()=>{
  console.log('error')
}
    return (<div className="filePreviewDiv d-flex">
        <div className="col-9">
             <FileViewer
                fileType={previewedFileExtension}
                filePath={previewedFilePath}
                errorComponent={null}
                onError={onError}
        />
        </div>
        <div className="col-3 text-center">
            {props.media!==undefined && props.media.length>0?(
                props.media.map((file)=>{
                    return (
                        <button onClick={(e)=>changeFile(file)} className="btn btn-info">{file.file_name}</button> 
                    )
                })
            ):null}
        </div>
    </div>);
}

export default PreviewFile;