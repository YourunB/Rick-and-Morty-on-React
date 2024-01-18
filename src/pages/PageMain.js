import React, { useState, useEffect, useRef } from 'react';
import "regenerator-runtime/runtime";
import { useDispatch, useSelector } from 'react-redux';
import { updateSaveCharacters, upadteScrollCharacters, updatePage, updateLoad } from "../redux/dataSlice.js";
import { NavLink } from 'react-router-dom';

import { appEvents } from '../components/events.js';
import { PagesLinks } from '../components/PagesLinks';
import PageBackground from '../components/PageBackground';
import Card from '../components/Card';
import CardModal from '../components/CardModal';

import './PageMain.scss';

export const PageMain = () => {

  const [pagination, setPagination] = useState(false);
  const [checkedCard, setCheckedCard] = useState(null);

  const btnToTop = useRef(null);
  const animLoad = useRef(null);

  const dispatch = useDispatch();
  const dataRedux = useSelector( state => state.data );

  useEffect(() => {
    appEvents.addListener('EventCheckCard', checkCard);
    appEvents.addListener('EventCloseCardModal', closeCardModal);
    window.addEventListener("scroll", scrollLoad);
    return () => {
      appEvents.removeListener('EventCheckCard', checkCard);
      appEvents.removeListener('EventCloseCardModal', closeCardModal);
      window.removeEventListener("scroll", scrollLoad);
    }
  }, [dataRedux]);

  function checkCard(character) {
    setCheckedCard(character);
  }
  function closeCardModal() {
    setCheckedCard(null); 
  }

  function scrollLoad() {
    const height = document.body.offsetHeight;
    const screenHeight = window.innerHeight;
    const scrolled = window.scrollY;
    const threshold = height - screenHeight / 4;
    const position = scrolled + screenHeight;

    if (scrolled > 400) btnToTop.current.className = 'PageMain__btn to-top';
    else btnToTop.current.className = 'PageMain__btn to-top to-top_hide';

    if (position >= threshold && dataRedux.page < 42 && dataRedux.load === false && pagination === false) {
      dispatch(updatePage(dataRedux.page + 1));
      dispatch(updateLoad(true));
      getData(`https://rickandmortyapi.com/api/character/?page=${dataRedux.page + 1}`, 'scroll');
    }
  }

  function getData(link, action = 'page') {
    if (animLoad.current !== null) {
      animLoad.current.className = 'PageMain__load';
    }
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
    setTimeout(() => {
      if (animLoad.current !== null) {
        animLoad.current.className = 'PageMain__load PageMain__load_hide'
      }
    }, 500);
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
      dispatch(updateLoad(true));
      dispatch(updatePage(dataRedux.page + 1));
      getData(`https://rickandmortyapi.com/api/character/?page=${dataRedux.page + 1}`);
    }
  }

  function prevPage() {
    if (dataRedux.page > 1) {
      dispatch(updateLoad(true));
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

  function scrollToTop() {
    window.scroll({top: 0, behavior: "smooth"});
  }

  let cardCode;
  if (dataRedux.charactersArr !== null) {
    cardCode = dataRedux.charactersArr.map( el => {
      return <Card
        key = {el.id}
        name = {el.name}
        image = {el.image}
        species = {el.species}
        gender = {el.gender}
        origin = {el.origin.name}
        location = {el.location.name}
        episode= {el.episode[0].slice(el.episode[0].lastIndexOf('/') + 1)}
      />
    });
  }

  return (
    <main className='PageMain'>
      {checkedCard !== null ? <CardModal character={checkedCard} /> : null}
      <PageBackground/>
      <PagesLinks/>
      <section className='PageMain__head'>
        <h1 className='PageMain__head__title'>Rick and Morty Characters</h1>
        <div>
          <input className='PageMain__head__input' id='select-pagination' type={'checkbox'} checked={pagination} onChange={(e) => {changePagination(e)}}></input>
          <label className='PageMain__head__label' htmlFor='select-pagination'>Pagination:</label>
        </div>
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
      <img ref={animLoad} className='PageMain__load PageMain__load_hide' src='./images/load.gif' alt='Load'/>
      <button ref={btnToTop} className='PageMain__btn to-top' onClick={scrollToTop}>&#8657;</button>
    </main>
  );
    
};
