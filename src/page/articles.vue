<template>
    <!-- <div></div> -->
    <div class="articles_page">
        <div class="back">
            <span class="press" @click="back_home"></span>
        </div>
        <div class="holder">
            <div class="banner">
                <img :src="banner" />
            </div>
            <div class="content">
                <div class="header">
                    <h2 class="title">{{ title }}</h2>
                    <div class="status">
                        <span class="tag" v-if="!Array.isArray(tag)">{{ tag }}</span>
                        <span class="tag" v-else v-for="item in tag" :style="{ color: item[1] }">{{ item[0] }}</span>
                        <span class="time">{{ time }}</span>
                    </div>
                </div>
                <div class="textarea">
                    <div v-for="block in details_list">
                        <div v-if="block.type == 'text'" v-html="block.content"></div>
                        <div v-else-if="block.type == 'image'" class="imageblock">
                            <img :src="block.image.path" />
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <div class="prev" @click="doPrevOrNext(false)">
                        <span :class="{ ico: true, disable_ico: !has_prev }"></span>
                        <span>上一篇</span>
                    </div>
                    <div class="next" @click="doPrevOrNext(true)">
                        <span :class="{ ico: true, disable_ico: !has_next }"></span>
                        <span>下一篇</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const getNews = inject('getNews');
const router = useRouter();
const route = useRoute();
const banner = ref('');
const title = ref('[标题]获取标题中');
const tag = ref('');
const time = ref('');
const details_list = ref([]);
const has_next = ref(false);
const has_prev = ref(false);
let list = [];
let current_index = 0;
getNews().then(e => {
    if (!e.fetchok) return;
    updatePage(e.json.news);
})
const doPrevOrNext = (next) => {
    if (has_next.value || has_prev.value) {
        let res = next ? list[current_index + 1] : list[current_index - 1];
        if (res)
            router.push({ name: 'articles', params: { id: res.id } })
    }
}
const updatePage = (news) => {
    let id = route.params.id;
    news = news.sort((a, b) => b.time - a.time);
    list = news;
    let index = news.findIndex(e => e.id == id);
    let id_res = news[index];
    console.log(news, id, id_res);
    if (index < 0) {
        details_list.value = [
            { type: 'text', content: "<p text-align='center'>未找到此新闻id</p>" }
        ]
        return;
    }
    current_index = index;
    banner.value = id_res.innerBanner.path;
    title.value = id_res.title;
    tag.value = id_res.tag;
    time.value = id_res.postDate;
    details_list.value = id_res.details;
    if (index + 1 < news.length) {
        has_next.value = true;
    } else if (index + 1 >= news.length) has_next.value = false;
    if (index <= 0) {
        has_prev.value = false;
    } else if (index >= 1) {
        has_prev.value = true;
    }
}
const back_home = () => {
    router.push('/');
}
</script>

<style scoped>
.articles_page {
    width: 100%;
    height: 100%;
    padding: 1rem 5rem;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    /* max-width: 960px; */
    backface-visibility: hidden;
}

.holder {
    /* overflow: hidden; */
    border-radius: 15px;
    border-bottom: .375rem solid #aaa;
}

.header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.back {
    display: flex;
    justify-content: flex-start;
    /* flex: 1; */
    padding: 1em 0em;
}

.back span {
    display: block;
    /* background: url('back.svg') no-repeat 0 0/contain; */
    background: url('https://inbox.brawlstars.cn/bundle/hayday/images/8ac72fbf123f74daede57cfff2d44860.svg') no-repeat 0 0/contain;
    width: 6em;
    height: 3em;
}

.banner {
    user-select: none;
    pointer-events: none;
    height: 100%;
    width: 100%;
    min-height: 100px;
    max-height: 10em;
    border-radius: 10px 10px 0px 0px;
    overflow: hidden;
}

.banner img {
    height: 100%;
    width: 100%;
    max-height: 100%;
    object-fit: cover;
}

.status {
    display: inline-flex;
    font-size: 1.5em;
    font-weight: 600;
    margin: 0.5em;
}

.title {
    font-size: 2em;
    font-weight: bold;
    text-transform: uppercase;
    word-break: break-all;
    max-width: fit-content;
    padding: 0em 0.5em;
}

.status .tag {
    color: darkcyan;
    padding-right: 1em;
}

.status .time {
    color: gray;
}

.content {
    padding: 2em 0em;
    background-color: white;
    border-radius: 0px 0px 10px 10px;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}




.footer {
    margin-top: 1em;
    width: 60%;
    border-radius: 10px;
    display: inline-flex;
    justify-content: space-between;
    user-select: none;
}

.footer .prev,
.footer .next {
    display: inline-flex;
    justify-content: center;
    align-items: center;
}

.footer .prev span,
.footer .next span {
    margin: 5px;
}

.footer .prev .ico {
    width: 2em;
    height: 2em;
    background: url('https://inbox.brawlstars.cn/bundle/hayday/images/e58df927ed3e61126bcddf5d2c2ddeb8.svg');
    transform: scale(-1);
    background-size: contain !important;
}

.footer .disable_ico {
    background: url('https://inbox.brawlstars.cn/bundle/hayday/images/7769627d6980698fad910579b973ea30.svg') !important;
}

.footer .prev:active,
.footer .next:active {
    transform: scale(0.96);
    transition: transform .1s;
}

.footer .next {
    flex-direction: row-reverse;
}

.footer .next .ico {
    width: 2em;
    height: 2em;
    /* background: url('next.svg'); */
    background: url('https://inbox.brawlstars.cn/bundle/hayday/images/e58df927ed3e61126bcddf5d2c2ddeb8.svg');
    transform: scale(1);
    background-size: contain !important;
}

@media screen and (max-width:960px) {
    .articles_page {
        padding: 0.8rem;
        font-size: 1.1rem;
    }
}

@media screen and (max-width:760px) {
    .articles_page {
        padding: 0.5rem;
        font-size: 0.8rem;
    }
}
</style>
<style>
.textarea {
    width: 100%;
    padding: 3rem;
    display: inline-flex;
    flex-direction: column;
    align-items: stretch;
    max-width: 960px;
    font-size: 1rem;
}

.textarea img {
    width: 80%;
    height: 80%;
    object-fit: contain;
    font-size: 1rem;
}

.textarea .imageblock {
    display: flex;
    /* margin: 0em 1em;
    padding: 0.625em; */
    justify-content: center;
    width: 100%;

}

.textarea .imageblock img {
    width: 80%;
    height: 80%;
    object-fit: contain;
    margin: 0em 1em;
    max-width: 800px;
    padding: 0.625em;
    box-shadow: 1px 3px 12px 2px rgba(0, 0, 0, 0.2);
}


.textarea * {
    font-size: 1.125em;
    flex: 1;
    line-height: 2rem;
}

.textarea p {
    margin: 0.5em;
    padding-left: 0.5em;

}

.textarea h4,
.textarea h3,
.textarea h2,
.textarea h1 {
    text-align: center;
    margin: 0.5em;
}

.textarea ul,
.textarea ol {
    list-style-position: inside;
    list-style-type: disc;
}

/* .textarea ol {
    position: relative;
    display: block;
    margin: 0 0 1.25rem 1.0625rem;
    padding-left: 1.0625rem;
} */

.textarea li {
    margin-left: 2em;
    font-size: 0.9em;
    word-break: break-all;
    word-wrap: break-word;
    max-width: fit-content;
}
@media screen and (max-width:960px) {
 .textarea * {
        line-height: 1.85rem;
    }
}
@media screen and (max-width:760px) {
    .textarea {
        font-size: 0.8rem;
        padding: 0.5rem;
    }

    .textarea * {
        line-height: 1.7rem;
    }

    .textarea ul {
        padding-left: 1.5rem;
    }
}
</style>