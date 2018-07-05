<template lang="html">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="line-height: 36px;">登录</span>
    </div>
    <el-form label-width="100px" class="demo-loginForm" v-bind:rules="rule" ref="LoginForm" v-bind:model="LoginForm">
      <el-form-item label="电话号码" prop="tel">
        <el-input 
            type="text"
            v-model="LoginForm.tel"
            placeholder="电话号码">
            </el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="codeNum">
        <el-input
                v-model="LoginForm.codeNum"
                class="codeNum"
                placeholder="验证码"
            >
            </el-input>
            <el-button 
                class="getCode" 
                type="primary"
                @click.native.prevent="getCodeNum"
                >
                获取验证码
            </el-button>    
      </el-form-item>
      <el-form-item>
        <!-- 点击进行登录提交 -->
        <el-button type="primary" v-on:click="handleSubmit">登录</el-button>
        <!-- 点击重置表单 -->
        <el-button v-on:click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
let _this
export default {
  // 进入路由时判断当前登录状态，已登录则跳转到首页
  beforeRouteEnter (to, from, next) {
    next(VM => {
      if (VM.$AV.User.current()) {
        console.log('当前登录')
        VM.$router.push('/')
      } else {
        console.log('当前未登录')
      }
    })
  },
  data () {
    let telCheck = (rule, value, callback) => {
      if (!(/^1[0-9]{10}$/.test(value))) {
        return callback(new Error('请输入正确格式的电话号码'))
      } else if (value.toString().length !== 11) {
        return callback(new Error('电话号码必须是11位数字'))
      } else {
        callback()
      }
    }
    let codeNumCheck = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('验证码是必须的'))
      } else if (!(/^[0-9]*$/.test(value))) {
        return callback(new Error('验证码必须是数字'))
      } else {
        callback()
      }
    }
    return {
      LoginForm: {
        tel: '',
        codeNum: ''
      },
      rule: {
        tel: [
          {
            required: true,
            validator: telCheck,
            trigger: 'blur'
          }
        ],
        codeNum: [
          {
            required: true,
            validator: codeNumCheck,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 表单提交
    handleSubmit () {
      // 验证表单
      this.$refs.LoginForm.validate(valid => {
        if (valid) {
          // 调用SDK登录方法，执行登录过程
          _this = this
          this.$AV.User.signUpOrlogInWithMobilePhone(this.LoginForm.tel, this.LoginForm.codeNum).then(function (loginedUser) {
            console.log(loginedUser)
            _this.$message('登录成功')
            // 登录成功跳转到首页
            _this.$router.push('/')
          }, function (error) {
            console.log(error)
            _this.$message('登录失败')
            // 登录失败清空表单
            _this.handleReset()
          })
        } else {
          console.log('验证不通过')
        }
      })
    },
    // 重置表单
    handleReset () {
      this.$refs.LoginForm.resetFields()
    },
    getCodeNum () {
      _this = this
      console.log(this.LoginForm.tel)
      if (this.LoginForm.tel !== '') {
        this.$AV.Cloud.requestSmsCode(this.LoginForm.tel).then(function (success) {
          _this.$message('短信验证码发送成功，请注意查收')
        }, function (_error) {
          _this.$message.error('验证码发送失败，请重新尝试')
        })
      } else {
        _this.$message.error('手机号为空')
      }
    }
  }
}
</script>

<style lang="css">
</style>
