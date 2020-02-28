// core and third party libraries
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';


// rxjs
import { Subject, Observable, combineLatest } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

// states
import { GoalState } from '@store/states/goals.state';

// actions
import { authLogOut } from '@store/actions/auth/auth.actions';


// selectors
import { getLoading, getToast } from '@store/selectors/ui.selectors';
import { getProfile } from '@store/selectors/auth.selectors';
import { getAllGoals } from '@store/selectors/goals.selectors';
import { getAllRules } from '@store/selectors/rules.selectors';
import { getAllMatches } from '@store/selectors/matches.selectors';

// models
import { Toast } from '@models/toast.model';
import { Profile } from '@models/profile.model';
import { Goal } from '@models/goal.model';
import { Rule } from '@models/rule.model';
import { Match } from '@models/match.model';

// services
import { NotificationsService } from '@services/notifications.service';

// components


@Component({
  selector: 'app-simulator',
  templateUrl: 'simulator.page.html',
  styleUrls: ['simulator.page.scss']
})
export class SimulatorPage implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  loading$: Observable<boolean>;
  toast$: Observable<Toast>;
  profile$: Observable<Profile>;
  goals: Goal[];
  rules: Rule[];
  matches: Match[];


  constructor(
    private store: Store<GoalState>,
    public notificationsService: NotificationsService,
    public alertController: AlertController
  ) {
    this.loading$ = this.store.pipe(select(getLoading));
    this.toast$ = this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(getToast),
      filter(error => error !== null)
    );
    this.profile$ = this.store.pipe(
      select(getProfile)
    );
    // tslint:disable-next-line: deprecation
    combineLatest(
      this.store.pipe(takeUntil(this.unsubscribe$), select(getAllGoals)),
      this.store.pipe(takeUntil(this.unsubscribe$), select(getAllRules)),
      this.store.pipe(takeUntil(this.unsubscribe$), select(getAllMatches))
    ).subscribe(data => {
      this.goals = data[0];
      this.rules = data[1];
      this.matches = data[2];
    });

  }

  sumRule(rule: Rule, toAdd: number) {
    if (rule.totalSaved) {
      rule.totalSaved = rule.totalSaved + toAdd;
    } else {
      rule.totalSaved = toAdd;
    }
  }

  ngOnInit() {

    this.toast$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(toast => {
      if (toast.message != null) {
        this.notificationsService.showToast(toast.message, toast.status);
      }
    });

  }

  filterRulesByGoal(uidGoal: string) {
    return this.rules.filter(rule => rule.uidGoal === uidGoal);
  }

  filterMatchByTeam(idTeam: number) {
    return this.matches.filter(match => {
      return match.awayTeam.id === idTeam || match.homeTeam.id === idTeam;
    });
  }


  async presentAlertLogout() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión?',
      cssClass: 'ion-text-center',
      buttons: [
        {
          text: 'Continuar',
          role: 'cancel'
        }, {
          text: 'Salir',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  logout() {
    const action = authLogOut();
    this.store.dispatch(action);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
