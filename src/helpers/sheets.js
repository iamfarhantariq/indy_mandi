
import { registerSheet } from 'react-native-actions-sheet';
import ExampleTwo from '../components/ActionSheet';

/**
 * Registering the sheets here because otherwise sheet closes on
 * hot reload during development.
 */
registerSheet('example-two', ExampleTwo);
export { };