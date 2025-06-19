import React from "react";
import styled from "styled-components";

const NavStyled = styled("nav")({
  backgroundColor: "black",
  color: "#FFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "40px",
  height: "70px",
  fontFamily: "aduma"
});

const NavComponent: React.FC = () => {
  return (
    <>
      <NavStyled>השחקנים</NavStyled>
    </>
  );
};

export default NavComponent;
