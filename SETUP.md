# Quarters: install and sync

Quarters is a web app you install on your phone. It works offline. Sync with Google Drive is optional and keeps your data safe and shared between devices.

## 1. Put it online (GitHub Pages)

If you already host Marginalia and Commonplace, this takes two minutes and uses the same account.

1. On GitHub, create a **new repository** named `quarters` (public).
2. Upload **every file in this folder** (including `.nojekyll`).
3. Go to **Settings → Pages**. Under *Build and deployment* choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then Save.
4. After a minute your app is at `https://YOUR-USERNAME.github.io/quarters/`.

## 2. Turn on Google Drive sync

Skip this if you only want the app on one device. Everything else works without it.

**If you already did this for Marginalia or Commonplace, you are almost done.** Both apps are on the same site (`https://YOUR-USERNAME.github.io`), so the same Google key works. You do not need to change anything in Google Cloud.

1. Open `config.js`.
2. Replace `PASTE_YOUR_CLIENT_ID_HERE` with the **same Client ID** you used for your other apps. Save, and upload the file again.
3. Open Quarters, go to **Setup → Sync with Google Drive → Connect Google Drive**, and allow access.

**If this is your first time**, in Google Cloud Console (console.cloud.google.com):

1. Create or choose a project and **enable the Google Drive API**.
2. *APIs & Services → OAuth consent screen*: choose External, add your email as a test user, and add the scope `.../auth/drive.appdata`.
3. *Credentials → Create credentials → OAuth client ID → Web application*. Under **Authorized JavaScript origins** add `https://YOUR-USERNAME.github.io` (no path, no trailing slash).
4. Copy the Client ID into `config.js` as above.

Your data is stored in a hidden app folder in your Drive. It does not show up in your Drive file list, and only this app can read it.

## 3. Install it on your phone

- **iPhone (Safari):** Share → **Add to Home Screen**.
- **Android (Chrome):** menu → **Install app** (or Add to Home screen).

## How sync works

- Your plan and settings sync as one file. If two devices change the plan at the same time, the newer change wins and the other version is saved. You can switch to it in Setup → Sync.
- Your logged time syncs in monthly files that **merge**, so two devices can never erase each other's history.
- Sample history is never uploaded. Hyperfocus timers and your current mode stay on the device where you started them.

## Alerts

Phones pause web apps soon after you leave them, so the hyperfocus cues work best while the app is open. In **Setup → Display and data** you can allow notifications, which work while the app is recently active. For a guaranteed alert, tap **Add an alarm to my calendar** inside a hyperfocus session, and your phone's calendar will ring.

## Backups

Setup → **Download a backup** saves everything to a file. **Restore a backup** puts it back, from a file or from pasted text. Do this before switching phones if you are not using sync.

## If something goes wrong

- **"Add your Google Client ID"**: `config.js` still has the placeholder.
- **Sign-in popup is blocked**: allow pop-ups for your site, then press Connect again.
- **"Reconnect"**: your Google session expired after an hour away. Press it once.
- **The app looks old after an update**: close it completely and open it again. It updates in the background.
