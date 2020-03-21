import React from "react";
import { Modal } from "./modal";
import { Frontend } from "../../frontend";
import { Dashboard, CurrentDashboardModal } from "../pages/dashboard";
import { MedRessource, ChangeMedRessourceRequest } from "src/models/network";
import { BtnLoadingSpinner } from "../loading";

export class RemoveRessourceModal extends React.Component<{
    dashboard: Dashboard,
    ressource: MedRessource
}, {
    isRemoving: boolean
}> {

    constructor(props) {
        super(props);
        this.state = {
            isRemoving: false
        };
    }

    render() {
        let fe = Frontend.getFrontend();
        
        return <Modal dashboard={this.props.dashboard}
            title={fe.lang.REMOVE_RESSOURCE} footer={this.renderFooter()}>
            
            {fe.lang.REMOVE_RESSOURCE_QUESTION.replace("%", this.props.ressource.title ?? this.props.ressource.pzn)}
        </Modal>;
    }

    renderFooter() {
        let fe = Frontend.getFrontend();

        return [
            <button type="button" className="btn btn-success" disabled={this.state.isRemoving}
            onClick={() => {
                this.onRemove();
            }} key="modFtBtn1">{fe.lang.ACTION_ADD} {this.state.isRemoving ? <BtnLoadingSpinner /> : ""}</button>,
            <button type="button" className="btn btn-secondary" disabled={this.state.isRemoving}
            onClick={() => {
                this.props.dashboard.showModal(CurrentDashboardModal.None);
            }} key="modFtBtn2">{fe.lang.ACTION_CANCEL}</button>
        ]
    }

    async onRemove() {
        let fe = Frontend.getFrontend();

        let req = new ChangeMedRessourceRequest(this.props.ressource.uuid, true);
        await fe.backend.transceive(req);
        
        await fe.backend.updateState();
        this.props.dashboard.showModal(CurrentDashboardModal.None);
    }

}