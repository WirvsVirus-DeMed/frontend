import React from "react";
import { MedRessource } from "../models/network";

export class RessourceList extends React.Component<{
    ownerIsItself: boolean
}, {
    items: MedRessource[]
}> {

    render() {
        return <table className="table">
            <thead>
                <tr>
                    <th scope="col">Titel</th>
                    <th scope="col">Anzahl</th>
                    <th scope="col">Beschreibung</th>
                    {!this.props.ownerIsItself ? <th scope="col">Aktueller Besitzer</th> : ""}
                    <th scope="col">Aktionen</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.items.map(item => {
                        return <tr>
                            <td>{item.title}</td>
                            <td>{item.amount}</td>
                            <td>{item.description.substr(0, 100)}</td>
                            {!this.props.ownerIsItself ? <td>{item.owner.name}</td> : ""}
                            <td>
                                
                            </td>
                        </tr>;
                    })}
                </tbody>
            </table>;
    }
    
}