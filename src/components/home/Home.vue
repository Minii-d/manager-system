<template>
  <div class="home">
    <el-container class="home-container">
      <el-header class="home-header">
        <h3>
          <i><img src="../../assets/logo.png" alt="logo" class="logo"/></i>
          后台管理系统
        </h3>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="240px" class="home-aside">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened="true"
          >
            <!-- 1 -->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="1-1">
                <i class="el-icon-location"></i>
                <span>用户列表</span>
              </el-menu-item>
            </el-submenu>
            <!-- 2 -->
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item index="1-1">
                <i class="el-icon-location"></i>
                <span>角色列表</span>
              </el-menu-item>
              <el-menu-item index="1-1">
                <i class="el-icon-location"></i>
                <span>权限列表</span>
              </el-menu-item>
            </el-submenu>
            <!-- 3   -->
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item index="1-1">
                <i class="el-icon-location"></i>
                <span>商品列表</span>
              </el-menu-item>
              <el-menu-item index="1-1">
                <i class="el-icon-location"></i>
                <span>分类列表</span>
              </el-menu-item>
              <el-menu-item index="1-1">
                <i class="el-icon-location"></i>
                <span>商品分类</span>
              </el-menu-item>
            </el-submenu>
            <!-- 4 -->
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item index="1-1">
                <i class="el-icon-location"></i>
                <span>订单列表</span>
              </el-menu-item>
            </el-submenu>
            <!-- 5 -->
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>数据统计</span>
              </template>
              <el-menu-item index="1-1">
                <i class="el-icon-location"></i>
                <span>数据列表</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="home-main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    logout() {}
  }
}
</script>

<style scoped lang="less">
.home,
.home-container {
  height: 100%;
}
.home-header,
.home-aside {
  background: #333744;
  color: #fff;
}
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    width: 40px;
    vertical-align: middle;
  }
}
.home-aside {
  background: #333744;
  .el-menu-vertical-demo {
    width: 100%;
  }
}
</style>
