import axios from 'axios';
 
import React,{Component} from 'react';
 
// continue
class FileUpload extends Component 
{
  
    state = 
    {
      selectedFile: null
    };
    
    // On file select 
    onFileChange = event => 
    {
      this.setState({ selectedFile: event.target.files[0] });
    
    };
    
    // On file upload 
    onFileUpload = () => 
    {

      const formData = new FormData();
    
      // Update the formData object
      formData.append(
        "myFile",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
    
      // TODO: Post the form to the back-end
      // axios.post("api/uploadfile", formData);
    };
    
    // File content to be displayed after
    // file upload is complete
    fileData = () => {
    
      if (this.state.selectedFile) 
      {
         
        return (
          <div>
            <h2>File Details:</h2>
            <p>File Name: {this.state.selectedFile.name}</p>
            <p>File Type: {this.state.selectedFile.type}</p>
            <p>
              Last Modified:{" "}
              {this.state.selectedFile.lastModifiedDate.toDateString()}
            </p>
          </div>
        );
      } else 
      {
        return (
          <div>
            <br />
            <h4>Please select a file before clicking the Upload button</h4>
          </div>
        );
      }
    };
    
    render() {
    
      return (
        <div>
            <h3>
              File Upload using React!
            </h3>
            <div>
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}>
                  Upload!
                </button>
            </div>
          {this.fileData()}
        </div>
      );
    }
  }
 
  export default FileUpload;