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
        clearable
        @clear="clear"
        placeholder="请输入内容"
        v-model="queryInfo.query"
        class="input-with-select"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchUser"
        ></el-button>
      </el-input>
      <el-button type="primary" @click="showAddUser">添加用户</el-button>
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="addUserForm">
        <el-form-item label="用户名" label-width="100px">
          <el-input
            v-model="addUserForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input
            v-model="addUserForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="addUserForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="100px">
          <el-input v-model="addUserForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 列表 -->
    <!-- 数据源userList -->
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
        <!-- 格式化时间过滤器，需要使用template，通过slot-scope传值，scoped就代表userList为数据源，自带的row属性,代表userList中的每个元素，在通过每个元素找到对应的数据 -->
        <!-- users的数据 id: (...) role_name: (...) username: (...) create_time:
        1486720211 mobile: (...) email: (...) mg_state: (...) -->
        <template slot-scope="scope">
          {{ scope.row.create_time | formatTime }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <!-- 操作  -->
      <el-table-column prop="oprator" label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              plain
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              plain
              size="mini"
              @click="showDeleteMsgBox(scope.row.id)"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-check"
              circle
              plain
              size="mini"
            ></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[3, 6, 9, 12]"
      :page-size="3"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="pagination"
    >
    </el-pagination>
  </div>
</template>

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
      total: -1,
      // 状态switch开关
      value: true,
      // 对话框是否显示
      dialogFormVisibleAdd: false,
      // 对话框输入框中数据
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    }
  },
  mounted() {
    //  页面加载，渲染数据
    this.getUserList()
  },
  methods: {
    //  请求数据--------------------------------
    async getUserList() {
      // 该项目接口文档要求除了登录之外，需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
      // 先拿到token令牌
      const AUTH_TOKEN = sessionStorage.getItem('token')
      // 通过axios设置请求头的方法，将token携带上
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN

      const res = await this.$http.get(
        `users?query=${this.queryInfo.query}&pagenum=${this.queryInfo.pagenum}&pagesize=${this.queryInfo.pagesize}`
      )
      console.log('getUserList请求数据：', res.data)
      const {
        data: { total, users },
        meta: { msg, status }
      } = res.data
      if (status === 200) {
        // 将请求到的数据存到data中
        this.userList = users
        this.total = total
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    },

    // 分页相关功能------------------------------
    // 当每页条数改变时触发，更新pagesize，重新请求数据
    handleSizeChange(pagesize) {
      console.log(`每页 ${pagesize} 条`)
      this.queryInfo.pagesize = pagesize
      // 每次切换每页条数时，都是从第1条开始显示
      this.queryInfo.pagenum = 1
      this.getUserList()
    },
    // 当前页改变时触发，更新pagenum，重新请求数据
    handleCurrentChange(pagenum) {
      console.log(`当前页: ${pagenum}`)
      this.queryInfo.pagenum = pagenum
      this.getUserList()
    },

    // 搜索功能---------------------------------------
    // 根据query参数搜索，query已经双向绑定，改变后会自动更新，此处不用再做其他处理
    searchUser() {
      this.getUserList()
    },
    // 属性框清除事件
    clear() {
      this.getUserList()
    },

    // 添加用户事件------------------------------------------
    // 点击添加用户按钮，显示对话框；点击取消，对话框隐藏；点击确定，对话框隐藏；同时添加数据的请求
    showAddUser() {
      this.dialogFormVisibleAdd = true
    },
    async addUser() {
      // 无论添加取消都关闭对话框
      this.dialogFormVisibleAdd = false
      const res = await this.$http.post('users', this.addUserForm)
      const {
        meta: { msg, status }
      } = res.data
      if (status === 201) {
        this.getUserList()
        this.$message.success(msg)
        this.addUserForm = {}
      } else {
        this.$message.warning(msg)
      }
    },

    // 删除功能
    showDeleteMsgBox(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 成功时发请求
          const res = await this.$http.delete(`users/${id}`)
          const {
            meta: { msg, status }
          } = res.data
          // 请求成功时操作
          if (status === 200) {
            this.$message({
              type: 'success',
              message: msg
            })
            this.queryInfo.pagenum = 1
            this.getUserList()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.users {
  background: #fff;
  height: 100%;
  .breadcrumb {
    padding: 20px;
    background: #eaedf1;
  }
  .box-card {
    border: none;
    box-shadow: none;
    .input-with-select {
      width: 300px;
      margin-right: 20px;
    }
  }
  .pagination {
    padding: 30px;
  }
}
</style>
