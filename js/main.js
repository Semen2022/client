'use strict'

const objRespOfServer = {};
              // предыдущая ссылка http://f0769682.xsph.ru/   https://jscp-diplom.tw1.ru/
fetch('https://jscp-diplom.tw1.ru/', {
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
     
    // надо бы поместить каждый в свой ПРОСТО массив
  const arrFilms = respData.films.result;
  const arrSeances = respData.seances.result;
  const arrHalls = [];
  const tempArrHalls = respData.halls.result;
  for (const item of tempArrHalls){
    if (item.hall_open !=="0") {
      arrHalls.push(item);
    }
  }

  console.log('arrFilms: ', arrFilms)
  console.log('arrSeances: ', arrSeances)
  console.log('arrHalls: ', arrHalls)

  // получаем актуальную дату
    const nowDate = new Date();
/*
  надо поработать с датой
*/

    //        Работаем со страницей. 
//----Добавляем карточки на страницу по количеству фильмов.

const main = document.getElementsByTagName('main');

arrFilms.forEach( film => {
  // Выводим информацию по фильму  
  let cardFilm =`
  <section class="movie">
        <div class="movie__info">
            <div class="movie__poster">
                ${setImgOnIndex(film.film_name, film.film_poster)}
            </div>
            <div class="movie__description">
                ${setTitleOnIndex(film.film_name)}
                ${setSynopsisOnIndex(film.film_description )}
                <p class="movie__data">
                ${setDataDurationOnIndex(film.film_duration)}
                ${setDataOriginOnIndex(film.film_origin)}
                </p>
            </div>
          </div>
          <div class="movie-seances__hall">`; 

    // main[0].insertAdjacentHTML("beforeend", cardFilm);
    let i = 0; // счетчик для коллекции "section"   
    console.log(film.film_name);
  arrHalls.forEach( hall => {
    const section = document.getElementsByTagName('section');
    
    const arrSeancesFilm = arrSeances.filter( seance => film.film_id === seance.seance_filmid && hall.hall_id === seance.seance_hallid);
    
    if (arrSeancesFilm.length) {
      console.log(hall.hall_name);
      // hall_name вставляем информацию о зале здесь
      let hallStr = ` ${setHallOnIndex(hall.hall_name)}
                        <ul class="movie-seances__list">`;
                        // console.log(section,);
      let seanceStr = '';
      arrSeancesFilm.forEach( seanceFilm => {
        console.log(seanceFilm.seance_time);
        
        seanceStr += `<li class="movie-seances__time-block">
                      <a class="movie-seances__time" 
                          href="hall.html">${seanceFilm.seance_time}
                      </a>
                    </li>`;
                          // заполняем сеансы для зала. Преобразовать для сравнения в seanceTime = seance.seance_time
                          // if (nowTimeData < seanceTime)
                          // здесь же заполняем setAtribute data-
      });
      cardFilm += hallStr + seanceStr;
                        console.log('В зале --- ');

    }
                      // cardFilm += '</div> --' ;
                      //main[0].insertAdjacentHTML("beforeend", '</section> ***');
  })
                    main[0].insertAdjacentHTML("beforeend", cardFilm);
})


// Сопоставить фильмы по залам и сеансам. Вариант 1. Не удалось додумать вариант размещения в 1м зале 2х сеансов,
// если они в разных строках ответа сервера.
/*
const arrCardsFilms = [];

for (let i = 0; i < objRespOfServer.arrFilms.length; i++) {
  const arrFilmHallsSeances = []; 
  arrFilmHallsSeances.push(objRespOfServer.arrFilms[i]);
  objRespOfServer.arrSeances.forEach((seanceId) => {
    if (seanceId.seance_filmid === objRespOfServer.arrFilms[i].film_id) {
      objRespOfServer.arrHalls.forEach((hallId) => {
        const arrCardFilm = []; // создаем массив для карточки фильма, будем помещать туда объекты одного фильма 
        //console.log("По фильму ищем сеанс: " + seanceId.seance_filmid, 'Фильм - ' + objRespOfServer.arrFilms[i].film_id)
        if (seanceId.seance_hallid === hallId.hall_id) {
          arrCardFilm.push(hallId);
          arrCardFilm.push(seanceId);
          arrFilmHallsSeances.push(arrCardFilm);
        }
      })
    }
  })
  arrCardsFilms.push(arrFilmHallsSeances);
}
*/
// Теперь в массиве arrCardsFilms - лежат фильмы по "фильму", "залу" с этим фильмом и "сеансами" по этому залу с фильмом
// console.log('****** Массив фильмов ****** ', arrCardsFilms);

/* ~~~~~~~~~~~~~~ Формируем верстку карточки фильма ~~~~~~~~~~~
 возможно для каждой строки верстки стоит написать функцию*/ 

 // функция вставки нужной картинки в img
 
 function setImgOnIndex(altImg, srcImg) {
    return `<img class="movie__poster-image" alt="${altImg}" src="${srcImg}">`;
   }
   // функция вставки названия фильма
   function setTitleOnIndex(titleFilm) {
    return `<h2 class="movie__title">${titleFilm}</h2>`;
   }
   // функция вставки описания фильма
   function setSynopsisOnIndex(synapsysFilm) {
    return `<p class="movie__synopsis">${synapsysFilm}</p>`;
   }
   // функция вставки даты выхода фильма
   function setDataDurationOnIndex(dataDuration) {
    return `<span class="movie__data-duration">${dataDuration + 'мин.'}</span>`;
   }
   // функция вставки страны создания фильма
   function setDataOriginOnIndex(dataOrigin) {
    return `<span class="movie__data-origin">${dataOrigin}</span>`;
   }
  
  function setHallOnIndex(hallName) {
    return `<h3 class="movie-seances__hall-title">${'Зал ' + hallName[3]}</h3>`;
  }

  })
  // Теперь попадём сюда, т.к выбросили ошибку
  .catch((err) => {
    console.log(err);
  }); // Error: Error occurred!

  console.log('objRespOfServer = ', objRespOfServer);






