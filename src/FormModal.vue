<script setup>
  import { onMounted, ref, useTemplateRef } from 'vue';
  const acftDataAPI = "https://24data.ptfs.app/acft-data"
  const acftDialog = useTemplateRef("acftDialog")

  const data = ref({})
  onMounted(async() => {
    const response = await fetch(acftDataAPI)
    data.value = response.json
  })
  
  const openDialog = () => acftDialog.value?.showModal()
  const closeDialog = () => acftDialog.value?.close()
</script>

<template>
  <div class="modal">
    <button class="btn" v-on:click="openDialog">Show Aircraft</button>
    <dialog class="dialog" id="acftDialog" ref="acftDialog" @click.self="closeDialog" @cancel="closeDialog">
      <h3>Quick test</h3>
      <div v-for="acft in data" ref="acfts">
        
      </div>
      <button class="btn" v-on:click="closeDialog">Close</button>
    </dialog>
  </div>
</template>

<style scoped>
  
</style>
