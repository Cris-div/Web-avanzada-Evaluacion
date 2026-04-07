const fs = require('fs');
const axios = require('axios');

const FILE = 'data/data.json'; 
// leer datos
const readData = () => {
    return JSON.parse(fs.readFileSync(FILE));
};

// guardar datos
const writeData = (data) => {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
};

// GET /items
exports.getItems = (req, res) => {
    const data = readData();
    res.json(data);
};

// GET /items/:id
exports.getItemById = (req, res) => {
    const data = readData();
    const item = data.find(i => i.id == req.params.id);

    if (!item) {
        return res.status(404).json({ error: "No encontrado" });
    }

    res.json(item);
};

// POST /items
exports.createItem = (req, res) => {
    const { nombre, descripcion } = req.body;

    if (!nombre || !descripcion) {
        return res.status(400).json({ error: "Datos inválidos" });
    }

    const data = readData();

    const newItem = {
        id: Date.now(),
        nombre,
        descripcion
    };

    data.push(newItem);
    writeData(data);

    res.status(201).json(newItem);
};

// PUT /items/:id
exports.updateItem = (req, res) => {
    const { nombre, descripcion } = req.body;
    const data = readData();

    const index = data.findIndex(i => i.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: "No encontrado" });
    }

    if (!nombre || !descripcion) {
        return res.status(400).json({ error: "Datos inválidos" });
    }

    data[index] = { ...data[index], nombre, descripcion };
    writeData(data);

    res.json(data[index]);
};

// DELETE /items/:id
exports.deleteItem = (req, res) => {
    const data = readData();
    const newData = data.filter(i => i.id != req.params.id);

    if (data.length === newData.length) {
        return res.status(404).json({ error: "No encontrado" });
    }

    writeData(newData);
    res.json({ mensaje: "Eliminado" });
};

// 🌐 GET /usuarios
exports.getUsuarios = async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        let usuarios = response.data;

        // FILTRAR por ciudad
        if (req.query.city) {
            usuarios = usuarios.filter(u =>
                u.address.city.toLowerCase() === req.query.city.toLowerCase()
            );
        }

        // TRANSFORMAR datos
        const resultado = usuarios.map(u => ({
            nombre: u.name,
            email: u.email
        }));

        res.json(resultado);

    } catch (error) {
        res.status(500).json({ error: "Error en API externa" });
    }
};