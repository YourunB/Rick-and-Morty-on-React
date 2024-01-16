import React from 'react';

import './PageStart.scss';

export const PageStart = () => {
          
    return (
      <section className='PageStart'>
        <img className='PageStart__img' src='./images/title.png' alt='Rick and Morty'/>
        <h1 className='PageStart__title'>Rick and Morty is an American adult animated science fiction sitcom</h1>
        <a href='/main' rel='noreferrer' className='PageStart__link'>
          <img className='PageStart__link__img' src='./images/start.png' alt='Start'/>
          <p className='PageStart__link__name'>START</p>
        </a>
        <div className='PageStart__description'>
          <p>This is one of the <span>best animated projects</span>, beloved by cinema fans, avid TV series fans and fans of computer games.</p>
          <p>The main characters and most of the relationships between the characters were developed under the impression of watching “The Simpsons,” “Adventure Time,” and “Ren and Stimpy.”</p>
        </div>
      </section>
    );
    
};
