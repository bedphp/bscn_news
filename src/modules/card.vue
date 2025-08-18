<template>
    <div class="card" @click="click">
        <div class="head" v-if="banner">
            <img :src="banner" />
        </div>
        <div class="content">
            <div class="details">
                <div class="status">
                    <span class="tag" v-if="!Array.isArray(tag)">{{ tag }}</span>
                    <span class="tag" v-else v-for="item in tag" :style="{ color: item[1] }">{{ item[0] }}</span>
                    <span class="time">{{ time }}</span>
                </div>
                <p class="title">{{ title }}</p>
            </div>
            <div class="right_info"></div>
        </div>
    </div>
</template>

<script setup>
const { banner = '', tag = 'game', time = '刚刚', title = '请输入标题', click = () => { } } = defineProps(['banner', 'tag', 'time', 'title', 'click'])
</script>

<style scoped>
.card {
    background: wheat;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    border-bottom: .375rem solid #aaa;
    overflow: clip;
    user-select: none;
    transform: scale(1);
}

.card:active {
    transition: transform .1s;
    animation-fill-mode: forwards;
    animation-duration: .15s;
    transform: scale(0.98);
    animation: clicked_ani;
}

.card img {
    max-height: 200px;
}

.card .head img {
    width: 100%;
    flex: 1;
    object-fit: cover;
}

.card .head {
    height: 250px;
    display: inline-flex;
    flex: 1;
}

.card .content {
    background-color: white;
    min-height: 100px;
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    font-weight: 800;
}

.card .content .details {
    display: inline-flex;
    flex-direction: column;
    flex: 1;
}

.card .content .details .title {
    font-size: 1.2rem;
    padding: 0.2rem;
}

.card .content .details .status {
    display: inline-flex;
    padding: 0.2rem;
}

.card .content .details .status .tag {
    padding-right: 8px;
    color: cadetblue
}

.card .content .details .status .time {
    color: gray
}

.card .content .right_info {
    /* background: url('input.svg') no-repeat; */
    background: url('https://inbox.brawlstars.cn/bundle/hayday/images/0c50fe5f91a9b62bbcdf0f20062848cc.svg') no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100%;
    height: 2.75rem;
    width: 2.75rem;
}
</style>