import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "./Post";
import { db } from "../firebase";

const Feed = () => {
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((response) => {
        setUserPosts(
          response.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, []);
  return (
    <Container>
      {userPosts.map((post) => {
        return (
          <Post
            key={post.id}
            email={post.data.email}
            username={post.data.username}
            userphoto={post.data.photo}
            songname={post.data.song}
            caption={post.data.caption}
            videoURL={post.data.postURL}
            timestamp={post.data.timestamp}
          />
        );
      })}
    </Container>
  );
};

export default Feed;

const Container = styled.div`
  flex: 0.7;
  overflow-y: scroll;
  height: 100vh;
  padding-bottom: 100px;
  &::-webkit-scrollbar {
    display: none;
  }
  & {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  @media screen and (max-width: 700px) {
    flex: 1;
  }
`;
