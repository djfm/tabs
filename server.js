import 'babel-polyfill';
import express from 'express';
import {join} from 'path';

const app = express();

app.use(express.static(join(__dirname, 'build', 'public')));

app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'build', 'public', 'index.html'));
});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Up'n runnin' on port ${server.address().port} yo!`);
});
