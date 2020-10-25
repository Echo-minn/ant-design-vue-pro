<template>
  <div>
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <a-form :form="form" layout="inline">
        <standard-form-row title="涉及圈子" block style="padding-bottom: 11px;">
          <a-form-item>
            <tag-select>
              <tag-select-option value="Category1">JK服饰</tag-select-option>
              <tag-select-option value="Category2">Lolita裙子</tag-select-option>
              <tag-select-option value="Category3">汉服</tag-select-option>
              <tag-select-option value="Category4">美食制作</tag-select-option>
              <tag-select-option value="Category5">轮滑</tag-select-option>
              <tag-select-option value="Category6">滑板</tag-select-option>
              <tag-select-option value="Category7">手账</tag-select-option>
              <tag-select-option value="Category8">国漫</tag-select-option>
              <tag-select-option value="Category9">鬼畜视频</tag-select-option>
              <tag-select-option value="Category10">手工DIY</tag-select-option>
              <tag-select-option value="Category10">宅舞</tag-select-option>
            </tag-select>
          </a-form-item>
        </standard-form-row>

        <standard-form-row title="其它选项" grid last>
          <a-row>
            <a-col :lg="8" :md="10" :sm="10" :xs="24">
              <a-form-item :wrapper-col="{ sm: { span: 16 }, xs: { span: 24 } }" label="名称">
                <a-select
                  style="max-width: 200px; width: 100%;"
                  mode="multiple"
                  placeholder="不限"
                  v-decorator="['author']"
                  @change="handleChange"
                >
                  <a-select-option value="lisa">王昭君</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="10" :sm="10" :xs="24">
              <a-form-item :wrapper-col="{ sm: { span: 16 }, xs: { span: 24 } }" label="好评度">
                <a-select
                  style="max-width: 200px; width: 100%;"
                  placeholder="不限"
                  v-decorator="['rate']"
                >
                  <a-select-option value="good">优秀</a-select-option>
                  <a-select-option value="normal">普通</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </standard-form-row>
      </a-form>
    </a-card>

    <div class="ant-pro-pages-list-projects-cardList">
      <a-list :loading="loading" :data-source="staticData" :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card class="ant-pro-pages-list-projects-card" hoverable>

            <img slot="cover" :src="item.cover" :alt="item.title" />
            <a-card-meta :title="item.title">

              <template slot="description">
                <ellipsis :length="50">{{ item.description }}</ellipsis>
              </template>
            </a-card-meta>
            <div class="cardItemContent">
              <span>{{ item.updatedAt | fromNow }}</span>
              <div class="avatarList">
                <icon-text type="fund" text="播放量提升:120%" />
              </div>
            </div>
          </a-card>
        </a-list-item>
      </a-list>
    </div>
  </div>

</template>

<script>
import moment from 'moment'
import { TagSelect, StandardFormRow, Ellipsis, AvatarList } from '@/components'
import CardInfo from './components/CardInfo'
import IconText from './components/IconText'
const TagSelectOption = TagSelect.Option
const AvatarListItem = AvatarList.AvatarItem
const staticData = [
  {
    id: '1',
    cover: "https://s1.ax1x.com/2020/10/25/BmdfCn.jpg",
    title: '肯德基LPL广告',
    description: '肯德基于2018年携手英雄联盟全球总决赛这一顶尖赛事，为中国战队加油。2019年在LPL的舞台上，肯德基将与英雄联盟继续合作，进一步与年轻人深入沟通，持续展现创意十足、激情无限的品牌精神。炸鸡在手，胜利拿走，和肯德基一起品尝胜利滋味，再辟新章!',
    updatedAt: '2018',
  },
  {
    id: '2',
    cover: "https://s1.ax1x.com/2020/10/25/BmQQpQ.jpg",
    title: 'Vans Skate Fry-Days',
    description: '爽的空调，美味的炸鸡，冰镇啤酒和饮料，加上可以拿到现金奖励的Stoop道具，斜面和弧面的三个小比赛，以及丰富的Vans礼品，滑手们需要做的就是畅快的滑板，痛饮啤酒和大嚼炸鸡，彻底把这个周末点燃! ',
    updatedAt: '2017'
  }

]
export default {
  components: {
    AvatarList,
    AvatarListItem,
    Ellipsis,
    TagSelect,
    TagSelectOption,
    StandardFormRow,
    CardInfo,
    IconText
  },
  data () {
    return {
      data: [],
      staticData,
      form: this.$form.createForm(this),
      loading: true
    }
  },
  filters: {
    fromNow (date) {
      return moment(date).fromNow()
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
      this.$http.get('/list/article', { params: { count: 8 } }).then(res => {
        console.log('res', res)
        this.data = res.result
        this.loading = false
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
.ant-pro-pages-list-projects-cardList {
  margin-top: 24px;

  /deep/ .ant-card-meta-title {
    margin-bottom: 4px;
  }

  /deep/ .ant-card-meta-description {
    height: 44px;
    overflow: hidden;
    line-height: 22px;
  }

  .cardItemContent {
    display: flex;
    height: 20px;
    margin-top: 16px;
    margin-bottom: -4px;
    line-height: 20px;

    > span {
      flex: 1 1;
      color: rgba(0,0,0,.45);
      font-size: 12px;
    }

    /deep/ .ant-pro-avatar-list {
      flex: 0 1 auto;
    }
  }
}
</style>
