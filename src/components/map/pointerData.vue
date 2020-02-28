<template>
    <div class="dataCard">
        <el-row>
            <el-col :span="24" style="margin:0px">
                <p class="deviceName">
                    {{deviceName?deviceName:'未命名'}}
                    <el-tag :type="statusType" size="mini" style="font-weight: 400">{{deviceStatus?deviceStatus:"未知"}}</el-tag>
                </p>
            </el-col>
        </el-row>
        <el-row :span="24">
            <el-col :span="12">
                <p class="deviceTime">
                    <el-tag type="primary" size="mini">{{uploadTime?uploadTime:"时间未知"}}</el-tag>
                </p>
            </el-col>

            <el-col :span="12">
                <el-row class="buttonData">
                        <el-button  size="mini" type="info" icon="el-icon-document" plain @click="detail">查看详情</el-button>
                </el-row>
            </el-col>
        </el-row >
        <el-row :span="24" class="rowData">
            <el-col :span="2" >
                <!-- <p class="ashbinData">桶1</p> -->
            </el-col>
            <el-col :span="5" :offset="0" class="colData">
                <p ><img class="imgs" :src="ashbinImg.img01" alt=""></p>
                <p class="ashbinData">桶1</p>
            </el-col>

            <el-col :span="5" :offset="0" class="colData">
                <p ><img class="imgs" :src="ashbinImg.img02" alt=""></p>
                <p class="ashbinData">桶2</p>
            </el-col>
            <el-col :span="5" :offset="0" class="colData">
                <p ><img class="imgs" :src="ashbinImg.img03" alt=""></p>
                <p class="ashbinData">桶3</p>
            </el-col>
            <el-col :span="5" :offset="0" class="colData">
                <p ><img class="imgs" :src="ashbinImg.img04" alt=""></p>
                <p class="ashbinData">桶4</p>
            </el-col>
        </el-row >

        
        
    </div>
</template>

<script>
export default {
    props: {
        ashbinData: Object
    },
    data(){
        return{
            ashbinImg:{
                img01:require('@/images/page/ashbin_unknown.png'),  //默认
                img02:require('@/images/page/ashbin_unknown.png'),
                img03:require('@/images/page/ashbin_unknown.png'),
                img04:require('@/images/page/ashbin_unknown.png'),
            },
            imagelist: [
                require('@/images/page/ashbin_unknown.png'), //未用
                require('@/images/page/ashbin_notFull02.png'), //在用
                require('@/images/page/ashbin_Full.png'),    //已满
                require('@/images/page/ashbin_warning.png'),  //单故障
                require('@/images/page/ashbin_warning.png'),  //总故障
            ],
            deviceName:'————',
            deviceStatus:'已激活',
            statusSelect:['异常','未知','已激活','未激活'],
            statusType:'success',
            typeSelect:['warning','info','success','info'],
            uploadTime:'——',
        }
    },
    methods:{
        detail(){
            this.$router.push({ path: '/productShow/ashbin/ashbinData',query: { deviceId: this.ashbinData.deviceId } })
        }
    },
    created(){
        console.log(this.ashbinData)
        console.log(this.ashbinData.ashbinStatus)
        if(this.ashbinData !== undefined){
            if(this.ashbinData.ashbinStatus instanceof Object && this.ashbinData.ashbinStatus['1'] !== undefined){
                this.ashbinImg.img01 = this.imagelist[this.ashbinData.ashbinStatus['1']]
                this.ashbinImg.img02 = this.imagelist[this.ashbinData.ashbinStatus['2']]
                this.ashbinImg.img03 = this.imagelist[this.ashbinData.ashbinStatus['3']]
                this.ashbinImg.img04 = this.imagelist[this.ashbinData.ashbinStatus['4']]
            }
            this.deviceName = this.ashbinData.deviceName;
            // let statusNum = parseInt(this.ashbinData.ashbinStatus)+1;
            // this.deviceStatus = this.statusSelect[statusNum]; //TODO 待完成
            // this.statusType = this.typeSelect[statusNum];
            this.uploadTime = this.ashbinData.lastUpdateTime;
        }
    }
    
}
</script>

<style lang="scss" scoped>

.deviceName{
  margin: 0px;
  /* display: inline; */
  font-size: 25px;
  font-weight: 600;
  /* margin-bottom: 10px;
  margin-top: 25px; */
}
.deviceTime{
    margin: 0px;
    margin-top: 5px;
}
.dataCard{
    height: 130px;
    width: 270px;
    padding: 10px;
    margin: 10px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.5);

    
}
.ashbinData{
        // line-height: 40px;
        margin: 0px;
        font-size: 12px;
        text-align: center;
}
.imgs{
    width: 50px;
    height: 40px;
}

.rowData{
    margin: 0px;
}

.colData{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    p{
        margin: 0px;
    }
}

.rowData .el-col {
    margin-bottom: 0px;
}

.buttonData{
    // margin-left: 10px;
    // margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}
</style>>
