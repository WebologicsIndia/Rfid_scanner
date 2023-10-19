import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Inventories from "./Inventories";
import InventoryDetail from "./InventoryDetail";
const Index = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={"all_inventories"} component={Inventories}/>
            <Stack.Screen name={"inventory_details"} component={InventoryDetail}/>
        </Stack.Navigator>
    );
};

export default Index;
