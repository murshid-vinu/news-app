import { AbstractControl, ValidatorFn } from '@angular/forms';

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
	return (control: AbstractControl): {[key: string]: any} | null => {
		const data = control.value;
		if(data){
			if(data[0] == ' '){
				return {'forbiddenName': {value: control.value}} 
			}
		}
	  	return null;
	};
}