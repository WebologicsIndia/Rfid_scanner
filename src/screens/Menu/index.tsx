import React, {useState} from "react";
import {Container, H7, Insets, margin, padding} from "@WebologicsIndia/react-native-components";
import {theme} from "../../config/theme";
import {ActivityIndicator, Pressable, FlatList, StyleSheet, View} from "react-native";
import HamburgerSVG from "../../assets/hamburger.svg";
import {batchUrl} from "../../config/api";
import {fetchWithToken} from "../../config/helper";
import {setBatch} from "../../store/reducers/batchSlice";
import {connect} from "react-redux";
import Items from "./components/Items";

const TrackingDrawer = (props: any) => {
    const [insets] = useState(Insets.getInsets());
    const [loading, setLoading] = useState(false);
    const getInventories = () => {
        setLoading(true);
        fetchWithToken(`${batchUrl}?page=1&results=10`, "GET").then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    props.setBatch({
                        data: data.results,
                        page: 1,
                        total: data.total
                    });
                });
            }
        }).catch(() => {
            setLoading(false);
        }).finally(() => {
            setLoading(false);
        });
    };


    if (loading) {
        return <View style={{justifyContent: "center", alignItems: "center"}}><ActivityIndicator size={"large"}
            color={theme.PrimaryDark} /></View>;
    }

    return (
        <Container
            style={styles.container}
            backgroundColor={theme.White}
            header
            addIcon={<Pressable onPress={() => props.navigation.openDrawer()}><HamburgerSVG /></Pressable>}
            headerText={"Inventories"}
            headerTextStyle={styles.headerText}
            headerColor={theme.Primary}
            bottom={insets.bottom * 1.5}
        >
            <H7 style={[padding.py3, {color: theme.PrimaryLight}]}>Total {props.batchesData.total}</H7>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={props.batchesData.data}
                renderItem={({item, index}: any) => (
                    props.batchesData.data.length ? (
                        <Items
                            item={item}
                            index={index}
                            key={index}
                            getInventories={getInventories}
                            navigation={props.navigation}
                        />
                    ) :
                        (<H7>No Data found</H7>)
                )}
            />
        </Container>

    );
}
;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerText: {
        fontWeight: "600",
        ...margin.ms4
    }
});

const mapStateToProps = (state: any) => {
    return {
        batchesData: state.batch
    };
};
export default connect(mapStateToProps, {setBatch})(TrackingDrawer);

