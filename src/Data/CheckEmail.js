const CheckEmail = (email) => {
    const res = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if(res.test(String(email).toLowerCase()))
        return true

    return false
}

export default CheckEmail