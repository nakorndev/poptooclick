<template>
  <video id="background" class="video-background" src="https://i.imgur.com/JLCwlRb.mp4" loop muted autoplay playsinline></video>
  <component :is="currentScene"></component>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import isMobileJs from 'ismobilejs'
import Game from './components/scenes/Game'
import Loading from './components/scenes/Loading'
import SelectTeam from './components/scenes/SelectTeam'

const isMobile = isMobileJs(window.navigator)

export default {
  computed: mapState(['currentScene']),

  mounted () {
    // TODO: Mock loading for back-end
    this.setScene(Loading)
    setTimeout(this.onInitGame, 2000)
  },

  methods: {
    ...mapMutations(['setScene', 'setClick', 'setTeam', 'toggleLiteMode']),

    onInitGame () {
      // TODO: android as default lite mode but can be improved?
      const lite = localStorage.getItem('lite')
      if ((isMobile.android.device && lite === null) || lite === 'true') {
        this.toggleLiteMode()
      }
      const clicked = localStorage.getItem('clicked')
      if (clicked) {
        this.setClick(+clicked)
      }
      const team = localStorage.getItem('team')
      if (team) {
        this.setTeam(team)
      }
      // TODO: set city
      this.setScene(clicked && team ? Game : SelectTeam)
    }
  }
}
</script>

<style lang="scss" scoped>
.video-background {
  pointer-events: none;
  user-select: none;
  position: fixed;
  z-index: -1;
  min-width: 100%;
  min-height: 100%;
}
</style>
