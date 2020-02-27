// core and third party libraries
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

// rxjs
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

// states
import { AuthState } from '@store/states/auth.state';

// actions
import { activeLoading, clearMessageToast } from '@store/actions/ui/ui.actions';
import { authRequestLoginGoogle } from '@store/actions/auth/auth.actions';

// selectors
import { getLoading, getToast } from '@store/selectors/ui.selectors';

// models
import { Toast } from '@models/toast.model';

// services
import { NotificationsService } from '@services/notifications.service';

// components



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  loading$: Observable<boolean>;
  loading: boolean;

  toast$: Observable<Toast>;

  constructor(
    private store: Store<AuthState>,
    public notificationsService: NotificationsService,
    private router: Router
  ) {
    this.loading$ = this.store.pipe(select(getLoading));
    this.toast$ = this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(getToast),
      filter(error => error !== null)
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
    this.loading$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(state => this.loading = state);
  }

  loginGoogle() {
    this.activeLoading();
    const action = authRequestLoginGoogle();
    this.store.dispatch(action);
  }

  activeLoading() {
    const action = activeLoading();
    this.store.dispatch(action);
  } // activeLoading

  showSlides() {
    this.router.navigate(['tutorial']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
