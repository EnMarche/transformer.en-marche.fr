import React from 'react';
import { connectStateResults, connectHits } from 'react-instantsearch/connectors';
import { Hits } from 'react-instantsearch/dom';

import Theme from './theme';

const DefaultDescription = ({ children }) => {
  if (children) {
    return (
      <div className="intro-description">
        <p>{children}</p>
      </div>
    );
  } else {
    return (
      <div className="intro-description"></div>
    );
  }
}


const Intro = ({ title, description, children }) =>
  <div className="intro">
    <h1 className="intro-header">{title}</h1>

    <DefaultDescription>
      {description}
    </DefaultDescription>

    {children}
  </div>


const HitsWithIntro = connectHits(({ hits, profile }) => {
  if (!hits.length) {
    return "No results in french.";
  }
  let [ hit ] = hits;
  let description = hit.descriptions[profile];
  return (
    <Intro title={profile} description={description}>
      <Hits hitComponent={Theme} />
    </Intro>
  );
});

const Results = connectStateResults(({ searchState: { menu = {} }, props }) => {
  let chosenProfile = menu['measures.profiles.title'];
  return <HitsWithIntro profile={chosenProfile} />
});

export default Results;
