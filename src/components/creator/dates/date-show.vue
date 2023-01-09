<template>
  <div
    class="d-flex justify-center flex-column flex-grow-1"
    :class="{'align-start': left, 'align-end': !left}"
  >
    <div class="label">
      {{ label }}
    </div>
    <div class="mainDate">
      {{ formattedDate }}
    </div>
    <div class="miniLabel">
      {{ miniLabel }}
    </div>
  </div>
</template>

<script>
export default {
  name: "DateShow",
  props: {
    date: { type: String, required: true },
    label: { type: String, required: true },
    left: { type: Boolean, default: false }
  },
  computed: {
    formattedDate() {
      const date = new Date(this.date)
      date.setDate(date.getDate() + 1);
      const day = date.getDate().toString()
      const month = date.toLocaleString('default', { month: 'short' }).toString().toUpperCase()
      return `${day} ${month}`
    },
    miniLabel() {
      const date = new Date(this.date)
      date.setDate(date.getDate() + 1);
      const day = date.toLocaleDateString('default', { weekday: 'long' });
      const year = date.getFullYear()
      return `${day}, ${year}`
    }
  }
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
