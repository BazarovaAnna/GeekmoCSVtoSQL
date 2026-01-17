import LOPlayerInfoSettings from "./LOPlayerInfoSettings.js";

export async function fetchLOPlayers() {
    const players = await LOPlayerInfoSettings.getQueryAll();
    console.log("got LO players: ", players.length);
    return players;
}