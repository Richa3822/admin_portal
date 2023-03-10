import React, { useState,useCallback,useEffect } from "react";
import { useDropzone } from 'react-dropzone';
import { FaCloudDownloadAlt,FaTrashAlt } from 'react-icons/fa';

UploadImgs.defaultProps = {
  multiple: false,
  maxFiles: null,
  accept: "image/*",
  onChange: () => {},
};

function UploadImgs({ field, form, ...props }) {
  const {multiple, maxFiles ,accept} = props;
  const {setFieldValue} = form;
  const [isDragActive, setIsDragActive] = useState(false);
  
  const onDragEnter = useCallback(() => {
    setIsDragActive(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragActive(false);
  }, []);

  const setValue = (value) => {
    setFieldValue(field.name, value)
  }
  const handleFileChange = async (files) => {
    if (maxFiles && files.length > maxFiles) {
      alert(`You can select a maximum of ${maxFiles} files.`);
      return;
    }
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    try {
      const uplodImg = await fetch('http://localhost:8000/api/imageUpload', {
        method: 'POST',
        body: formData
      }).then(res => res.json());
      const urlArr= uplodImg.urls;
      setValue(urlArr)    
    } catch (error) {
      console.log(error);
    }
  }

  const {getRootProps, getInputProps, isDragActive: dropzoneIsDragActive } = useDropzone({
    accept: accept,
    multiple: multiple,
    onDrop: handleFileChange,
    maxFiles: maxFiles,
    onDragEnter,
    onDragLeave
  });

  function handleRemoveFile(index) {
    const newFiles = field.value;
    newFiles.splice(index, 1);
    setValue(newFiles);
  }

  return (
    <div>
    <div {...getRootProps({onDragOver: (e) => {e.preventDefault()}})} className={`dropzone ${isDragActive ? "active" : ""} dragAndDrop m-2 `}>
      <input {...getInputProps({multiple: multiple})}  accept={accept} onChange={handleFileChange}/>
      <FaCloudDownloadAlt className="uploadIcon"/><br/>
      <p >Drag and drop files here or click to select files.</p>
    </div>
    <div className="row">
        {field.value.map((file, index) => (
          <div className='col-2 mt-3' key={index}>
            <div className="m-3">
            <img style={{ height: '100px', width: '100px' }} src={file} alt='images' />
            <span className='removeImg' type='button' onClick={(e) => {e.preventDefault(); handleRemoveFile(index)}}><FaTrashAlt /></span>
            </div>
          </div>
        ))} 
      </div>
    </div>
  );
}

export default UploadImgs;