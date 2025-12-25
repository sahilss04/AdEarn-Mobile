
import { View, Image, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
    return (
        <View style={styles.header}>

            {/* Logo */}
            <Image
                source={require("../assets/AdEarn_Logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />

            {/* Right Icons */}
            <View style={styles.right}>
                <Pressable style={styles.iconBtn}>
                    <Ionicons name="notifications-outline" size={26} color="#000" />
                </Pressable>

                <Pressable style={styles.avatarBtn}>
                    <Image
                        source={require("../assets/AdEarn_Logo.png")}
                        style={styles.avatar}
                    />
                </Pressable>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 6,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ccd",
        height: 50,
        marginTop: 40,
    },
    logo: {
        width: 100,
        height: 40,
    },
    right: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconBtn: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    avatarBtn: {
        width: 35,
        height: 35,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 6,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#3b82f6",
    },
});