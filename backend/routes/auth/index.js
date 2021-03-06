const router = require('express').Router();
const controller = require('../../controller/mysql');

router.post('/register', (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        res.status(409).json({
            error: "Username, password, nickname, phone required"
        })
    } else {
        controller.user.create(username, password)
            .then((result) => {
                res.json({
                    message: "register success"
                });
            })
            .catch((err) => {
                res.status(500).json({
                    error: err.message
                });
            })
    }
});

router.post('/login', (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        res.status(409).json({
            Error: "Username and password required"
        })
    } else {
        controller.user.login(username, password)
            .then((result) => {
                res.json({
                    token: result
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    error: err.message
                });
            })
    }
});
module.exports = router;