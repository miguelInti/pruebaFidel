import axios from 'axios';
import https from 'https';

export const POST = async (request) => {
    const {host, numeroDocumento, serial, codigoCasino} = await request.json();
    try {
        const agent = https.Agent({rejectUnauthorized: false})
        const data = {
            "nombreServicio": "visualizarPuntosBarXDia",
            "numeroDeParametros": "4",
            "parametros": [
                {
                    "nombreParametro": "numeroDocumento",
                    "valorParametro": `${numeroDocumento}`
                },
                {
                    "nombreParametro": "serial",
                    "valorParametro": `${serial}`
                },
                {
                    "nombreParametro": "tipoDispositivo",
                    "valorParametro": "MOVIL"
                },
                {
                    "nombreParametro": "codigoCasino",
                    "valorParametro": `${codigoCasino}`
                }
            ]
        }
        const config = {
            method: 'post',
            url: `https://${host}/MobilAppV2/bar/visualizarPuntosBarXDia`,
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