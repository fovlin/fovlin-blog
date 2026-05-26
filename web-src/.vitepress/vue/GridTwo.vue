<script setup>
</script>

<template>
    <div class="grid-two">
        <slot></slot>
    </div>
</template>

<style>

.grid-two {
    display: grid;
    grid-template-columns: 1fr;
    text-align: center;
}

@media (min-width: 960px){

    .grid-two {
        text-align: left;
        grid-gap: 12px 12px;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;
    }

    .VPHome .grid-two {
        padding: 0px 128px;
    }
}
</style>