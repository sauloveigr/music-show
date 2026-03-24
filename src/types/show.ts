export interface Show {
    id: string;
    title: string;
    venue: string;
    date: string;
    time: string;
    fee: number;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ShowFormData {
    title: string;
    venue: string;
    date: string;
    time: string;
    fee: number;
    notes?: string;
}
