const crypto = require('crypto');
module.exports = function checkAuthorization(req, res, next) {
    const hash = crypto.createHash('sha512');
    const apiKey = req.headers.apiKey || req.headers.apikey ||
        req.headers.ApiKey || req.headers.APIKey || '';
    if (crypto.timingSafeEqual(
    hash.copy().update(apiKey).digest(),
    hash.copy().update(process.env.EXPECTED_API_KEY).digest()
    )) {
        next();
    } else {
        res.status(401).json({
            status: 'Unauthorized',
            apiKey: "Invalid"
        });
    }
}