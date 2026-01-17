import { GeekmoUser } from '../model/GeekmoUser.js';

/**
 * Сохраняет массив транзакций в базе порциями (батчами)
 * @param {Array<Object>} geekmo_users - массив объектов для вставки
 * @param {number} batchSize - размер батча (по умолчанию 100)
 */
export async function saveGeekmoUsers(geekmo_users, batchSize = 100) {
  for (let i = 0; i < geekmo_users.length; i += batchSize) {
    const batch = geekmo_users.slice(i, i + batchSize);

    // insert с onConflict для PostgreSQL — обновляем при совпадении id
    await GeekmoUser.query()
      .insert(batch)
      .onConflict('vk_id')
      .merge();  // merge означает, что при конфликте id обновляем поля
  }
}
