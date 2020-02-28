export interface Goal {
    uid?: string;
    uidUser: string;
    value: number;
    dateLimit: Date;
    description?: string;
    type: 'Buy' | 'Travel' | 'Do' | 'Save';
    createAt?: any;
}
