import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ScanTagsScreen from "./components/ScanTags";
import InvetoryButtonModal from "./components/InvetoryButtonModel";

const Stack = createNativeStackNavigator();

const InventoryScreens = () => {
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                animation: "slide_from_right"
            }}
        >
            <Stack.Screen name="Add Inventories" component={InvetoryButtonModal} />
            <Stack.Screen name="ScanTags" component={ScanTagsScreen} />
            {/*<Stack.Screen name="UploadExcel" component={UploadExcel} />*/}
        </Stack.Navigator>
    );
};
export default InventoryScreens;

