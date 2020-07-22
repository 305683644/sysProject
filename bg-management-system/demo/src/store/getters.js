export default {
    //菜单
    getStateMenuList(state){
        return state.menuList
    },
    //角色
    getStateRoleList(state){
        return state.roleList
    },
    //管理员
    getStateUserList(state){
        return state.userList
    },
    //商品分类
    getStateCateList(state){
        return state.cateList
    },
    //商品规格
    getStateSpecsList(state){
        return state.specsList
    },
    //会员管理
    getStateMemberList(state){
        return state.memberList
    },
    //轮播图管理
    getStateBannerList(state){
        return state.bannerList
    },
    //限时秒杀管理
    getStateSeckList(state){
        return state.seckList
    },
    //商品列表
    getStateGoodsList(state){
        return state.goodsList
    }
}