import React from "react";

import s from "./index.module.scss";

type Card = {
  green: string;
  black: string;
  grey: string;
  img: string;
  id: number;
};

const items: Card[] = [
  {
    green: "12 сентября  |  Чтение 6 минут",
    black: "Советы по уходу за холодильниками",
    grey: "Холодильники требуют минимального ухода для длительного использования и сохранности продуктов.",
    img: "img/blogs/1.jpg",
    id: 1,
  },
  {
    green: "13 сентября  |  Чтение 2 минуты",
    black: "Топ 10 холодильников для вашего дома",
    grey: "Лучшие модели для разных типов кухонь. Предпочитают средний и высокий уровень энергии.",
    img: "img/blogs/2.jpg",
    id: 2,
  },
  {
    green: "15 сентября  |  Чтение 3 минуты",
    black: "Как выбрать холодильник",
    grey: "Руководство по выбору холодильника, подходящего для вашего дома и потребностей.",
    img: "img/blogs/3.jpg",
    id: 3,
  },
  {
    green: "15 сентября  |  Чтение 2 минуты",
    black: "Лучшие холодильники для каждой комнаты",
    grey: "Преимущества холодильников для различных помещений, включая кухни, офисы и гаражи.",
    img: "img/blogs/4.jpg",
    id: 4,
  },
];

const Blogs: React.FC = () => {
  return (
    <div className={s.blogs}>
      <h4>Наши сообщения в блоге</h4>
      <p className={s.topText}>
        Мы интернет-магазин растений, предлагающий широкий выбор недорогих и модных холодильников.{" "}
      </p>
      <div className={s.cards}>
        {items.map((item) => (
          <div key={item.id} className={s.card}>
            <img src={item.img} width={260} height={200} alt="plant" />
            <div className={s.cardText}>
              <p className={s.green}>{item.green}</p>
              <h5 className={s.black}>{item.black}</h5>
              <p className={s.grey}>{item.grey}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
