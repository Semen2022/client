'use strict'

const objRespOfServer = {};
              // предыдущая ссылка http://f0769682.xsph.ru/ ,  https://jscp-diplom.tw1.ru/ , https://jscp-diplom.netoserver.ru/ 
/*function loadIndex(src) {
  let scriptIndex = document.createElement('script');
  scriptIndex.src = src;
  //script.onload = () => callback(script);
  document.руфв.append(scriptIndex);
}*/
/*
function loadIndexJs(src, objArr) {
  let scriptIndex = document.createElement('script');
  scriptIndex.src = src;
  document.body.append(scriptIndex);
}
*/
//createRequest(urlQuery, bodyQuery);

function createRequest(urlQu, bodyQu) {
  fetch(urlQu, {
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
    // Проверяем успешность запроса и выкидываем ошибку
    console.log('response1 :::::: ', response.statusText);
    if (!response.ok) {
      throw new Error('Error occurred!')
    }
    return response.json();
  })
  .then((respData) => { 
    // надо бы поместить каждый в свой ПРОСТО массив
    console.log('respData 1', respData)
    const arrFilms = respData.films.result;
    const arrSeances = respData.seances.result;
    const arrHalls = [];
    const tempArrHalls = respData.halls.result;
    for (const item of tempArrHalls) {
      if (item.hall_open !=="0") {
        arrHalls.push(item);
      }
    }
    // после успешного выполнения запроса выполняем
    // скрипт загрузки информации по фильмам на страницу
    //*****loadIndexJs('js/index.js');
    //alert('Запрос успешно отработан!!!')
    localStorage.films = JSON.stringify(arrFilms);
    localStorage.halls = JSON.stringify(arrHalls);
    localStorage.seances = JSON.stringify(arrSeances);
  /*  
   console.log('localStorage.films: ', localStorage.films)
    console.log('localStorage.seances: ', localStorage.seances)
    console.log('localStorage.halls: ', localStorage.halls)
    console.log('arrFilms: ', arrFilms)
    console.log('arrSeances: ', arrSeances)
    console.log('arrHalls: ', arrHalls)
  */})
  .catch((err) => {
    console.log(err);
  }); // Error: Error occurred!
}
// запрос (второй) к серверу для получения конфигурации зала
//function createRequestHall() {
function createRequestHall(urlQuHall, bodyQuHall) {
//  fetch('https://jscp-diplom.netoserver.ru/', {
  fetch(urlQuHall, {
    method: 'POST',
    // Добавляем необходимые заголовки
    headers: {
    'Content-type': 'application/x-www-form-urlencoded',
    },
    // Тело запроса
          //body: JSON.stringify(newPost), // Тело запроса в JSON-формате
    //body: 'event=get_hallConfig&timestamp=${28077870}&hallId=${59}&seanceId=${66}',
    body: bodyQuHall,
  })
  .then((response) => {
    // Проверяем успешность запроса и выкидываем ошибку
    console.log('response2 /////// ', response.statusText);
    if (!response.ok) {
      throw new Error('Error occurred!')
    }
    return response.json();
  })
  .then((respData) => { 
    console.log('respData2 +-+-+ ', respData);
    localStorage.hallConfigPls = JSON.stringify(respData);
  })
  .catch((err) => {
    console.log(err);
  }); // Error: Error occurred!
}
