
import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { useAdManager } from '../../hooks/useAdManeger';
import { router } from 'expo-router';

function AdScreen() {
    const { showAd, isLoading, error } = useAdManager("rewarded");

    const handleShowAd = async () => {
        const result = await showAd();
        if (result.success) {
            console.log("Ad watched successfully!");
        } else {
            console.log("Ad failed to show:", result.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ad Screen</Text>
            <Button
                title="Show Rewarded Ad"
                onPress={handleShowAd}
                disabled={isLoading}
            />
            {error && <Text style={styles.error}>{error}</Text>}
            <View style={{marginTop: 20}}>
              <Button title="Go Back" onPress={() => router.back()} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    error: {
        color: 'red',
        marginTop: 10,
    }
});

export default AdScreen;
