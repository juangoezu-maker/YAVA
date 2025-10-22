// DOM references
const registerSection = document.getElementById("registerSection");
const roleSection = document.getElementById("roleSection");
const conductorSection = document.getElementById("conductorSection");
const pasajeroSection = document.getElementById("pasajeroSection");
const waitingSection = document.getElementById("waitingSection");
const incomingSection = document.getElementById("incomingSection");
const mapSection = document.getElementById("mapSection");
const chatSection = document.getElementById("chatSection");
const paymentSection = document.getElementById("paymentSection");

const registerBtn = document.getElementById("registerBtn");
const btnConductor = document.getElementById("btnConductor");
const btnPasajero = document.getElementById("btnPasajero");
const startServiceBtn = document.getElementById("startServiceBtn");
const requestBtn = document.getElementById("requestBtn");
const acceptBtn = document.getElementById("acceptBtn");
const rejectBtn = document.getElementById("rejectBtn");
const sendBtn = document.getElementById("sendBtn");
const btnEfectivo = document.getElementById("btnEfectivo");
const btnTransferencia = document.getElementById("btnTransferencia");

const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const requestInfo = document.getElementById("requestInfo");
const waitingMsg = document.getElementById("waitingMsg");
const driverInfo = document.getElementById("driverInfo");
const map = document.getElementById("map");
const paymentMsg = document.getElementById("paymentMsg");
const statusConductor = document.getElementById("statusConductor");

let role = null;
let conductorDisponible = false;
let solicitudPendiente = null;

// Registro
registerBtn.onclick = () => {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  if (!name || !phone) return alert("Completa todos los campos");
  registerSection.classList.add("hidden");
  roleSection.classList.remove("hidden");
};

// Elegir rol
btnConductor.onclick = () => {
  role = "conductor";
  roleSection.classList.add("hidden");
  conductorSection.classList.remove("hidden");
};
btnPasajero.onclick = () => {
  role = "pasajero";
  roleSection.classList.add("hidden");
  pasajeroSection.classList.remove("hidden");
};

// Conductor inicia servicio
startServiceBtn.onclick = () => {
  conductorDisponible = true;
  statusConductor.innerText = "🟢 Esperando solicitudes...";
  alert("Estás disponible para recibir solicitudes.");
};

// Pasajero envía solicitud
requestBtn.onclick = () => {
  const type = document.getElementById("serviceType").value;
  const address = document.getElementById("address").value.trim();
  if (!address) return alert("Agrega tu dirección");
  pasajeroSection.classList.add("hidden");
  waitingSection.classList.remove("hidden");
  waitingMsg.innerText = "Enviando solicitud...";
  solicitudPendiente = { tipo: type, direccion: address };

  setTimeout(() => {
    if (conductorDisponible) {
      waitingSection.classList.add("hidden");
      incomingSection.classList.remove("hidden");
      requestInfo.innerText = `Solicitud de ${type} desde ${address}`;
    } else {
      waitingMsg.innerText = "No hay conductores disponibles 😔";
    }
  }, 2000);
};

// Conductor acepta o rechaza
acceptBtn.onclick = () => {
  incomingSection.classList.add("hidden");
  mapSection.classList.remove("hidden");
  driverInfo.innerText = "Pasajero encontrado. En ruta...";
  simulateRoute();
};
rejectBtn.onclick = () => {
  incomingSection.classList.add("hidden");
  statusConductor.innerText = "Esperando otra solicitud...";
};

// Simular ruta
function simulateRoute() {
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    map.innerText = `🚗 Conductor en camino... ${progress}%`;
    if (progress >= 100) {
      clearInterval(interval);
      map.innerText = "✅ Llegaste a tu destino";
      chatSection.classList.remove("hidden");
      paymentSection.classList.remove("hidden");
    }
  }, 1000);
}

// Chat
sendBtn.onclick = () => {
  const msg = chatInput.value.trim();
  if (!msg) return;
  addMsg(msg, "me");
  chatInput.value = "";
  setTimeout(() => addMsg("Conductor: Recibido 👍", "other"), 1000);
};
function addMsg(text, from) {
  const div = document.createElement("div");
  div.className = "msg " + from;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Pago
btnEfectivo.onclick = () => paymentMsg.innerText = "Has elegido pagar en efectivo 💵";
btnTransferencia.onclick = () => paymentMsg.innerText = "Has elegido pagar por transferencia 💳";
