<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
function triggerError() {
  // // vue 触发报错
  // // 触发 Vue 运行时错误
  // const error = new Error('这是一个自定义错误');
  // throw error;

  // 触发 Vue 编译时错误
  const obj: any = null;
  console.log(obj.undefinedProperty);
}
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <button @click="triggerError">触发报错</button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
