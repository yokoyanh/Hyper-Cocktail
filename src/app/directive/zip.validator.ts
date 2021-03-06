// 勉強用
import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[myZip][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: ZipValidator, multi: true }
    ]
})

export class ZipValidator implements Validator {

    validate(c: AbstractControl): { [key: string]: any } {
        return /^[0-9]{3}-[0-9]{4}$/.test(c.value) ? null : { zip: true };
    }

}
