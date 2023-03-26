import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';

function initialize(service: AuthService): () => Promise<any> {
  return () => service.initialize();
}

@NgModule({
  imports: [HttpClientModule],
  providers: [
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initialize,
      deps: [AuthService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}
