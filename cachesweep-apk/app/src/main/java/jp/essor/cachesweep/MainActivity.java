package jp.essor.cachesweep;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Typeface;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Looper;
import android.os.StatFs;
import android.os.storage.StorageManager;
import android.provider.Settings;
import android.system.OsConstants;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;

import java.text.DecimalFormat;

public class MainActivity extends Activity {
    private static final int REQ_CLEAR_CACHE = 4101;

    private TextView permissionText;
    private TextView freeText;
    private TextView resultText;
    private TextView reclaimedText;
    private Button cleanButton;

    private long freeBefore = -1L;
    private boolean waiting = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(buildUi());
        refresh();
    }

    @Override
    protected void onResume() {
        super.onResume();
        refresh();
    }

    private View buildUi() {
        ScrollView scroll = new ScrollView(this);
        scroll.setBackgroundColor(Color.rgb(248, 250, 252));

        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setPadding(dp(20), dp(44), dp(20), dp(28));
        scroll.addView(root);

        TextView title = label("CacheSweep", 30, true);
        title.setGravity(Gravity.CENTER);
        root.addView(title, full());

        TextView sub = label("キャッシュだけを清掃", 15, false);
        sub.setTextColor(Color.rgb(100, 116, 139));
        sub.setGravity(Gravity.CENTER);
        LinearLayout.LayoutParams subLp = full();
        subLp.bottomMargin = dp(26);
        root.addView(sub, subLp);

        root.addView(label("特別アクセス", 13, true), full());
        permissionText = label("確認中…", 20, true);
        LinearLayout.LayoutParams pLp = full();
        pLp.bottomMargin = dp(10);
        root.addView(permissionText, pLp);

        Button permissionButton = new Button(this);
        permissionButton.setText("権限を設定・確認");
        permissionButton.setAllCaps(false);
        permissionButton.setOnClickListener(v -> openAllFilesAccessSettings());
        LinearLayout.LayoutParams permissionLp = full();
        permissionLp.bottomMargin = dp(24);
        root.addView(permissionButton, permissionLp);

        root.addView(label("現在の空き容量", 13, true), full());
        freeText = label("—", 26, true);
        LinearLayout.LayoutParams fLp = full();
        fLp.bottomMargin = dp(22);
        root.addView(freeText, fLp);

        cleanButton = new Button(this);
        cleanButton.setText("キャッシュだけを清掃");
        cleanButton.setTextSize(17);
        cleanButton.setAllCaps(false);
        cleanButton.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        cleanButton.setTextColor(Color.WHITE);
        cleanButton.setBackgroundColor(Color.rgb(37, 99, 235));
        cleanButton.setMinHeight(dp(58));
        cleanButton.setOnClickListener(v -> beginCleanup());
        LinearLayout.LayoutParams cleanLp = full();
        cleanLp.bottomMargin = dp(14);
        root.addView(cleanButton, cleanLp);

        TextView note = label(
                "写真、ログイン情報、アプリ設定などのデータは削除しません。Android公式のキャッシュ削除画面を呼び出します。",
                13, false);
        note.setTextColor(Color.rgb(71, 85, 105));
        LinearLayout.LayoutParams noteLp = full();
        noteLp.bottomMargin = dp(26);
        root.addView(note, noteLp);

        root.addView(label("前回の結果", 13, true), full());
        resultText = label("まだ清掃していません", 19, true);
        LinearLayout.LayoutParams rLp = full();
        rLp.bottomMargin = dp(8);
        root.addView(resultText, rLp);

        reclaimedText = label("増えた空き容量：—", 22, true);
        reclaimedText.setTextColor(Color.rgb(21, 128, 61));
        root.addView(reclaimedText, full());

        TextView limit = label(
                "Android 11以降の仕様に従い、OSの確認画面で許可された場合だけキャッシュを削除します。偽の進捗表示は行いません。",
                12, false);
        limit.setTextColor(Color.rgb(100, 116, 139));
        LinearLayout.LayoutParams lLp = full();
        lLp.topMargin = dp(24);
        root.addView(limit, lLp);

        return scroll;
    }

    private void beginCleanup() {
        if (!Environment.isExternalStorageManager()) {
            resultText.setText("最初に権限を許可してください");
            reclaimedText.setText("増えた空き容量：—");
            openAllFilesAccessSettings();
            return;
        }

        freeBefore = getFreeBytes();
        waiting = true;
        refresh();
        resultText.setText("Androidの確認画面を開きます");
        reclaimedText.setText("増えた空き容量：—");

        try {
            Intent intent = new Intent(StorageManager.ACTION_CLEAR_APP_CACHE);
            startActivityForResult(intent, REQ_CLEAR_CACHE);
        } catch (SecurityException e) {
            waiting = false;
            resultText.setText("権限エラーです");
            refresh();
        } catch (ActivityNotFoundException e) {
            waiting = false;
            resultText.setText("この端末では清掃画面を起動できません");
            refresh();
        }
    }

    @Override
    @SuppressWarnings("deprecation")
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode != REQ_CLEAR_CACHE) return;

        waiting = false;
        new Handler(Looper.getMainLooper()).postDelayed(() -> {
            long after = getFreeBytes();
            long delta = (freeBefore >= 0 && after >= 0)
                    ? Math.max(0L, after - freeBefore) : -1L;

            if (resultCode == RESULT_OK) {
                resultText.setText("Androidが清掃完了を返しました");
                reclaimedText.setText("増えた空き容量：" + (delta >= 0 ? formatBytes(delta) : "計測不可"));
            } else if (resultCode == RESULT_CANCELED) {
                resultText.setText("清掃はキャンセルされました");
                reclaimedText.setText("増えた空き容量：0 B");
            } else if (resultCode == OsConstants.EIO) {
                resultText.setText("キャッシュ清掃中にエラーが発生しました");
                reclaimedText.setText("増えた空き容量：" + (delta >= 0 ? formatBytes(delta) : "—"));
            } else {
                resultText.setText("Android結果コード：" + resultCode);
                reclaimedText.setText("増えた空き容量：" + (delta >= 0 ? formatBytes(delta) : "—"));
            }
            refresh();
        }, 700);
    }

    private void refresh() {
        boolean granted = Environment.isExternalStorageManager();
        permissionText.setText(granted ? "許可済み" : "未許可");
        permissionText.setTextColor(granted ? Color.rgb(21, 128, 61) : Color.rgb(185, 28, 28));

        long free = getFreeBytes();
        long total = getTotalBytes();
        freeText.setText(free >= 0 && total > 0
                ? formatBytes(free) + " / " + formatBytes(total)
                : "取得できません");

        cleanButton.setEnabled(granted && !waiting);
        cleanButton.setAlpha(cleanButton.isEnabled() ? 1f : 0.55f);
    }

    private void openAllFilesAccessSettings() {
        try {
            Intent intent = new Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION);
            intent.setData(Uri.parse("package:" + getPackageName()));
            startActivity(intent);
        } catch (ActivityNotFoundException e) {
            startActivity(new Intent(Settings.ACTION_MANAGE_ALL_FILES_ACCESS_PERMISSION));
        }
    }

    private long getFreeBytes() {
        try {
            return new StatFs(Environment.getDataDirectory().getAbsolutePath()).getAvailableBytes();
        } catch (Exception e) {
            return -1L;
        }
    }

    private long getTotalBytes() {
        try {
            return new StatFs(Environment.getDataDirectory().getAbsolutePath()).getTotalBytes();
        } catch (Exception e) {
            return -1L;
        }
    }

    private TextView label(String text, int size, boolean bold) {
        TextView v = new TextView(this);
        v.setText(text);
        v.setTextSize(size);
        v.setTextColor(Color.rgb(15, 23, 42));
        if (bold) v.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        return v;
    }

    private LinearLayout.LayoutParams full() {
        return new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT);
    }

    private int dp(int value) {
        return Math.round(value * getResources().getDisplayMetrics().density);
    }

    private String formatBytes(long bytes) {
        if (bytes < 1024) return bytes + " B";
        double value = bytes;
        String[] units = {"KB", "MB", "GB", "TB"};
        int unit = -1;
        while (value >= 1024 && unit < units.length - 1) {
            value /= 1024.0;
            unit++;
        }
        DecimalFormat df = value >= 100 ? new DecimalFormat("0")
                : value >= 10 ? new DecimalFormat("0.0")
                : new DecimalFormat("0.00");
        return df.format(value) + " " + units[Math.max(0, unit)];
    }
}
