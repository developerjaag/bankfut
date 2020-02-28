// core and third party libraries
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

import { Store, select } from '@ngrx/store';

// rxjs
import { Subject, Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

// states
import { GoalState } from '@store/states/goals.state';

// actions
import { activeLoading, clearMessageToast } from '@store/actions/ui/ui.actions';
import { requestAddOneGoal, requestEditOneGoal } from '@store/actions/goals/goals.actions';
import { authLogOut } from '@store/actions/auth/auth.actions';

// selectors
import { getLoading, getToast } from '@store/selectors/ui.selectors';
import { getProfile } from '@store/selectors/auth.selectors';
import { getAllGoals } from '@store/selectors/goals.selectors';

// models
import { Toast } from '@models/toast.model';
import { Profile } from '@models/profile.model';
import { Goal } from '@models/goal.model';

// services
import { NotificationsService } from '@services/notifications.service';

// components
import { NewEditGoalPage } from './components/new-edit-goal/new-edit-goal.page';



@Component({
  selector: 'app-goals',
  templateUrl: 'goals.page.html',
  styleUrls: ['goals.page.scss']
})
export class GoalsPage implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  goals$: Observable<Goal[]>;
  loading$: Observable<boolean>;
  toast$: Observable<Toast>;
  profile$: Observable<Profile>;
  user: Profile;

  constructor(
    private store: Store<GoalState>,
    public notificationsService: NotificationsService,
    public modalController: ModalController,
    public alertController: AlertController
  ) {
    this.loading$ = this.store.pipe(select(getLoading));
    this.toast$ = this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(getToast),
      filter(error => error !== null)
    );
    this.goals$ = this.store.pipe(
      select(getAllGoals)
    );
    this.profile$ = this.store.pipe(
      select(getProfile)
    );
  }

  ngOnInit() {

    this.toast$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(toast => {
      if (toast.message != null) {
        const close = () => {
          const action = clearMessageToast();
          this.store.dispatch(action);
        };
        this.notificationsService.showToast(toast.message, toast.status, close);
      }
    });

    this.profile$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(profile => {
      if (profile != null) {
        this.user = profile;
      }
    });

  }

  async presentModalNewGoal() {
    const modal = await this.modalController.create({
      component: NewEditGoalPage
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data) {
      data.uidUser = this.user.uid;
      this.dispatchLoading();
      this.dispatchNewGoal(data);
    }
  }

  async presentModalEditGoal(goal: Goal) {
    const modal = await this.modalController.create({
      component: NewEditGoalPage,
      componentProps: {
        goal
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      if (data.numberRules) {
        delete data.numberRules;
      }
      this.dispatchLoading();
      this.dispatchEditGoal(data);
    }

  }

  dispatchLoading() {
    const action = activeLoading();
    this.store.dispatch(action);
  }

  dispatchNewGoal(goal: Goal) {
    const action = requestAddOneGoal({ goal });
    this.store.dispatch(action);
  }

  dispatchEditGoal(goal: Goal) {
    const action = requestEditOneGoal({ goal });
    this.store.dispatch(action);
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
