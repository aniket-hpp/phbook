/*
      Created By: Aniket Biswas
      Github: https://github.com/thesmartaniket
      LinkedIn: https://www.linkedin.com/in/thesmartaniket/
*/

//function to check email using REGEX
const CheckEmail = (email) => {
    const res = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if(res.test(String(email).toLowerCase()))
        return true

    return false
}

export default CheckEmail