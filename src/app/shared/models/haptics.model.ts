import { Platform } from '@ionic/angular';

import { Plugins, HapticsImpactStyle } from "@capacitor/core";
const { Haptics } = Plugins;

export abstract class HapticsModel{
    
    private static hapticsImpact(style = HapticsImpactStyle.Heavy) {
        try {
            Haptics.impact({style: style});
        } catch (error) {
            console.log(`this error hapticts is normal in the browser ${error}`);
        }
    }
    
    static light() {
        try {
            if (!Platform.prototype.is('mobileweb') ) {
                HapticsModel.hapticsImpact(HapticsImpactStyle.Light);
            }
        } catch (error) {
            console.log(`this error hapticts is normal in the browser ${error}`);
        }
    }
}