/*
      Created By: Aniket Biswas
      Github: https://github.com/thesmartaniket
      LinkedIn: https://www.linkedin.com/in/thesmartaniket/
*/

//function to filter userDatas based on passed key and value
const Filter = (Data, key, value) => {
    return Data.filter(function(object){
        switch(key){
            case 'name':{
                if(object.name.includes(value)){
                    return true
                }

                return false
            }
                
            case 'num':{
                if(String(object.num).includes(value)){
                    return true
                }else{
                    return false
                }
            }

            case 'isProfile':{
                if(object.isProfile === value){
                    return true
                }

                return false
            }

            case 'email':{
                if(object.email.includes(value)){
                    return true
                }

                return false
            }

            case 'cat':{
                if(object.cat.includes(value) && !object.isProfile){
                    return true
                }

                return false
            }
                
            default:
                return false
        }
    })
}

export default Filter