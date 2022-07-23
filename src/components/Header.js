import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Avatar from "@mui/material/Avatar";
import { Button, IconButton } from "@mui/material";
import Search from "@mui/icons-material/Search";
import DialogBox from "./DialogBox";
import { useStateValue } from "./stateProvider";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const Header = () => {
  const [{ user }, dispatch] = useStateValue();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    auth.onAuthStateChanged((loginUser) => {
      if (loginUser) {
        dispatch({
          type: "SET_USER",
          user: loginUser,
        });
      }
    });
  }, [user, dispatch]);

  return (
    <Container>
      <Wrapper>
        <LeftHeader>
          <Link to={`/`}>
            <img src="2.png" alt="" />
          </Link>
        </LeftHeader>
        <SearchBar>
          <input type="text" placeholder="Seach accounts" />
          <Bar>|</Bar>
          <SearchIcon />
        </SearchBar>
        <Icons>
          {user ? (
            <Link to={"/upload"}>
              <IconButton style={{ marginLeft: "10px", marginRight: "10px" }}>
                <UploadButton />
              </IconButton>
            </Link>
          ) : (
            <h1 onClick={handleClickOpen}>Upload</h1>
          )}
          {!user ? (
            <LoginButton onClick={handleClickOpen}>Login</LoginButton>
          ) : (
            <>
              <Link to={`/${user?.displayName}`}>
                <UserIcon src={user.photoURL} alt={user.displayName} />
              </Link>
              <LogOutButton onClick={handleClickOpen}>Log out</LogOutButton>
            </>
          )}
        </Icons>
      </Wrapper>
      <DialogBox open={open} setOpen={setOpen} />
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid lightgray;
  background-color: white;
`;
const Wrapper = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;
const LeftHeader = styled.div`
  img {
    width: 100px;
    object-fit: contain;
    cursor: pointer;
  }
`;

const UploadButton = styled(CloudUploadIcon)`
  cursor: pointer;
  color: #fe2c55;
`;
const UserIcon = styled(Avatar)`
  margin: 0px 10px !important;
  cursor: pointer;
  margin-right: 15px !important;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: lightgray;
  padding: 10px;
  border-radius: 50px;
  @media screen and (max-width: 600px) {
    display: none;
  }

  input {
    padding: 0px 15px;
    width: 20vw;
    margin-right: 15px !important;
    border-radius: 50px;
    border: none;
    outline: none;
    background: transparent;
    font-size: medium;
  }
`;
const SearchIcon = styled(Search)`
  color: gray;
`;
const Bar = styled.div`
  margin: 0px 10px;
  color: gray;
`;
const LoginButton = styled(Button)`
  background-color: #fe2c55 !important;
  color: white !important;
  font-weight: 550 !important;
`;
const Icons = styled.div`
  display: flex;
  align-items: center;
  h1 {
    font-size: 18px;
    cursor: pointer;
    margin: 0px 10px;
    font-weight: 550;
    :hover {
      text-decoration: underline;
    }
  }
`;

const LogOutButton = styled(Button)`
  background-color: #fe2c55 !important;
  color: white !important;
  font-weight: 550 !important;
`;
