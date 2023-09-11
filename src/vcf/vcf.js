/*
      Created By: Aniket Biswas
      Github: https://github.com/thesmartaniket
      LinkedIn: https://www.linkedin.com/in/thesmartaniket/
*/

//libaries
import { parseString } from "./vcardparser"

//Model
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

//actual Parser
export const vcfPraser = async (str) => {
    let result

    parseString(str, (err, json) => {
        if(err)
            throw err

        result = json
    })

    return result
}
