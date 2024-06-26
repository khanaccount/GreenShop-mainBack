import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuthHeaders } from "../../../api/auth";
import Delete from "../../OrderQuantitySelector/svg/delete";
import axios from "axios";

import s from "./index.module.scss";

export interface OrderItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  mainImg: string;
  totalPrice: string;
  sku: string;
  size: {
    id: number;
    name: string;
  };
  idProduct: number;
}

export interface OrderPrices {
  subtotalPrice: string;
  shippingPrice: string;
  totalPrice: string;
  isUsedCoupon: boolean;
  couponDiscount: string;
  isDiscountCoupon: boolean;
  isFreeDelivery: boolean;
}

interface ShippingAddress {
  id: number;
  state: string;
  phone: string;
  city: string;
  region: string;
  streetAddress: string;
  lastName: string;
  firstName: string;
  customer: {
    email: string;
    username: string;
    id: number;
  };
}

export interface OrderInfo {
  prices: OrderPrices;
  output: OrderItem[];
}

const Payment: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<number | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress[]>([]);
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({
    prices: {
      subtotalPrice: "",
      shippingPrice: "",
      totalPrice: "",
      isUsedCoupon: false,
      couponDiscount: "",
      isDiscountCoupon: false,
      isFreeDelivery: false,
    },
    output: [],
  });

  useEffect(() => {
    fetchItems();
    fetchShippingAddresses();
  }, []);

  const fetchItems = () => {
    const authHeaders = getAuthHeaders();
    axios
      .get<OrderInfo>(
        "https://greenshop-backend-production.up.railway.app/api/shop/cart/",
        authHeaders
      )
      .then((response) => {
        setOrderInfo(response.data);
      })
      .catch((error) => {
        console.error("Error response:", error);
      });
  };

  const fetchShippingAddresses = () => {
    const token = getAuthHeaders();
    axios
      .get("https://greenshop-backend-production.up.railway.app/api/shop/shippingAddress/", token)
      .then((response) => {
        setShippingAddress(response.data);
      })
      .catch((error) => {
        console.error("Error fetching shipping address data: ", error);
      });
  };

  const handleMethodClick = (methodNumber: number) => {
    if (selectedMethod === methodNumber) {
      setSelectedMethod(null);
    } else {
      setSelectedMethod(methodNumber);
    }
  };

  const handleAddressClick = (index: number) => {
    setSelectedAddress(index === selectedAddress ? null : index);
  };

  const handleDeleteAddress = (addressIdToDelete: number) => {
    const authHeaders = getAuthHeaders();
    const requestData = {
      shippingAddress: addressIdToDelete,
    };

    axios
      .delete("https://greenshop-backend-production.up.railway.app/api/shop/shippingAddress/", {
        headers: {
          Authorization: authHeaders?.headers?.Authorization,
        },
        data: requestData,
      })
      .then(() => {
        console.log(`Shipping address with ID ${addressIdToDelete} deleted successfully`);
        axios
          .get(
            "https://greenshop-backend-production.up.railway.app/api/shop/shippingAddress/",
            authHeaders
          )
          .then((response) => {
            setShippingAddress(response.data);
          })
          .catch((error) => {
            console.error("Error fetching updated shipping addresses after deletion: ", error);
          });
      })
      .catch((error) => {
        console.error(`Error deleting shipping address with ID ${addressIdToDelete}:`, error);
      });
  };

  const handlePlaceOrder = () => {
    if (!isAddressSelected || !isMethodSelected) {
      alert("Address or Payment Method is not selected. Cannot place order.");
      return;
    }
    const authHeaders = getAuthHeaders();
    const selectedAddressId = selectedAddress !== null ? shippingAddress[selectedAddress].id : null;
    const requestData = {
      shippingAddress: selectedAddressId,
      paymentMethod: selectedMethod,
    };

    const placeOrderButtonStyle =
      isAddressSelected && isMethodSelected ? s.placeOrderSelected : s.placeOrder;

    if (placeOrderButtonStyle === s.placeOrderDisabled) {
      console.log("Button is disabled. Cannot place order.");
      return;
    }

    axios
      .post(
        "https://greenshop-backend-production.up.railway.app/api/shop/transaction/",
        requestData,
        {
          headers: {
            Authorization: authHeaders?.headers?.Authorization,
          },
        }
      )
      .then((response) => {
        setShippingAddress(response.data);
      })
      .catch((error) => {
        console.error("Error fetching shipping address data: ", error);
      });
  };

  const isAddressSelected = selectedAddress !== null;
  const isMethodSelected = selectedMethod !== null;

  const placeOrderButtonStyle =
    isAddressSelected && isMethodSelected ? s.placeOrderSelected : s.placeOrder;

  return (
    <div className={s.payment}>
      <div className={s.addressBlock}>
        <h5 className={s.billingAddress}>Адрес для выставления счета</h5>
        <Link className={s.newAdressesLink} to={"/account"}>
          <button className={s.newAdresses}>Добавить новые адреса</button>
        </Link>
        <div className={s.addedAddresses}>
          {Array.isArray(shippingAddress) &&
            shippingAddress.length > 0 &&
            shippingAddress.map((address, index) => (
              <div onClick={() => handleAddressClick(index)} className={s.adderss} key={index}>
                <img className={s.cyrcle0} src="/img/payment/cyrcle0.svg" alt="cyrcle" />
                {selectedAddress === index && (
                  <img className={s.cyrcle1} src="/img/payment/cyrcle1.svg" alt="cyrcle" />
                )}
                <h3>Адрес Доставки {index + 1}</h3>

                <div>
                  <p className={s.addressField}>Имя: {address.firstName}</p>
                  <p className={s.addressField}>Фамилия: {address.lastName}</p>
                </div>
                <div>
                  <p className={s.addressField}>Страна / Регион: {address.region}</p>
                  <p className={s.addressField}>Провинция / Крупный город: span {address.city}</p>
                  <p className={s.addressField}>Адрес улицы: {address.streetAddress}</p>
                </div>
                <div>
                  <p className={s.addressField}>Область: {address.state}</p>
                  <p className={s.addressField}>Телефон: {address.phone}</p>
                </div>
                <button onClick={() => handleDeleteAddress(address.id)}>
                  <Delete />
                </button>
              </div>
            ))}
        </div>
        <p className={s.optional}>Примечания к заказу (необязательно)</p>
        <form className={s.optionalForm}>
          <textarea className={s.notes} id="textInput" name="textInput"></textarea>
        </form>
      </div>
      <div className={s.order}>
        <h1>Твой заказ</h1>
        <div className={s.info}>
          <h3>Продукты</h3>
          <h3>Промежуточный итог</h3>
        </div>

        {orderInfo.output.map((item) => (
          <div className={s.card} key={item.id}>
            <Link to={`/shop/${item.idProduct}`}>
              <img src={`/${item.mainImg}`} alt={item.name} />
            </Link>
            <div className={s.cardInfo}>
              <p className={s.cardInfoName}>{item.name}</p>
              <div className={s.cardInfoSku}>
                <p className={s.sku}>SKU:</p>
                <p className={s.number}>{item.sku}</p>
              </div>
            </div>
            <p className={s.size}>{item.size.name}</p>
            <p className={s.quantity}>(x {item.quantity})</p>
            <p className={s.price}>{item.totalPrice}</p>
          </div>
        ))}
        <div className={s.pricingCards}>
          <div className={s.pricing}>
            <p className={s.text}>Промежуточный итог</p>
            <p className={s.price}>{orderInfo.prices.subtotalPrice}</p>
          </div>
          <div className={s.pricing}>
            <p className={s.text}>Купон Скидка</p>
            <p>(-) {orderInfo.prices.couponDiscount}</p>
          </div>
          <div className={s.pricing}>
            <p className={s.text}>Доставка</p>
            <p className={s.price}>{orderInfo.prices.shippingPrice}</p>
          </div>
          <div className={s.total}>
            <p>Всего</p>
            <p className={s.price}>{orderInfo.prices.totalPrice}</p>
          </div>
        </div>

        <div className={s.methods}>
          <h4>Методы оплаты</h4>
          <div className={s.method} onClick={() => handleMethodClick(1)}>
            <img className={s.cyrcle0} src="/img/payment/cyrcle0.svg" alt="cyrcle" />
            {selectedMethod === 1 && (
              <img className={s.cyrcle1} src="/img/payment/cyrcle1.svg" alt="cyrcle" />
            )}

            <h3>Оплата при доставке</h3>
          </div>

          <div className={s.method} onClick={() => handleMethodClick(2)}>
            <img className={s.cyrcle0} src="/img/payment/cyrcle0.svg" alt="cyrcle" />
            {selectedMethod === 2 && (
              <img className={s.cyrcle1} src="/img/payment/cyrcle1.svg" alt="cyrcle" />
            )}

            <h3>Прямой банковский перевод</h3>
          </div>
          <div className={s.method} onClick={() => handleMethodClick(3)}>
            <img className={s.cyrcle0} src="/img/payment/cyrcle0.svg" alt="cyrcle" />
            {selectedMethod === 3 && (
              <img className={s.cyrcle1} src="/img/payment/cyrcle1.svg" alt="cyrcle" />
            )}

            <img
              className={s.acceptedMethods}
              src="/img/footer/bottom/accept.png"
              alt="acceptMethods"
            />
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          className={placeOrderButtonStyle ? s.placeOrderDisabled : s.placeOrder}
        >
          {placeOrderButtonStyle ? "Select address and Payment Method" : "Place Order"}
        </button>
      </div>
      <div className={s.modalOverlay}>
        <div className={s.modal}>
          <div className={s.thanksBlock}>
            <img className={s.crossImg} src="/img/checkout/cross.svg" alt="cross" />
            <img className={s.thanksImg} src="/img/checkout/thanks.svg" alt="thanks" />
            <p className={s.thanksText}>Ваш заказ был получен</p>
          </div>
          <div className={s.allInfoBlock}>
            <div className={s.info}>
              <p className={s.mark}>Номер заказ</p>
              <p className={s.value}>19586687</p>
            </div>
            <div className={s.info}>
              <p className={s.mark}>Дата</p>
              <p className={s.value}>15 Sep, 2021</p>
            </div>
            <div className={s.info}>
              <p className={s.mark}>Всего</p>
              <p className={s.value}>2,699.00</p>
            </div>
            <div className={s.info}>
              <p className={s.mark}>Метод оплаты</p>
              <p className={s.value}>Цена доставки</p>
            </div>
          </div>
          <div className={s.orderDetails}>
            <p className={s.orderDetailsText}>Информация для заказа</p>

            <div className={s.order}>
              <div className={s.orderMarkText}>
                <p>Продукты</p>
                <p className={s.qty}>Кол-во</p>
                <p className={s.subtotal}>Промежуточный итог</p>
              </div>

              <div className={s.orderCards}>
                <div className={s.orderCard}>
                  <img src="/img/goods/01.png" alt="plant" />

                  <div className={s.orderCardInfo}>
                    <p className={s.namePot}>Barberton Daisy</p>
                    <p className={s.skuPot}>
                      <span>SKU:</span> 1995751877966
                    </p>
                  </div>

                  <p className={s.orderCardQuantity}>(x 2)</p>
                  <p className={s.orderCardPrice}>$238.00</p>
                </div>
                <div className={s.orderCard}>
                  <img src="/img/goods/01.png" alt="plant" />

                  <div className={s.orderCardInfo}>
                    <p className={s.namePot}>Barberton Daisy</p>
                    <p className={s.skuPot}>
                      <span>SKU:</span> 1995751877966
                    </p>
                  </div>

                  <p className={s.orderCardQuantity}>(x 2)</p>
                  <p className={s.orderCardPrice}>₽23800.00</p>
                </div>
                <div className={s.orderCard}>
                  <img src="/img/goods/01.png" alt="plant" />

                  <div className={s.orderCardInfo}>
                    <p className={s.namePot}>Barberton Daisy</p>
                    <p className={s.skuPot}>
                      <span>SKU:</span> 1995751877966
                    </p>
                  </div>

                  <p className={s.orderCardQuantity}>(x 2)</p>
                  <p className={s.orderCardPrice}>₽23800.00</p>
                </div>
              </div>

              <div className={s.finalInfoBlock}>
                <div className={s.finalInfo}>
                  <p className={s.shipping}>Доставка</p>
                  <p className={s.shippingPrice}>₽1600.00</p>
                </div>
                <div className={s.finalInfo}>
                  <p className={s.total}>Всего</p>
                  <p className={s.totalPrice}>₽53,699.00</p>
                </div>
              </div>
            </div>
          </div>
          <div className={s.trackBlock}>
            <p>
              Ваш заказ в настоящее время обрабатывается. Вы получите электронное письмо с
              подтверждением заказа в ближайшее время с ожидаемой датой доставки ваших товаров.
            </p>
            <button className={s.trackBtn}>Отследить ваш заказ</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
