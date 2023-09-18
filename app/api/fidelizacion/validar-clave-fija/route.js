import axios from 'axios';
import https from 'https';

export const POST = async (request) => {
    const { host, numeroDocumento, clave, token  } = await request.json();
    try {
        const agent = new https.Agent({ rejectUnauthorized: false });
        const data = {
            "nombreServicio": "validarClaveFija",
            "numeroDeParametros": "3",
            "parametros": [
                {
                    "nombreParametro": "numeroDocumento",
                    "valorParametro": `${numeroDocumento}`
                },
                {
                    "nombreParametro": "tipoDispositivo",
                    "valorParametro": "MOVIL"
                },
                {
                    "nombreParametro": "clave",
                    "valorParametro": `${clave}`
                }
            ]
        };
        const config = {
            method: 'post',
            url: `https://${host}/MobilAppV2/fidelizacion/validarClaveFija`,
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
