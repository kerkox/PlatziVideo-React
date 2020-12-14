const reducer = (state, action) => {

  switch (action.type) {
    case 'SET_FAVORITE':
      if (state.myList.every((item) => item.id !== action.payload.id)) {
        return {
          ...state,
          myList: [...state.myList, action.payload],
        };
      }
      return { ...state };

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
    case 'LOGOUT_REQUEST':
      return {
        ...state,
        user: action.payload,
      };
    case 'REGISTER_REQUEST':
      return {
        ...state,
        user: action.payload,
      };
    case 'GET_VIDEO_SOURCE':
      return {
        ...state,
        playing: state.trends.find((item) => item.id === Number(action.payload)) ||
        state.originals.find((item) => item.id === Number(action.payload)) ||
        [],
      };
    case 'FILTER_VIDEOS':
      return {
        ...state,
        search: action.payload,
        trendsFilter: state.trends.filter((item) => item.description.toLowerCase().includes(action.payload.toLowerCase()) || item.title.toLowerCase().includes(action.payload.toLowerCase())),
        originalsFilter: state.originals.filter((item) => item.description.toLowerCase().includes(action.payload.toLowerCase()) || item.title.toLowerCase().includes(action.payload.toLowerCase())),
      };
    default:
      return state;
  }

};
export default reducer;
