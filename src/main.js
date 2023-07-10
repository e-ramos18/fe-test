import { createApp } from "vue";
import "./style.css";
import "vue3-toastify/dist/index.css";
import App from "./App.vue";
import router from "./router";

// Create the Vue app and mount it with the router
const app = createApp(App);
app.use(router);
app.mount("#app");
