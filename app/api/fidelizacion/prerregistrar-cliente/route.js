import axios from 'axios';
import https from 'https';

export const POST = async (request) => {
    const { codigoCasino, login, celular, token, serial, idTipoIdentificacion, identificacion, host, } = await request.json();
    try {
        const agent = new https.Agent({ rejectUnauthorized: false });
        const data = {
            "nombreServicio": "prerregistrarCliente",
            "numeroDeParametros": "6",
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
                    "nombreParametro": "idTipoIdentificacion",
                    "valorParametro": `${idTipoIdentificacion}`
                },
                {
                    "nombreParametro": "identificacion",
                    "valorParametro": `${identificacion}`
                },
                {
                    "nombreParametro": "celular",
                    "valorParametro": `${celular}`
                }
            ]
        };
        const config = {
            method: 'post',
            url: `https://${host}/MobilAppV2/fidelizacion/prerregistrarCliente`,
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
