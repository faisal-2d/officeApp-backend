const express = require('express');
const cors = require("cors");
const usersRouter = require('./routes/users');
const aqeedahRouter = require('./routes/aqeedah');
const arabicRouter = require('./routes/arabic');
const fiqhRouter = require('./routes/fiqh');
const seeratRouter = require('./routes/seerat');
const tafseerRouter = require('./routes/tafseer');
const duaRouter = require('./routes/dua');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/aqeedah', aqeedahRouter);
app.use('/arabic', arabicRouter);
app.use('/dua', duaRouter);
app.use('/fiqh', fiqhRouter);
app.use('/seerat', seeratRouter);
app.use('/tafseer', tafseerRouter);

app.get("/", (req, res) => {
    res.send("welcome to Al Haramain Islamic Academy");
    });

app.listen(port, () => {
    console.log(`*********************************`);
    console.log(`Server is running on port ${port}`);
});