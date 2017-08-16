import { ErrorToastService } from './../../services/error-toast.service';
import { AngularFire } from 'angularfire2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import * as moment from 'moment';

@Component({
    selector: 'reporte-component',
    templateUrl: 'reporte.component.html'
})

export class ReporteComponent implements OnInit {
    orders: any[];
    filteredOrders: any[];
    start: string = "";
    end: string = "";
    private dateFormat:string = 'DD/MM/YYYY';
    grandTotal: number = 0;
    constructor(private activateRoute: ActivatedRoute, private af: AngularFire, private toast: ErrorToastService) { }

    ngOnInit() {
        this.af.database.list('orders').subscribe(orders => this.orders = orders)
    }

    solicitarReporte() {
        let start = moment(this.start, this.dateFormat);
        let end = moment(this.end, this.dateFormat);;

        if (end.isBefore(start)) return this.toast.addToast('error', 'Error', 'Fechas invalidas');

        this.filterOrders();
    }

    private filterOrders() {
        let start = moment(this.start, this.dateFormat);
        let end = moment(this.end, this.dateFormat);
        this.filteredOrders = this.orders.filter(o => moment(o.date).isBetween(start, end));
        if(this.filteredOrders.length > 0)
            this.grandTotal = this.filteredOrders.map(o=>o.total).reduce((x,y)=> (x||0) + (y||0));
        else
            this.grandTotal = 0;

    }
}