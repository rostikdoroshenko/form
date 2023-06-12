import {Component, OnInit} from '@angular/core';
import {IDev, IFramework, IHobby} from "../../interfaces/form";
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {EmailValidator} from "../../validators/email.validator";
import {
  DATE_OF_BIRTH,
  EMAIL,
  EMAIL_ERROR,
  FIRST_NAME,
  FRAMEWORK,
  FRAMEWORK_VERSION,
  FRAMEWORKS,
  HOBBY,
  HOBBY_DURATION,
  HOBBY_NAME,
  LAST_NAME
} from "../../config";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  protected readonly FIRST_NAME = FIRST_NAME;
  protected readonly LAST_NAME = LAST_NAME;
  protected readonly DATE_OF_BIRTH = DATE_OF_BIRTH;
  protected readonly FRAMEWORK = FRAMEWORK;
  protected readonly FRAMEWORK_VERSION = FRAMEWORK_VERSION;
  protected readonly EMAIL = EMAIL;
  protected readonly HOBBY = HOBBY;
  protected readonly HOBBY_NAME = HOBBY_NAME;
  protected readonly HOBBY_DURATION = HOBBY_DURATION;
  protected readonly EMAIL_ERROR = EMAIL_ERROR;

  formGroup!: FormGroup;
  frameworks = FRAMEWORKS;
  activeFramework?: IFramework;

  get hobbyControls(): AbstractControl[] {
    return (this.formGroup.controls[HOBBY] as FormArray).controls;
  }

  get newHobbyFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.formGroup = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      framework: new FormControl(null, Validators.required),
      frameworkVersion: new FormControl({value: null, disabled: !this.activeFramework}, Validators.required),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
        asyncValidators: [EmailValidator()],
      }),
      hobby: new FormArray([
        this.newHobbyFormGroup
      ])
    })
  }

  select(value: string): void {
    this.activeFramework = this.frameworks.find(fr => fr.name === value);
    this.formGroup.controls[FRAMEWORK_VERSION].enable();
  }

  addHobby(): void {
    const hobbies = this.formGroup.controls[HOBBY] as FormArray;
    hobbies.push(this.newHobbyFormGroup);
  }

  submit(): void {
    const date = this.formGroup.controls[DATE_OF_BIRTH].value as Date;
    const formattedDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;

    const formattedHobby: IHobby[] = [...this.formGroup.controls[HOBBY].value]
      .map((hobby : {name: string, duration: number}) => ({
        name: hobby.name,
        duration: `${hobby.duration} month`
      }))

    const newDev: IDev = {
      firstName: this.formGroup.controls[FIRST_NAME].value,
      lastName: this.formGroup.controls[LAST_NAME].value,
      dateOfBirth: formattedDate,
      email: this.formGroup.controls[EMAIL].value,
      framework: this.formGroup.controls[FRAMEWORK].value,
      frameworkVersion: this.formGroup.controls[FRAMEWORK_VERSION].value,
      hobby: formattedHobby,
    }
    console.log(newDev);
    this.formGroup.reset();
    this.initForm();
  }
}
