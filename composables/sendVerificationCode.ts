import axios from 'axios';

export const sendVerificationCode = async (email, generatedCode) => {
    try {
        const response = await axios.post('/api/sendMail', {
            email: email,
            code: generatedCode
        });
    
    } catch (error) {
        console.error('Error sending email:', error);
    }
}