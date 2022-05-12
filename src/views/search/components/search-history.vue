<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clearHistory', [])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon @click="isDeleteShow = true" v-else name="delete"/>
    </van-cell>
    <van-cell
      @click="deleteHistory(history,index)"
      v-for="(history,index) in historyRecord"
      :key="index"
      :title="history"
    >
      <van-icon v-show="isDeleteShow" name="close"/>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  data () {
    return {
      isDeleteShow: false // 控制删除状态
    }
  },

  props: {
    historyRecord: { // 历史记录列表
      type: Array,
      required: true
    }
  },

  // 计算属性 类似于data概念",
  computed: {},

  // 监控data中的数据变化",
  watch: {},

  methods: {
    deleteHistory (history, index) { // 删除单条历史记录
      if (this.isDeleteShow) {
        // 删除状态，删除历史记录数据
        this.historyRecord.splice(index, 1)
      } else {
        // 非删除状态，直接进入搜索
        this.$emit('searchResult', history)
      }
    }
  },

  // 生命周期 - 创建完成（可以访问当前this实例）",数据模型已加载，方法已加载,html模板已加载,html模板未渲染
  created () {
  }

}
</script>

<style scoped lang="less">
</style>
