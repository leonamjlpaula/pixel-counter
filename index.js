const fs = require('fs');
const bmp = require("bmp-js");

const bmpBuffer = fs.readFileSync('fogo_v1.bmp');
const bmpData = bmp.decode(bmpBuffer);

const totalPixels = bmpData.data.length/4;

console.log('Pixels:', totalPixels);

const numberToHex = number => {
    const HEX = 16;    
    const s = Number(number).toString(HEX).toUpperCase()

    if(number < HEX)
        return  `0${s}`
    return s;
}

//Find all colors
const colors = [];
const groupedColors = [];
for (let i = 0; i < bmpData.data.length; i+=4) {               
    const color = `#${numberToHex(bmpData.data[i+3])}${numberToHex(bmpData.data[i+2])}${numberToHex(bmpData.data[i+1])}`;
    const index = colors.findIndex(item => item === color);

    groupedColors.push(color);
    if(index >= 0) continue;

    colors.push(color);
}

const amounts = [];

colors.forEach(color => {    
    const amount = groupedColors.reduce((acc, item) => {
        if(item === color)
            acc+=1
        
        return acc
    },0)
    amounts.push(amount);
    console.log(color, 'Amount: ', amount, ` -> ${(amount*100/totalPixels).toFixed(1)}%`, )
  }
)

const sum = amounts.reduce((acc, item) => acc+item, 0)
console.log('Total sum:', sum)