<template>
 <div>
    <!-- 面包屑导航 -->
    <breadcrumb></breadcrumb>
    <!-- 按钮 -->
    <el-row>
      <el-button type="primary"  size="middle" plain @click="add">添加</el-button>
    </el-row>

 </div>
</template>

<script>
export default {
 data() {
 return {

 };
 },
};
</script>

<style lang="" scoped>
.el-row {
  margin: 15px 0;
}
</style>
