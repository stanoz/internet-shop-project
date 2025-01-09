import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux";
import store from "./redux/store.jsx";
import {AuthContextProvider} from "./context/AuthContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <AuthContextProvider>
                <App/>
            </AuthContextProvider>
        </Provider>
    </StrictMode>,
)
