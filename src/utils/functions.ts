

//returns a dictionary where the keys are extracted from the text it receives
export  function fromTextToDiccionary(text: string):Map<string, any>{
    const map = new Map<string, any>();
    const keys: string[] = getKeysFromText(text,"_", "_")

    console.log(keys)

    for (let key of keys) {
        const trimmedKey = key.trim(); 
        if (trimmedKey !== "") { 
            map.set(trimmedKey, ""); 
        }
    }

    return map
}


//extract keys that are between two indicators
function getKeysFromText(input: string, start: string, end: string): string[] {
    const escapedStart = start.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const escapedEnd = end.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    
    const regex = new RegExp(`${escapedStart}(.*?)${escapedEnd}`, 'g');
    const results: string[] = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(input)) !== null) {
        results.push(match[1].trim()); 
    }
    console.log(end)
    return results;
}

//fill dictionary values
export function fillDictionary(dictionaryToFill: Map<string, any>, data: Record<string, any>): string[] {
    let missing: string[] = [];

    for (const [key, _] of dictionaryToFill) {
        
        if (key in data) {
            dictionaryToFill.set(key, data[key]);
        } else {
            
            missing.push(key);
        }
    }

    return missing;
}


//replace placeholder values ​​in the text
export function replacePlaceholders(text: string, dictionary: Map<string, any>): string {
    const regex = /_(\w+)_/g;

    return text.replace(regex, (match, key) => {

        const value = dictionary.get(key);

        return value !== undefined ? String(value) : match;
    });
}