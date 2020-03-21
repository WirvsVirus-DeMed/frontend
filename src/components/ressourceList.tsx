import React from "react";
import { MedRessource } from "../models/network";
import { Frontend } from "../frontend";
import { Dashboard, CurrentDashboardModal } from "./pages/dashboard";

export class RessourceList extends React.Component<{
    ownerIsItself: boolean,
    dashboard: Dashboard,
    items: MedRessource[]
}, {
    items: MedRessource[]
}> {

    constructor(props) {
        super(props);
        this.state = { items: new Array() };
    }

    componentWillReceiveProps(props) {
        this.setState({ items: props.items });
    }

    render() {
        let fe = Frontend.getFrontend();

        return <table className="table">
            <thead>
                <tr>
                    <th scope="col">{fe.lang.TITLE}</th>
                    <th scope="col">{fe.lang.AMOUNT}</th>
                    <th scope="col">{fe.lang.DESCRIPTION}</th>
                    {!this.props.ownerIsItself ? <th scope="col">{fe.lang.CURRENT_OWNER}</th> : null}
                    <th scope="col">{fe.lang.ACTIONS}</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.items.map(item => {
                        return this.ressourceTableRow(item);
                    })}
                </tbody>
            </table>;
    }

    ressourceTableRow(item: MedRessource) {
        return <tr key={item.uuid}>
            <td>{item.title}</td>
            <td>{item.amount}</td>
            <td>{item.description.substr(0, 100)}</td>
            {!this.props.ownerIsItself ? <td>{item.owner.name}</td> : null}
            <td>{
                this.props.ownerIsItself ? [
                    this.editRessourceButton()
                ] : [

                ]
            }</td>
        </tr>;
    }

    editRessourceButton() {
        let fe = Frontend.getFrontend();
        return <button type="button" className="btn btn-primary" onClick={() => {
            this.props.dashboard.showModal(CurrentDashboardModal.EditRessource);
        }}>{fe.lang.EDIT_RESSOURCE}</button>;
    }

    deleteRessourceButton() {
        let fe = Frontend.getFrontend();
        return <button type="button" className="btn btn-primary" onClick={() => {
            this.props.dashboard.showModal(CurrentDashboardModal.RemoveRessource);
        }}>{fe.lang.REMOVE_RESSOURCE}</button>;
    }
    
}
