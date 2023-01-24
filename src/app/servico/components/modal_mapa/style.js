import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
    viewMap: {
        width:"100%",
        height: "80%",
        borderRadius: 10,
        overflow: "hidden",
        position: "absolute",
        justifyContent: "space-around",
        top: "10%",
        alignSelf: "center"
    },
    map: {
        zIndex: -99,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});

export default style;