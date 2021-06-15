import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { isMobile } from "react-device-detect";

import { redeemCode } from "../_aerolab/actions";
import { H3 } from "../_layout/Styles";
import Icon from "../_components/Icon";

const Box = styled.div`
  width: auto;
  height: 16rem;
  background: white;
  padding: 1rem;
  position: relative;
  box-shadow: ${({ theme }) => theme.boxShadow};
  opacity: 1;

  .hide {
    opacity: 0;
  }

  &:hover .hide {
    opacity: 1;
    color: red;
    background: rgb(10 212 250 / 86%);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 0.3s all;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ListItem = styled.div`
  ${(isMobile && "width: 80%;") || "width: 90%;"}

  height: 3rem;
  background: white;
  padding: 1rem;
  position: relative;
  box-shadow: ${({ theme }) => theme.boxShadow};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  img {
    width: 6rem;
  }
`;

const Category = styled.p`
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fontFamily};
  color: #a3a3a3;
  margin: 0;
  font-weight: 400;
`;

const ProductName = styled(H3)`
  color: #616161;
`;

const ProductPrice = styled.div`
  h1 {
    font-size: 2.25rem;
    color: white;
    font-family: ${({ theme }) => theme.fontFamily};
    margin: 0;
    font-weight: 400;
    margin-right: 0.5rem;
  }
  p {
    font-size: 1.125rem;
    color: #616161;
    font-family: ${({ theme }) => theme.fontFamily};
    margin: 0;
    font-weight: 400;
    margin-right: 0.5rem;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #d9d9d9;
  margin-bottom: 1rem;
`;

const ImageHistoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PriceInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${(isMobile && "width: auto;") || "width: 100%;"}

  padding: 0 2rem;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const Button = styled.button`
  font-size: 1.125rem;
  font-family: ${({ theme }) => theme.fontFamily};
  color: #616161;
  margin: 1rem 0;
  font-weight: 400;
  border: 0;
  background: white;
  width: 100%;
  padding: 0.5rem;
  border-radius: 50rem;
  cursor: pointer;
`;

const SuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
  h2 {
    font-size: 1.5rem;
    font-family: ${({ theme }) => theme.fontFamily};
    color: white;
    margin: 0;
    font-weight: 400;
  }
  svg{
    width: 3rem;
    height: 3rem;
    fill: white;
  }
`;

export default function ProductItem({
  img,
  product,
  category,
  id,
  price,
  history,
}) {
  const dispatch = useDispatch();

  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <>
      {history ? (
        <ListItem>
          <ImageHistoryContainer>
            {!isMobile && <img alt={product} src={img.url} />}
            <div>
              <Category>{category}</Category>
              <ProductName>{product}</ProductName>
            </div>
          </ImageHistoryContainer>
          <ProductPrice>
            <p>{price}</p>
            <Icon name="coin" />
          </ProductPrice>
        </ListItem>
      ) : (
        <>
          <Box>
            <div class="front">
              <ImageContainer>
                <img alt={product} src={img.url} />
              </ImageContainer>
              <Category>{category}</Category>
              <ProductName>{product}</ProductName>
              <IconWrapper>
                <Icon name="shop" />
              </IconWrapper>
            </div>

            <div class="hide">
              <PriceInfo>
                {(showSuccess && (
                  <SuccessWrapper>
                    <Icon name="success" /> <h2>Redeemed!</h2>
                  </SuccessWrapper>
                )) || (
                  <>
                    <ProductPrice>
                      <h1>{price}</h1>
                      <Icon name="coin" />
                    </ProductPrice>
                    <Button
                      type="button"
                      onClick={() => dispatch(redeemCode(id, setShowSuccess))}
                    >
                      Redeem now
                    </Button>
                  </>
                )}
              </PriceInfo>
              <IconWrapper>
                <Icon name="shopWhite" />
              </IconWrapper>
            </div>
          </Box>
        </>
      )}
    </>
  );
}
