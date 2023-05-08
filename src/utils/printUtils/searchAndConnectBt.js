// import store from "../../store/index"
// import { setToken } from "../../store/slice/sessionSlice";
import sendPrinterData from "./sendPrinterData"

const PRINT_SERVICE_UUID = '000018f0-0000-1000-8000-00805f9b34fb';
const PRINT_CHARACTERISTIC_UUID = '00002af1-0000-1000-8000-00805f9b34fb';

const searchAndConnectBt = (details) => {
  // const state = store.getState();
  // if (state.session.printCharacteristic == null) {
    navigator.bluetooth.requestDevice({
      filters: [{
        services: [PRINT_SERVICE_UUID]
      }]
    })
    .then(device => {
      console.log('> Found ' + device.name);
      console.log('Connecting to GATT Server...');
      return device.gatt.connect();
    })
    .then(server => server.getPrimaryService(PRINT_SERVICE_UUID))
    .then(service => service.getCharacteristic(PRINT_CHARACTERISTIC_UUID))
    .then(characteristic => {
      // Cache the characteristic
      // const printCharacteristic = characteristic;
      // store.dispatch(setToken(characteristic));
      sendPrinterData(details, characteristic);
    })
    .catch(err => console.log(err));
  // } else {
  //   sendPrinterData();
  // }
}

export default searchAndConnectBt;