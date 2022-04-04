import { AbstractControl, ValidatorFn } from '@angular/forms';



export class CaracteresValidator {



static longueurMinimum(min: number): ValidatorFn {
return (c: AbstractControl): { [key: string]: boolean } | null => {



if (c.value && c.value.toString().trim().length >= min) {
return null ;
}
return { 'nbreCaracteresInsuffisant': true };
};
}
}