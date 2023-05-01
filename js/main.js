'use strict'

const responseFetch = fetch('http://f0769682.xsph.ru/', {
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
    //const respDataParse = JSON.parse(respData);
    console.log(respData);
    localStorage.films = respData.films;
    localStorage.halls = respData.halls;
    localStorage.seances = respData.seances;
    
    console.log('В локальном хранилище - фильмы: ', localStorage.films);
    console.log('В локальном хранилище - залы: ', localStorage.halls);
    console.log('В локальном хранилище - сеансы: ', localStorage.seances);
  })
  // Теперь попадём сюда, т.к выбросили ошибку
  .catch((err) => {
    console.log(err);
  }); // Error: Error occurred!
  

  /*
  const responseFetchGet = fetch('http://f0769682.xsph.ru/')
  .then((response) => response.json());

  console.log(responseFetchGet);
*/
//const filmsObj =  JSON.parse(responseFetch);

console.log('Ответ fetch: ', responseFetch);
console.log('Films: ', responseFetch.films);
console.log('Halls: ', responseFetch.halls);
console.log('Seances: ', responseFetch.seances);