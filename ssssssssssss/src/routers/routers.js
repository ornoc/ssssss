//src/routers/routers.js
app.use('/', router.get('/', (req,res, next) => {
    res.status(200).send("<h1>API - CHAT</h1>");
}));

app.use("/",router.get("/sobre", (req, res, next) => {
    res.status(200).send({
        "nome":"API - CHAT",
        "versão": "0.1.0",
        "autor":"Cândido Farias"
    })
}));

module.exports = app;