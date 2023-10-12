import React, {useState} from "react";
import {Container,  H7, Insets, margin, padding} from "@WebologicsIndia/react-native-components";
import {theme} from "../../config/theme";
import {Pressable, ScrollView, StyleSheet, View} from "react-native";
import HamburgerSVG from "../../assets/hamburger.svg";
import {inventoryUrl} from "../../config/api";
import dayjs from "dayjs";

const TrackingDrawer = (props:any) => {
    const [insets] = useState(Insets.getInsets());
    const [loding, setLoading] = useState(false);
    const [inventoryData, setInventoryData] = useState([]);
    const [total, setTotal] = useState();
    const [error, setError] = useState("");
    const getInventories = () => {
        setLoading(true);
        fetch(`${inventoryUrl}?page=1&results=10`).then((res) => {
            if (res.status === 200){
                res.json().then((data) => {
                    console.log("data", data);
                    setInventoryData(data.results);
                    setTotal(data.total);
                });
            } else {
                res.json().then((data) => {
                    setError(data.message);
                    setLoading(false);
                });
            }
        }).finally(() => {
            setLoading(false);
        });
    };
    React.useEffect(() => {
        getInventories();
    }, []);
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
            <H7 style={[padding.py3, {color: theme.PrimaryDark}]}>Total {total}</H7>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    inventoryData.length ?
                        inventoryData.map((item:any) => {
                            console.log(item);
                            return(
                                <View key={item._id} style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                                    <View style={padding.pb3}>
                                        <H7 style={{color: theme.PrimaryDark}}>Name</H7>
                                        <H7 style={{color: theme.PrimaryDark}}>{item.itemType}</H7>
                                        <H7 style={{color: theme.PrimaryDark}}>Tags</H7>
                                        <H7 style={{color: theme.PrimaryDark}}>0</H7>
                                    </View>
                                    <View>
                                        <H7 style={{color: theme.PrimaryDark}}>Created</H7>
                                        <H7 style={{color: theme.PrimaryDark}}>{dayjs(item.createdAt).format("DD-MMM-YYYY : HH-MM-A")}</H7>
                                    </View>
                                </View>
                            );
                        }) :
                        <H7>No Data found</H7>
                }
            </ScrollView>
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
