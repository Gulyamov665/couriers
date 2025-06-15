package com.couriers

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Intent
import android.os.Build
import android.os.IBinder
import android.util.Log
import androidx.core.app.NotificationCompat

class SocketService : Service() {
    companion object {
        private const val CHANNEL_ID = "socket_service_channel"
        private const val TAG = "SocketService"
    }

    override fun onCreate() {
        super.onCreate()
        Log.d(TAG, "✅ Foreground service onCreate")
        createChannel()
        startForeground(
            1,
            NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("Aurora Delivery")
                .setContentText("Сервис фонового подключения запущен")
                .setSmallIcon(R.mipmap.ic_launcher)
                .setPriority(NotificationCompat.PRIORITY_LOW)
                .build()
        )
    }

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onDestroy() {
        Log.d(TAG, "🛑 Foreground service onDestroy")
        super.onDestroy()
    }

    private fun createChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val ch = NotificationChannel(
                CHANNEL_ID,
                "Socket Foreground Service",
                NotificationManager.IMPORTANCE_LOW
            )
            (getSystemService(NotificationManager::class.java))?.createNotificationChannel(ch)
        }
    }
}
