import { StyleSheet } from "react-native";
import colors from "../../config/colors.json";

const style = StyleSheet.create({
    infos: {
        width: "90%",
        alignSelf: "center",
        borderRadius: 10,
        marginVertical: 20
    },
    buttons: {
        width: "90%",
        alignSelf: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around"
    }
});

export default style;