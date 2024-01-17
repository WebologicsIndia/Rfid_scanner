import React, {useEffect} from "react";
import CustomDrawerContent from "../../common/CustomDrawerContent/CustomDrawerContent";
import HomeScreen from "../Home";
import TrackingDrawer from "../Menu";
import InventoryScreens from "../Inventory";
import ClientScreens from "../Clients";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {connect} from "react-redux";
import {login} from "../../store/reducers/userSlice";
import ClientHomeScreen from "../clientScreens/HomeScreen/HomeScreen";
import ClientTrackingDrawer from "../clientScreens/Menu/Index";
import HotelInventory from "../clientScreens/HotelInventory";
import UserDetails from "../userDetails/UserDetails";
import userClientDetails from "../clientScreens/userClientDetails/userClientDetails";
import {fetchWithToken} from "../../config/helper";
import {batchUrl, clientUrl} from "../../config/api";
import {setClient} from "../../store/reducers/clientSlice";
import {setBatch} from "../../store/reducers/batchSlice";

const Drawer = createDrawerNavigator();
const DrawerNavigation = (props: any) => {
    useEffect(() => {
        fetchWithToken(clientUrl, "GET").then((resp) => {
            if (resp.status === 200) {
                resp.json().then((data) => {
                    props.setClient({
                        data: data.results,
                        total: data.total,
                        page: 2
                    });
                });
            }
        });
        fetchWithToken(`${batchUrl}?page=1&results=10`, "GET").then((resp) => {
            if (resp.status === 200) {
                resp.json().then((data) => {
                    props.setBatch({
                        data: data.results,
                        page: 2,
                        total: data.total
                    });
                });
            }
        });


    }, []);
    return (
        <>
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false
                }}
                drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
                {
                    props?.user?.isClient ?
                        <>
                            <Drawer.Screen
                                name="Tag Scanner"
                                component={ClientHomeScreen}
                            />
                            <Drawer.Screen
                                name="Batches"
                                component={ClientTrackingDrawer}
                            />
                            <Drawer.Screen
                                name="Hotel Inventory"
                                component={HotelInventory}
                            />
                            <Drawer.Screen
                                name="User Details"
                                component={userClientDetails}
                            />
                        </>
                        :

                        <>
                            <Drawer.Screen
                                name="Tag Scanner"
                                component={HomeScreen}
                            />
                            <Drawer.Screen
                                name="Batches"
                                component={TrackingDrawer}
                            />
                            <Drawer.Screen
                                name="Inventory"
                                component={InventoryScreens}
                            />
                            <Drawer.Screen
                                name="Clients"
                                component={ClientScreens}
                            />
                            <Drawer.Screen
                                name="User Details"
                                component={UserDetails}
                            />
                        </>

                }

            </Drawer.Navigator>

        </>
    );
};
const mapStateToProps = (state: { user: { user: any; }; }) => ({
    user: state.user.user
});

export default connect(mapStateToProps, {login, setClient, setBatch})(DrawerNavigation);
