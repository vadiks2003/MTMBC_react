import { useEffect, useState } from "react";
import { InputMode } from "./button";
import { UnicodeMapBin, UnicodeMapHEX } from "../../map/maps";

export function TranslatedOutput({encoded, rmText, mode}: {encoded: string, rmText: () => void, mode: InputMode})
{
    const [translated, setTranslated] = useState(""); 

    function translateText(text: string)
    {
        const bytesEncoded = text.split(" ");
        let DecodedStr = "";
        for(let letter of bytesEncoded)
        {
            //for now it parses whole message every single time the translated updates (every time spacebar added or removed)
            const decodedStr = (mode == InputMode.bin) ? UnicodeMapBin.get(letter) : UnicodeMapHEX.get(letter);
            //console.log(decodedStr);
            if(decodedStr == undefined) 
            {
                rmText();
                continue
            };
            if(decodedStr == "backspace")
            {
                DecodedStr = DecodedStr.slice(0, DecodedStr.length-1);
                console.log(DecodedStr);
                // quits current for loop iteration
                continue;
            }
            DecodedStr += decodedStr;
        }
        //DecodedStr = DecodedStr.slice(0, DecodedStr.length);
        setTranslated(DecodedStr);
    }

    useEffect(()=>
    {
        translateText(encoded);
    }, 
    [encoded]);
    

    return <pre>{translated}</pre>
}