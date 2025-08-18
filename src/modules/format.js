const format = (e) => {
    const inbox_url = 'https://inbox.brawlstars.cn';
    let { meta = {}, entries = {} } = e;
    let { eventEntries = [], newsEntries = [] } = entries;

    let getFullDateTime = (e) => new Date(e).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    let getDay = (e) => new Date(e).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
    let getTime = (e) => new Date(e).toLocaleTimeString('zh-CN');
    let getDiff = (e) => {
        // 定义两个日期
        var startDate = e || Date.now();
        var endDate = Date.now()
        // 计算时间差的毫秒数
        var diff = endDate - startDate;
        // 将毫秒数转换为天、小时、分钟和秒
        var days = Math.floor(diff / (24 * 3600 * 1000));
        var hours = Math.floor((diff % (24 * 3600 * 1000)) / (3600 * 1000));
        var minutes = Math.floor((diff % (3600 * 1000)) / (60 * 1000));
        var seconds = Math.floor((diff % (60 * 1000)) / 1000);
        //return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        if (days >= 5) return getDay(e);
        if (days >= 1) return `${days}天前`; //大于1天，转换为天
        else if (hours <= 23 && hours >= 1) return `${hours}小时前`; //小于1天，显示小时
        else if (hours <= 0 && minutes <= 59) { //小于1小时，显示分钟
            if (minutes <= 0) return '刚刚';
            return `${minutes}分钟前`;
        }
    }
    let $metatime = meta.date || Date.now();
    let $meta = {
        id: meta.id || 0,
        time: getFullDateTime($metatime),
        timeDay: getDay($metatime)
    };
    let subLinkParse = ($e) => {
        let _link = Object.values($e['ctas'] || {});
        let _link_res = _link.length <= 0 ? false : _link.find(v => v.order == '1') || _link[0];
        let link = {
            ..._link_res.url,
            canLink: _link_res != null,
            title: _link_res && _link_res.label
        }
        return link;
    }
    let urlFix = (e) => {
        return `${inbox_url}/${e}`;
    };
    let imageMatch = ($e) => {
        let sort_list = ["small", "smallRetina", "medium", "mediumRetina", "large", "largeRetina"];
        let sort_img = {
            a: {},
            b: {}
        };
        // a = { 0:small }
        // b = { small:0 }
        sort_list.map(($v, $i) => {
            sort_img['a'][sort_img['b'][$v] = $i] = $v;
        });
        let img_max = sort_img['a'][Math.max(...Object.keys($e).map(e => sort_img['b'][e]))];
        //$e[img_max].a=img_max;
        $e[img_max].path = urlFix($e[img_max].path)
        return $e[img_max];
    };
    let formatEvent = (events) => {
        events = events.filter($v => $v['targeting']['channel'].length <= 0);
        let subEvent = ($e) => {
            let time = parseInt($e.postDate) * 1000
            return {
                id: $e.id,
                time,
                day: getDay(time),
                postDate: getDiff(time),
                postTime: getTime(time),
                title: $e.title,
                author: $e.author,
                link: subLinkParse($e),
                background: imageMatch($e.background || {})
            };
        }
        return events.map(subEvent);
    };

    let detailsParse = ($d) => {
        let list = Object.values($d || {});
        return list.sort((a, b) => a.order - b.order).map($e => {
            if ($e.type == 'textBlock')
                return { type: 'text', content: $e.body }
            if ($e.type == 'imageBlock')
                return { type: 'image', image: imageMatch($e.image || {}) }
        });
    };
    let formatNews = (news) => {
        news = news.filter($v => $v['targeting']['channel'].length <= 0);
        let subNews = ($e) => {
            let time = parseInt($e.postDate) * 1000;
            return {
                id: $e.id,
                time,
                day: getDay(time),
                postDate: getDiff(time),
                postTime: getTime(time),
                title: $e.title,
                author: $e.author,
                details: detailsParse($e.details),
                banner: imageMatch($e.thumbnail),
                card: imageMatch($e.thumbnailAlt),
                innerBanner: imageMatch($e.heroImage),
                tag: $e.categories.map(v => [v.title, v.color])
            }

        }
        return news.map(subNews);
    };
    let events = formatEvent(eventEntries);
    let news = formatNews(newsEntries);
    return { ...$meta, events, news };
}
export default format;