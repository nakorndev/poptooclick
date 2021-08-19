<template>
  <div class="control-wrapper">
    <div class="control-panel" :class="{ 'control-hide': !showPanel }">
      <header @click="showPanel = !showPanel" class="control-header">
        <span>กระดานคะแนน</span>
      </header>
      <div class="control-body">
        <div class="leaderboard-closed">
          ขออภัยในความไม่สะดวก เนื่องจากมีผู้ใช้งานเป็นจำนวนมากที่ใช้โปรแกรมช่วยเหลือการคลิก และรวมทั้งการยิง Request HTTP โดยตรงเป็นจำนวนมาก จนมีค่าใช้จ่ายสูงเพราะผู้พัฒนาไม่สามารถควบคุมปัญหาเหล่านี้ได้ทัน รวมทั้งยังขาดประสบการณ์จัดการปัญหาเหล่านี้ จะแก้ด้วยเงินโดยการเพิ่มทุนคงจนแน่ๆ จึงขอปิดบริการชั่วคราวและดำเนินการวางแผนจัดการปัญหาใหม่
          <blockquote>เพิ่งรู้ว่าการโกงเกม มีความเสียหายในวงการเกมก็วันนี้เลยล่ะ โตไปไม่โกงนะจ๊ะ เห็นใจนักพัฒนาด้วยกันนะครับ</blockquote>
          <blockquote>ทิ้งท้ายว่า Firebase ทำพิษจ้า</blockquote>
        </div>
        <div class="text-center" style="margin-top: 1em;">
          <a href="#" class="button" @click="changeTeam">เลือกทีม/จังหวัดใหม่</a>
          <a href="#" id="modeButton" class="button is-mode" :class="{ 'is-high': !liteMode }" @click="onToggleGraphic" v-text="liteMode ? 'กราฟฟิค (ต่ำ)' : 'กราฟฟิค (สูง)'"></a>
        </div>
      </div>
      <footer class="control-footer">
        <span>
          Developed by <a href="https://github.com/nakorndev" target="_blank">nakorndev</a>
        </span>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import SelectTeam from '../scenes/SelectTeam.vue'

export default {
  data: () => ({
    showPanel: false
  }),

  computed: mapState(['liteMode']),

  methods: {
    ...mapMutations(['setScene', 'toggleLiteMode']),

    changeTeam () {
      this.setScene(SelectTeam)
      this.$emit('change-team')
    },

    onToggleGraphic () {
      this.toggleLiteMode()
    }
  }
}
</script>

<style lang="scss" scoped>
.control-wrapper {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  user-select: none;
}

.control-panel {
  display: flex;
  flex-direction: column;
  height: 510px;
  max-width: 600px;
  width: 100%;
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: 200ms;
}

.control-header {
  display: flex;
  font-size: 1.5em;
  padding: 1rem;
  cursor: pointer;
  border-bottom: 1px solid #e6e6e6;

  &:hover {
    color: #0363db;
  }

  &::after {
    content: '▼';
    text-align: right;
    flex-grow: 1;
  }
}

.control-hide {
  margin-bottom: -442px;
  .control-header::after {
    content: '▲';
  }
}

.control-footer {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 1em;
  text-align: center;
  font-family: monospace;
}

.button {
  display: inline-block;
  border-radius: 5px;
  text-decoration: none;
  padding: 10px;
  background-color: #0363db;
  color: white;
  transition: 300ms;
  &.is-mode.is-high {
    background-color: #ff972c;
  }
  &.is-mode {
    background-color: #27ad75;
  }
  + .button {
    margin-left: 0.4em;
  }
}

.leaderboard-closed {
  margin: 1em;
  padding: 0.5em 1em;
  color: rgb(230, 2, 2);
  background-color: rgb(255, 241, 241);
  border-left: 3px solid rgb(255, 56, 56);

  blockquote {
    font-style: italic;
    color: rgb(126, 126, 126);
  }
}
</style>
