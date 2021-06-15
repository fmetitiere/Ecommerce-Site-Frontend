import React from "react";
import styled from "styled-components";
import { isMobile } from "react-device-detect";
import { useSelector } from "react-redux";

import History from "../_components/History";
import { H2 } from "../_layout/Styles";
import Icon from "../_components/Icon";
import { formatNumber } from "../_aerolab/actions";

function MenuAnimation({ open }) {
  return `animation-duration: .5s;
        -webkit-animation-duration: .5s;
        ${
          open
            ? `-webkit-animation-name: open; animation-name:open;`
            : `-webkit-animation-name: close; animation-name:close; right: -100% !important;`
        }
        `;
}

const MenuWrapper = styled.div`
  ${MenuAnimation}
  ${(isMobile && "width: 75%;") || "width: 30%;"}
  
  height:100%;
  background: ${({ theme }) => theme.topBarColor};
  z-index: 199;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.boxShadow};
  position: fixed;
  right: 0;
  top: 4.5rem;
  @keyframes close {
    from {
      right: 0;
    }
    to {
      right: -100%;
    }
  }
  @keyframes open {
    from {
      right: -100%;
    }
    to {
      right: 0;
    }
  }
`;

const HistoryWrapper = styled.div`
  height: 40rem;
  width: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0.5em;
  }

  &::-webkit-scrollbar-track {
    box-shadow: 0;
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 0px;
    border-radius: 50rem;
  }
`;

const PointsWrapper = styled.div`
  background: ${({ theme }) => theme.primaryColor};
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  svg {
    margin-left: 0.5rem;
  }
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function SideMenu({ collapsed, toggle }) {
  const state = useSelector((state) => state);

  return (
    <MenuWrapper open={collapsed}>
      <HistoryWrapper>
        {isMobile && (
          <UserWrapper>
            <H2>{state.userInfo.name}</H2>
            <PointsWrapper>
              <H2>{formatNumber(state.userInfo.points)}</H2>
              <Icon name="coin" />
            </PointsWrapper>
          </UserWrapper>
        )}
        <History />
      </HistoryWrapper>
    </MenuWrapper>
  );
}
