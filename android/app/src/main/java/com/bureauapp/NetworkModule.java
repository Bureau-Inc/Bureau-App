package com.bureauapp;
import android.content.Context;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.net.NetworkInfo;
import android.net.NetworkRequest;
import android.os.Build;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.RequiresApi;
import androidx.annotation.WorkerThread;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.IOException;
import java.net.CookiePolicy;
import java.util.Map;
import java.util.HashMap;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.JavaNetCookieJar;

public class NetworkModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";
    private static boolean IS_MOBILE_CONNECTED = false;
    private static boolean IS_WIFI_CONNECTED = false;

    NetworkModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "NetworkModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    @ReactMethod
    public void get(String url, Promise promise) {
        Thread thread = new Thread(new Runnable(){
            @Override
            public void run() {
                try {
                    //Your code goes here
                  //  Toast.makeText(getReactApplicationContext(), "Init Request", Toast.LENGTH_SHORT).show();
                    NetworkModule.this.connectToAvailableNetwork(url, promise);
                } catch (Exception e) {
                    throw(e);
                }
            }
        });
        thread.start();
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    public void connectToAvailableNetwork(String url, Promise promise) {
        ConnectivityManager connectivityManager =  (ConnectivityManager)
                reactContext.getSystemService(Context.CONNECTIVITY_SERVICE);
        

        // Network[] networks = connectivityManager.getAllNetworks();

        //     for (final Network network : networks) {
        //     final NetworkInfo netInfo = connectivityManager.getNetworkInfo(network);
        //     if (netInfo.getType() == ConnectivityManager.TYPE_MOBILE && netInfo.getState() == NetworkInfo.State.CONNECTED) {
        //         IS_MOBILE_CONNECTED = true;
        //         // break;
        //     } else if (netInfo.getType() == ConnectivityManager.TYPE_WIFI && netInfo.getState() == NetworkInfo.State.CONNECTED) {
        //         IS_WIFI_CONNECTED = true;
        //     }
        // }
                NetworkRequest netwokRequest = new NetworkRequest.Builder()
                        .addTransportType(NetworkCapabilities.TRANSPORT_CELLULAR)
                        .addCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
                        .build();



        Request request = new Request.Builder()
                .url("https://api.ipify.org/")
                .build();
        connectivityManager.requestNetwork(netwokRequest, new ConnectivityManager.NetworkCallback(){
            @Override
            public void onUnavailable(){
                super.onUnavailable();
                NetworkInfo activeNetwork = connectivityManager.getActiveNetworkInfo();
                if(activeNetwork != null && activeNetwork.getType() == ConnectivityManager.TYPE_WIFI){
                    promise.reject(new Exception("WIFI_CONNECTED"));
                }
                promise.reject(new Exception("MObile data not available"));
            }

            @Override
            public void onAvailable(Network network) {
                super.onAvailable(network);
                try {
                    initializeRequest(network, url, promise);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }, 10000);
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    public void initializeRequest(Network network, String url, Promise promise) throws IOException {

        java.net.CookieManager cookieManager = new java.net.CookieManager();
        cookieManager.setCookiePolicy(CookiePolicy.ACCEPT_ALL);
        // do request with the network
        OkHttpClient.Builder builder = new OkHttpClient.Builder();
        builder.followRedirects(true);
        builder.followSslRedirects(true);
        builder.cookieJar(new JavaNetCookieJar(cookieManager));
        builder.followRedirects(true);
        builder.followSslRedirects(true);
        builder.socketFactory(network.getSocketFactory());
        OkHttpClient client = builder.build();

        Request request = new Request.Builder().url(url).build();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                promise.reject(e);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if(response.isSuccessful())
                if (response.body() != null) {
                    String responseBody = response.body().string();
                    Log.d("hiburo",responseBody);
                    promise.resolve(responseBody);
                } else {
                    promise.reject(new Exception());
                }
            }
        });















//        String responseBody;
//        try (Response response = call.execute()) {
//
//        } catch(Exception error) {
//            promise.reject(error);
//        }
    }
}
