import { AngularFire } from 'angularfire2';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorToastService } from "../../services/error-toast.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    constructor(private af: AngularFire, private router: Router, private toast: ErrorToastService) { }
    username: string;
    password: string;
    error: boolean;
    subscription: Subscription;
    users: any[];

    ngOnInit() {

    }

    login() {
        if (!this.users) {
            this.subscription = this.af.database.list('users').subscribe(users => {
                this.users = users;
                console.log(this.users[0]);
                this.validateLogin();
            });
        }
        else{
            this.validateLogin();
        }
    }

    private validateLogin() {
        console.log(this.username, this.password);
        let user = this.users.find(x => x.username == this.username && x.password == this.password);
        if (user && user.username){
            localStorage.setItem('userData', JSON.stringify(user));
            this.router.navigate(['/facturar']);
        }
        else
            this.toast.addToast('error', 'Datos Invalidos', 'Usuario y/o contraseña invalido(s).');
    }


}