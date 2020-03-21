
export interface RawPacket<T> {
    requestId?: number;
    responseId?: number;
    type: string;
    data: T;
}

export interface MedRessource {
    uuid: string;
    title: string;
    amount: number;
    pzn: number;
    description: string;
    createdAt: Date;
    owner: PeerInformation;
}

export class PacketContent {

    getType(): string {
        return this.constructor.name;
    }
}

export interface PeerInformation { 
    name: string;
    address: string;
    port: number;
}

export class P2PConnectionRequest extends PacketContent {
    constructor(
        public usePeerStorage: boolean,
        public connectToPeer?: PeerInformation
    ) {super()}
}
export class P2PConnectionResponse extends PacketContent {
    constructor(
        public connected: boolean,
        public connectedPeerCount: number
    ) {super()}
}

export class ProvideMedRessourceRequest extends PacketContent {
    constructor(
        public ressource: MedRessource
    ) {super()}
}
export class ProvideMedRessourceResponse extends PacketContent {
    constructor(
        public success: boolean
    ) {super()}
}

export class SearchMedRessourceRequest extends PacketContent {
    constructor(
        public keywords: string[]
    ) {super()}
}
export class SearchMedRessourceResponse extends PacketContent {
    constructor(
        public ressources: MedRessource[]
    ) {super()}
}

export class RequestMedRessourceRequest extends PacketContent {
    constructor(
        public ressourceUuid: string
    ) {super()}
}
export class RequestMedRessourceResponse extends PacketContent {
    constructor(
        public accepted: boolean,
        public additionalInformation: string
    ) {super()}
}

export class BackendStateRequest extends PacketContent {}
export class BackendStateResponse extends PacketContent {
    constructor(
        public isConnectedToP2P: boolean,
        public ownItems: MedRessource[]
    ) {super()}
}

export class ChangeMedRessourceRequest extends PacketContent {
    constructor(
        public ressourceUuid: string,
        public remove: boolean,
        public editedRessource?: MedRessource
    ) {super()}
}
export class ChangeMedRessourceResponse extends PacketContent {}

export class IncommingMedRessourceRequest extends PacketContent {
    constructor(
        public ressource: MedRessource
    ) {super()}
}
export class IncommingMedRessourceResponse extends PacketContent {
    constructor(
        public accepted: boolean,
        public additionalInformation: string
    ) {super()}
}