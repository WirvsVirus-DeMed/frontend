import React from "react";
import { Dashboard } from "../pages/dashboard";
import { Frontend } from "../../frontend";
import { Modal } from "./modal";
import { RessourceList } from "../ressourceList";
import { MedRessource, SearchMedRessourceRequest, SearchMedRessourceResponse } from "../../models/network";
import { BtnLoadingSpinner } from "../loading";

export class SearchRessourceModal extends React.Component<{
    dashboard: Dashboard
}, {
    currentInput: string,
    items: MedRessource[],
    isRequesting: boolean,
    resultCount: number
}> {

    constructor(props) {
        super(props);
        this.state = { isRequesting: false, items: new Array(), currentInput: "", resultCount: -1 }
    }

    textInput?: HTMLInputElement | null;

    render() {
        let fe = Frontend.getFrontend();
        
        return <Modal dashboard={this.props.dashboard}
            title={fe.lang.SEARCH_FOR_RESSOURCE}>
            
            <div className="input-group mb-3">
                <input type="text" className="form-control" 
                    onChange={(ev) => {this.setState({currentInput: ev.target.value})}} 
                    ref={(input) => {this.textInput = input;}}
                    disabled={this.state.isRequesting} />

                <div className="input-group-append">
                    <button onClick={() => {this.afterSubmitClick()}} 
                        className="btn btn-primary" type="button" disabled={this.state.isRequesting}>
                            {fe.lang.SEARCH} {this.state.isRequesting ? <BtnLoadingSpinner /> : ""}
                    </button>
                </div>
            </div>

            {this.state.resultCount != -1 ? <div>{
                fe.lang.TEMPL_RESSOURCES_RESULT.replace("%", this.state.resultCount.toString())
            }</div> : null}

            <RessourceList dashboard={this.props.dashboard} 
                ownerIsItself={false} items={this.state.items} />
        </Modal>;
    }

    componentDidMount() {
        this.textInput!.focus();
    }

    async afterSubmitClick() {
        let fe = Frontend.getFrontend();

        this.setState({ isRequesting: true });
        let req = new SearchMedRessourceRequest(this.state.currentInput.split(" "));
        let res = await fe.backend.transceive<SearchMedRessourceResponse>(req);
        
        this.setState({ 
            items: res.ressources, 
            isRequesting: false,
            resultCount: res.ressources.length
        }); 
    }
}