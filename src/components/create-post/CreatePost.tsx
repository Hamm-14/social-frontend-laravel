import { InputLabel, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Header from "../common/Header";
import SidePanel from "../common/SidePanel";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../common/InputField";
import ButtonComponent from "../common/ButtonComponent";
import { IMAGES } from "../../assets";
import axios from "axios";
import { useCreatePostMutation } from "../../apis/post";

const mainContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
};

const sidePanelContainer: React.CSSProperties = {
  width: "25%",
};

const inputLabel: React.CSSProperties = {
  color: "black",
};

const inputField: React.CSSProperties = {
  background: "#F5F6F8",
  width: "100%",
};

const contentDivs: React.CSSProperties = {
  background: "white",
  width: "92%",
  borderRadius: "20px",
  padding: "20px 20px 25px 20px",
  margin: "20px 0px 20px 0px",
};

const typoStyle: React.CSSProperties = {
  color: "#002F86",
  fontSize: "1.3rem",
  fontWeight: 600,
  marginBottom: "15px",
  letterSpacing: 0.5,
};

const chooseFileContainer: React.CSSProperties = {
  border: "2px dashed #0AB2FA",
  borderRadius: 7,
  width: '30%',
  padding: 12,
};

const CreatePost = () => {
  const [file, setFile] = useState<File | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [createPostLoading, setCreatePostLoading] = useState(false);
  const [postId, setPostId] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileDataURL, setFileDataURL] = useState<string | ArrayBuffer | null>(null);
  const base_url = process.env.REACT_APP_DASHBOARD_API_BASE_URL;
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [createPost] = useCreatePostMutation();
  const navigate = useNavigate();

  useEffect(() => {
    let fileReader: FileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const result = e.target?.result;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  const handleChooseFileClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = async () => {
    if (file) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("image", file);
      formData.append('postId',postId);
      const result = await axios({
        url: `${base_url}/post/pic`,
        method: "POST",
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setIsLoading(false);
      navigate('/');
    }
  };

  const handlePostChange = (event: any) => {
    setPostDescription(event.target.value);
  }

  const handleCreatePost = async () => {
    if(postDescription.trim() !== ''){
        setCreatePostLoading(true);
        const data = {
            userId: userId,
            description: postDescription
        }
        const resp = await createPost(data).unwrap();
        if(resp){
            setPostDescription('');
            setPostId(resp.id);
            setCreatePostLoading(false);
        }
    }
  }

  return (
    <div style={mainContainer}>
      <div style={sidePanelContainer}>
        <SidePanel />
      </div>
      <div style={{ width: "80%" }}>
        <Header title="Business Information" />
        <div style={{ marginTop: "8%" }}>
          <div style={contentDivs}>
            <Typography style={typoStyle}>Post Details</Typography>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                height: 190,
              }}
            >
              <div style={{ width: "98%" }}>
                <InputLabel style={inputLabel}>Description</InputLabel>
                <InputField
                  style={inputField}
                  value={postDescription}
                  fullWidth
                  multiline
                  rows={4}
                  onChange={handlePostChange}
                  placeholder="Type your story here..."
                />
              </div>
              <div style={{ width: "98%", marginTop: 10 }}>
                <ButtonComponent
                  buttonName="Create Post"
                  buttonStyle={{
                    color: "white",
                    background: "#0AB2FA",
                  }}
                  onClick={handleCreatePost}
                  isLoading={createPostLoading}
                />
              </div>
            </div>
          </div>
          <div style={contentDivs}>
            <Typography style={typoStyle}>Upload Post Pic</Typography>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                height: 300,
              }}
            >
              <div style={chooseFileContainer}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={fileDataURL ? fileDataURL : IMAGES.preview_logo}
                    height={200}
                    width={250}
                    alt="preview"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: 15,
                    justifyContent: "space-between",
                  }}
                >
                  <ButtonComponent
                    buttonName="Choose File"
                    buttonStyle={{
                      background: "white",
                      borderRadius: 7,
                      border: "1px solid #0AB2FA",
                      color: "#0AB2FA",
                      fontFamily: "century_gothicregular",
                      width: 170,
                      height: 50,
                      fontSize: "0.8rem",
                    }}
                    onClick={handleChooseFileClick}
                    isLoading={false}
                  />
                  <input
                    type="file"
                    ref={inputRef}
                    accept="image/*"
                    style={{
                      display: "none",
                    }}
                    onChange={handleFileChange}
                  />
                  <ButtonComponent
                    buttonName="Upload"
                    buttonStyle={{
                      color: "white",
                      fontFamily: "century_gothicregular",
                      borderRadius: 7,
                      width: 170,
                      height: 50,
                      fontSize: "0.8rem",
                    }}
                    onClick={handleUploadClick}
                    disabled={!file || postId === ''}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
