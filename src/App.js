import React, { useState } from "react";
import { createStore, applyMiddleware } from "redux";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import styled from "styled-components";
import { isMobile } from "react-device-detect";

import { ThemeButtons, ThemeLight, Themes } from "./_layout/Themes";
import Routes from "./_components/Routes";

import shopReducer from "./_aerolab/reducer";

const store = createStore(
  shopReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const ButtonWrapper = styled.div`
  background: ${({ theme }) => theme.BackgroundColor};
  position: fixed;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  z-index: 199;
  box-shadow: ${({ theme }) => theme.boxShadow};
  right: 0;
  top: 12rem;

  border-radius: 0.5rem 0 0 0.5rem;
`;

const ButtonStyled = styled.button`
  background: ${(props) => props.background};
  line-height: 0;
  border: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 50rem;
  margin: 0 0.2rem;
  cursor: pointer;
`;

function App() {
  const [themeId, setThemeId] = useState(ThemeLight.id);

  const handleOnClick = (event) => {
    setThemeId(event.target.value);
  };

  const Buttons = () => {
    return ThemeButtons.map((element) => (
      <ButtonStyled
        small
        background={element.background}
        color={element.color}
        value={element.id}
        onClick={handleOnClick}
      ></ButtonStyled>
    ));
  };

  const ButtonsSelector = () => {
    return (
      <ButtonWrapper>
        <Buttons />
      </ButtonWrapper>
    );
  };

  const changeTheme = (themeId) => {
    return Themes.find((theme) => theme.id === themeId);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={changeTheme(themeId)}>
        <ButtonsSelector />
        <Routes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
