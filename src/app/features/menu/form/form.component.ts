import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  constructor(private fb: FormBuilder) {}


  dummyIngredients = [
    {
    id: 1,
    name: 'tomato',
  },
  {
    id: 2,
    name: 'tomato',
  },
  {
    id: 3,
    name: 'tomato',
  },

] as const;

showErrors = false;

  menuForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [null, Validators.required],
    protien: [null, Validators.required],
    fat: [null, Validators.required],
    energy: [null, Validators.required],
    carbs: [null, Validators.required],
    calories: [null, Validators.required],
    ingredients: [[], Validators.required],
  });

  get menuFormControls() {
    return this.menuForm.controls;
  }

  handleSubmit() {
    this.showErrors = true;
    console.log(this.menuForm.value, "form value");
  }


}
