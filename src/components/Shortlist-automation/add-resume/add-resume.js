import React, { Component } from "react";
import './add-resume.css';
import {Link} from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../Shared/header/header';
import Button from '@mui/material/Button';
import Typography from '@material-ui/core/Typography'
import { DropzoneArea } from 'material-ui-dropzone';
import { createStyles, makeStyles } from '@material-ui/core/styles';


class AddResume extends Component {

    constructor(props) {
      super(props);
      console.log(props)
      this.state = {
        isLoading: true,
        isLoggedIn:true
      };
    }
    componentDidMount() {

    }
    render() {
        return (
            <>
            <div className="resume-wrapper">
                <div className="form-wrapper">
                    <div className="resume-header">
                        <div className="resume-title">
                            <h4 className="resume-title-header">Upload Resume</h4>
                            <span>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s , when an unknown printer took a galley of type and scrambled it to</span>
                            <hr/>
                        </div>
                    </div>
                    <div className="dropzone-wrapper" style={{minWidth:"70%",minHeight:"100%"}}>
                        <DropzoneArea
                            showPreviews={true}
                            showPreviewsInDropzone={false}
                            useChipsForPreview
                            previewGridProps={{container: { spacing: 1, direction: 'row' }}}
                            previewChipProps={{classes: { minWindth: 300, maxWidth: 410} }}
                            previewText="Selected files"
                            dropzoneText={'Drop Resume here or'}
                            />
                    </div>
                    <div className="button-wrapper" style={{marginTop:"2rem"}}>
                        <Button variant="contained" style={{backgroundColor:"#e5e4e2", color:"#000",minHeight:"3rem", borderRadius:"0.3rem", maxWidth:"10rem",minWidth:"10rem",marginRight:"2rem"}} size="large">
                        cancel
                        </Button>
                        <Button variant="contained" style={{maxWidth:"10rem",minWidth:"10rem",minHeight:"3rem",borderRadius:"0.3rem", backgroundColor:"#32cd32",color:"#fff"}} size="large">
                        Upload
                        </Button>
                    </div>
                </div>
            </div>
             </>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  const location = useLocation();
  return <AddResume {...props} navigate={navigate} location={location} />
}

export default WithNavigate;
  