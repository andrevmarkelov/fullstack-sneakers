import {Card} from "../components/Card";
import React from "react";

export const Home = ({ searchValue,
  onChangeSearchInput,
  setSearchValue,
  items,
  onAddToFavorite,
  onAddToCart,
  isLoading}) => {

  let arrayItem = items;

  const renderItems = () => {
    return (isLoading ? [...arrayItem] : items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))).map(item => (
      <Card
        key={item.id}
        id={item.id}
        title={item.title}
        price={item.price}
        image={item.image}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onClickPlusAddCart={(obj) => onAddToCart(obj)}
        loading={isLoading}
      />
    ))
  }

  return (
    <div className="content">
      <div className="content-header">
        <h1>{searchValue ? `Search by request: "${searchValue}"` : 'All sneakers'}</h1>
        <div className="search-block">
          <img src="/img/search.svg" alt="Search"/>
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Search..."/>
          {searchValue && <div onClick={() => setSearchValue('')} className="clear-input">
            <img src="/img/closing-icon.svg" alt="Clear icon"/>
          </div>}
        </div>
      </div>
      <div className="sneakers">
        {renderItems()}
      </div>
    </div>
  )
};
