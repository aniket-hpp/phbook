//getData - returns arrays of object
//getDataByCat - returns array of objects of give category : exp - 'o' for others, 'of' for office, 'f' for firends, 'ff' for family
//findNum - returns Obj if found else empty array[]
//findName - returns Obj if found else empty array[]
//saveData - saves data if new, else return errors like - email, number, name if any kind of data is already present
//deleteData - removes recieved obj
//getProflie - return the userProfile if present else returns an empty array[]
//signout - clear user data from server

const ClientModel = {
    type: String,
    uid: String,
    custom: {[String]: String},
    data : {
        name: String,
        num: Number,
        email: {
            required: true,
            lowercase: true
        },
        cat: String,
        isWp: Boolean,
        isProfile : Boolean,
        plan: Number
    }
}

export default ClientModel