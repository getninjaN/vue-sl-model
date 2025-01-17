export default {
  name: 'vue-sl-model',
  install: (app, _options) => {
    const wm = new WeakMap();
    app.directive("sl-model", {
      beforeMount(el, binding, _vnode) {
        const inputHandler = function inputHandler(event) {
          return (binding.instance[binding.value] = event.target.value);
        };

        wm.set(el, inputHandler);
        el.value = binding.value ?? "";
        el.addEventListener("input", inputHandler);
      },
      updated(el, binding) {
        el.value = binding.value ?? "";
      },
      unmounted(el, _binding) {
        const inputHandler = wm.get(el);
        el.removeEventListener(el, inputHandler);
      },
    });
  },
};
