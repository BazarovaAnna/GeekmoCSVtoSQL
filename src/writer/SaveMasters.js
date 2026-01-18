import { Master } from '../model/Master.js';

/**
 * Saves an array of masters into the DB in batches
 * @param {Array<Object>} masters
 * @param {number} batchSize
 */
export async function saveMasters(masters, batchSize = 100) {
  for (let i = 0; i < masters.length; i += batchSize) {
    const batch = masters.slice(i, i + batchSize);

    await Master.query()
      .insert(batch)
      .onConflict(['vk_id', 'mega'])   // <- multiple columns here
      .merge(); 
  }
}
