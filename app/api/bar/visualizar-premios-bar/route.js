import axios from 'axios';
import https from 'https';

export const POST = async (request) => {
    const {host, codigoCasino, token} = await request.json();
    try {
        const agent = https.Agent({rejectUnauthorized: false})
        const data = {
            "nombreServicio": "visualizarPremiosBar",
            "numeroDeParametros": "2",
            "parametros": [
                {
                    "nombreParametro": "codigoCasino",
                    "valorParametro": `${codigoCasino}`
                },
                {
                    "nombreParametro": "cargaTodo",
                    "valorParametro": "si"
                }
            ]
        }
        const config = {
            method: 'post',
            url: `https://${host}/MobilAppV2/bar/visualizarPremiosBar`,
            headers: {
                'Content-Type': 'application/json',
                token
            },
            httpsAgent: agent,
            agent: false,
            strictSSL: false,
            data
        };
        const response = await axios(config);
        return new Response(JSON.stringify(response.data), {status: 201});
    
    } catch (error) {
        console.log('error: ', error);
        return new Response(JSON.stringify(error), {status: 500});
    }
};