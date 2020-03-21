

export type Packet<T> = PacketHeader & T;

export interface PacketHeader {
    requestId?: number;
    responseId?: number;
    type: string;
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

/*export class PacketContent {
    getType(): string {
        return this.constructor.name;
    }
}*/

export interface PeerInformation { 
    name: string;
    address: string;
    port: number;
}


export class ProvideMedRessourceRequest implements PacketHeader {
    requestId?: number | undefined;
    responseId?: number | undefined;
    type = "ProvideMedRessourceRequest";
    constructor(
        public ressource: MedRessource
    ) {}
}
export class ProvideMedRessourceResponse implements PacketHeader {
    requestId?: number | undefined;
    responseId?: number | undefined;
    type = "ProvideMedRessourceResponse";
    constructor(
        public success: boolean
    ) {}
}

export class SearchMedRessourceRequest implements PacketHeader {
    requestId?: number | undefined;
    responseId?: number | undefined;
    type = "SearchMedRessourceRequest";
    constructor(
        public keywords: string[]
    ) {}
}
export class SearchMedRessourceResponse implements PacketHeader {
    requestId?: number | undefined;
    responseId?: number | undefined;
    type = "SearchMedRessourceResponse";
    constructor(
        public ressources: MedRessource[]
    ) {}
}

export class RequestMedRessourceRequest implements PacketHeader {
    requestId?: number | undefined;
    responseId?: number | undefined;
    type = "RequestMedRessourceRequest";
    constructor(
        public ressourceUuid: string
    ) {}
}
export class RequestMedRessourceResponse implements PacketHeader {
    requestId?: number | undefined;
    responseId?: number | undefined;
    type = "RequestMedRessourceResponse";
    constructor(
        public accepted: boolean,
        public additionalInformation: string
    ) {}
}

export class BackendStateRequest implements PacketHeader {
    requestId?: number | undefined;
    responseId?: number | undefined;
    type = "BackendStateRequest";
}
export class BackendStateResponse implements PacketHeader {
    requestId?: number | undefined;
    responseId?: number | undefined;
    type = "BackendStateResponse";
    constructor(
        public ownItems: MedRessource[]
    ) {}
}

export class ChangeMedRessourceRequest implements PacketHeader {
    requestId?: number | undefined;
    responseId?: number | undefined;
    type = "ChangeMedRessourceRequest";
    constructor(
        public ressourceUuid: string,
        public remove: boolean,
        public editedRessource?: MedRessource
    ) {}
}
export class ChangeMedRessourceResponse implements PacketHeader {
    requestId?: number | undefined;
    responseId?: number | undefined;
    type = "ChangeMedRessourceResponse";
}

export class IncommingMedRessourceRequest implements PacketHeader {
    requestId?: number | undefined;
    responseId?: number | undefined;
    type = "IncommingMedRessourceRequest";
    constructor(
        public ressource: MedRessource
    ) {}
}
export class IncommingMedRessourceResponse implements PacketHeader {
    requestId?: number | undefined;
    responseId?: number | undefined;
    type = "IncommingMedRessourceResponse";
    constructor(
        public accepted: boolean,
        public additionalInformation: string
    ) {}
}