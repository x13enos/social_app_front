<script setup lang="ts">
import { ref, toRefs, Ref } from 'vue';
const dataRoll: Ref<number> = ref(6);

const props = defineProps<{
  disabled: boolean,
  rolling?: boolean,
  selected?: boolean,
  value?: number
}>();

const { rolling = false, disabled, selected = false, value }: any = toRefs(props);

if (rolling.value && !disabled.value) {
  setInterval(() => {
    dataRoll.value = Math.floor(Math.random() * 6) + 1;
  }, 100);
}

</script>

<template>
  <div class="die-6" :data-roll="value || dataRoll" :class="{ disabled, selected }">
    <div class="dot-tl"></div>
    <div class="dot-tr"></div>
    <div class="dot-ml"></div>
    <div class="dot-mr"></div>
    <div class="dot-bl"></div>
    <div class="dot-br"></div>
  </div>
</template>

<style scoped>
.die-6 {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  /* max-width: calc((60px + (2px * 2) + 1rem) * 5); */
  gap: var(--gap);
  position: relative;
}

.die-6 {
  width: 60px;
  aspect-ratio: 1/1;
  border-radius: 0.5rem;
  border: 2px solid gray;
  position: relative;
}

.die-6 * {
  border-radius: 50%;
  background: black;
  width: 20%;
  aspect-ratio: 1/1;
  position: absolute;
  box-shadow: inset -2px -2px 5px 1px gray;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* with the selected class it should have orange border */
.selected {
  box-shadow: 0 0 0 2px orange;
  border-color: orange;
}

.dot-ml {
  top: 50%;
  left: 25%;
  translate: -50% -50%;
}

.dot-tr {
  top: 25%;
  left: 75%;
  translate: -50% -50%;
}

.dot-bl {
  bottom: 25%;
  right: 75%;
  translate: 50% 50%;
}

.dot-tl {
  top: 25%;
  left: 25%;
  translate: -50% -50%;
}

.dot-br {
  bottom: 25%;
  right: 25%;
  translate: 50% 50%;
}

.dot-mr {
  top: 50%;
  left: 75%;
  translate: -50% -50%;
}

[data-roll="1"] :is(.dot-tl, .dot-tr, .dot-bl, .dot-br) {
  display: none;
}

[data-roll="2"] :is(.dot-ml, .dot-mr, .dot-tl, .dot-br) {
  display: none;
}

[data-roll="3"] :is(.dot-tl, .dot-br) {
  display: none;
}

[data-roll="4"] :is(.dot-ml, .dot-mr) {
  display: none;
}

:is([data-roll="1"], [data-roll="3"], [data-roll="5"]) :is(.dot-ml, .dot-mr) {
  left: 50%;
}
</style>

