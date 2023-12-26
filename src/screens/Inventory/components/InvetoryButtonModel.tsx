
import {Pressable, StyleSheet, View} from "react-native";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ScanIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {theme} from "../../../config/theme";
import {borderRadius, Button, H7, height, padding, width} from "@WebologicsIndia/react-native-components";
import React from "react";

const InvetoryButtonModal = (props:any) => {

    return (
        <View
            style = {styles.modalView}
        >
            <Pressable onPress={() => props.navigation.goBack()} style={styles.close}>
                <ScanIcon name={"close-circle-outline"} color={theme.Primary} size={40}/>
            </Pressable>

            <View style = {styles.buttonView}>
                <Button
                    padding={[padding.px3, padding.py5]}
                    borderRadius={borderRadius.br4}
                    onPress={() => props.navigation.navigate("ScanTags")}
                    left={<ScanIcon name={"barcode-scan"} color={theme.White} size={20}/>}
                >
                    <H7 style={{color: theme.White}}>Scan Tags</H7>
                </Button>
                <Button
                    padding={[padding.px3, padding.py5]}
                    borderRadius={borderRadius.br4}
                    onPress={() => props.navigation.navigate("UploadExcel")}
                    // left={<ScanIcon name={"file-upload"} color={theme.White} size={20}/>}
                >
                    <H7 style={{color: theme.White}}>Upload Excel</H7>
                </Button>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    centeredView: {
        height: "100%",
        width: "100%",
        backgroundColor: theme.PrimaryLight + "80"
    },
    modalView: {
        ...width.w18,
        ...height.h6,
        ...borderRadius.br4,
        marginHorizontal: width.w3.width,
        marginVertical: (height.h24.height - width.w18.width) / 2,
        shadowColor: theme.Primary,
        ...padding.p3,
        elevation: 3,
        backgroundColor: theme.White,
        overflow: "hidden"
    },
    input: {
        borderWidth: 0,
        ...padding.py0
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        ...padding.py4
    },
    close: {
        alignSelf: "flex-end"
    }
});
export default InvetoryButtonModal;
