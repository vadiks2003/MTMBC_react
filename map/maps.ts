function numberToBin(number: number)
{
    if(number >= 256) return;
    let a = [0,0,0,0,0,0,0,0];
    for(let i = 0, k = 128; i < 8; i++, k /= 2)
    {
        if(number / k >= 1)
        {
            a[i] = 1;
            number = number - k;
        }
    }
    return a.join("");
}

function numberToHex(number: number)
{
    if(number >= 256) return;
    const hexes = "0123456789ABCDEF";
    let a = ["0","0"];
    if(number >= 16)
    {
        const tenths = Math.floor(number / 16);
        a[0] = hexes[tenths];
        number = number - (tenths*16);
    }
    a[1] = hexes[number];
    return a.join("");
}

let WholeUnicodeItems = ` !"#$%&'()*+,"./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_'abcdefghijklmnopqrstuvwxyz{|}~`
let KeyToItems = new Map(); 
KeyToItems.set(8, "backspace");
for(let i = 0; i < WholeUnicodeItems.length; i++)
{
    KeyToItems.set(i+32, WholeUnicodeItems[i]);
}

export const UnicodeMapHEX = new Map();
KeyToItems.forEach((value, key) => {
    UnicodeMapHEX.set(numberToHex(key), value);
});
// important, prevents deletion on each translation
UnicodeMapHEX.set("", "");

export const UnicodeMapBin = new Map();
KeyToItems.forEach((value, key) =>{
    UnicodeMapBin.set(numberToBin(key), value)
})
UnicodeMapBin.set("", "");