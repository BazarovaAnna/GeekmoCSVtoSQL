import LOInventorySettings from "./LOInventorySettings.js";

export async function importLO() {
    const inventoryData = await LOInventorySettings.getQueryAll();
    console.log("inventoryData: ", inventoryData);

    return inventoryData;
}