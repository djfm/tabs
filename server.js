import "babel-polyfill";
import express from "express";
import {join, resolve} from "path";
import {listSongs} from './src/songRepository';

const app = express();

app.use(express.static(join(__dirname, "build", "public")));

app.get("/api/songs", (req, res) => {
    listSongs().then(songs => res.send(songs)).catch(err => res.status(500).send(err));
});

app.get("*", (req, res) => {
    res.sendFile(resolve(__dirname, "build", "public", "index.html"));
});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Up'n runnin' on port ${server.address().port} yo!`);
});
