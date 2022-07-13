import React from 'react';
import axios from "axios";

import {Card} from "../components/Card";

export const Orders = () => {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const {data} = await axios.get('http://localhost:4000/api/orders');
        setOrders(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="content">
      <div className="content-header">
        <h1>My orders</h1>
      </div>
      <div className="orders-wrapper">
        {orders && orders.map(item => (
          <div className='order-card' key={item.id}>
            <div className='order-header'>
              <p>Number Order: {item.id}</p>
              <p>Transaction date: {item.transaction_date}</p>
            </div>
            <div className="order-items">
              {JSON.parse(item.items).map(product => (
                <Card
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.image}
                  loading={isLoading}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}














