import React, {useState} from "react";
import {
    borderRadius,
    Container,
    H7, H8, H9,
    Input,
    Insets,
    margin,
    padding, width
} from "@WebologicsIndia/react-native-components";
import HamburgerSVG from "../../assets/hamburger.svg";
import CurrentLocationSVG from "../../assets/current-location.svg";
import PlaySVG from "../../assets/playSVG.svg";
import ReloadSVG from "../../assets/reloadSVG.svg";
import PauseSVG from "../../assets/pauseSVG.svg";
import {Pressable, StyleSheet, View} from "react-native";
import {theme} from "../../config/theme";
import DropDownPicker from "react-native-dropdown-picker";
// import TrackingDrawer from "../Menu";
// import Toast from "../../common/Toast";



const Home = (props:any) => {
    const [insets] = useState(Insets.getInsets());
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
    const [locationIconColor, setLocationIconColor] = useState(theme.PrimaryDark);
    const [icon, setIcon] = useState("PlaySVG");
    const[openToast, setOpenToast] = useState(false);


    const handleInputChange = (name: string, value: string | number) => {
        console.log(name, value);
    };
    const handleLocationIconColor = () => {
        if(locationIconColor === theme.PrimaryDark) {
            setLocationIconColor("#009900");
        } else {
            setLocationIconColor(theme.PrimaryDark);
        }
    };

    const handleIconClick = () => {
        if(icon === "PlaySVG") {
            setIcon("PauseSVG");
        } else {
            setIcon("PlaySVG");
        }
    };
    const handleReload = () => {
        setOpenToast(true);
    };

    return (
        <>
            <Container
                style={styles.container}
                fluid
                backgroundColor={theme.White}
                header
                addIcon={<Pressable onPress={() => props.navigation.openDrawer()}><HamburgerSVG/></Pressable>}
                headerText={"Tag Scanner"}
                headerTextStyle={styles.headerText}
                headerColor={theme.Primary}
                bottom={insets.bottom}
            >
                <View>
                    <View style={styles.bodyLogoView}>
                        <H7 style={styles.logoBody}>Logo</H7>
                        <Pressable onPress={handleLocationIconColor}>
                            <CurrentLocationSVG color={locationIconColor} width="24" height= "24" />
                        </Pressable>
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
                            }}
                            textStyle={{
                                fontFamily: "Lufga",
                                fontSize: 16
                            }}
                            dropDownContainerStyle={{
                                borderWidth: 0,
                            }}
                            containerStyle={{borderWidth: 0, width: "50%"}}
                            placeholder={"Select Filter Option"}
                            mode={"SIMPLE"}
                        />
                        { icon === "PlaySVG" ? (
                            <Pressable onPress={handleIconClick}>
                                <PlaySVG width="24" height= "24" />
                            </Pressable>
                        ) : (
                            <Pressable onPress={handleIconClick}>
                                <PauseSVG width="24" height= "24" />
                            </Pressable>
                        )}
                        <Pressable onPress = {handleReload}>
                            <ReloadSVG width="24" height= "24" />
                        </Pressable>
                    </View>
                    <View style={styles.filterMaskView}>
                        <H8 style={styles.textHeading}>Filter Mask:</H8>
                        <View style={{flex: 1}}>
                            <Input
                                inputStyle={{borderBottomWidth: 2, ...padding.py0}}
                                textStyle={[{color: theme.PrimaryDark}, styles.input]}
                                bgColor={theme.White}
                                onChangeText={(value) => handleInputChange("filterMask", value)}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.footer}>
                    <View style={{flexDirection: "row", gap: 4, alignItems: "center"}}>
                        <H9 style={styles.text}>Press</H9>
                        <View style={styles.scanButton}><H9 style={styles.scanText}>SCAN</H9></View>
                        <H9 style={styles.text}>Button</H9>
                    </View>
                    <H9 style={styles.text}>or Trigger to Read a Tag</H9>
                    <H9 style={styles.text}>...</H9>

                </View>
            </Container>
            {/*<Toast open={openToast} message={"List Cleared"} type={"warning"} />*/}
            {/*<Drawer*/}
            {/*    open={drawerOpen}*/}
            {/*    position={"left"}*/}
            {/*    width={"35%"}*/}
            {/*    onBackdropPress={() => setDrawerOpen(false)}*/}
            {/*>*/}
            {/*    <TrackingDrawer/>*/}
            {/*</Drawer>*/}

        </>

    );
};
export default Home;

const styles= StyleSheet.create({
    container: {
        ...padding.p5,
        flex: 1,
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
        color: theme.Primary
    },
    filterModeView: {
        ...padding.py5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    filterMaskView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16
    },
    input: {
        borderWidth: 0,
        ...padding.py0,
        ...margin.my0
    },
    footer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "column",
        gap: 4
    },
    scanText: {
        textAlign: "center",
        color: theme.PrimaryDark,
        fontWeight: "600",
        fontSize: 14
    },
    scanButton: {
        width: width.w3.width,
        backgroundColor: "#cc6600",
        aspectRatio: 3.5,
        borderWidth: StyleSheet.hairlineWidth,
        ...borderRadius.br2,
        // borderColor: theme.Accent
    },
    toastStyle: {
        backgroundColor: "rgba( 255, 255, 255, 0.1 )",
        width: "100%",
        maxWidth: width.w22.width,
        paddingHorizontal: 0,
        paddingVertical: 0
    },
    toastContainer: {
        ...padding.px5,
        ...padding.py3,
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    }
});
