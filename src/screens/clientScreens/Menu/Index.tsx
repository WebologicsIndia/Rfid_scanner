import React, {useState} from "react";
import {borderRadius, Button, Container, H7, Insets, margin, padding} from "@WebologicsIndia/react-native-components";
import {theme} from "../../../config/theme";
import {Pressable, ScrollView, StyleSheet, View} from "react-native";
import HamburgerSVG from "../../../assets/hamburger.svg";
import dayjs from "dayjs";
import Accordian from "../../../common/accordian";
import {connect} from "react-redux";

const TrackingDrawer = (props: any) => {
    const [insets] = useState(Insets.getInsets());
    const [expanded, setExpanded] = useState<any>([]);

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
            addIcon={<Pressable onPress={() => props.navigation.openDrawer()}><HamburgerSVG /></Pressable>}
            headerText={"Inventories"}
            headerTextStyle={styles.headerText}
            headerColor={theme.Primary}
            bottom={insets.bottom * 1.5}
        >
            <H7 style={[padding.py3, {color: theme.PrimaryLight}]}>Total {props.batchesData.total}</H7>
            <ScrollView showsVerticalScrollIndicator={false}
                style={{...padding.px0}}
            >
                {
                    props.batchesData.data.length ?
                        props.batchesData.data.map((item: any, index: any) => {
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
                                                justifyContent: "flex-end",
                                                alignItems: "flex-start",
                                                gap: 16
                                            }}>
                                            <View style={padding.p2}>
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
                                            <View style={padding.py2}>
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
                                                        ...padding.px5,
                                                        ...padding.py2
                                                    }}
                                                >
                                                    <H7 style={{
                                                        color: theme.PrimaryDark,
                                                        flex: 1,
                                                        textTransform: "capitalize"
                                                    }}>{itemType}</H7>
                                                    <H7 style={{
                                                        color: theme.PrimaryLight,
                                                        flex: 1
                                                    }}>{parseInt(count as string)}</H7>
                                                </View>
                                            );
                                        })
                                        : <></>
                                    }
                                    <Button>
                                        <H7 style={[{
                                            textTransform: "uppercase",
                                            color: theme.White,
                                            textAlign: "center"
                                        }]}>
                                            {item.status}
                                        </H7>

                                    </Button>

                                </Accordian>
                            );
                        }) :
                        <H7>No Data found</H7>
                }

            </ScrollView>
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
export default connect(mapStateToProps)(TrackingDrawer);
