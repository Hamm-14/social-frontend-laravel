import { InputLabel, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Header from "../common/Header";
import SidePanel from "../common/SidePanel";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../common/InputField";
import ButtonComponent from "../common/ButtonComponent";
import { IMAGES } from "../../assets";
import axios from "axios";
import { useUpdatePostMutation, useGetPostMutation } from "../../apis/post";
import { useUpdateUserMutation } from "../../apis/user";

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
  width: "30%",
  padding: 12,
};

const ProfileView = () => {
  const [file, setFile] = useState<File | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState(localStorage.getItem('username'));
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [createPostLoading, setCreatePostLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [postDescription, setPostDescription] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileDataURL, setFileDataURL] = useState<string | ArrayBuffer | null>(
    null
  );
  const base_url = process.env.REACT_APP_DASHBOARD_API_BASE_URL;
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem('userId');
  const userAvatar = localStorage.getItem('avatar');
  const { id } = useParams();
  const [getPost] = useGetPostMutation();
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (id) {
      fetchPostData(id);
    }
  }, [id]);

  const fetchPostData = async (postId: any) => {
    const data = {
      postId: Number(postId)
    };
    const resp = await getPost(data).unwrap();
    if (resp) {
      setPostDescription(resp.description);
      setUploadedImage(resp.post_pic);
    }
  };

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
    if (file && userId) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("userId", userId ? userId : '');
      const result = await axios({
        url: `${base_url}/user/avatar`,
        method: "POST",
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if(result.status === 200){
        setIsLoading(false);
        localStorage.setItem('avatar',result.data.user.avatar);
      }
    }
  };

  const handleUserUpdate = async () => {
    if (name?.trim() !== "" && email?.trim() !== '') {
      setCreatePostLoading(true);
      const data = {
        userId: userId,
        name: name,
        email: email,
      };
      const resp = await updateUser(data).unwrap();
      if (resp) {
        setCreatePostLoading(false);
        localStorage.setItem('username',name ? name : '');
        localStorage.setItem('email',email ? email : '');
      }
    }
  };

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  }

  const handleEmailChange = (event:any) => {
    setEmail(event.target.value);
  }

  return (
    <div style={mainContainer}>
      <div style={sidePanelContainer}>
        <SidePanel />
      </div>
      <div style={{ width: "80%" }}>
        <Header title="User Profile" />
        <div style={{ marginTop: "8%" }}>
          <div style={contentDivs}>
            <Typography style={typoStyle}>User Details</Typography>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                height: 150,
              }}
            >
              <div style={{ width: "49%" }}>
                <InputLabel style={inputLabel}>Name</InputLabel>
                <InputField
                  style={inputField}
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div style={{ width: "49%" }}>
                <InputLabel style={inputLabel}>Email</InputLabel>
                <InputField
                  style={inputField}
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div style={{ width: "98%", marginTop: 10 }}>
                <ButtonComponent
                  buttonName="Update"
                  buttonStyle={{
                    color: "white",
                    background: "#0AB2FA",
                  }}
                  onClick={handleUserUpdate}
                  isLoading={createPostLoading}
                />
              </div>
            </div>
          </div>
          <div style={contentDivs}>
            <Typography style={typoStyle}>Update Avatar</Typography>
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
                    src={
                      fileDataURL
                        ? fileDataURL
                        : userAvatar !== 'null'
                        ? `http://127.0.0.1:8080/${userAvatar}`
                        : IMAGES.preview_logo
                    }
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
                    disabled={!file}
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

export default ProfileView;
