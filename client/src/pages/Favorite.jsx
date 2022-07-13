import React from 'react';

import {Card} from "../components/Card";
import AppContext from "../context";

export const Favorite = () => {
  const {favorites, onAddToFavorite} = React.useContext(AppContext);

  return (
    <div className="content">
      <div className="content-header">
        <h1>My Bookmarks</h1>
      </div>
      <div className="sneakers">
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
      </div>
    </div>
  )
};
