<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-card class="box-card">
      <el-input
        placeholder="请输入内容"
        v-model="queryInfo.query"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="primary">添加用户</el-button>
    </el-card>
    <!-- 列表 -->
    <el-table :data="userList" stripe style="width: 100%">
      <el-table-column type="index" width="50" label="序号"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="80">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
      <el-table-column prop="mobile" label="电话" width="150">
      </el-table-column>
      <el-table-column prop="role_name" label="角色" width="120">
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="120">
      </el-table-column>
      <el-table-column prop="mg_state" label="状态"> </el-table-column>
      <el-table-column prop="oprator" label="操作"> </el-table-column>
    </el-table>
    <!-- 分页 -->
  </div>
</template>

// id: (...) // username: (...) // email: (...) // mobile: (...) // role_name:
(...) // create_time: (...) // mg_state: (...)
<script>
export default {
  data() {
    return {
      // 需要渲染的列表数据
      userList: [],
      // 发送请求时需要的参数
      // | query    | 查询参数     | 可以为空 |
      // | pagenum  | 当前页码     | 不能为空 |
      // | pagesize | 每页显示条数 | 不能为空 |
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 3
      },
      // 分页相关数据
      pagenation: {
        total: -1,
        pagenum: 1,
        pagesize: 4
      }
    }
  },
  mounted() {
    //  页面加载，渲染数据
    this.getUserList()
  },
  methods: {
    //  请求数据
    async getUserList() {
      // 该项目接口文档要求除了登录之外，需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
      // 先拿到token令牌
      const AUTH_TOKEN = sessionStorage.getItem('token')
      // 通过axios设置请求头的方法，将token携带上
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN

      const res = await this.$http.get(
        `users?query=${this.queryInfo.query}&pagenum=${this.queryInfo.pagenum}&pagesize=${this.queryInfo.pagesize}`
      )
      console.log(res)
      const {
        data: { total, pagenum, users },
        meta: { msg, status }
      } = res.data
      if (status === 200) {
        // 将请求到的数据存到data中
        this.userList = users
        this.pagenation.total = total
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.users {
  .breadcrumb {
    margin-bottom: 20px;
  }
  .box-card {
    .input-with-select {
      width: 300px;
      margin-right: 20px;
    }
  }
}
</style>
