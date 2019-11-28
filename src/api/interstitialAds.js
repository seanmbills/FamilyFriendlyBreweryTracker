import {
    AdMobInterstitial
} from 'expo-ads-admob'


export async function initializeInterstitial() {
    AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/4411468910'); // Test ID, Replace with your-admob-unit-id
    AdMobInterstitial.setTestDeviceID('EMULATOR');
    try {
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true}).catch(error => console.warn(error));
        await AdMobInterstitial.showAdAsync().catch(error => console.log(error));
    } catch (err) {
        console.warn(err)
    }
}