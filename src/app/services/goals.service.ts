import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';


import { Observable, from } from 'rxjs';
import { Goal } from '@models/goal.model';


@Injectable({
    providedIn: 'root'
})
export class GoalService {

    constructor(
        private readonly afs: AngularFirestore
    ) { }

    getGoals(uidUser: string): Observable<Goal[]> {
        return this.afs.collection<Goal>('Goals', ref => {
            return ref.where('uidUser', '==', uidUser).orderBy('createAt', 'desc');
        }).valueChanges();
    }

    addGoal(goal: Goal) {
        goal.uid = this.afs.createId();
        goal.createAt = firebase.firestore.FieldValue.serverTimestamp();
        const toReturn = this.afs.collection<Goal>(`Goals`).doc(goal.uid).set({
            ...goal
        });
        return from(toReturn);
    }

}

