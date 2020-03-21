import React from "react";
import { Frontend } from "../../frontend";
import { AddRessourceModal } from "../modals/addRessourceModal";
import { RessourceList } from "../ressourceList";
import { SearchRessourceModal } from "../modals/searchRessourceModule";

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
             
            <button type="button" className="btn btn-primary" onClick={() => {
                this.showModal(CurrentDashboardModal.SearchRessource);
            }}>{fe.lang.SEARCH_FOR_RESSOURCE}</button>
                
            
            <h5>Eigene Ressourcen</h5>
            <RessourceList ownerIsItself={true} dashboard={this} 
                items={fe.backend.state.ownItems} />

            {this.getCurrentModal()}
        </div>;
    }

    getCurrentModal() {
        if(this.state.modal == CurrentDashboardModal.AddRessource) {
            return <AddRessourceModal dashboard={this} />;
        } else if(this.state.modal == CurrentDashboardModal.SearchRessource) {
            return <SearchRessourceModal dashboard={this} />;
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
    AddRessource,
    SearchRessource,
    EditRessource,
    RemoveRessource,
    RequestRessource
}