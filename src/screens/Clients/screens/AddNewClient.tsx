import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {
    borderRadius,
    Button,
    Container,
    H7,
    Input,
    Insets,
    margin,
    padding
} from "@WebologicsIndia/react-native-components";
import {theme} from "../../../config/theme";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const AddNewClient = (props: any) => {
    const items = props?.route?.params?.item;
    console.log("items", items);
    const [insets] = useState(Insets.getInsets());
    const [clientDetails, setClientDetails] = useState({
        name: "",
        email: "",
        address: "",
        contactPerson: "",
        contactNo: "",
        password: "",
        assignedBatch: ""
    });

    return (
        <Container
            bottom={insets.bottom}
            backgroundColor={theme.White}
            header
            back
            headerText={!items ? "Add New Client" : "Edit Client Details"}
            headerTextStyle={styles.headerText}
            headerColor={theme.Primary}
            style={styles.container}
            backIcon={<MaterialIcon name={"arrow-back"} size={20} color={theme.TextLight} />}
            navigation={props.navigation}
        >
            {
                items &&
          <View style={{flexDirection: "row", justifyContent: "flex-end", ...padding.pb5}}>
              <Button
                  borderRadius={borderRadius.br2}
                  padding={padding.p3}
                  onPress={() => props.navigation.navigate("addNewClient")}
              >
                  <H7 style={{color: theme.TextLight}}>Edit</H7>
              </Button>
          </View>
            }

            <Input
                placeholder={"name"}
                placeholderTextColor={theme.PrimaryDark}
                // inputStyle={{...margin.mb2}}
                borderRadius={borderRadius.br2}
                textStyle={[padding.px2, {color: theme.TextLight}]}
                bgColor={theme.White}
                borderColor={theme.PrimaryDark}
                floatingPlaceholder={true}
                onChangeText={(val) => setClientDetails({...clientDetails, name: val})}
                value={clientDetails.name}
            />
            <Input
                placeholder={"email"}
                placeholderTextColor={theme.PrimaryDark}
                inputStyle={{...margin.my3}}
                borderRadius={borderRadius.br2}
                textStyle={[padding.px2, {color: theme.TextLight}]}
                bgColor={theme.White}
                borderColor={theme.PrimaryDark}
                floatingPlaceholder={true}
                onChangeText={(val) => setClientDetails({...clientDetails, email: val})}
                value={clientDetails.email}
            />
            <Input
                placeholder={"Address"}
                placeholderTextColor={theme.PrimaryDark}
                // inputStyle={{...margin.mb2}}
                borderRadius={borderRadius.br2}
                textStyle={[padding.px2, {color: theme.TextLight}]}
                bgColor={theme.White}
                borderColor={theme.PrimaryDark}
                floatingPlaceholder={true}
                onChangeText={(val) => setClientDetails({...clientDetails, address: val})}
                value={clientDetails.address}
            />
            <Input
                placeholder={"Contact Person"}
                placeholderTextColor={theme.PrimaryDark}
                inputStyle={{...margin.my3}}
                borderRadius={borderRadius.br2}
                textStyle={[padding.px2, {color: theme.TextLight}]}
                bgColor={theme.White}
                borderColor={theme.PrimaryDark}
                floatingPlaceholder={true}
                onChangeText={(val) => setClientDetails({...clientDetails, contactPerson: val})}
                value={clientDetails.contactPerson}
            />
            <Input
                placeholder={"Contact No."}
                placeholderTextColor={theme.PrimaryDark}
                // inputStyle={{...margin.mb2}}
                borderRadius={borderRadius.br2}
                textStyle={[padding.px2, {color: theme.TextLight}]}
                bgColor={theme.White}
                borderColor={theme.PrimaryDark}
                floatingPlaceholder={true}
                keyboardType={"numeric"}
                onChangeText={(val) => setClientDetails({...clientDetails, contactNo: val})}
                value={clientDetails.contactNo}
            />
            {
                !items ?
                    <Input
                        placeholder={"Password"}
                        placeholderTextColor={theme.PrimaryDark}
                        inputStyle={{...margin.my3}}
                        borderRadius={borderRadius.br2}
                        textStyle={[padding.px2, {color: theme.TextLight}]}
                        bgColor={theme.White}
                        borderColor={theme.PrimaryDark}
                        floatingPlaceholder={true}
                        onChangeText={(val) => setClientDetails({...clientDetails, password: val})}
                        value={clientDetails.password}
                    />
                    :
                    <Input
                        placeholder={"Assigned Batch"}
                        placeholderTextColor={theme.PrimaryDark}
                        inputStyle={{...margin.my3}}
                        borderRadius={borderRadius.br2}
                        textStyle={[padding.px2, {color: theme.TextLight}]}
                        bgColor={theme.White}
                        borderColor={theme.PrimaryDark}
                        floatingPlaceholder={true}
                        onChangeText={(val) => setClientDetails({...clientDetails, assignedBatch: val})}
                        value={clientDetails.assignedBatch}
                    />
            }

            <View style={{flexDirection: "row", alignItems: "center", gap: 10, ...margin.mt4}}>
                <View style={{flex: 1}}>
                    <Button
                        borderRadius={borderRadius.br2}
                        padding={padding.p3}
                        onPress={() => props.navigation.navigate("addNewClient")}
                    >
                        <H7 style={{color: theme.TextLight}}>Save</H7>
                    </Button>
                </View>
                <View style={{flex: 1}}>
                    <Button
                        borderRadius={borderRadius.br2}
                        padding={padding.p3}
                        onPress={() => props.navigation.navigate("addNewClient")}
                    >
                        <H7 style={{color: theme.TextLight}}>Cancel</H7>
                    </Button>
                </View>
            </View>
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
export default AddNewClient;
