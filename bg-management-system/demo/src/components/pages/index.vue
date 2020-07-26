<template>
  <div>
    <el-container>
      <el-header>XXX大型后台管理系统
        <div class="info">
                    <div class="username">
                        {{getName}}
                    </div>
                    <el-button type='danger' @click='logOut' size='small'>退出</el-button>
        </div>
      </el-header>
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
  },
  computed: {
        getName(){
            let data =''
            data = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : ''
            return data.username
        }
    },
    methods: {
        //退出事件
        logOut(){
            sessionStorage.removeItem('userInfo')
            //跳转到登录页
            this.$router.push('/login')
        }
    },
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
    margin-left -75px
}

.info {
  float: right;
  margin-right: 20px ;
}

.info .username{
  color: #fff ;
  float:left;
  margin-right: 20px;
  margin-top:5px;
}
    
</style>
