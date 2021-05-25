import { createContext, useReducer } from 'react';
import { genre } from './genre';

// initial state
const initialState = {
  selectedGenre: {},
};

// create context
const Context = createContext({});

// combine reducer function
const combineReducers =
  (...reducers) =>
  (state, action) => {
    for (let i = 0; i < reducers.length; i++) state = reducers[i](state, action);
    return state;
  };

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(combineReducers(genre), initialState);
  const value = { state, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
