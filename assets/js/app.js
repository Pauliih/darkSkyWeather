//Función para mostrar ícono
function skycons() {
  var i,
    icons = new Skycons({
      "color" : "pink",
      'resizeClear': true
    }),
    list  = [ // listing of all possible icons
      "clear-day",
      "clear-night",
      "partly-cloudy-day",
      "partly-cloudy-night",
      "cloudy",
      "rain",
      "sleet",
      "snow",
      "wind",
      "fog"
    ];
  // loop thru icon list array
  for(i = list.length; i--;) {
    var weatherType = list[i], // select each icon from list array
      // icons will have the name in the array above attached to the
      // canvas element as a class so let's hook into them.
      elements    = document.getElementsByClassName( weatherType );
    // loop thru the elements now and set them up
    for (e = elements.length; e--;) {
      icons.set(elements[e], weatherType);
    }
  }
  // animate the icons
  icons.play();
}

let latitude = '';
let longitude = '';

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      latitude = position.coords.latitude;  
      longitude = position.coords.longitude;
    
      let content  = document.querySelector('.content-container');

      fetch('https://api.darksky.net/forecast/3d7fa4487d56a5af00388aaee4076a0e/'+ latitude + ',' + longitude + '?lang=es&units=auto')
      .then(function(response) {
        return response.json();
      })
      
      .then(function(data) {
        console.log(data);

          //Let's make some HTML!
        let html = `<h3 class="title text-center">${data.timezone}</h3>
        <figure class="text-center"><canvas class="${data.currently.icon}"></canvas></figure>
        <p class="text-center">${data.currently.temperature} °C</p>
        <p class="text-center">${data.currently.summary}</p>
        <p class="text-center">Índice UV: ${data.currently.uvIndex}</p>
        <p class="humidity text-center">Humedad: ${data.currently.humidity}</p>
        `;

        //Put that HTML on the page
        content.innerHTML = html;
        skycons();

        let contentBtn  = document.querySelector('.content-button');

        let htmlBtn = `<button>Ver Semana</button>`;

        contentBtn.innerHTML = htmlBtn;
      })
      .catch(function(error) {
        alert("No es posible entregar la información")
      });

    }) 
  }
}


