export function mapLOPlayerToGame(players) {
    const BATCH_SIZE = 100;
    const result = [];

    for (let i = 0; i < players.length; i += BATCH_SIZE) {
        const batch = players.slice(i, i + BATCH_SIZE);
        const batchResult = batch
        .filter(player => player.adv && player.adv_date)
        .map(player => {
            const game_name = player.adv || "unknown";
            const game_date = player.adv_date || "unknown";
            const mega = "LO";

            return { game_name, game_date, mega };
        });

        result.push(...batchResult);
    }
    const uniqueGames = Array.from(
        new Map(result.map(u => [u.game_name, u])).values()
    );

    return uniqueGames;
}
