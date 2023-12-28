import React, {useState} from "react";
import {FlatList, Pressable, StyleSheet, View} from "react-native";
import {
    borderRadius,
    Button,
    Container,
    H5,
    H7,
    Insets,
    margin,
    padding
} from "@WebologicsIndia/react-native-components";
import {theme} from "../../../config/theme";
import HamburgerSVG from "../../../assets/hamburger.svg";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const ClientDetails = (props: any) => {
    const [insets] = useState(Insets.getInsets());
    const clientDetails: any = [
        {
            name: "Ankush Narwal",
            email: "ankush@gamil.com",
            address: "vvip address ghaziabad",
            contactPerson: "Satyam Yadav",
            contactNo: 9876543210,
            assignedBatchs: 5
        }
    ];
    return (
        <Container
            bottom={insets.bottom}
            backgroundColor={theme.White}
            header
            headerText={"Clients"}
            headerTextStyle={styles.headerText}
            headerColor={theme.Primary}
            style={styles.container}
            addIcon={<Pressable onPress={() => props.navigation.openDrawer()}><HamburgerSVG /></Pressable>}
        >
            <View style={{flexDirection: "row", justifyContent: "flex-end", ...padding.pb5}}>
                <Button
                    borderRadius={borderRadius.br2}
                    padding={padding.p3}
                    onPress={() => props.navigation.navigate("addNewClient")}
                >
                    <H7 style={{color: theme.TextLight}}>Add New Client</H7>
                </Button>
            </View>
            {
                clientDetails.length ?
                    <FlatList
                        data={clientDetails}
                        renderItem={({item, index}: any) => {
                            return (
                                <Pressable
                                    onPress={() => props.navigation.navigate("addNewClient", {item})}
                                    key={index}
                                    style={[
                                        borderRadius.br2,
                                        padding.p3,
                                        margin.mb4,
                                        {
                                            borderWidth: StyleSheet.hairlineWidth,
                                            backgroundColor: "#ff3366" + "1A",
                                            borderColor: "#ff3366"
                                        }
                                    ]}
                                >
                                    <View style={{flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                                        <View style={{flexDirection: "row", alignItems: "center", gap: 5}}>
                                            <MaterialIcon color={"#ff3366"} name="person" size={20} />
                                            <H5 style={{color: theme.PrimaryDark, fontWeight: "500"}}>
                                                {item.name}
                                            </H5>
                                        </View>
                                        <View style={{flexDirection: "row", alignItems: "center", gap: 5, ...padding.pt2}}>
                                            <MaterialIcon color={"#ff3366"} name="push-pin" size={16} />
                                            <H7 style={{color: theme.PrimaryDark, textTransform: "capitalize", fontWeight: "500"}}>
                                                {item.address}
                                            </H7>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                        <View>
                                            <View style={{flexDirection: "row", alignItems: "center", gap: 5, ...padding.py2}}>
                                                <MaterialIcon
                                                    color={"#ff3366"}
                                                    name="contacts"
                                                    size={16}
                                                />
                                                <H7 style={{color: theme.PrimaryDark}}>{item.contactPerson}</H7>
                                            </View>
                                            <View style={{flexDirection: "row", alignItems: "center", gap: 5}}>
                                                <MaterialIcon
                                                    color={"#ff3366"}
                                                    name="phone-android"
                                                    size={16}
                                                />
                                                <H7 style={{color: theme.PrimaryDark}}>{item.contactNo}</H7>
                                            </View>
                                            <View style={{flexDirection: "row", alignItems: "center", gap: 5, ...padding.py2}}>
                                                <MaterialIcon
                                                    color={"#ff3366"}
                                                    name="alternate-email"
                                                    size={16}
                                                />
                                                <H7 style={{color: theme.PrimaryDark}}>{item.email}</H7>
                                            </View>
                                        </View>
                                        <View>
                                            <View style={{flexDirection: "row", alignItems: "center", ...padding.py2}}>
                                                <H7 style={{color: theme.PrimaryDark}}>Assigned Batches: </H7>
                                                <H7 style={{color: "#ff3366"}}>{item.assignedBatchs}</H7>
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
        ...padding.py5,
        flex: 1
    },
    headerText: {
        fontWeight: "600"
    }
});
export default ClientDetails;
