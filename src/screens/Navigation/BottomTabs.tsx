import React, {useEffect} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {height} from "@WebologicsIndia/react-native-components";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreens from "../Home/index";
import Batches from "../Menu/index";
import Inventories from "../Inventory/index";
import Profile from "../Profile";
import Scanner from "../Scanner";
import {fetchWithToken} from "../../config/helper";
import {batchUrl, clientUrl} from "../../config/api";
import {connect} from "react-redux";
import {setClient} from "../../store/reducers/clientSlice";
import {setBatch} from "../../store/reducers/batchSlice";

const BottomTabs = (props: any) => {
    const Tab = createBottomTabNavigator();
    useEffect(() => {
        fetchWithToken(clientUrl, "GET").then((resp) => {
            if (resp.status === 200) {
                resp.json().then((data) => {
                    props.setClient({
                        data: data.results,
                        total: data.total,
                        page: 1
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
        <Tab.Navigator
            initialRouteName={"home"}
            backBehavior={"initialRoute"}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color}) => {
                    let iconName;
                    switch (route.name) {
                        case "home" :
                            iconName = focused ? "home" : "home-outline";
                            break;
                        case "batches" :
                            iconName = focused ? "basket" : "basket-outline";
                            break;
                        case "inventories" :
                            iconName = focused ? "pricetags" : "pricetags-outline";
                            break;
                        case "profile" :
                            iconName = focused ? "person-circle-sharp" : "person-outline";
                            break;
                        default  :
                            iconName = focused ? "barcode" : "barcode-outline";
                            break;
                    }
                    return <Ionicons name={iconName} color={color} size={20} />;
                },
                gestureEnabled: false,
                headerShown: false,
                tabBarShowLabel: true,
                tabBarStyle: {
                    height: height.h1.height * 1.65,
                    borderTopWidth: 0,
                    elevation: 2,
                    backgroundColor: props.Theme
                }
            })}
        >
            <Tab.Screen name="home" component={HomeScreens} />
            <Tab.Screen name="batches" component={Batches} />
            <Tab.Screen name="scanner" component={Scanner} />
            <Tab.Screen name="inventories" component={Inventories} />
            <Tab.Screen name="profile" component={Profile} />
        </Tab.Navigator>
    );
};

export default connect(null, {setClient, setBatch})(BottomTabs);
