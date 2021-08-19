<template>
  <h1 class="score-wrapper">
    <span class="score-title">{{ title }}</span>
    <span id="point" class="score-point">{{ point }}</span>
  </h1>
</template>

<script>
export default {
  props: ['title', 'point']
}
</script>

<style lang="scss" scoped>
.score-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: fixed;
  top: 0;
  width: 100%;
  user-select: none;
  font-size: 2.8em;
  margin-top: 0.2em;

  .score-title {
    margin-right: 0.3em;
  }

  .score-point {
    font-size: 2em;
    font-family: monospace;
    font-weight: bold;
    display: inline-block;
    padding: 0.1em 0.4em;
    border-radius: 1em;
    background-color: white;
    color: #3a3a3a;
  }
}

</style>
