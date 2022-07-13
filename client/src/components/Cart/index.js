import React from 'react';
import styles from './Cart.module.scss';
import axios from "axios";
import {useCart} from "../../hooks/useCart";

import Info from "../Info/info";

export const Cart = ({onClose, onRemove, items = []}) => {
  const {cartItems, setCartItems, totalPrice} = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const {data} = await axios.post('http://localhost:4000/api/orders', {items: JSON.stringify(cartItems)});

      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      cartItems.forEach(item => {
        axios.delete('http://localhost:4000/api/cart/' + item.id);
      });
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.drawer}>
        <h2>Cart <img onClick={onClose} className={styles.cartRemove} src="/img/btn-remove.svg" alt="remove"/></h2>
        {items.length > 0 ? <div className={styles.cartBlock}>
          <div className={styles.items}>
            {items.map((obj) => (
              <div key={obj.id} className={styles.cartItem}>
                <img width={70} height={70} src={obj.image} alt="sneaker"/>
                <div className={styles.cartInfo}>
                  <p>{obj.title}</p>
                  <b>{obj.price} USD</b>
                </div>
                <img className={styles.cartRemove} onClick={() => onRemove(obj.id)} src="/img/btn-remove.svg"
                     alt="Remove"/>
              </div>
            ))}
          </div>
          <div className={styles.cartTotal}>
            <ul>
              <li>
                <span>Total:</span>
                <div></div>
                <b>{totalPrice} $</b>
              </li>
              <li>
                <span>Tax 5%:</span>
                <div></div>
                <b>{totalPrice / 100 * 5} $</b>
              </li>
            </ul>
            <button disabled={isLoading} onClick={onClickOrder} className={styles.greenButton}>Place an order <img src="/img/arrow.svg" alt="Arrow"/></button>
          </div>
        </div> : <Info
          title={isOrderComplete ? "The order has been placed!" : "The cart is empty"}
          description={isOrderComplete ? `Your order #${orderId} will be delivered to courier delivery soon` : "Add at least one pair of sneakers to place an order."}
          image={isOrderComplete ? "/img/complete-order.png" : "/img/empty-сart.png" } />}
      </div>
    </div>
  );
};