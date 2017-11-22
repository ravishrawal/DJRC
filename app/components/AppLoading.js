import React from 'react';
import { Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { AppLoading, Font } from 'expo';
import { fetchBarsFromServer } from '../redux/bars';

import Nav from './Nav';

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isReady: false,
    };
    this._cacheResourcesAsync = this._cacheResourcesAsync.bind(this);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

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
    this.props.fetchBarsFromServer();
    return Promise.all([...fontAssets]);
  }

}

const mapState = ({ bars }) => {
  return { bars };
};

const mapDispatch = (dispatch) => {
  return {
    fetchBarsFromServer: () => {
      dispatch(fetchBarsFromServer());
    }
  };
};

export default connect(mapState, mapDispatch)(App);
