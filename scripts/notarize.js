const { notarize } = require('electron-notarize');

exports.default = async function notarizing(context) {
    const { appOutDir } = context;
    const appName = context.packager.appInfo.productFilename;

    console.log('Started notarization request.');
    await notarize({
        appBundleId: 'co.milelane.app',
        appPath: `${appOutDir}/${appName}.app`,
        appleId: process.env.APPLE_ID,
        appleIdPassword: process.env.APPLE_APP_SPECIFIC_PASSWORD,
    });
    console.log('Finished notarization request.');
}
