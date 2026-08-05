<script setup>
    defineProps(['name', 'connect', "url"])
</script>

<template>
    <a class="connect-grid" v-bind:href="url">
        <p class="name">{{ name }}</p>
        <p class="connect">{{ connect }}</p>
    </a>
</template>

<style scoped>

    p {
        padding: 12px 0px;
        margin: 4px 0px;
    }

    .connect-grid {
        display: grid;
        grid-template-columns: 3fr 7fr;
        align-items: center;
        font-size: 21px;
        text-decoration: none;
        overflow: scroll;
        text-wrap: nowrap;
    }

    .connect-grid:hover > .name {
        color:#ffaf00
    }

    .connect-grid:hover > .connect::before {
        z-index: -1;
        width: 100%;
    }

    .name {
        transition: 0.3s;
        min-width: 120px;
        border-right: 3px solid #ffaf00;
        text-align: center;
    }

    .connect {
        position: relative;
        padding-left: 16px;
    }

    .connect::before {
        z-index: -1;
        transition: 0.3s;
        content: "";
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
        width: 0;
        background: linear-gradient(to right, #ffaf001f 50%, #ffaf0000 95%);
    }

@media (max-width: 640px){

    .connect-grid {
        display: grid;
        grid-template-columns: 3fr 7fr;
        align-items: center;
        font-size: 16px;
    }

}

</style>
