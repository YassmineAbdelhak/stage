import React, { Component }  from 'react';
import styled from "styled-components";
import HomeItem from "./HomeItem";
const Container = styled.div`
  display: flex;
  margin-top: 30px;
  padding: 20px;
  justify-content: space-between;
`;

const HomeAdmin = () => {
  const homeItem = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1589400066718-871249af5f71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bW9iaWxlJTIwYW5kJTIwbGFwdG9wfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
      title: "PRODUCTS",
      url:'/admin/productslist'
    },
    {
      id: 2,
      img: "https://media.istockphoto.com/photos/omni-channel-technology-of-online-retail-business-picture-id1204099658?k=20&m=1204099658&s=612x612&w=0&h=s2aYy0NVF06GZtDe8kvWYYpFhSg2vFXaJ4jrJMLLsiA=",
      title: "ORDERS",
      url:"/admin/orderslist"
    },
    {
      id: 3,
      img: "https://www.searchcandy.uk/wp-content/uploads/2022/04/retail-search-gr.jpg",
      title: "USERS",
      url:"/admin/userslist",
    },
  ];

  return (
    <div>
      <Container>
        {homeItem.map((item) => (
          <HomeItem item={item} key={item.id} />
        ))}
      </Container>
    </div>
  );
};

export default HomeAdmin;
