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

import java.util.HashMap;


public class RFIDModule  extends ReactContextBaseJavaModule {

    private RFIDChannel rfidChannel;
    private BroadcastReceiver receiver;
    private HashMap<Integer, Integer> soundMap;

    public RFIDModule(ReactApplicationContext reactContext) {
        super(reactContext);

        rfidChannel = new RFIDChannel();
        initRFIDChannel();


        receiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                // Handle RFID event and send data back to JavaScript.
            }
        };
        IntentFilter filter = new IntentFilter("RFID_EVENT");
        reactContext.registerReceiver(receiver, filter);
    }

    @Override
    public String getName() {
        return "RFIDModule"; // This is the name by which this module can be called from JavaScript.
    }

    @ReactMethod
    public void initRFID() {
//        rfidChannel.init();
//        rfidChannel.getReader();
        // Add your initialization code for the RFID scanner here.
    }

    @ReactMethod
    public void scanRFID(Promise promise) {
        try {

            promise.resolve("RFID scan successful: "+promise);
        } catch (Exception e) {
            // Handle any errors and reject the promise.
            promise.reject("RFID_ERROR", e.getMessage());
        }
    }
        private void initRFIDChannel() {
            rfidChannel.free();
            if (rfidChannel.getReader() == null) {
                //new RFIDChannelAsync(RFIDAction.INIT).execute();
                new InitTask().execute();
            } else {
//                initRFID();
            }
        }

    public class InitTask extends AsyncTask<String, Integer, Boolean> {
        ProgressDialog mypDialog;

        @Override
        protected Boolean doInBackground(String... params) {
            // TODO Auto-generated method stub
            boolean result = rfidChannel.init();
            if (result) {
                rfidChannel.getReader().setPower(30);
            }
            return result;
        }

        @Override
        protected void onPostExecute(Boolean result) {
            super.onPostExecute(result);

            mypDialog.cancel();

        }



    }
}
