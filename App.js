import { Provider } from 'react-redux';
import store from './redux/store';
import { ModalPortal } from 'react-native-modals';
import { UserContext } from './UserContext';
import ScreensNav from './screens/ScreensNav';


export default function App() {
  
  return (
    <Provider store={store}>
      <UserContext>
        <ScreensNav/>
        <ModalPortal/>
      </UserContext>
    </Provider>
  );
}
