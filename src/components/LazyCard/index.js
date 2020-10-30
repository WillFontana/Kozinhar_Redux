import React from 'react';

function LazyCard(props) {
  const loadersCards = [];
  for (let i = 0; i < props.loaders; i++) {
    loadersCards.push(
      <div className="lazy-card-loader" key={i}>
        <div className="thumb-loader"></div>
        <div className="text-loader"></div>
      </div>
    );
  }
  return (
    <div className="lazy-list">
      {loadersCards}
    </div>
  );
}

export default LazyCard;