import React, { useEffect } from 'react';
import "regenerator-runtime/runtime";
import { useDispatch, useSelector } from 'react-redux';
import { updateSaveCharacters, updatePage, updateLoad } from "../redux/dataSlice.js";

import { PagesLinks } from '../components/PagesLinks';
import PageBackground from '../components/PageBackground';
import Card from '../components/Card';

import './PageMain.scss';

export const PageMain = () => {

  const dispatch = useDispatch();
  const dataRedux = useSelector( state => state.data );

  useEffect( () => {
  }, [dataRedux] );

  function getData(link) {
    let url = link;
    const options = {
      method: 'GET',
    };
    fetchAsync();
    async function fetchAsync() { 
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        saveCharacters(data.results);
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

  if (dataRedux.charactersArr === null) getData('https://rickandmortyapi.com/api/character/?page=1');

  function throttle(callee, timeout) {
    let timer = null
  
    return function perform(...args) {
      if (timer) return
  
      timer = setTimeout(() => {
        callee(...args)
  
        clearTimeout(timer)
        timer = null
      }, timeout)
    }
  }

  window.addEventListener("scroll", throttle( () => {
    const height = document.body.offsetHeight;
    const screenHeight = window.innerHeight;
    const scrolled = window.scrollY;
    const threshold = height - screenHeight / 4;
    const position = scrolled + screenHeight;
  
    //if (scrolled > 400) btnUp.classList.remove('unvisible');
    //else btnUp.classList.add('unvisible');
    if (position >= threshold && dataRedux.page < 42 && dataRedux.load === false) {
      dispatch(updatePage(dataRedux.page + 1));
      dispatch(updateLoad(true));
      getData(`https://rickandmortyapi.com/api/character/?page=${dataRedux.page + 1}`);
    }
  }, 1000));

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
        <label className='PageMain__head__checkbox'>Pagination: <input type={'checkbox'}></input></label>
      </section>
      <section className='PageMain__cards'>
        {cardCode}
      </section>
    </main>
  );
    
};
