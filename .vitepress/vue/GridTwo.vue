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
        grid-gap: 24px 24px;
        grid-template-columns: 1fr 2fr;
        grid-template-rows: auto auto;
    }
}
</style>