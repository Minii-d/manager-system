<template>
  <div class="login">
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="loginData"
      :rules="loginFormRules"
      class="login-form"
    >
      <h2 class="login-title">欢迎登录</h2>
      <el-form-item label="账号">
        <el-input v-model="loginData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginData.password" type="password"></el-input>
      </el-form-item>
      <el-row class="btn">
        <el-button type="primary" @click.prevent="login()">登录</el-button>
        <el-button type="info">重置</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: 'right',
      loginData: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    async login() {
      // await 后面的异步操作有结果之后，再之后后面的代码
      const res = await this.$http.post('login', this.loginData)
      // console.log(res)
      const {
        meta: { msg, status }
      } = res.data
      // 登录成功，提示登录成功,并跳转
      if (status === 200) {
        this.$message.success(msg)
        this.$router.push({ name: 'home' })
      } else {
      // 不成功，提示登录失败信息
        this.$message.warning(msg)
      }
    }
  }
}
</script>

<style scoped>
.login {
  background: rgb(80, 131, 173);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  background: #fff;
  width: 450px;
  border-radius: 5px;
  padding: 30px;
}
.login-title {
  text-align: center;
  color: #555;
  margin-bottom: 40px;
}
.btn {
  text-align: center;
}
</style>
