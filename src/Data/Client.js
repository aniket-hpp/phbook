//getData - returns arrays of object
//getDataByCat - returns array of objects of give category : exp - 'o' for others, 'of' for office, 'f' for firends, 'ff' for family
//findNum - returns Obj if found else empty array[]
//findName - returns Obj if found else empty array[]
//saveData - saves data if new, else return errors like - email, number, name if any kind of data is already present
//deleteData - removes recieved obj
//getProflie - return the userProfile if present else returns an empty array[]
//signout - clear user data from server

const Client = async (request) => {
    const response = await fetch('https://server-phonebook.vercel.app/database', {
        method: 'POST',
        body: JSON.stringify(request),
        headers:{
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin':'http://localhost:3000/'
        }
    }, 8000)
        .catch((error) => {
            console.log(error)
            throw Error(error)
        })

        return await response.json()
}

export default Client