import ReactDOM from "react-dom/client";
import "./main.scss";
import App from "./App";
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'vite/modulepreload-polyfill';
console.log(import.meta.url)

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <App />
</GoogleOAuthProvider>);
