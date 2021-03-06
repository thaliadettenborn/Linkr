import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { mediaMobile, mediaMedium } from './style/media';
import UserContext from '../context/UserContext';

export default function Trending() {
  const { user } = useContext(UserContext);
  const [ trendings, setTrendings ] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get("https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/hashtags/trending",{headers: {"User-Token": user.token}})
      .then(response => {
        setTrendings(response.data.hashtags)
      })
  },[])

  function openHashtagPage(event){
    event.preventDefault();
    const { hashtag } = event.target.elements;
    history.push(`/hashtag/${hashtag.value}`);
    event.target.reset();
  }

  return(
    <Container>
      <h1>trending
        <form onSubmit={openHashtagPage}>
          <Search placeholder='#...' name='hashtag' />
        </form>
      </h1>
      {trendings.map(hashtag => 
        <Link to={`/hashtag/${hashtag.name}`} key={hashtag.id}>
          <Item key={hashtag.id}>
            {`#${hashtag.name}`}
          </Item>
        </Link>
      )}
    </Container>
  )
};

const Container = styled.aside`
  width: 20%;
  position: fixed;
  top: 199px;
  right: 6%;
  background: #171717;
  border-radius: 16px;

  h1{
    width: 100%;
    padding: 20px 20px 10px 20px;
    font-family: 'Oswald', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 27px;
    color: #FFFFFF;
    border-bottom: 1px solid #484848;
    margin-bottom: 10px;
  }

  ${mediaMedium}{
    border-bottom: none;
    margin-bottom:none;
  }

  ${mediaMobile}{
    display: none;
  }
`;

const Item = styled.p`
  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  line-height: 23px;
  letter-spacing: 0.05em;
  color: #FFFFFF;
  padding: 0 20px;
  margin-bottom: 8px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Search = styled.input`
  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.05em;
  width: 40%;
  color: black;
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 4px;
  border: none;

  ${mediaMedium}{
    position: initial;
    width: 100%;
    margin-top: 5px;
  }
`;

