<template>
    <div class="hero banner-first-bg relative flex h-37.5 w-full items-center justify-center overflow-hidden md:-mt-16 md:h-137.5">
        <!--轮播图 -->
        <div v-show="show" id="banner" class="z-0 h-full w-full overflow-hidden">
            <img v-for="item in imageArray" :key="item" :src="item" class="h-37.5 w-full md:h-137.5" />
        </div>
        <!--标题 -->
        <div class="index absolute z-40 text-center">
            <!--主标题，主标题为数组时通过typed.js进行打印，反之正常显示 -->
            <h1 class="typed text-primary inline-block text-[0.95rem] font-medium md:text-[2.5rem]"></h1>
            <!--副标题-->
            <p class="px-1 text-[0.85rem] md:my-10 md:text-[1.6rem]">
                <span v-for="(item, index) in tagline?.split('')" :key="index" class="tagline" :style="{ animationDelay: `calc(0.1s * ${index + 1})` }">{{ item }}</span>
            </p>
        </div>
        <!--首页图片气泡-->
        <div id="bubbles" class="absolute z-10 h-full w-full"></div>
        <!-- 底部箭头 -->
        <a class="anchor-down" @click="scrollFn"></a>
        <!-- 水波纹效果 -->
        <div class="banner-wave wave1"></div>
        <div class="banner-wave wave2"></div>
    </div>
</template>
<script setup lang="ts">
    // 从github加载图片
    const imageArray: Array<string> = ['https://gcore.jsdelivr.net/gh/AnyFork/Resource/images/20250708211326318.webp', 'https://gcore.jsdelivr.net/gh/AnyFork/Resource/images/20250708211304466.webp', 'https://gcore.jsdelivr.net/gh/AnyFork/Resource/images/20250708211248178.webp', 'https://gcore.jsdelivr.net/gh/AnyFork/Resource/images/20250708211233645.webp']
    const { show } = useBanner()
    const { tagline } = useTyped()
    useCircleMagic()
    const scrollFn = () => {
        const dom = document.getElementsByClassName('hero')
        if (dom) {
            // 滚动条滚动到指定位置
            document.documentElement.scrollTop = dom[0]?.clientHeight || 0
        }
    }
</script>
<style lang="css">
    .tagline {
        color: var(--ui-color-primary-100);
        animation: color-change 1s infinite ease-in-out alternate;
    }

    .banner-wave {
        position: absolute;
        bottom: 0;
        opacity: 0.8;
        animation: gradient-bg 120s linear infinite;
    }

    .wave1 {
        z-index: 10;
        width: 200%;
        height: 84px;
        background: url('@/assets/image/wave1.png');
    }

    .wave2 {
        z-index: 5;
        width: 400%;
        height: 100px;
        background: url('@/assets/image/wave2.png');
    }

    @keyframes color-change {
        to {
            color: var(--ui-color-primary-600);
        }
    }

    @keyframes bounce-in {
        0% {
            transform: translateY(0);
        }

        20% {
            transform: translateY(0);
        }

        50% {
            transform: translateY(-20px);
        }

        80% {
            transform: translateY(0);
        }

        100% {
            transform: translateY(0);
        }
    }

    @keyframes gradient-bg {
        0% {
            background-position: 0 50%;
        }

        50% {
            background-position: 100% 50%;
        }

        100% {
            background-position: 0 50%;
        }
    }

    @media (width >= 768px) {
        /* 打字机光标大小 */
        .typed-cursor {
            font-size: 2.3rem;
            color: var(--ui-color-primary-600);
        }

        .anchor-down {
            position: absolute;
            bottom: 20%;
            left: 50%;
            z-index: 49;
            display: block;
            width: 20px;
            height: 20px;
            margin-left: -10px;
            font-size: 30px;
            text-align: center;
            cursor: pointer;
            animation: bounce-in 5s 3s infinite;
        }

        .anchor-down::before {
            position: absolute;
            bottom: 20px;
            display: block;
            width: 20px;
            height: 20px;
            content: '';
            border-top: 5px solid var(--ui-primary);
            border-right: 5px solid var(--ui-primary);
            transform: rotate(135deg);
        }

        .anchor-down::after {
            display: block;
            width: 20px;
            height: 20px;
            content: '';
            border-top: 5px solid var(--ui-primary);
            border-right: 5px solid var(--ui-primary);
            transform: rotate(135deg);
        }
    }

    @media (width <= 768px) {
        /* 打字机光标大小 */
        .typed-cursor {
            font-size: 0.95rem;
            color: var(--ui-color-primary-600);
        }

        .anchor-down {
            position: absolute;
            bottom: 8%;
            left: 50%;
            z-index: 49;
            display: block;
            width: 10px;
            height: 10px;
            margin-left: -10px;
            font-size: 12px;
            text-align: center;
            cursor: pointer;
            animation: bounce-in 5s 3s infinite;
        }

        .anchor-down::before {
            position: absolute;
            bottom: 8px;
            display: block;
            width: 10px;
            height: 10px;
            content: '';
            border-top: 2px solid var(--ui-primary);
            border-right: 2px solid var(--ui-primary);
            transform: rotate(135deg);
        }

        .anchor-down::after {
            display: block;
            width: 10px;
            height: 10px;
            content: '';
            border-top: 2px solid var(--ui-primary);
            border-right: 2px solid var(--ui-primary);
            transform: rotate(135deg);
        }
    }

    .banner-first-bg {
        background: url('https://gcore.jsdelivr.net/gh/AnyFork/Resource/images/20250708211326318.webp') center center / cover no-repeat;
    }
</style>
