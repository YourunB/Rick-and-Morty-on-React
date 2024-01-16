import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { PageStart } from '../pages/PageStart';
import { PageMain } from '../pages/PageMain';
import { PageAbout } from '../pages/PageAbout';

export const PagesRouter = () => {
          
    return (
      <Routes>
        <Route path="/" element={<PageStart/>} />
        <Route path="/main" element={<PageMain/>} />
        <Route path="/about" element={<PageAbout/>} />
      </Routes>
    );
    
};
