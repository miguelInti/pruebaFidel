import axios from 'axios';
import https from 'https';

export const POST = async (request) => {
    const { host, numeroDocumento, token, codigoCasino, serial, login } = await request.json();
    try {
        const agent = new https.Agent({ rejectUnauthorized: false });
        const data = {
            "nombreServicio": "reenviarClaveDinamica",
            "numeroDeParametros": "5",
            "parametros": [
                {
                    "nombreParametro": "codigoCasino",
                    "valorParametro": `${codigoCasino}`
                },
                {
                    "nombreParametro": "serial",
                    "valorParametro": `${serial}`
                },
                {
                    "nombreParametro": "login",
                    "valorParametro": `${login}`
                },
                {
                    "nombreParametro": "numeroDocumento",
                    "valorParametro": `${numeroDocumento}`
                },
                {
                    "nombreParametro": "accion",
                    "valorParametro": "Inicio de sesión"
                }
            ]
        };
        const config = {
            method: 'post',
            url: `https://${host}/MobilAppV2/fidelizacion/validarClaveDinamica`,
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
