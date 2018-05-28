<template>
  <div class="sq-dynamic">
    <div class="bg">
      <div class="dynamic-head" v-for="listItem in listData" >
        <div class="left">
          <div class="dynamic-head-l"><img src="http://img.m-talk.mobi/audit/152705892212260004.jpg" alt=""></div>
          <!--<div class="dynamic-head-l"><img :src="imgburl+listItem.gImg" alt=""></div>-->
          <div class="dynamic-head-r">
            <h2>{{listItem.gName}}</h2>
            <p>{{listItem.createTime}}</p>
          </div>
        </div>
        <div class="right wait" v-if="listItem.status==0" @click="goDetail(listItem.auId)">待审核</div>
        <div class="right pass" v-else-if="listItem.status==1">已通过</div>
        <div class="right refuse" v-else>已拒绝</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "console_list",
    data(){
      return{
        listData:[],
        imgburl:"http://img.m-talk.mobi/",
      }
    },
    created(){
      let url = this.HOST+"/mtalk/audit/getAuditMsgs";
      this.$axios.post(url,{

      })
        .then(res => {
          console.log(res.data)
          if (res.data.code==100){
            this.listData=res.data.data
          }

        })
        .catch(error => {
          console.log(error)
        })
    },
    methods:{
      goDetail(id){
        this.$router.push({
          path:  "/auditdetail/" +id,
        })
      }
    }
  }
</script>

<style scoped>
  .bg{
    background: #ffffff;
  }
  .sq-dynamic{
    position: absolute;
    width: 100%;
    height: 100%;
    padding-top: 5px;
    background: #f8f8f8;
  }
  .dynamic-head {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }
  .dynamic-head .left{
    padding-left: 15px;
    display: flex;
  }
  .dynamic-head .right{
    margin-right: 20px;
    height: 30px;
    line-height: 30px;
    background: #ff696d;
    text-align: center;
    width: 100px;
    color: #000;
    border-radius: 5px;
  }
  .dynamic-head .wait{
    background: #FF7272;
  }
  .dynamic-head .wait:active{
    background: #F55E5E;
  }
  .dynamic-head .pass{
    background: #ffffff;
  }
  .dynamic-head .refuse{
    background: #ffffff;
  }
  .dynamic-head-l {
    position: relative;
    width: 40px;
    height: 40px;
    padding-right: 15px;
  }

  .dynamic-head-l img {
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .dynamic-head-r h2 {
    font-size: 16px;
    line-height: 23px;
    color: #333333;
  }
  .dynamic-head-r p {
    font-size: 12px;
    line-height: 17px;
    color: #999999;
  }
</style>
<style>

</style>
