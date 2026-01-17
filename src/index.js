import { Model } from 'objection';
import Knex from 'knex';
import config from './db_config.json' assert { type: 'json' };

import { fetchLOPlayers } from './fetcher/LostOmens/FetchLOPlayers.js';

import { mapLOPlayerToGeekmoUser } from './mapper/MapGeekmoUser.js';
import { mapLOPlayerToGame } from './mapper/MapGame.js';

import { saveGeekmoUsers } from './writer/SaveGeekmoUsers.js';
import { saveGames } from './writer/SaveGames.js';


const knex = Knex({
    client: 'pg',
    connection: {
        user: config.user,
        host: config.host,
        database: config.database,
        password: config.password,
        port: config.port
    }
});

Model.knex(knex);

(async () => {
    const users = await fetchLOPlayers();
    const mappedUsers = await mapLOPlayerToGeekmoUser(users);
    console.log("unique users: ", mappedUsers.length);

    await saveGeekmoUsers(mappedUsers, 50);
    console.log('=== Successfully inserted! ===');

    const mappedGames = mapLOPlayerToGame(users);
    console.log("games: ", mappedGames.length);

    await saveGames(mappedGames, 50);
    console.log('=== Successfully inserted! ===');

    await knex.destroy();
    console.log('=== Connection closed ===');
})();
