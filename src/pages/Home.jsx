import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../redux/actions/products';
import { setCategory, setSortBy } from '../redux/actions/filters';
import { addProductToCart } from '../redux/actions/cart';

import { Categories, Sort, ProductItem, ProductSkeleton } from '../components';

const categoryItems = ["М'ясні", 'Вегетаріанські', 'Гриль', 'Гострі', 'Закриті'];
const sortItems = [
  { name: 'популярності', type: 'rating', order: 'desc' },
  { name: 'ціні', type: 'price', order: 'desc' },
  { name: 'алфавіту', type: 'name', order: 'asc' },
];

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ products }) => products.items);
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoaded = useSelector(({ products }) => products.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  React.useEffect(() => {
    dispatch(getProducts(category, sortBy));
  }, [category, sortBy]);

  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);

  const onSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  const handleAddProductToCart = (obj) => {
    dispatch(addProductToCart(obj));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryItems}
        />
        <Sort activeSortType={sortBy.type} items={sortItems} onClickSortType={onSelectSortType} />
      </div>
      <h2 className="content__title">Всі піци</h2>
      <div className="content__items">
        {isLoaded
          ? items.map((obj) => (
              <ProductItem
                onClickAddProduct={handleAddProductToCart}
                key={obj.id}
                cartQuantity={cartItems[obj.id] && cartItems[obj.id].items.length}
                {...obj}
              />
            ))
          : Array(4)
              .fill(0)
              .map((_, index) => <ProductSkeleton key={index} />)}
      </div>
    </div>
  );
}

export default Home;
