<script setup>
  import { ref, useTemplateRef } from 'vue';
  import axios from 'axios';
  const acftDataAPI = "http://localhost:3000/api/acft_data"
  const acftDialog = useTemplateRef("acftDialog")

  const data = ref({})
  let polling = null
  async function fetchData() {
    try {
      const response = await axios.get(acftDataAPI)
      data.value = response.data.data ?? {}
    } catch (err) {
      console.error("Error fetching aircraft data: ", err)
    }
  }

  const openDialog = () => {
    acftDialog.value?.showModal()
    fetchData()
    if (!polling) {
      polling = setInterval(() => {
        if (acftDialog.value?.open) fetchData()
      }, 3000)
    }
  }

  const closeDialog = () => {
    acftDialog.value?.close()
    clearInterval(polling)
    polling = null
  }
</script>

<template>
  <div class="modal">
    <button class="btn" v-on:click="openDialog">Show Aircraft</button>
    <dialog class="dialog" id="acftDialog" ref="acftDialog" @click.self="closeDialog" @cancel="closeDialog">
      <div class="dialog-content" style="overflow: scroll; height: 50em; width: 75em;">
        <div v-for="(info, aircraft) in data" ref="acfts">
          <h2>{{ aircraft }}</h2>
          <p>{{ info.playerName }}, {{ info.aircraftType }}</p>
          <button class="acft btn">select</button>
        </div>
        <button class="btn" v-on:click="closeDialog">Close</button>
      </div>
    </dialog>
  </div>
</template>

<style scoped>
  
</style>
