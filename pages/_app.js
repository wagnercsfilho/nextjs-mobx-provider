import { getStore, Provider } from "../store";
import { Component as ReactComponent } from "react";
import App from "next/app";

function withMobxStore(NextApp) {
  return class AppWithMobx extends ReactComponent {
    static async getInitialProps(appContext) {
      const store = getStore();
      appContext.ctx.store = store;

      return {
        ...(NextApp.getInitialProps
          ? await NextApp.getInitialProps(appContext)
          : {}),
        store,
      };
    }

    render() {
      return <NextApp {...this.props} />;
    }
  };
}

class MyApp extends App {
  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withMobxStore(MyApp);
