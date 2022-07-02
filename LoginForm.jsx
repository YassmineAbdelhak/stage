import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/userAction";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import styled from "styled-components";
import Navbar from "../Navbar/Navbar";
import Announcement from "../Annoucement/Annoucement";
import Footer from "../Footer/Footer";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-size: cover;
  justify-content: center;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://static.pullandbear.net/2/photos//2022/V/0/1/p/4714/327/413/02/4714327413_5_1_8.jpg?t=1645116084079&imwidth=1024")
      center;
`;

const Wrapper = styled.div`
  padding: 20px;
  background-color: white;
  width: 25%;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  margin-bottom: 10px;
  cursor: pointer;
`;
const Account = styled.h6`
  font-size: 14px;
  font-weight: 300;
  color: black;
  text-decoration: none;
`;
const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

function LoginForm() {
  const loginreducer = useSelector((state) => state.loginReducer);
  const { loading, error } = loginreducer;
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const login = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    console.log(user);
    dispatch(loginUser(user));
  };

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div>
      <Announcement/>
      <Navbar/>
      <Container>
        <Wrapper>
          <Title>SIGN IN</Title>
          {error && <Error error="Invalid Login Informations!" />}
          {loading && <Loader />}
          <Form onSubmit={login}>
            <Input
              placeholder="Email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <Input
              placeholder="Password"
              type="password"
              required
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />

            <Button>LOGIN</Button>
            <Account>DO NOT HAVE AN ACCOUNT?</Account>
            <Link href="/register">CREATE A NEW ONE</Link>
          </Form>
        </Wrapper>
      </Container>
      <footer>
          <Footer />
        </footer>
    </div>
  );
}

export default LoginForm;
