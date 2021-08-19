<template>
  <div class="select-team-wrapper">
    <h1>เลือกทีม/จังหวัดของคุณ</h1>
    <p>(สามารถเปลี่ยนภายหลังได้ และการเปลี่ยนทีมอาจจะสูญเสียความคืบหน้า)</p>
    <div class="text-center">
      <button class="select-team team-red" @click="selectTeam('angry')">
        <img src="images/angry.png" alt="">
        <span>ทีมไล่ลุง</span>
      </button>
      <button class="select-team team-yellow" @click="selectTeam('love')">
        <img src="images/love.png" alt="">
        <span>ทีมรักลุง</span>
      </button>
    </div>
    <label class="city-label">
      <span>จังหวัดของคุณ:</span>
      <select class="city-list">
        <option v-for="city of cities" :key="city" :value="city" v-text="city"></option>
      </select>
    </label>
  </div>
</template>

<script>
import cities from '../../assets/cities.json'
import Game from './Game'
import { mapMutations, mapState } from 'vuex'

export default {
  data: () => ({
    cities
  }),

  computed: mapState(['currentTeam']),

  methods: {
    ...mapMutations(['setTeam', 'setScene', 'resetClick']),
    selectTeam (teamName) {
      if (teamName !== this.currentTeam) {
        this.resetClick()
      }
      this.setTeam(teamName)
      this.setScene(Game)
      // TODO: set city
    }
  }
}
</script>

<style lang="scss" scoped>
.select-team-wrapper {
  background-color: white;
  padding: 3em 5em;
  border-radius: 10px;
}

h1 {
  font-size: 3em;
  margin-bottom: 0.25em;
}

button {
  &.select-team {
    margin: 1em;
    font-size: 1.25em;
    border: 0;
    border-radius: 10px;
    padding: 2em;
    cursor: pointer;
    transition: transform 300ms;
    &.team-yellow {
      background-color: yellow;
      box-shadow: 6px 6px 0 rgb(197, 197, 10), 3px 3px 0 rgb(197, 197, 10);
    }
    &.team-red {
      background-color: red;
      box-shadow: 3px 3px 0 rgb(189, 0, 0), 6px 6px 0 rgb(189, 0, 0);
      color: white;
    }
    &:hover {
      transform: scale(1.4);
    }
    img {
      display: block;
      width: 2.5em;
      margin: 0 auto 0.75em;
    }
  }
}

.city-label {
  margin-top: 2em;
  display: flex;
  align-items: center;

  .city-list {
    flex-grow: 1;
    margin-left: 0.5em;
    padding: 0.5em;
  }
}
</style>
