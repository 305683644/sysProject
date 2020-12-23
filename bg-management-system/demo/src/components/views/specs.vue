<template>
 <div>
    <!-- 面包屑导航 -->
    <breadcrumb></breadcrumb>
    <!-- 按钮 -->
    <el-row>
      <el-button type="primary"  size="middle" plain @click="add">添加</el-button>
    </el-row>
<!-- 表格信息 -->
        <el-table :data="getStateSpecsList" border style="width: 100%" row-key="id">
            <el-table-column prop="id" label="商品规格编号"></el-table-column>
            <el-table-column prop="specsname" label="商品规格名称"></el-table-column>
            <el-table-column prop="attrs" label="商品规格属性">
                <template slot-scope="item">
                    <el-tag v-for="val in item.row.attrs" :key="val" type="info">{{val}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="item">
                    <el-tag v-if="item.row.status==1" type="success">启动</el-tag>
                    <el-tag v-if="item.row.status==2" type="danger">禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="item">
                    <el-button size="small" type="primary" @click="update(item.row.id)">编辑</el-button>
                    <el-button size="small" type="danger" @click="del(item.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--  分页器  -->
        <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pageInfo.size"
            :current-page ='currentPage'
            :total="count"
            @current-change="getPage"
        ></el-pagination>
        <!-- 弹框内容 -->
        <el-dialog
            :title="isAdd ? '商品规格添加':'商品规格编辑'"
            :visible.sync="dialogIsShow"
            center
            :before-close="cancel"
        >
            <el-form :model="specsInfo" :rules="rules" ref="specsInfo">
                <el-form-item label="规格名称：" :label-width="formLabelWidth" prop="specsname">
                    <el-input v-model="specsInfo.specsname"></el-input>
                </el-form-item>
                
                <el-form-item
                    v-for="(item, index) in specsInfo.attrs"
                    label="规格属性:"
                    :key="item.index"
                    :label-width="formLabelWidth"
                    :prop="`attrs[${index}].value`"
                    :rules="{ required: true, message: '请输入商品规格属性', trigger: 'blur' }"
                    
                >
                    <el-input style="width:70%" v-model="item.value"></el-input>
                    <el-button v-if="index==0" type="primary" @click="addSpecs">新增规格</el-button>
                    <el-button v-else type="primary" @click="removeSpecs(item)">删除</el-button>
                </el-form-item>
                <el-form-item label="状态：" :label-width="formLabelWidth">
                    <el-radio v-model="specsInfo.status" label="1">启用</el-radio>
                    <el-radio v-model="specsInfo.status" label="2">禁用</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button v-if="isAdd" type="primary" @click="subInfo('specsInfo')">新 增</el-button>
                <el-button v-else type="primary" @click="subInfo('specsInfo')">更 新</el-button>
            </div>
        </el-dialog>

 </div>
</template>

<script>
//引入商品规格接口
import { getspecsAdd, getspecsInfo,getspecsEdit, getspecsDelete, getspecsCount} from '../../utils/axios'
//调取辅助性函数
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            pageCount:0,
            currentPage:1,
            count: 0, 
            pageInfo: {
                size: 5, 
                page: 1 
            },
            isAdd: true, 
            formLabelWidth: '100px', 
            specsInfo: {
                specsname: '', 
                attrs: [
                    {
                        value: ''
                    }
                ],
                status: '1'
            },
            editId: 0,
            dialogIsShow: false,
            rules: {
                specsname: [
                    {
                        required: true,
                        message: '请输入商品规格名称',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    computed: {
        ...mapGetters(['getStateSpecsList'])
    },
    mounted() {
        this.getCount()
    },
    methods: {
        //添加表单
        addSpecs() {
            //根据产品需求对添加规格属性进行限制,最多添加6个规格
            let arr=this.specsInfo.attrs
            if(arr.length<= 5){
                arr.push({
                    value: ''
                })
                this.specsInfo.attrs = arr
            } else {
                this.$message.warning('最多添加6个规格，不能再多了呦')
            }
        },
        //移除属性
        removeSpecs(item) {
            var index = this.specsInfo.attrs.indexOf(item)
            if (index !== -1) {
                this.specsInfo.attrs.splice(index, 1)
            }
        },
        //关闭弹框事件
        cancel() {
            this.reset()
            this.dialogIsShow = false
        },
        //重置输入内容
        reset() {
            this.specsInfo = {
                specsname: '', 
                attrs: [
                    {
                        value: '',
                    },
                ],
                status: '1'
            }
            
        },
        //封装一个获取商品规格列表事件
        ...mapActions(['getActionSpecsList']),
        //点击添加按钮出现弹框
        add() {
            this.dialogIsShow = true
            this.isAdd = true
        },
        //点击编辑按钮出现弹框并携带数据
        update(id) {
            this.dialogIsShow = true
            this.isAdd = false
            //给编辑id赋值
            this.editId = id
            //调取商品规格查询一条数据
            getspecsInfo({ id }).then(res => {
                console.log(res)
                if (res.data.code == 200) {
                    this.specsInfo = res.data.list[0]
                    console.log(this.specsInfo, '信息')
                    //对数据类型进行转化
                    //映射属性 取出每一个item 并赋值给 specsArr对象中的value
                    let newAttrs = [{ value: '' }]
                    this.specsInfo.attrs.map((item, i) => {
                        if (i == 0) {
                            newAttrs[0].value =item
                            this.specsInfo.attrs = newAttrs
                        } else {
                            this.specsInfo.attrs.push({
                                value: item
                            })
                        }
                    })
                    this.specsInfo.status = this.specsInfo.status.toString()
                }
            })
        },
        //删除事件
        del(id) {
            this.$confirm('你确定要删除这条数据吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    //调取删除逻辑
                    getspecsDelete({ id }).then(res => {
                        console.log(res)
                        if (res.data.code == 200) {
                            //重新调取接口列表
                            
                            this.getCount()
                            if (this.getStateSpecsList.length == 1) {
                                this.pageInfo.page--
                            }
                            
                            this.$message.success(res.data.msg)
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
        },
        //确定添加或者更新事件
        subInfo(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let data = JSON.parse(JSON.stringify(this.specsInfo))
                    //对规格属性数组进行映射 映射成一个新数组 新数组有你的value
                    let arrInfo = data.attrs.map((item) => {
                        return item.value
                    })
                    data.attrs = arrInfo.join(',') 
                    //根据isAdd状态去判断执行接口
                    if (this.isAdd) {
                        //调取添加接口
                        getspecsAdd(data).then(res => {
                            if (res.data.code == 200) {
                                
                                //关闭弹框
                                this.dialogIsShow = false
                                //清空输入框
                                this.reset()
                                 
                                 //添加成功重新查询列表
                                this.getCount()
                                if (this.getStateSpecsList.length == 5) {
                                    this.pageCount++
                                    this.count++
                                } 
                               
                               this.currentPage=this.count
                               this.pageInfo.page=this.pageCount

                                this.$message.success(res.data.msg)
                            } else if (res.data.code == 500) {
                                this.$message.warning(res.data.msg)
                            } else {
                                this.$message.error(res.data.msg)
                            }
                        })
                    } else {
                        
                        data.id = this.editId
                        //调取更新接口
                        getspecsEdit(data).then(res => {
                            if (res.data.code == 200) {
                                //关闭弹框
                                this.dialogIsShow = false
                                //清空输入框
                                this.reset()
                                //添加成功重新查询列表
                                this.getCount()
                                // this.pageInfo.page=this.currentPage
                                this.$message.success(res.data.msg)
                            } else if (res.data.code == 500) {
                                this.$message.warning(res.data.msg)
                            } else {
                                this.$message.error(res.data.msg)
                            }
                        })
                    }
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        //封装获取总条目接口
        getCount() {
            //调取总条数接口
            getspecsCount().then(res => {
                if (res.data.code == 200) {
                    this.count = res.data.list[0].total
                    this.pageCount=Math.ceil(this.count/this.pageInfo.size)

                    //调取获取商品规格接口列表的行动
                    this.$store.dispatch('getActionSpecsList', this.pageInfo)
                }
            })
        },
        
        //当页面发生变化的时候触发该方法
        getPage(n) {
            //n是当前页
            this.pageInfo.page = n
            this.currentPage=n
            
            //重新调取列表页面
            this.$store.dispatch('getActionSpecsList', this.pageInfo)
        }
    }
}
</script>

<style lang="" scoped>
.el-row {
  margin: 15px 0;
}
.el-pagination {
    float: right;
    margin: 16px 0;
}
</style>
