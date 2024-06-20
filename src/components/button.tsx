import { useEffect, useState } from "react"
import { TranslatedOutput } from "./translated";

export enum InputMode
{
    bin,
    HEX
}

export function Button()
{
    // text, no spaces
    const [text, setText] = useState("");
    // display text, with spaces
    const [displayText, setDisplayText] = useState("");

    const [mode, setMode] = useState(InputMode.bin);

    const [savedbinInput, setsavedBinInput] = useState("");
    const [savedHEXInput, setsavedHEXInput] = useState("");

    // translate on 8 letters sent, not on new spacebar set (in past its used to be part of addOne/addZero function which caused it to translate AFTER next letter is started being written)
    useEffect(()=>
    {
        // add spacebars each 8 in display text (i know it is unoptimized, i tried optimizing it and came up with overly complex algorithm that didn't work right no matter how much i tried)
        let slText = "";
        const encodedSize = (mode == InputMode.bin) ? 8 : 2;
        for(let i = 0; i < Math.ceil(text.length / encodedSize) * encodedSize; i += encodedSize)
        {
            const chunk = text.slice(i, i + encodedSize);

            slText += chunk;
            if(i <= ((text.length/encodedSize)-1)*encodedSize) slText += " ";
        }
        setDisplayText(slText);
    },
    [text]);

    function removeLast()
    {
        if(text.length <= 0) return;
        let newText = "";
        if(text[text.length-1] == " ")
        {
            // cut last letter together with spacebar
            newText = text.slice(0, text.length-2);
        }
        else
        {
            newText = text.slice(0, text.length-1);
        }
        setText(newText);
    }
    function removeLastCombo()
    {
        const amt = (mode == InputMode.bin) ? 8 : 2;
        if(text.length % amt == 0) setText(text.slice(0, text.length-amt));
    }

    function addOne()
    {
        setText(text + "1");
    }

    function addZero()
    {
        setText(text + "0");
    }

    function clean()
    {
        setText("");
    }

    function setModeBin()
    {
        setsavedHEXInput(text);
        clean();
        setMode(InputMode.bin);
        (savedbinInput != "") ? setText(savedbinInput) : {};
    }
    function setModeHEX()
    {
        setsavedBinInput(text);
        clean();
        setMode(InputMode.HEX);
        (savedHEXInput != "") ? setText(savedHEXInput) : {};
    }
    const HEXes = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    const HEXButtonItems = HEXes.map((name) =>(
        <button key={name} onClick={()=>setText(text + name)} >
            {name}
        </button>
    ));

    return <>
        <button onClick={setModeBin}>Set Binary mode</button>
        <button onClick={setModeHEX}>Set HEX mode</button>
        <br/>
        {
        (mode == InputMode.bin) ? 
        <>
            <button onClick={addZero}>0</button>
            <button onClick={addOne}>1</button>
        </> : 
        <>
            {HEXButtonItems}
        </>
        }
        <br/>
        <button onClick={removeLast}>rm</button>
        <button onClick={clean}>clean</button>
        <p>{displayText}</p>
        <TranslatedOutput encoded={displayText} rmText={removeLastCombo} mode={mode}/>
    </>
}