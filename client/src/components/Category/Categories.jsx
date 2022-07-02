import React, { Component }  from 'react';
import styled from "styled-components";
import { categories } from "../../data";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  margin-top: 30px;
  padding: 20px;
  justify-content: space-between;
`;

const Categories = () => {
  return (
    <div>
      <hr />
      <Container>
        {categories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </Container>
      <hr />
    </div>
  );
};

export default Categories;
