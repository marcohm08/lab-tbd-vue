<template>
  <div class="d-flex row align-items-center">
    <a class="btn btn-success"
      v-if="!isPreviousButtonDisabled"
      @click="previousPage"
    >
      ←
    </a>
    <trigger
    v-for="paginationTrigger in paginationTriggers"
    :class="{
      'base-pagination__description--current mx-2':
        paginationTrigger === currentPage
    }"
    :key="paginationTrigger"
    :pageNumber="paginationTrigger"
    class="base-pagination__description mx-2"
    @loadPage="onLoadPage"
    />
    <a class="btn btn-success"
      v-if="!isNextButtonDisabled"
      @click="nextPage"
    >
      →
    </a>
  </div>
</template>

<script>
import BasePaginationTrigger from '@/components/Pagination/BasePaginationTrigger'
export default {
  components:{
    'trigger': BasePaginationTrigger
  },
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    pageCount: {
      type: Number,
      required: true
    },
    visiblePagesCount: {
      type: Number,
      default: 5
    }
  },
  computed: {
    isPreviousButtonDisabled() {
      return this.currentPage === 1
    },
    isNextButtonDisabled() {
      return this.currentPage === this.pageCount
    },
    paginationTriggers() {
      const currentPage = this.currentPage
      const pageCount = this.pageCount
      let visiblePagesCount
      if(this.pageCount < 5){
        visiblePagesCount = this.pageCount
      } else{
        visiblePagesCount = 5
      }
      const visiblePagesThreshold = (visiblePagesCount - 1) / 2
      const pagintationTriggersArray = Array(visiblePagesCount - 1).fill(0)
      if (currentPage <= visiblePagesThreshold + 1) {
        pagintationTriggersArray[0] = 1
        const pagintationTriggers = pagintationTriggersArray.map(
          (paginationTrigger, index) => {
            return pagintationTriggersArray[0] + index
          }
        )
        pagintationTriggers.push(pageCount)
        return pagintationTriggers
      }
      if (currentPage >= pageCount - visiblePagesThreshold + 1) {
        const pagintationTriggers = pagintationTriggersArray.map(
          (paginationTrigger, index) => {
            return pageCount - index
          }
        )
        pagintationTriggers.reverse().unshift(1)
        return pagintationTriggers
      }
      pagintationTriggersArray[0] = currentPage - visiblePagesThreshold + 1
      const pagintationTriggers = pagintationTriggersArray.map(
        (paginationTrigger, index) => {
          return pagintationTriggersArray[0] + index
        }
      )
      pagintationTriggers.unshift(1);
      pagintationTriggers[pagintationTriggers.length - 1] = pageCount
      return pagintationTriggers

    }
  },
  methods: {
    nextPage() {
      this.$emit('nextPage')
    },
    previousPage() {
      this.$emit('previousPage')
    },
    onLoadPage(value) {
      this.$emit("loadPage", value)
    }
  },
  watch:{
    pageCount: function(){
      this.$forceUpdate()
    }
  }
}
</script>
