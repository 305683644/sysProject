<template>
 <div>
    <!-- 面包屑导航 -->
    <breadcrumb></breadcrumb>
    <!-- <el-row>
      <el-button type="primary"  size="middle" plain @click="add">添加</el-button>
    </el-row> -->
    <!-- 表格信息 -->
        <el-table :data="getStateMemberList" border style="width: 100%" row-key="id">
            <el-table-column prop="uid" label="用户编号"></el-table-column>
            <el-table-column prop="nickname" label="昵称"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="item">
                    <el-tag v-if="item.row.status==1" type="success">启动</el-tag>
                    <el-tag v-if="item.row.status==2" type="danger">禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="item">
                    <el-button size="small" type="primary" @click="update(item.row.uid)">编辑</el-button>
                    <!-- <el-button size="small" type="danger" @click="del(item.row.uid)">删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        
        <!-- 弹框内容 -->
        <el-dialog
            :title="isAdd ? '添加会员':'会员管理'"
            :visible.sync="dialogIsShow"
            center
            :before-close="cancel"
        >
            <el-form :model="memberInfo" :rules="rules" ref="memberInfo">
                
                <el-form-item label="手机号：" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="memberInfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="昵称：" :label-width="formLabelWidth" prop="nickname">
                    <el-input v-model="memberInfo.nickname"></el-input>
                </el-form-item>
                <el-form-item label="密码：" :label-width="formLabelWidth" prop="password">
                    <el-input v-model="memberInfo.password"></el-input>
                    留空则不修改
                </el-form-item>
                <el-form-item label="状态：" :label-width="formLabelWidth">
                    <el-radio v-model="memberInfo.status" label="1">启用</el-radio>
                    <el-radio v-model="memberInfo.status" label="2">禁用</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button v-if="isAdd" type="primary" @click="subInfo('memberInfo')">新 增</el-button>
                <el-button v-else type="primary" @click="subInfo('memberInfo')">修改</el-button>
            </div>
        </el-dialog>
    
 </div>
</template>

<script>
//引入用户接口
import {getmemberInfo,getmemberEdit} from '../../utils/axios'
//调取辅助性函数
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            
            isAdd: true, //添加
            formLabelWidth: '100px', //label宽度
            memberInfo: {
                nickname: '', //用户名称
                phone: '', //角色编号
                password: '', //密码
                status: '1'
            },
            editId: 0,
            dialogIsShow: false, //是否出现弹框
            rules: {
                nickname: [
                    {
                        required: true,
                        message: '请输入昵称',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 6,
                        message: '长度在 2 到 6 个字符',
                        trigger: 'blur'
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: '请输入手机号',
                        trigger: 'blur'
                    },
                    {
                        min: 11,
                        max: 11,
                        message: '长度在 11个字符',
                        trigger: 'blur'
                    }
                ]
            },
            // data:[
            //   {
            //     uid:'122222222',
            //     nickname: '11', //用户名称
            //     phone: '15100063342', //角色编号
            //     password: '123456', //密码
            //     status: '1'
            //   }
            // ]
        }
    },
    computed: {
        ...mapGetters(['getStateMemberList'])
        
    },
    mounted() {
        //组件一加载就调取用户接口
        //触发才调取vuex中的用户列表
        this.getActionMemberList()
    },
    methods: {
      add() {
            //出现弹框
            this.dialogIsShow = true
            this.isAdd = true
        },
        //关闭弹框事件
        cancel() {
            this.reset()
            this.dialogIsShow = false
        },
        //重置输入内容
        reset() {
            this.memberInfo = {
                nickname: '', //用户名称
                phone: '', //角色编号
                password: '', //密码
                status: '1'
            }
        },
        //封装一个获取用户列表事件
        ...mapActions(['getActionMemberList']),
        //点击编辑按钮出现弹框并携带数据
        update(uid) {
            this.dialogIsShow = true
            this.isAdd = false
            //给编辑id赋值
            this.editId = uid
            //调取用户查询一条数据
            getmemberInfo({ uid }).then(res => {
                if (res.data.code == 200) {
                    this.memberInfo = res.data.list
                    this.memberInfo.status = this.memberInfo.status.toString()
                }
            })
        },
        //删除事件
        // del(uid) {
        //     this.$confirm('你确定要删除这条数据吗', '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //     })
        //         .then(() => {
        //             //调取删除逻辑
        //             getmemberDelete({ uid }).then(res => {
        //                 if (res.data.code == 200) {
        //                     //重新调取接口列表
        //                     this.getActionMemberList()
        //                     this.$message.success(res.data.msg)
        //                 } else {
        //                     this.$message.error(res.data.msg)
        //                 }
        //             })
        //         })
        //         .catch(() => {
        //             this.$message({
        //                 type: 'info',
        //                 message: '已取消删除'
        //             })
        //         })
        // },
        //确定添加或者更新事件
        subInfo(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    //根据isAdd状态去判断执行接口
                    if (this.isAdd) {
                        //调取添加接口
                        // getregisterList(this.memberInfo).then(res => {
                        //     if (res.data.code == 200) {
                        //         //关闭弹框
                        //         this.dialogIsShow = false
                        //         this.reset()
                        //         this.getActionMemberList()
                        //         this.$message.success(res.data.msg)
                        //     } else if (res.data.code == 500) {
                        //         this.$message.warning(res.data.msg)
                        //     } else {
                        //         this.$message.error(res.data.msg)
                        //     }
                        // })
                    } else {
                        let data = this.memberInfo
                        data.uid = this.editId
                        //调取更新接口
                        getmemberEdit(data).then(res => {
                            if (res.data.code == 200) {
                                //关闭弹框
                                this.dialogIsShow = false
                                this.reset()
                                this.getActionMemberList()
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
.el-table{
  margin-top: 15px;
}
</style>
