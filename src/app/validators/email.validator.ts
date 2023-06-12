import {AbstractControl, AsyncValidatorFn} from "@angular/forms";
import {delay, map, Observable, of} from "rxjs";
import {TAKEN_EMAIL} from "../config";

type ValidationErrors = {
  [key: string]: any;
}

const takenEmails: string[] = [
  TAKEN_EMAIL
]
export function EmailValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.valueChanges || control.pristine) {
      return of(null);
    } else {
      return checkIfEmailExists(control.value).pipe(
        map(res => {
          return res ? { emailExists: true } : null;
        })
      );
    }
  };
}

function checkIfEmailExists(email: string): Observable<boolean> {
  return of(takenEmails.includes(email)).pipe(
    delay(2000),
  );
}
