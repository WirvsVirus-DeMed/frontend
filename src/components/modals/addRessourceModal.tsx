import React from "react";
import { Modal } from "./modal";
import { Frontend } from "../../frontend";
import { Dashboard } from "../pages/dashboard";

export class AddRessourceModal extends React.Component<{
    dashboard: Dashboard
}, {
    ressource_title: string,
    ressource_amount: number,
    ressource_description: string
}> {

    render() {
        let fe = Frontend.getFrontend();

        return <Modal dashboard={this.props.dashboard} title={fe.lang.PROVIDE_RESSOURCE}>
            <form>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">{fe.lang.ADDRESSOURCE_TITLE}</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" 
                            id="inputTitle" placeholder={fe.lang.ADDRESSOURCE_TITLE_PLH} 
                            onChange={(evt) => {this.setState({ ressource_title: evt.target.value })}}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">{fe.lang.ADDRESSOURCE_AMOUNT}</label>
                    <div className="col-sm-4">
                        <input type="number" className="form-control" 
                            id="inputAmount" placeholder={fe.lang.ADDRESSOURCE_AMOUNT_PLH}
                            onChange={(evt) => {this.setState({ ressource_amount: parseInt(evt.target.value) })}}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">{fe.lang.ADDRESSOURCE_DESCRIPTION}</label>
                    <div className="col-sm-9">
                        <textarea className="form-control" rows={6}
                            id="inputDescription" placeholder={fe.lang.ADDRESSOURCE_DESCRIPTION_PLH} 
                            onChange={(evt) => {this.setState({ ressource_description: evt.target.value })}}/>
                    </div>
                </div>
            </form>
        </Modal>;
    }

}