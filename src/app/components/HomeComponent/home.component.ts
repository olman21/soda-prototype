import { Component, OnInit } from '@angular/core';
import { AngularFire } from "angularfire2";

@Component({
    selector: 'home-component',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    constructor(private af: AngularFire) { }

    ngOnInit() {
        console.log(this.af);
     }
}