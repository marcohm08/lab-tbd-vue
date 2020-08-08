<template>
  <div class="row">
    <a class="btn btn-success"
      :disabled="isPreviousButtonDisabled"
      @click.native="previousPage"
    >
      ←
    </a>
    <a class="btn btn-success"
      :disabled="isNextButtonDisabled"
      @click.native="nextPage"
    >
      →
    </a>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    pageCount: {
      type: Number,
      required: true
    }
  },
  computed: {
    isPreviousButtonDisabled() {
      return this.currentPage === 1
    },
    isNextButtonDisabled() {
      return this.currentPage === this.pageCount
    }
  },
  methods: {
    nextPage() {
      this.$emit('nextPage')
    },
    previousPage() {
      this.$emit('previousPage')
    }
  }
}
</script>
