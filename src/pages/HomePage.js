import React from "react";
import styled from "styled-components";
import Feed from "../components/Feed";
import SideBar from "../components/SideBar";

const HomePage = () => {
  return (
    <Container>
      <SideBar />
      <Feed />
    </Container>
  );
};

export default HomePage;
const Container = styled.div`
  margin-top: 15px;
  display: flex;
  width: 70%;
  @media screen and (max-width: 850px) {
    width: 100%;
    padding: 10px;
  }
`;
