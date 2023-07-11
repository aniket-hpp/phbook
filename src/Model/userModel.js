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