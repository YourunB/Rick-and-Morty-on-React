import React from 'react';

import './Footer.scss';

const Footer = () => {

    return (
      <footer className='Footer'>
        <a href='https://github.com/yourunb' target='_blank' rel='noreferrer' className='Footer__link'>
          <p className='Footer__link__creator'>&copy; 2024 created by Yury Butskevich</p>
        </a>
        <a href='https://github.com/yourunb' target='_blank' rel='noreferrer' className='Footer__link'>
          <img className='Footer__link__img' src='./images/svg/github.svg' alt='Github'/>
        </a>
      </footer>
    );

};

export default Footer;
