package com.rfid_scanner;

import android.app.ProgressDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.AsyncTask;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.rscja.deviceapi.RFIDWithUHFUART;
import com.facebook.react.bridge.Callback;
import com.rscja.deviceapi.entity.UHFTAGInfo;

import java.util.HashMap;


public class RFIDModule  extends ReactContextBaseJavaModule {

//    private RFIDChannel rfidChannel;
//    private BroadcastReceiver receiver;
//    private HashMap<Integer, Integer> soundMap;
//
//    public RFIDModule(ReactApplicationContext reactContext) {
//        super(reactContext);
//
//        rfidChannel = new RFIDChannel();
//        initRFIDChannel();
//
//
//        receiver = new BroadcastReceiver() {
//            @Override
//            public void onReceive(Context context, Intent intent) {
//                // Handle RFID event and send data back to JavaScript.
//            }
//        };
//        IntentFilter filter = new IntentFilter("RFID_EVENT");
//        reactContext.registerReceiver(receiver, filter);
//    }
//
//    @Override
//    public String getName() {
//        return "RFIDModule"; // This is the name by which this module can be called from JavaScript.
//    }
//
//    @ReactMethod
//    public void initRFID() {
////        rfidChannel.init();
////        rfidChannel.getReader();
//        // Add your initialization code for the RFID scanner here.
//    }
//
//    @ReactMethod
//    public void scanRFID(Promise promise) {
//        try {
//
//            promise.resolve("RFID scan successful: "+promise);
//        } catch (Exception e) {
//            // Handle any errors and reject the promise.
//            promise.reject("RFID_ERROR", e.getMessage());
//        }
//    }
//        private void initRFIDChannel() {
//            rfidChannel.free();
//            if (rfidChannel.getReader() == null) {
//                //new RFIDChannelAsync(RFIDAction.INIT).execute();
//                new InitTask().execute();
//            } else {
////                initRFID();
//            }
//        }
//
//    public class InitTask extends AsyncTask<String, Integer, Boolean> {
//        ProgressDialog mypDialog;
//
//        @Override
//        protected Boolean doInBackground(String... params) {
//            // TODO Auto-generated method stub
//            boolean result = rfidChannel.init();
//            if (result) {
//                rfidChannel.getReader().setPower(30);
//            }
//            return result;
//        }
//
//        @Override
//        protected void onPostExecute(Boolean result) {
//            super.onPostExecute(result);
//
//            mypDialog.cancel();
//
//        }
//
//
//
//    }
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
            reader = RFIDWithUHFUART.getInstance();

            successCallback.invoke("Initialization successful ");
        } catch (Exception e) {
            reader = null;
            errorCallback.invoke("Initialization failed");
        }
    }

    @ReactMethod
    public void free() {
        if (reader != null) {
            reader.free();
            reader = null;
        }
    }
@ReactMethod
    public void readTag(Callback successCallback, Callback errorCallback) {
        if (reader != null) {
            UHFTAGInfo tagInfo = reader.readTagFromBuffer();
            if (tagInfo != null) {
                String tagData = tagInfo.getEPC();
                successCallback.invoke(tagData);
            } else {
                errorCallback.invoke("No tag found");
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
    public void startInventory(Callback successCallback, Callback errorCallback) {
        if (reader != null) {
            boolean result = reader.startInventoryTag();
            if (result) {
                successCallback.invoke("Inventory started");
            } else {
                errorCallback.invoke("Failed to start inventory");
            }
        } else {
            errorCallback.invoke("RFID scanner not initialized");
        }
    }
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
