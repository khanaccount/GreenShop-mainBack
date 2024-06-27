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

interface OrderConfirmation {
  id: number;
  date: string;
  totalPrice: string;
  shippingPrice: string;
  paymentMethod: string;
}

interface ServerOrderItem {
  id: number;
  name: string;
  mainImg: string;
  sku: string;
  quantity: number;
  subtotal: string;
}

export interface OrderInfo {
  prices: OrderPrices;
  output: OrderItem[];
}

const Payment: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<number | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState<OrderConfirmation | null>(null);
  const [orderItems, setOrderItems] = useState<ServerOrderItem[]>([]);
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

  const handleModalClose = () => {
    setIsModalOpen(false);
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
        `https://greenshop-backend-production.up.railway.app/api/shop/transaction/`,
        requestData,
        {
          headers: {
            Authorization: authHeaders?.headers?.Authorization,
          },
        }
      )
      .then((response) => {
        const { orderData, orderItemData } = response.data;
        setOrderConfirmation(orderData);
        setOrderItems(orderItemData);
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error("Error placing order:", error);

        if (error.response) {
          const errorMessage = JSON.stringify(error.response.data.error) || "Unknown server error";
          alert(`Server Error: ${errorMessage}`);
        } else if (error.request) {
          alert("No response from the server. Please try again later.");
        } else {
          alert("An unexpected error occurred. Please try again later.");
        }
      });
  };

  const isAddressSelected = selectedAddress !== null;
  const isMethodSelected = selectedMethod !== null;

  const placeOrderButtonStyle =
    isAddressSelected && isMethodSelected ? s.placeOrderSelected : s.placeOrder;

  return (
    <div className={s.payment}>
      <div className={s.addressBlock}>
        <h5 className={s.billingAddress}>Государственный платежный адрес</h5>
        <Link className={s.newAdressesLink} to={"/account"}>
          <button className={s.newAdresses}>Добавить новый адрес</button>
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
                <h3>Адрес доставки {index + 1}</h3>

                <div>
                  <p className={s.addressField}>Имя: {address.firstName}</p>
                  <p className={s.addressField}>Фамилия: {address.lastName}</p>
                </div>
                <div>
                  <p className={s.addressField}>Страна / Область: {address.region}</p>
                  <p className={s.addressField}>Город: {address.city}</p>
                  <p className={s.addressField}>Адрес улицы : {address.streetAddress}</p>
                </div>
                <div>
                  <p className={s.addressField}>Область: {address.state}</p>
                  <p className={s.addressField}>Номер: {address.phone}</p>
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
        <h1>Ваш заказ</h1>
        <div className={s.info}>
          <h3>Товарв</h3>
          <h3>Промежуточный итог</h3>
        </div>

        {orderInfo.output.map((item) => (
          <div className={s.card} key={item.id}>
            <Link to={`/shop/${item.idProduct}`}>
              <img
                src={`https://greenshop-backend-production.up.railway.app${item.mainImg}`}
                alt={item.name}
              />
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
            <p className={s.text}>Перевозки</p>
            <p className={s.price}>{orderInfo.prices.shippingPrice}</p>
          </div>
          <div className={s.total}>
            <p>Всего</p>
            <p className={s.price}>{orderInfo.prices.totalPrice}</p>
          </div>
        </div>

        <div className={s.methods}>
          <h4>Способ оплаты</h4>
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
          {placeOrderButtonStyle ? "Выберите адрес и способ оплаты" : "Разместить заказ"}
        </button>
      </div>
      {isModalOpen && (
        <div className={s.modalOverlay}>
          <div className={s.modal}>
            <div className={s.thanksBlock}>
              <button onClick={handleModalClose}>
                <img className={s.crossImg} src="/img/checkout/cross.svg" alt="cross" />
              </button>
              <img className={s.thanksImg} src="/img/checkout/thanks.svg" alt="thanks" />
              <p className={s.thanksText}>Ваш заказ был получен</p>
            </div>
            <div className={s.allInfoBlock}>
              <div className={s.info}>
                <p className={s.mark}>Номер заказа</p>
                <p className={s.value}>{orderConfirmation?.id}</p>
              </div>
              <div className={s.info}>
                <p className={s.mark}>Дата</p>
                <p className={s.value}>{orderConfirmation?.date}</p>
              </div>
              <div className={s.info}>
                <p className={s.mark}>Всего</p>
                <p className={s.value}>{orderConfirmation?.totalPrice}</p>
              </div>
              <div className={s.info}>
                <p className={s.mark}>Метод оплаты</p>
                <p className={s.value}>{orderConfirmation?.paymentMethod}</p>
              </div>
            </div>
            <div className={s.orderDetails}>
              <p className={s.orderDetailsText}>Детали заказа</p>

              <div className={s.orderBlock}>
                <div className={s.orderMarkText}>
                  <p>Товаров</p>
                  <p className={s.qty}>Кол-во</p>
                  <p className={s.subtotal}>Промежуточный итог</p>
                </div>

                <div className={s.orderCards}>
                  {orderItems.map((item) => (
                    <div className={s.orderCard} key={item.id}>
                      <img
                        src={`https://greenshop-backend-production.up.railway.app${item.mainImg}`}
                        alt={item.name}
                      />
                      <div className={s.orderCardInfo}>
                        <p className={s.namePot}>{item.name}</p>
                        <p className={s.skuPot}>
                          <span>SKU:</span> {item.sku}
                        </p>
                      </div>
                      <p className={s.orderCardQuantity}>(x {item.quantity})</p>
                      <p className={s.orderCardPrice}>{item.subtotal}</p>
                    </div>
                  ))}
                </div>

                <div className={s.finalInfoBlock}>
                  <div className={s.finalInfo}>
                    <p className={s.shipping}>Перевозки</p>
                    <p className={s.shippingPrice}>{orderConfirmation?.shippingPrice}</p>
                  </div>
                  <div className={s.finalInfo}>
                    <p className={s.total}>Всего</p>
                    <p className={s.totalPrice}>{orderConfirmation?.totalPrice}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.trackBlock}>
              <p>
                Ваш заказ в настоящее время обрабатывается. Вы получите подтверждение заказа в
                ближайшее время отправьте электронное письмо с ожидаемой датой доставки ваших
                товаров.
              </p>
              <Link to={"/account"} className={s.trackBtn}>
                Проверьте свой заказ
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
