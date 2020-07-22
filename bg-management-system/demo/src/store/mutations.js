export default {
    reqMenuList(state,payload){
        state.menuList=payload
    },
    reqRoleList(state,payload){
        state.roleList = payload
    },
    reqUserList(state,payload){
        state.userList = payload
    },
    reqCateList(state,payload){
        state.cateList = payload
    },
    reqSpecsList(state,payload){
        state.specsList=payload
    },
    reqMemberList(state,payload){
        state.memberList = payload
    },
    reqBannerList(state,payload){
        state.bannerList = payload
    },
    reqSeckList(state,payload){
        state.seckList = payload
    },
    reqGoodsList(state,payload){
        state.goodsList = payload
    }
}