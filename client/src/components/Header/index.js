import React from 'react';
import styles from './Header.module.scss';
import {Link} from "react-router-dom";
import {useCart} from "../../hooks/useCart";

export const Header = (props) => {
  const {totalPrice} = useCart();

  return (
    <header>
      <div className={styles.headerLogo}>
        <Link to="/">
          <img width={40} height={40} src="/img/logo.svg" alt="Logo"/>
        </Link>
        <div className={styles.headerInfo}>
          <h3>FullStack Sneakers</h3>
          <p>Shop the best sneakers</p>
        </div>
      </div>
      <ul>
        <li onClick={props.onClickCart} className={styles.cartButton}>
          <img width={18} height={18} src="/img/cart.svg" alt="Cart"/>
          <span>{totalPrice} USD</span>
        </li>
        <li className={styles.favoriteIcon}>
          <Link to="/favorite">
            <img width={20} height={20} src="/img/heart.svg" alt="Heart"/>
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img width={20} height={20} src="/img/user.svg" alt="User"/>
          </Link>
        </li>
      </ul>
    </header>
  );
};