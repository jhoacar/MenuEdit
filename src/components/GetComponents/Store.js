import { createStore } from "redux";

const initialState = {};
/*
const [data, setData] = useState([]);

const getData = () => {

    fetch('data.json', { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setData(myJson)
      });
}

useEffect(getData(),[]);
*/

const reducerMenu = (state=initialState,action)=>{
    return state;
}

export default createStore(reducerMenu)