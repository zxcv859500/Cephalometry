const router = require('express').Router();
const auth = require('./auth');

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.use('/auth', auth);

module.exports = router;