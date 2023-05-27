'use strict'

// забираем данные о планируемых к бронированию билетах из localStorage 
    // данные выбранного сеанса
const dataSelSeance = JSON.parse(localStorage.selectSeance); //dataSelSeance
    // стимость выбранных мест
const priceTikets = JSON.parse(localStorage.allCostTicket);
    // данные по выбранным местам для отображения в билете 
const rowColPlaces = JSON.parse(localStorage.selectedPlaces);

function strRowColPlaces() {
  let strPlaces = '';
  rowColPlaces.forEach((elemRowCol, idx) => {
    if (idx < rowColPlaces.length - 1) { // чтобы в конце не проставляласб запятая
      strPlaces += ` ${elemRowCol.row}/${elemRowCol.place},`;   
    }
  }); 
  strPlaces += ` ${rowColPlaces[rowColPlaces.length - 1].row}/${rowColPlaces[rowColPlaces.length - 1].place}`;
  return strPlaces;
}
    // данные по выбранной дате и началу сеанса
const timeMinStartDay = JSON.parse(localStorage.chosenedDay);
const timeStartDaySeconds = (Number(timeMinStartDay.timeStartDay) + Number(dataSelSeance.startSeance) * 60 * 1000);
    // вычисление начала сеанса для вывода на страницу
const timeStartSeance = `${Math.trunc(dataSelSeance.startSeance / 60)}:${(dataSelSeance.startSeance % 60) || '00'}`;

const dateStr = new Date(+timeStartDaySeconds).toLocaleDateString("ru-RU", {day: "2-digit", month: "2-digit", year: "numeric"});

    // формируем данные для вывода на страницу бронирования билета

document.querySelector('.ticket__title').innerText = dataSelSeance.filmName;
document.querySelector('span.ticket__details.ticket__chairs').innerText = strRowColPlaces();
document.querySelector('.ticket__hall').innerText = dataSelSeance.hallName[3];
document.querySelector('.ticket__start').innerText = ` ${timeStartSeance} - ${dateStr}г.`;
document.querySelector('.ticket__cost').innerText = priceTikets;



/*   
{textTicket[idx]}: {item.textContent} 
{textTicket[idx]}: {item.textContent} 
{textTicket[idx]}: {item.textContent}
{textTicket[idx]}: {item.textContent}
*/          
//console.log('dataForQR ', Array.from(document.getElementsByClassName('ticket__details')));
//console.log('**** strQR *****', getStrDataForQR());
let bodyQues = '';
function getHallCfg(soldTickets) {
  const arrTickets = soldTickets.sales.result;
  //console.log('arrTickets ', arrTickets);
}
document.querySelector('.acceptin-button').addEventListener('click', () => {
  //формируется строка для QR-кода
  const dataForQR = Array.from(document.getElementsByClassName('ticket__details')).reduce((strQR, elem) => {
    return strQR + '|' + elem.textContent ; 
  }, '');
  localStorage.strToQR = JSON.stringify(dataForQR);
  const strNewCfgHall = JSON.parse(localStorage.hallNewCfg);
  // изменить атрибуты в строке верстки на "занятые"
  const sendHallConfig = strNewCfgHall.split('selected').join('taken'); 

bodyQues = `event=sale_add&timestamp=${timeStartDaySeconds / 1000}&hallId=${dataSelSeance.hallId}&seanceId=${dataSelSeance.seanceId}&hallConfiguration=${sendHallConfig}`;
  // отправить "занятые" места на сервер запросом
  console.log('bodyQues ', bodyQues)
  //console.log('sendHallConfig ', sendHallConfig)
  createRequest(bodyQues, getHallCfg);
  //console.log('sendHallConfig typeof ', typeof sendHallConfig)
})

//данные по обновленной конфигурации зала
//const arrHalls = JSON.parse(localStorage.hallNewCfg); 
//querySeanceId = dataSelSeance.seanceId;

// данные для запроса конкретного сеанса
//urlQueryHall = 'https://jscp-diplom.netoserver.ru/';
//bodyQueryHall = `event=get_hallConfig&timestamp=\${'${timeStartDayMinutsQuery}'}&hallId=\${'${queryHallId}'}&seanceId=\${'${querySeanceId}'}`;
// bodyQueryHall = 'event=get_hallConfig&timestamp=${28077870}&hallId=${59}&seanceId=${66}';
//createRequestHall(); // Кот в сапогах на 15.30 на последний день в строке
//createRequestHall(urlQueryHall, bodyQueryHall);
