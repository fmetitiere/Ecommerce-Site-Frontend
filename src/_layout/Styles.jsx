import styled from "styled-components";

export const H2 = styled.h2`
  font-size: 1.3rem;
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ theme }) => theme.fontColor};
  margin: 0;
  font-weight: 400;
`;

export const H3 = styled.h2`
  font-size: 1.125rem;
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ theme }) => theme.fontColor};
  margin: 0;
  font-weight: 400;
`;

const LoaderComponent = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: ${({ theme }) => theme.fontColor};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`;

export function Loader() {
  return (
    <LoaderComponent>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </LoaderComponent>
  );
}

const LoaderButtonComponent = styled.div`
  display: inline-block;
  position: relative;
  width: 1rem;
  height: 1rem;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 1rem;
    height: 1rem;
    border: 3px solid #0AD4FA;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #0AD4FA transparent transparent transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export function LoaderButton() {
  return (
    <LoaderButtonComponent>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </LoaderButtonComponent>
  );
}
