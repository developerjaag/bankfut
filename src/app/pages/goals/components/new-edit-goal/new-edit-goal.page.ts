// core and third party libraries
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { addDays, format } from 'date-fns';

// rxjs
import { debounceTime } from 'rxjs/operators';

// states

// actions

// selectors

// models
import { Goal } from '@models/goal.model';

// services

// components



@Component({
  selector: 'app-new-edit-goal',
  templateUrl: './new-edit-goal.page.html',
  styleUrls: ['./new-edit-goal.page.scss'],
})
export class NewEditGoalPage implements OnInit {

  form: FormGroup;
  minDate = format(addDays(new Date(), 30), 'yyyy-LL-dd');
  currentGoal: Goal;

  segment = 'Goal';

  @Input()
  set goal(data: Goal) {
    if (data) {
      this.currentGoal = data;
      this.form.patchValue(data);
    }
  }

  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  buildForm() {
    this.form = this.formBuilder.group({
      uid: [],
      uidUser: [],
      numberRules: [0],
      value: ['', [Validators.required]],
      dateLimit: ['', [Validators.required]],
      description: [''],
      type: ['', [Validators.required]]
    });

    this.valueField.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {
      if (value && value <= 0) {
        this.valueField.markAsDirty();
      } else {
        this.valueField.markAsPristine();
      }
    });
  }

  save() {
    if (this.form.valid) {
      this.modalController.dismiss(this.form.value);
    }
  }

  get valueField() {
    return this.form.get('value');
  }

  close() {
    this.modalController.dismiss();
  }

}
