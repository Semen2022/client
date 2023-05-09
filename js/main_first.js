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
     // Для контроля полученных значений (можно удалить).
  /*
    console.log('Возвращаем всё', respData);
    console.log('Возвращаем - фильмы ', respData.films.result);
    console.log('Возвращаем - залы ', respData.halls.result);
    console.log('Возвращаем - сеансы ', respData.seances.result);
  */

    // надо бы поместить каждый в свой ПРОСТО массив
  objRespOfServer.arrFilms = respData.films.result;
  objRespOfServer.arrSeances = respData.seances.result;
  objRespOfServer.arrHalls = [];
  const tempArrHalls = respData.halls.result;
  for (const item of tempArrHalls){
    if (item.hall_open !=="0") {
      objRespOfServer.arrHalls.push(item);
    }
  }

    
    
    // получаем актуальную дату
    const nowDate = new Date();
/*
  надо поработать с датой
*/

    //        Работаем со страницей. 
//----Добавляем карточки на страницу по количеству фильмов.
// Количество фильмов берем из элемента объекта objRespOfServer.arrFilms.length

let cardContent = `<section class="movie">
  <div class="movie__info">
    <div class="movie__poster">
      <img class="movie__poster-image" alt="" src="">
    </div>
    <div class="movie__description">
      <h2 class="movie__title"></h2>
      <p class="movie__synopsis"></p>
      <p class="movie__data">
        <span class="movie__data-duration"></span>
        <span class="movie__data-origin"></span>
      </p>
    </div>
  </div>  
  
  <div class="movie-seances__hall">
    <h3 class="movie-seances__hall-title">Зал 2</h3>
    <ul class="movie-seances__list">
      <li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html">11:15</a></li>
      <li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html">14:40</a></li>
      <li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html">16:00</a></li>
      <li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html">18:30</a></li>
      <li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html">21:00</a></li>
      <li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html">23:30</a></li>     
    </ul>
  </div>      
</section>`;

  //console.log('В FETCH для карточек ', objRespOfServer.arrFilms, objRespOfServer.arrHals, objRespOfServer.arrSeances);
  const quantityFilms = objRespOfServer.arrFilms.length;
  const quantityHallsFilm = objRespOfServer.arrHals.length
  const quantitySeancesHoll = objRespOfServer.arrSeances.length
  
  //console.log('Количество фильмов - ', quantityFilms);  
const main = document.getElementsByTagName('main');

// Добавляем фильмы на страницу
for (let i = 0; i < quantityFilms; i++) {
  main[0].insertAdjacentHTML("beforeend", cardContent);
  // Добавляем залы в карточку фильма
  for (let j = 0; j < quantityHallsFilm; j++) {
    const movieInfo = document.getElementsByClassName('movie__info');
    movieInfo.insertAdjacentHTML("afterend",
      `<div class="movie-seances__hall">
        <h3 class="movie-seances__hall-title">Зал 2</h3>
      </div>`);
      
  }  
} 

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






