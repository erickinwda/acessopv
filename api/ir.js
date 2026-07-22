const axios = require('axios');
const https = require('https');

const httpsAgent = new https.Agent({ family: 4, keepAlive: true });

module.exports = async (req, res) => {
    const PIXEL_ID = '958954899926961';
    const ACCESS_TOKEN = 'EAANf4CYqrWcBSPtcYWZCFPylAS4qdbClXCQX3ZAaWcLh3ZB6V2PJMtHdQlZC264vl886tKa0jjg9LnVJWoc4HIqY0yoZBd9Bwz6xpHXVVcvN0ctEq3eYkknZBhNXaaymZBKPxOzyhNkVQx5ZBzFS8BU8oYLmnNGMiqfFZBYFt80ZCuRepjx3IZBW67AkDg4CRZCPN99ZClwZDZD';
    const fbclid = req.query.fbclid || '';
    const urlCriptografada = req.query.dest || '';
    const requestUrl = `https://${req.headers.host || 'growthpro.sbs'}${req.url}`;
    let linkShopee = 'https://shopee.com.br';
    if (urlCriptografada) {
        try {
            linkShopee = Buffer.from(urlCriptografada, 'base64').toString('utf-8');
        } catch (e) {
            console.error('Error decoding link:', e.message);
        }
    }
    const clientIpAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const clientUserAgent = req.headers['user-agent'] || '';
    console.log('--- Request ---');
    console.log('URL recebida:', requestUrl);
    console.log('Destino decodificado:', linkShopee);
    console.log('fbclid:', fbclid || '(none)');
    console.log('IP:', clientIpAddress);
    console.log('User-Agent:', clientUserAgent);
    if (fbclid) {
        const eventPayload = {
            event_name: 'InitiateCheckout',
            event_time: Math.floor(Date.now() / 1000),
            action_source: 'website',
            event_source_url: requestUrl,
            test_event_code: 'TEST87796',
            user_data: {
                fbc: `fb.1.${Date.now()}.${fbclid}`,
                client_ip_address: clientIpAddress,
                client_user_agent: clientUserAgent
            }
        };
        console.log('--- Meta Payload (sem token) ---');
        console.log(JSON.stringify(eventPayload, null, 2));
        const graphUrl = `https://graph.facebook.com/v21.0/${PIXEL_ID}/events`;
        console.log('--- Teste de conectividade ---');
        try {
            const testRes = await axios.get('https://graph.facebook.com', { httpsAgent, timeout: 10000 });
            console.log('GET graph.facebook.com status:', testRes.status);
        } catch (testErr) {
            console.error('GET graph.facebook.com FAILED:', testErr.message);
            if (testErr.code) console.error('Erro code:', testErr.code);
        }
        console.log('URL completa do POST:', graphUrl);
        console.log('--- Enviando evento ---');
        try {
            const response = await axios.post(graphUrl, {
                data: [eventPayload],
                access_token: ACCESS_TOKEN
            }, { httpsAgent, timeout: 15000 });
            console.log('--- Meta Response ---');
            console.log('Status:', response.status);
            console.log('Body:', JSON.stringify(response.data, null, 2));
        } catch (err) {
            console.error('--- Meta Error ---');
            if (err.response) {
                console.error('Status:', err.response.status);
                console.error('Body:', JSON.stringify(err.response.data, null, 2));
            } else {
                console.error('Message:', err.message);
            }
        }
    } else {
        console.log('Sem fbclid — evento NÃO enviado para Meta.');
    }
    res.setHeader('Location', linkShopee);
    return res.status(302).end();
};
