<template>

    <div class="news">
        <div class="event">
            <EventsCard :event_list="events_list" />
        </div>
        <div class="articles">
            <card class="item" v-for="item in article_list" :title="item.title" :time="item.postDate" :tag="item.tag"
                :banner="item?.banner?.path" @click="() => getArticle(item, 'alt')" />
        </div>
    </div>
</template>

<script setup>

import { inject, onMounted, ref, watch } from 'vue';
import card from '../modules/card.vue';
import EventsCard from '../modules/events.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const getNews = inject('getNews');
const article_list = ref([]);
const events_list = ref([]);
const getArticle = (alt, type) => {
    let id = 0;
    if (type == 'alt') {
        id = alt.id;
    }
    if (type == 'eve' && alt.link && alt.link.canLink) {
        id = alt.link.id;
    }
    if (id == 0) return;
    router.push({ name: 'articles', params: { id } })
    console.log(id);
}
//console.log(news);
//onMounted(()=>console.log(news));
getNews().then(news => {
    console.log('async news', news);
    if (!news.fetchok) return article_list.value = [{
        id: 0,
        title: "文章获取失败，请刷新重试",
        tag: "请刷新",
        time: "刚刚"
    }];
    article_list.value = news.json.news;
    events_list.value = news.json.events.map(e => {
        return {
            img: e.background && e.background.path,
            title: e.link && e.link.canLink && e.link.title,
            callback: () => getArticle(e, 'eve')
        }
    })

});
</script>

<style scoped>
.news {
    flex: 1;
    max-width: 1000px;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 2.25rem 2rem 0;
}

.event {
    display: flex;
    flex-direction: column;
    flex: 1;
    /* background: #808245; */
    min-width: 250px;
    padding: 10px;
    height: 100%;
    /* padding-bottom: 1.5rem; */
}

.articles {
    display: flex;
    flex-direction: column;
    flex: 1;
    /* background: #508245; */
    min-width: 250px;
    padding: 10px;
    padding-bottom: 1.5rem;
    height: 100%;
    overflow: auto;
}

.articles .item {
    margin: 0.5rem;
}


@media screen and (max-width:720px) {
    .news {
        padding: 1em;
        flex-direction: column;
        flex-wrap: nowrap;
    }

    .event {
        height: 40%;
        /* margin-bottom: 15px; */

    }
}

@media screen and (max-width:560px) {
    .articles {
        overflow: visible;
    }
}
</style>