<template>
  <page-header-wrapper>
    <a-carousel autoplay >
      <div  v-for="url in urls">
        <img  class="center-content" :src="url" />
      </div>
    </a-carousel>

    <div class="antd-pro-pages-dashboard-analysis-twoColLayout" :class="!isMobile && 'desktop'">
      <a-row :gutter="24" type="flex" :style="{ marginTop: '24px' }">
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :loading="loading" :bordered="false" title="线上热门搜索" :style="{ height: '100%' }">
            <a-dropdown :trigger="['click']" placement="bottomLeft" slot="extra">
              <a class="ant-dropdown-link" href="#">
                <a-icon type="ellipsis" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;">操作一</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">操作二</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
<!--            <a-row :gutter="68">-->
<!--              <a-col :xs="24" :sm="12" :style="{ marginBottom: ' 24px'}">-->
<!--                <number-info :total="12321" :sub-total="17.1">-->
<!--                  <span slot="subtitle">-->
<!--                    <span>搜索用户数</span>-->
<!--                    <a-tooltip title="指标说明" slot="action">-->
<!--                      <a-icon type="info-circle-o" :style="{ marginLeft: '8px' }" />-->
<!--                    </a-tooltip>-->
<!--                  </span>-->
<!--                </number-info>-->
<!--                <div>-->
<!--                  <mini-smooth-area :style="{ height: '45px' }" :dataSource="searchUserData" :scale="searchUserScale" />-->
<!--                </div>-->
<!--              </a-col>-->
<!--              <a-col :xs="24" :sm="12" :style="{ marginBottom: ' 24px'}">-->
<!--                <number-info :total="2.7" :sub-total="26.2" status="down">-->
<!--                  <span slot="subtitle">-->
<!--                    <span>人均搜索次数</span>-->
<!--                    <a-tooltip title="指标说明" slot="action">-->
<!--                      <a-icon type="info-circle-o" :style="{ marginLeft: '8px' }" />-->
<!--                    </a-tooltip>-->
<!--                  </span>-->
<!--                </number-info>-->
<!--                <div>-->
<!--                  <mini-smooth-area :style="{ height: '45px' }" :dataSource="searchUserData" :scale="searchUserScale" />-->
<!--                </div>-->
<!--              </a-col>-->
<!--            </a-row>-->
            <div class="ant-table-wrapper">
              <a-table
                row-key="index"
                size="small"
                :columns="searchTableColumns"
                :dataSource="searchData"
                :pagination="{ pageSize: 5 }"
              >
                <span slot="range" slot-scope="text, record">
                  <trend :flag="record.status === 0 ? 'up' : 'down'">
                    {{ text }}%
                  </trend>
                </span>
              </a-table>
            </div>
          </a-card>
        </a-col>
<!--        右半边-->
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :loading="loading" :bordered="false" title="销售额类别占比" :style="{ height: '100%' }">
            <div slot="extra" style="height: inherit;">
              <!-- style="bottom: 12px;display: inline-block;" -->
              <span class="dashboard-analysis-iconGroup">
                <a-dropdown :trigger="['click']" placement="bottomLeft">
                  <a-icon type="ellipsis" class="ant-dropdown-link" />
                  <a-menu slot="overlay">
                    <a-menu-item>
                      <a href="javascript:;">操作一</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a href="javascript:;">操作二</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </span>

              <div class="analysis-salesTypeRadio">
                <a-radio-group :defaultValue="radioValue" @change="radioOnchange">
                  <a-radio-button value="a">全部渠道</a-radio-button>
                  <a-radio-button value="b">线上</a-radio-button>
                  <a-radio-button value="c">门店</a-radio-button>
                </a-radio-group>
              </div>

            </div>
            <h4>销售额</h4>
            <div>
              <!-- style="width: calc(100% - 240px);" -->
              <div>
<!--                现在是静态数据，所以写了三遍这个表格，实际上只需要修改data即可-->
                <v-chart :force-fit="true" :height="405" :data="pieData" :scale="pieScale" v-if="radioValue=='a'">
                  <v-tooltip :showTitle="false" dataKey="item*percent" />
                  <v-axis />
                  <!-- position="right" :offsetX="-140" -->
                  <v-legend dataKey="item"/>
                  <v-pie position="percent" color="item" :vStyle="pieStyle" />
                  <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
                </v-chart>
                <v-chart :force-fit="true" :height="405" :data="pieData2" :scale="pieScale" v-if="radioValue=='b'">
                  <v-tooltip :showTitle="false" dataKey="item*percent" />
                  <v-axis />
                  <!-- position="right" :offsetX="-140" -->
                  <v-legend dataKey="item"/>
                  <v-pie position="percent" color="item" :vStyle="pieStyle" />
                  <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
                </v-chart>
                <v-chart :force-fit="true" :height="405" :data="pieData3" :scale="pieScale" v-if="radioValue=='c'">
                  <v-tooltip :showTitle="false" dataKey="item*percent" />
                  <v-axis />
                  <!-- position="right" :offsetX="-140" -->
                  <v-legend dataKey="item"/>
                  <v-pie position="percent" color="item" :vStyle="pieStyle" />
                  <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
                </v-chart>
              </div>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <div class="antd-pro-pages-dashboard-analysis-twoColLayout" :class="!isMobile && 'desktop'">
      <a-row :gutter="24" type="flex" :style="{ marginTop: '24px' }">
        <!--    echarts-->
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <div class="myEcharts" id="myCharts" ref="myCharts" style="height: 50vh"></div>
        </a-col>
        <!--    style="width: 100%; height:0;   padding-bottom:100%;"-->
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <div class="myEcharts" id="myCharts2" ref="myCharts2" style="height: 50vh" ></div>
  <!--        :style="{width: '500px', height: '500px'}"-->
        </a-col>
      </a-row>
    </div>

<!--    列表-->
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="圈子列表">

      <div slot="extra">
        <a-radio-group v-model="status">
          <a-radio-button value="all">全部</a-radio-button>
          <a-radio-button value="processing">我的关注</a-radio-button>
<!--          <a-radio-button value="waiting">等待中</a-radio-button>-->
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 272px;" />
      </div>

<!--      <div class="operate">-->
<!--        <a-button type="dashed" style="width: 100%" icon="plus" @click="addList">添加</a-button>-->
<!--      </div>-->

      <a-list size="large" :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50}">
        <a-list-item :key="index" v-for="(item, index) in listData">
          <a-list-item-meta :description="item.description">
            <a-avatar slot="avatar" size="large" shape="square" :src="item.avatar"/>
            <a slot="title">{{ item.title }}</a>
          </a-list-item-meta>
          <div slot="actions">
            <a @click="check(item)">查看</a>
          </div>
<!--          <div slot="actions">-->
<!--            <a-dropdown>-->
<!--              <a-menu slot="overlay">-->
<!--                <a-menu-item><a>编辑</a></a-menu-item>-->
<!--                <a-menu-item><a>删除</a></a-menu-item>-->
<!--              </a-menu>-->
<!--              <a>更多<a-icon type="down"/></a>-->
<!--            </a-dropdown>-->
<!--          </div>-->
          <div class="list-content">
            <div class="list-content-item">
              <span>主要受众</span>
              <p>{{ item.owner }}</p>
            </div>
            <div class="list-content-item">
              <span>兴起时间</span>
              <p>{{ item.startAt }}</p>
            </div>
            <div class="list-content-item">
              <a-progress :percent="item.progress.value" :status="!item.progress.status ? null : item.progress.status" style="width: 180px" />
            </div>
          </div>
        </a-list-item>
      </a-list>
    </a-card>

  </page-header-wrapper>
</template>

<script>
import echarts from 'echarts'
import moment from 'moment'
import {
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  RankList,
  Bar,
  Trend,
  NumberInfo,
  MiniSmoothArea,
  Info,
  TaskForm
} from '@/components'
import { baseMixin } from '@/store/app-mixin'

const barData = []
const barData2 = []
for (let i = 0; i < 12; i += 1) {
  barData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })
  barData2.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })
}

const rankList = []
for (let i = 0; i < 7; i++) {
  rankList.push({
    name: '白鹭岛 ' + (i + 1) + ' 号店',
    total: 1234.56 - i * 100
  })
}

const searchUserData = []
for (let i = 0; i < 7; i++) {
  searchUserData.push({
    x: moment().add(i, 'days').format('YYYY-MM-DD'),
    y: Math.ceil(Math.random() * 10)
  })
}
const searchUserScale = [
  {
    dataKey: 'x',
    alias: '时间'
  },
  {
    dataKey: 'y',
    alias: '用户数',
    min: 0,
    max: 10
  }]

const searchTableColumns = [
  {
    dataIndex: 'index',
    title: '排名',
    width: 90
  },
  {
    dataIndex: 'keyword',
    title: '文化圈'
  },
  {
    dataIndex: 'count',
    title: '用户数'
  },
  {
    dataIndex: 'range',
    title: '周涨幅',
    align: 'right',
    sorter: (a, b) => a.range - b.range,
    scopedSlots: { customRender: 'range' }
  }
]
const searchData = []
for (let i = 0; i < 20; i += 1) {
  searchData.push({
    index: i + 1,
    keyword: ``,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2)
  })
}
searchData[0].keyword='JK'
searchData[1].keyword='鬼畜'
searchData[2].keyword='滑板'
searchData[3].keyword='手账'
searchData[4].keyword='DIY手作'
searchData[5].keyword='美食制作'

const DataSet = require('@antv/data-set')

const sourceData = [
  { item: 'JK制服', count: 32.2 },
  { item: 'DIY产品', count: 21 },
  { item: '滑板', count: 17 },
  { item: '鬼畜', count: 13 },
  { item: '说唱', count: 9 },
  { item: '其他', count: 7.8 }
]
const sourceData2 = [
  { item: 'JK制服', count: 40 },
  { item: 'DIY产品', count: 60 },
  { item: '滑板', count: 0 },
  { item: '鬼畜', count: 0 },
  { item: '说唱', count: 0 },
  { item: '其他', count: 0 }
]
const sourceData3 = [
  { item: 'JK制服', count: 0 },
  { item: 'DIY产品', count: 0 },
  { item: '滑板', count: 100 },
  { item: '鬼畜', count: 0 },
  { item: '说唱', count: 0 },
  { item: '其他', count: 0 }
]
const pieScale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%'
}]

const dv = new DataSet.View().source(sourceData)
const dv2 = new DataSet.View().source(sourceData2)
const dv3 = new DataSet.View().source(sourceData3)

dv.transform({
  type: 'percent',
  field: 'count',
  dimension: 'item',
  as: 'percent'
})
dv2.transform({
  type: 'percent',
  field: 'count',
  dimension: 'item',
  as: 'percent'
})
dv3.transform({
  type: 'percent',
  field: 'count',
  dimension: 'item',
  as: 'percent'
})
const pieData = dv.rows
const pieData2 = dv2.rows
const pieData3 = dv3.rows


const listData = []
listData.push({
  title: 'JK制服',
  avatar: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1603095098&di=a9803b6da67406b8dcd6a0d7b94e45d7&src=http://hbimg.b0.upaiyun.com/ed51586cb983a2dba9583abb5982f4e111b043e3c0a5a-wr93Ez_fw658',
  description: '日本女高中生制服',
  owner: '15-25岁女学生',
  startAt: '2018-07-26 22:44',
  progress: {
    value: 90
  }
})
listData.push({
  title: 'Angular',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
  description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  owner: '曲丽丽',
  startAt: '2018-07-26 22:44',
  progress: {
    value: 54
  }
})
listData.push({
  title: 'Ant Design',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
  description: '生命就像一盒巧克力，结果往往出人意料',
  owner: '林东东',
  startAt: '2018-07-26 22:44',
  progress: {
    value: 66
  }
})
listData.push({
  title: 'Ant Design Pro',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
  description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  owner: '周星星',
  startAt: '2018-07-26 22:44',
  progress: {
    value: 30
  }
})
listData.push({
  title: 'Bootstrap',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
  description: '那时候我只会想自己想要什么，从不想自己拥有什么',
  owner: '吴加好',
  startAt: '2018-07-26 22:44',
  progress: {
    status: 'exception',
    value: 100
  }
})
export default {
  mixins: [baseMixin],
  components: {
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    RankList,
    Bar,
    Trend,
    NumberInfo,
    MiniSmoothArea,
    TaskForm,
    Info
  },
  data() {
    return {
      //Echarts实例
      chart1: null,
      chart2: null,
      urls:[
        'https://s1.ax1x.com/2020/10/18/0XU2cQ.jpg',
        'https://s1.ax1x.com/2020/10/18/0XUg1g.jpg',
        'https://s1.ax1x.com/2020/10/18/0XUyh8.jpg',
        'https://s1.ax1x.com/2020/10/18/0XUc9S.jpg',
      ],
      loading: true,
      rankList,

      // 搜索用户数
      searchUserData,
      searchUserScale,
      searchTableColumns,
      searchData,

      barData,
      barData2,

      //
      radioValue:'a',
      pieScale,
      pieData,
      pieData2,
      pieData3,
      sourceData,
      sourceData2,
      sourceData3,

      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      },
      listData,
      status: 'all'
    }
  },
  methods:{
    //复选框改变
    radioOnchange(e)
    {
    this.radioValue=e.target.value;
    console.log(this.radioValue)
    },
    // Echarts 的 resize 方法
    resizeHandler() {
      this.chart.resize()
    },
    // Echarts 的 resize 方法
    resizeHandler2() {
      this.chart2.resize()
    },
    addList () {
      this.$dialog(TaskForm,
        // component props
        {
          record: {},
          on: {
            ok () {
              console.log('ok 回调')
            },
            cancel () {
              console.log('cancel 回调')
            },
            close () {
              console.log('modal close 回调')
            }
          }
        },
        // modal props
        {
          title: '新增',
          width: 700,
          centered: true,
          maskClosable: false
        })
    },
    check (record) {
      console.log(record)
      // this.$dialog(TaskForm,
      //   // component props
      //   {
      //     record,
      //     on: {
      //       ok () {
      //         console.log('ok 回调')
      //       },
      //       cancel () {
      //         console.log('cancel 回调')
      //       },
      //       close () {
      //         console.log('modal close 回调')
      //       }
      //     }
      //   },
      //   // modal props
      //   {
      //     title: '操作',
      //     width: 700,
      //     centered: true,
      //     maskClosable: false
      //   })
    },
    //旭日图
    initEchart1()
    {
      // 以下三步即可完成echarts的初始化使用
      //初始化Echarts实例
      const _this = this
      _this.chart = echarts.init(this.$refs.myCharts2);
      // const myCharts = echarts.init(this.$refs.myCharts2);
      const colors = ['#FFAE57', '#FF7853', '#EA5151', '#CC3F57', '#9A2555'];
      const bgColor = '#2E2733';

      const itemStyle = {
        star5: {
          color: colors[0]
        },
        star4: {
          color: colors[1]
        },
        star3: {
          color: colors[2]
        },
        star2: {
          color: colors[3]
        }
      };

      const data = [{
        name: '无实体',
        itemStyle: {
          color: colors[1]
        },
        children: [{
          name: '鬼畜',
          children: [{
            name: '5☆',
            children: [{
              name: '卢本伟'
            }, {
              name: '法海'
            }, {
              name: '马保国'
            }]
          }, {
            name: '4☆',
            children: [{
              name: '虚无的十字架'
            }, {
              name: '无声告白'
            }, {
              name: '童年的终结'
            }]
          }, {
            name: '3☆',
            children: [{
              name: '疯癫老人日记'
            }]
          }]
        }, {
          name: '说唱',
          children: [{
            name: '5☆',
            children: [{
              name: '纳博科夫短篇小说全集'
            }]
          }, {
            name: '4☆',
            children: [{
              name: '安魂曲'
            }, {
              name: '人生拼图版'
            }]
          }, {
            name: '3☆',
            children: [{
              name: '比起爱你，我更需要你'
            }]
          }]
        }]
      }, {
        name: '有实体',
        itemStyle: {
          color: colors[2]
        },
        children: [{
          name: '服饰',
          children: [{
            name: '5☆',
            children: [{
              name: 'DK'
            }]
          }, {
            name: '4☆',
            children: [{
              name: 'JK'
            }, {
              name: 'Lolita'
            }]
          }, {
            name: '3☆',
            children: [{
              name: '汉服'
            }]
          }]
        }, {
          name: '社科',
          children: [{
            name: '5☆',
            children: [{
              name: '痛点'
            }]
          }, {
            name: '4☆',
            children: [{
              name: '卓有成效的管理者'
            }, {
              name: '进化'
            }, {
              name: '后物欲时代的来临',
            }]
          }, {
            name: '3☆',
            children: [{
              name: '疯癫与文明'
            }]
          }]
        }, {
          name: '心理',
          children: [{
            name: '5☆',
            children: [{
              name: '我们时代的神经症人格'
            }]
          }, {
            name: '4☆',
            children: [{
              name: '皮格马利翁效应'
            }, {
              name: '受伤的人'
            }]
          }, {
            name: '3☆',
          }, {
            name: '2☆',
            children: [{
              name: '迷恋'
            }]
          }]
        }, {
          name: '居家',
          children: [{
            name: '4☆',
            children: [{
              name: '把房子住成家'
            }, {
              name: '只过必要生活'
            }, {
              name: '北欧简约风格'
            }]
          }]
        }, {
          name: '绘本',
          children: [{
            name: '5☆',
            children: [{
              name: '设计诗'
            }]
          }, {
            name: '4☆',
            children: [{
              name: '假如生活糊弄了你'
            }, {
              name: '博物学家的神秘动物图鉴'
            }]
          }, {
            name: '3☆',
            children: [{
              name: '方向'
            }]
          }]
        }, {
          name: '哲学',
          children: [{
            name: '4☆',
            children: [{
              name: '人生的智慧'
            }]
          }]
        }, {
          name: '技术',
          children: [{
            name: '5☆',
            children: [{
              name: '代码整洁之道'
            }]
          }, {
            name: '4☆',
            children: [{
              name: 'Three.js 开发指南'
            }]
          }]
        }]
      }];

      for (var j = 0; j < data.length; ++j) {
        var level1 = data[j].children;
        for (var i = 0; i < level1.length; ++i) {
          var block = level1[i].children;
          var bookScore = [];
          var bookScoreId;
          for (var star = 0; star < block.length; ++star) {
            var style = (function (name) {
              switch (name) {
                case '5☆':
                  bookScoreId = 0;
                  return itemStyle.star5;
                case '4☆':
                  bookScoreId = 1;
                  return itemStyle.star4;
                case '3☆':
                  bookScoreId = 2;
                  return itemStyle.star3;
                case '2☆':
                  bookScoreId = 3;
                  return itemStyle.star2;
              }
            })(block[star].name);

            block[star].label = {
              color: style.color,
              downplay: {
                opacity: 0.5
              }
            };

            if (block[star].children) {
              style = {
                opacity: 1,
                color: style.color
              };
              block[star].children.forEach(function (book) {
                book.value = 1;
                book.itemStyle = style;

                book.label = {
                  color: style.color
                };

                var value = 1;
                if (bookScoreId === 0 || bookScoreId === 3) {
                  value = 5;
                }

                if (bookScore[bookScoreId]) {
                  bookScore[bookScoreId].value += value;
                }
                else {
                  bookScore[bookScoreId] = {
                    color: colors[bookScoreId],
                    value: value
                  };
                }
              });
            }
          }

          level1[i].itemStyle = {
            color: data[j].itemStyle.color
          };
        }
      }

      const options = {
        backgroundColor: bgColor,
        color: colors,
        series: [{
          type: 'sunburst',
          center: ['50%', '48%'],
          data: data,
          sort: function (a, b) {
            if (a.depth === 1) {
              return b.getValue() - a.getValue();
            }
            else {
              return a.dataIndex - b.dataIndex;
            }
          },
          label: {
            rotate: 'radial',
            color: bgColor
          },
          itemStyle: {
            borderColor: bgColor,
            borderWidth: 2
          },
          levels: [{}, {
            r0: 0,
            r: 40,
            label: {
              rotate: 0
            }
          }, {
            r0: 40,
            r: 105
          }, {
            r0: 115,
            r: 140,
            itemStyle: {
              shadowBlur: 2,
              shadowColor: colors[2],
              color: 'transparent'
            },
            label: {
              rotate: 'tangential',
              fontSize: 10,
              color: colors[0]
            }
          }, {
            r0: 140,
            r: 145,
            itemStyle: {
              shadowBlur: 80,
              shadowColor: colors[0]
            },
            label: {
              position: 'outside',
              textShadowBlur: 5,
              textShadowColor: '#333',
            },
            downplay: {
              label: {
                opacity: 0.5
              }
            }
          }]
        }]
      };

      // myCharts.setOption(options);
      _this.chart.setOption(options)
      window.addEventListener('resize',_this.resizeHandler)
    },
    //散点图
    initEchart2()
    {
      // 以下三步即可完成echarts的初始化使用
      // const myCharts = echarts.init(this.$refs.myCharts);
      const _this = this
      _this.chart2 = echarts.init(this.$refs.myCharts);
      //红色圆点
      var dataBJ = [
        [1,55,9,56,0.46,18,6,"良"],
        [2,25,11,21,0.65,34,9,"优"],
        [3,56,7,63,0.3,14,5,"良"],
        [4,33,7,29,0.33,16,6,"优"],
        [5,42,24,44,0.76,40,16,"优"],
        [6,82,58,90,1.77,68,33,"良"],
        [7,74,49,77,1.46,48,27,"良"],
        [8,78,55,80,1.29,59,29,"良"],
        [9,267,216,280,4.8,108,64,"重度污染"],
        [10,185,127,216,2.52,61,27,"中度污染"],
        [11,39,19,38,0.57,31,15,"优"],
        [12,41,11,40,0.43,21,7,"优"],
        [13,64,38,74,1.04,46,22,"良"],
        [14,108,79,120,1.7,75,41,"轻度污染"],
        [15,108,63,116,1.48,44,26,"轻度污染"],
        [16,33,6,29,0.34,13,5,"优"],
        [17,94,66,110,1.54,62,31,"良"],
        [18,186,142,192,3.88,93,79,"中度污染"],
        [19,57,31,54,0.96,32,14,"良"],
        [20,22,8,17,0.48,23,10,"优"],
        [21,39,15,36,0.61,29,13,"优"],
        [22,94,69,114,2.08,73,39,"良"],
        [23,99,73,110,2.43,76,48,"良"],
        [24,31,12,30,0.5,32,16,"优"],
        [25,42,27,43,1,53,22,"优"],
        [26,154,117,157,3.05,92,58,"中度污染"],
        [27,234,185,230,4.09,123,69,"重度污染"],
        [28,160,120,186,2.77,91,50,"中度污染"],
        [29,134,96,165,2.76,83,41,"轻度污染"],
        [30,52,24,60,1.03,50,21,"良"],
        [31,46,5,49,0.28,10,6,"优"]
      ];
    //绿色圆点
      var dataGZ = [
        [1,26,37,27,1.163,27,13,"优"],
        [2,85,62,71,1.195,60,8,"良"],
        [3,78,38,74,1.363,37,7,"良"],
        [4,21,21,36,0.634,40,9,"优"],
        [5,41,42,46,0.915,81,13,"优"],
        [6,56,52,69,1.067,92,16,"良"],
        [7,64,30,28,0.924,51,2,"良"],
        [8,55,48,74,1.236,75,26,"良"],
        [9,76,85,113,1.237,114,27,"良"],
        [10,91,81,104,1.041,56,40,"良"],
        [11,84,39,60,0.964,25,11,"良"],
        [12,64,51,101,0.862,58,23,"良"],
        [13,70,69,120,1.198,65,36,"良"],
        [14,77,105,178,2.549,64,16,"良"],
        [15,109,68,87,0.996,74,29,"轻度污染"],
        [16,73,68,97,0.905,51,34,"良"],
        [17,54,27,47,0.592,53,12,"良"],
        [18,51,61,97,0.811,65,19,"良"],
        [19,91,71,121,1.374,43,18,"良"],
        [20,73,102,182,2.787,44,19,"良"],
        [21,73,50,76,0.717,31,20,"良"],
        [22,84,94,140,2.238,68,18,"良"],
        [23,93,77,104,1.165,53,7,"良"],
        [24,99,130,227,3.97,55,15,"良"],
        [25,146,84,139,1.094,40,17,"轻度污染"],
        [26,113,108,137,1.481,48,15,"轻度污染"],
        [27,81,48,62,1.619,26,3,"良"],
        [28,56,48,68,1.336,37,9,"良"],
        [29,82,92,174,3.29,0,13,"良"],
        [30,106,116,188,3.628,101,16,"轻度污染"],
        [31,118,50,0,1.383,76,11,"轻度污染"]
      ];
      //黄色圆点
      var dataSH = [
        [1,91,45,125,0.82,34,23,"良"],
        [2,65,27,78,0.86,45,29,"良"],
        [3,83,60,84,1.09,73,27,"良"],
        [4,109,81,121,1.28,68,51,"轻度污染"],
        [5,106,77,114,1.07,55,51,"轻度污染"],
        [6,109,81,121,1.28,68,51,"轻度污染"],
        [7,106,77,114,1.07,55,51,"轻度污染"],
        [8,89,65,78,0.86,51,26,"良"],
        [9,53,33,47,0.64,50,17,"良"],
        [10,80,55,80,1.01,75,24,"良"],
        [11,117,81,124,1.03,45,24,"轻度污染"],
        [12,99,71,142,1.1,62,42,"良"],
        [13,95,69,130,1.28,74,50,"良"],
        [14,116,87,131,1.47,84,40,"轻度污染"],
        [15,108,80,121,1.3,85,37,"轻度污染"],
        [16,134,83,167,1.16,57,43,"轻度污染"],
        [17,79,43,107,1.05,59,37,"良"],
        [18,71,46,89,0.86,64,25,"良"],
        [19,97,71,113,1.17,88,31,"良"],
        [20,84,57,91,0.85,55,31,"良"],
        [21,87,63,101,0.9,56,41,"良"],
        [22,104,77,119,1.09,73,48,"轻度污染"],
        [23,87,62,100,1,72,28,"良"],
        [24,168,128,172,1.49,97,56,"中度污染"],
        [25,65,45,51,0.74,39,17,"良"],
        [26,39,24,38,0.61,47,17,"优"],
        [27,39,24,39,0.59,50,19,"优"],
        [28,93,68,96,1.05,79,29,"良"],
        [29,188,143,197,1.66,99,51,"中度污染"],
        [30,174,131,174,1.55,108,50,"中度污染"],
        [31,187,143,201,1.39,89,53,"中度污染"]
      ];
      //鼠标移上去后出现的提示框
      var schema = [
        {name: 'date', index: 0, text: '日'},
        {name: 'AQIindex', index: 1, text: 'AQI指数'},
        {name: 'PM25', index: 2, text: 'PM2.5'},
        {name: 'PM10', index: 3, text: 'PM10'},
        {name: 'CO', index: 4, text: '一氧化碳（CO）'},
        {name: 'NO2', index: 5, text: '二氧化氮（NO2）'},
        {name: 'SO2', index: 6, text: '二氧化硫（SO2）'}
      ];


      var itemStyle = {
        opacity: 0.8,
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      };

      //xy轴
      const option = {
        backgroundColor: '#404a59',
        color: [
          '#dd4444', '#fec42c', '#80F1BE'
        ],
        legend: {
          top: 10,
          data: ['北京', '上海', '广州'],
          textStyle: {
            color: '#fff',
            fontSize: 16
          }
        },
        grid: {
          left: '10%',
          right: 150,
          top: '18%',
          bottom: '10%'
        },
        tooltip: {
          padding: 10,
          backgroundColor: '#222',
          borderColor: '#777',
          borderWidth: 1,
          formatter: function (obj) {
            var value = obj.value;
            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
              + obj.seriesName + ' ' + value[0] + '日：'
              + value[7]
              + '</div>'
              + schema[1].text + '：' + value[1] + '<br>'
              + schema[2].text + '：' + value[2] + '<br>'
              + schema[3].text + '：' + value[3] + '<br>'
              + schema[4].text + '：' + value[4] + '<br>'
              + schema[5].text + '：' + value[5] + '<br>'
              + schema[6].text + '：' + value[6] + '<br>';
          }
        },
        xAxis: {
          type: 'value',
          name: '日期',
          nameGap: 16,
          nameTextStyle: {
            color: '#fff',
            fontSize: 14
          },
          max: 31,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#eee'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: 'AQI指数',
          nameLocation: 'end',
          nameGap: 20,
          nameTextStyle: {
            color: '#fff',
            fontSize: 16
          },
          axisLine: {
            lineStyle: {
              color: '#eee'
            }
          },
          splitLine: {
            show: false
          }
        },
        visualMap: [
          {
            left: 'right',
            top: '10%',
            dimension: 2,
            min: 0,
            max: 250,
            itemWidth: 30,
            itemHeight: 120,
            calculable: true,
            precision: 0.1,
            text: ['圆形大小：PM2.5'],
            textGap: 30,
            textStyle: {
              color: '#fff'
            },
            inRange: {
              symbolSize: [10, 70]
            },
            outOfRange: {
              symbolSize: [10, 70],
              color: ['rgba(255,255,255,.2)']
            },
            controller: {
              inRange: {
                color: ['#c23531']
              },
              outOfRange: {
                color: ['#444']
              }
            }
          },
          {
            left: 'right',
            bottom: '5%',
            dimension: 6,
            min: 0,
            max: 50,
            itemHeight: 120,

            precision: 0.1,
            text: ['明暗：二氧化硫'],
            textGap: 30,
            textStyle: {
              color: '#fff'
            },
            inRange: {
              colorLightness: [1, 0.5]
            },
            outOfRange: {
              color: ['rgba(255,255,255,.2)']
            },
            controller: {
              inRange: {
                color: ['#c23531']
              },
              outOfRange: {
                color: ['#444']
              }
            }
          }
        ],
        series: [
          {
            name: '北京',
            type: 'scatter',
            itemStyle: itemStyle,
            data: dataBJ
          },
          {
            name: '上海',
            type: 'scatter',
            itemStyle: itemStyle,
            data: dataSH
          },
          {
            name: '广州',
            type: 'scatter',
            itemStyle: itemStyle,
            data: dataGZ
          }
        ]
      };
      // myCharts.setOption(option);
    _this.chart2.setOption(option);
      window.addEventListener('resize', _this.resizeHandler2)
    }
  },
  created () {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  },
  mounted() {
  this.initEchart1()
  this.initEchart2()
  },
  beforeDestroy() {
    // 清理工作 避免内存泄漏
    // 销毁监听事件
    window.removeEventListener('resize', this.resizeHandler)
    // 销毁 Echarts 实例
    this.chart.dispose()
  },
};
</script>

<style scoped>
.myEcharts{
  margin-top: 20px;
}
</style>
<style  scoped>
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 240px;
  line-height: 160px;
  /*background: #fff;*/
  overflow: hidden;
}
.ant-carousel >>> .slick-slide h3 {
  color: #7f8c8d;
}
.center-content{
  margin: auto ;
}
</style>
<style lang="less" scoped>
.extra-wrapper {
  line-height: 55px;
  padding-right: 24px;

.extra-item {
  display: inline-block;
  margin-right: 24px;

a {
  margin-left: 24px;
}
}
}

.antd-pro-pages-dashboard-analysis-twoColLayout {
  position: relative;
  display: flex;
  display: block;
  flex-flow: row wrap;
}

.antd-pro-pages-dashboard-analysis-salesCard {
  height: calc(100% - 24px);
/deep/ .ant-card-head {
  position: relative;
}
}

.dashboard-analysis-iconGroup {
i {
  margin-left: 16px;
  color: rgba(0,0,0,.45);
  cursor: pointer;
  transition: color .32s;
  color: black;
}
}
.analysis-salesTypeRadio {
  position: absolute;
  right: 54px;
  bottom: 12px;
}
</style>


<style lang="less" scoped>
.ant-avatar-lg {
  width: 48px;
  height: 48px;
  line-height: 48px;
}

.list-content-item {
  color: rgba(0, 0, 0, .45);
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  margin-left: 40px;
  span {
    line-height: 20px;
  }
  p {
    margin-top: 4px;
    margin-bottom: 0;
    line-height: 22px;
  }
}
</style>