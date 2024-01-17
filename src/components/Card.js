import React from 'react';

import './Card.scss';

const Card = props => {

  return (
    <div className='Card'>
      <img className='Card__img' src={props.characterImage}></img>
      <p className='Card__name'>{props.characterName}</p>
    </div>
  );

};

export default React.memo(Card);
