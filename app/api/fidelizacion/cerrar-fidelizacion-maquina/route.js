import axios from 'axios';
import https from 'https';

export const POST = async (request) => {
    const { token, serial, host, numeroDocumento} = await request.json();
    try {
        const agent = new https.Agent({ rejectUnauthorized: false });
        const data = {
            "nombreServicio": "cerrarFidelizacionMaquina",
            "numeroDeParametros": "3",
            "parametros": [
                {
                    "nombreParametro": "serial",
                    "valorParametro": `${serial}`
                },
                {
                    "nombreParametro": "numeroDocumento",
                    "valorParametro": `${numeroDocumento}`
                },
                {
                    "nombreParametro": "tipoDispositivo",
                    "valorParametro": "MOVIL"
                }
            ]
        };
        const config = {
            method: 'post',
            url: `https://${host}/MobilAppV2/fidelizacion/cerrarFidelizacionMaquina`,
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
