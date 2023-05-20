// забираем данные о сеансе из localStorage 
    // данные выбранного сеанса
    dataSelSeance = JSON.parse(localStorage.selectSeance); //dataSelSeance
    // данные по выбранной дате
timeMinStartDay = JSON.parse(localStorage.chosenedDay);
    // данные по конфигурации зала (по умолчанию) из первого запроса
arrHalls = JSON.parse(localStorage.halls); 
// штампа времени в минутах для запроса сеанса
timeStartDayMinutsQuery = (Number(timeMinStartDay.timeMinuteStartDay) + Number(dataSelSeance.startSeance) * 60000) / 60000;
// отправляем запрос на сервер о схеме зала
// данные для запроса конкретного сеанса
queryHallId = dataSelSeance.hallId;
querySeanceId = dataSelSeance.seanceId;
 urlQueryHall = 'https://jscp-diplom.netoserver.ru/';
bodyQueryHall = `event=get_hallConfig&timestamp=\${'${timeStartDayMinutsQuery}'}&hallId=\${'${queryHallId}'}&seanceId=\${'${querySeanceId}'}`;
// bodyQueryHall = 'event=get_hallConfig&timestamp=${28077870}&hallId=${59}&seanceId=${66}';
//createRequestHall(); // Кот в сапогах на 15.30 на последний день в строке
createRequestHall(urlQueryHall, bodyQueryHall);

// данные по конфигурации зала от сервера
 hallCfg = JSON.parse(localStorage.hallConfigPls);


console.log('bodyQueryHall ', bodyQueryHall);
console.log('hallCfg ', hallCfg);
console.log('arrHalls ', arrHalls);
console.log('dataSelSeance ', dataSelSeance);
console.log('timeMinutsStartDay ', timeMinStartDay);
console.log('timeMinutsStartDay ', timeMinStartDay.timeMinuteStartDay, typeof timeMinStartDay.timeMinuteStartDay);


console.log(queryHallId, querySeanceId, timeStartDayMinutsQuery)
console.log('timeMinuteStartDay ', timeMinStartDay.timeMinuteStartDay)
console.log('dataSelSeance.startSeance ', dataSelSeance.startSeance)



console.log('Данные для запроса 2 ');
console.log('timeStartDayMinutsQuery ', timeStartDayMinutsQuery)
console.log('urlQueryHall ', urlQueryHall)
console.log('bodyQueryHall ', bodyQueryHall)



// получаем разметку зала
hallConfig = hallCfg || arrHalls;
console.log('hallConfig ', hallConfig );

// проверяем, что пришло по занятости зала
places = '';
hallConfig.filter(elHall => {
  if (elHall.hall_id === queryHallId) {
    places = elHall.hall_config;
    return;
  }
 });
//console.log('///places ###### ', places);
document.querySelector('.conf-step__wrapper').innerHTML = places;