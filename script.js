//costos
const costoAddCiudad = 50; //Si la ciudad de origen y la ciudad de destino son diferentes
const costoAddFinSemana = 100; //Si la fecha de salida es en fin de semana 
const costoAddHora = 75; //Si la hora de salida es en horas pico
const costoBase = 200; //Costo base del vuelo

let form = document.querySelector('form');

//Calcular costo del boleto
form.addEventListener('submit', function(event){
  event.preventDefault()

  let ciudadOrigen = document.getElementById('origen').value;
  let ciudadDestino = document.getElementById('destino').value;
  let fechaSalida = new Date(document.getElementById('fecha').value);
  let horaSalida = document.getElementById('hora').value;
  let costoTotal = costoBase;

  if (ciudadOrigen !== ciudadDestino) {
    costoTotal += costoAddCiudad;
  }

  if (fechaSalida.getUTCDay() === 0 || fechaSalida.getUTCDay() === 5 || fechaSalida.getUTCDay() === 6) {
    costoTotal += costoAddFinSemana;
  }

  let PartesHora = horaSalida.split(':');
  let hora = parseInt(PartesHora[0]); //se obtiene solamente la parte de la hora

  if ((hora >= 7 && hora < 9) || (hora >= 16 && hora < 18)) {
    costoTotal += costoAddHora;
  }

  if (ciudadOrigen === '' || ciudadDestino === '' || isNaN(fechaSalida) || horaSalida === '') {
    document.getElementById('costo').textContent = "Fill in all fields.";
    document.getElementById('costo').style.color = "red"
  }else{
    document.getElementById('costo').textContent = "$" + costoTotal;
    document.getElementById('costo').style.color = "green"
  }
})