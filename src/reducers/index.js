const reducer = (state, action) => {

  switch (action.type) {
    case 'SET_FAVORITE':
      if (state.myList.every((item) => item.id !== action.payload.id)) {
        return {
          ...state,
          myList: [...state.myList, action.payload],
        };
      }
      return state;

    case 'DELETE_FAVORITE':
      return {
        ...state,
        myList: state.myList.filter((items) => items.id !== action.payload),
      };

    case 'LOGIN_REQUEST':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }

};
export default reducer;
