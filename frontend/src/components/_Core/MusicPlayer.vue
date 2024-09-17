<template>
  <div class="audio-player">
    <a>
      <span @click="togglePlay">{{ isPlaying ? 'Pause' : 'Play' }}</span>
    </a>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';
import { Howl } from 'howler';

const isPlaying = ref(false);
let sound = null;

const initializePlayer = () => {
  if (!sound) {
    sound = new Howl({
      src: ['/music/Remember_the_Name(Instrumental).mp3'],
      loop: true,
      onend: function () {
        console.log('Finished!');
      }
    });
  }
};

const togglePlay = () => {
  if (!isPlaying.value) {
    if (!sound) {
      initializePlayer();
      if (!localStorage.getItem('audioPlayed')) {
        localStorage.setItem('audioPlayed', 'true');
      }
    }
    sound.play();
  } else {
    sound.pause();
  }
  isPlaying.value = !isPlaying.value;
};

onUnmounted(() => {
  if (sound) {
    sound.stop();
  }
});
</script>

<style scoped>
span {
  cursor: pointer;
}
</style>
