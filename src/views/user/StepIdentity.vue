<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;" @submit="handleSubmit">
      <a-form-item
        label="您的身份"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select
          placeholder=""
          v-decorator="['userIdentity', { rules: [{required: true, message: '身份必须选择'}] }]"
          @change="handleUserIdentityChange">
          <a-select-option value="1">企业法人</a-select-option>
          <a-select-option value="2">个体职业者</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        v-show="userIdentity==='1'"
        label="企业类型"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input-group
          style="display: inline-block; vertical-align: middle"
          :compact="true"
        >
          <a-select defaultValue="clothes" style="width: 100px">
            <a-select-option value="clothes">服饰类</a-select-option>
            <a-select-option value="food">食品类</a-select-option>
            <a-select-option value="culture">文创类</a-select-option>
            <a-select-option value="video">影视类</a-select-option>
          </a-select>
          <a-input
            :style="{width: 'calc(100% - 100px)'}"
            v-decorator="['payType', { initialValue: '企业名称', rules: [{required: false, message: '请填写您的企业名称'}]}]"
          />
        </a-input-group>
      </a-form-item>
      <a-form-item
        v-show="userIdentity==='2'"
        label="您的职业"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select
          placeholder=""
          v-decorator="['profession', { rules: [{required: false, message: '职业必须选择'}] }]"
          @change="handleProfessionChange">
          <a-select-option value="1">厨师</a-select-option>
          <a-select-option value="2">音乐人</a-select-option>
          <a-select-option value="3">警察</a-select-option>
          <a-select-option value="4">学生</a-select-option>
          <a-select-option value="5">老师</a-select-option>
          <a-select-option value="6">建筑师</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="真实姓名"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['name', { initialValue: '李四', rules: [{required: true, message: '姓名必须核对'}] }]"/>
      </a-form-item>
      <a-form-item
        label="月交易额"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input prefix="￥" v-decorator="['momey', { initialValue: '5000', rules: [{required: true, message: '转账金额必须填写'}] }]"/>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button type="primary" @click="nextStep">下一步</a-button>
      </a-form-item>
    </a-form>
    <a-divider />
    <div class="step-form-style-desc">
      <h3>说明</h3>
      <h4>选择您关注的兴趣点</h4>
      <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StepIdentity',
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      userIdentity: '0'
    }
  },
  methods: {
    nextStep () {
      // this.$emit('nextStep')
      const { form: { validateFields } } = this
      // 先校验，通过表单校验后，才进入下一步
      validateFields((err, values) => {
        if (!err) {
          this.$emit('nextStep')
        }
      })
    },
    handleSubmit (e) {
      console.log(e)
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    handleUserIdentityChange (value) {
      this.userIdentity = value
      console.log(this.userIdentity)
    },
    handleProfessionChange () {

    }
  }
}
</script>

<style lang="less" scoped>
.step-form-style-desc {
  padding: 0 56px;
  color: rgba(0,0,0,.45);

  h3 {
    margin: 0 0 12px;
    color: rgba(0,0,0,.45);
    font-size: 16px;
    line-height: 32px;
  }

  h4 {
    margin: 0 0 4px;
    color: rgba(0,0,0,.45);
    font-size: 14px;
    line-height: 22px;
  }

  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
}
</style>
