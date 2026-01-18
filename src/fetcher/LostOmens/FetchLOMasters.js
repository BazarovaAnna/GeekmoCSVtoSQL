import LOMastersInfoSettings from "./LOMastersInfoSettings.js";

export async function fetchLOMasters() {
    const masterData = await LOMastersInfoSettings.getQueryAll();
    const userIds = masterData.map(elem => elem.id).join(', ');
    console.log("masterData: ", masterData.length);

    return masterData;
}