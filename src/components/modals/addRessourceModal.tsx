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
    ressource_title: string,
    ressource_amount: number,
    ressource_pzn: number,
    ressource_description: string,
    isInserting: boolean
}> {

    constructor(props) {
        super(props);

        if(!this.props.existingItem)
            this.state = { 
                isInserting: false,
                ressource_amount: -1,
                ressource_pzn: -1,
                ressource_title: "",
                ressource_description: ""
            };
        else {
            let i = this.props.existingItem;
            this.state = {
                isInserting: false,
                ressource_amount: i.amount,
                ressource_description: i.description,
                ressource_pzn: i.pzn,
                ressource_title: i.title
            };
        }
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
                            onChange={(evt) => {this.setState({ ressource_title: evt.target.value })}}
                            value={this.props.existingItem?.title} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">{fe.lang.AMOUNT}</label>
                    <div className="col-sm-4">
                        <input type="number" className="form-control" disabled={this.state.isInserting}
                            id="inputAmount" placeholder={fe.lang.ADDRESSOURCE_AMOUNT_PLH}
                            onChange={(evt) => {this.setState({ ressource_amount: parseInt(evt.target.value) })}}
                            value={this.props.existingItem?.amount} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">{fe.lang.PZN}</label>
                    <div className="col-sm-4">
                        <input type="text" className="form-control" disabled={this.state.isInserting}
                            id="inputAmount" placeholder={fe.lang.ADDRESSOURCE_PZN_PLH}
                            onChange={(evt) => {this.setState({ ressource_pzn: parseInt(evt.target.value) })}}
                            value={this.props.existingItem?.pzn} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">{fe.lang.DESCRIPTION}</label>
                    <div className="col-sm-9">
                        <textarea className="form-control" rows={6} disabled={this.state.isInserting}
                            id="inputDescription" placeholder={fe.lang.ADDRESSOURCE_DESCRIPTION_PLH} 
                            onChange={(evt) => {this.setState({ ressource_description: evt.target.value })}}
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
            }} key="modFtBtn1">{fe.lang.ACTION_ADD} {this.state.isInserting ? <BtnLoadingSpinner /> : ""}</button>,
            <button type="button" className="btn btn-secondary" disabled={this.state.isInserting}
            onClick={() => {
                this.props.dashboard.showModal(CurrentDashboardModal.None);
            }} key="modFtBtn2">{fe.lang.ACTION_CANCEL}</button>
        ]
    }

    async onSubmitClick() {
        let newMedRessource: MedRessource = {
            amount: this.state.ressource_amount,
            description: this.state.ressource_description,
            owner: null as any,
            title: this.state.ressource_title,
            uuid: uuidv4(),
            pzn: this.state.ressource_pzn
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
        
        this.props.dashboard.showModal(CurrentDashboardModal.None);
    }

}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}