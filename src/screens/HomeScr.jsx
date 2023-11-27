import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import styles from "../utils/styles";


export default function HomeScr({navigation}) {

    return (
        <View style={styles.BodyH}>
            <Text>Esta é a nossa página inicial.</Text>
            <Text>A dupla é composta por Ana Beatriz & Laiz Detros.</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Compass")}><Text>Bússola</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Comp")}><Text>Pág Test</Text></TouchableOpacity>
        </View>
    );
}