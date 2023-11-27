import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import styles from "../utils/styles";

export default function CompassScr({navigation}) {
    return (
        <View style={styles.BodyH}>
            <Text>Esta é a nossa página de bússola.</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}><Text>Voltar para a Home</Text></TouchableOpacity>
        </View>
    );
}