// core and third party libraries
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';
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
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  @ViewChild('slides', { static: true }) slides: IonSlides;
  slideOpts = {
    speed: 400
  };

  loading$: Observable<boolean>;
  loading: boolean;
  toast$: Observable<Toast>;

  constructor(
    private store: Store<AuthState>,
    private storage: Storage,
    private router: Router,
    public notificationsService: NotificationsService
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

  goToLastSlide() {
    this.slides.slideTo(4);
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

  finishTutorial() {
    // this.storage.set('tutorial', true);
    this.router.navigate(['tabs']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
