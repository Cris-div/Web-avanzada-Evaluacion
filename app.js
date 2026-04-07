const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const routes = require('./routes/items.routes');
app.use('/', routes);

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
app.get('/', (req, res) => {
    res.send("API funcionando 🚀");
});
