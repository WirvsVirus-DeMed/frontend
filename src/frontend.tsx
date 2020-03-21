import React from "react";
import { MainComponent } from "./components/frontend";
import ReactDOM from "react-dom";
import { BackendConnection } from "./backendConnection";
import { useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";
import { LanguageDescription } from "./models/lang";

export const P2P_DEFAULT_PORT = 4040;
export class Frontend {

    backend: BackendConnection;
    dbg: FrontendDebugger;

    history = createBrowserHistory();
    element = <MainComponent history={this.history} />;

    static frontendSingleton: Frontend;
    constructor() {
        Frontend.frontendSingleton = this;
        this.lang = new Object() as any;
        this.dbg = new FrontendDebugger();
        this.backend = new BackendConnection("ws://localhost:8081");
    }

    static getFrontend() {
        return this.frontendSingleton;
    }

    render() {
        ReactDOM.render(
            this.element,
            document.getElementById("root")
        );
    }

    redirectTo(page: string) {
        this.history.push(page);
    }

    public lang: LanguageDescription;
    async loadLangFile(lang: string) {
        this.lang = await this.ajaxRequest(`/lang/${lang}.json`);
    }

    ajaxRequest(url: string): Promise<any> {
        return new Promise((res, rej) => {
            let request = new XMLHttpRequest();
            request.open("GET", url);
            request.addEventListener("load", (ev) => {
                if(request.status == 200) {
                    res(JSON.parse(request.responseText));
                } else {
                    console.warn(request.statusText, request.responseText);
                }
            });
            request.send();
        });
    }

    displayError(err: string) {
        
    }
} 

export class FrontendDebugger {

    refresh() {
        window.location.href = "/index.html";
    }

}