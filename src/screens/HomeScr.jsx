import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import styles from "../utils/styles";


export default function HomeScr({ navigation }) {

    return (
        <View style={styles.BodyH}>
            <Text style={styles.TextH}>Esta é a nossa página inicial.</Text>
            <Text style={styles.TextH}>A dupla é composta por Ana Beatriz & Laiz Detros.</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("Compass")}
                style={styles.Touchzin}
            ><Text style={styles.TextCT}>Bússola</Text></TouchableOpacity>
            {/* <TouchableOpacity
                onPress={() => navigation.navigate("Comp")}
                style={styles.Touchzin}
            ><Text style={styles.TextCT}>TESTESSSSSSS</Text></TouchableOpacity> */}
        </View>
    );
}