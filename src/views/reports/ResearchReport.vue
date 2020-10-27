<template>
  <page-header-wrapper >

    <template v-slot:content>
      <div class="ant-pro-page-header-search">
        <a-input-search size="large" icon="search" style="width: 80%; max-width: 522px;"  @search="Onsearch">
          <template v-slot:enterButton>
            搜索
          </template>
        </a-input-search>
      </div>
    </template>

<!--    <div v-show="isSearched">-->
    <!--    预测曲线部分，两个-->
    <div class="antd-pro-pages-dashboard-analysis-twoColLayout" :class="!isMobile && 'desktop'">
      <a-row :gutter="24" type="flex" :style="{ marginTop: '24px' }">
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <div class="myEcharts" id="myCharts" ref="myCharts" style="height: 50vh"></div>
        </a-col>
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <div class="myEcharts2" id="myCharts2" ref="myCharts2" style="height: 50vh"></div>
        </a-col>
      </a-row>
    </div>

    <a-card title="往期数据">
      <a-table
        :row-key="record => record.kw_id"
        :columns="columns"
        :data-source="staticTabledata"
        :loading="loading"
        :alert="true"
        @change="handleTableChange"
        showPagination="auto"
        bordered
      >
      </a-table>
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
<!--    </div>-->

<!--    <a-empty :description="false" v-show="!isSearched"/>-->

  </page-header-wrapper>
</template>

<script>
import { baseMixin } from '@/store/app-mixin'
import echarts from 'echarts'
import { TagSelect, StandardFormRow, ArticleListContent } from '@/components'
import IconText from './components/IconText'
const TagSelectOption = TagSelect.Option
const columns = [
  {
    title: '时间',
    dataIndex: 'time',
    align: 'center',
    customRender: (text) => text
  },
  {
    title: '圈子',
    dataIndex: 'name',
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
const staticTabledata=[
  {
    key:'1',
    time:'2020/1',
    name:'JK',
    sale_amount:'241403',
    sale_amount_growth:'80%',
    sale_money:'3342434',
    sale_money_growth:'32.3%'
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
  components:{
    TagSelect,
    TagSelectOption,
    StandardFormRow,
    loading: true,
    loadingMore: false,
    ArticleListContent,
    IconText
  },
  mixins: [baseMixin],
  name: 'ResearchReport',
  data () {
    this.columns = columns
    this.staticTabledata=staticTabledata;
    return {
      isSearched:false,
      data: [],
      loading: false,
      selectedRowKeys: [],
      selectedRows: [],
      chart:null,
      chart2:null,
      staticData,//静态的合作信息
    }
  },
  mounted() {
    this.initEcharts1();
    this.initEcharts2();
  },
  beforeDestroy() { // 清理工作 避免内存泄漏
    // 销毁监听事件
    window.removeEventListener('resize', this.resizeHandler)
    window.removeEventListener('resize',this.resizeHandler2)
    // 销毁 Echarts 实例
    this.chart.dispose()
    this.chart2.dispose()
  },
  methods: {
    Onsearch(){
      console.log('点击搜索')
      this.isSearched=true
    },
    // Echarts 的 resize 方法
    resizeHandler() {
      this.chart.resize()
    },
    // Echarts 的 resize 方法
    resizeHandler2() {
      this.chart2.resize()
    },
    handleTableChange () {
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    initEcharts1(){
      const _this = this
      _this.chart = echarts.init(this.$refs.myCharts);

      const data = [['2000-06-05', 116], ['2000-06-06', 129], ['2000-06-07', 135], ['2000-06-08', 86], ['2000-06-09', 73], ['2000-06-10', 85], ['2000-06-11', 73], ['2000-06-12', 68], ['2000-06-13', 92], ['2000-06-14', 130], ['2000-06-15', 245], ['2000-06-16', 139], ['2000-06-17', 115], ['2000-06-18', 111], ['2000-06-19', 309], ['2000-06-20', 206], ['2000-06-21', 137], ['2000-06-22', 128], ['2000-06-23', 85], ['2000-06-24', 94], ['2000-06-25', 71], ['2000-06-26', 106], ['2000-06-27', 84], ['2000-06-28', 93], ['2000-06-29', 85], ['2000-06-30', 73], ['2000-07-01', 83], ['2000-07-02', 125], ['2000-07-03', 107], ['2000-07-04', 82], ['2000-07-05', 44], ['2000-07-06', 72], ['2000-07-07', 106], ['2000-07-08', 107], ['2000-07-09', 66], ['2000-07-10', 91], ['2000-07-11', 92], ['2000-07-12', 113], ['2000-07-13', 107], ['2000-07-14', 131], ['2000-07-15', 111], ['2000-07-16', 64], ['2000-07-17', 69], ['2000-07-18', 88], ['2000-07-19', 77], ['2000-07-20', 83], ['2000-07-21', 111], ['2000-07-22', 57], ['2000-07-23', 55], ['2000-07-24', 60]];

      var dateList = data.map(function (item) {
        return item[0];
      });
      var valueList = data.map(function (item) {
        return item[1];
      });

      const options = {

        // Make gradient line here
        visualMap: [{
          show: false,
          type: 'continuous',
          seriesIndex: 0,
          min: 0,
          max: 400
        }, {
          show: false,
          type: 'continuous',
          seriesIndex: 1,
          dimension: 0,
          min: 0,
          max: dateList.length - 1
        }],


        title: [{
          left: 'center',
          text: '销售额预测'
        }, {
          top: '55%',
          left: 'center',
          text: '销售量预测'
        }],
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [{
          data: dateList
        }, {
          data: dateList,
          gridIndex: 1
        }],
        yAxis: [{
          splitLine: {show: false}
        }, {
          splitLine: {show: false},
          gridIndex: 1
        }],
        grid: [{
          bottom: '60%'
        }, {
          top: '60%'
        }],
        series: [{
          type: 'line',
          showSymbol: false,
          data: valueList
        },
          {
          type: 'line',
          showSymbol: false,
          data: valueList,
          xAxisIndex: 1,
          yAxisIndex: 1
        }]
      };

      _this.chart.setOption(options)
      window.addEventListener('resize',_this.resizeHandler)
    },
    initEcharts2(){
      const _this = this
      _this.chart2 = echarts.init(this.$refs.myCharts2);
      const options = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        legend: {
          data: ['市场份额', '同比增长', '增长率']
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '市场占比',
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
              formatter: '{value} %'

            }
          },
          {
            type: 'value',
            name: '增长比',
            min: 0,
            max: 100,
            interval: 10,
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: '市场份额',
            type: 'bar',
            data: [20.0, 24.9, 27.0, 32.2, 36.6, 40.7, 36.6, 45.2, 50.6, 46.0, 45.4, 47.3]
          },
          {
            name: '同比增长',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3]
          },
          {
            name: '增长率',
            type: 'line',
            yAxisIndex: 0,
            data: [20.0, 20.2, 30.3, 40.5, 60.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 60.2]
          }
        ]
      };
      _this.chart2.setOption(options)
      window.addEventListener('resize',_this.resizeHandler2)
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