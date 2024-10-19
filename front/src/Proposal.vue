<template>
  <div class="proposal-container">
    <div class="left">
      <div v-if="!proposal.executed" class="state active">
        <h5>Active</h5>
      </div>
      <div v-else class="state closed">
        <h5>Closed</h5>
      </div>
      <h3>{{ proposal[1] }}</h3>
    </div>
    <div class="right">
      <div class="stats-container">
        <VoteStat :accepted="true" :percent="votesFor">{{ votesFor }}%</VoteStat>
        <VoteStat :accepted="false" :percent="votesAgainst">{{ votesAgainst }}%</VoteStat>
      </div>
    </div>
  </div>
</template>

<script setup>

import {ethers} from "ethers";
import governanceABI from './stores/governance.json';
import {onMounted, ref} from "vue";
import VoteStat from "@/VoteStat.vue";
import {useUser} from "@/stores/user.js";

const props = defineProps({
  proposal: Object
})

const votesFor = ref(0);
const votesAgainst = ref(0);

onMounted(() => {
  console.log(props.proposal.votesFor, props.proposal.votesAgainst)
  if (props.proposal[2] === props.proposal[3]) {
    votesFor.value = 50
    votesAgainst.value = 50
  } else {
    const total = props.proposal[2] + props.proposal[3];
    votesFor.value = (props.proposal[2] / total) * BigInt(100);
    votesAgainst.value = (props.proposal[3] / total) * BigInt(100);
  }
})


</script>

<style lang="scss">

@import "scss/variables";

.proposal-container {
  display: flex;
  padding: 50px 50px 25px;
  justify-content: space-between;
  align-items: center;

  .stats-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 80px;
  }

  .state {
    width: fit-content;
    padding: 5px 10px;
    border: 1px solid $black;
    margin-bottom: 15px;
  }

  .state.active {
    background-color: $green;
  }

  .state.closed {
    background-color: #bdb9b9;
  }
}

</style>