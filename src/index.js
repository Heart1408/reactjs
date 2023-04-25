import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../node_modules/font-awesome/css/font-awesome.min.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/configStore.js";
import { PersistGate } from "redux-persist/es/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./styles/app.scss";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
const onBeforeLift = (store) => {};
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate
        onBeforeLift={onBeforeLift(store)}
        loading={null}
        persistor={persistor}
      >
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </PersistGate>{" "}
    </Provider>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
