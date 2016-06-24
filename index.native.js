import React, {
  Component
} from 'react';

import {
  AppRegistry
} from 'react-native';


import Config from './config';


import configureStore from './src/store/configureStore';
import setup from './src/setup';

AppRegistry.registerComponent('App', setup);
