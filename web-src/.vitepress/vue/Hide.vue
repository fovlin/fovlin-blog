<script setup>
</script>

<template>
    <div><slot></slot></div>
</template>


<style scoped>

div > * {
    color:rgb(0 0 0 / 0);
    transition: 0.3s;
    background-color: var(--vp-c-gray-3);
}

div > *:hover {
    color: var(--vp-c-text-1);
    background-color: unset;
}

</style>