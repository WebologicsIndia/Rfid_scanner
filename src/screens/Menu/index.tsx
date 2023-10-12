import React, {useState} from "react";
import {Container,  H7, Insets, margin, padding} from "@WebologicsIndia/react-native-components";
import {theme} from "../../config/theme";
import {Pressable, StyleSheet} from "react-native";
import HamburgerSVG from "../../assets/hamburger.svg";

const TrackingDrawer = (props:any) => {
    const [insets] = useState(Insets.getInsets());
    return (
        <Container
            style={styles.container}
            backgroundColor={theme.White}
            header
            addIcon={<Pressable onPress={() => props.navigation.openDrawer()}><HamburgerSVG/></Pressable>}
            headerText={"Inventories"}
            headerTextStyle={styles.headerText}
            headerColor={theme.Primary}
            bottom={insets.bottom}
        >
            <H7 style={[padding.py3, {color: theme.PrimaryDark}]}>Total 0</H7>
        </Container>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        fontWeight: "600",
        ...margin.ms4,
    },
});
export default TrackingDrawer;
