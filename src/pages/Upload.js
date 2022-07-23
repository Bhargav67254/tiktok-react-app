import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { storage, db } from "../firebase";
import Converter from "byte-converter-react";
import { useStateValue } from "../components/stateProvider";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LinearProgress from "@mui/material/LinearProgress";
import firebase from "firebase";
import InfoBox from "../components/UploadBox";

const Upload = () => {
  const [{ user }] = useStateValue();
  const [videoURL, setVideoURL] = useState("");
  const [preview, setPreview] = useState("");
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const [inputCaption, setInputCaption] = useState("");
  const [inputSong, setInputSong] = useState("");
  const [progress, setProgress] = useState(0);

  const [informBox, setInformBox] = useState(false);

  function filePicker(e) {
    e.preventDefault();
    if (e.target.files[0]) {
      setVideoURL(e.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
    }
  }
  function vidoePlayer() {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  }
  function SendPost() {
    const uploadData = storage.ref(`video/${videoURL.name}`).put(videoURL);
    uploadData.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {
        alert(err);
      },
      () => {
        storage
          .ref("video")
          .child(videoURL.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              username: user.displayName,
              email: user.email,
              photo: user.photoURL,
              postURL: url,
              caption: inputCaption,
              song: inputSong,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
          })
          .then(() => {
            setProgress("");
            setPreview("");
            setInputCaption("");
            setInputSong("");
            setVideoURL("");
            setInformBox(true);
          });
      }
    );
  }

  return (
    <Container>
      <Wrapper>
        <LeftSide>
          {!preview ? (
            <>
              <Heading>
                <h2>Upload video </h2>
                <p>Post a video to your account</p>
              </Heading>
              <Label htmlFor="video">
                <input
                  type="file"
                  name="video"
                  id="video"
                  accept="video/*"
                  hidden
                  onChange={filePicker}
                />
                <UploadBox>
                  <CloudIcon />
                  <p>Select video to upload</p>
                  <p>Less then 1 GB</p>
                </UploadBox>
              </Label>
            </>
          ) : (
            <>
              <Video ref={videoRef} loop={true} onClick={vidoePlayer}>
                <source src={preview} />
              </Video>
              <p>{videoURL.name}</p>
              {videoURL.size && (
                <Converter suffix useSI addCommas>
                  {videoURL.size}
                </Converter>
              )}
            </>
          )}
        </LeftSide>
        <RightSide>
          <Form>
            <input
              type="text"
              placeholder="Caption"
              value={inputCaption}
              onChange={(e) => setInputCaption(e.target.value)}
            />
            <input
              type="text"
              placeholder="Song Name"
              value={inputSong}
              onChange={(e) => setInputSong(e.target.value)}
            />
          </Form>
          <ButtonGroup>
            {!preview || !inputCaption || !inputSong ? (
              <>
                <DisableButtonOne disabled={true}>Discard</DisableButtonOne>
                <DisableButtonTwo disabled={true}>Post</DisableButtonTwo>
              </>
            ) : (
              <>
                <CancleButton onClick={() => setPreview("")}>
                  Discard
                </CancleButton>
                <PostButton onClick={SendPost}>Post</PostButton>
              </>
            )}
            {progress !== 0 && (
              <ProgressBar variant="buffer" value={progress} />
            )}
          </ButtonGroup>
        </RightSide>
      </Wrapper>
      <InfoBox informBox={informBox} setInformBox={setInformBox} />
    </Container>
  );
};

export default Upload;

const Container = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
  @media screen and (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const Wrapper = styled.div`
  width: 90%;
  padding: 50px 20px;
  margin-top: 30px;
  background-color: white;
  display: flex;
  height: 80vh;
  overflow-y: scroll;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
  @media screen and (max-width: 950px) {
    flex-direction: column;
    align-items: center;
  }

  &::-webkit-scrollbar {
    display: none;
  }
  & {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const LeftSide = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin: 10px 0px;
  }
  @media screen and (max-width: 950px) {
    width: 100%;
  }
`;
const Heading = styled.div`
  h2 {
    font-weight: 550;
  }
  p {
    font-weight: 550;
    color: gray;
    margin: 10px 0px 20px 0px;
  }
`;
const Label = styled.label``;

const UploadBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px dashed gray;
  padding: 50px 20px;
  border-radius: 10px;
  cursor: pointer;
  :hover {
    border-color: #fe2c55;
  }
  p {
    color: gray;
    font-weight: 550;
  }
`;
const CloudIcon = styled(CloudUploadIcon)`
  color: gray;
  font-size: 40px;
`;
const RightSide = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 950px) {
    width: 100%;
    align-items: center;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 950px) {
    width: 100%;
    align-items: center;
  }
  input {
    width: 80%;
    margin: 20px 0px;
    padding: 10px;
    outline: none;
    border: 1px solid lightgray;
    border-radius: 5px;
    font-size: medium;
  }
`;
const ButtonGroup = styled.div``;
const PostButton = styled(Button)`
  background-color: #fe2c55 !important;
  color: whitesmoke !important;
  font-weight: 550 !important;
  width: fit-content !important;
  margin: 0px 20px !important;
  padding: 10px 30px !important;
`;
const CancleButton = styled(Button)`
  background-color: #fe2c55 !important;
  color: whitesmoke !important;
  font-weight: 550 !important;
  width: fit-content !important;
  margin: 0px 20px !important;
  padding: 10px 30px !important;
`;
const Video = styled.video`
  width: 260px;
  cursor: pointer;
  height: 400px;
  border-radius: 10px;
`;
const DisableButtonOne = styled(Button)`
  font-weight: 550 !important;
  width: fit-content !important;
  margin: 0px 20px !important;
  padding: 10px 30px !important;
`;
const DisableButtonTwo = styled(Button)`
  font-weight: 550 !important;
  width: fit-content !important;
  margin: 0px 20px !important;
  padding: 10px 30px !important;
`;
const ProgressBar = styled(LinearProgress)`
  background-color: #fe2c55 !important;
  color: #fe2c55 !important;
  margin: 30px 0px 20px 0px;
`;
