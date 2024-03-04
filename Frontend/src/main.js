import App from './App.svelte';

const app = new App({
  target: document.body,
  props: {
    // You can pass initial props from here if needed
    name: 'world'
  }
});

export default app;
