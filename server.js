const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// In-memory backend store
const namesList = [];

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/save-name', (req, res) => {
    const { name } = req.body;
    if (name) {
        namesList.push(name);
        console.log(`Saved name to backend: ${name}`);
        res.json({ success: true, message: `hello ${name}, welcome` });
    } else {
        res.status(400).json({ success: false, message: 'Name is required' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
