'use strict'

const objRespOfServer = {};

fetch('http://f0769682.xsph.ru/', {
    method: 'POST',
    // Добавляем необходимые заголовки
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
    // Тело запроса
    // body: JSON.stringify(newPost), // Тело запроса в JSON-формате
    body: 'event=update',
})
  .then((response) => {
    // Проверяем успешность запроса и выкидываем ошибку
    if (!response.ok) {
      throw new Error('Error occurred!')
    }
    return response.json();
  })
  .then((respData) => {
     // Для контроля полученных значений, можно удалить.
     /*
    console.log('Возвращаем всё', respData);
    console.log('Возвращаем - фильмы ', respData.films.result);
    console.log('Возвращаем - залы ', respData.halls.result);
    console.log('Возвращаем - сеансы ', respData.seances.result);
  */
    objRespOfServer.arrFilms = respData.films.result;
    objRespOfServer.arrHals = respData.halls.result;
    objRespOfServer.arrSeances = respData.seances.result;

    // получаем актуальную дату
    const nowDate = new Date();
/*
  надо поработать с датой
*/

    //        Работаем со страницей. 
//              Заполняем-создаем карточку фильма

const img = Array.from(document.getElementsByTagName('img'));
img.forEach((item, idx) => {
  item.setAttribute('alt', objRespOfServer.arrFilms[idx].film_name + ' постер');
  item.setAttribute('src', objRespOfServer.arrFilms[idx].film_poster);
});

const h2Title = Array.from(document.getElementsByClassName('movie__title'));
h2Title.forEach((item, idx) => {
  item.textContent = objRespOfServer.arrFilms[idx].film_name;
});

const pDescription = Array.from(document.getElementsByClassName('movie__synopsis'));
pDescription.forEach((item, idx) => {
  item.textContent = objRespOfServer.arrFilms[idx].film_description;
});

const spanDuration = Array.from(document.getElementsByClassName('movie__data-duration'));
spanDuration.forEach((item, idx) => {
  item.textContent = objRespOfServer.arrFilms[idx].film_duration;
});

const spanOrgin = Array.from(document.getElementsByClassName('movie__data-origin'));
spanOrgin.forEach((item, idx) => {
  item.textContent = objRespOfServer.arrFilms[idx].film_origin
  ;
});





  })
  // Теперь попадём сюда, т.к выбросили ошибку
  .catch((err) => {
    console.log(err);
  }); // Error: Error occurred!

  console.log('objRespOfServer = ', objRespOfServer);




