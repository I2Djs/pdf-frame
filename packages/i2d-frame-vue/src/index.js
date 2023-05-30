import * as components from "./components";

const defaultComponents = components?.default;
const vueComponenets = {
	install(vue) {
		Object.keys(defaultComponents).forEach(name => {
			vue.component(name, defaultComponents[name]);
		})
	}
}
export default vueComponenets;