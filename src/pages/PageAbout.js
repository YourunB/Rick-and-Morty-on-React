import React from "react";

import { PagesLinks } from "../components/PagesLinks";
import PageBackground from "../components/PageBackground";
import "./PageAbout.scss";

export const PageAbout = () => {
  return (
    <main className="PageAbout">
      <PageBackground />
      <PagesLinks />
      <h1 className="PageAbout__title">About Rick and Morty</h1>
      <div className="PageAbout__content">
        <p>
          Rick and Morty is an American adult animated science fiction sitcom
          created by Justin Roiland and Dan Harmon for Cartoon Network&apos;s
          nighttime programming block Adult Swim. The series follows the
          misadventures of Rick Sanchez, a cynical mad scientist, and his
          good-hearted but fretful grandson Morty Smith, who split their time
          between domestic life and interdimensional adventures that take place
          across an infinite number of realities, often traveling to other
          planets and dimensions through portals and on Rick&apos;s flying saucer.
          The general concept of Rick and Morty relies on two conflicting
          scenarios: domestic family drama, and a misanthropic grandfather
          dragging his grandson into hijinks.
        </p>
        <img
          className="PageAbout__content__img"
          src="./images/about-2.png"
          alt="Rick and Morty"
        />
        <p>
          Rick and Morty has been a ratings hit since season one, with
          viewership doubling and tripling over their first six episodes. The
          third season ended with the best ratings in Adult Swim history, an 81
          percent increase in overall viewers over the second season. According
          to a Nielsen poll, the third season was the most watched television
          comedy of adults between the ages of 18 and 24. The president of Adult
          Swim said that Rick and Morty &ldquo;goes beyond just appealing to
          millennials,&rdquo; with statistics suggesting that people of every age tune
          in to the show.
        </p>
        <img
          className="PageAbout__content__img"
          src="./images/about-1.png"
          alt="Rick and Morty"
        />
        <p>
          This SPA was developed for educational purposes.
        </p>
        <p>
          The application is built on the free{" "}
          <a href="https://rickandmortyapi.com/" target={"_blank"} rel="noreferrer">
            Rick and Morty API
          </a>{" "}
          with movie information.
        </p>
      </div>
    </main>
  );
};
