<script setup>
  import { onMounted, ref, useTemplateRef } from 'vue';
  const acftDataAPI = "https://24data.ptfs.app/acft-data"
  const acftDialog = useTemplateRef("acftDialog")

  const data = ref({})
  let polling = null
  async function fetchData() {
    try {
      const response = await fetch(acftDataAPI)
      data.value = response.json
    }
    catch (err) {
      console.error("Error fetching aircraft data: ", err)
    }
  }
  
  const openDialog = () => {
    acftDialog.value?.showModal()
    if(!polling) {
      polling = setInterval(()=>{
        if(acftDialog.value?.open) fetchData()
      }, 3000)
    }

  }
  const closeDialog = () => {
    acftDialog.value?.close()
    if(polling) clearInterval(polling)
  } 
</script>

<template>
  <div class="modal">
    <button class="btn" v-on:click="openDialog">Show Aircraft</button>
    <dialog class="dialog" id="acftDialog" ref="acftDialog" @click.self="closeDialog" @cancel="closeDialog">
      <div class="dialog-content">
        <div v-for="(info, aircraft) in data" ref="acfts">
          <p>{{ aircraft }}</p>
        </div>
        <button class="btn" v-on:click="closeDialog">Close</button>
      </div>
    </dialog>
  </div>
</template>

<style scoped>
  
</style>
