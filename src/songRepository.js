import {readdir, readFile} from "fs";
import {join} from "path";
import {parseSong as doParseSong} from '../lib/tabParser';

const songDirectory = join(__dirname, "..", "tabs");

export const listSongs = () => new Promise((resolve, reject) =>
    readdir(songDirectory, (err, files) =>
        err ? reject(err) : Promise.all(files.map(parseSong)).then(
            songs => resolve(songs)
        ).catch(err => reject(err))
    )
);

const parseSong = filename => new Promise((resolve, reject) =>
    readFile(join(songDirectory, filename), (err, data) =>
        err ? reject(err) : resolve(Object.assign(
            doParseSong(data.toString()),
            {id: filename}
        ))
    )
);
