import React from 'react';
import { Link } from 'react-router-dom';

import {Card} from "../components/Card";
import AppContext from "../context";

export const Favorite = () => {
  const {favorites, onAddToFavorite} = React.useContext(AppContext);
  console.log(favorites);

  return (
    <div className="content">
      <div className="content-header">
        <h1>My Bookmarks</h1>
      </div>
      {favorites.length > 0 ? <div className="sneakers">
        {favorites.map(item => (
          <Card
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            image={item.image}
            favorite={true}
            onFavorite={onAddToFavorite}
          />
        ))}
      </div> : <div className="favorites-empty">
        <h2>The list of favorite products is empty</h2>
        <p>Most likely, you have not added products to your favorites.</p>
        <p>In order to select a product, go to the main page.</p>
        <Link to="/">
          <button><img src="/img/arrow.svg" alt="Arrow"/>Back to Home Page</button>
        </Link>
      </div>}
    </div>
  )
};
