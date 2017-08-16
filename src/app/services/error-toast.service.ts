import { Injectable } from '@angular/core';
import { ToastyService, ToastOptions, ToastData } from "ng2-toasty";

@Injectable()
export class ErrorToastService {

    constructor(private toastyService:ToastyService) { }

      addToast(type, title, message) {
        // Or create the instance of ToastOptions
        var toastOptions:ToastOptions = {
            title: title,
            msg: message,
            showClose: true,
            timeout: 5000
        };

        switch(type){
            case 'info':
                this.toastyService.info(toastOptions);
                break;
            case 'success':
                this.toastyService.success(toastOptions);
                break;
            case 'wait':
                this.toastyService.wait(toastOptions);
                break;
            case 'error':
                this.toastyService.error(toastOptions);
                break;
            case 'warning':
                this.toastyService.warning(toastOptions);
                break;

        }
    }
}