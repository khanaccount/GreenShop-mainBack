import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import s from "./index.module.scss";

const MyCarousel: React.FC = () => {
  return (
    <Carousel
      className={s.Carousel}
      showArrows={false}
      showStatus={false}
      showThumbs={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={5000}
    >
      <div className={s.carouselFirst}>
        <div className={s.carouselFirstLeft}>
          <h5>Добро пожаловать в "Бирюса"</h5>
          <h1>
            Давайте сделаем лучше <span> вашу жизнь</span>{" "}
          </h1>
          <p>
            Мы — интернет-магазин холодильников, предлагающий широкий выбор недорогих и модных
            холодильников.
          </p>
          <button>
            <a href="">КУПИТЬ СЕЙЧАС</a>
          </button>
        </div>
        <div className={s.carouselFirstRight}>
          <img className={s.plantBig} src="img/carousel/plant.png" alt="plant" />
          <img className={s.plantSmall} src="img/carousel/plantSmall.png" alt="plant" />
        </div>
      </div>
      <div className={s.carouselFirst}>
        <div className={s.carouselFirstLeft}>
          <h5>Добро пожаловать в "Бирюса"</h5>
          <h1>
            Давайте сделаем лучше <span> вашу жизнь</span>{" "}
          </h1>
          <p>
            Мы — интернет-магазин холодильников, предлагающий широкий выбор недорогих и модных
            холодильников.
          </p>
          <button>
            <a href="">КУПИТЬ СЕЙЧАС</a>
          </button>
        </div>
        <div className={s.carouselFirstRight}>
          <img className={s.plantBig} src="img/carousel/plant.png" alt="plant" />
          <img className={s.plantSmall} src="img/carousel/plantSmall.png" alt="plant" />
        </div>
      </div>
      <div className={s.carouselFirst}>
        <div className={s.carouselFirstLeft}>
          <h5>Добро пожаловать в "Бирюса"</h5>
          <h1>
            Давайте сделаем лучше <span> вашу жизнь</span>{" "}
          </h1>
          <p>
            Мы — интернет-магазин холодильников, предлагающий широкий выбор недорогих и модных
            холодильников.
          </p>
          <button>
            <a href="">КУПИТЬ СЕЙЧАС</a>
          </button>
        </div>
        <div className={s.carouselFirstRight}>
          <img className={s.plantBig} src="img/carousel/plant.png" alt="plant" />
          <img className={s.plantSmall} src="img/carousel/plantSmall.png" alt="plant" />
        </div>
      </div>
    </Carousel>
  );
};

export default MyCarousel;
