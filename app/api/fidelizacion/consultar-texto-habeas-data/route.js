import axios from 'axios';
import https from 'https';

export const POST = async (request) => {
    const token = JSON.parse(request.cookies.get('token').value);
    const authConfig = request.cookies.get('authConfig');
    const configData = JSON.parse(authConfig.value);
    const host = configData.host;

    try {
        const agent = new https.Agent({ rejectUnauthorized: false });
        const axiosConfig = {
            method: 'GET',
            url: `https://${host}/MobilAppV2/fidelizacion/consultarTextoHabeasData`,
            headers: {
                'Content-Type': 'application/json',
                token: `${token}`,
            },
            httpsAgent: agent,
            agent: false,
            strictSSL: false,
        };
        const response = await axios(axiosConfig);
        return new Response(JSON.stringify(response.data), { status: 201 });
    } catch (error) {
        console.log('error: ', error);
        return new Response(JSON.stringify(error), { status: 500 });
    }
};
