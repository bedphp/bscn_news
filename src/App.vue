<script setup>
import { provide, ref, watch } from 'vue';
import format from './modules/format';
import { useRoute } from 'vue-router';
const api = '/news.json';
//const api = `https://inbox.brawlstars.cn/data/zh_cn/news/content.json`;
//const api = `http://192.168.0.100:5173/content.json`;
const s_hidden = ref(false);
const route = useRoute();
const global_news = ref({});
const meta = ref(false);
let getNews = async () => {
  let res = await fetch(api).then(e => e.json()).then(e => ({ json: e, fetchok: true })).catch(e => ({ fetchok: false }))
  if (res.fetchok) {
    res.json = format(res.json);
  }
  global_news.value = res;
  return res;
}
provide('getNews', getNews);
watch(global_news, () => {
  meta.value = global_news.value.json.timeDay;
})
window.addEventListener('scroll', () => {
  s_hidden.value = window.pageYOffset > 200 && route.name == 'articles';
});
</script>

<template>
  <div class="tab" :class="{ hidden: s_hidden }">
    <div class="logo">
      <div class="sub">
        <span class="sb">Brawl</span>
        <span class="sc">News</span>
      </div>
      <span class="logo_ed">CN</span>
      <div class="content">
        <span class="author">By bedphp</span>
        <span>
          <span style="color:darkolivegreen">最近更新</span>
          <span style="color: firebrick;">{{ meta }}</span>
        </span>
      </div>
    </div>
  </div>
  <RouterView class="body" :key="$route.fullPath" />
</template>



<style>
@font-face {
  font-family: cr;
  src: url('./assets/hkw5.ttf');
}

* {
  font-family: 'cr';
}


html,
body,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background: #1E42A0;
  display: flex;
  justify-content: center;
  font-size: 16px;
}

.body {
  margin-top: 2.5rem;
}

.tab.hidden {
  display: none;
}

.tab {
  position: fixed;
  display: inline-flex;
  width: 100%;
  padding: 0.8rem;
  /* padding-left: 5rem; */
  background: #dbe2ef;
  z-index: 999;
  border-radius: 3px;
  font-size: 1rem;
  max-height: 2.5rem;
}

/* @media screen and (max-width:960px) {
  .tab {
    padding-left: 1.5rem;
  }

} */
.tab .actions {
  flex: 1;
}

.author {
  font-size: 1.3rem;
  color: rgb(255, 145, 0)
}

.tab .logo {
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  flex: 1;
}

.tab .logo .logo_ed {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: blueviolet;
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

.tab .logo .content {
  display: inline-flex;
  align-items: center;
  text-align: center;
  flex-wrap: nowrap;
  font-size: 1.1rem;
}

.tab .logo .content * {
  margin: 0.1rem;
  /* flex: 1 1 auto; */
}

.tab .logo .sub {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 0.3rem;
  font-size: 1.5rem;
}

.tab .logo .sub .sb {
  font-size: 0.9rem;
  text-align: center;
  margin: -0.2rem;
  color: darkgoldenrod;
}

.tab .logo .sub .sc {
  color: darkred;
  text-align: center;
  margin: -0.2rem;
}

* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

button {
  font-size: 1.1rem;
  min-width: max-content;
  font-weight: bold;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 100%; */
  text-transform: uppercase;
  color: #fff;
  border: none;
  border-radius: .625rem;
  background-color: #4485eb;
  -webkit-box-shadow: 0 .375rem 0 0 #2d5a9e;
  box-shadow: 0 .375rem 0 0 #2d5a9e;
  transform: scale(1);
}

.press {
  transform: scale(1);
}

.press:active {
  transition: transform .1s;
  /* transition: transform .1s, -webkit-transform .1s; 
   backface-visibility: hidden; 
  animation-fill-mode: forwards;
  animation-duration: .15s;*/

  transform: scale(0.98);
}

button:active {
  transition: transform .1s;
  /* transition: transform .1s, -webkit-transform .1s; */
  /* backface-visibility: hidden; */
  animation-fill-mode: forwards;
  animation-duration: .15s;
  /*  */
  transform: scale(0.98);
}

/* 滚动槽 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.06);
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.08);
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.12);
  -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}


@media screen and (max-width:760px) {

  html,
  body,
  #app {
    font-size: 14px;
  }

  button {
    padding: 0.8rem;
  }
}
</style>
