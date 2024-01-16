import React, {useState} from "react";
import {FlatList, Pressable, StyleSheet, View} from "react-native";
import {Block, fontSize, H7, H8, Input, margin, padding} from "@WebologicsIndia/react-native-components";
import {theme} from "../../../config/theme";
import {fetchWithToken} from "../../../config/helper";
import {clientUrl} from "../../../config/api";

const SelectClient = (props: {
  selectedClient: any,
  setSelectedClient: any,
  setClientData: any,
  clientData: any
}) => {
    const [loading, setLoading] = useState(false);
    const handleInputChange = (value: string) => {
        setLoading(true);
        props.setSelectedClient(value);
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

    const handleNameSelect = (client: any) => {
        props.setSelectedClient(client);
        props.setClientData([]);

    };
    return (
        <>
            <View style={[styles.filterMaskView, styles.rowAlignCenter, margin.mt4]}>
                <H8 style={styles.textHeading}>Select Client:</H8>
                <View style={{flex: 1}}>
                    <Input
                        inputStyle={{borderBottomWidth: 1}}
                        textStyle={[{color: theme.Primary, ...fontSize.H7}, styles.input]}
                        bgColor={theme.White}
                        value={props.selectedClient?.name}
                        onChangeText={(value) => handleInputChange(value)}
                    />
                    {
                        props?.clientData?.length ?
                            <View>
                                <FlatList
                                    data={props.clientData}
                                    renderItem={({item}: any) => {
                                        return <Block
                                            fluid
                                        >
                                            <Pressable onPress={() => handleNameSelect(item)}>
                                                <H7 style={{color: theme.Primary}}>{item.name}</H7>
                                            </Pressable>
                                        </Block>;

                                    }}
                                />
                            </View>
                            : <></>
                    }
                </View>
            </View>

        </>
    );
};
const styles = StyleSheet.create({
    rowAlignCenter: {
        flexDirection: "row"
    // alignItems: "center"
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
