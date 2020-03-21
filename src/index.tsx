import { Frontend } from "./frontend";

let frontend = new Frontend();
window["frontend"] = frontend;

async function onStart() {
    await frontend.loadLangFile("de_DE");
    frontend.render();
}

onStart();