<script setup>
    import { ref } from 'vue'
    const generatedClearance = ref("AXY1B")
    const clearanceText = ref("IFR Clearance")
</script>
<template>
    <div class="results">
        <h1>{{ clearanceText }}</h1>
        <div class="clearance">
            {{ generatedClearance }}
        </div>
    </div>
</template>