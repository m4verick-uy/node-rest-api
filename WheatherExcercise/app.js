import express from 'express';
import fetch from 'node-fetch';
const app = express();
const PORT = process.env.PORT || 3000;
const ACCUWEATHER_API_KEY = 'P74AgzG6gMnuVaGVsBR2lOcG0AkabiNY';

app.use(express.json());

app.post('/clima', async (req, res) => {
    const { ubicacion } = req.body;

    if (!ubicacion) {
        return res.status(400).json({ error: 'Se requiere una ubicación' });
    }

    try {
        const clima = await obtenerClima(ubicacion);
        res.json(clima);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el clima' });
    }
});

async function obtenerClima(ubicacion) {
    const url = `http://dataservice.accuweather.com/locations/v1/cities/search`;
    const params = `?apikey=${ACCUWEATHER_API_KEY}&q=${ubicacion}`;

    const response = await fetch(url + params);
    const data = await response.json();

    if (data.length === 0) {
        throw new Error('Ubicación no encontrada');
    }

    const ciudadKey = data[0].Key;

    const climaResponse = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${ciudadKey}?apikey=${ACCUWEATHER_API_KEY}`);
    const climaData = await climaResponse.json();

    const clima = {
        ubicacion: data[0].LocalizedName,
        temperatura: climaData[0].Temperature.Metric.Value,
        descripcion: climaData[0].WeatherText
    };

    return clima;
}

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
