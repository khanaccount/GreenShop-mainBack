import React from "react";
import s from "./index.module.scss";

interface CategoryProps {
  categoriesData: { [key: string]: number };
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

type CategoriesItems = {
  title: string;
  id: number;
  count: number;
};

const Category: React.FC<CategoryProps> = ({ categoriesData, setSelectedCategory }) => {
  const [activeCategory, setActiveCategory] = React.useState<number | null>(null);

  const handleCategoryClick = (id: number, category: string) => {
    setActiveCategory(id);
    setSelectedCategory(category);
  };

  const item: CategoriesItems[] = [
    {
      title: "Однокамерные холодильники",
      id: 1,
      count: categoriesData["Однокамерные холодильники"] || 0,
    },
    {
      title: "Двухкамерные холодильники",
      id: 2,
      count: categoriesData["Двухкамерные холодильники"] || 0,
    },
    { title: "Морозильные камеры", id: 3, count: categoriesData["Морозильные камеры"] || 0 },
    {
      title: "Встраиваемые холодильники",
      id: 4,
      count: categoriesData["Встраиваемые холодильники"] || 0,
    },
    {
      title: "Холодильники Side-by-Side",
      id: 5,
      count: categoriesData["Холодильники Side-by-Side"] || 0,
    },
    { title: "Мини-холодильники", id: 6, count: categoriesData["Мини-холодильники"] || 0 },
    {
      title: "Профессиональные холодильники",
      id: 7,
      count: categoriesData["Профессиональные холодильники"] || 0,
    },
  ];

  return (
    <div className={s.category}>
      <h5>Категории</h5>
      {item.map((category) => (
        <div
          key={category.id}
          onClick={() => handleCategoryClick(category.id, category.title)}
          className={category.id === activeCategory ? s.active : ""}
        >
          <p>{category.title}</p>
          <p>({category.count})</p>
        </div>
      ))}
    </div>
  );
};

export default Category;
