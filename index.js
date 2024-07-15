import {AppRegistry} from 'react-native';
import App from './App'; // Ensure this path correctly points to your main component
import {name as appName} from './app.json';

// Register the main component
AppRegistry.registerComponent(appName, () => App);
