import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';


import { Observable, from } from 'rxjs';
import { Rule } from '@models/rule.model';


@Injectable({
    providedIn: 'root'
})
export class RuleService {

    constructor(
        private readonly afs: AngularFirestore
    ) { }

    getRules(uidUser: string): Observable<Rule[]> {
        return this.afs.collection<Rule>('Rules', ref => {
            return ref.where('uidProfile', '==', uidUser);
        }).valueChanges();
    }

    addRule(rule: Rule) {
        rule.uid = this.afs.createId();
        rule = this.clearRuleTeam(rule);
        const toReturn = this.afs.collection<Rule>(`Rules`).doc(rule.uid).set({
            ...rule
        });
        return from(toReturn);
    }

    updateRule(rule: Rule) {
        rule = this.clearRuleTeam(rule);
        const toReturn = this.afs.collection('Rules').doc(rule.uid).update({
            ...rule
        });
        return from(toReturn);
    }

    clearRuleTeam(rule: Rule) {
        for (const key in rule.team) {
            if (key !== 'id' && key !== 'shortName' && key !== 'name') {
                delete (rule.team[key]);
            }
        }
        return rule;
    }

}

