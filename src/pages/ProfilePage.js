import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStateValue } from "../components/stateProvider";
import Avatar from "@mui/material/Avatar";
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import { db } from "../firebase";
import VideoPost from "../components/VideoPost";

const ProfilePage = () => {
  const [{ user }] = useStateValue();
  const { username } = useParams();
  const [profile, setProfile] = useState([]);
  const [postLength, setPostLength] = useState([]);

  useEffect(() => {
    async function getData() {
      if (username === user.displayName) {
        const data = await db
          .collection("posts")
          .where("username", "==", user?.displayName)
          .get();
        const response = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          data: doc.data(),
        }));
        setPostLength(response);

        const results = response.map((data) => {
          setProfile(data);
        });
        return results;
      }
    }
    return getData();
  }, [username, user?.displayName]);

  return (
    <div>
      <Container>
        <Wrapper>
          <SideBar />
          <Details>
            <UserDetails>
              {username !== user?.displayName ? (
                <UserIcon src={profile?.photo} alt={profile?.username} />
              ) : (
                <UserIcon src={user.photoURL} alt={user.displayName} />
              )}
              <PostDetails>
                {username !== user?.displayName ? (
                  <h2>{profile.username}</h2>
                ) : (
                  <h2>{user?.displayName}</h2>
                )}
                <p>
                  {postLength?.length} <span>videos</span>
                </p>
              </PostDetails>
            </UserDetails>
            <UserPosts>
              <p>Videos</p>
              <Body>
                {postLength.map((video) => {
                  return <VideoPost videoURL={video.postURL} key={video.id} />;
                })}
              </Body>
            </UserPosts>
          </Details>
        </Wrapper>
      </Container>
    </div>
  );
};

export default ProfilePage;

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;
const Wrapper = styled.div`
  display: flex;
  margin-top: 20px;
  padding: 0px 20px;
`;
const UserIcon = styled(Avatar)`
  width: 60px !important;
  height: 60px !important;
  margin-right: 20px;
`;
const Details = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  overflow-y: scroll;
  height: 100vh;
  padding-bottom: 80px;
  &::-webkit-scrollbar {
    display: none;
  }
  & {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
const UserDetails = styled.div`
  display: flex;
  align-items: center;
`;
const PostDetails = styled.div`
  h2 {
    font-weight: 550;
  }
  p {
    margin-top: 10px;
  }
  span {
    color: gray;
  }
`;
const UserPosts = styled.div`
  p {
    margin-top: 30px;
    font-size: 20px;
    color: gray;
  }
`;
const Body = styled.div`
  margin: 20px 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
