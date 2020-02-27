export interface Goal {
    uid?: string;
    uidUser: string;
    value: number;
    dateLimit: Date;
    type: 'Buy' | 'Travel' | 'Do' | 'Save';
    createAt?: any;
}
