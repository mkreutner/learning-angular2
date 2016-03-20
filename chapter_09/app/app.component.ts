import { Component } from 'angular2/core';
import { SHARED_PROVIDERS, SHARED_DIRECTIVES, AuthenticationService } from './shared/shared';
import { HTTP_PROVIDERS } from 'angular2/http';
import { ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES, Router } from 'angular2/router';
import { TimerComponent } from './timer/timer';
import { TasksComponent, TaskEditorComponent } from './tasks/tasks';
import { FORM_PROVIDERS } from 'angular2/common';
import { LoginComponent } from './login/login';
import { AnimationBuilder } from 'angular2/src/animate/animation_builder';

@Component({
  selector: 'pomodoro-app',
  directives: [ROUTER_DIRECTIVES, SHARED_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    FORM_PROVIDERS,
    SHARED_PROVIDERS,
    AnimationBuilder
  ],
  styles: [`
      .router-link-active {
          font-weight: bold;
          border-bottom: 2px #d9534f solid;
      }
  `],
  templateUrl: 'app/app.component.html'
})
@RouteConfig([
  { path: '',             name: 'Home',                 redirectTo: ['TasksComponent'] },
  { path: 'tasks',        name: 'TasksComponent',       component: TasksComponent, useAsDefault: true },
  { path: 'tasks/editor', name: 'TaskEditorComponent',  component: TaskEditorComponent },
  { path: 'timer/...',    name: 'TimerComponent',       component: TimerComponent },
  { path: 'login',        name: 'LoginComponent',       component: LoginComponent }
])
export default class AppComponent {
  userIsLogged: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) {
    authenticationService.userLoggedInStatus.subscribe(userIsloggedIn => {
      this.userIsLogged = userIsloggedIn;
    });
  }

  logout($event): void {
    $event.preventDefault();

    this.authenticationService.logout().then(success => {
      if (success) {
        this.router.navigateByUrl('/');
      }
    });
  }
}
