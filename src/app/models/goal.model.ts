export interface Goal {
    uid?: string;
    uidUser: string;
    value: number;
    dateLimit: Date;
    description?: string;
    numberRules?: number;
    totalSaved?: number;
    type: 'Buy' | 'Travel' | 'Do' | 'Save';
    createAt?: any;
}
