<template>
  <Navbar activate="Dashboard"/>
  <div id="content">
    <div class="grid">
      <!--   top   -->
      <div class="item">
        <div class="text-container">
          <div class="text">
            <h3>Portfolio</h3>
            <p>{{ store.token }}</p>
          </div>
          <div class="text">
            <h3>Value</h3>
            <p>127 432€</p>
          </div>
          <div class="text">
            <h3>Invested</h3>
            <p>101 434€</p>
          </div>
        </div>
      </div>
      <!--   fund   -->
      <div class="item">
        <div class="funds-container">
          <Fund img="./src/img/graph-1.png" name="Fund LETZ 1">101 300€</Fund>
          <Fund img="./src/img/graph-2.png" name="Fund LETZ 2">20 110€</Fund>
          <Fund img="./src/img/graph-3.png" name="Fund LETZ 3">6 022€</Fund>
        </div>
      </div>
      <!--   esg   -->
      <div class="item">
        <Score :percent="67"/>
      </div>
      <!--   achievements   -->
      <div class="item">
        <h3>Achievements</h3>
        <div class="achievements-container">
          <Achievement img="./src/img/soge.png" title="Achievement Title" text="Achievement text"/>
          <Achievement img="./src/img/soge.png" title="Great guy" text="Your ESG score reaches 65."/>
          <Achievement/>
        </div>
      </div>
      <!--   graph   -->
      <div class="item">
        <div class="text-container">
          <h3>127 432€</h3>
          <p>+6.72%</p>
        </div>
        <Chart/>
      </div>
      <!--   history   -->
      <div class="item">
        <h3>History</h3>
        <div class="text-container">
          <p>02/03/2024 : 100.000€ in Investment web4.2</p>
          <p>02/03/2024 : 100.000€ in Investment addi</p>
        </div>
      </div>
      <!--   vote   -->
      <div class="item">
        <h3>Last vote</h3>
        <div class="container">
          <p>Investment in company XYZ</p>
          <div class="stats-container">
            <VoteStat :accepted="true" :percent="90">90%</VoteStat>
            <VoteStat :accepted="false" :percent="10">10%</VoteStat>
          </div>
        </div>
      </div>
      <!--   doc   -->
      <div class="item">
        <h3>Documentation</h3>
        <p>Investment reports, news and company ESG reports.</p>
      </div>
    </div>
  </div>
</template>

<script setup>

import {ref} from "vue";
import Navbar from "@/Navbar.vue";
import Achievement from "@/Achievement.vue";
import Chart from "@/Chart.vue";
import {useUser} from "@/stores/user.js";
import Fund from "@/Fund.vue";
import VoteStat from "@/VoteStat.vue";
import Score from "@/Score.vue";

const store = useUser()

</script>

<style lang="scss">

@import "scss/variables";

#content {
  margin-left: 300px;
}

.grid {
  background-color: $grey;
  width: 100%;
  height: 950px;
  display: grid;
  gap: 1.5vw;
  padding: 1vw;
  grid-template-columns: 1fr 0.8fr 1.2fr 1fr 1fr 1fr;;
  grid-template-rows: repeat(6, 160px);
  grid-template-areas:
    "top top top graph graph graph"
    "fund fund esg graph graph graph"
    "fund fund achievements graph graph graph"
    "fund fund achievements history history doc"
    "fund fund achievements vote vote doc";

  .item {
    background-color: white;

    h3 {
      line-height: 0;
      margin: 20px 0 0 20px;
    }

    .text {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
  }

  .item:nth-child(1) {
    grid-area: top;

    .text-container {
      padding: 50px;
      display: flex;
      justify-content: space-between;

      h3 {
        margin: 0;
      }
    }
  }

  .item:nth-child(2) {
    grid-area: fund;

    .funds-container {
      padding: 30px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }
  }

  .item:nth-child(3) {
    grid-area: esg;
    padding: 10px;
  }

  .item:nth-child(4) {
    grid-area: achievements;

    .achievements-container {
      margin-top: 50px;
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 15px;
    }
  }

  .item:nth-child(5) {
    grid-area: graph;

    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
    padding: 30px;

    .text-container {
      width: 100%;
      margin: 30px 0 0 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;

      h3 {
        margin: 0;
      }
    }
  }

  .item:nth-child(6) {
    grid-area: history;

    .text-container {
      margin: 30px 20px;

      p {
        margin-top: 15px;
      }
    }
  }

  .item:nth-child(7) {
    grid-area: vote;

    .container {
      margin: 40px 20px;
      align-items: center;
      justify-content: space-between;
      gap: 30px;
      display: flex;
    }

    .stats-container {
      display: flex;
      flex-direction: column;
      gap: 15px;
      align-items: center;
    }

    .vote-stat {
      width: 65px;
    }
  }

  .item:nth-child(8) {
    grid-area: doc;
    position: relative;

    p {
      position: relative;
      transform: translateY(-50%);
      top: 44%;
      margin: 0 20px;
    }
  }
}
</style>