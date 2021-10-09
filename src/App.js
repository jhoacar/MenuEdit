import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import {  createStore } from 'redux';

import { fetchData } from './components/GetComponents/Getters';

import MenuEdit from "./components/EditComponents/MenuEdit";

import globalReducer from './components/ReducersComponents/GlobalReducer';

import './styles/app.scss';

const App = function () {

  const [data, setData] = useState([]);
  
   useEffect(() => {fetchData(setData)},[])

  const appReducer = (state = { ...data, actualPage: 0 }, action) => {
    return action.payload ? globalReducer(state,action) : state;
  }
  
  return (
    <>
      {data && data?.pages &&
        <Provider store={createStore(appReducer)}>
          <MenuEdit></MenuEdit>
        </Provider>}
      {(!data || !data?.pages) && <span className="waiting-text">{"Cargando Menu \n"}<strong>(Espere Por Favor)</strong></span>}
    </>
  );
}
export default App;
