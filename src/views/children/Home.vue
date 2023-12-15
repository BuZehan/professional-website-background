<template>
  <div id="Home">
    <div id="myChart" :style="{ width: '600px', height: '600px' }" style="background-color:#ffffff;"></div>
  </div>
</template>

<script>
import { getShowData, getShowDataForTzgg, getShowDataForHjzs, getShowDataForAlumni ,getShowDataForBanner,getShowDataForTeacher} from "@/api";

export default {
  name: "Home",
  data() {
    return {
      newsData: {
        xwdt: 0,
        tzgg: 0,
        hjzs: 0,
        swiper: 0,
        stuNum: 0,
        teacherNum: 6,
      }
    };
  },
  mounted() {
    this.getShowDatas();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '网络专业宣传网站数据',
          subtext: 'Website data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '网站数据',
            type: 'pie',
            radius: '50%',
            data: [
              { value: this.newsData.xwdt, name: '新闻动态' },
              { value: this.newsData.tzgg, name: '通知公告' },
              { value: this.newsData.hjzs, name: '获奖证书' },
              // { value: this.newsData.swiper, name: '首页轮播图' },
              { value: this.newsData.stuNum, name: '优秀校友' },
              { value: this.newsData.teacherNum, name: '教师数据' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
    },
    // 获取数据
    async getShowDatas() {
      try {
        let res = await Promise.all([getShowData(), getShowDataForTzgg(), getShowDataForHjzs(),getShowDataForBanner(),getShowDataForAlumni(),getShowDataForTeacher()])
        res.forEach(item => {
          let data = item.data.data;
          Object.entries(data).forEach(([key, value]) => {
            this.newsData[key] = value
          })
        })
        this.drawLine()

      } catch (error) {
        console.log(error);
      }
    }

  },
};
</script>

<style scoped lang="less">
#MainView {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
