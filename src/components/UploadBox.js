import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import styled from "styled-components";
import { Link } from "react-router-dom";

function UploadBox({ informBox, setInformBox }) {
  const handleClose = () => {
    setInformBox(false);
  };

  return (
    <Dialog open={informBox}>
      <Container>
        <h1>Your vidoe is successfully uploded </h1>
        <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
          <HomeButton onClick={handleClose}>Go to home</HomeButton>
        </Link>
      </Container>
    </Dialog>
  );
}
export default UploadBox;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  h1 {
    font-weight: 550;
    font-size: 20px;
    text-align: center;
  }
`;
const HomeButton = styled(Button)`
  background-color: #fe2c55 !important;
  color: whitesmoke !important;
  font-weight: 550 !important;
  width: fit-content !important;
  margin: 20px 0px !important;
  padding: 10px 30px !important;
  cursor: pointer;
`;
