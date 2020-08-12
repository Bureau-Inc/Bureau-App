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

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.IOException;
import java.net.CookiePolicy;
import java.util.Map;
import java.util.HashMap;

import okhttp3.Call;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.JavaNetCookieJar;

public class NetworkModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

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
        Toast.makeText(getReactApplicationContext(), "Init Request", Toast.LENGTH_SHORT).show();
        this.connectToAvailableNetwork(url, promise);
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    public void connectToAvailableNetwork(String url, Promise promise) {
        ConnectivityManager connectivityManager =  (ConnectivityManager)
                reactContext.getSystemService(Context.CONNECTIVITY_SERVICE);
        Network[] networks = connectivityManager.getAllNetworks();
        Network mobileNetwork = null;
        Network wifiNetwork = null;
        for (final Network network : networks) {
            final NetworkInfo netInfo = connectivityManager.getNetworkInfo(network);
            if (netInfo.getType() == ConnectivityManager.TYPE_MOBILE && netInfo.getState() == NetworkInfo.State.CONNECTED) {
                mobileNetwork = network;
                break;
            } else if (netInfo.getType() == ConnectivityManager.TYPE_WIFI && netInfo.getState() == NetworkInfo.State.CONNECTED) {
                wifiNetwork = network;
            }
        }
        try {
            if (mobileNetwork != null) {
                this.initializeRequest(mobileNetwork, url, promise);
            } else if (wifiNetwork != null) {
                this.initializeRequest(wifiNetwork, url, promise);
            } else {
                promise.reject(new Exception());
            }
        } catch(Exception exception) {
            promise.reject(exception);
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
        OkHttpClient client = builder.build();

        Request request = new Request.Builder().url(url).build();
        Call call = client.newCall(request);
        String responseBody;
        try (Response response = call.execute()) {
            if (response.body() != null) {
                responseBody = response.body().string();
                promise.resolve(responseBody);
            } else {
                promise.reject(new Exception());
            }
        } catch(Exception error) {
            promise.reject(error);
        }
    }
}
