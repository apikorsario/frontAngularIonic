import { NavController, ToastController } from '@ionic/angular';
import { HapticsModel } from './haptics.model';

export abstract class ToastModel {
    private static _toastCtrl = new ToastController()

    static async showSuccess(message: string) {
        let toast = await this._toastCtrl.create({
            message: message,
            duration: 2000,
            color: 'success',
            cssClass: 'capitalize'
        });
        toast.present();
        HapticsModel.light()
    }

    static async showError(message: string) {
        let toast = await this._toastCtrl.create({
            message: message,
            duration: 2000,
            color: 'danger',
            cssClass: 'capitalize'
        });
        toast.present();
        HapticsModel.light()
    }
}