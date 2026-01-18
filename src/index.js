import { Model } from 'objection';
import Knex from 'knex';
import config from './db_config.json' assert { type: 'json' };

import { fetchLOPlayers } from './fetcher/LostOmens/FetchLOPlayers.js';
import { fetchLOMasters } from './fetcher/LostOmens/FetchLOMasters.js';

import { mapLOToGeekmoUser } from './mapper/MapGeekmoUser.js';
import { mapLOPlayerToGame } from './mapper/MapGame.js';
import { mapLOMasterToMaster } from './mapper/MapMaster.js';
import { mapLOPlayerToLOPlayer } from './mapper/MapLOPlayer.js';

import { saveGeekmoUsers } from './writer/SaveGeekmoUsers.js';
import { saveGames } from './writer/SaveGames.js';
import { saveMasters } from './writer/SaveMasters.js';
import { saveLOPlayers } from './writer/SaveLOPlayers.js';


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
    //got LO players
    const LOPlayers = await fetchLOPlayers();

    //insert info from players to geekmo_users
    const mappedLOPlayersToGeekmoUsers = await mapLOToGeekmoUser(LOPlayers);
    console.log("unique player users: ", mappedLOPlayersToGeekmoUsers.length);
    await saveGeekmoUsers(mappedLOPlayersToGeekmoUsers, 50);
    console.log('=== Successfully inserted! ===');

    //insert info from players to _games
    const mappedLOPlayersToGames = mapLOPlayerToGame(LOPlayers);
    console.log("games: ", mappedLOPlayersToGames.length);
    await saveGames(mappedLOPlayersToGames, 50);
    console.log('=== Successfully inserted! ===');

    //insert info from players to LO_players
    const mappedLOPlayers = await mapLOPlayerToLOPlayer(LOPlayers);
    console.log("unique LO players: ", mappedLOPlayers.length);
    await saveLOPlayers(mappedLOPlayers, 50);
    console.log('=== Successfully inserted! ===');

    //got LO masters
    const LOMasters = await fetchLOMasters();

    //insert info from masters to geekmo_users
    const mappedLOMastersToGeekmoUsers = await mapLOToGeekmoUser(LOMasters);
    console.log("unique master users: ", mappedLOMastersToGeekmoUsers.length);
    await saveGeekmoUsers(mappedLOMastersToGeekmoUsers, 50);
    console.log('=== Successfully inserted! ===');

    //insert info from masters to _masters
    const mappedMasters = await mapLOMasterToMaster(LOMasters);
    console.log("unique masters: ", mappedMasters.length);
    await saveMasters(mappedMasters, 20);
    console.log('=== Successfully inserted! ===');

    await knex.destroy();
    console.log('=== Connection closed ===');
})();
