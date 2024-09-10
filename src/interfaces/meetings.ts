export interface Meetings {
    id:   string;
    data: Datum[];
}

export interface Datum {
    creation_date: string;
    percentage:    number;
    id_user:       string;
    location:      string;
}
