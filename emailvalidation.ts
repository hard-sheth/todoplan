import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'isDesposableMail', async: true })
export class IsValidEmailConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    console.log(value, 'value', args, 'args');
    const checkDisposable =await axios.get(
      `https://disposable.debounce.io/?email=${value}`,
    );
    const responseApi = checkDisposable.data;
    let disposableEmail:boolean;
    if(responseApi.disposable){
      disposableEmail = responseApi.disposable == 'true' ? true :responseApi.disposable == 'false' ? false : false ;      
    }
    console.log(responseApi,'responseApi',disposableEmail,Boolean(`${responseApi.disposable}`),responseApi.disposable, typeof responseApi.disposable);
    
    // return !Boolean(responseApi.disposable);
    return !disposableEmail;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email is desposable';
  }
}
