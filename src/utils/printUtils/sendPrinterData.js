import { getTodayFormatted } from '../helperUtils'

// Template horizontal space: 32 char
// Item description space: 17 char
const ITEM_DESC_SPACE = 17
// Count space: 5 char
const COUNT_SPACE = 5
// Unit space: 5 char
const UNIT_SPACE = 5
// Price spance: 5 char
const PRICE_SPACE = 5

const BLANK_FILL = ' '
const DIVIDER = '--------------------------------'
const FOOTER = 'Billed Amount: '
const START_BUFFER = BLANK_FILL.repeat(32 * 2)
const END_BUFFER = BLANK_FILL.repeat(32 * 6)

const PRINT_WRITE_VALUE_LIMIT = 512;

const printTemplateHead =
  '      THE PSEUDO ENGINEERS      ' +
  '101 & 101/2 Feeder Rd, Belgharia' +
  'Kolkata 700056                  ' +
  'Ph: 9330038609/9062786568       ' +
  `Date: ${getTodayFormatted()}                  ` +
  DIVIDER +
  'Item             Ct.  Ut.  Price' +
  DIVIDER;
  // '{ITEMDESCRIPTION}{CNT}{UNT}{PRC}';

let index = 0;
let image = document.querySelector('#the_engineers_logo');
// Use the canvas to get image data
let canvas = document.createElement('canvas');
let context = canvas.getContext("2d");

const updateBill = (data) => {
  let printStream = '';
  let totalAmount = 0;
  Object.keys(data).map(cat => {
    if(!data[cat]) {
      alert("There's a problem in order structure");
      return;
    }
    Object.keys(data[cat]).map(item => {
      if(!data[cat][item]
        || !data[cat][item].count
        || !data[cat][item].unit
        || !data[cat][item].price
      ) {
        return;
      }
      totalAmount += Number(data[cat][item].price)
      let count = String(data[cat][item].count)
      let unit = String(data[cat][item].unit)
      let price = String(data[cat][item].price)
      console.log(count);
      console.log(unit);
      console.log(price);
      if(item.length > ITEM_DESC_SPACE) {
        printStream += item.substring(0, ITEM_DESC_SPACE) +
          BLANK_FILL.repeat(COUNT_SPACE + UNIT_SPACE + PRICE_SPACE)
        const nextLine = item.substring(ITEM_DESC_SPACE, 2*ITEM_DESC_SPACE)
        printStream += nextLine + BLANK_FILL.repeat(ITEM_DESC_SPACE - nextLine.length)
        printStream += count + BLANK_FILL.repeat(COUNT_SPACE - count.length)
        printStream += unit + BLANK_FILL.repeat(UNIT_SPACE - unit.length)
        printStream += price + BLANK_FILL.repeat(PRICE_SPACE - price.length)
      }
      else {
        printStream += item + BLANK_FILL.repeat(ITEM_DESC_SPACE - item.length)
        printStream += count + BLANK_FILL.repeat(COUNT_SPACE - count.length)
        printStream += unit + BLANK_FILL.repeat(UNIT_SPACE - unit.length)
        printStream += price + BLANK_FILL.repeat(PRICE_SPACE - price.length)
      }
    })
  })
  printStream += DIVIDER;
  printStream += FOOTER + String(totalAmount) +
    BLANK_FILL.repeat(32 - FOOTER.length - String(totalAmount).length);
  return START_BUFFER + printTemplateHead + printStream + END_BUFFER;
}

const getDarkPixel = (imageData, x, y) => {
  // Return the pixels that will be printed black
  let red = imageData[((canvas.width * y) + x) * 4];
  let green = imageData[((canvas.width * y) + x) * 4 + 1];
  let blue = imageData[((canvas.width * y) + x) * 4 + 2];
  return (red + green + blue) > 0 ? 1 : 0;
}

const getImagePrintData = () => {
  // Canvas dimensions need to be a multiple of 40 for this printer
  canvas.width = 600;
  canvas.height = 150;
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  let imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
  console.log(imageData);

  if (imageData == null) {
    console.log('No image to print!');
    return new Uint8Array([]);
  }
  // Each 8 pixels in a row is represented by a byte
  let printData = new Uint8Array(canvas.width / 8 * canvas.height + 8);
  let offset = 0;
  // Set the header bytes for printing the image
  printData[0] = 29;  // Print raster bitmap
  printData[1] = 118; // Print raster bitmap
  printData[2] = 48; // Print raster bitmap
  printData[3] = 0;  // Normal 203.2 DPI
  printData[4] = canvas.width / 8; // Number of horizontal data bits (LSB)
  printData[5] = 0; // Number of horizontal data bits (MSB)
  printData[6] = canvas.height % 32; // Number of vertical data bits (LSB)
  printData[7] = canvas.height / 32;  // Number of vertical data bits (MSB)
  offset = 7;
  // Loop through image rows in bytes
  for (let i = 0; i < canvas.height; ++i) {
    for (let k = 0; k < canvas.width / 8; ++k) {
      let k8 = k * 8;
      //  Pixel to bit position mapping
      printData[++offset] = getDarkPixel(imageData, k8 + 0, i) * 128 + getDarkPixel(imageData, k8 + 1, i) * 64 +
                  getDarkPixel(imageData, k8 + 2, i) * 32 + getDarkPixel(imageData, k8 + 3, i) * 16 +
                  getDarkPixel(imageData, k8 + 4, i) * 8 + getDarkPixel(imageData, k8 + 5, i) * 4 +
                  getDarkPixel(imageData, k8 + 6, i) * 2 + getDarkPixel(imageData, k8 + 7, i);
    }
  }
  return printData;
}

const sendNextImageDataBatch = (data, resolve, reject, printCharacteristic) => {
  // Can only write 512 bytes at a time to the characteristic
  // Need to send the image data in 512 byte batches
  if (index + 512 < data.length) {
    printCharacteristic.writeValue(data.slice(index, index + 512)).then(() => {
      index += 512;
      sendNextImageDataBatch(data, resolve, reject, printCharacteristic);
    })
    .catch(error => reject(error));
  } else {
    // Send the last bytes
    if (index < data.length) {
      printCharacteristic.writeValue(data.slice(index, data.length)).then(() => {
        resolve();
      })
      .catch(error => reject(error));
    } else {
      resolve();
    }
  }
}

const sendImageData = async (printCharacteristic) => {
  index = 0;
  const printStream = getImagePrintData();
  // console.log(printStream);
  // for(let i = 0; i < printStream.length; i += PRINT_WRITE_VALUE_LIMIT) {
  //   console.log(printStream.slice(i, i+PRINT_WRITE_VALUE_LIMIT));
  //   await printCharacteristic.writeValueWithoutResponse(printStream.slice(i, i+PRINT_WRITE_VALUE_LIMIT))
  // }
  return new Promise(function(resolve, reject) {
    sendNextImageDataBatch(printStream, resolve, reject, printCharacteristic);
  });
}

async function sendTextData(data, printCharacteristic) {
  const printStream = updateBill(data);
  console.log(printStream);
  // Get the bytes for the text
  let encoder = new TextEncoder("utf-8");
  // Add line feed + carriage return chars to text
  let text = encoder.encode(printStream + '\u000A\u000D');
  for(let i = 0; i < text.length; i += PRINT_WRITE_VALUE_LIMIT) {
    console.log(text.slice(i, i+PRINT_WRITE_VALUE_LIMIT));
    await printCharacteristic.writeValueWithoutResponse(text.slice(i, i+PRINT_WRITE_VALUE_LIMIT))
  }
}

const sendPrinterData = (data, printCharacteristic) => {
  // const somedata = {
  //   Appetizers: {
  //     "BBQ Lollipop": {
  //       count: 3,
  //       unit: 200,
  //       price: 600
  //     },
  //     "Honey Mustard Sandwich": {
  //       count: 1,
  //       unit: 180,
  //       price: 180
  //     }
  //   },
  //   "Caffine": {
  //     "Normal Coffee": {
  //       count: 4,
  //       unit: 50,
  //       price: 200
  //     }
  //   }
  // }
  sendTextData(data, printCharacteristic);
  // Print an image followed by the text
  // sendImageData(printCharacteristic)
  // .then(sendTextData(somedata, printCharacteristic))
  // .then(() => {
  //   progress.hidden = true;
  // })
  // .catch(handleError);
}

export default sendPrinterData;