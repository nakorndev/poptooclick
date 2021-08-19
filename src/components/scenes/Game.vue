<template>
  <div ref="game" class="game-wrapper">
    <Score :title="scoreTitle" :point="currentClicked.toLocaleString('th-TH')"></Score>
    <EmojiLite></EmojiLite>
    <ControlPanel @change-team="clearEventClicker"></ControlPanel>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { random } from 'lodash'
import isMobileJs from 'ismobilejs'
import anime from 'animejs/lib/anime.es'
import Score from '../games/Score'
import EmojiLite from '../games/EmojiLite'
import ControlPanel from '../games/ControlPanel'

const isMobile = isMobileJs(window.navigator)

export default {
  components: {
    Score,
    EmojiLite,
    ControlPanel
  },

  data: () => ({
    scoreTitle: ''
  }),

  computed: mapState(['currentTeam', 'currentClicked', 'liteMode']),

  mounted () {
    this.scoreTitle = this.currentTeam === 'angry' ? 'จำนวนที่คุณกดโกรธ:' : 'จำนวนที่คุณกดรัก:'
    this.addEventClicker()
    this.preloadData()
  },

  methods: {
    ...mapMutations(['addClick']),

    preloadData () {
      // eslint-disable-next-line no-new
      new Audio('pop.mp3')
    },

    addEventClicker () {
      if (isMobile.any) {
        this.$refs.game.addEventListener('touchstart', this.onClick)
      } else {
        this.$refs.game.addEventListener('click', this.onClick)
      }
      document.body.addEventListener('keydown', this.onClick)
    },

    clearEventClicker () {
      if (isMobile.any) {
        this.$refs.game.removeEventListener('touchstart', this.onClick)
      } else {
        this.$refs.game.removeEventListener('click', this.onClick)
      }
      document.body.removeEventListener('keydown', this.onClick)
    },

    addEmojiFloat (url) {
      const heightPosition = random(20, window.innerHeight - 20)
      const img = new Image()
      img.src = url
      img.style.right = '-48px'
      img.style.top = heightPosition + 'px'
      img.classList.add('emoji-float')
      document.body.append(img)
      anime({
        targets: img,
        translateX: -10000,
        translateY: {
          value: [random(-100, 100), random(-100, 100), random(-200, 200), random(-200, 200), random(-200, 200)],
          duration: random(15000, 20000)
        },
        scale: {
          value: random(1.25, 2, true),
          duration: random(3000, 10000)
        },
        duration: random(300000, 350000),
        update (anim) {
          const target = anim.animatables[0].target
          const offsetRight = target.style.transform.replace( /^\D+/g, '').split('.')[0]
          if (offsetRight > window.innerWidth + 100) {
            target.remove()
          }
        }
      })
    },

    playSound () {
      // TODO: idk about this apple bug for no sound
      if (!isMobile.apple.device) {
        const sfx = new Audio('pop.mp3')
        sfx.volume = 0.5
        sfx.play()
      }
    },

    animateBounce () {
      anime({
        targets: '#point',
        scale: [1.2, 1],
        rotate: [random(-10, 10), 0],
        duration: 700
      })
      if (this.liteMode) {
        anime({
          targets: '#emoji-lite',
          scale: [1.75, 1],
          rotate: [random(-10, 10), 0],
          duration: 1000
        })
      } else {
        anime({
          targets: '#background',
          scale: [1.075, 1],
          easing: 'easeOutBounce',
          duration: 300
        })
      }
    },

    onClick () {
      this.addClick()
      this.playSound()
      this.animateBounce()
      if (!this.liteMode) {
        this.addEmojiFloat(this.currentTeam === 'angry' ? 'images/angry.png' : 'images/love.png')
      } else {

      }
    }
  }
}
</script>

<style lang="scss" scoped>
.game-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
