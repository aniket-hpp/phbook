import { parseString } from "./vcardparser"

export const vcfModel = {
    begin: 'VCARD',
    version: '',
    prodid: '',
    n: { last: '', first: '', middle: '', prefix: '', suffix: '' },
    fn: '',
    tel: [{value: '' }],
    rev: '',
    end: 'VCARD'
}

export const vcfPraser = async (str) => {
    let result

    parseString(str, (err, json) => {
        if(err)
            throw err

        result = json
    })

    return result
}
