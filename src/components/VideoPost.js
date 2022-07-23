import React, { useRef, useState } from "react";
import styled from "styled-components";

const VideoPost = ({ videoURL }) => {
  const [playing, setPlaying] = useState(false);

  const videoRef = useRef(null);

  const videoPlay = () => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };
  return (
    <Video ref={videoRef} onClick={videoPlay} controls={false} loop={true}>
      <source src={videoURL} />
    </Video>
  );
};

export default VideoPost;

const Video = styled.video`
  cursor: pointer;
  width: 200px;
  height: 280px;
  object-fit: cover;
  margin: 10px 10px;
`;
