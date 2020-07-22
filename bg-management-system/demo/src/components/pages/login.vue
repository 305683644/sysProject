<template>
  <div class="bg-login">
    <el-form
      :model="userInfo"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm login"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userInfo.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userInfo.password" show-password clearable></el-input>
      </el-form-item>
     
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//获取登录接口
import { getuserlogin } from '../../utils/axios'
export default {
 data() {
      return {
        userInfo: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            getuserlogin(this.userInfo).then(res=>{
              if(res.data.code==200){
                  this.$message.success('res.data.msg');
                  //把登录信息存储到本地存储中
                  sessionStorage.setItem('userInfo',JSON.stringify(res.data.list))
                  //登录成功之后就要跳转到index
                  this.$router.push('/home')
              }else{
                  this.$message.error('res.data.msg');
              }
            })
           
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="stylus" scoped>
@import '../../stylus/index.styl';
.bg-login{
    width :100vw;
    height :100vh;
    background :$bgColorFirst;
    
}
.bg-login .login{
    width 450px
    height 300px
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    margin auto
    background $bgColorWhite
    box-sizing border-box
    padding-left 20px
    padding-top 70px
    border-radius 25px
}
.el-input{
    width 300px
}
.el-button{
    width 300px
}
</style>
