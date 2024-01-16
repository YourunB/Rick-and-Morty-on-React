import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { PagesRouter } from './routes/PagesRouter';
import Footer from './components/Footer';
import SpaceStars from './components/SpaceStars';

export const App = () => (
  <BrowserRouter>
    <main className='app'>
      <PagesRouter/>
    </main>
    <Footer/>
    <SpaceStars/>
  </BrowserRouter>
);
