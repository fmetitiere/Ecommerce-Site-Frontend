import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { fetchProductsHistory, addUserPoints } from "../_aerolab/actions";
import ProductItem from "../_components/ProductItem";
import { H2, LoaderButton } from "../_layout/Styles";

const TotalWrapper = styled.div`
  margin: 1rem 0;
`;

const Form = styled.form`
  select {
    border: 0;
    border-bottom: 1px solid;
    padding: 0.2rem;
    outline: 0;
    font-family: ${({ theme }) => theme.fontFamily};
    color: ${({ theme }) => theme.fontColor};
    background: transparent;
    font-size: 1.2rem;
    width: 6rem;
    margin-right: 1rem;
  }
  option {
    background: ${({ theme }) => theme.topBarColor};
  }
`;

const ButtonComponent = styled.button`
  font-size: 1.125rem;
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ theme }) => theme.button.primaryColor};
  margin: 1rem 0;
  width: 8rem;
  font-weight: 400;
  border: 1px solid ${({ theme }) => theme.button.primaryColor};
  background: transparent;
  padding: 0.5rem;
  border-radius: 50rem;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.button.primaryColor};
    transition: 0.3s all;
    color: ${({ theme }) => theme.button.primaryFontHoverColor};
  }
`;

const ButtonLoader = styled(ButtonComponent)`
  &:hover {
    background: transparent;
  }
`;

function Button({ children, loading, ...props }) {
  return (
    (loading && (
      <ButtonLoader {...props}>
        <LoaderButton />
      </ButtonLoader>
    )) || <ButtonComponent {...props}>{children}</ButtonComponent>
  );
}

export default function History() {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchProductsHistory());
  }, [dispatch]);

  const renderProducts = () => {
    if (state.error) {
      return <div>Error</div>;
    }

    return state.history.map((e) => {
      return (
        <>
          <ProductItem
            history
            img={e.img}
            category={e.category}
            product={e.name}
            id={e._id}
            price={e.cost}
          />
        </>
      );
    });
  };

  const onSubmit = () => {
    if (state.isFetching) {
      return <div>Loader</div>;
    }

    const amount = parseInt(document.getElementById("amount").value);

    dispatch(addUserPoints(amount));
  };

  return (
    <>
      <Form>
        <select name="amount" id="amount">
          <option value="1000">1000</option>
          <option value="5000">5000</option>
          <option value="7500">7500</option>
        </select>
        <Button loading={state.isFetching} onClick={onSubmit} type="button">
          Add Points
        </Button>
      </Form>
      <TotalWrapper>
        <H2>Total items: {state.history.length}</H2>
      </TotalWrapper>
      {renderProducts()}
    </>
  );
}
