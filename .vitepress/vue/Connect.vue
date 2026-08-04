<script setup>
    defineProps(['name', 'connect'])
</script>

<template>
    <div class="connect-grid">
        <p id="name">{{ name }}</P>
        <p id="connect">{{ connect }}</p>
    </div>
</template>

<style scoped>

    .connect-grid {
        border-right: 1.2px solid #ffaf00;
        font-size: larger;
    }

</style>