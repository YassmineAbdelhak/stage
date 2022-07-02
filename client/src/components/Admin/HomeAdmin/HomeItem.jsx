import React, { Component }  from 'react';
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  margin: 3px;
  height: 70vh;
  position: relative;

  flex: 1;
`;
const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

const Title = styled.h1`
  color: white;
  font-weight: bolder;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  border-radius: 2px;
  background-color: white;
  font-weight: 600;
  color: black;
  cursor: pointer;
`;

const HomeItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <a href={item.url}>
          <Button>SHOW NOW</Button>{" "}
        </a>
      </Info>
    </Container>
  );
};

export default HomeItem;
