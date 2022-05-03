<template>
  <van-cell class="article-item">
    <!-- 标题 -->
    <div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
    <!-- 标题下内容 -->
    <div slot="label">
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <div class="cover-item"
             v-for="(img,index) in article.cover.images"
             :key="index"
        >
          <van-image
            class="cover-item-img"
            :src="img"
          />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime}}</span>
      </div>
    </div>
    <!-- 文章右侧的内容 -->
    <van-image
      class="right-cover"
      fit="cover"
      v-if="article.cover.type === 1"
      slot="default"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  data () {
    return {}
  },

  props: {
    article: { // 文章对象(父传子)
      type: Object,
      required: true
    }
  },

  // 计算属性 类似于data概念",
  computed: {},

  // 监控data中的数据变化",
  watch: {},

  methods: {},

  // 生命周期 - 创建完成（可以访问当前this实例）",数据模型已加载，方法已加载,html模板已加载,html模板未渲染
  created () {
  },

  // 生命周期 - 挂载之前",html模板未渲染
  beforeMount () {
  },

  // 生命周期 - 挂载完成（可以访问DOM元素）",html模板已渲染
  mounted () {
  },

  // 生命周期 - 更新之前",数据模型已更新,html模板未更新
  beforeUpdate () {
  },

  // 生命周期 - 销毁之前调用
  beforeDestroy () {
  },

  // 生命周期 - 更新之后",数据模型已更新,html模板已更新
  updated () {
  },

  // 生命周期 - 销毁完成"
  destroyed () {
  },

  // 如果页面有keep-alive缓存功能，这个函数会触发",
  activated () {
  }
}
</script>

<style scoped lang="less">
.title {
  font-size: 32px;
  color: rgb(58, 58, 58);
}

.van-cell__value {
  flex: unset;
  width: 232px;
  height: 146px;
  padding-left: 25px;
}
.right-cover {
  width: 232px;
  height: 146px;
}
.label-info-wrap span {
  font-size: 22px;
  color: rgb(153,153,153);
  padding-right: 26px;
}
.cover-wrap {
  display: flex;
  padding: 30px 0;
  .cover-item {
    flex: 1;
    height: 146px;
    &:not(:last-child) {
      padding-right: 4px;
    }
    .cover-item-img {
      width: 100%;
      height: 146px;
    }
  }
}
</style>
