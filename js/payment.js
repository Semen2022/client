'use strict'

const dataSelSeance = JSON.parse(localStorage.selectSeance); 
const priceTikets = JSON.parse(localStorage.allCostTicket);
const rowColPlaces = JSON.parse(localStorage.selectedPlaces);

function strRowColPlaces() {
  let strPlaces = '';
  rowColPlaces.forEach((elemRowCol, idx) => {
    if (idx < rowColPlaces.length - 1) { // чтобы в конце не проставлялась запятая
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

let bodyQues = '';
function getHallCfg(soldTickets) {
  const arrTickets = soldTickets.sales.result;
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
  createRequest(bodyQues, getHallCfg);
})