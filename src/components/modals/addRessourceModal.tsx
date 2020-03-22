import React from "react";
import { Modal } from "./modal";
import { Frontend } from "../../frontend";
import { Dashboard, CurrentDashboardModal } from "../pages/dashboard";
import { MedRessource, ProvideMedRessourceRequest, ProvideMedRessourceResponse, ChangeMedRessourceRequest, ChangeMedRessourceResponse } from "../../models/network";
import { BtnLoadingSpinner } from "../loading";

export class AddRessourceModal extends React.Component<{
    dashboard: Dashboard,
    existingItem?: MedRessource
}, {
    isInserting: boolean
}> {

    titleElement?: HTMLInputElement;
    amountElement?: HTMLInputElement;
    pznElement?: HTMLInputElement;
    descriptionElement?: HTMLTextAreaElement;

    constructor(props) {
        super(props);

        this.state = { 
            isInserting: false
        };
    }

    render() {
        let fe = Frontend.getFrontend();

        return <Modal dashboard={this.props.dashboard} 
            title={this.props.existingItem ? fe.lang.EDIT_RESSOURCE : fe.lang.PROVIDE_RESSOURCE} footer={this.renderFooter()}>
            <form>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">{fe.lang.TITLE}</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" disabled={this.state.isInserting}
                            id="inputTitle" placeholder={fe.lang.ADDRESSOURCE_TITLE_PLH} 
                            ref={(el) => this.titleElement = el!}
                            value={this.props.existingItem?.title} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">{fe.lang.AMOUNT}</label>
                    <div className="col-sm-4">
                        <input type="number" className="form-control" disabled={this.state.isInserting}
                            id="inputAmount" placeholder={fe.lang.ADDRESSOURCE_AMOUNT_PLH}
                            ref={(el) => this.amountElement = el!}
                            value={this.props.existingItem?.amount} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">{fe.lang.PZN}</label>
                    <div className="col-sm-4">
                        <input type="text" className="form-control" disabled={this.state.isInserting}
                            id="pznAmount" placeholder={fe.lang.ADDRESSOURCE_PZN_PLH}
                            ref={(el) => this.pznElement = el!}
                            value={this.props.existingItem?.pzn} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">{fe.lang.DESCRIPTION}</label>
                    <div className="col-sm-9">
                        <textarea className="form-control" rows={6} disabled={this.state.isInserting}
                            id="inputDescription" placeholder={fe.lang.ADDRESSOURCE_DESCRIPTION_PLH} 
                            ref={(el) => this.descriptionElement = el!}
                            value={this.props.existingItem?.description} />
                    </div>
                </div>
            </form>
        </Modal>;
    }

    renderFooter() {
        let fe = Frontend.getFrontend();

        return [
            <button type="button" className="btn btn-success" disabled={this.state.isInserting}
            onClick={() => {
                this.onSubmitClick();
            }} key="modFtBtn1">{this.props.existingItem ? fe.lang.ACTION_EDIT : fe.lang.ACTION_ADD} {this.state.isInserting ? <BtnLoadingSpinner /> : ""}</button>,
            <button type="button" className="btn btn-secondary" disabled={this.state.isInserting}
            onClick={() => {
                this.props.dashboard.showModal(CurrentDashboardModal.None);
            }} key="modFtBtn2">{fe.lang.ACTION_CANCEL}</button>
        ]
    }

    async onSubmitClick() {
        let newMedRessource: MedRessource = {
            amount: parseInt(this.amountElement!.value),
            description: this.descriptionElement!.value,
            owner: null as any,
            title: this.titleElement!.value,
            uuid: uuidv4(),
            pzn: parseInt(this.pznElement!.value)
        };

        let fe = Frontend.getFrontend();

        this.setState({ isInserting: true });
        if(!this.props.existingItem) {

            let req = new ProvideMedRessourceRequest(newMedRessource);
            let res = await fe.backend.transceive<ProvideMedRessourceResponse>(req);
            
        } else {

            let req = new ChangeMedRessourceRequest(this.props.existingItem.uuid, false, newMedRessource);
            let res = await fe.backend.transceive<ChangeMedRessourceResponse>(req);

        }
        
        this.setState({ isInserting: false });
        
        await fe.backend.updateState();
        this.props.dashboard.showModal(CurrentDashboardModal.None);
    }

}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}