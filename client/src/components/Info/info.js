import React from 'react';
import styles from './Info.module.scss';
import AppContext from "../../context";

const Info = ({image, title, description}) => {
  const {setCartOpened} = React.useContext(AppContext);

  return (
    <div className={styles.cartEmpty}>
      <img width={120} src={image} alt="Empty cart"/>
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={() => setCartOpened(false)} className={styles.greenButton}>
        <img src="/img/arrow.svg" alt="Arrow"/>
        Return back
      </button>
    </div>
  )
}

export default Info;
