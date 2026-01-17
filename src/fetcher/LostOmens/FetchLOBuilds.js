import LOCharBuildSettings from "./LOCharBuildSettings.js";

export async function importLO() {
    const builds = await LOCharBuildSettings.getQueryAll();
    console.log("builds: ", builds);
    return builds;
}