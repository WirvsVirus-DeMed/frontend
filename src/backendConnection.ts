import { PacketHeader, MedRessource, BackendStateRequest, BackendStateResponse, Packet } from "./models/network";
import { Frontend } from "./frontend";

type OpenCallback<T> = {
    id: T;
    cb: (pkg: PacketHeader) => void;
}

export class BackendConnection {

    incReqId = 1;

    openResponsesCallbacks = new Array<OpenCallback<number>>();
    openEventCallbacks = new Array<OpenCallback<string>>();

    state: BackendState = {
        ownItems: []
    };

    ws: WebSocket;
    constructor(url, private timeout = 10000, private manual = false) {
        if(!manual) {
            this.ws = new WebSocket(url);
            this.ws.onmessage = (ev) => {
                let obj = ev.data;
                console.log("Back->Front", obj);
                this.$handleMessage(JSON.parse(obj));
            };
        } else {
            this.ws = new Object() as any;
        }
    }

    public $handleMessage(msg: PacketHeader) {
        let throwError = false;

        if(msg.responseId) {
            let ocb = this.openResponsesCallbacks.find(c => c.id == msg.requestId);
            if(ocb) {
                ocb.cb(msg);
                this.openResponsesCallbacks.splice(this.openResponsesCallbacks.indexOf(ocb), 1);
            } else {
                throwError = true;
            }
        } else {
            let ocb = this.openEventCallbacks.find(c => c.id == msg.type);
            if(ocb) {
                ocb.cb(msg);
            } else {
                throwError = true;
            }
        }

        if(throwError)
            throw new Error("Package could not be handled: " + JSON.stringify(msg));
    }

    async connect(): Promise<void> {
        if(this.ws.readyState != this.ws.OPEN) {
            return new Promise((res, rej) => {
                let responded = false;
                this.ws.onopen = () => {
                    res();
                    responded = true;
                };

                setTimeout(() => {
                    if(responded)
                        rej("TIMEOUT");
                }, this.timeout);
            });
        }
    }

    async updateState() {
        let req = new BackendStateRequest();
        let res = await this.transceive<BackendStateResponse>(req);
        this.state = {
            ownItems: res.ownItems
        };

        try {
            Frontend.getFrontend().dashboard!.forceUpdate();
        } catch(e) {}
        
        return this.state;
    }

    async transceive<RES>(data: PacketHeader): Promise<Packet<RES>> {
        return new Promise((res, rej) => {
            let requestId = this.incReqId++;
            let reqPkg: PacketHeader = data;
            reqPkg.requestId = requestId;
            reqPkg.responseId = -1;
            
            this.openResponsesCallbacks.push({
                id: requestId,
                cb: (responsePkg) => {
                    res(responsePkg as any);
                }
            })
            this.ws.send(JSON.stringify(reqPkg));

            console.log("Front->Back", reqPkg);
        });
    }

    handleEvent<U, T extends { new (...args: any[]): U }>(typeObj: T, cb: (pkg: PacketHeader) => void) {
        this.openEventCallbacks.push({
            id: typeObj.name,
            cb: cb
        });
    }
}

export interface BackendState {
    ownItems: MedRessource[];
}

/* for debugging purposes */
export class ManualBackendConnection extends BackendConnection {

    lastRequestId: number = -1;
    incRespId: number = 1;

    constructor() {
        super(null, 10000, true);
        console.log("ManualBackend | Created!");
    }

    async connect() {
        console.log("ManualBackend | Connected!");
    }

    async transceive(data: any): Promise<any> {
        return new Promise((res, rej) => {
            this.lastRequestId = this.incReqId++;
            let reqPkg: PacketHeader = data;
            reqPkg.requestId = this.lastRequestId;
            reqPkg.responseId = -1;
            
            this.openResponsesCallbacks.push({
                id: this.lastRequestId,
                cb: (responsePkg) => {
                    res(responsePkg as any);
                }
            })
            console.log("ManualBackend | " + JSON.stringify(reqPkg));
        });
    }

    reply(data: Packet<unknown>) {
        data.requestId = this.lastRequestId;
        data.responseId = this.incRespId;

        this.$handleMessage(data);
    }
}