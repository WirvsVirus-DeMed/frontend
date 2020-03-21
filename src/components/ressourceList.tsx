import React from "react";
import { MedRessource } from "../models/network";
import { Frontend } from "../frontend";
import { Dashboard, CurrentDashboardModal } from "./pages/dashboard";

export class RessourceList extends React.Component<{
    ownerIsItself: boolean,
    dashboard: Dashboard,
    items: MedRessource[]
}> {

    constructor(props) {
        super(props);
        //this.state = { items: new Array() };
    }

    /*UNSAFE_componentWillReceiveProps(props) {
        this.setState({ items: props.items });
    }*/

    render() {
        let fe = Frontend.getFrontend();

        return <table className="table table-sm">
            <thead>
                <tr>
                    <th scope="col">{fe.lang.PZN}</th>
                    <th scope="col">{fe.lang.TITLE}</th>
                    <th scope="col">{fe.lang.AMOUNT}</th>
                    <th scope="col">{fe.lang.DESCRIPTION}</th>
                    {!this.props.ownerIsItself ? <th scope="col">{fe.lang.CURRENT_OWNER}</th> : null}
                    <th scope="col">{fe.lang.ACTIONS}</th>
                </tr>
                </thead>
                <tbody>
                    {this.props.items.map(item => {
                        return this.ressourceTableRow(item);
                    })}
                </tbody>
            </table>;
    }

    ressourceTableRow(item: MedRessource) {
        return <tr key={item.uuid}>
            <td scope="row">{item.pzn ?? "---"}</td>
            <td>{item.title}</td>
            <td>{item.amount}</td>
            <td>{item.description.substr(0, 100)}</td>
            {!this.props.ownerIsItself ? <td>{item.owner.name}</td> : null}
            <td>{
                this.props.ownerIsItself ? [
                    this.editRessourceButton(item),
                    this.deleteRessourceButton(item)
                ] : [

                ]
            }</td>
        </tr>;
    }

    editRessourceButton(item: MedRessource) {
        let fe = Frontend.getFrontend();
        return <button key="edbtn" type="button" className="btn btn-primary btn-xs" onClick={() => {
            this.props.dashboard.showModal(CurrentDashboardModal.EditRessource, item);
        }}>{fe.lang.ACTION_EDIT}</button>;
    }

    deleteRessourceButton(item: MedRessource) {
        let fe = Frontend.getFrontend();
        return <button key="delbtn" type="button" className="btn btn-primary btn-xs" onClick={() => {
            this.props.dashboard.showModal(CurrentDashboardModal.RemoveRessource, item);
        }}>{fe.lang.ACTION_REMOVE}</button>;
    }

    /*requestRessourceButton() {
        let fe = Frontend.getFrontend();
        return <button key="reqbtn" type="button"></button>
    }*/
    
}
