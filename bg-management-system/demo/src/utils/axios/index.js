import http from './axios'

/* ============== 菜单接口  ================== */
//封装一个菜单列表接口
export function getmenuList(params){
    return http.get('/menulist',{
        params
    })   
} 
//封装一个菜单添加接口
export function getmenuAdd(data){
    return http.post('/menuadd',data)   
}
//封装一个菜单获取（一条）接口
export function getmenuInfo(params){
    return http.get('/menuinfo',{
        params
    })   
}
//封装一个菜单修改接口
export function getmenuEdit(data){
    return http.post('/menuedit',data)   
}
//封装一个菜单删除接口
export function getmenuDelete(data){
    return http.post('/menudelete',data)   
}

/* ============== 角色接口  ================== */
//封装一个角色列表接口
export function getroleList(){
    return http.get('/rolelist')   
}
//封装一个角色添加接口
export function getroleAdd(data){
    return http.post('/roleadd',data)   
}
//封装一个角色获取（一条）接口
export function getroleInfo(params){
    return http.get('/roleinfo',{
        params
    })   
}
//封装一个角色修改接口
export function getroleEdit(data){
    return http.post('/roleedit',data)   
}
//封装一个角色删除接口
export function getroleDelete(data){
    return http.post('/roledelete',data)   
}

/* ============== 管理员接口  ================== */
//封装一个管理员列表接口(分页)
export function getuserList(params){
    return http.get('/userlist',{
        params
    })   
}
//封装一个管理员添加接口
export function getuserAdd(data){
    return http.post('/useradd',data)   
}
//封装一个管理员获取（一条）接口
export function getuserInfo(params){
    return http.get('/userinfo',{
        params
    })   
}
//封装一个管理员修改接口
export function getuserEdit(data){
    return http.post('/useredit',data)   
}
//封装一个管理员删除接口
export function getuserDelete(data){
    return http.post('/userdelete',data)   
}

//管理员总数（用于计算分页）
export function getuserCount(){
    return http.get('/usercount')   
}

//管理员登录
export function getuserlogin(data){
    return http.post('/userlogin',data)   
}


/* ============== 商品分类接口  ================== */
//封装一个商品分类列表接口
export function getcateList(params){
    return http.get('/catelist',{
        params
    })   
}
//封装一个商品分类添加接口
export function getcateAdd(data){
    return http.post('/cateadd',data)   
}
//封装一个商品分类获取（一条）接口
export function getcateInfo(params){
    return http.get('/cateinfo',{
        params
    })   
}
//封装一个商品分类修改接口
export function getcateEdit(data){
    return http.post('/cateedit',data)   
}
//封装一个商品分类删除接口
export function getcateDelete(data){
    return http.post('/catedelete',data)   
}

/* ============== 商品规格接口  ================== */
//封装一个商品规格列表接口(分页)
export function getspecsList(params){
    return http.get('/specslist',{
        params
    })   
}
//封装一个商品规格添加接口
export function getspecsAdd(data){
    return http.post('/specsadd',data)   
}
//封装一个商品规格获取（一条）接口
export function getspecsInfo(params){
    return http.get('/specsinfo',{
        params
    })   
}
//封装一个商品规格修改接口
export function getspecsEdit(data){
    return http.post('/specsedit',data)   
}
//封装一个商品规格删除接口
export function getspecsDelete(data){
    return http.post('/specsdelete',data)   
}

//商品规格总数（用于计算分页）
export function getspecsCount(){
    return http.get('/specscount')   
}

/* ============== 商品管理接口  ================== */
//封装一个商品管理列表接口(分页)
export function getgoodsList(params){
    return http.get('/goodslist',{
        params
    })   
}
//封装一个商品管理添加接口
export function getgoodsAdd(data){
    return http.post('/goodsadd',data)   
}
//封装一个商品管理获取（一条）接口
export function getgoodsInfo(params){
    return http.get('/goodsinfo',{
        params
    })   
}
//封装一个商品管理修改接口
export function getgoodsEdit(data){
    return http.post('/goodsedit',data)   
}
//封装一个商品管理删除接口
export function getgoodsDelete(data){
    return http.post('/goodsdelete',data)   
}

//商品管理总数（用于计算分页）
export function getgoodsCount(){
    return http.get('/goodscount')   
}

/* ============== 会员管理接口  ================== */
//封装一个会员管理列表接口
export function getmemberList(){
    return http.get('/memberlist')   
}

//封装一个会员管理获取（一条）接口
export function getmemberInfo(params){
    return http.get('/memberinfo',{
        params
    })   
}
//封装一个会员管理修改接口
export function getmemberEdit(data){
    return http.post('/memberedit',data)   
}

/* ============== 轮播图管理接口  ================== */
//封装一个轮播图管理列表接口
export function getbannerList(){
    return http.get('/bannerlist')   
}
//封装一个轮播图管理添加接口
export function getbannerAdd(data){
    return http.post('/banneradd',data)   
}
//封装一个轮播图管理获取（一条）接口
export function getbannerInfo(params){
    return http.get('/bannerinfo',{
        params
    })   
}
//封装一个轮播图管理修改接口
export function getbannerEdit(data){
    return http.post('/banneredit',data)   
}
//封装一个轮播图管理删除接口
export function getbannerDelete(data){
    return http.post('/bannerdelete',data)   
}


/* ============== 限时秒杀管理接口  ================== */
//封装一个限时秒杀管理列表接口
export function getseckList(){
    return http.get('/secklist')   
}
//封装一个限时秒杀管理添加接口
export function getseckAdd(data){
    return http.post('/seckadd',data)   
}
//封装一个限时秒杀管理获取（一条）接口
export function getseckInfo(params){
    return http.get('/seckinfo',{
        params
    })   
}
//封装一个限时秒杀管理修改接口
export function getseckEdit(data){
    return http.post('/seckedit',data)   
}
//封装一个限时秒杀管理删除接口
export function getseckDelete(data){
    return http.post('/seckdelete',data)   
}

/* ============== 前端接口  ================== */
//封装一个会员注册接口
export function getregisterList(data){
    return http.post('/register',data)   
}