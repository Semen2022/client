'use strict'

const strQRcode = JSON.parse(localStorage.strToQR).split('|').filter((el) => {
  if (el !== '') {
    return el;
  }
 } );
console.log('strQRcode ', strQRcode);

document.querySelector('.ticket__title').innerText =strQRcode[0];
document.querySelector('.ticket__chairs').innerText = strQRcode[1];
document.querySelector('.ticket__hall').innerText = strQRcode[2];
document.querySelector('.ticket__start').innerText = strQRcode[3];
document.querySelector('.ticket__hint').insertAdjacentHTML("beforebegin", '<p class=\'ticket__info\' > Билет действителен строго на свой сеанс! </p>');

function getStrDataForQR() {
  let strQR = '';
  const textTicket = ['Фильм',
                      'Ряд/Место',
                      'Зал',
                      `Время и дата 
        начала сеанса`,
                      'Цена (руб)'
                    ];
    strQRcode.forEach((item, idx) => {
    //console.log(item, idx + 1)
    strQR += `
        ${textTicket[idx]}: ${item}`;        
  })
    return `${strQR}
                  ВНИМАНИЕ!
     Билет действителен строго на свой сеанс!`;
}

const qrCodeTicket = QRCreator( getStrDataForQR(), {image: 'SVG'});
const contentQR = (qrCodeStr) => {
  return qrCodeStr.error 
          ? `недопустимые исходные данные ${qrCodeTicket.error}`
          : qrCodeTicket.result;
};

console.log("getStrDataForQR() ", getStrDataForQR())
document.getElementById('qrcode').append("", contentQR(qrCodeTicket))

window.addEventListener("onbeforeunload", () => {
delete localStorage.allCostTicket;
delete localStorage.chosenedDay;
delete localStorage.hallNewCfg;
delete localStorage.halls;
delete localStorage.selectSeance;
delete localStorage.selectedPlaces;
delete localStorage.strToQR;
});