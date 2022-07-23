import { Avatar } from "@mui/material";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

const Post = ({
  userphoto,
  username,
  songname,
  videoURL,
  caption,
  timestamp,
  email,
}) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  function vidoePlayer() {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  }

  return (
    <Container>
      <Header>
        <Link to={`/profile/${email}`}>
          <UserIcon src={userphoto} alt={username} />
        </Link>
        <Details>
          <h3>
            {username} <small>{songname}</small>
          </h3>
          <Caption>{caption}</Caption>
          {songname && (
            <p style={{ marginBottom: "10px" }}>
              <Song />
              {`original Sound : ${songname}`}
            </p>
          )}
          {timestamp && (
            <strong>
              <TimeAgo date={new Date(timestamp?.toDate()).toUTCString()} />
            </strong>
          )}
          {videoURL && (
            <Body>
              <Video
                ref={videoRef}
                loop={true}
                controls={false}
                onClick={vidoePlayer}
              >
                <source src={videoURL} />
              </Video>
            </Body>
          )}
        </Details>
      </Header>
    </Container>
  );
};

export default Post;
const Container = styled.div`
  border-bottom: 1px solid lightgrey;
  padding: 10px;
`;
const Header = styled.div`
  display: flex;
`;
const UserIcon = styled(Avatar)`
  margin-right: 10px;
  cursor: pointer;
`;

const Song = styled(LibraryMusicIcon)`
  margin-right: 10px;
`;
const Details = styled.div`
  font-weight: 550;
  span {
    font-size: 15px;
    color: gray;
    display: block;
  }

  h3 {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 5px;
    small {
      margin-left: 10px;
      color: gray;
      font-size: 12px;
    }
  }
  strong {
    color: gray;
  }
  p {
    font-size: 15px;
    font-weight: 550;
    display: flex;
    align-items: center;
    margin-top: 10px;
  }

  @media screen and (max-width: 500px) {
    p {
      font-size: 14px !important;
      ${Song} {
        font-size: medium !important;
      }
    }
  }
`;
const Body = styled.div`
  margin: 20px 0px 10px 0px;
  position: relative;
`;
const Video = styled.video`
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-radius: 10px;
`;
const Caption = styled.div`
  width: 200px !important;
  color: gray;
`;
