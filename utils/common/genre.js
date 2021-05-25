export function genre(state, action) {
  switch (action.type) {
    case 'SELECTED_GENRE':
      return { ...state, selectedGenre: action.payload };
    default:
      return state;
  }
}
