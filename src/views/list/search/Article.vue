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
    title: '梗豆物语制服馆——三丽鸥合作款',
    updatedAt: '2020-2',
    tags:[
      'JK制服',
      'Sanrio',
      'HelloKitty'
    ],
    description: '从格裙、衬衫、马甲，到小物领结等，可以说从上到下承包了JK们整个衣柜，满足了所有女孩的少女心！这些可爱又独特的联名款，个个少见又吸睛，再加上联名款只能在有限的时间内贩售，使不少JK们抢到“手软”。',
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
    owner: '三丽鸥',
    star: '884',
    like: '413',
    message: '317',
    href: 'https://kyouko.world.taobao.com/',
    img: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
  },
  {
    id: 2,
    title:'三月塾——万丈光芒',
    updatedAt: '2020-2',
    tags:[
      'JK制服',
      '创造营',
      '爱豆'
    ],
    description: '随着JK制服人气的增高，我们不光能在网络中看到JK的身影，而且在电视选秀综艺中也能发现JK制服的存在。这不三月塾与《创造营》联名的官方小物，既能满足了JK女孩们的偶像梦，又能快乐的get起同款来为自己喜欢的爱豆应援打call！',
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
    owner: '三月塾',
    star: '884',
    like: '413',
    message: '317',
    href: 'https://kyouko.world.taobao.com/',
    img: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
  },
  {
    id: 3,
    title: 'Nike x lpl —— GoodGame',
    updatedAt: '2020-9',
    tags:[
      'Nike',
      '英雄联盟',
      'GoodGame',
      'Blazer'
    ],
    description: '70 年代末，Blazer 在篮球场上首度亮相，随后便迅速风靡，成为运动服饰中的时尚标杆。此版本从当今电竞文化中汲取灵感，鞋面采用夜光材质，并采用黑白撞色设计，同时以亮深红、热情紫和波罗的海蓝点染，营造出迷人的渐变效果；此外还融入魔术贴、透镜状图案和像素化的 Swoosh 标志，呈现出颇具未来主义气息的出众外观。',
    avatar: "https://s1.ax1x.com/2020/10/25/BmQ2tO.jpg",
    owner: 'nike',
    star: '11032',
    like: '23420',
    message: '8929',
    href: 'https://www.nike.com/cn',
    img: 'https://s1.ax1x.com/2020/10/25/BmPXU1.png'
  },
  {
    id: 4,
    title: '盗月社食遇记—大佬蟹礼',
    updatedAt: '2020-9',
    tags:[
      '美食',
      '盗月社食遇记',
      '大闸蟹'
    ],
    description: '是的，盗月社开小店啦。因为我们在全国各地品尝美食，想能不能让大家也尝尝各地的风味呢？ 抱着这个心态，我们就尝试启动我们的线上店铺“月亮大佬”啦。 因为近期是蟹季，就准备了这份蟹礼盒。有我们专门设计和定制的礼盒、严格把关的螃蟹，还有一点小心意。最后！因为盗月社建立店铺的初衷，是希望和大家一起分享更好的美食！',
    avatar: " https://s1.ax1x.com/2020/10/25/BmFCWV.jpg",
    owner: '盗月社食遇记',
    star: '1023',
    like: '893',
    message: '714',
    href: ' https://shop355311312.taobao.com/',
    img: 'https://s1.ax1x.com/2020/10/25/BmQbAf.jpg'
  },
  {
    id: 5,
    title: 'VANS X REAL 职业滑板合作系列',
    updatedAt: '2016-11',
    tags:[
      '滑板',
      'VANS',
      'Real'
    ],
    description: ' Vans和Real滑板在今年冬季再度携手，共同推出第二波Vans X Real职业滑板合作系列！本次合作系列的设计灵感仍然来源于滑板运动，可以说是为了滑手量身定做，这也彰显了Vans和Real这两个令人尊敬的品牌以及他们的赞助滑手们，“自始至终”支持滑板文化的决心！',
    avatar: "https://s1.ax1x.com/2020/10/25/BmlPEV.jpg",
    owner: 'vans',
    star: '182',
    like: '473',
    message: '83',
    href: 'https://vans.tmall.com/shop/view_shop.htm',
    img: 'https://s1.ax1x.com/2020/10/25/BmlACF.jpg'
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
