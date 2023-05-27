dataSelSeance = JSON.parse(localStorage.selectSeance);
timeMinStartDay = JSON.parse(localStorage.chosenedDay);
arrHalls = JSON.parse(localStorage.halls); 
timeStartDayMinutsQuery = (Number(timeMinStartDay.timeStartDay) / 1000 + Number(dataSelSeance.startSeance) * 60);
queryHallId = dataSelSeance.hallId;
querySeanceId = dataSelSeance.seanceId;
bodyQueryHall = `event=get_hallConfig&timestamp=${timeStartDayMinutsQuery}&hallId=${queryHallId}&seanceId=${querySeanceId}`;

createRequest(bodyQueryHall, pageHallHtml);

function pageHallHtml(respDataHall) {
  // подписываем данные на странице зала
  // название фильма
  document.querySelector('.buying__info-title').innerHTML = dataSelSeance.filmName;
  // начало сеанса
  timeStartSeance = `${Math.trunc(dataSelSeance.startSeance / 60)}:${(dataSelSeance.startSeance % 60) || '00'}`;
  document.querySelector('.buying__info-start').innerHTML = `Начало сеанса: ${timeStartSeance}`;
  // название зала
  document.querySelector('.buying__info-hall').innerHTML = `Зал ${dataSelSeance.hallName[3]}`;
  // цена стандарт
  document.querySelector('.price-standart').innerText = dataSelSeance.priceStandart;
  // цена vip
  document.querySelector('.price-vip').innerText = dataSelSeance.priceVip;
  // помещаем, что пришло по занятости зала из ПЕРВОГО запроса
  hallCfg = respDataHall;
  places = '';
  arrHalls.filter(elHall => {
    if (elHall.hall_id === queryHallId) {
      places = elHall.hall_config;
    }
  });

  // получаем разметку зала
  hallConfig = hallCfg || places;
  document.querySelector('.conf-step__wrapper').innerHTML = hallConfig;
                  // вешаем обработчик на выбор мест
  chairs = document.querySelectorAll('.conf-step__chair');
                  // отмечаем выбранные пользователем места
  chairs.forEach(itemCh => {
    itemCh.addEventListener('click', () => {
      if (!itemCh.getAttribute('class').includes('conf-step__chair_disabled')) {
        itemCh.classList.toggle('conf-step__chair_selected');
      }
    })        
  });
      // функция подсчета цены билетов 
  function costTickets() {
    chairSelected = document.querySelectorAll('.conf-step__chair_selected');
    tempCountStd = 0;
    tempCountVip = 0;
    chairSelected.forEach(itemChSel => {
      if (itemChSel.getAttribute('class').includes('conf-step__chair_standart')) {
        ++tempCountStd;
      } 
      if (itemChSel.getAttribute('class').includes('conf-step__chair_vip')) {
        ++tempCountVip;
      } 
    });
    return {costStd: tempCountStd * dataSelSeance.priceStandart,
            costVip: tempCountVip * dataSelSeance.priceVip
            };
  }
        // функция формирования выбранных мест
  function getSelectedPlaces() {
    arrSelPlaces = [];
    Array.from(document.getElementsByClassName('conf-step__row')).forEach((row, rdx) => {
      Array.from(row.childNodes).forEach((col, vdx) => {  
        if (col.getAttribute('class').includes('conf-step__chair_selected')) {
        arrSelPlaces.push({'row': rdx + 1, 'place': vdx + 1});
        }
      })
    })
    return arrSelPlaces;
  }
          // обрабатывае нажатие на кнопку "ЗАБРОНИРОВАТЬ"
  document.querySelector('.acceptin-button').addEventListener('click', () => {
          // считаем общую стоимость билетов
      costTicket = costTickets();
      selectedHallCfg = document.querySelector('.conf-step__wrapper').innerHTML
      localStorage.allCostTicket = JSON.stringify(costTicket.costStd + costTicket.costVip);
      localStorage.selectedPlaces = JSON.stringify(getSelectedPlaces());
      localStorage.hallNewCfg = JSON.stringify(selectedHallCfg);
         // перход на страницу бронирования и запуска генерации QR-кода купленного(ых) билета(ов)
      window.location.href = 'payment.html'
  })
}