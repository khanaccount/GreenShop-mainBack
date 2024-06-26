import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../api/auth";

import s from "./index.module.scss";

import UserSvg from "./UserSvg";
import FavoriteSvg from "./FavoriteSvg";
import OrderSvg from "./OrderSvg";
import LocationSvg from "./LocationSvg";

type Card = {
  title: string;
  icon: React.ReactNode;
  id: number;
};

const items: Card[] = [
  {
    title: "Профиль",
    icon: <UserSvg />,
    id: 1,
  },
  {
    title: "Адрес",
    icon: <LocationSvg />,
    id: 2,
  },
  {
    title: "Заказы",
    icon: <OrderSvg />,
    id: 3,
  },
  {
    title: "Избранное",
    icon: <FavoriteSvg />,
    id: 4,
  },
];

type SwitchBlockProps = {
  showDetails: () => void;
  showAddress: () => void;
  showWishlist: () => void;
};

const SwitchBlock: React.FC<SwitchBlockProps> = ({ showAddress, showDetails, showWishlist }) => {
  const [active, setActive] = useState<number | null>(1);

  const navigate = useNavigate();

  const handleActive = (id: number) => {
    setActive(id);
    if (id === 1) {
      showDetails();
    } else if (id === 2) {
      showAddress();
    } else if (id === 4) {
      showWishlist();
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={s.switchBlock}>
      <h5>Мой аккаунт</h5>
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => handleActive(item.id)}
          className={`${s.card} ${active === item.id ? s.cardActive : ""}`}
        >
          {item.icon}
          <p>{item.title}</p>
        </div>
      ))}

      <div className={s.logOut}>
        <button onClick={handleLogout}>
          <img width={20} height={20} src="img/account/logout.svg" alt="logOut" />
          <p>Выйти</p>
        </button>
      </div>
    </div>
  );
};

export default SwitchBlock;
