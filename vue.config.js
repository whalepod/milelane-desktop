module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: 'milelane',
        appId: 'co.milelane.app',
        copyright: 'Copyright © 2020 whalepod & Masashi Fujiike.',
        mac: {
          category: 'public.app-category.productivity',
          hardenedRuntime: true,
          gatekeeperAssess: false,
          entitlements: 'config/notarization/entitlements.mac.plist',
          entitlementsInherit: 'config/notarization/entitlements.mac.plist'
        },
        dmg: {
          sign: false
        },
        protocols: [
          {
            name: 'milelane',
            schemes: [
              'milelane'
            ]
          }
        ],
        afterSign: 'scripts/notarize.js'
      }
    }
  }
}
