<template>
  <Navbar activate="Governance"/>
  <div class="content">
    <div class="title-container">
      <h1>Governance</h1>
      <p>LETZ token holder collectively discuss, propose and vote on the direction of the LETZ fund, new investements,
        disvestments, profit distribution allocation, etc. LETZ token holders can either vote themselves on new
        proposals or delegate to another investors or fund manager of their choice.</p>
    </div>
    <div class="proposals-container">
      <Proposal v-for="proposal in proposals" key="proposal.id" :proposal="proposal"/>
    </div>
  </div>
</template>

<script setup>

import Navbar from "@/Navbar.vue";
import Proposal from "@/Proposal.vue";
import {ethers} from "ethers";
import governanceABI from "@/stores/governance.json";
import {onMounted, ref} from "vue";

const proposals = ref([])

onMounted(async () => {
  let fetch = true;
  let id = 1;
  while (fetch) {
    proposals.value.push(await getStatus(id));
    if (!proposals.value[id - 1].description)
      fetch = false;
    id++;
  }
})

const getStatus = async (id) => {
  if (!window.ethereum)
    return;
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const governanceAddress = "0xb07c8136c3e14AddB5c7e5c210D62558eF87d56b";
    const contract = new ethers.Contract(governanceAddress, governanceABI, provider);
    const proposal = await contract.proposals(id);
    return {...proposal, id: id};
  } catch (e) {
    console.error(e)
  }
}

</script>

<style lang="scss">

@import "scss/variables";

.content {
  margin-left: 300px;

  .title-container {
    margin: 50px 50px;

    h1 {
      margin-bottom: 20px;
    }

    p {
      font-size: 14px;
      max-width: 900px;
      line-height: 1.7;
    }
  }

  .proposals-container {
    margin: 50px 200px 0 50px;
    background-color: $white;
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
}

</style>