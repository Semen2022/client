'use strict'

              // предыдущая ссылка http://f0769682.xsph.ru/ ,  https://jscp-diplom.tw1.ru/ , https://jscp-diplom.netoserver.ru/ 
function createRequest(bodyQu, callbackFunc) {
  fetch('https://jscp-diplom.netoserver.ru/', {
    method: 'POST',
    // Добавляем необходимые заголовки
    headers: {
    'Content-type': 'application/x-www-form-urlencoded',
    },
    // Тело запроса
    body: bodyQu,
  })
  .then((response) => {
    // Проверяем успешность запроса или выкидываем ошибку
    if (!response.ok) {
      throw new Error('Error occurred!')
    }
    return response.json();
  })
  .then((respData) => { 
    // вызов callback-функции
    callbackFunc(respData);
  })
  .catch((err) => {
    console.log(err);
  }); // Error: Error occurred!
}