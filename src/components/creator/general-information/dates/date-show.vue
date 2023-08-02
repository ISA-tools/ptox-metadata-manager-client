<template>
  <div
    class="d-flex justify-center flex-column flex-grow-1"
    :class="{
      'align-left': (left || $vuetify.breakpoint.smAndUp) && !right,
      'align-end': (!left && $vuetify.breakpoint.xsOnly) || right }"
  >
    <div class="label">
      {{ label }}
    </div>
    <div class="mainDate">
      {{ formattedDate[0] }}
    </div>
    <div class="miniLabel">
      {{ formattedDate[1] }}
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/utils/dates"

export default {
  name: "DateShow",
  props: {
    date: { type: String, required: true },
    label: { type: String, required: true },
    left: { type: Boolean, default: false },
    right: { type: Boolean, default: false }
  },
  computed: { formattedDate() { return formatDate(this.date) } }
}
</script>

<style scoped>
  .label {
    font-size: 0.8rem;
    color: #757575;
    font-weight: lighter;
  }
  .mainDate {
    font-weight: bold;
    font-size: 40px;
    letter-spacing: -3px;
    position: relative;
    top: -13px;
  }
  .miniLabel {
    font-size: 0.8rem;
    color: #757575;
    font-weight: lighter;
    position: relative;
    top: -23px;
    letter-spacing: initial;
  }
</style>
