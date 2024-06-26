import React from "react";
import { Link } from "react-router-dom";

import s from "./index.module.scss";

type Card = {
  title: string;
  info: string;
  img: string;
  id: number;
};

const items: Card[] = [
  {
    title: "Летние акции на холодильники",
    info: "Мы - онлайн-магазин холодильников, предлагающий широкий ассортимент доступных и современных моделей.",
    img: "img/findmore/01.png",
    id: 1,
  },
  {
    title: "Лучшие модели лета",
    info: "Мы - онлайн-магазин холодильников, предлагающий широкий ассортимент доступных и современных моделей.",
    img: "img/findmore/02.png",
    id: 2,
  },
];

const FindMore: React.FC = () => {
  return (
    <div className={s.findMore}>
      {items.map((item) => (
        <div key={item.id} className={s.card}>
          <img className={s.plant} width={230} src={item.img} alt="plant" />
          <img className={s.circle} src="img/findmore/03.svg" alt="plant" />
          <img className={s.circle} src="img/findmore/04.svg" alt="plant" />
          <div className={s.rightInfo}>
            <h5>{item.title}</h5>
            <p>{item.info}</p>
            <Link className={s.button} to="/nazvanieStanicy">
              Найти ещё <img src="img/findmore/arrow.svg" alt="arrow" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FindMore;
