import { AbstractControl, ValidationErrors } from "@angular/forms";

export function phoneValidator(control: AbstractControl): ValidationErrors | null {
    const numeros = (control.value || '').replace(/\D/g, '');

    if (!numeros) return null;

    if (numeros.length !== 10 && numeros.length !== 11) {
        return { phoneInvalid: true };
    }

    return null;
}