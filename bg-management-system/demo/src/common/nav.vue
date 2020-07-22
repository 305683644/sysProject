<template>
    <div class="con">
        
        <el-row class="tac">
            <el-col :span="24" >
                <el-menu
                    :default-active="defaultActive"
                    class="el-menu-vertical-demo"
                    background-color="#3d5f81"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    router
                    unique-opened
                >
                    <el-menu-item index="/home" class="el-menu-item1">
                        <i class="el-icon-menu"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    
                    <el-submenu v-for='item in getStateMenuList' :key='item.id' :index="item.id.toString()">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span>{{item.title}}</span>
                        </template>
                        <el-menu-item v-for="menu in item.children"  :key='menu.id' :index="menu.url"><i class="ii"></i><span>{{menu.title}}</span></el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
    data() {
        return {
            defaultActive:'/home'
        }
    },
    computed: {
        ...mapGetters(['getStateMenuList'])
    },
    mounted() {
        //组件挂载,更改选中的默认值
        //把路由地址赋值给默认选中状态
        this.defaultActive = this.$route.path
        //页面一加载就调取菜单列表
        this.getActionMenuList()
    },
    methods: {
        ...mapActions(['getActionMenuList'])
    },
}
</script>

<style  lang="" scoped>
.con{
    width: 220px;
    overflow: hidden;
}
.el-menu {
    min-height: 90vh;
}
.ii{
    margin-right: 20px;
}

</style>
