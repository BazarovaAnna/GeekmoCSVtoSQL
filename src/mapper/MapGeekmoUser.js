import axios from "axios";
import { VKToken } from "../consts.js";

/**
 * Преобразует массив игроков LO в массив объектов с vk_id и vk_nickname
 * Делает запрос к VK API батчами по 100 пользователей
 * Если профиль закрыт или не найден, возвращает vk_nickname = "закрыт"
 */
export async function mapLOToGeekmoUser(LOUsers) {
  const BATCH_SIZE = 100;
  const result = [];

  // Функция очистки ссылки
  const cleanId = (id) =>
    id
      .trim()
      .replace(/^(https?:\/\/)?(www\.)?vk\.com\//, "")
      .replace(/^@/, "")
      .replace(/\/$/, "");

  for (let i = 0; i < LOUsers.length; i += BATCH_SIZE) {
    const batch = LOUsers.slice(i, i + BATCH_SIZE);

    // Собираем user_ids через запятую
    const userIds = batch
    .filter(player => player.id)
    .map(player => cleanId(player.id)).join(",");

    try {
      const { data } = await axios.get("https://api.vk.com/method/users.get", {
        params: {
          user_ids: userIds,
          fields: "screen_name",
          access_token: VKToken,
          v: "5.131",
        },
      });

      // Маппинг: если пользователь не найден, ставим "закрыт"
      const batchResult = batch.map(player => {
        const cleaned = cleanId(player.id);
        const user = data.response?.find(
          u => u.id.toString() === cleaned.replace(/^id/, "") || u.screen_name === cleaned
        );

        return user
          ? { vk_id: `id${user.id}`, vk_nickname: user.screen_name || "", name: player.name || "" }
          : { vk_id: cleaned, vk_nickname: cleaned, name: player.name || "" };
      });

      result.push(...batchResult);
    } catch (err) {
      console.error("VK API batch error:", err.message);

      // Если ошибка, помечаем все профили в батче как "закрыт"
      result.push(...batch.map(() => ({ vk_id: "", vk_nickname: "закрыт", name: "" })));
    }

    // Пауза, чтобы не превышать лимиты VK (~3 запроса в секунду)
    await new Promise(resolve => setTimeout(resolve, 350));
  }
  const uniqueUsers = Array.from(
    new Map(result.map(u => [u.vk_id, u])).values()
  );

  return uniqueUsers;
}
