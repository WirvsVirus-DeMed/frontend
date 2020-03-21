import { Frontend } from "./frontend";

let frontend = new Frontend();
window["frontend"] = frontend;
async function onStart() {
    await frontend.loadLangFile("de_DE");
    await frontend.backend.connect();
    await frontend.backend.updateState();
    frontend.render();
}

onStart();