<template>
    <div class="infoshow">
        <el-row type='flex' class="row-bg" justify='center'>
            <el-col :span='8'>
                <div class="user">
                    <img :src="user.avatar" class="avatar" alt="">
                </div>
            </el-col>
            <el-col :span='16'>
                <div class="userinfo">
                    <div class="user-item">
                        <i class="iconfont icon-yonghu"></i>
                        <span>{{user.name}}</span>
                    </div>
                    <div class="user-item">
                        <i class="iconfont icon-shezhi"></i>
                        <span>{{user.identity == 'manager' ? '管理员' : '普通员工'}}</span>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    computed:{
        user(){
            return this.$store.getters.user
        }
    }
}
</script>


<style scoped>
.infoshow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* padding: 16px; */
}
.row-bg {
  width: 100%;
  height: 100%;
}
.user {
  text-align: center;
  position: relative;
  top: 30%;
}
.user img {
  width: 150px;
  border-radius: 50%;
}
.user span {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.userinfo {
  height: 100%;
  background-color: #eee;
}
.user-item {
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 28px;
  color: #333;
}
</style>
