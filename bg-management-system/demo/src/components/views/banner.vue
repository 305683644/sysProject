<template>
 <div>
    <!-- 面包屑导航 -->
    <breadcrumb></breadcrumb>
    <!-- 按钮 -->
    <el-row>
      <el-button type="primary"  size="middle" plain @click="add">添加</el-button>
    </el-row>
<!-- 表格信息 -->
        <el-table
            :data="getStateBannerList"
            border
            style="width: 100%"
            row-key="id"
            :tree-props="{children: 'children'}"
        >
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="img" label="图片">
                <template slot-scope="item">
                    <img class="imgInfo" :src="$imgUrl+item.row.img" alt />
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
        <!-- 弹框内容 -->
        <el-dialog
            :title="isAdd ? '添加轮播图':'编辑轮播图'"
            :visible.sync="dialogIsShow"
            center
            :before-close="cancel"
        >
            <el-form :model="bannerInfo" :rules="rules" ref="bannerInfo">
                
                <el-form-item label="标题：" :label-width="formLabelWidth" prop="title">
                    <el-input v-model="bannerInfo.title"></el-input>
                </el-form-item>
                <el-form-item label="图片：" :label-width="formLabelWidth">
                    <!-- 
                        上传图片
                        auto-upload	是否在选取文件后立即进行上传
                        action	必选参数，上传的地址
                    -->
                    <el-upload
                        action="#"
                        list-type="picture-card"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :auto-upload="false"
                        :on-change="changeInfo"
                        :limit='1'
                        :on-exceed="handleExceed"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt />
                    </el-dialog>
                </el-form-item>
                <el-form-item label="状态：" :label-width="formLabelWidth">
                    <el-radio v-model="bannerInfo.status" label="1">启用</el-radio>
                    <el-radio v-model="bannerInfo.status" label="2">禁用</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button v-if="isAdd" type="primary" @click="subInfo('bannerInfo')">新 增</el-button>
                <el-button v-else type="primary" @click="subInfo('bannerInfo')">更 新</el-button>
            </div>
        </el-dialog>
    
 </div>
</template>

<script>
import {
    getbannerAdd,
    getbannerInfo,
    getbannerEdit,
    getbannerDelete
} from '../../utils/axios'
//调取辅助性函数
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            fileList: [], //文件上传列表
            dialogImageUrl: '', //显示图片
            dialogVisible: false, //开启图片的弹框
            imgUrl: '', //上传之后的图片地址
            isAdd: true, //添加
            formLabelWidth: '100px', //label宽度
            bannerInfo: {
                title: '', //分类名称
                img: '', //图片
                status: '1'
            },
            editId: 0, //修改id
            dialogIsShow: false, //是否出现弹框
            rules: {
                title: [
                    {
                        required: true,
                        message: '请输入分类名称',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    computed: {
        ...mapGetters(['getStateBannerList'])
    },
    mounted() {
        //组件一加载就调取分类接口
        //触发才调取vuex中的分类列表
        this.getActionBannerList()
    },
    methods: {
        //当文件个数被限制时触发的函数
        handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
        //移除图片
        handleRemove(file, fileList) {
            this.fileList=[]
            this.imgUrl =''
        },
        //放大图片
        handlePreview(file) {
            //图片地址
            this.dialogImageUrl = file.url

            this.dialogVisible = true
        },
        changeInfo(file, fileList) {
          
            this.imgUrl = file.raw
          
        },
        //关闭弹框事件
        cancel() {
            this.reset()
            this.dialogIsShow = false
        },
        //重置输入内容
        reset() {
            this.imgUrl='',
            this.fileList = [], //上传文件列表
            this.bannerInfo = {
                    title: '', //分类名称
                    img: '', //图片
                    status: '1'
                }
        },
        //封装一个获取分类列表事件
        ...mapActions(['getActionBannerList']),
        //点击添加按钮出现弹框
        add() {
            //出现弹框
            this.dialogIsShow = true
            this.isAdd = true
        },
        //点击编辑按钮出现弹框并携带数据
        update(id) {
            this.dialogIsShow = true
            this.isAdd = false
            //给编辑id赋值
            this.editId = id
            //调取分类查询一条数据
            getbannerInfo({ id }).then(res => {
                if (res.data.code == 200) {
                    console.log(res)
                    this.bannerInfo = res.data.list
                    //对获取的图片进行格式转化
                    this.fileList = this.bannerInfo.img ? [{url:`${this.$imgUrl}${this.bannerInfo.img}`}] :[]
                    this.bannerInfo.status = this.bannerInfo.status.toString()
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
                    getbannerDelete({ id }).then(res => {
                        if (res.data.code == 200) {
                            //重新调取接口列表
                            this.getActionBannerList()
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
                    let data = this.bannerInfo
                    //如果有上传文件 那我们不能直接传值 需要利用FormData转化
                    let file = new FormData()
                    for (let i in data) {
                        file.append(i, data[i])
                    }
                    
                    //根据isAdd状态去判断执行接口
                    if (this.isAdd) {
                        //单独对图片地址进行操作
                    file.append('img', this.imgUrl)
                        //调取添加接口
                        getbannerAdd(file).then(res => {
                            if (res.data.code == 200) {
                                //关闭弹框
                                this.dialogIsShow = false
                                //清空输入框
                                this.reset()
                                //添加成功重新查询列表
                                this.getActionBannerList()
                                this.$message.success(res.data.msg)
                            } else if (res.data.code == 500) {
                                this.$message.warning(res.data.msg)
                            } else {
                                this.$message.error(res.data.msg)
                            }
                        })
                    } else {
                        file.append('id',this.editId)
                        //如果图片未修改 沿用上次图片地址 如果图片被修改使用新图片地址
                        if(this.imgUrl=='' && this.fileList.length==0){
                          this.imgUrl==''
                        }else{
                          this.imgUrl  = this.imgUrl ?this.imgUrl : this.cateInfo.img
                        }
                        
                        
                        
                        file.append('img', this.imgUrl)
                        
                        //调取更新接口
                        getbannerEdit(file).then(res => {
                            if (res.data.code == 200) {
                                console.log(res)
                                //关闭弹框
                                this.dialogIsShow = false
                                
                                // 清空输入框
                                this.reset()
                                //添加成功重新查询列表
                                this.getActionBannerList()
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
        }
    }
}
</script>

<style lang="" scoped>
.el-row {
  margin: 15px 0;
}
.imgInfo {
    width: 180px;
}
</style>
