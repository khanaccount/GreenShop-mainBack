import React, { useState, useEffect } from "react";
import axios from "axios";
import s from "./index.module.scss";
import { getAuthHeaders } from "../../../api/auth";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  sku: string;
  salePrice: number;
  quantity: number;
  totalPrice: string;
  mainImg: string;
  size: {
    id: number;
    name: string;
  };
}

interface Order {
  id: number;
  subtotalPrice: string;
  shippingPrice: string;
  totalPrice: string;
  product: Product[];
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const authHeaders = getAuthHeaders();
        const response = await axios.get(
          `https://greenshop-backend-production.up.railway.app/order/`,
          {
            headers: {
              Authorization: authHeaders?.headers?.Authorization,
            },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className={s.orders}>
      {orders.map((order) => (
        <div key={order.id} className={s.orderContainer}>
          <div className={s.orderMainInfo}>
            <h2 className={s.orderTitle}>Заказ #{order.id}</h2>
            <div className={s.orderPrices}>
              <p className={s.orderInfo}>Итоговая цена : {order.subtotalPrice}</p>
              <p className={s.orderInfo}>Цена доставке: {order.shippingPrice}</p>
              <p className={s.orderInfo}>Итоговая цена: {order.totalPrice}</p>
            </div>
          </div>
          <div className={s.productsContainer}>
            {order.product.map((product) => (
              <Link to={`/shop/${product.id}`} key={product.id} className={s.productItem}>
                <img
                  src={`https://greenshop-backend-production.up.railway.app${product.mainImg}`}
                  alt={product.name}
                  className={s.productImage}
                />
                <div className={s.hoverInfo}>
                  <p>Название: {product.name}</p>
                  <p>SKU: {product.sku}</p>
                  <p>Цена продажи : {product.salePrice}</p>
                  <p>Кол-во: {product.quantity}</p>
                  <p>Итоговая цена: {product.totalPrice}</p>
                  <p>Размер: {product.size.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
