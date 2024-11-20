export interface Meetings {
    id:   string;
    data: Datum[];
}

export interface Datum {
    creation_date: any;
    percentage:    number;
    id_user:       string;
    latitude:      number;
    longitude:      number;
}
