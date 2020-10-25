<template>
  <page-header-wrapper>
    <div>
      <a-card
        style="margin-top: 24px"
        :bordered="false"
        title="投资建议">
        <a-select
          mode="multiple"
          style="width: 40%"
          placeholder="选择你所关注的领域"
          option-label-prop="label"
        >
          <a-select-option v-for="item in cultures" :key="item" :value="item.value" :label="item.label">
            {{ item.culture }}
          </a-select-option>
        </a-select>
      </a-card>
    </div>
  </page-header-wrapper>
</template>

<script>
export default {
  name: 'InvestAdvice',
  data () {
    return {
      cultures: [
        {
          value: 'JK',
          label: 'JK',
          culture: 'JK'
        }, {
          value: 'hanfu',
          label: '汉服',
          culture: '汉服'
        }, {
          value: 'skate',
          label: '滑板',
          culture: '滑板'
        }
      ],
      tabList: [
        {
          key: 'tab1',
          // tab: 'tab1',
          scopedSlots: { tab: 'customRender' }
        },
        {
          key: 'tab2',
          tab: 'tab2'
        }
      ]
    }
  },
  methods: {
    onTabChange (key, type) {
      console.log(key, type)
      this[type] = key
    }
  }
}
</script>

<style scoped>

</style>