/*
      Created By: Aniket Biswas
      Github: https://github.com/thesmartaniket
      LinkedIn: https://www.linkedin.com/in/thesmartaniket/
*/

/*
        Description: Communication model with api

        Type options in model :--
            1. getData - returns arrays of object
            2. getDataByCat - returns array of objects of give category : exp - 'o' for others, 'of' for office, 'f' for firends, 'ff' for family
            3. findNum - returns Obj if found else empty array[]
            4. findName - returns Obj if found else empty array[]
            5. saveData - saves data if new, else return errors like - email, number, name if any kind of data is already present
            6. deleteData - removes recieved obj
            7. getProflie - return the userProfile if present else returns an empty array[]
            8. signout - clear user data from server

        Only 1, 5, 6 & 8 types are being used as filtering and sorting are done in the client side.

*/ 

const Client = async (request) => {
    const response = await fetch(process.env.REACT_APP_SERVER_ADDRS, {
        method: 'POST',
        body: JSON.stringify(request),
        headers:{
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': process.env.REACT_APP_CLIENT_HOST_ADDRS
        }
    }, 8000)
        .catch((error) => {
            console.log(error)
            throw Error(error)
        })

        return await response.json()
}

export default Client
