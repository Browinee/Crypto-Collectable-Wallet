import styled from "@emotion/styled";
import React from "react";

const Container = styled.div`
  position: absolute;
  display: flex;
  top: 50%;
  left: 44%;
  background-color: rgba(151, 151, 151, 0.6);
  width: 150px;
  height: 80px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;

  & div {
    display: flex;
    position: relative;
    width: 80px;
    height: 70px;
  }

  & div div {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 16px;
    background: rgba(255, 255, 255, 0.73);
    animation: lds-facebook 1.2s infinite;
  }

  & div div:nth-of-type(1) {
    left: 8px;
    animation-delay: -0.24s;
  }

  & div div:nth-of-type(2) {
    left: 32px;
    animation-delay: -0.12s;
  }

  & div div:nth-of-type(3) {
    left: 56px;
    animation-delay: 0s;
  }

  @keyframes lds-facebook {
    0% {
      top: 16px;
      height: 44px;
    }
    25% {
      top: 8px;
      height: 64px;
    }
    50%,
    100% {
      top: 24px;
      height: 32px;
    }
  }
`


const Loading = () => {
    return <Container>
        <div>
            <div/>
            <div/>
            <div/>
        </div>
    </Container>
}

export default Loading;