<template>
  <page-header-wrapper
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    :tab-change="handleTabChange"
  >
    <template v-slot:content>
      <div class="ant-pro-page-header-search">
        <a-input-search size="large" icon="search" style="width: 80%; max-width: 522px;">
          <template v-slot:enterButton>
            搜索
          </template>
        </a-input-search>
      </div>
    </template>
    <router-view />
  </page-header-wrapper>
</template>

<script>
const getActiveKey = (path) => {
  switch (path) {
    case '/invest/search/jointname':
      return '1'
    case '/invest/search/sponsor':
      return '2'
    case '/invest/search/adver':
      return '3'
    case '/invest/search/copyright':
      return '4'
    default:
      return '1'
  }
}
export default {
  name: 'SearchLayout',
  data () {
    return {
      tabList: [
        { key: '1', tab: '联名' },
        { key: '2', tab: '赞助引流' },
        { key: '3', tab: '广告合作' },
        { key: '4', tab: '版权购买' }
      ],
      tabActiveKey: '1',
      search: true
    }
  },
  created () {
    this.tabActiveKey = getActiveKey(this.$route.path)

    this.$watch('$route', (val) => {
      this.tabActiveKey = getActiveKey(val.path)
    })
  },
  methods: {
    handleTabChange (key) {
      this.tabActiveKey = key
      switch (key) {
        case '1':
          this.$router.push('/invest/search/jointname')
          break
        case '2':
          this.$router.push('/invest/search/sponsor')
          break
        case '3':
          this.$router.push('/invest/search/adver')
          break
        case '4':
          this.$router.push('/invest/search/copyright')
          break
        default:
          this.$router.push('/workplace')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-page-header-search {
  text-align: center;
  margin-bottom: 16px;
}
</style>
