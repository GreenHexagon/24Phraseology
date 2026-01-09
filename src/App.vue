<script setup>
  import { ref } from 'vue'
  import Clearance from './Clearance.vue';
  import Formmodal from './formmodal.vue';
</script>

<template>
  <div class="topbar-menu">
    <object data="/favicon.svg" type="image/svg+xml" style="width:5rem;height:5rem;"></object>
    <div class="dropdown">
      <button class="menubtn dropbtn" id="clearancebtn">C</button>
      <span class="tooltip-text">IFR/VFR Clearances</span>
    </div>
    <div class="dropdown">
      <button class="menubtn dropbtn" id="routebtn">R</button>
      <span class="tooltip-text">Route/Heading Changes</span>
    </div>
    <div class="dropdown">
      <button class="menubtn dropbtn" id="altitudebtn">A</button>
      <span class="tooltip-text">Altitude Changes</span>
    </div>
    <div class="dropdown">
      <button class="menubtn dropbtn" id="frequencybtn">F</button>
      <span class="tooltip-text">Frequency Changes</span>
    </div class="dropdown">
    <div class="dropdown">
      <button class="menubtn dropbtn" id="transponderbtn">T</button>
      <span class="tooltip-text">Miscellaneous and Squawk Codes</span>
    </div>
  </div>
  <div class="main">
    <Formmodal />
    <div class="results">
      <Clearance />
    </div>
  </div>
</template>

<style scoped>
  
  .topbar-menu {
    display: flex;
    gap: 5%;
  }
  .menubtn {
    height: 5rem;
    width: 5rem;
    border: none;
    background-color: black;
  }
  .menubtn:hover {
    background-color: rgb(75, 75, 75);
    cursor: pointer;
  }
  .menubtn:active {
    background-color: black;
  }
  #clearancebtn {
    color: var(--red);
  }
  #routebtn {
    color: var(--green);
  }
  #altitudebtn
  {
    color: var(--purple);
  }
  #frequencybtn {
    color: var(--gold);
  }
  #transponderbtn {
    color: var(--blue);
  }
</style>
