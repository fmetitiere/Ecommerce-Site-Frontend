import React from "react";
import Lottie from "react-lottie";
import styled from "styled-components";
import { isMobile } from "react-device-detect";

import Image from "../_images/header.jpg";
import * as animationData from "../_assets/animation/Background.json";

const defaultOptions = {
  loop: true,
  autoplay: true,

  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

class Animation extends React.Component {
  componentWillMount() {
    this.setState({}, (_) => this.setSpeed());
    this.setState({}, (_) => this.setSegments());
  }
  setSpeed() {
    this.setState({ speed: 0 });
  }
  setSegments() {
    this.setState({ segments: 0 });
  }

  render() {
    return (
      <>
        <Lottie
          isClickToPauseDisabled={true}
          speed={2}
          options={defaultOptions}
          height={"100%"}
          width={"100%"}
        />
        {this.props.children}
      </>
    );
  }
}

const Background = styled.div`
  background-image: url(${Image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 100%;
  width: 100%;
  height: 30rem;
  margin-top: 4rem;
  position: relative;
`;

const Container = styled.div`
${(isMobile && "margin: 0 2rem;") ||
  "margin: 0 8rem;"}
  
  h2 {
    font-size: 4rem;
    font-family: ${({ theme }) => theme.fontFamily};
    color: white;
    position: absolute;
    bottom: 0;
  }
`;

export default function Banner() {
  return (
    <Background>
      <Animation>
        <Container>
          <h2>Electronics</h2>
        </Container>
      </Animation>
    </Background>
  );
}
