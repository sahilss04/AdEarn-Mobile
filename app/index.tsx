
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import { router } from "expo-router";
import mobileAds, { MaxAdContentRating } from "react-native-google-mobile-ads";

import { useAdManager } from "@/hooks/useAdManeger";

export default function Dashboard() {
  const coins = 250;
  const today = 285.16;
  const total = 500.83;

  const recentTasks = [
    { date: "04/24/2024", task: "Invited Friend", reward: "+10 Coins", amount: "+₹1.00" },
    { date: "04/24/2024", task: "Ad Watched", reward: "+10 Coins", amount: "+₹1.00" },
    { date: "04/24/2024", task: "Ad Watched", reward: "+10 Coins", amount: "+₹1.00" },
    { date: "04/24/2024", task: "Invited Friend", reward: "+10 Coins", amount: "+₹1.00" },
    { date: "04/24/2024", task: "Invited Friend", reward: "+10 Coins", amount: "+₹1.00" },
    { date: "04/24/2024", task: "Ad Watched", reward: "+10 Coins", amount: "+₹1.00" },
    { date: "04/24/2024", task: "Ad Watched", reward: "+10 Coins", amount: "+₹1.00" },
    { date: "04/24/2024", task: "Invited Friend", reward: "+10 Coins", amount: "+₹1.00" },
  ];

  const { showAd, isLoading, error} = useAdManager("rewarded");

  useEffect(() => {
    mobileAds().setRequestConfiguration({
      maxAdContentRating: MaxAdContentRating.PG,
      tagForChildDirectedTreatment: true,
      tagForUnderAgeOfConsent: false,
    }).then(() => {
      return mobileAds().initialize();
    }).then(() => {
      console.log("Admob Initialisation Complete");
    }).catch((err) => {
      console.log("Admob Initialisation Failed Error:", err);
    });
  }, []);

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

      <Header />

      <View style={{ padding: 10 }}>
        <View style={styles.card}>
          <Text style={styles.heading}>
            <Text style={styles.hello}>Hello, Sahil{"\n"}</Text>
            Welcome Back
          </Text>

          <View style={styles.grid}>
            <View style={[styles.statBox, styles.blue]}>
              <Text style={styles.emoji}>🪙</Text>
              <View>
                <Text style={styles.smallText}>Your Coins</Text>
                <Text style={styles.bigText}>{coins}</Text>
              </View>
            </View>

            <View style={[styles.statBox, styles.orange]}>
              <Text style={styles.emoji}>₹</Text>
              <View>
                <Text style={styles.smallText}>Today</Text>
                <Text style={styles.bigText}>{today.toFixed(2)}</Text>
              </View>
            </View>

            <View style={[styles.statBox, styles.green, { width: "100%" }]}>
              <Text style={styles.emoji}>💸</Text>
              <View>
                <Text style={styles.smallText}>Total Earning</Text>
                <Text style={styles.bigText}>{total.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Pressable 
            style={[styles.actionBtn, styles.orange]}
            onPress={handleShowAd}
          >
            <Ionicons name="play" size={28} color="#fff" />
            <Text style={styles.actionText}>Watch Ad & Earn</Text>
            <Text style={styles.badge}>+10 Coins</Text>
          </Pressable>

          <Pressable style={[styles.actionBtn, styles.blue]}>
            <Ionicons name="people" size={26} color="#fff" />
            <Text style={styles.actionText}>Invite Friends</Text>
            <Ionicons name="chevron-forward" size={22} color="#fff" />
          </Pressable>
        </View>

        <View style={{...styles.card, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
          <Text style={styles.sectionTitle}>Recent Earnings</Text>

          <View style={styles.tableHeader}>
            <Text style={{ fontWeight: 800 }}>Date</Text>
            <Text style={{ fontWeight: 800 }}>Task</Text>
            <Text style={{ fontWeight: 800 }}>Reward</Text>
            <Text style={{ fontWeight: 800 }}>Amount</Text>
          </View>

          <View style={{ height: 225 }}>
            <ScrollView>
              {recentTasks.map((item, i) => (
                <View key={i} style={styles.tableRow}>
                  <Text style={styles.smallTextBlack}>{item.date}</Text>
                  <Text style={styles.smallTextBlack}>{item.task}</Text>
                  <Text style={{ ...styles.smallTextBlack, color: "#f97316" }}>{item.reward}</Text>
                  <Text style={styles.smallTextBlack}>{item.amount}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eef",
    height: "100%"
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    color: "#556",
    marginBottom: 10,
  },
  hello: {
    color: "#f97316",
    fontSize: 26,
    fontWeight: "700",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  statBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderRadius: 8,
    width: "48%",
  },
  blue: { backgroundColor: "#2563eb" },
  orange: { backgroundColor: "#f97316" },
  green: { backgroundColor: "#16a34a" },
  emoji: {
    fontSize: 22,
    color: "#fff",
  },
  smallText: {
    color: "#fff",
    fontSize: 12,
  },
  smallTextBlack: {
    fontSize: 12,
    fontWeight: 600,
  },
  bigText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  badge: {
    backgroundColor: "#fff",
    color: "#f97316",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingBottom: 6,
    borderBottomColor: "#ccd",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccd",
    textAlign: "center",
  },
});
