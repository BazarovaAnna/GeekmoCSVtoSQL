import { GeekmoUser } from "../model/GeekmoUser.js";

export async function mapLOMasterToMaster(masters) {
    const BATCH_SIZE = 20;
    const result = [];

    const cleanId = (id) =>
        id
            .trim()
            .replace(/^(https?:\/\/)?(www\.)?vk\.com\//, "")
            .replace(/^@/, "")
            .replace(/\/$/, "");

    for (let i = 0; i < masters.length; i += BATCH_SIZE) {
        const batch = masters.slice(i, i + BATCH_SIZE);
        const filtered = batch.filter(master => master.id);

        // Prepare cleaned ids and nicknames
        const cleanedList = filtered.map(m => ({ original: m, cleaned: cleanId(m.id) }));

        // Collect nicknames (those that are not explicit vk ids like "id123" or numeric)
        const nicknameKeys = cleanedList
            .map(c => c.cleaned)
            .filter(k => !/^id\d+$/.test(k) && !/^\d+$/.test(k));

        // Fetch matching users in one query
        let nickMap = new Map();
        if (nicknameKeys.length) {
            const users = await GeekmoUser.query().whereIn('vk_nickname', nicknameKeys).select('vk_nickname', 'vk_id');
            nickMap = new Map(users.map(u => [u.vk_nickname, u.vk_id]));
        }
        //console.log("nickMap: ", nickMap);

        const batchResult = cleanedList.map(({ original, cleaned }) => {
            let vk_id = "";

            if (/^id\d+$/.test(cleaned)) {
                vk_id = cleaned;
            } else if (/^\d+$/.test(cleaned)) {
                vk_id = `id${cleaned}`;
            } else if (nickMap.has(cleaned)) {
                vk_id = nickMap.get(cleaned);
            } else {
                vk_id = ""; // unknown / not found in DB
            }

            const owner = false;
            const mega = "LO";

            return { vk_id, mega, owner };
        });

        result.push(...batchResult);
    }

    // Dedupe by vk_id when available, otherwise by raw id string
    const unique = Array.from(
        new Map(result.map(u => [u.vk_id || u.raw.id || JSON.stringify(u.raw), u])).values()
    );
    console.log("masters:", unique.length);

    return unique;
}
