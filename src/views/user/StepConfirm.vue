<template>
  <div>
    <a-form>
      <a-result title="注册成功" :is-success="true" sub-title="开始探索您感兴趣的新兴产业吧" style="max-width: 560px; margin: 40px auto 0;">
        <div class="information">
          <a-row>
            <a-col :sm="8" :xs="24">邮箱</a-col>
            <a-col :sm="16" :xs="24">{{email}}</a-col>
          </a-row>
          <a-row>
            <a-col :sm="8" :xs="24">姓名</a-col>
            <a-col :sm="16" :xs="24">{{ name }}</a-col>
          </a-row>
          <a-row>
            <a-col :sm="8" :xs="24">身份</a-col>
            <a-col :sm="16" :xs="24">{{identity}}</a-col>
          </a-row>
          <!--
          <a-row>
            <a-col :sm="8" :xs="24">转账金额：</a-col>
            <a-col :sm="16" :xs="24"><span class="money">500</span> 元</a-col>
          </a-row>
          !-->
        </div>
        <template #extra>
          <a-button type="primary" @click="finish">登录</a-button>
          <a-button style="margin-left: 8px" @click="toOrderList">查看个人信息</a-button>
        </template>
      </a-result>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'StepConfirm',
  data () {
    return {
      loading: false,
      email: '123@pp.com',
      name: 'lqy',
      identity: 'c'
    }
  },
  methods: {
    finish () {
      this.$emit('finish')
    },
    toOrderList () {
      //修改为查看个人信息
      this.$router.push('/account/center')
    }
  }
}
</script>
<style lang="less" scoped>
.information {
  line-height: 22px;

  .ant-row:not(:last-child) {
    margin-bottom: 24px;
  }
}
.money {
  font-family: "Helvetica Neue",sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 14px;
}
</style>
