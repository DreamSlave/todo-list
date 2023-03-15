import React from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components"

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 56px;
  width: 100%;
  background-color: skyblue;
`;

function Temp() {
  return (
    <div>
      <HeaderContainer className="header">
        <Link to="/first">FirstLayout</Link><br/><br/>
        <Link to="/main">MainLayout</Link><br/><br/>
        <Link to="/task">Task</Link>
      </HeaderContainer>
    </div>
  );
}

export default Temp;
