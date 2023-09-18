import axios from 'axios';
import https from 'https';

export const POST = async (request) => {
    const {host, numeroDocumento, serial, idPeticion, token, cantidad} = await request.json();
    try {
        const agent = https.Agent({rejectUnauthorized: false})
        const data = {
            "nombreServicio": "realizarPeticion",
            "numeroDeParametros": "4",
            "parametros": [
                {
                    "nombreParametro": "numeroDocumento",
                    "valorParametro": numeroDocumento ? numeroDocumento + "" : null
                },
                {
                    "nombreParametro": "serial",
                    "valorParametro": `${serial}`
                },
                {
                    "nombreParametro": "idPeticion",
                    "valorParametro": `${idPeticion}`
                },
                {
                    "nombreParametro": "cantidad",
                    "valorParametro": `${cantidad}`
                },
            ]
        }
        const config = {
            method: 'post',
            url: `https://${host}/MobilAppV2/bar/realizarPeticion`,
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