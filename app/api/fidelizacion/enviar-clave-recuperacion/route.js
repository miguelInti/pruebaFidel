import axios from 'axios';
import https from 'https';

export const POST = async (request) => {
    const { host, numeroDocumento, token } = await request.json();
    try {
        const agent = new https.Agent({ rejectUnauthorized: false });
        const data = {
            "nombreServicio": "reenviarClaveDinamica",
            "numeroDeParametros": "4",
            "parametros": [
                {
                    "nombreParametro": "codigoCasino",
                    "valorParametro": "01"
                },
                {
                    "nombreParametro": "serial",
                    "valorParametro": "237709"
                },
                {
                    "nombreParametro": "login",
                    "valorParametro": "admin-ies"
                },
                {
                    "nombreParametro": "numeroDocumento",
                    "valorParametro": `${numeroDocumento}`
                }
            ]
        };
        const config = {
            method: 'post',
            url: `https://${host}/MobilAppV2/fidelizacion/enviarClaveRecuperacion`,
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
        return new Response(JSON.stringify(response.data), { status: 201 });
    } catch (error) {
        console.log('error: ', error);
        return new Response(JSON.stringify(error), { status: 500 });
    }
};
