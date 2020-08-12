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

        NetworkRequest request = new NetworkRequest.Builder()
                .addTransportType(NetworkCapabilities.TRANSPORT_CELLULAR)
                .addCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET).build();

        connectivityManager.requestNetwork(request, new ConnectivityManager.NetworkCallback() {

            @Override
            public void onAvailable(final Network network) {
                Toast.makeText(reactContext, "Mobile data available", Toast.LENGTH_SHORT).show();
                final NetworkInfo netInfo = connectivityManager.getNetworkInfo(network);
                if (netInfo.getType() == ConnectivityManager.TYPE_MOBILE && netInfo.getState() == NetworkInfo.State.CONNECTED) {
                    try {
                        NetworkModule.this.initializeRequest(network, url, promise);
                    } catch (IOException e) {
                        e.printStackTrace();
                        // do remove callback. if you forget to remove it, you will received callback when cellular connect again.
                        connectivityManager.unregisterNetworkCallback(this);
                    }
                }

            }

            @Override
            public void onLost(Network network) {
                super.onLost(network);
                Toast.makeText(reactContext, "Mobile data lost", Toast.LENGTH_SHORT).show();
                promise.reject(new Exception());
            }

            @Override
            public void onUnavailable() {
                super.onUnavailable();
                Toast.makeText(reactContext, "Mobile data not available", Toast.LENGTH_SHORT).show();
                promise.reject(new Exception());
            }
        });
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
