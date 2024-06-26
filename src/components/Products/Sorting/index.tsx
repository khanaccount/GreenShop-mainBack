import React, { useState, useEffect, useRef } from "react";
import s from "./index.module.scss";

const Sorting: React.FC<{
  handleSaleFilter: (id?: number) => void;
  resetAllFilters: () => void;
  appliedFilters: {
    sortBy: string;
  };
  handleFilterChange: (newFilters: { sortBy: string }) => void;
}> = ({ handleSaleFilter, resetAllFilters, handleFilterChange }) => {
  const [activeCategory, setActiveCategory] = useState<number | null>(1);
  const [isArrowActive, setIsArrowActive] = useState(false);
  const [sortBy, setSortBy] = useState("Сортировка по умолчанию");

  const menuRef = useRef(null as HTMLDivElement | null);

  const handleSortOptionClick = (option: string) => {
    setSortBy(option);
    toggleArrowStyle();
    handleFilterChange({ sortBy: option });
  };

  const handleCategoryClick = (id: number) => {
    setActiveCategory(id);
    if (id === 1) {
      resetAllFilters();
    }
  };

  const toggleArrowStyle = () => {
    setIsArrowActive(!isArrowActive);
  };

  const closeMenu = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsArrowActive(false);
    }
  };

  const handleSaleClick = (id: number) => {
    handleSaleFilter(id);
    if (id === 3) {
      handleSaleFilter();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeMenu);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  return (
    <div className={s.sorting}>
      <div className={s.category}>
        <h5
          onClick={() => handleCategoryClick(1)}
          className={activeCategory === 1 ? s.activeCategory : ""}
        >
          Все холодильники
        </h5>
        <h5
          onClick={() => handleCategoryClick(2)}
          className={activeCategory === 2 ? s.activeCategory : ""}
        >
          Новинки
        </h5>
        <h5
          onClick={() => {
            handleCategoryClick(3);
            handleSaleClick(3);
          }}
          className={activeCategory === 3 ? s.activeCategory : ""}
        >
          Скидки
        </h5>
      </div>
      <div className={s.sortBlock}>
        <h5>Сортировка по:</h5>
        <h5>{sortBy}</h5>
        <img
          className={isArrowActive ? `${s.arrow} ${s.arrowActive}` : s.arrow}
          src="img/sort/arrow.svg"
          alt="arrow"
          onClick={toggleArrowStyle}
        />
        <div
          ref={(node) => (menuRef.current = node)}
          className={isArrowActive ? `${s.sortOptions}` : `${s.sortOptionsHidden}`}
        >
          <h5 onClick={() => handleSortOptionClick("Сортировка по умолчанию")}>
            Сортировка по умолчанию
          </h5>
          <h5 onClick={() => handleSortOptionClick("Цена: по возрастанию")}>
            Цена: по возрастанию
          </h5>
          <h5 onClick={() => handleSortOptionClick("Цена: по убыванию")}>Цена: по убыванию</h5>
          <h5 onClick={() => handleSortOptionClick("Самые популярные")}>Самые популярные</h5>
          <h5 onClick={() => handleSortOptionClick("Рейтинг")}>Рейтинг</h5>
        </div>
      </div>
    </div>
  );
};

export default Sorting;
