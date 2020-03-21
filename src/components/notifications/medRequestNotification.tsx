import React from "react";
import { MedRessource, PeerInformation, IncommingMedRessourceRequest, IncommingMedRessourceResponse } from "src/models/network";
import { NotificationComponent } from "./notification";
import { Dashboard } from "../pages/dashboard";
import { Frontend } from "../../frontend";
import { LanguageDescription } from "../../models/lang";

export class MedRequestNotification extends React.Component<{
    dashboard: Dashboard,
    pkg: IncommingMedRessourceRequest,
    sender: PeerInformation
}> {

    render() {
        let fe = Frontend.getFrontend();
        
        return <NotificationComponent dashboard={this.props.dashboard}
            title={fe.lang.NOTIFICATION_MEDREQ_TITLE}>
            
            {fe.lang.NOTIFICATION_MEDREQ_DESCR}

            {this.renderProperty("TITLE", this.props.pkg.ressource.title)}
            {this.renderProperty("PZN", this.props.pkg.ressource.pzn)}
            

            {fe.lang.NOTIFICATION_MEDREQ_QUEST}
            <div className="container">
                <div className="row">
                    <button type="button" className="col-sm btn btn-success btn-xs" onClick={() => {
                        this.sendDecision(true);
                    }}>{fe.lang.ACTION_ALLOW}</button>
                    <button type="button" className="col-sm btn btn-danger btn-xs" onClick={() => {
                        this.sendDecision(false);
                    }}>{fe.lang.ACTION_DENY}</button>
                </div>
            </div>
        </NotificationComponent>;
    }

    renderProperty(langKey: keyof LanguageDescription, value: string | number | null) {
        let fe = Frontend.getFrontend();
        if(value) {
            return <div><b>{fe.lang[langKey]}</b> {value}</div>;
        }
    }

    async sendDecision(allowed: boolean) {
        let fe = Frontend.getFrontend();

        let pkg = new IncommingMedRessourceResponse(allowed, "");
        await fe.backend.transceive(pkg);

        if(allowed) {
            // Display page
        }
    }

}