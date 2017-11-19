import React from 'react';
import { Image, Text, View } from 'react-native';
import { Asset, AppLoading, Font } from 'expo';

import Nav from './Nav';

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
    };
  }

  render() {
    // if (!this.state.isReady) {
    //   return (
    //     <AppLoading
    //       startAsync={this._cacheResourcesAsync}
    //       onFinish={() => this.setState({ isReady: true })}
    //       onError={console.warn}
    //     />
    //   );
    // }

    return (
      <Nav />
    );
  }

  _cacheResourcesAsync() {
    const fontAssets = cacheFonts([
      { lobster: require('../../assets/fonts/Lobster.otf') },
      { 'zilla-slab-regular': require('../../assets/fonts/ZillaSlab-Regular.otf') },
      { 'zilla-slab-bold': require('../../assets/fonts/ZillaSlab-Bold.otf') },
    ]);
    return Promise.all([...fontAssets]);
  }

}
