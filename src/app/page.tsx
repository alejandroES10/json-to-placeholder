// "use client"

import Image from "next/image";
import { Form } from "@/components/form";
import { fromTextToDiccionary } from "@/utils/functions";
import { fillDictionary } from "@/utils/functions";
import { replacePlaceholders } from "@/utils/functions";

import person from "@/files/json/person.json";

export default function Home() {
  let text: string = "Hello my name is _name_, I have _age_ years old and I live in _city_";
  
  let keysFromText = fromTextToDiccionary(text);
  // console.log("Keys from text:", [...keysFromText.entries()]);
  
  let missingProperties = fillDictionary(keysFromText, person);
  
  //const filledText = replacePlaceholders(text, keysFromText);

  return (
    <>
      {missingProperties.length > 0 ? (
        <Form placeholderList={missingProperties} diccionaryToFill={keysFromText} text = {text}/>
        
      ) : (
        <p>{replacePlaceholders(text, keysFromText)}</p>
      )}
    </>
  );
}
