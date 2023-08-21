import Toast, { PluginOptions, POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const options: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, options);
});
