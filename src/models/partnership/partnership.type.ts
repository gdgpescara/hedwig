type Partner = {
    id: string;
    name: string;
    logo: string;
    position: number;
    link: string;
};

type Partnership = {
    id: string;
    name: string;
    position: number;
    partners: Partner[];
};

type PartnershipDoc = {
        id: string;
        name: string;
        position: number;
};

export type { Partner, Partnership, PartnershipDoc}
