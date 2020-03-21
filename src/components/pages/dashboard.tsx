import React from "react";
import { Frontend } from "../../frontend";
import { AddRessourceModal } from "../modals/addRessourceModal";

export class Dashboard extends React.Component<{}, {
    modal: CurrentDashboardModal
}> {

    constructor(props) {
        super(props);
        this.state = { modal: CurrentDashboardModal.None };
    }

    render() {
        let fe = Frontend.getFrontend();

        return <div>
            <h3>Dashboard</h3>

            <button type="button" className="btn btn-success" onClick={() => {
                this.showModal(CurrentDashboardModal.AddRessource);
            }}>{fe.lang.PROVIDE_RESSOURCE}</button>

            {this.getCurrentModal()}
        </div>;
    }

    getCurrentModal() {
        if(this.state.modal == CurrentDashboardModal.AddRessource) {
            return <AddRessourceModal dashboard={this} />;
        }
    }

    showModal(modal: CurrentDashboardModal) {
        this.setState({ modal });
        /*setTimeout(() => {
            $("#currentModal").modal("show");
        }, 10);*/
    }

}

export enum CurrentDashboardModal {
    None,
    AddRessource
}