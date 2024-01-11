import React, {useEffect, useState} from "react";
import {FlatList, Pressable, StyleSheet, View} from "react-native";
import {
    borderRadius,
    Button,
    Container,
    H5,
    H7,
    Insets,
    margin,
    padding, Switch
} from "@WebologicsIndia/react-native-components";
import {theme} from "../../../config/theme";
import HamburgerSVG from "../../../assets/hamburger.svg";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {fetchWithToken} from "../../../config/helper";
import {clientUrl} from "../../../config/api";
import {connect} from "react-redux";
import {setClient} from "../../../store/reducers/clientSlice";

const ClientDetails = (props: any) => {
    const [insets] = useState(Insets.getInsets());
    useEffect(() => {
        fetchWithToken(clientUrl, "GET").then((resp) => {
            if (resp.status === 200) {
                resp.json().then((data) => {
                    props.setClient({
                        data: data.results,
                        total: data.total,
                        page: 1
                    });
                });
            }
        });
    }, []);

    return (
        <Container
            bottom={insets.bottom * 1.5}
            backgroundColor={theme.White}
            header
            headerText={"Clients"}
            headerTextStyle={styles.headerText}
            headerColor={theme.Primary}
            style={styles.container}
            addIcon={<Pressable onPress={() => props.navigation.openDrawer()}><HamburgerSVG /></Pressable>}
        >
            <View style={{flexDirection: "row", justifyContent: "flex-end", ...padding.pb3}}>
                <Button
                    borderRadius={borderRadius.br2}
                    padding={padding.p3}
                    onPress={() => props.navigation.navigate("addNewClient")}
                >
                    <H7 style={{color: theme.TextLight}}>Add New Client</H7>
                </Button>
            </View>
            {
                props.clientDetails.data.length ?
                    <FlatList
                        data={props.clientDetails.data}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item, index}: any) => {
                            return (
                                <Pressable
                                    onPress={() => props.navigation.navigate("addNewClient", {item})}
                                    key={index}

                                >
                                    <View style={{flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                                        <View style={{flexDirection: "row", alignItems: "center", gap: 5}}>
                                            <MaterialIcon color={"#ff3366"} name="person" size={20} />
                                            <H5 style={{
                                                color: theme.PrimaryDark,
                                                fontWeight: "500",
                                                textTransform: "capitalize"
                                            }}>
                                                {item.name}
                                            </H5>
                                        </View>
                                        <View style={{flexDirection: "row", alignItems: "center", gap: 5, ...padding.pt2}}>
                                            <MaterialIcon color={"#ff3366"} name="push-pin" size={16} />
                                            <H7 style={{
                                                color: theme.PrimaryDark,
                                                textTransform: "capitalize",
                                                fontWeight: "500"
                                            }}>
                                                {item.address}
                                            </H7>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                        <View>
                                            <View
                                                style={{flexDirection: "row", alignItems: "center", gap: 5, ...padding.py2}}>
                                                <MaterialIcon
                                                    color={"#ff3366"}
                                                    name="contacts"
                                                    size={16}
                                                />
                                                <H7 style={{
                                                    color: theme.PrimaryDark,
                                                    textTransform: "capitalize"
                                                }}>{item.userId.name}</H7>
                                            </View>
                                            <View style={{flexDirection: "row", alignItems: "center", gap: 5}}>
                                                <MaterialIcon
                                                    color={"#ff3366"}
                                                    name="phone-android"
                                                    size={16}
                                                />
                                                <H7 style={{color: theme.PrimaryDark}}>{item.userId.phone}</H7>
                                            </View>
                                            <View
                                                style={{flexDirection: "row", alignItems: "center", gap: 5, ...padding.py2}}>
                                                <MaterialIcon
                                                    color={"#ff3366"}
                                                    name="alternate-email"
                                                    size={16}
                                                />
                                                <H7 style={{color: theme.PrimaryDark}}>{item.email}</H7>
                                            </View>
                                        </View>
                                        <View style={styles.verticalLine}></View>
                                        <View>
                                            <View style={{flexDirection: "row", alignItems: "center", ...padding.py2}}>
                                                <H7 style={{color: theme.PrimaryDark}}>Assigned Batches: </H7>
                                                <H7
                                                    style={{color: "#ff3366"}}>{item.assignedBatchs ? item.assignedBatchs : 0}</H7>
                                            </View>
                                            <View style={{flexDirection: "row", alignItems: "center", ...padding.py2}}>
                                                <H7 style={{color: theme.PrimaryDark}}>Active: </H7>
                                                <Switch
                                                    activeTrackColors={theme.PrimaryDark}
                                                    thumbStyle={{backgroundColor: theme.TextLight}}
                                                    value={item.isActive}
                                                    disabled={true}
                                                />
                                            </View>
                                        </View>
                                    </View>

                                </Pressable>

                            );
                        }} />
                    :
                    <H7 style={{color: "#000"}}>No data found</H7>
            }
        </Container>
    );
};
const styles = StyleSheet.create({
    container: {
        ...padding.py3,
        flex: 1
    },
    headerText: {
        fontWeight: "600"
    },
    verticalLine: {
        height: "70%",
        ...margin.mx1,
        alignSelf: "center",
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: theme.Accent
    }
});
const mapStateToProps = (state: any) => {
    return {
        clientDetails: state.client
    };
};
export default connect(mapStateToProps, {setClient})(ClientDetails);
