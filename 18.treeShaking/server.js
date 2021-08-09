const express = require('express');

const app = express();

app.use(express.static('build', { maxAge: 1000 * 360 }));

app.listen(3000);
