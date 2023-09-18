import axios from 'axios';
import https from 'https';

export const POST = async (request) => {
    const {host, nombreUsuario, estado, idsolicitud} = await request.json();
    try {
        const agent = new https.Agent({rejectUnauthorized: false})
        const data = {
            "nombreServicio": "estadoSolicitud",
            "numeroDeParametros": "3",
            "parametros": [
                {
                    "nombreParametro":"nombreUsuario",
                    "valorParametro": `${nombreUsuario}`
                },
                {
                    "nombreParametro":"estado",
                    "valorParametro": `${estado}`
                },
                {
                    "nombreParametro":"idsolicitud",
                    "valorParametro": `${idsolicitud}`
                }
            ]    
        }
        const config = {
            method: 'post',
            url: `https//${host}/MobilAppV2/soporte/estadoSolicitud`,
            headers: {
                httpsAgent: agent,
                agent: false,
                strictSSL: false,
                data
            }
        };
        const response = await axios(config);
        return new Response(JSON.stringify(response.data), {status: 201});
    } catch (error) {
        console.log('error: ', error);
        return new Response(JSON.stringify(error), {status: 500})

    }
};