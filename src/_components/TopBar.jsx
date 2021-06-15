import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { isMobile } from "react-device-detect";

import { fetchUser, formatNumber } from "../_aerolab/actions";
import Icon from "../_components/Icon";
import SideMenu from "./SideMenu";
import { H2 } from "../_layout/Styles";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.topBarColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  top: 0;
  z-index: 200;
`;

const UserInfo = styled.div`
  display: ${(isMobile && "flex") || "grid"};
  grid-template-columns: auto auto 1fr;
  grid-column-gap: 1rem;
  h2 {
    align-self: center;
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

export default function TopBar() {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const renderUser = () => {
    if (state.userError) {
      return <>User</>;
    }

    return (
      <>
        <Wrapper>
          <Icon name="logo" />
          <UserInfo>
            {!isMobile && (
              <>
                <H2>{state.userInfo.name}</H2>
                <PointsWrapper>
                  <H2>{formatNumber(state.userInfo.points)}</H2>
                  <Icon name="coin" />
                </PointsWrapper>
              </>
            )}

            {(collapsed && <Icon onClick={toggle} name="close" />) || (
              <Icon onClick={toggle} name="menu" />
            )}
          </UserInfo>
        </Wrapper>
        <SideMenu collapsed={collapsed} toggle={toggle} />
      </>
    );
  };

  return <div>{renderUser()}</div>;
}
