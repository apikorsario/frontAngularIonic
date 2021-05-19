import { AlertController } from "@ionic/angular";

export abstract class ConfirmModel {

    public static async show(message: string) {
        let alert = await new AlertController().create({
            message,
            cssClass: 'capitalize',
            buttons: [ { text: 'Ok', role: 'ok' } ]
        });
        await alert.present();
        let res = await alert.onWillDismiss();
        return res.role == 'ok' ? true : null;
    }
}