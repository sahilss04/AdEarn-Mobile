import { useCallback, useEffect, useRef, useState } from "react";
import { AdEventType, RewardedAd, RewardedAdEventType, RewardedInterstitialAd } from "react-native-google-mobile-ads";

export type AdType = "rewarded" | "rewardedInterstitial";

const getAdUnitId = (adType: AdType) => {
    if (adType === "rewarded") {
        return "ca-app-pub-3940256099942544/5224354917"; // Test ID
    } else if (adType === "rewardedInterstitial") {
        return "ca-app-pub-3940256099942544/5354046379"; // Test ID
    }
    return "";
};

const createAd = (adType: AdType) => {
    const adUnitId = getAdUnitId(adType);

    switch (adType) {
        case "rewarded":
            return RewardedAd.createForAdRequest(adUnitId);
        case "rewardedInterstitial":
            return RewardedInterstitialAd.createForAdRequest(adUnitId);
        default:
            throw new Error("Unsupported ad type: " + adType);
    };
};

export const useAdManager = (adType: AdType) => {
    const adRef = useRef<RewardedAd | RewardedInterstitialAd | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const rewardPromiseRef = useRef<{ 
        resolve: (value: boolean) => void;
        rejected: (reason: any) => void;
    } | null>(null);

    const reLoadAd = useCallback(() => {
        if (!adRef.current) return;
        setIsLoading(true);
        setError(null);

        if (adRef.current.loaded) return;
        adRef.current.load();
    }, []);

    useEffect(() => {
        if (adRef.current) return;
        adRef.current = createAd(adType);

        adRef.current.addAdEventListener(RewardedAdEventType.LOADED, () => {
            setIsLoaded(true);
            setIsLoading(false);
        });

        adRef.current.addAdEventListener(AdEventType.CLOSED, () => {
            setIsLoaded(false);
            if (rewardPromiseRef.current) {
                rewardPromiseRef.current.resolve(false);
                rewardPromiseRef.current = null;
            }
            reLoadAd();
        });

        adRef.current.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
            if (rewardPromiseRef.current) {
                rewardPromiseRef.current.resolve(true);
            }
        });

        adRef.current.addAdEventListener(AdEventType.ERROR, (err) => {
            console.log("Ad Error: ", err);
            setIsLoaded(false);
            setIsLoading(false);
            setError("Failed to load ad.");
        });

        adRef.current.load();

        return () => {
            console.log("Removing ad event listeners");
            if (adRef.current) adRef.current.removeAllListeners();
            adRef.current = null;
        };
    }, [adType]);

    const showAd = useCallback(async (): Promise<{ success: boolean; message?: string }> => {
        return new Promise((resolve) => {
            if (error) {
                resolve({ 
                    success: false,
                    message: "Ad failed to load. Please again later."
                });
                return;
            };

            if (!isLoaded) {
                resolve({
                    success: false,
                    message: "Ad is not ready yet. Please wait a moment."
                });
                return
            };

            try {
                if (!adRef.current) {
                    resolve({
                        success: false,
                        message: "Ad system is not initialised. Please try again later."
                    });
                    return;
                }

                rewardPromiseRef.current = {
                    resolve: (success) => 
                        resolve({ success, message: success ? undefined : "Ad was closed before completing."}),
                    rejected: () => resolve({ success: false, message: "Failed to play ad." }),
                    
                };
                adRef.current.show();
            } catch (err) {
                console.log("Ad show error: ", err);
                reLoadAd();
                resolve({
                    success: false,
                    message: "Failed to display Ad. Please try again.",
                });
            }
        });
    }, [isLoaded, error, reLoadAd]);
    
    return {
        showAd,
        isLoading,
        isLoadingAd: isLoaded && !error,
        error
    };
};