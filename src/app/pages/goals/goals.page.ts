// core and third party libraries
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';

// rxjs
import { Subject, Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

// states

// actions

// selectors

// models

// services

// components



@Component({
  selector: 'app-goals',
  templateUrl: 'goals.page.html',
  styleUrls: ['goals.page.scss']
})
export class GoalsPage implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  constructor() { }

  ngOnInit() {

    this.toast$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(toast => {
      if (toast.message != null) {
        this.notificationsService.showToast(toast.message, toast.status);
      }
    });

    this.store.pipe(
      select(getProfile)
    ).pipe(
      filter(profile => !!profile),
      takeUntil(this.unsubscribe$) // unsubscribe to prevent memory leak
    ).subscribe((profile) => {
      this.user = profile;
      this.changeDetectorRef.markForCheck();
    });

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
