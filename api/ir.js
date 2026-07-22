const axios = require('axios');
module.exports = async (req, res) => {
    const PIXEL_ID = '958954899926961'; 
    const ACCESS_TOKEN = 'EAANf4CYqrWcBSPtcYWZCFPylAS4qdbClXCQX3ZAaWcLh3ZB6V2PJMtHdQlZC264vl886tKa0jjg9LnVJWoc4HIqY0yoZBd9Bwz6xpHXVVcvN0ctEq3eYkknZBhNXaaymZBKPxOzyhNkVQx5ZBzFS8BU8oYLmnNGMiqfFZBYFt80ZCuRepjx3IZBW67AkDg4CRZCPN99ZClwZDZD';
    const fbclid = req.query.fbclid || '';
    const urlCriptografada = req.query.dest || '';
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
    if (fbclid) {
        try {
            axios.post(`https://graph.facebook.com/v21.0/${PIXEL_ID}/events`, {
                data: [{
                    event_name: 'InitiateCheckout',
                    event_time: Math.floor(Date.now() / 1000),
                    action_source: 'website',
                    test_event_code: 'TEST87796',
                    user_data: {
                        fbc: `fb.1.${Math.floor(Date.now() / 1000)}.${fbclid}`,
                        client_ip_address: clientIpAddress,
                        client_user_agent: clientUserAgent
                    }
                }],
                access_token: ACCESS_TOKEN
            }).catch(err => console.error('Meta API Error:', err.message));
        } catch (globalError) {
            console.error('Error executing event:', globalError.message);
        }
    }
    res.setHeader('Location', linkShopee);
    return res.status(302).end();
};
