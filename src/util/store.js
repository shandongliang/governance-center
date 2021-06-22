import store from 'store2';
import Constant from '../constant/index';

const { session, local } = store;

const authStore = session.namespace(Constant.NAMESPACE_AUTH);
const menuStore = session.namespace(Constant.NAMESPACE_MENU);
const cacheStore = session.namespace(Constant.NAMESPACE_CACHE);
const navStore = session.namespace(Constant.NAMESPACE_NAV); // Pandora2.0
const userStore = local.namespace(Constant.NAMESPACE_USER) // Pandora2.4.0

export { authStore, menuStore, cacheStore, navStore, userStore } // Pandora2.4.0
