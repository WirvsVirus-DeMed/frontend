import React from "react";
import { MainComponent } from "./components/frontend";
import ReactDOM from "react-dom";
import { BackendConnection, ManualBackendConnection } from "./backendConnection";
import { useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";
import { LanguageDescription } from "./models/lang";
import { P2PConnectionResponse, MedRessource, SearchMedRessourceResponse, ProvideMedRessourceResponse, BackendStateResponse } from "./models/network";
import { Dashboard } from "./components/pages/dashboard";

export const P2P_DEFAULT_PORT = 4040;

export const DEBUG_MANUAL_BE_CON = false;

export class Frontend {

    backend: BackendConnection;
    dbg: FrontendDebugger;
    dashboard?: Dashboard;

    history = createBrowserHistory();
    element = <MainComponent history={this.history} />;

    static frontendSingleton: Frontend;
    constructor() {
        Frontend.frontendSingleton = this;
        this.lang = new Object() as any;
        this.dbg = new FrontendDebugger(this);

        if(DEBUG_MANUAL_BE_CON)
            this.backend = new ManualBackendConnection();
        else
            this.backend = new BackendConnection("ws://" + location.host + "/websocket");
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

type GetConstructorArgs<T> = T extends new (...args: infer U) => any ? U : never;
export class FrontendDebugger {

    constructor(private fe: Frontend) {}

    private getBackend() {
        return this.fe.backend as ManualBackendConnection;
    }

    refresh() {
        window.location.href = "/index.html";
    }

    replyP2PConRes(connected: boolean, peerCount: number) {
        this.getBackend().reply(new P2PConnectionResponse(connected, peerCount));
    }

    replySearchMedRessource(ressources: MedRessource[]) {
        this.getBackend().reply(new SearchMedRessourceResponse(ressources));
    }

    replyAddMedRessource(success: boolean) {
        this.getBackend().reply(new ProvideMedRessourceResponse(success));
    }

    replyBackendState(con, ressources) {
        this.getBackend().reply(new BackendStateResponse(con, ressources));
    }

}