import { Game } from '../model/Game.js';

/**
 * Сохраняет массив транзакций в базе порциями (батчами)
 * @param {Array<Object>} games - массив объектов для вставки
 * @param {number} batchSize - размер батча (по умолчанию 100)
 */
export async function saveGames(games, batchSize = 100) {
  for (let i = 0; i < games.length; i += batchSize) {
    const batch = games.slice(i, i + batchSize);

    // insert с onConflict для PostgreSQL — обновляем при совпадении id
    await Game.query()
      .insert(batch)
      .onConflict('game_name')
      .merge();  // merge означает, что при конфликте id обновляем поля
  }
}
