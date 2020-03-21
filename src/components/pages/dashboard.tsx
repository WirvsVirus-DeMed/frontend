import React from "react";
import { Frontend } from "../../frontend";
import { AddRessourceModal } from "../modals/addRessourceModal";
import { RessourceList } from "../ressourceList";
import { SearchRessourceModal } from "../modals/searchRessourceModal";
import { RemoveRessourceModal } from "../modals/removeRessourceModal";
import { MedRessource, PeerInformation } from "../../models/network";
import { NotificationComponent } from "../notifications/notification";
import { MedRequestNotification } from "../notifications/medRequestNotification";

export class Dashboard extends React.Component<{}, {
    modal: CurrentDashboardModal,
    selectedRessource?: MedRessource,
    openNotifications: JSX.Element[]
}> {

    constructor(props) {
        super(props);
        this.state = { 
            modal: CurrentDashboardModal.None,
            openNotifications: []
        };
        
        let fe = Frontend.getFrontend();
        fe.dashboard = this;
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

            <div className="notification-container">
                {this.state.openNotifications}
            </div>
        </div>;
    }

    getCurrentModal() {
        if(this.state.modal == CurrentDashboardModal.AddRessource) {
            return <AddRessourceModal dashboard={this} />;
        } else if(this.state.modal == CurrentDashboardModal.SearchRessource) {
            return <SearchRessourceModal dashboard={this} />;
        } else if(this.state.modal == CurrentDashboardModal.RemoveRessource) {
            return <RemoveRessourceModal dashboard={this} ressource={this.state.selectedRessource!} />;
        } else if(this.state.modal == CurrentDashboardModal.EditRessource) {
            return <AddRessourceModal dashboard={this} existingItem={this.state.selectedRessource} />;
        }
    }

    showModal(modal: CurrentDashboardModal, ressource?: MedRessource) {
        this.setState({ modal, selectedRessource: ressource });
    }

    private notificationIncId = 0;
    
    /*simpleNotification(title: string, message: string) {
        this.addNotification(<NotificationComponent key={this.notificationIncId++} 
            title={title} dashboard={this}>{message}</NotificationComponent>);
    }*/
    /*addMedRequestNotification(mr: MedRessource, s: PeerInformation) {
        this.addNotification(<MedRequestNotification 
            ressource={mr} sender={s} dashboard={this} 
            key={this.notificationIncId++} />);
    }*/

    addNotification(newNotfEl: JSX.Element) {
        this.setState({
            openNotifications: [...this.state.openNotifications, newNotfEl]
        });
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