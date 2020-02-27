import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';


@Injectable({
    providedIn: 'root'
})
export class NotificationsService {

    loading: any;

    constructor(
        public toastController: ToastController,
        public loadingController: LoadingController
    ) { }

    async showToast(message: string, status: string, callback?: () => void) {
        const toast = await this.toastController.create({
            message,
            color: status,
            cssClass: 'ion-text-center',
            duration: 2000
        });
        toast.present();

        if (callback) {
            toast.onDidDismiss().then(() => {
                callback();
            });
        }
    }

    async presentLoading(message) {
        if (!this.loading) {
            this.loading = await this.loadingController.create({
                message
            });
            await this.loading.present();
        }
    }

    closeLoading() {
        if (this.loading) {
            this.loading.dismiss();
        }
        this.loading = null;
    }

}
