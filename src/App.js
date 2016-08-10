import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent'
import logo from './logo.svg';
import './App.css';

const CLOUDINARY_UPLOAD_PRESET = 'sce28xtb'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/nolds9/upload';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      uploadedFileCloudinaryUrl: ''
    }
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    })

    this.handleImageUpload(files[0])
  }

  handleImageUpload(file){
    let upload =
      request
        .post(CLOUDINARY_UPLOAD_URL)
        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
        .field('file', file)

    upload.end( (err, response) => {
      if (err){
        console.log(err)
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Uppy</h2>
        </div>
        <div className="App-body">
          <div className="FileUpload">
            <Dropzone
              multiple={false}
              accept="image/*"
              onDrop={this.onImageDrop.bind(this)}>
              <p>Drop and image or select a file to upload</p>
            </Dropzone>
          </div>
          <div className="FilePreview">
            {!this.state.uploadedFileCloudinaryUrl ? null :
              <div>
                <p>{this.state.uploadedFile.name}</p>
                <img
                  alt={this.state.uploadedFile.name}
                  src={this.state.uploadedFileCloudinaryUrl} />
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
