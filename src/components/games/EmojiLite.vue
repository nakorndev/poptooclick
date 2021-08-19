<template>
  <img id="emoji-lite" v-if="liteMode" draggable="false" :src="currentTeam === 'angry' ? 'images/angry.png' : 'images/love.png'" alt="">
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['currentTeam', 'liteMode'])
}
</script>

<style lang="scss" scoped>
#emoji-lite {
  position: absolute;
  z-index: -1;
  user-select: none;
  pointer-events: none;
  width: 148px;
}
</style>
