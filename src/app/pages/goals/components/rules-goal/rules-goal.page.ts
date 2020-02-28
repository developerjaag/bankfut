// core and third party libraries
import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';

// rxjs
import { Subject, Observable } from 'rxjs';
import { tap, take, filter, takeUntil, debounceTime } from 'rxjs/operators';

// states
import { RuleState } from '@store/states/rules.state';

// actions
import { activeLoading, clearMessageToast, addMessageToast } from '@store/actions/ui/ui.actions';
import { requestEditOneRule, requestAddOneRule } from '@store/actions/rules/rules.actions';
import { requestEditOneGoal } from '@store/actions/goals/goals.actions';

// selectors
import { getLoading, getToast } from '@store/selectors/ui.selectors';
import { getAllTeams } from '@store/selectors/teams.selectors';
import { getRulesByGoal, getRulesByGoalTeamAndEvent } from '@store/selectors/rules.selectors';


// models
import { Goal } from '@models/goal.model';
import { Team } from '@models/team.model';
import { Rule } from '@models/rule.model';
import { Toast } from '@models/toast.model';

// services
import { NotificationsService } from '@services/notifications.service';

// components



@Component({
  selector: 'app-rules-goal',
  templateUrl: './rules-goal.page.html',
  styleUrls: ['./rules-goal.page.scss'],
})
export class RulesGoalPage implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  form: FormGroup;
  currentGoal: Goal;

  segment = 'Goal';

  teams$: Observable<Team[]>;
  rules$: Observable<Rule[]>;
  countRules = 0;
  loading$: Observable<boolean>;
  toast$: Observable<Toast>;
  valueTeam: Team;

  @Input()
  set goal(data: Goal) {
    if (data) {
      this.currentGoal = data;
      this.uidGoalField.setValue(this.currentGoal.uid);
      this.uidProfileField.setValue(this.currentGoal.uidUser);
      this.initListenRules(data.uid);
    }
  }

  constructor(
    private store: Store<RuleState>,
    private formBuilder: FormBuilder,
    public notificationsService: NotificationsService,
    public changeDetectorRef: ChangeDetectorRef
  ) {
    this.buildForm();
    this.loading$ = this.store.pipe(select(getLoading));
    this.toast$ = this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(getToast),
      filter(error => error !== null)
    );
    this.teams$ = this.store.pipe(
      select(getAllTeams)
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
  }

  initListenRules(uidGoal: string) {
    this.rules$ = this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(getRulesByGoal, { uidGoal }),
      filter(error => error !== null)
    );
    this.rules$.subscribe(value => {
      if (value) {
        this.countRules = value.length;
      }
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      uid: [],
      uidGoal: [],
      uidProfile: [],
      team: ['', [Validators.required]],
      event: ['', [Validators.required]],
      valueToSave: ['', [Validators.required]]
    });

    this.valueToSaveField.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {
      if (value && value <= 0) {
        this.valueToSaveField.markAsDirty();
      } else {
        this.valueToSaveField.markAsPristine();
      }
    });
  }


  get uidField() {
    return this.form.get('uid');
  }
  get uidGoalField() {
    return this.form.get('uidGoal');
  }
  get uidProfileField() {
    return this.form.get('uidProfile');
  }
  get teamField() {
    return this.form.get('team');
  }
  get eventField() {
    return this.form.get('event');
  }
  get valueToSaveField() {
    return this.form.get('valueToSave');
  }

  editRule(rule: Rule) {
    this.uidField.setValue(rule.uid);
    this.teamField.setValue(rule.team);
    this.eventField.setValue(rule.event);
    this.valueToSaveField.setValue(rule.valueToSave);
    this.valueTeam = rule.team;
  }

  save() {
    if (this.form.valid) {
      const uidGoal = this.uidGoalField.value;
      const teamId = this.teamField.value.id;
      const event = this.eventField.value;


      if (this.uidField.value) {
        this.dispatchLoading();
        this.dispatchEditRule(this.form.value);
        this.clearForm();
      } else {
        this.store.pipe(
          takeUntil(this.unsubscribe$),
          select(getRulesByGoalTeamAndEvent, { uidGoal, teamId, event }),
          take(1)
        ).subscribe(result => {
          if (!result) {
            this.dispatchLoading();
            this.dispatchNewRule(this.form.value);
            this.clearForm();
          } else {
            this.addMessageToasDanger();
          }
        });
      }


    }
  }

  addMessageToasDanger() {
    const action = addMessageToast({ message: 'Ya tienes esa regla creada', status: 'danger' });
    this.store.dispatch(action);
  }

  clearForm() {
    this.teamField.setValue('');
    this.eventField.setValue('');
    this.valueToSaveField.setValue('');

    this.teamField.markAsPristine();
    this.eventField.markAsPristine();
    this.valueToSaveField.markAsPristine();
  }


  dispatchLoading() {
    const action = activeLoading();
    this.store.dispatch(action);
  }

  dispatchNewRule(rule: Rule) {
    const action = requestAddOneRule({ rule });
    this.store.dispatch(action);
    if (this.currentGoal && this.currentGoal.numberRules) {
      this.currentGoal.numberRules++;
    } else {
      this.currentGoal.numberRules = 1;
    }
    this.dispatchEditGoal();
  }

  dispatchEditGoal() {
    const action = requestEditOneGoal({ goal: this.currentGoal });
    this.store.dispatch(action);
  }

  dispatchEditRule(rule: Rule) {
    const action = requestEditOneRule({ rule });
    this.store.dispatch(action);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
