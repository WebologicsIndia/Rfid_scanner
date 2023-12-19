package com.rfid_scanner;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.rscja.deviceapi.RFIDWithUHFUART;
import com.facebook.react.bridge.Callback;
import com.rscja.deviceapi.entity.UHFTAGInfo;
import com.rscja.deviceapi.exception.ConfigurationException;
//import com.rscja.deviceapi.entity


public class RFIDModule  extends ReactContextBaseJavaModule {

    private RFIDWithUHFUART reader;

    public RFIDModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RFIDModule";
    }

    @ReactMethod
    public void init(Callback successCallback, Callback errorCallback) {
        try {
//            Log.e("Tag", "TagInit: " + reader);
            reader = RFIDWithUHFUART.getInstance();
            reader.init();
            reader.setPower(50);
            reader.isPowerOn();

            successCallback.invoke("RFID initialization successful");

        } catch (Exception e) {
            Log.e("RFIDModule", "Unexpected error during initialization: " + e.getMessage());
            reader = null;
            errorCallback.invoke("Unexpected error during RFID initialization");
        }
    }

    @ReactMethod
    public void readTag(Callback successCallback, Callback errorCallback) {
        Log.d("Tag", "Uperwalatag: " + reader);
        if (reader != null) {
            try {
                UHFTAGInfo tagInfo = reader.readTagFromBuffer();
                Log.d("tagData", "tagInfo: " + tagInfo);
                if (tagInfo != null) {
                    String tagData = tagInfo.getEPC();
                    Log.d("tagData", "tagData: " + tagData);
                    successCallback.invoke(tagData);
                } else {
                    errorCallback.invoke("No tag data available in the buffer");
                }
            } catch (Exception e) {
                Log.e("RFIDModule", "Error reading tag: " + e.getMessage());
                errorCallback.invoke("Error reading RFID tag");
            }
        } else {
            errorCallback.invoke("RFID scanner not initialized");
        }
    }

    @ReactMethod
    public void writeTag(String epcData, Callback successCallback, Callback errorCallback) {
        if (reader != null) {

            boolean result = reader.writeDataToEpc(epcData, "NewDataToWrite");
            if (result) {
                successCallback.invoke("Write successful");
            } else {
                errorCallback.invoke("Write failed");
            }
        } else {
            errorCallback.invoke("RFID scanner not initialized");
        }
    }

@ReactMethod
    public void startInventory() {

//        reader = RFIDWithUHFUART.getInstance();
//        reader.init();
//        reader.setPower(10);
//        reader.isPowerOn();
//ṣ        Log.d("Tag", "tagInventory: " + reader);
        if (reader != null) {
            reader.startInventoryTag();
        } else {
            Log.d("InventoryTag", "Tag Not initialized");
        }

};

@ReactMethod
    public void stopInventory(Callback successCallback, Callback errorCallback) {
        if (reader != null) {
            boolean result = reader.stopInventory();
            if (result) {
                successCallback.invoke("Inventory stopped");
            } else {
                errorCallback.invoke("Failed to stop inventory");
            }
        } else {
            errorCallback.invoke("RFID scanner not initialized");
        }
    }
@ReactMethod
    public void readTagFromBuffer(Callback successCallback, Callback errorCallback) {
        if (reader != null) {
            UHFTAGInfo tagInfo = reader.readTagFromBuffer();
            if (tagInfo != null) {
                // You can access tag information from the UHFTAGInfo object.
                String epc = tagInfo.getEPC(); // EPC code of the tag
                String tid = tagInfo.getTid(); // TID code of the tag
                // You can access more information such as RSSI, frequency, etc.

                successCallback.invoke(tagInfo);
            } else {
                errorCallback.invoke("No tag data available in the buffer");
            }
        } else {
            errorCallback.invoke("RFID scanner not initialized");
        }
    }

}
