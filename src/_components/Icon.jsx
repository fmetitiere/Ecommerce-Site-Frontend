import React from "react";
import styled from "styled-components";
import { ReactSVG } from "react-svg";

const LogoWrapper = styled.div`
  svg {
    width: 2.423rem;
    height: auto;
  }
  div {
    display: flex;
  }
`;

const IconWrapper = styled.div`
  div {
    display: flex;
    align-items: center;
  }
`;

const MenuIcon = styled.div`
  align-self: center;
  cursor: pointer;
  svg {
    width: 1.5rem;
    height: auto;
    fill: ${({ theme }) => theme.iconColor};
  }
`;

const ArrowIcon = styled.div`
  align-self: center;
  cursor: pointer;
  svg {
    width: 3rem;
    height: auto;
    fill: ${({ theme }) => theme.iconColor};
  }
`;

export default function Icon({ name, ...props }) {
  switch (name) {
    case "logo":
      return (
        <LogoWrapper>
          <ReactSVG src="_assets/icons/logo.svg" />
        </LogoWrapper>
      );
    case "coin":
      return (
        <IconWrapper>
          <ReactSVG src="_assets/icons/money.svg" />
        </IconWrapper>
      );
    case "shop":
      return (
        <IconWrapper>
          <ReactSVG src="_assets/icons/shop.svg" />
        </IconWrapper>
      );
    case "shopWhite":
      return (
        <IconWrapper>
          <ReactSVG src="_assets/icons/shop-white.svg" />
        </IconWrapper>
      );
    case "success":
      return (
        <IconWrapper>
          <ReactSVG src="_assets/icons/success.svg" />
        </IconWrapper>
      );
    case "menu":
      return (
        <MenuIcon {...props}>
          <ReactSVG src="_assets/icons/menu.svg" />
        </MenuIcon>
      );
    case "arrowRight":
      return (
        <ArrowIcon {...props}>
          <ReactSVG src="_assets/icons/arrowRight.svg" />
        </ArrowIcon>
      );
      case "arrowLeft":
      return (
        <ArrowIcon {...props}>
          <ReactSVG src="_assets/icons/arrowLeft.svg" />
        </ArrowIcon>
      );
    case "close":
      return (
        <MenuIcon {...props}>
          <ReactSVG src="_assets/icons/close.svg" />
        </MenuIcon>
      );
    default:
      return (
        <IconWrapper>
          <ReactSVG src="_assets/icons/logo.svg" />
        </IconWrapper>
      );
  }
}
