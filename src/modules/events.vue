<template>
    <Carousel clamp="carousel" :wrapAround="true" ref="event_ref" @slide-end="event_droped">
        <Slide v-for="slide in event_list" :key="slide">
            <div class="sider">
                <img :src="slide.img" />
                <div class="wap">
                    <button @click="() => (slide.callback ?? callback)(slide)">{{ slide.title || untitle }}</button>
                </div>
            </div>
        </Slide>
    </Carousel>
    <div class="paginator">
        <span :class="{ point: true, sec: event_index == i }" @click="() => event_toPage(i)"
            v-for="(_, i) in event_list"></span>
    </div>
</template>

<script setup>
import { Carousel, Slide } from 'vue3-carousel'
import { useTemplateRef, ref } from 'vue';
const { event_list = [], callback = () => { } } = defineProps(['event_list', 'callback']);
const untitle = '请输入文本';
const event_carousel = useTemplateRef('event_ref');
const event_index = ref(0);
const event_droped = (e) => {
    event_index.value = e.currentSlideIndex;
    console.log('event_droped', e);
}
const event_toPage = (index) => event_carousel.value.slideTo(index);

</script>
<style scoped>
.carousel {
    position: relative;
    display: flex;
    flex-direction: column;
    touch-action: pan-y;
    width: 100%;
    height: 90%;
    user-select: none;
    /* padding-bottom: 3rem; */
}


.carousel img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.sider {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 10px;

}

.sider img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
}

.sider .wap {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 2rem;
}



.paginator {
    line-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
}

.point {
    width: 1.375rem;
    height: 1.375rem;
    margin: 0 .125rem;
    -webkit-transition: 300ms;
    transition: 300ms;
    -webkit-transform: scale(0.363);
    transform: scale(0.363);
    -webkit-border-radius: 50%;
    border-radius: 50%;
    background-color: #000;
}

.point.sec {
    -webkit-transform: scale(1);
    transform: scale(1);
    background-color: #4485eb;
}
</style>