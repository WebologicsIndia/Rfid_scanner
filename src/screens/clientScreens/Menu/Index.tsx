import React, {useState} from "react";
import {borderRadius, Button, Container, H7, Insets, margin, padding} from "@WebologicsIndia/react-native-components";
import {theme} from "../../../config/theme";
import {ActivityIndicator, Pressable, ScrollView, StyleSheet, View} from "react-native";
import HamburgerSVG from "../../../assets/hamburger.svg";
import {batchUrl} from "../../../config/api";
import dayjs from "dayjs";
import Accordian from "../../../common/accordian";
import {fetchWithToken} from "../../../config/helper";
import {setBatch} from "../../../store/reducers/batchSlice";
import {connect} from "react-redux";

const TrackingDrawer = (props: any) => {
    const [insets] = useState(Insets.getInsets());
    const [loading, setLoading] = useState(false);
    const [inventoryData, setInventoryData] = useState([]);
    const [total, setTotal] = useState();
    const [update, setUpdate] = useState(false);
    const [expanded, setExpanded] = useState<any>([]);


    const getInventories = () => {
        setLoading(true);
        fetchWithToken(`${batchUrl}?page=1&results=10`, "GET").then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    console.log("data: ", data.results);
                    setInventoryData(data.results);
                    setTotal(data.total);

                });
            }
        }).catch(() => {
            setLoading(false);
        }).finally(() => {
            setLoading(false);
        });
    };

    // const updateBatchStatus = (batchId: any, status: string) => {
    //     setLoading(true);
    //     const body = {
    //         batchId: batchId,
    //         status: status === "Picked Up" ? "In Laundry" : status === "In Laundry" ? "Cleaned" : "Delivered"
    //     };
    //     fetchWithToken(batchUrl, "PUT", "", JSON.stringify(body)).then((res) => {
    //         if (res.status === 200) {
    //             res.json().then((data) => {
    //                 console.log(data.message);
    //             });
    //         }
    //     }).catch(() => {
    //         setLoading(false);
    //
    //     }).finally(() => {
    //         setLoading(false);
    //         setUpdate(!update);
    //     });
    // };

    React.useEffect(() => {
        getInventories();
    }, [update]);

    // React.useEffect(() => {
    //     getInventories();
    // }, []);


    if (loading) {
        return <View style={{justifyContent: "center", alignItems: "center"}}><ActivityIndicator size={"large"}
            color={theme.PrimaryDark} /></View>;
    }
    const batchList = (() => {
        props.navigation.openDrawer();
        setUpdate(!update);
    });

    const toggle = (index: number) => {
        const newExpanded = [...expanded];
        newExpanded[index] = !newExpanded[index];
        setExpanded(newExpanded);
    };
    return (
        <Container
            style={styles.container}
            backgroundColor={theme.White}
            header
            addIcon={<Pressable onPress={batchList}><HamburgerSVG /></Pressable>}
            headerText={"Inventories"}
            headerTextStyle={styles.headerText}
            headerColor={theme.Primary}
            bottom={insets.bottom * 1.5}
        >
            <H7 style={[padding.py3, {color: theme.PrimaryLight}]}>Total {total}</H7>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    inventoryData.length ?
                        inventoryData.map((item: any, index) => {
                            console.log("item: ", item);
                            return (
                                <Accordian
                                    expanded={expanded[index]}
                                    onPress={() => toggle(index)}
                                    style={[padding.p0, margin.my2, borderRadius.br2]}
                                    key={index}
                                    title={
                                        <View key={item._id}
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                alignItems: "center"
                                            }}>
                                            <View style={padding.pb3}>
                                                <H7 style={{color: theme.PrimaryDark}}>Batch Name</H7>
                                                <H7 style={{
                                                    color: theme.PrimaryLight,
                                                    textTransform: "capitalize"
                                                }}>{item.name}</H7>
                                                <H7 style={{color: theme.PrimaryDark}}>Tags</H7>
                                                <H7 style={{
                                                    color: theme.PrimaryLight,
                                                    textTransform: "capitalize"
                                                }}>{item.quantity}</H7>
                                            </View>
                                            <View style={margin.ms5}>
                                                <H7 style={{color: theme.PrimaryDark}}>Created</H7>
                                                <H7
                                                    style={{color: theme.PrimaryLight}}>{dayjs(item.createdAt).format("DD-MMM-YYYY : HH:MM A")}</H7>
                                                <H7 style={{color: theme.PrimaryDark}}>Client</H7>
                                                <H7 style={{
                                                    color: theme.PrimaryLight,
                                                    textTransform: "capitalize"
                                                }}>{item.assignedTo.name}</H7>
                                            </View>
                                        </View>
                                    }>
                                    {item.tags.length ?
                                        Object.entries(
                                            item.tags.reduce((acc: { [x: string]: any; }, tag: { itemType: string | number; }) => {
                                                acc[tag.itemType] = (acc[tag.itemType] || 0) + 1;
                                                return acc;
                                            }, {})
                                        ).map(([itemType, count], index) => {

                                            return (
                                                <View
                                                    key={index}
                                                    style={{
                                                        flexDirection: "row",
                                                        justifyContent: "flex-start",
                                                        alignItems: "center",
                                                        ...padding.px5
                                                    }}
                                                >
                                                    <H7 style={{color: theme.PrimaryDark, flex: 1}}>{itemType}</H7>
                                                    <H7 style={{
                                                        color: theme.PrimaryLight,
                                                        flex: 1,
                                                        textTransform: "capitalize"
                                                    }}>{parseInt(count as string)}</H7>
                                                </View>
                                            );
                                        })
                                        : <></>
                                    }
                                    <Button
                                        // onPress={() => {
                                        //     updateBatchStatus(item._id, item.status);
                                        // }}
                                    >
                                        <H7
                                            style={[{textTransform: "uppercase", color: theme.White, textAlign: "center"}]}>{
                                                item.status
                                            }</H7>

                                    </Button>

                                </Accordian>
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
        flex: 1
    },
    headerText: {
        fontWeight: "600",
        ...margin.ms4
    }
});
const mapStateToProps = (state: any) => {
    return {
        batchDetails: state.batch
    };
};
export default connect(mapStateToProps, {setBatch})(TrackingDrawer);
