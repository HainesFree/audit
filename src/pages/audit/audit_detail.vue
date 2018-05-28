<template>
  <div class="container">
    <div class="bg">
      <div class="cell">
        <div class="cell-l">负责人</div>
        <div class="cell-r">{{detailData.name}}</div>
      </div>
      <div class="cell">
        <div class="cell-l">负责人电话</div>
        <div class="cell-r">{{detailData.phoneNo}}</div>
      </div>
      <!--身份证号码-->
      <div class="cell">
        <div class="cell-l">身份证号码</div>
        <div class="cell-r">{{detailData.IdCard }}</div>
      </div>
      <div class="id-num">
        <div class="id-title">负责人身份证</div>
        <!--遍历后台数据-->
        <div class="id-up" v-for="(imgItem,index) in picArr">
          <!--初始图片-->
          <img :src="imgburl+imgItem" alt="" @click="clickImg($event)"  v-if="showImg">
          <!--点击查看大图-->
          <div v-if="!showImg" class="bigImg"><img  :src="currentImg" @click="viewImg()"></div>
          <p v-if="index==0">（正面）</p>
          <p v-else-if="index==1">（反面）</p>
        </div>
      </div>
      <!--相关资质证书-->
      <div class="certificate">
        <div class="certificate-title">相关资质证书</div>
        <!--<div class="certificate-img"><img src="../../assets/image/add-bimg.png" alt=""></div>-->
        <div class="certificate-img" v-for="imgItem in auditArr">
          <img :src="imgburl+imgItem " alt="" @click="clickImg($event)"  v-if="showImg">
          <div v-if="!showImg" class="bigImg"><img  :src="currentImg" @click="viewImg()"></div>
        </div>
      </div>
    </div>
    <div class="btn-wap">
      <div class="btn" @click="refuse">拒绝通过</div>
      <div class="btn" @click="pass">确认通过</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "self_auth",
    data(){
      return{
        isBigImg:false,
        showImg:true,
        detailData:[],
        // imgburl:"http://qx-mtalk-test.oss-cn-shanghai.aliyuncs.com/",
        imgburl:"http://img.m-talk.mobi/",
        picString:"",
        auditString:"",
      }
    },
    computed:{
      picArr:function(){
        return this.picString.split(';')
      },
      auditArr:function(){
        return this.auditString.split(';')
      }
    },
    mounted(){
      console.log(this.$route.params.id)
    },
    created(){
      let url = this.HOST+"/mtalk/audit/getAuditMsg";
      this.$axios.post(url,{
          auId :this.$route.params.id
      })
        .then(res => {
          console.log(12345);
          console.log(res.data.data);
          if (res.data.code==100){
            this.detailData=res.data.data;
            this.picString=res.data.data.IdCardImg;
            this.auditString=res.data.data.aptLicenseImg;
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    methods:{
      pass(){
        console.log('通过')
        let url =this.HOST+"/mtalk/audit/submissionAudit";
        this.$axios.post(url,{
          status:"1",
          auId:this.$route.params.id
        })
          .then(res => {
            console.log(res.data.code)
            if (res.data.code==100){
              this.$router.push({
                path: '/',
              })
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      refuse(){
        console.log("拒绝")
        let url =this.HOST+"/mtalk/audit/submissionAudit";
        this.$axios.post(url,{
          status:"2",
          auId:this.$route.params.id
        })
          .then(res => {
            if (res.data.code==100){
              this.$router.push({
                path: '/',
              })
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      clickImg(e) {
        this.showImg = false;
        this.currentImg = e.currentTarget.src;
      },
      viewImg(){
        this.showImg = !this.showImg;
      }
    }
  }
</script>

<style scoped>
  .container{
    position: absolute;
    width: 100%;
    background: #F8F8F8;
  }
  .bg{
    background: #FFFFFF;
    padding: 0 15px;
    margin-top: 10px;
  }
  .cell{
    position: relative;
    height: 43px;
    display: flex;
    justify-content: space-between;
  }
  .cell::after{
    content: " ";
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    border-bottom: 1px solid #D6D6D6;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
  }
  .cell-l{
    font-size: 15px;
    line-height: 43px;
    color: #333333;
  }
  .cell-r{
    line-height: 43px;
  }
  .cell-r input{
    padding-right: 15px;
    text-align: right;
    outline-style: none;
    border: none;
    color: #999999;
    font-size: 15px;
  }
  .id-num{
    height: 222px;
    position: relative;
  }
  .id-num::after{
    content: " ";
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    border-bottom: 1px solid #D6D6D6;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
  }
  .id-title{
    margin-top: 10px;
    font-size:15px;
    color: #333333;
  }
  .id-num .id-up img{
    width: 62px;
    height: 62px;
    margin-top: 8px;
  }
  .id-num .id-up p{
    width: 61px;
    text-align: center;
    color: #66666666;
  }
  .certificate{
    /*height: 154px;*/
    padding-right: 15px;
  }
  .certificate-title{
    font-size:15px;
    color: #333333;
    margin: 12px 0 10px 0;
  }
  .certificate-img img{
    width: 150px;
    height: 100px;
  }
  .notice-t span{
    display: inline-block;
    width: 16px;
    height: 16px;
    color: #999999;
    border-radius: 50%;
    border: 1px solid #999999;
  }
  .btn-wap{
    display: flex;
    padding: 0 15px;
    margin-bottom: 18px;
  }
  .btn{
    width: 100%;
    height: 48px;
    line-height:48px;
    font-size: 18px;
    border-radius: 5px;
    margin-top: 22px;
    background: #FE7272;
    color: #FFFFFF;
    text-align: center;
  }
  .btn:first-child{
    background: #CCCCCC;
    margin-right: 5px;
  }
  .btn:first-child:active{
    background: gainsboro;
  }
  .btn:active{
    background: #F55E5E;
  }
  /*处理图片放大*/
  .id-up  .bigImg{
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
.id-up .bigImg img{
    width: 60%;
    height: 60%;
    max-width: 100%;display: block;position: absolute;left: 0;right: 0;margin:10% auto;z-index: 1000;
  }
</style>
