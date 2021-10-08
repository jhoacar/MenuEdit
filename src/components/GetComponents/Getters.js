import { getImage } from './StorageIndexedDB';

const routeImages = "/images/";

export const fetchData = function (setData) {
  fetch('/data.json', { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } })
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (myJson) {
      console.log(myJson);
      setData(myJson)
    }).catch((error) => {
      console.log("Paso algo con la lectura de la info ",error);
      setData({pages:[]});
    });
}

export const getDefaultImage =  function(){
  return getImage(routeImages+'default-image.svg');
}