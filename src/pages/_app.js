import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";

import { persistor, store } from "../state/store";
import { PersistGate } from "redux-persist/integration/react";

const MyApp = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
};

export default MyApp;
