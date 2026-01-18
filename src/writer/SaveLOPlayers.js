import { LOPlayer } from '../model/LOPlayer.js';

/**
 * Saves an array of LOPlayers into the DB in batches
 * @param {Array<Object>} LOPlayers
 * @param {number} batchSize
 */
export async function saveLOPlayers(LOPlayers, batchSize = 100) {
  for (let i = 0; i < LOPlayers.length; i += batchSize) {
    const batch = LOPlayers.slice(i, i + batchSize);

    await LOPlayer.query()
      .insert(batch)
      .onConflict('vk_id')
      .merge(); 
  }
}
