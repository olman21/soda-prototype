import { ActivatedRoute } from '@angular/router';
import { ErrorToastService } from './../../services/error-toast.service';
import { AngularFire } from 'angularfire2';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from "angular2-materialize";

@Component({
    selector: 'facturacion-component',
    templateUrl: 'facturacion.component.html'
})

export class FacturacionComponent implements OnInit {
    constructor(private af: AngularFire, private toast: ErrorToastService, private activatedRoute: ActivatedRoute) { }

    products: any[] = [];
    grandTotal: number = 0;
    readonly: boolean = false;
    orderId: number;

    modalActions = new EventEmitter<string | MaterializeAction>();

    ngOnInit() {
        this.activatedRoute.params.subscribe(params=>{
            let orderId = params['id'];
            if(orderId){
                this.af.database.object(`orders/${orderId}`).subscribe(order=> {
                this.products = order.products;
                this.grandTotal = order.total;
                this.readonly = true;
                this.orderId = orderId;
            });
            }
        });
    }

    closeModal(){
        this.modalActions.emit({ action: "modal", params: ['close'] });
    }

    openModal(){
         this.modalActions.emit({ action: "modal", params: ['open'] });
    }

    selectProduct(product){
        this.products.push(product);
        this.calculateTotal();
    }

    calculateItemTotal(product, qty){
        product.total = product.price * qty;
        this.calculateTotal();
    }

    saveOrder(){
        let user = JSON.parse(localStorage.getItem('userData'));
        let orderProducts = this.products.map(p=> { return { description: p.description, qty: p.qty, price: p.price, total: p.total } });
        let order = {
            date: new Date().toString(),
            total: this.grandTotal,
            products: orderProducts,
            productCurrentId: this.products.length,
            madeFor: user.username
        }

        let subs = this.af.database.object("orderCurrentId").subscribe(id=>{
            let newId = id.$value;
            this.af.database.object(`orders/${newId}`).set(order).then(()=> this.toast.addToast('success','Exito', 'Orden salvada satisfactoriamente'));
            this.af.database.object("orderCurrentId").set(newId+1);
            subs.unsubscribe();
        });

       
    }

    removeProduct(idx){
        this.products.splice(idx,1);
    }

    private calculateTotal(){
        this.grandTotal = this.products.map(p=>p.total).reduce((x,y)=> (x||0)+(y||0));
    }
}