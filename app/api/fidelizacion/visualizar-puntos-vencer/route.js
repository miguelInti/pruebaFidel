import axios from 'axios';
import https from 'https';

export const POST = async (request) => {
    const { host, numeroDocumento, codigoCasino, token, serial, intervalos } = await request.json();
    try {
        const agent = new https.Agent({ rejectUnauthorized: false });
        const data = {
            "nombreServicio":"visualizarPuntosVencer",
            "numeroDeParametros":"5",
            "parametros":[
                {
                    "nombreParametro":"serial",
                    "valorParametro": `${serial}`
                },
                {
                    "nombreParametro":"numeroDocumento",
                    "valorParametro": `${numeroDocumento}`
                },
                {
                    "nombreParametro":"tipoDispositivo",
                    "valorParametro":"MOVIL"
                },
                {
                    "nombreParametro":"codigoCasino",
                    "valorParametro": `${codigoCasino}`
                },
                {
                    "nombreParametro":"intervalos",
                    "valorParametro": `${intervalos}`
                },
            ]
        };
        const config = {
            method: 'post',
            url: `https://${host}/MobilAppV2/fidelizacion/visualizarPuntosVencer`,
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
