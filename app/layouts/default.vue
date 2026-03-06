<template>
    <div class="reactive min-h-screen">
        <WebSiteHeader></WebSiteHeader>
        <WebSiteBanner></WebSiteBanner>
        <WebSiteContent>
            <slot></slot>
        </WebSiteContent>
        <WebSiteFooter></WebSiteFooter>
    </div>
</template>
