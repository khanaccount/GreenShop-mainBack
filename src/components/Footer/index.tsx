import React from "react";

import s from "./index.module.scss";

type Card = {
  title: string;
  info: string;
  imgPot: string;
  id: number;
};

const itemsTop: Card[] = [
  {
    title: "Уход за холодильником",
    info: "Мы - онлайн-магазин холодильников, предлагающий широкий ассортимент дешевых и модных холодильников.",
    imgPot: "/img/footer/top/pot1.svg",
    id: 1,
  },
  {
    title: "Обновление холодильников",
    info: "Мы - онлайн-магазин холодильников, предлагающий широкий ассортимент дешевых и модных холодильников.",
    imgPot: "/img/footer/top/pot1.svg",
    id: 2,
  },
  {
    title: "Ремонт холодильников",
    info: "Мы - онлайн-магазин холодильников, предлагающий широкий ассортимент дешевых и модных холодильников.",
    imgPot: "/img/footer/top/pot1.svg",
    id: 3,
  },
];

type MiddleItems = {
  title: string;
  img: string;
  id: number;
};

const itemsMiddle: MiddleItems[] = [
  {
    title: "Красноярский Рабочий 29, 660123",
    img: "/img/footer/middle/location.svg",
    id: 1,
  },
  {
    title: "Birysa@mail.ru",
    img: "/img/footer/middle/message.svg",
    id: 2,
  },
  {
    title: "+8 950 417 85 65",
    img: "/img/footer/middle/calling.svg",
    id: 3,
  },
];

type BottomItems = {
  title: string;
  links: {
    info: string;
    url: string;
  }[];
  id: number;
};

const itemsBottom: BottomItems[] = [
  {
    title: "Мой аккаунт",
    links: [
      { info: "Мой аккаунт", url: "/account" },
      { info: "Наши магазины", url: "/stores" },
      { info: "Связаться с нами", url: "/contact" },
      { info: "Карьера", url: "/career" },
      { info: "Специальные предложения", url: "/specials" },
    ],
    id: 1,
  },
  {
    title: "Помощь и руководство",
    links: [
      { info: "Центр помощи", url: "/account" },
      { info: "Как купить", url: "/stores" },
      { info: "Доставка и оплата", url: "/contact" },
      { info: "Политика возврата", url: "/career" },
      { info: "Как вернуть товар", url: "/specials" },
    ],
    id: 2,
  },
  {
    title: "Категории",
    links: [
      { info: "Холодильники", url: "/contact" },
      { info: "Маленькие Холодильники", url: "/career" },
      { info: "Аксессуары", url: "/specials" },
    ],
    id: 3,
  },
];

type SocialMedia = {
  img: string;
  id: number;
  href: string;
};

const itemsSocialMedia: SocialMedia[] = [
  {
    img: "/img/footer/bottom/facebook.svg",
    id: 1,
    href: "/buythisweb",
  },
  {
    img: "/img/footer/bottom/instagram.svg",
    id: 2,
    href: "/buythisweb",
  },
  {
    img: "/img/footer/bottom/telegram.svg",
    id: 3,
    href: "/buythisweb",
  },
  {
    img: "/img/footer/bottom/twitter.svg",
    id: 4,
    href: "/buythisweb",
  },
  {
    img: "/img/footer/bottom/whatsapp.svg",
    id: 5,
    href: "/buythisweb",
  },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className={s.footer}>
      <div className={s.footerTop}>
        <div className={s.info}>
          {itemsTop.map((item) => (
            <div key={item.id} className={s.card}>
              <img className={s.pot} width={80} src={item.imgPot} alt="pot" />
              <h5>{item.title}</h5>
              <p>{item.info}</p>
            </div>
          ))}
        </div>
        <div className={s.formBlock}>
          <h4>Хотели бы вы подписаться на информационные бюллетени?</h4>
          <form>
            <label>
              <input
                className={s.input}
                type="text"
                name="name"
                placeholder="Введите ваш адрес электронной почты..."
              />
            </label>
            <input className={s.inputBtn} type="submit" value="Вход" />
          </form>
          <p>
            Обычно мы публикуем предложения и задачи в новостной рассылке. Мы предлагаем широкий
            ассортимент комнатных растений и аксессуаров с доставкой напрямую из наших (заводов) к
            вашему дому!{" "}
          </p>
        </div>
        <div className={s.join}></div>
      </div>
      <div className={s.footerMiddle}>
        <img width={170} src="/img/footer/middle/logo.svg" alt="logo" />
        {itemsMiddle.map((item) => (
          <div key={item.id}>
            <img width={25} height={25} src={item.img} alt="location" /> <p>{item.title}</p>
          </div>
        ))}
      </div>
      <div className={s.footerBottom}>
        <div className={s.leftBlock}>
          {itemsBottom.map((item) => (
            <div className={s.blockLinks} key={item.id}>
              <h5 className={s.titleText}>{item.title}</h5>
              {item.links.map((link) => (
                <div className={s.links} key={link.url}>
                  <a href={link.url}>{link.info}</a>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={s.rightBlock}>
          <div>
            <h5>Социальные сети</h5>
            <div className={s.mediaLinks}>
              {itemsSocialMedia.map((item) => (
                <a key={item.id} href={item.href}>
                  {" "}
                  <img
                    className={s.social}
                    width={30}
                    height={30}
                    src={item.img}
                    alt="social media"
                  />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h5>Мы принимаем</h5>
            <img src="/img/footer/bottom/accept.png" alt="we accpet" />
          </div>
        </div>
      </div>
      <p>© {currentYear} "Бирюса". Все права защищены.</p>
    </div>
  );
};

export default Footer;
