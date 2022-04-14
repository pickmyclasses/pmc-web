import axios from 'axios';

import React,{useState} from 'react';

// continue
const FileUpload = () =>
{
  const [file, setFile] = useState(null);

  // On file select 
  const onFileChange = (event) => 
  {
    setFile(event.target.files[0]);
  };

  // On file upload 
  const onFileUpload = () => 
  {
    const formData = new FormData();

    // Update the formData object
    formData.append("name", file.name);
    formData.append("files", file);

    // TODO: Post the form to the back-end
    const URL = "http://localhost:5000/upload_files";

    console.log(formData);

    fetch(URL, 
    {
      method: 'POST',
      body: formData,
    })
    .then(resp => resp.json())
    .then(data => 
    {
      if (data.errors) 
      {
        alert(data.errors)
      }
      else 
      {
        console.log(data)
      }
    })
};

// File content to be displayed after
// file upload is complete
const fileData = () => 
{
  if (file) 
  {
    return (
      <div>
        <h2>File Details:</h2>
        <p>File Name: {file.name}</p>
        <p>File Type: {file.type}</p>
        <p>
          Last Modified:{" "}
          {file.lastModifiedDate.toDateString()}
          </p>
      </div>
    );
  }else 
  {
    return (
      <div>
        <br />
        <h4>Please select a file before clicking the Upload button</h4>
      </div>
    );
  }
};

  return (
    <div>
      <h3> File Upload Page </h3>
      <div>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}> Upload! </button>
      </div>
      {fileData()}
    </div>
  );
}

export default FileUpload;