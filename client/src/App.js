import React from 'react';
import axios from "axios";
import {Route, Routes} from "react-router-dom";

import {Cart} from "./components/Cart";
import {Header} from "./components/Header";
import AppContext from './context'

import {Home} from "./pages/Home";
import {Favorite} from "./pages/Favorite";
import {Orders} from "./pages/Orders";


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [cartResponse, FavoritesResponse, itemsResponse] = await Promise.all(([
          axios.get('http://localhost:4000/api/cart'),
          axios.get('http://localhost:4000/api/favorites'),
          axios.get('http://localhost:4000/api/sneakers')
        ]));

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavorites(FavoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find((item) => item.id === obj.id)) {
        setCartItems(prev => prev.filter(item => item.id !== obj.id));
        axios.delete(`http://localhost:4000/api/cart/${obj.id}`);
      } else {
        setCartItems(prev => [...prev, obj]);
        axios.post('http://localhost:4000/api/cart', obj);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const onRemoveItem = async (id) => {
    try {
      axios.delete(`http://localhost:4000/api/cart/${id}`);
      setCartItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favObj => favObj.id === obj.id)) {
        axios.delete(`http://localhost:4000/api/favorites/${obj.id}`);
        setFavorites(prev => prev.filter(item => item.id !== obj.id));
      } else {
        const {data} = await axios.post('http://localhost:4000/api/favorites', obj);
        setFavorites(prev => [...prev, data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isItemAdded = (id) => {
    return cartItems.some(obj => obj.id === id);
  }

  return (
    <AppContext.Provider
      value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems, onAddToCart}}>
      <div className="wrapper">
        {cartOpened ? <Cart items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/> : null}
        <Header onClickCart={() => setCartOpened(true)}/>
        <Routes>
          <Route path="/" exact element={<Home
            searchValue={searchValue}
            cartItems={cartItems}
            onChangeSearchInput={onChangeSearchInput}
            setSearchValue={setSearchValue}
            items={items}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}/>}> </Route>

          <Route path="/favorite" exact
                 element={<Favorite/>}> </Route>

          <Route path="/orders" exact
                 element={<Orders/>}> </Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
