// core and third party libraries
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';

// rxjs
import { Subject, Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

// states
import { GoalState } from '@store/states/goals.state';

// actions

// selectors
import { getLoading, getToast } from '@store/selectors/ui.selectors';
import { getProfile } from '@store/selectors/auth.selectors';

// models
import { Toast } from '@models/toast.model';
import { Profile } from '@models/profile.model';

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

  constructor(
    private store: Store<GoalState>,
    public notificationsService: NotificationsService
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
