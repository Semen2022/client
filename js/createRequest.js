'use strict'

//const objRespOfServer = {};
              // предыдущая ссылка http://f0769682.xsph.ru/ ,  https://jscp-diplom.tw1.ru/ , https://jscp-diplom.netoserver.ru/ 
function createRequest(bodyQu, callbackFunc) {
  fetch('https://jscp-diplom.netoserver.ru/', {
    method: 'POST',
    // Добавляем необходимые заголовки
    headers: {
    'Content-type': 'application/x-www-form-urlencoded',
    },
    // Тело запроса
    // body: JSON.stringify(newPost), // Тело запроса в JSON-формате
    body: bodyQu,
  })
  .then((response) => {
    // Проверяем успешность запроса или выкидываем ошибку
    console.log('response1 :::::: ', response.statusText);
    if (!response.ok) {
      throw new Error('Error occurred!')
    }
    return response.json();
  })
  .then((respData) => { 
    // вызов callback-функции
    console.log('respData 1', respData)
    callbackFunc(respData);
  })
  .catch((err) => {
    console.log(err);
  }); // Error: Error occurred!
}