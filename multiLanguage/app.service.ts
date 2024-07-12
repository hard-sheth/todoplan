import { Injectable } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class AppService {
  constructor(private readonly i18n: I18nService) {}
  getHello(): string {
    const helloen = this.i18n.t('test.HELLO', {
      lang: I18nContext.current().lang,
    });
    const hellohin = this.i18n.t('test.HELLO', { lang: 'hi' }); //In different languages hindi language for different files like test.json, HELLO is the key 
    const helloguj = this.i18n.t('test.HELLO', { lang: 'guj' }); //In different languages gujarati language for different files like test.json, HELLO is the key 
    const welcomeName = this.i18n.t('test.WELCOME', {
      args: { name: 'હાર્દ શેઠ' },
      lang: 'guj',
    }); //In different languages gujarati language for different files like test.json, WELCOME is the key. In the value we want to add/pass the some value in arguments with some key.
    return welcomeName;
  }
}
