import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { isMobile } from "react-device-detect";

import { fetchProducts, sortPorduct } from "../_aerolab/actions";
import ProductItem from "../_components/ProductItem";
import { Loader, H2 } from "../_layout/Styles";
import Icon from "../_components/Icon";

const Body = styled.div`
  background: ${({ theme }) => theme.bodyColor};
  height: 100%;

  ${(isMobile && "padding: 4rem 2rem;") || "padding: 4rem 8rem;"}
`;

const ProductsWrapper = styled.div`
  display: grid;
  ${(isMobile && "grid-template-columns: 1fr;") ||
  "grid-template-columns: 1fr 1fr 1fr 1fr;"}

  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
`;

const BarWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
`;

const SortWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-left: 1rem;
  border-left: 1px solid #d9d9d9;
  > div {
    display: flex;
    align-items: center;
  }
`;

const H2Styled = styled(H2)`
  color: #a3a3a3;
  margin-left: 1rem;
  padding-right: 0.5rem;
`;

function selectedSort({ selected }) {
  return (
    (selected && "background:#0ad4fa; color: #fff;") ||
    "background:#ededed; color: #a3a3a3;"
  );
}

const Button = styled.button`
  font-size: 1.125rem;
  font-family: ${({ theme }) => theme.fontFamily};

  margin: 0 0.5rem;
  font-weight: 600;
  border: 0;
  ${selectedSort};
  padding: 1rem;
  border-radius: 50rem;
  cursor: pointer;
  &:hover,
  &:active {
    background: #0ad4fa;
    transition: 0.3s all;
    color: white;
  }
`;

export default function ProductList() {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  const pageQuantity = 16;

  const [currentPage, setCurrentPage] = useState(0);

  const incrementPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const decrementPage = () => {
    if (currentPage <= 0) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const renderProducts = () => {
    if (state.error) {
      return <div>Error</div>;
    }

    if (state.loading) {
      return <Loader />;
    }

    return [...state.items]
      .slice(
        currentPage * pageQuantity,
        currentPage * pageQuantity + pageQuantity
      )
      .map((e) => {
        return (
          <ProductItem
            img={e.img}
            category={e.category}
            product={e.name}
            id={e._id}
            price={e.cost}
          />
        );
      });
  };

  return (
    <Body>
      <BarWrapper>
        <H2>
          {currentPage * pageQuantity + pageQuantity} of {state.items.length}{" "}
          products
        </H2>
        {!isMobile && (
          <SortWrapper>
            <div>
              <H2Styled>Sort by:</H2Styled>
              <Button
                type="button"
                onClick={() => dispatch(sortPorduct("MOST_RECENT"))}
                selected={state.selectedSortType === "MOST_RECENT"}
              >
                Most Recent
              </Button>
              <Button
                type="button"
                onClick={() => dispatch(sortPorduct("ASC"))}
                selected={state.selectedSortType === "ASC"}
              >
                Lowest price
              </Button>
              <Button
                type="button"
                onClick={() => dispatch(sortPorduct("DESC"))}
                selected={state.selectedSortType === "DESC"}
              >
                Highest price
              </Button>
            </div>
            <div>
              {currentPage > 0 && (
                <Icon name="arrowLeft" onClick={decrementPage} />
              )}

              {state.items.length > (currentPage + 1) * pageQuantity && (
                <Icon name="arrowRight" onClick={incrementPage} />
              )}
            </div>
          </SortWrapper>
        )}
      </BarWrapper>
      <ProductsWrapper>{renderProducts()}</ProductsWrapper>
    </Body>
  );
}
