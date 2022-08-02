const router = require("express").Router();

router.get("/", (req, res) => {
    console.log(req.body);
    res.end();
});

module.exports = router;
