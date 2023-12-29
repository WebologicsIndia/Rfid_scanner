import React, {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {
    borderRadius,
    Button,
    Container,
    H7,
    Input,
    Insets,
    margin,
    padding, Switch
} from "@WebologicsIndia/react-native-components";
import {theme} from "../../../config/theme";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const AddNewClient = (props: any) => {
    const items: any = props?.route?.params?.item;
    const [insets] = useState(Insets.getInsets());
    const initialClientDetails = items
        ? {
            name: items.name || "",
            email: items.email || "",
            address: items.address || "",
            contactPerson: items.contactPerson || "",
            contactNo: String(items.contactNo) || "",
            assignedBatch: String(items.assignedBatchs) || ""
        }
        : {
            name: "",
            email: "",
            address: "",
            contactPerson: "",
            contactNo: "",
            password: "",
            assignedBatch: ""
        };
    const [clientDetails, setClientDetails] = useState(initialClientDetails);
    const [isEditable, setIsEditable] = useState(!items);

    useEffect(() => {
        setClientDetails(initialClientDetails);
    }, [items]);
    const handleCancelBtn = () => {
        if (items) {
            setIsEditable(false);
        } else {
            props.navigation.goBack();
        }
    };
    const AddUpdateClient = () => {
        console.log(clientDetails);
    };
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
            keyboardAvoiding={true}
        >
            {
                items &&
          <View style={{flexDirection: "row", justifyContent: "flex-end", ...padding.pb5}}>
              <Button
                  borderRadius={borderRadius.br2}
                  padding={padding.p3}
                  onPress={() => setIsEditable(true)}
              >
                  <H7 style={{color: theme.TextLight}}>Edit</H7>
              </Button>
          </View>
            }

            <Input
                placeholder={"Name"}
                placeholderTextColor={theme.TextLight}
                borderRadius={borderRadius.br2}
                textStyle={[padding.px2, {color: theme.PrimaryDark}]}
                bgColor={theme.White}
                borderColor={theme.PrimaryDark}
                floatingPlaceholder={true}
                onChangeText={(val) => setClientDetails({...clientDetails, name: val})}
                value={clientDetails.name}
                editable={!items}
            />
            <Input
                placeholder={"Email"}
                placeholderTextColor={theme.TextLight}
                inputStyle={{...margin.my3}}
                borderRadius={borderRadius.br2}
                textStyle={[padding.px2, {color: theme.PrimaryDark}]}
                bgColor={theme.White}
                borderColor={theme.PrimaryDark}
                floatingPlaceholder={true}
                onChangeText={(val) => setClientDetails({...clientDetails, email: val})}
                value={clientDetails.email}
                editable={isEditable}
            />
            <Input
                placeholder={"Address"}
                placeholderTextColor={theme.TextLight}
                borderRadius={borderRadius.br2}
                textStyle={[padding.px2, {color: theme.PrimaryDark}]}
                bgColor={theme.White}
                borderColor={theme.PrimaryDark}
                floatingPlaceholder={true}
                onChangeText={(val) => setClientDetails({...clientDetails, address: val})}
                value={clientDetails.address}
                editable={isEditable}
            />
            <Input
                placeholder={"Contact Person"}
                placeholderTextColor={theme.TextLight}
                inputStyle={{...margin.my3}}
                borderRadius={borderRadius.br2}
                textStyle={[padding.px2, {color: theme.PrimaryDark}]}
                bgColor={theme.White}
                borderColor={theme.PrimaryDark}
                floatingPlaceholder={true}
                onChangeText={(val) => setClientDetails({...clientDetails, contactPerson: val})}
                value={clientDetails.contactPerson}
                editable={isEditable}
            />
            <Input
                placeholder={"Contact No."}
                placeholderTextColor={theme.TextLight}
                borderRadius={borderRadius.br2}
                textStyle={[padding.px2, {color: theme.PrimaryDark}]}
                bgColor={theme.White}
                borderColor={theme.PrimaryDark}
                floatingPlaceholder={true}
                keyboardType={"numeric"}
                onChangeText={(val) => setClientDetails({...clientDetails, contactNo: val})}
                value={clientDetails.contactNo}
                editable={isEditable}
            />
            {
                !items ?
                    <Input
                        placeholder={"Password"}
                        placeholderTextColor={theme.TextLight}
                        inputStyle={{...margin.my3}}
                        borderRadius={borderRadius.br2}
                        textStyle={[padding.px2, {color: theme.PrimaryDark}]}
                        bgColor={theme.White}
                        borderColor={theme.PrimaryDark}
                        floatingPlaceholder={true}
                        onChangeText={(val) => setClientDetails({...clientDetails, password: val})}
                        value={clientDetails.password}
                    />
                    :
                    <Input
                        placeholder={"Assigned Batches"}
                        placeholderTextColor={theme.TextLight}
                        inputStyle={{...margin.my3}}
                        borderRadius={borderRadius.br2}
                        textStyle={[padding.px2, {color: theme.PrimaryDark}]}
                        bgColor={theme.White}
                        borderColor={theme.PrimaryDark}
                        floatingPlaceholder={true}
                        onChangeText={(val) => setClientDetails({...clientDetails, assignedBatch: val})}
                        value={clientDetails.assignedBatch}
                        editable={isEditable}
                    />
            }
            {
                items &&
          <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
              <H7 style={{color: theme.PrimaryDark}}>IsActive</H7>
              <Switch activeTrackColors={theme.PrimaryDark} thumbStyle={{backgroundColor: theme.TextLight}} />
          </View>
            }
            {
                isEditable &&
          <View style={{flexDirection: "row", alignItems: "center", gap: 10, ...margin.mt4}}>
              <View style={{flex: 1}}>
                  <Button
                      borderRadius={borderRadius.br2}
                      padding={padding.p3}
                      onPress={() => AddUpdateClient()}
                  >
                      <H7 style={{color: theme.TextLight}}>Save</H7>
                  </Button>
              </View>
              <View style={{flex: 1}}>
                  <Button
                      borderRadius={borderRadius.br2}
                      padding={padding.p3}
                      onPress={handleCancelBtn}
                  >
                      <H7 style={{color: theme.TextLight}}>Cancel</H7>
                  </Button>
              </View>
          </View>
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
export default AddNewClient;
