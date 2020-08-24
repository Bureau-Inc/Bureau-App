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
import java.util.concurrent.TimeUnit;

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
                NetworkRequest networkRequest = new NetworkRequest.Builder()
                        .addTransportType(NetworkCapabilities.TRANSPORT_CELLULAR)
                        .addCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
                        .build();
             if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                 connectivityManager.requestNetwork(networkRequest, new ConnectivityManager.NetworkCallback(){
                     @Override
                     public void onUnavailable(){
                         super.onUnavailable();
                         promise.reject(new Exception("Data not available"));
                     }

                     @Override
                     public void onAvailable(Network network) {
                         super.onAvailable(network);
                         try {
                             initializeRequest(network, url, promise);
                         } catch (IOException e) {
                             // TODO Record error using sentry / firebase
                         }
                     }
                 }, 3000);
             }
             else{
                 connectivityManager.requestNetwork(networkRequest, new ConnectivityManager.NetworkCallback(){
                     @Override
                     public void onUnavailable(){
                         super.onUnavailable();
                         promise.reject(new Exception("Data not available"));
                     }

                     @Override
                     public void onAvailable(Network network) {
                         super.onAvailable(network);
                         try {
                             initializeRequest(network, url, promise);
                         } catch (IOException e) {
                             // TODO Record error using sentry / firebase
                         }
                     }
                 });
             }
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
        OkHttpClient client = builder
                .connectTimeout(30, TimeUnit.SECONDS)
                .writeTimeout(30, TimeUnit.SECONDS)
                .readTimeout(30, TimeUnit.SECONDS)
                .build();

        Request request = new Request.Builder().url(url).build();
        client.newCall(request).enqueue(new Callback() {

            @Override
            public void onFailure(Call call, IOException e) {
                promise.reject(e);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if(response.isSuccessful()) {
                    if (response.body() != null) {
                        promise.resolve(response.body().string());
                    } else {
                        promise.reject(new Exception("Response null"));
                    }
                }
                 else{
                    promise.reject(new Exception("Response failed"));
                }
            }
        });
    }
}
