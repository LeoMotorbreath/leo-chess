import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


const gc = {
  assets: 'assets/svgs/'
};
if (environment.production) {
  enableProdMode();
}
Array.prototype.flat = function<U>(): U[] {
  return this.reduce((acc, value) => acc.concat(value));
};

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
