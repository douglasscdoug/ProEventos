import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export class ValidatorField {

  static MustMatch(controlName: string, matchingControlName: string): ValidatorFn {

    return (group: AbstractControl): ValidationErrors | null => {

      const formGroup = group as FormGroup;

      const password = formGroup.get(controlName)?.value;
      const confirmPassword = formGroup.get(matchingControlName)?.value;

      // Perfil: ambos vazios
      if (!password && !confirmPassword) {
        return null;
      }

      // Apenas um preenchido
      if (!password || !confirmPassword) {
        return { mustMatch: true };
      }

      // Diferentes
      if (password !== confirmPassword) {
        return { mustMatch: true };
      }

      return null;
    };
  }
}