/*
      Created By: Aniket Biswas
      Github: https://github.com/thesmartaniket
      LinkedIn: https://www.linkedin.com/in/thesmartaniket/
*/

/*
        Description: An user schema of the mongodb data model [document].
*/

let UserModel = {
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

export default UserModel