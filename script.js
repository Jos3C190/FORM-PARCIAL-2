const costoAddCiudad = 50; //Si la ciudad de origen y la ciudad de destino son diferentes
const costoAddFinSemana = 100; //Si la fecha de salida es en fin de semana 
const costoAddHora = 75; //Si la hora de salida es en horas pico
let form = document.querySelector('form');

window.addEventListener('load', ()=>{
  const today = new Date();
  document.getElementById('fecha').min = today
  .toISOString()
  .slice(0,10);
})

//Calcular costo del boleto
form.addEventListener('submit', function(event){
  event.preventDefault()

  const ciudadOrigen = document.getElementById('origen').value;
  const ciudadDestino = document.getElementById('destino').value;
  const fechaSalidaString = document.getElementById('fecha').value;
  const fechaSalida = new Date(fechaSalidaString + "T00:00:00.000-04:00");
  fechaSalida.setMinutes(fechaSalida.getMinutes() - fechaSalida.getTimezoneOffset() - 360);
  const horaSalida = document.getElementById('hora').value;
  let totalCost = 200;

  if (ciudadOrigen !== ciudadDestino) {
    totalCost += costoAddCiudad;
  }

  const weekend = [0, 5, 6]
  if (weekend.includes(fechaSalida.getDay())) {
    totalCost += costoAddFinSemana;
  }

  let hour = parseInt(horaSalida.split(':')[0]);
  if ((hour >= 7 && hour < 9) || (hour >= 16 && hour < 18)) {
    totalCost += costoAddHora;
  }

  let costElement = document.getElementById('costo');
  if (ciudadOrigen === '' || ciudadDestino === '' || isNaN(fechaSalida) || horaSalida === '') {
    costElement.textContent = "Fill in all fields.";
    costElement.style.color = "red"
  }else{
    costElement.textContent = "$" + totalCost;
    costElement.style.color = "green"
  }
})
