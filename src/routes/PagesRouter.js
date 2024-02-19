import React from "react";
import { Route, Routes } from "react-router-dom";

import { PageStart } from "../pages/PageStart";
import { PageMain } from "../pages/PageMain";
import { PageProducts } from "../pages/PageProducts";
import { PageWorks } from "../pages/PageWorks";
import { PageContacts } from "../pages/PageContacts";
import { PageCompany } from "../pages/PageCompany";

export const PagesRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PageStart />} />
      <Route path="/main" element={<PageMain />} />
      <Route path="/products" element={<PageProducts />} />
      <Route path="/works" element={<PageWorks />} />
      <Route path="/contacts" element={<PageContacts />} />
      <Route path="/company" element={<PageCompany />} />
    </Routes>
  );
};
