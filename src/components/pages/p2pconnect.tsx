import React from "react";
import { Frontend, P2P_DEFAULT_PORT } from "../../frontend";
import { BtnLoadingSpinner } from "../loading";
import { P2PConnectionRequest, PeerInformation, P2PConnectionResponse } from "../../models/network";

export class P2PConnectPage extends React.Component<{}, {
    isConnecting: boolean,
    peerAddress: string
}> {

    constructor(props) {
        super(props);
        this.state = { isConnecting: false, peerAddress: "" };
    }

    render() {
        let fe = Frontend.getFrontend();
        return <div>
            <h3>{fe.lang.CONNECT_TO_PEER}</h3>

            <div className="input-group mb-3">
                <input type="text" className="form-control" 
                    placeholder={fe.lang.PEER_ADDRESS} aria-label={fe.lang.PEER_ADDRESS} 
                        aria-describedby="basic-addon1" disabled={this.state.isConnecting} 
                        onChange={(evt) => {this.setState({ peerAddress: evt.target.value })}} />

                <div className="input-group-append">
                    <button onClick={() => {this.connectBtnClick()}} 
                        className="btn btn-primary" type="button" disabled={this.state.isConnecting}>
                            {fe.lang.CONNECT} {this.state.isConnecting ? <BtnLoadingSpinner /> : ""}
                    </button>
                </div>
            </div>
        </div>;
    }

    async connectBtnClick() {
        let fe = Frontend.getFrontend();
        this.setState({ isConnecting: true });

        let inputSpl = this.state.peerAddress.split(":");
        let peerInformation: PeerInformation = {
            address: inputSpl[0],
            port: inputSpl.length > 1 ? parseInt(inputSpl[1]) : P2P_DEFAULT_PORT
        };
        let res: P2PConnectionResponse = await fe.backend.transceive(new P2PConnectionRequest(false, peerInformation));
        if(res.connected) {
            fe.backend.state.isConnectedToP2P = true;
            fe.redirectTo("/dashboard");
        }
        console.log("Connecting...");
    }

}