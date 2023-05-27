'use strict'

  delete localStorage.allCostTicket;
  delete localStorage.chosenedDay;
  delete localStorage.hallNewCfg;
  delete localStorage.halls;
  delete localStorage.selectSeance;
  delete localStorage.selectedPlaces;
  delete localStorage.strToQR;

const bodyQuery = 'event=update';

createRequest(bodyQuery, pageIndexHtml);

function pageIndexHtml(respIndexPage) {
  
  const arrFilms = respIndexPage.films.result;
  const arrSeances = respIndexPage.seances.result;
  const arrHalls = [];
  const tempArrHalls = respIndexPage.halls.result;
  for (const item of tempArrHalls) {
    if (item.hall_open !=="0") {
      arrHalls.push(item);
    }
  }

                      // Используемые функции для отрисовки страницы

// ~~~~~~~~~~~~~~ Формируем верстку карточки фильма ~~~~~~~~~~~   

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
    // функция вставки зала фильма
  function setHallOnIndex(hallName) {
    return `<h3 class="movie-seances__hall-title">${'Зал ' + hallName[3]}</h3>`;
  }
      // функция добавления сеанса
  function setTimeSeaceOnIndex(timeSeance) {
    return `<li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html">${timeSeance}</a></li>`;
  }

    // получаем актуальную дату
  const dateNow = new Date();
    // устанавливаем дни недели на страницу в навигацию по дням
  dateMenu();
  function dateMenu() {
    const days = document.querySelectorAll('.page-nav__day-week');
    const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб',];
    for (let i = 0; i < days.length; i++) {
        const j = (dateNow.getDay() + i) % weekDays.length;
        days[i].textContent = `${weekDays[j]}`;
        if (j === 0 || j === 6) {
          days[i].closest('.page-nav__day').classList.add('page-nav__day_weekend');
        }
    }
  }
  // устанавливаем дни месяца (даты)на страницу в навигацию по дням
  const dateMonth = document.querySelectorAll('.page-nav__day-number');
  dateMonth.forEach((item) => {
    item.textContent = dateNow.getDate();
    item.closest('.page-nav__day').dataset.timeStartDay = dateNow.setHours(0,0,0,0);
    dateNow.setDate(dateNow.getDate() + 1);
  });

  // Отображение (увеличение элемента) выбираемого дня
  const daysChosen = document.querySelectorAll('.page-nav__day');
 
  daysChosen.forEach((el) => {
    el.addEventListener('click', () => {
      // необходимый dataset в атрибуты
      el.classList.toggle('page-nav__day_chosen');
        // убираем атрибут "page-nav__day_chosen" у других элементов
      daysChosen.forEach((otherEl) => {
        if (el !== otherEl) {
            otherEl.classList.remove('page-nav__day_chosen');
        }
      })
      // устанавливаем data-атрибут для выбранного дня с временем сеанса  
      const nowTimeStamp = new Date();
      const timeMinutsNow = nowTimeStamp.getHours() * 60 + nowTimeStamp.getMinutes();
        // получаем все data-атрибуты начала сеансов (из data-start-seance)
      const timeStartSeances = document.querySelectorAll('.movie-seances__time');
      if (el.getAttribute('class').includes('page-nav__day_today')) {
          timeStartSeances.forEach( (elem) => {
            const timeStartSeanceOne = Number(elem.dataset.startSeance);
              // сравниваем текущее время и время сеанса и в зависимости от этого выводим время сеансов
          if (timeMinutsNow > timeStartSeanceOne) {
            elem.style.backgroundColor = 'grey';
            elem.setAttribute('href', '#0');
             } 
          })      
      } else {
        timeStartSeances.forEach( (elem) => {
          elem.style.backgroundColor = '#ffffff';
          elem.setAttribute('href', 'hall.html');
        })
      }
    });
  });
  const main = document.getElementsByTagName('main');
    // отрисовываем первоначальные карточки фильмов
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

      arrHalls.forEach( hall => {
        const section = document.getElementsByTagName('section');
        const arrSeancesFilm = arrSeances.filter( seance => 
          film.film_id === seance.seance_filmid && hall.hall_id === seance.seance_hallid);
          if (arrSeancesFilm.length) {
                // hall_name вставляем информацию о зале здесь
              let hallStr = ` ${setHallOnIndex(hall.hall_name)}
                            <ul class="movie-seances__list">`;
              let seanceStr = '';
            // функция формирования строки для вывода времени сеанса в зале
            // и запись в data-атрибуты данных для сеанса
              function seanseTimeStr(timeOneSeance, timeStartSeance, idSeance) {
                return `<li class="movie-seances__time-block">
                  <a class="movie-seances__time" 
                    href="hall.html" 
                    data-film-name='${film.film_name}'
                    data-film-film-id='${film.film_id}'
                    data-hall-name='${hall.hall_name}'
                    data-hall-id='${hall.hall_id}'
                    data-seance-id='${idSeance}'  
                    data-start-seance='${timeStartSeance}'
                    data-price-standart='${hall.hall_price_standart}' 
                    data-price-vip='${hall.hall_price_vip}' 
                    >${timeOneSeance}
                  </a>
                </li>`;
              }
              arrSeancesFilm.forEach(seanceFilm => {
          // формируем строку с временем фильма на страницу,
          // устанавливаем data-атрибут начала сеанса
                seanceStr += seanseTimeStr(seanceFilm.seance_time, seanceFilm.seance_start, seanceFilm.seance_id);
              });
              cardFilm += hallStr + seanceStr;
        }
      })        
      main[0].insertAdjacentHTML("beforeend", cardFilm);
  })
 
  const liSeance = document.querySelectorAll('.movie-seances__time');
   liSeance.forEach( (liElem) => {
    liElem.addEventListener('click', () => {
      const  dataSelectSeance =  liElem.dataset;
      localStorage.selectSeance = JSON.stringify(dataSelectSeance);
      localStorage.chosenedDay = JSON.stringify(document.querySelector('.page-nav__day_chosen').dataset);
      localStorage.halls = JSON.stringify(arrHalls); // помещаем все залы в localStorage
    })
  })
}