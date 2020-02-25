module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "co.milelane.app",
        win: {
          target: "portable",
          icon: "build/icons/icon.png"
        },
        mac: {
          target: "dmg",
          icon: "build/icons/icon.png"
        }
      }
    }
  }
};
