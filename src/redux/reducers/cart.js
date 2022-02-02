const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT_CART': {
      const currentItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentItems,
          totalPrice: getTotalPrice(currentItems),
        },
      };

      const items = Object.values(newItems).map((obj) => obj.items);
      const allProducts = [].concat.apply([], items);
      const totalPrice = getTotalPrice(allProducts);

      return {
        ...state,
        items: newItems,
        totalPrice,
        totalCount: allProducts.length,
      };
    }

    case 'SET_TOTAL_COUNT':
      return {
        ...state,
        totalCount: action.payload,
      };

    case 'MINUS_CART_ITEM': {
      const oldItems = state.items[action.payload].items;
      const newObjItems =
        oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems;
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };
      const items = Object.values(newItems).map((obj) => obj.items);
      const allProducts = [].concat.apply([], items);

      return {
        ...state,
        items: newItems,
        totalPrice: getTotalPrice(newObjItems),
        totalCount: allProducts.length,
      };
    }

    case 'PLUS_CART_ITEM': {
      const newObjItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };
      const items = Object.values(newItems).map((obj) => obj.items);
      const allProducts = [].concat.apply([], items);

      return {
        ...state,
        items: newItems,
        totalPrice: getTotalPrice(newObjItems),
        totalCount: allProducts.length,
      };
    }

    case 'CLEAR_CART':
      return {
        items: {},
        totalPrice: 0,
        totalCount: 0,
      };

    case 'REMOVE_CART_ITEM':
      const newItems = {
        ...state.items,
      };

      const currentTotalPrice = newItems[action.payload].totalPrice;
      const currentTotalCount = newItems[action.payload].items.length;

      delete newItems[action.payload];

      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount,
      };

    default:
      return state;
  }
};

export default cart;
