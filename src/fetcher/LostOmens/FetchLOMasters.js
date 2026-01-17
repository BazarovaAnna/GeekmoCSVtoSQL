import LOMastersInfoSettings from "./LOMastersInfoSettings.js";

export async function importLO() {
    const masterData = await LOMastersInfoSettings.getQueryAll();
    const userIds = masterData.map(elem => elem.id).join(', ');
    console.log("masterData: ", masterData);
    console.log("userIds: ", userIds);

    return userIds;
}