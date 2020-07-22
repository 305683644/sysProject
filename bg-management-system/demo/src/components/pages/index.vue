<template>
  <div>
    <el-container>
      <el-header>XXX大型后台管理系统</el-header>
      <el-container>
        <el-aside>
          <v-nav></v-nav>
        </el-aside>
        <el-main>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vNav from "../../common/nav";
export default {
  data() {
    return {};
  },
  components: {
    vNav
  }
};
</script>

<style lang="stylus" scoped>
@import '../../stylus/index.styl';

.el-header {
  background-color: $bgColorFirst;
  color: $bgColorWhite;
  padding-top: 15px;
}


.el-main{
    margin-left -75px}
</style>
