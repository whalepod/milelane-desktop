module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "co.milelane.app",
        win: {
          target: "portable",
          icon: "build/icons/icon.ico"
        },
        mac: {
          target: "dmg",
          icon: "build/icons/icon.icns"
        }
      }
    }
  }
};
