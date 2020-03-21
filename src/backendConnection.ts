import { RawPacket, PacketContent, MedRessource, BackendStateRequest, BackendStateResponse } from "./models/network";

type OpenCallback<T> = {
    id: T;
    cb: (pkg: RawPacket<any>) => void;
}

export class BackendConnection {

    incReqId = 1;

    openResponsesCallbacks = new Array<OpenCallback<number>>();
    openEventCallbacks = new Array<OpenCallback<string>>();

    state: BackendState = {
        isConnectedToP2P: false,
        ownItems: []
    };

    ws: WebSocket;
    constructor(url, private timeout = 10000, private manual = false) {
        if(!manual) {
            this.ws = new WebSocket(url);
            this.ws.onmessage = (ev) => {
                let obj = ev.data;
                this.$handleMessage(JSON.parse(obj));
            };
        } else {
            this.ws = new Object() as any;
        }
    }

    public $handleMessage(msg: RawPacket<any>) {
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

    sendPacket(data: PacketContent): void {
        let requestId = this.incReqId++;
        let reqPkg: RawPacket<any> = {
            requestId,
            type: data.getType(),
            data: data
        };
        this.ws.send(JSON.stringify(reqPkg));
    }

    async updateState() {
        let req = new BackendStateRequest();
        let res = await this.transceive(req);
        let resData: BackendStateResponse = res.data;
        this.state = {
            isConnectedToP2P: resData.isConnectedToP2P,
            ownItems: resData.ownItems
        };
        return this.state;
    }

    async transceive(data: PacketContent): Promise<RawPacket<any>> {
        return new Promise((res, rej) => {
            let requestId = this.incReqId++;
            let reqPkg: RawPacket<any> = {
                requestId,
                type: data.getType(),
                data: data
            };
            this.openResponsesCallbacks.push({
                id: requestId,
                cb: (responsePkg) => {
                    res(responsePkg.data ? responsePkg.data : responsePkg);
                }
            })
            this.ws.send(JSON.stringify(reqPkg));
        });
    }

    handleEvent<U, T extends { new (...args: any[]): U }>(typeObj: T, cb: (pkg: RawPacket<any>) => void) {
        this.openEventCallbacks.push({
            id: typeObj.name,
            cb: cb
        });
    }
}

export interface BackendState {
    isConnectedToP2P: boolean;
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

    async transceive(data: PacketContent): Promise<any> {
        return new Promise((res, rej) => {
            this.lastRequestId = this.incReqId++;
            let reqPkg: RawPacket<any> = {
                requestId: this.lastRequestId,
                type: data.getType(),
                data: data
            };
            this.openResponsesCallbacks.push({
                id: this.lastRequestId,
                cb: (responsePkg) => {
                    res(responsePkg);
                }
            })
            console.log("ManualBackend | " + JSON.stringify(reqPkg));
        });
    }

    reply(data: PacketContent) {
        this.$handleMessage({
            requestId: this.lastRequestId,
            responseId: this.incRespId,
            data: data,
            type: data.getType()
        });
    }
}