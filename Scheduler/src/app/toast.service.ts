import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService 
{
  constructor(private toast: ToastController) { }
  
  private fancyToast: any;

  ShowToast(message) 
  {
    this.fancyToast = this.toast.create
    ({
      message: message,
      duration: 1500
    }).then((toastData) => toastData.present()); 
  }
}
