<template>
  <page-header-wrapper>
    <div class="antd-pro-pages-dashboard-analysis-twoColLayout" :class="!isMobile && 'desktop'">
      <a-row :gutter="24" type="flex" :style="{ marginTop: '24px' }">
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card hoverable style="width: 100%">
            <img
              slot="cover"
              alt="example"
              src="https://s1.ax1x.com/2020/10/18/0jNens.jpg"
            />
            <a-card-meta title="Europe Street beat">
              <template slot="description">
                开源，我想很多小公司用它的原因之一也是这个，不会涉及到专利和产权纠纷。
                2.功能齐全，对于很多硬件设备都有丰富的驱动程序，只需要移植一下，不需要改动太多
                3.Linux内核小，且可裁剪，多任务支持、多用户支持，性能高、稳定性好。
              </template>
            </a-card-meta>
          </a-card>
        </a-col>
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <div id="wordCloud" ref="wordCloud" class="wordCloud-back" style="height: 50vh">
          </div>

          <br />

          <a-card
            style="width:100%"
            :tab-list="tabListNoTitle"
            :active-tab-key="noTitleKey"
            @tabChange="key => onTabChange(key, 'noTitleKey')"
          >
            <p v-if="noTitleKey === 'article'">
              article content
            </p>
            <p v-else-if="noTitleKey === 'app'">
              app content
            </p>
            <p v-else="noTitleKey === 'project'">
              project content
            </p>

            <a slot="tabBarExtraContent" href="#">More</a>
          </a-card>

        </a-col>
      </a-row>
<!--      关注度-->
      <a-row :gutter="24" type="flex" :style="{ marginTop: '24px' }">
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <a-rate class="rate" :default-value="rate" disabled :tooltips="ratedesc" />
        <span class="ant-rate-text">{{ ratedesc[rate - 1] }}</span>
        </a-col>
        <a-col class="button-outer" :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <a-button class="next-button" type="primary"> Go forward<a-icon type="right" /> </a-button>
        </a-col>
      </a-row>
    </div>
  </page-header-wrapper>
</template>

<script>
import echarts from 'echarts'
import moment from 'moment'
import { baseMixin } from '@/store/app-mixin'
import "echarts-wordcloud/dist/echarts-wordcloud"
import "echarts-wordcloud/dist/echarts-wordcloud.min"
export default {
  mixins: [baseMixin],
  mounted() {
    this.initWordCloud()
  },
  data(){
    return{
      rate:2,
      ratedesc: ['terrible', 'bad', 'normal', 'good', 'wonderful'],
      tabList: [
        {
          key: 'tab1',
          // tab: 'tab1',
          scopedSlots: { tab: 'customRender' },
        },
        {
          key: 'tab2',
          tab: 'tab2',
        },
      ],
      contentList: {
        tab1: 'content1',
        tab2: 'content2',
      },
      tabListNoTitle: [
        {
          key: 'article',
          tab: 'article',
        },
        {
          key: 'app',
          tab: 'app',
        },
        {
          key: 'project',
          tab: 'project',
        },
      ],

      key: 'tab1',
      noTitleKey: 'app',

      wordCloud:null,
      worddata: [{
        name: "审批",
        value: 2500
      },
        {
          name: "佣金",
          value: 2300
        },
        {
          name: "发票",
          value: 2000
        },
        {
          name: "扶贫金额",
          value: 1900
        },
        {
          name: "增值税",
          value: 1800
        },
        {
          name: "差旅费",
          value: 1700
        },
        {
          name: "核算",
          value: 1600
        },
        {
          name: "商旅单",
          value: 1500
        },
        {
          name: "报销",
          value: 1200
        },
        {
          name: "交通费",
          value: 1100
        },
        {
          name: "业务招待费",
          value: 900
        },
        {
          name: "水费",
          value: 800
        },
        {
          name: "电费",
          value: 700
        },
      ],
    }
  },
  methods:{
    onTabChange(key, type) {
      console.log(key, type);
      this[type] = key;
    },
    // Echarts 的 resize 方法
    resizeHandler() {
      this.wordCloud.resize()
    },
    initWordCloud(){
      const _this = this
      _this.wordCloud=echarts.init(this.$refs.wordCloud)
      _this.wordCloud.setOption({
        series: [
          {
            type: "wordCloud",
            //用来调整词之间的距离
            gridSize: 10,
            //用来调整字的大小范围
            // Text size range which the value in data will be mapped to.
            // Default to have minimum 12px and maximum 60px size.
            sizeRange: [14, 60],
            // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
            //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
            rotationRange: [-45, 0, 45, 90],
            // rotationRange: [ 0,90],
            // rotationRange: [0, 0],
            //随机生成字体颜色
            // maskImage: maskImage,
            textStyle: {
              normal: {
                color: function() {
                  return (
                    "rgb(" +
                    Math.round(Math.random() * 255) +
                    ", " +
                    Math.round(Math.random() * 255) +
                    ", " +
                    Math.round(Math.random() * 255) +
                    ")"
                  );
                }
              }
            },
            //位置相关设置
            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the center and has 75% x 80% size.
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            width: "200%",
            height: "200%",
            //数据
            data: _this.worddata
          }
        ]
      })
      window.addEventListener('resize',this.resizeHandler)
    }
  }
}
</script>

<style scoped>
.antd-pro-pages-dashboard-analysis-twoColLayout {
  position: relative;
  display: flex;
  display: block;
  flex-flow: row wrap;
}
.wordCloud-back{
  /*background: -webkit-linear-gradient(left,rgba(0,216,247,0),rgba(0,175,237,1));*/
  background: -webkit-linear-gradient(right, #f0f8fa 0%, #d6e5fd 100%);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius:20px ;
  border: #7f8c8d solid 3px;
}
.rate{
  margin-top: 20px;
  margin-left: 20px;
}
.button-outer{
  position: relative;
}
.next-button{
  position: absolute;
  right: 10px;
  bottom: 10px;
}
</style>