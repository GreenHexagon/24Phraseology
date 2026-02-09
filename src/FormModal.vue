<script setup>
  import { useTemplateRef } from 'vue';
  const acftDataAPI = "https://24data.ptfs.app/acft-data"
  const button = useTemplateRef("acftSelect")

  fetch(acftDataAPI)
  const openDialog = () => button.value?.modal
</script>

<template>
  <div class="modal">
    <button class="btn" ref="acftSelect">Show Aircraft</button>
    <dialog class="dialog" id="acftDialog">
      <div v-for="acft in data" ref="acfts">

      </div>
    </dialog>
  </div>
</template>

<style scoped>
  
</style>
