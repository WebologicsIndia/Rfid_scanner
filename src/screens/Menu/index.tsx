import React, {useState} from "react";
import {
    borderRadius,
    Container,
    H4,
    H5,
    H6,
    H7, H8,
    height,
    Insets,
    margin,
    padding,
    width
} from "@WebologicsIndia/react-native-components";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import HamburgerSVG from "../../assets/hamburger.svg";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CurrentLocationSVG from "../../assets/current-location.svg";
import PlaySVG from "../../assets/playSVG.svg";
import ReloadSVG from "../../assets/reloadSVG.svg";

import {StyleSheet, View} from "react-native";
import {theme} from "../../config/theme";
import DropDownPicker from "react-native-dropdown-picker";

const Menu = () => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: "Contains", value: "contains"},
        {label: "Does Not Contain", value: "notContain"},
        {label: "Equals", value: "equals"},
        {label: "Not Equal", value: "notEquals"},
        {label: "Starts With", value: "startsWith"},
        {label: "Ends With", value: "endsWith"},
    ]);
    return (
        <Container
            style={styles.container}
            fluid
            backgroundColor={theme.White}
            header
            addIcon={<HamburgerSVG />}
            headerText={"Tag Scanner"}
            headerTextStyle={styles.headerText}
            headerColor={theme.Primary}
            bottom={Insets.bottom}
        >
            <View style={styles.bodyLogoView}>
                <H7 style={styles.logoBody}>Logo</H7>
                <CurrentLocationSVG color={theme.PrimaryDark} width="24" height= "24"/>
            </View>
            <View style={styles.filterModeView}>
                <H8 style={styles.textHeading}>Filter Mode:</H8>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    style={{
                        borderWidth: 0,
                        ...borderRadius.br4,
                        backgroundColor: theme.White,
                        width: "50%"
                    }}
                    textStyle={{
                        fontFamily: "Lufga",
                        fontSize: 16
                    }}
                    dropDownContainerStyle={{
                        borderWidth: 0,
                    }}
                    placeholder={"Select Filter Option"}
                    mode={"SIMPLE"}
                />
                <PlaySVG width="24" height= "24"/>
                <ReloadSVG width="24" height= "24"/>
            </View>
        </Container>
    );
};
export default Menu;

const styles= StyleSheet.create({
    container: {
        ...padding.p5
    },
    headerText: {
        fontWeight: "600",
        ...margin.ms4,
    },
    bodyLogoView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    logoBody: {
        color: theme.PrimaryDark,
        textAlign: "center",
        flex: 1
    },
    textHeading: {
        color: theme.PrimaryDark,
        fontWeight: "600"
    },
    text: {
        color: theme.TextLight
    },
    filterModeView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

    }

});
