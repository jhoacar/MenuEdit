//Procesamiento de IndexedDBB

//Revisamos que exista el recurso en la base de datos
//Si existe sera resuelta la promesa con el recurso encontrado
//Si no se encuentra en la base de datos
//La solicitamos al servidor; procesamos la peticion
//Si todo fue exitoso, resolvemos la promesa con el recurso solicitado,
// y luego guardamos el recurso en la base de datos
//Si ocurre algun error en la peticion se rechaza la promesa

const nameDBB = "imagesMenu";
//El store anterior fue "srcImages"
const nameStoreDBB = "srcImages";
const versionDBB = 1;
const nameKey = "srcImage";
const nameValue = "dataImage";

const indexedDBB = window.indexedDB;
let db;

const fetchData = function (srcImage, resolveData, rejectData) {

  const fileReader = new FileReader();

  fetch(srcImage,
    {
      credentials: 'same-origin'
    })
    .then(response => {
      return response.blob();
    })
    .then(imageBlob => {

      if (!imageBlob.type.includes("image"))
        rejectData("La respuesta fue texto, no se cargara el recurso");

      if (imageBlob.type.includes("image")) {

        fileReader.onload = function (evt) {
          const result = evt.target.result;
          resolveData(result);
        };

        fileReader.readAsDataURL(imageBlob);

      }
    })
    .catch(error => rejectData(error))


}

const saveAtDBB = function (srcImage, dataImage) {

  const data = {};
  data[nameKey] = srcImage;
  data[nameValue] = dataImage;

  const transaction = db.transaction([nameStoreDBB], "readwrite");
  const objectStore = transaction.objectStore(nameStoreDBB);
  try {
    const request = objectStore.add(data);
    request.onerror = error => { /*alert("Ocurrio un error en guardar en la base de datos");/*console.log(error)*/ };
    request.onsuccess = event => { /*alert("Todo funciono de maravilla y se guardo");/*console.log(event)*/ };
  } catch (error) {
    //alert("Ocurrio un error en escritura de la base de datos")
    console.log(error)
  }
}


const searchAtDBB = function (srcImage) {

  return new Promise((resolve, reject) => {

    const transaction = db.transaction([nameStoreDBB], "readonly");
    const objectStore = transaction.objectStore(nameStoreDBB);

    const request = objectStore.get(srcImage);

    request.onerror = () => reject("Ocurrio algo al leer en la base de datos");

    request.onsuccess = function (event) {
      if (request.result) {
        //alert("Se encontro la imagen en la base de datos y se va a cargar")
        resolve(request.result[nameValue]);
      }
      else {
        //alert("No se encontro la imagen en la base de datos")
        reject("No se encontro la imagen en la base de datos");
      }
    };

  });
}


export const getImage = function (srcImage) {

  return new Promise((resolve, reject) => {

    if (!indexedDBB)
      reject("No admite indexedDB");

    const request = indexedDBB.open(nameDBB, versionDBB);

    request.onsuccess = () => {
      db = request.result;

      searchAtDBB(srcImage)
        .then(response => {
          resolve(response);
        })
        .catch(() => {
          fetchData(srcImage, result => {
            saveAtDBB(srcImage, result);
            resolve(result);
          },
            error => reject(error));
        })
    };

    //Esto se ejecuta si no existe la base de datos entonces la crea
    request.onupgradeneeded = event => {
      db = event.target.result;
      db.createObjectStore(nameStoreDBB, { keyPath: nameKey });
    };

    request.onerror = error => {
      fetchData(srcImage, result => resolve(result), error => reject(error))
    };

  });

}