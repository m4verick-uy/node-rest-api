const express = require('express');
const app = express();
const personController = require('./controllers/PersonController');

app.use(express.json());

app.use('/api', personController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
