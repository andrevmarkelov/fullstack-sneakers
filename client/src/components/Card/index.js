import React from 'react';
import ContentLoader from "react-content-loader"
import styles from './Card.module.scss';
import AppContext from "../../context";

export const Card = ({
  id,
  image,
  title,
  price,
  onClickPlusAddCart,
  onFavorite,
  favorite = false,
  isLoading = false}) => {
  const {isItemAdded} = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorite);

  const onClickPlus = () => {
    onClickPlusAddCart({id, title, image, price});
  }

  const onClickFavorite = () => {
    onFavorite({id, title, image, price});
    setIsFavorite(!isFavorite);
  }

  return (
    <div className={styles.card}>
      {
        isLoading ? <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155"/>
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15"/>
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15"/>
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25"/>
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32"/>
        </ContentLoader> : <>
          {onFavorite && <div className={styles.favorite} onClick={onClickFavorite}>
            <img src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} alt="Unlicked"/>
          </div>}
          <img width={133} height={112} src={image} alt="Sneaker"/>
          <p>{title}</p>
          <div className={styles.cardBottom}>
            <div className={styles.cardPrice}>
              <span>Price:</span>
              <b>{price} USD</b>
            </div>
            {onClickPlusAddCart && <img className={styles.cardPlus} onClick={onClickPlus}
                  src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/plus.svg"}
                  alt="plus"/>}
          </div>
        </>
      }
    </div>
  );
};