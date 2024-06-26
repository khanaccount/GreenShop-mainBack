import React from "react";

import s from "./index.module.scss";

const Sale: React.FC = () => {
  return (
    <div className={s.sale}>
      <h2>Супер скидки</h2>
      <h5>ДО 75%</h5>
      <img className={s.mainImg} src="img/sale/01.png" alt="mainImg" />
      <img className={s.smallCircle} src="img/sale/smallCircle.png" alt="smallCircle" />
      <img className={s.circle} src="img/sale/circle.png" alt="circle" />
      <img className={s.square} src="img/sale/square.png" alt="square" />
    </div>
  );
};

export default Sale;
