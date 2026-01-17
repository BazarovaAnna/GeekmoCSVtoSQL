import LOCharInfoSettings from "./LOCharInfoSettings.js";

export async function importLO() {
    const charData = await LOCharInfoSettings.getQueryAll();
    console.log("charData: ", charData);

    return charData;
}