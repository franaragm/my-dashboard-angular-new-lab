import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true,
        // onViewTransitionCreated( transitionInfo ) {
        //   console.log({transitionInfo});
        // },
      }),
    ),
    // importación global de modulos como en appModule
    // importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptorsFromDi()), provideAnimationsAsync()
  ]
};
