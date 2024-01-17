import React, { useState, useEffect } from 'react';
import "regenerator-runtime/runtime";
import { useDispatch, useSelector } from 'react-redux';
import { updateSaveCharacters, upadteScrollCharacters, updatePage, updateLoad } from "../redux/dataSlice.js";
import { NavLink } from 'react-router-dom';

import { PagesLinks } from '../components/PagesLinks';
import PageBackground from '../components/PageBackground';
import Card from '../components/Card';

import './PageMain.scss';
import { isDisabled } from '@testing-library/user-event/dist/utils/index.js';

export const PageMain = () => {

  const [pagination, setPagination] = useState(false);

  const dispatch = useDispatch();
  const dataRedux = useSelector( state => state.data );

  useEffect(() => {
    window.addEventListener("scroll", scrollLoad);
    return () => {
      window.removeEventListener("scroll", scrollLoad);
    }
  }, [dataRedux]);

  function scrollLoad() {
    const height = document.body.offsetHeight;
    const screenHeight = window.innerHeight;
    const scrolled = window.scrollY;
    const threshold = height - screenHeight / 4;
    const position = scrolled + screenHeight;

    if (position >= threshold && dataRedux.page < 42 && dataRedux.load === false && pagination === false) {
      dispatch(updatePage(dataRedux.page + 1));
      dispatch(updateLoad(true));
      getData(`https://rickandmortyapi.com/api/character/?page=${dataRedux.page + 1}`, 'scroll');
    }
  }

  function getData(link, action = 'page') {
    let url = link;
    const options = {
      method: 'GET',
    };
    fetchAsync();
    async function fetchAsync() { 
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (action === 'page') saveCharacters(data.results);
        if (action === 'scroll') scrollCharacters(data.results);
      } catch (error) {
        if (error !== "") console.log("Error: " + error);
      }
    }
  }

  function saveCharacters(charactersArr) {
    dispatch(updateSaveCharacters(charactersArr));
    setTimeout(() => {
      dispatch(updateLoad(false));
    }, 1000)
  }

  function scrollCharacters(charactersArr) {
    dispatch(upadteScrollCharacters(charactersArr));
    setTimeout(() => {
      dispatch(updateLoad(false));
    }, 1000)
}

  if (dataRedux.charactersArr === null) getData('https://rickandmortyapi.com/api/character/?page=1');
  
  function changePagination(e) {
    dispatch(updatePage(1));
    setPagination(!pagination);
    saveCharacters(null);
  }

  function nextPage() {
    if (dataRedux.page < 42) {
      dispatch(updatePage(dataRedux.page + 1));
      getData(`https://rickandmortyapi.com/api/character/?page=${dataRedux.page + 1}`);
    }
  }

  function prevPage() {
    if (dataRedux.page > 1) {
      dispatch(updatePage(dataRedux.page - 1));
      getData(`https://rickandmortyapi.com/api/character/?page=${dataRedux.page - 1}`);
    }
  }

  function locationNav() {
    if (window.location.search !== '' && window.location.search !== `?page=${dataRedux.page}`) {
      let searchText = window.location.search.slice(0, 6);
      let searchPage = window.location.search.slice(6);
      if (searchText === '?page=' && !isNaN(searchPage)) {
        if (Number(searchPage) !== dataRedux.page && Number(searchPage) > 0) {
          setPagination(true);
          dispatch(updatePage(Number(searchPage)));
          setTimeout(() => {getData(`https://rickandmortyapi.com/api/character/?page=${Number(searchPage)}`);}, 0);
        }
      }
    }
  }

  useEffect(() => {
    locationNav();
  }, [window.location.search]);

  let cardCode;
  if (dataRedux.charactersArr !== null) {
    cardCode = dataRedux.charactersArr.map( el => {
      return <Card
        key = {el.id}
        characterName = {el.name}
        characterImage = {el.image}
      />
    });
  }

  return (
    <main className='PageMain'>
      <PageBackground/>
      <PagesLinks/>
      <section className='PageMain__head'>
        <h1 className='PageMain__head__title'>Rick and Morty Characters</h1>
        <label className='PageMain__head__checkbox'>
          Pagination: <input type={'checkbox'} checked={pagination} onChange={(e) => {changePagination(e)}}></input>
        </label>
      </section>
      <section className='PageMain__cards'>
      {pagination === true ?
        <div className='PageMain__cards__controls'>
          <NavLink to={`/main?page=${dataRedux.page - 1}`}>
            <button className='PageMain__btn' disabled={dataRedux.page === 1 ? true : false} onClick={() => {prevPage()}}>&#8656;</button>
          </NavLink>
          <p className='PageMain__cards__controls__page'>{dataRedux.page}</p>
          <NavLink to={`/main?page=${dataRedux.page + 1}`}>
            <button className='PageMain__btn' disabled={dataRedux.page === 42 ? true : false} onClick={() => {nextPage()}}>&#8658;</button>
          </NavLink>
        </div> : null}
        {cardCode}
      </section>
    </main>
  );
    
};
