import { Platform } from '@ionic/angular';

import { Plugins, HapticsImpactStyle } from "@capacitor/core";
const { Haptics } = Plugins;

export abstract class HapticsModel{
    
    static light() {
        if (Platform.prototype.is('mobileweb')) return; 
        try {
            Haptics.impact({style: HapticsImpactStyle.Light});
        } catch (error) {
            return;
        }
    }
}