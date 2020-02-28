// core and third party libraries
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';

// rxjs
import { Subject, Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

// states
import { GoalState } from '@store/states/goals.state';

// actions
import { activeLoading } from '@store/actions/ui/ui.actions';
import { requestAddOneGoal } from '@store/actions/goals/goals.actions';

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
import { NewGoalPage } from './components/new-goal/new-goal.page';



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

  constructor(
    private store: Store<GoalState>,
    public notificationsService: NotificationsService,
    public modalController: ModalController
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
        this.notificationsService.showToast(toast.message, toast.status);
      }
    });

  }

  async presentModalNewGoal() {
    const modal = await this.modalController.create({
      component: NewGoalPage
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data) {
      this.dispatchLoading();
      this.dispatchNewGoal(data);
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
