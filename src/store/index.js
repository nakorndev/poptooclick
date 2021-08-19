import { createStore } from 'vuex'

export default createStore({
  state: {
    currentScene: '',
    currentTeam: '',
    currentClicked: 0,
    liteMode: false
  },
  mutations: {
    setScene (state, sceneName) {
      state.currentScene = sceneName
    },
    setTeam (state, teamName) {
      state.currentTeam = teamName
      localStorage.setItem('team', state.currentTeam)
    },
    setClick (state, number) {
      state.currentClicked = number
    },
    addClick (state) {
      state.currentClicked++
      localStorage.setItem('clicked', state.currentClicked)
    },
    resetClick (state) {
      state.currentClicked = 0
      localStorage.setItem('clicked', state.currentClicked)
    },
    toggleLiteMode (state) {
      state.liteMode = !state.liteMode
      localStorage.setItem('lite', state.liteMode)
      if (state.liteMode) {
        document.getElementById('background').pause()
      } else {
        document.getElementById('background').play()
      }
    }
  },
  modules: {
  }
})
