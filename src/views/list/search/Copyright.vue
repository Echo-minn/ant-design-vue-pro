<template>
  <div>
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <a-form :form="form" layout="inline">

        <standard-form-row title="适用的文化圈子" grid>
          <a-row>
            <a-col :md="24">
              <a-form-item :wrapper-col="{ span: 24 }">
                <a-select
                  style="max-width: 268px; width: 100%;"
                  mode="multiple"
                  placeholder="选择 圈子"
                  v-decorator="['owner']"
                  @change="handleChange"
                >
                  <a-select-option v-for="item in owners" :key="item.id">{{ item.name }}</a-select-option>
                </a-select>
                <a class="list-articles-trigger" @click="setOwner">只看自己的</a>
              </a-form-item>
            </a-col>
          </a-row>
        </standard-form-row>

        <standard-form-row title="投资方式" grid last>
          <a-row>
            <a-col :md="24">
              <a-input :wrapper-col="{ span: 24 }" placeholder="联合商家创意点推出联名产品"></a-input>
            </a-col>
          </a-row>
        </standard-form-row>
      </a-form>
    </a-card>

    <a-card style="margin-top: 24px;" :bordered="false">
      <a-list
        size="large"
        rowKey="id"
        :loading="loading"
        itemLayout="vertical"
        :dataSource="staticData"
      >
        <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
          <template slot="actions">
            <icon-text type="star-o" :text="item.star" />
            <icon-text type="like-o" :text="item.like" />
            <icon-text type="message" :text="item.message" />
            <icon-text type="rise" text="20%"  theme="twoTone" two-tone-color="#52c41a"/>
          </template>
          <a-list-item-meta>
            <a slot="title" href="https://vue.ant.design/">{{ item.title }}</a>
            <template slot="description">
              <span>
<!--                <a-tag>Ant Design</a-tag>-->
                <!--                <a-tag>设计语言</a-tag>-->
                <!--                <a-tag>蚂蚁金服</a-tag>-->
                <a-tag v-for="item1 in item.tags">{{item1}}</a-tag>
              </span>
            </template>

          </a-list-item-meta>

          <img
            slot="extra"
            width="272"
            alt="logo"
            :src="item.img"
          />

          <article-list-content :description="item.description" :owner="item.owner" :avatar="item.avatar" :href="item.href" :updateAt="item.updatedAt" />
        </a-list-item>
        <div slot="footer" v-if="data.length > 0" style="text-align: center; margin-top: 16px;">
          <a-button @click="loadMore" :loading="loadingMore">加载更多</a-button>
        </div>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import { TagSelect, StandardFormRow, ArticleListContent } from '@/components'
import IconText from './components/IconText'
const TagSelectOption = TagSelect.Option

const owners = [
  {
    id: 'jk',
    name: 'JK制服'
  },
  {
    id: 'hf',
    name: '汉服'
  },
  {
    id: 'hb',
    name: '滑板'
  },
  {
    id: 'dzjj',
    name: '电子竞技'
  },
  {
    id: 'gm',
    name: '国漫'
  },
  {
    id: 'zw',
    name: '宅舞'
  },
  {
    id: 'gd',
    name: '高达'
  }
]

const staticData=[
  {
    id: 1,
    title: '300英雄一次买下4款国漫版权',
    updatedAt: '2018-12',
    tags:[
      '300英雄',
      '电子游戏',
      '国漫'
    ],
    description: '300英雄这款MOBA游戏内测六年，在白嫖了”300“个没有版权的动漫角色后，终于一次性买下4款国漫版权，这款超高人气的网游向玩家展示了其对版权的逐渐重视',
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
    owner: '300英雄',
    star: '884',
    like: '413',
    message: '317',
    href: 'https://300.jumpw.com/',
    img: 'https://s1.ax1x.com/2020/10/25/Bmc1gJ.jpg'
  }
]

export default {
  components: {
    TagSelect,
    TagSelectOption,
    StandardFormRow,
    ArticleListContent,
    IconText
  },
  data () {
    return {
      owners,
      loading: true,
      loadingMore: false,
      data: [],//从后台获取的listData
      staticData,//静态的联名信息
      form: this.$form.createForm(this)
    }
  },
  mounted () {
    this.getList()
    console.log('版权')
  },
  methods: {
    handleChange (value) {
      console.log(`selected ${value}`)
    },
    getList () {
      this.$http.get('/list/article').then(res => {
        console.log('res', res)
        this.data = res.result
        this.loading = false
      })
    },
    loadMore () {
      this.loadingMore = true
      this.$http.get('/list/article').then(res => {
        this.data = this.data.concat(res.result)
      }).finally(() => {
        this.loadingMore = false
      })
    },
    setOwner () {
      const { form: { setFieldsValue } } = this
      setFieldsValue({
        owner: ['wzj']
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-components-tag-select {
  /deep/ .ant-pro-tag-select .ant-tag {
    margin-right: 24px;
    padding: 0 8px;
    font-size: 14px;
  }
}

.list-articles-trigger {
  margin-left: 12px;
}
</style>
