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
              <tag-select-option value="Category10">高达</tag-select-option>
              <tag-select-option value="Category10">电子竞技</tag-select-option>
            </tag-select>
          </a-form-item>
        </standard-form-row>

        <standard-form-row title="搜索" grid last>
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
                <icon-text type="eye" text="影响力:241302" />
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
import IconText from './components/IconText'
import { TagSelect, StandardFormRow, Ellipsis, AvatarList } from '@/components'
const TagSelectOption = TagSelect.Option
const AvatarListItem = AvatarList.Item
const staticData = [
  {
    id: '1',
    cover: "https://s1.ax1x.com/2020/10/25/BeXQte.jpg",
    title: '奔驰赞助电子竞技',
    description: '奔驰赞助了S7全球总决赛，当时S7在中国举办，黄牛猖獗，一票难求，奔驰组织了个车主对抗赛，赢了有门票。有个大学生抢不到票，就借家里的奔驰去打比赛，成功夺得亚军拿到门票。最终S7没让奔驰失望。那年全球总决赛的半决赛是SKT对阵RNG，一共吸引了1.05亿中国观众。到了2018年，“最具赞助价值体育赛事”榜单发布，LPL入围，并成为前十体育赛事中唯一一项电子竞技项目，这也是国内的电子竞技赛事第一次进入前十榜单。',
    updatedAt: '2017',
  },
  {
    id: '2',
    cover: "https://s1.ax1x.com/2020/10/25/BmQQpQ.jpg",
    title: 'Vans Skate Fry-Days',
    description: '听说上个周末上海超过40度了？没关系，我们有Skate Fry-Days来对抗高温! 上周五，Vans在位于浦东世博源商场的MX室内滑板场举行了今年第三站，也是上海首站Vans滑板星期五活动。室内板场凉爽的空调，美味的炸鸡，冰镇啤酒和饮料，加上可以拿到现金奖励的Stoop道具，斜面和弧面的三个小比赛，以及丰富的Vans礼品，滑手们需要做的就是畅快的滑板，痛饮啤酒和大嚼炸鸡，彻底把这个周末点燃! ',
    updatedAt: '2017'
  },
  {
    id: '3',
    cover: "https://s1.ax1x.com/2020/10/25/BmwPVe.jpg",
    title: '战马能量型维生素饮料赞助LPL',
    description: '战马能量型维生素饮料始终以“主动战”为口号，与所有的小伙伴一同探索自身潜能，并助力小伙伴成为想要成为的自己，更是在赞助英雄联盟LPL职业联赛及EDG战队中用能量陪伴召唤师们，成为电竞人群的专属“第七件神装“和”能量BUFF“。',
    updatedAt: '2018'
  },
  {
    id: '4',
    cover: "https://s1.ax1x.com/2020/10/25/BmwV2t.jpg",
    title: 'Alien电脑赞助LPL官方',
    description: '2019英雄联盟职业联赛官方合作伙伴，赛事唯一指定用机，外星人ALIENWARE与LPL并肩作战。\n' +
      '\n' +
      '外星人ALIENWARE一直以“颠覆认知极限 ，重塑游戏体验”为宗旨，为玩家打造最强性能的PC产品、最具未来感的设计和最顶级的服务，以超越现实的游戏体验挣脱现实的束缚。',
    updatedAt: '2018'
  },
  {
    id: '5',
    cover: "https://s1.ax1x.com/2020/10/25/Bmw8Gn.jpg",
    title: '多力多姿赞助LPL',
    description: '源于1966年的多力多滋，已成为风靡全球的玉米片。2019携手LPL邀请所有召唤师，吃最劲脆的多力多滋，看最够味的LPL。这色泽金黄、口感劲脆的三角玉米片，张大嘴塞入口中，“嘎吱!” 有劲的一声，浓香四溢，松脆劲爆，顿时让你热血沸腾，释放出心中热情的一面!边看边吃，多力多滋，劲脆够味!',
    updatedAt: '2018'
  },
  {
    id: '6',
    cover: "https://s1.ax1x.com/2020/10/25/Bmw8Gn.jpg",
    title: '多力多姿赞助LPL',
    description: '源于1966年的多力多滋，已成为风靡全球的玉米片。2019携手LPL邀请所有召唤师，吃最劲脆的多力多滋，看最够味的LPL。这色泽金黄、口感劲脆的三角玉米片，张大嘴塞入口中，“嘎吱!” 有劲的一声，浓香四溢，松脆劲爆，顿时让你热血沸腾，释放出心中热情的一面!边看边吃，多力多滋，劲脆够味!',
    updatedAt: '2018'
  },

]
export default {
  components: {
    AvatarList,
    AvatarListItem,
    Ellipsis,
    TagSelect,
    TagSelectOption,
    StandardFormRow,
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
