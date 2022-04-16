import React,{useState} from 'react';

// component FileUpload renders when the user navigate to the file-upload page
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
    // form data is an object that captures the file uploaded
    const formData = new FormData();

    // Update the formData object
    formData.append("name", file.name);
    formData.append("files", file);

    // The endpoint of the API
    // const URL = "https://pmc-schedule-api.herokuapp.com/upload_files";
    const URL = "http://localhost:5002/upload_files";

    // Post the uploaded file to the backend
    fetch(URL, 
    {
      method: 'POST',
      body: formData,
    })
    // status code
    .then(resp => resp.json())
    // the response object
    .then(data => 
    {
      // if there are errors, alert the errors  
      if (data.errors) 
      {
        alert(data.errors)
      }
      else 
      {
        // else alert the response message
        alert(data.message);
      }
    })
};

// File content to be displayed after
// file upload is complete
const fileData = () => 
{
  // if file received, which is not null, render the file information as shown in the fields below
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
    // if file has not been uploaded, render the message below
  }else 
  {
    return (
      <div>
        <br />
        <h4>Please select a file</h4>
      </div>
    );
  }
};

  // the File Upload Page component
  return (
    <div>
      <h3> File Upload Page </h3>
      <div>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}> Upload! </button>
      </div>
      {/*render the file information or the message */}
      {fileData()}
    </div>
  );
}

export default FileUpload;