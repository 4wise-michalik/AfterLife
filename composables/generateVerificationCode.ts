export const generateVerificationCode = async () => {
    const generatedCode = (Math.floor(Math.random()*(899999)) + 100000).toString()
    return generatedCode
}