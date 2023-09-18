import axios from 'axios';
import https from 'https';

export const POST = async (request) => {
  const { token, host } = await request.json();
  try {
    const agent = new https.Agent({ rejectUnauthorized: false });
    const config = {
      method: 'post',
      url: `https://${host}/MobilAppV2/configuracion/listarCasinos`,
      headers: {
        'Content-Type': 'application/json',
        token
      },
      httpsAgent: agent,
      agent: false,
      strictSSL: false,
    };
    const response = await axios(config);
    return new Response(JSON.stringify(response.data), { status: 201 });
  } catch (error) {
    console.log('error: ', error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
