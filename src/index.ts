import {getConfig} from "./config.ts";

async function main(): Promise<void> {
    const { TEST } = getConfig();
    console.log(TEST);
}

main().catch((error) => {
    console.error(error);

    return 1;
})