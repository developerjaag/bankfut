import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { debounceTime } from 'rxjs/operators';


import { addDays, format } from 'date-fns';


@Component({
  selector: 'app-new-goal',
  templateUrl: './new-goal.page.html',
  styleUrls: ['./new-goal.page.scss'],
})
export class NewGoalPage implements OnInit {

  form: FormGroup;

  minDate = format(addDays(new Date(), 30), 'yyyy-LL-dd');

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
      value: ['', [Validators.required]],
      dateLimit: ['', [Validators.required]],
      description: [''],
      type: ['', [Validators.required]]
    });

    this.valueField.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {
      if (value <= 0) {
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
