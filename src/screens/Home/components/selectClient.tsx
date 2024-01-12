import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {H8, Input, margin, padding} from "@WebologicsIndia/react-native-components";
import {theme} from "../../../config/theme";
import {fetchWithToken} from "../../../config/helper";
import {clientUrl} from "../../../config/api";

const SelectClient = (props: {
  selectClient: any,
  setSelectClient: any,
  setClientData: any
}) => {
    const [loading, setLoading] = useState(false);
    const handleInputChange = (value: string) => {
        setLoading(true);
        props.setSelectClient(value);
        fetchWithToken(`${clientUrl}?name=${value}`, "GET", "").then((resp) => {
            if (resp.status === 200) {
                resp.json().then((data) => {
                    props.setClientData(data.results);
                });
            } else {
                setLoading(false);
            }
        }).finally(() => {
            setLoading(false);
        });
    };
    return (
        <View style={[styles.filterMaskView, styles.rowAlignCenter, margin.mt4]}>
            <H8 style={styles.textHeading}>Select Client:</H8>
            <View style={{flex: 1}}>
                <Input
                    inputStyle={{borderBottomWidth: 1}}
                    textStyle={[{color: theme.PrimaryDark}, styles.input]}
                    bgColor={theme.White}
                    onChangeText={(value) => handleInputChange(value)}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    rowAlignCenter: {
        flexDirection: "row",
        alignItems: "center"
    },
    filterMaskView: {
        gap: 16
    },
    textHeading: {
        color: theme.PrimaryDark,
        fontWeight: "600"
    },
    input: {
        borderWidth: 0,
        ...padding.py0
    }
});
export default SelectClient;
