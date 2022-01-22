import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver) { }
    private closeSub: Subscription;
  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    let authObs: Observable<AuthResponseData>;

    if(!form.valid) return;
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    }else {
      authObs = this.authService.signup(email, password);
    }
    authObs.subscribe(
      response => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error => {
        this.error = error;
        this.showErrorAlert(error);
        this.isLoading = false;
      }
    );

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string){
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(()=>{ 
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

ngOnDestroy(){
  if(this.closeSub){
    this.closeSub.unsubscribe();
  }
}

}
