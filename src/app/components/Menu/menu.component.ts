import { Subscription } from 'rxjs/Subscription';
import { AngularFire } from 'angularfire2';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'menu-component',
    templateUrl: 'menu.component.html'
})

export class MenuComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    @Input() modal: boolean = false;
    @Output() selectItemAction: EventEmitter<any> = new EventEmitter<any>();
    ngOnDestroy(): void {
         this.subscription.unsubscribe();
    }
    constructor(private af: AngularFire) { }
    products: any[];

    ngOnInit() { 
        this.subscription = this.af.database.list('products').subscribe(products=> this.products = products);
    }

    selectItem(item: any){
        if(item.newQty == null || item.newQty == undefined) return;
        item.total = item.price * item.newQty;
        item.qty = item.newQty;
        this.selectItemAction.emit(item);
    }
    
}