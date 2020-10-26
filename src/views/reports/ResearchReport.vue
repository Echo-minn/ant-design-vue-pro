<template>
  <page-header-wrapper>
    <template v-slot:content>
      <div class="ant-pro-page-header-search">
        <a-input-search size="large" icon="search" style="width: 80%; max-width: 522px;">
          <template v-slot:enterButton>
            搜索
          </template>
        </a-input-search>
      </div>
    </template>
    <a-card title="报告分析">
      <a-table
        :row-key="record => record.kw_id"
        :columns="columns"
        :data-source="data"
        :loading="loading"
        :alert="true"
        @change="handleTableChange"
        showPagination="auto"
        bordered
      >
      </a-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
const columns = [
  {
    title: '标的',
    dataIndex: 'name',
    align: 'center',
    customRender: (text) => text
  },
  {
    title: '价格',
    dataIndex: 'price',
    align: 'center',
    customRender: (text) => text
  },
  {
    title: '销售量',
    dataIndex: 'sale_amount',
    align: 'center',
    sorter: true,
    customRender: (text) => text
  },
  {
    title: '同比增长',
    dataIndex: 'sale_amount_growth',
    sorter: true,
    align: 'center',
    customRender: (text) => text
  },
  {
    title: '销售额',
    dataIndex: 'sale_money',
    sorter: true,
    align: 'center',
    customRender: (text) => text
  },
  {
    title: '同比增长',
    dataIndex: 'sale_money_growth',
    sorter: true,
    align: 'center',
    customRender: (text) => text
  },
]
export default {
  name: 'ResearchReport',
  data () {
    this.columns = columns
    return {
      data: [],
      loading: false,
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  methods: {
    handleTableChange () {

    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>

<style scoped>
.ant-pro-page-header-search {
  text-align: center;
  margin-bottom: 16px;
}
</style>