// `process.env` is the one defined in the webpack's DefinePlugin
const envVariables = process.env;

// Read vars from envVariables object
const API_KEY = envVariables.API_KEY;

// get the attributes 'value' = capital code  and 'name' = capital name  - form HTML file 
const divCount = document.getElementsByClassName("contenitore");

for (let i=0; i < divCount.length; i++) {
  divCount[i].addEventListener('click', event=> {
  let capital = divCount[i].getAttribute("value");
  let laCapitale = divCount[i].getAttribute("name");
  loadDoc(capital);
  esponi(laCapitale);
});
}

// functions to load information from OpenWather API

async function loadDoc(capital) {
	const estraiDati = await estraiAPI(capital);
	let oggettoJason = await estraiDati.json();
  let celsius = (oggettoJason.main.temp - 273.15).toFixed(1);

      if (isNaN(celsius) == true) {
        document.getElementById("temperatura").innerHTML = "Temperatura non pervenuta";
      } else {
      
        document.getElementById("temperatura").innerHTML = " &#127777 " + celsius + "°";
      }

  let simbolo = "";
  let codiceSimbolo = oggettoJason.weather[0].id;
  if (isNaN(codiceSimbolo) == true) {
    simbolo = "Tempo non pervenuto";
    } else if (codiceSimbolo < 299) {
      simbolo = " &#9889 ";
    } else if (codiceSimbolo < 599) {
      simbolo = "  &#9748 ";
    } else if (codiceSimbolo < 699) {
      simbolo = " &#9924 ";
    } else if (codiceSimbolo < 801) {
      simbolo = " &#127774 ";
    } else if (codiceSimbolo < 804) {
      simbolo = " &#9925 ";
	  } else {
    simbolo = "&#9729";
      if (celsius == "Temperatura non pervenuta") {
        simbolo = "";
      }
    }
  document.getElementById("simbolo-tempo").innerHTML = simbolo;
}

function estraiAPI(capital) {
	let API_KEY = "fdd1b2dd1a3650c3d65d13cdb9617ec1";
	return fetch('https://api.openweathermap.org/data/2.5/weather?id=' + capital + '&appid=' + API_KEY);
}

// overlay

function esponi(laCapitale) {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("citta").innerHTML = laCapitale;
}

document.getElementById("croce").addEventListener('click', event=> {
  document.getElementById("overlay").style.display = "none";
});

// filtro con ricerca

document.getElementById("myInput").addEventListener('keyup', event=> {

//function ricerca() {
    let input, filter, tutti, bottone, acca3, a, b, i, cont, txtValue1, txtValue2, txtValue3;
    input = document.getElementById("myInput");
	  console.log(input);
    filter = input.value.toUpperCase();
    tutti = document.getElementById("filtro");
    bottone = tutti.getElementsByTagName("button");
	  acca3 = tutti.getElementsByTagName("h3");
    cont = document.getElementsByClassName("contenitore");
    for (i = 0; i < cont.length; i++) {   // c'era bottone
        a = bottone[i];
		    b = acca3[i];
        txtValue1 = a.textContent || a.innerText;
		    txtValue2 = b.textContent || b.innerText;
		    txtValue3 = txtValue1 + txtValue2;
        if (txtValue3.toUpperCase().indexOf(filter) > -1) {
			    cont[i].style.display = "";  
        } else {
          cont[i].style.display = "none";
        }
	
	}
//}
});


// geolocalizzazione 

window.onload = (event) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(posizione);
  } else { 
    document.getElementById("demo").innerHTML = "Geolocalizzazione non sopportata dal browser.";
  }
}

async function posizione(position) {
	const estraiDati = await estraiAPIcoord(position);
	let oggettoJason = await estraiDati.json();
  let celsius = (oggettoJason.main.temp - 273.15).toFixed(1);
    if (isNaN(celsius) == true) {
      celsius = "Dato non pervenuto";
    }
  let simbolo = "";
  let codiceSimbolo = oggettoJason.weather[0].id;
    if (isNaN(codiceSimbolo) == true) {
      simbolo = "Tempo non pervenuto";
      } else if (codiceSimbolo < 299) {
        simbolo = " &#9889 ";
      } else if (codiceSimbolo < 599) {
        simbolo = "  &#9748 ";
      } else if (codiceSimbolo <699) {
        simbolo = " &#9924 ";
      } else if (codiceSimbolo <801) {
        simbolo = " &#127774 ";
      } else {
        simbolo = " &#9925 "
      }
  document.getElementById("demo").innerHTML = "Attualmente nella tua località: " + simbolo + " &#127777 " + celsius + "°";
}

function estraiAPIcoord(position) {
	let lat = position.coords.latitude;
	let longi = position.coords.longitude;
	let API_KEY = "fdd1b2dd1a3650c3d65d13cdb9617ec1";
	return fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + longi + '&appid=' + API_KEY);
}
  