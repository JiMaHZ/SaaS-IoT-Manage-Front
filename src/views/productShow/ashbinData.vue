<template>
    <basic-container>
        <el-row :span="24">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/wel/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/productShow/ashbin' }">垃圾桶监测</el-breadcrumb-item>
                <el-breadcrumb-item>垃圾桶详情</el-breadcrumb-item>
                <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
            </el-breadcrumb>
        </el-row >

        <el-row :span="24">
            <el-col :span="1">
                <p ></p>
            </el-col>  
            <el-col :span="1">
                <p class="deviceName icon-arrow" ><i class="el-icon-back" @click="backToDevices"></i></p>
            </el-col>  
            <el-col :span="6">
                <p class="deviceName">
                {{data0.deviceName}}  
                <el-tag :type="statusType" size="small">{{data0.deviceStatus}}</el-tag>
                </p>
            </el-col>
            <!-- <el-col :span="2"><p></p></el-col>  
            <el-col :span="4" >
                <div class="numList">
                <img class="img" :src="imagelist[0]" alt=""/>
                <p class="numTitle">设备总数</p>
                <span class="splitLine" />
                <p class="num">2</p>
                </div>
            </el-col>
            <el-col :span="4" >
                <div class="numList">
                <img class="img" :src="imagelist" alt=""/>
                <p class="numTitle">今日在线</p>
                <span class="splitLine" />
                <p class="num" style="color:#67C23A">1</p>
                </div>
            </el-col>
            <el-col :span="4" >
                <div class="numList">
                <img class="img" :src="imagelist" alt=""/>
                <p class="numTitle">垃圾已满</p>
                <span class="splitLine" />
                <p class="num" style="color:red">0</p>
                </div>          
            </el-col> -->

        </el-row >

        <el-row >
            <!-- 左侧数据栏 -->
            <el-col :span="12">
                <el-row type="flex" justify="left" class="selectRow" >
                    <el-col :span="16" :offset="1">
                        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                            <el-tab-pane label="垃圾桶参数" name="first">
                                <div>
                                    <span  class="tableTitle">垃圾桶参数</span>
                                    <el-tag  size="small">{{ashbinData.ashbinStatus.uploadTime?ashbinData.ashbinStatus.uploadTime:"——"}}</el-tag>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="压力参数" name="second" v-if="auth=='admin'">
                                <div class="tableTitle">压力参数</div>
                                 <el-tag  size="small">{{ashbinData.pbranch.uploadTime?ashbinData.pbranch.uploadTime:"——"}}</el-tag>
                            </el-tab-pane>
                            <el-tab-pane label="遥测数据" name="third" v-if="auth=='admin'">
                                <div class="tableTitle">遥测数据</div>
                            </el-tab-pane>
                            <!-- <el-tab-pane label="遥测数据" name="fourth">遥测数据</el-tab-pane> -->
                        </el-tabs>
                    </el-col >
                </el-row>

                <div v-if="activeName2=='first'">
                    <el-row :span="12" class="tableRow" >
                        <el-col :span="1"><div ></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple tableFont">垃圾桶1</div></el-col>
                        <el-col :span="10"><div class="grid-content bg-purple-light tableFont_center">{{ashbinOption.statuslist[ashbinData.ashbinStatus['1']]?ashbinOption.statuslist[ashbinData.ashbinStatus['1']]:"——"}}</div></el-col>
                        <el-col :span="5" :offset="1">
                            <img v-if="imgShow" class="imgs" :src="ashbinOption.imagelist[ashbinData.ashbinStatus['1']]?ashbinOption.imagelist[ashbinData.ashbinStatus['1']]:ashbinOption.imagelist[0]" alt="">
                        </el-col>
                    </el-row>
                    <el-row :span="12" class="tableRow" >
                        <el-col :span="1"><div ></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple tableFont">垃圾桶2</div></el-col>
                        <el-col :span="10">
                            <div class="grid-content bg-purple-light tableFont_center">{{ashbinOption.statuslist[ashbinData.ashbinStatus['2']]?ashbinOption.statuslist[ashbinData.ashbinStatus['2']]:"——"}}</div>
                        </el-col>
                        <el-col :span="5" :offset="1">
                            <img v-if="imgShow" class="imgs" :src="ashbinOption.imagelist[ashbinData.ashbinStatus['2']]?ashbinOption.imagelist[ashbinData.ashbinStatus['2']]:ashbinOption.imagelist[0]" alt="">
                        </el-col>
                    </el-row>
                    <el-row :span="12" class="tableRow" >
                        <el-col :span="1"><div ></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple tableFont">垃圾桶3</div></el-col>
                        <el-col :span="10">
                            <div class="grid-content bg-purple-light tableFont_center">{{ashbinOption.statuslist[ashbinData.ashbinStatus['3']]?ashbinOption.statuslist[ashbinData.ashbinStatus['3']]:"——"}}</div>
                        </el-col>
                        <el-col :span="5" :offset="1">
                            <img v-if="imgShow" class="imgs" :src="ashbinOption.imagelist[ashbinData.ashbinStatus['3']]?ashbinOption.imagelist[ashbinData.ashbinStatus['3']]:ashbinOption.imagelist[0]" alt="">
                        </el-col>
                    </el-row>
                    <el-row :span="12" class="tableRow" >
                        <el-col :span="1"><div ></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple tableFont">垃圾桶4</div></el-col>
                        <el-col :span="10">
                            <div class="grid-content bg-purple-light tableFont_center">{{ashbinOption.statuslist[ashbinData.ashbinStatus['4']]?ashbinOption.statuslist[ashbinData.ashbinStatus['4']]:"——"}}</div>
                        </el-col>
                        <el-col :span="5" :offset="1">
                            <img v-if="imgShow" class="imgs" :src="ashbinOption.imagelist[ashbinData.ashbinStatus['4']]?ashbinOption.imagelist[ashbinData.ashbinStatus['4']]:ashbinOption.imagelist[0]" alt="">
                        </el-col>
                    </el-row>

                    <el-row class="tableRow">
                        <el-col :span="1"><div ></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-blue-light tableFont">硬件信息</div></el-col>
                        <el-col :span="5"><div ></div></el-col>
                        <el-col :span="8"><div ></div></el-col>
                        <!-- <el-col :span="1"><div ><el-button type="primary" size="small" icon="el-icon-upload">绑定地址</el-button></div></el-col> -->
                    </el-row>

                    <el-row class="tableRow">
                        <el-col :span="1"><div ></div></el-col>
                        <el-col :span="4"><div class="grid-content bg-purple tableFont">设备状态</div></el-col>
                        <el-col :span="4"><div class="grid-content bg-purple-light tableFont">正常运行</div></el-col>
                        <el-col :span="4"><div class="grid-content bg-purple tableFont">创建时间</div></el-col>
                        <el-col :span="7"><div class="grid-content bg-purple-light tableFont_center">{{ashbinData.createTime?ashbinData.createTime:"——"}}</div></el-col>
                    </el-row>
                    <el-row class="tableRow">
                        <el-col :span="1"><div ></div></el-col>
                        <el-col :span="4"><div class="grid-content bg-purple tableFont">设备ID</div></el-col>
                        <el-col :span="15"><div class="grid-content bg-purple-light tableFont">{{$route.query.deviceId?$route.query.deviceId:"——"}}</div></el-col>
                    </el-row>
                    <el-row class="tableRow">
                        <el-col :span="1"><div ></div></el-col>
                        <el-col :span="4"><div class="grid-content bg-purple tableFont">ICCID号</div></el-col>
                        <el-col :span="15"><div class="grid-content bg-purple-light tableFont">{{ashbinData.iccid?ashbinData.iccid:"——"}}</div></el-col>
                    </el-row>
                    <!-- <el-row class="tableRow">
                        <el-col :span="1"><div ></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple tableFont">上线时间</div></el-col>
                        <el-col :span="10"><div class="grid-content bg-purple-light tableFont">2020/01/02 12:00:34</div></el-col>
                    </el-row> -->
                </div>

                <div v-if="activeName2=='second'">
                    <el-row :span="12" class="tableRow" >
                        <el-col :span="1"><div ></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple tableFont">主管压力</div></el-col>
                        <el-col :span="10"><div class="grid-content bg-purple-light tableFont_center">{{ashbinData.porigin?ashbinData.porigin+" Pa":"——"}}</div></el-col>
                        <!-- <el-col :span="5" :offset="1"><img class="imgs" src="@/images/page/ashbin_notFull.png" alt=""></el-col> -->
                    </el-row>
                    <el-row :span="12" class="tableRow" >
                        <el-col :span="1"><div ></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple tableFont">桶1压力</div></el-col>
                        <el-col :span="10"><div class="grid-content bg-purple-light tableFont_center">{{ashbinData.pbranch.branchP01?ashbinData.pbranch.branchP01+" Pa":"——"}}</div></el-col>
                        <el-col :span="5" :offset="1"><img class="imgs" :src="ashbinOption.imagelist[ashbinData.ashbinStatus['1']]?ashbinOption.imagelist[ashbinData.ashbinStatus['1']]:ashbinOption.imagelist[0]" alt=""></el-col>
                    </el-row>
                    <el-row :span="12" class="tableRow" >
                        <el-col :span="1"><div ></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple tableFont">桶2压力</div></el-col>
                        <el-col :span="10"><div class="grid-content bg-purple-light tableFont_center">{{ashbinData.pbranch.branchP02?ashbinData.pbranch.branchP02+" Pa":"——"}}</div></el-col>
                        <el-col :span="5" :offset="1"><img class="imgs" :src="ashbinOption.imagelist[ashbinData.ashbinStatus['2']]?ashbinOption.imagelist[ashbinData.ashbinStatus['2']]:ashbinOption.imagelist[0]" alt=""></el-col>
                    </el-row>
                    <el-row :span="12" class="tableRow" >
                        <el-col :span="1"><div ></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple tableFont">桶3压力</div></el-col>
                        <el-col :span="10"><div class="grid-content bg-purple-light tableFont_center">{{ashbinData.pbranch.branchP03?ashbinData.pbranch.branchP03+" Pa":"——"}}</div></el-col>
                        <el-col :span="5" :offset="1"><img class="imgs" :src="ashbinOption.imagelist[ashbinData.ashbinStatus['3']]?ashbinOption.imagelist[ashbinData.ashbinStatus['3']]:ashbinOption.imagelist[0]" alt=""></el-col>
                    </el-row>
                    <el-row :span="12" class="tableRow" >
                        <el-col :span="1"><div ></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple tableFont">桶4压力</div></el-col>
                        <el-col :span="10"><div class="grid-content bg-purple-light tableFont_center">{{ashbinData.pbranch.branchP04?ashbinData.pbranch.branchP04+" Pa":"——"}}</div></el-col>
                        <el-col :span="5" :offset="1"><img class="imgs" :src="ashbinOption.imagelist[ashbinData.ashbinStatus['4']]?ashbinOption.imagelist[ashbinData.ashbinStatus['4']]:ashbinOption.imagelist[0]" alt=""></el-col>
                    </el-row>
                </div>


                <div v-if="activeName2=='third'">
                    <el-row type="flex" justify="left" class="tableRow">
                        <el-col :span="22">
                            <avue-crud ref="crud" :data="dataThird" :page="pageThird" :option="optionThird" ></avue-crud>
                        </el-col >
                    </el-row>
                </div>
            </el-col>

            <!-- map -->
            <el-col :span="12" class="mapPos">
                    <div id="map_canvas"></div>
            </el-col>

        </el-row>

    </basic-container>
</template>

<script>
import AMap from 'AMap'
import {Convertor} from '@/const/map/mapConvert.js'
// import mailTable from '@/components/utils/tableComponent.vue' v-if="index < 10"
import {getDetail} from "@/api/iot/devicestatus";
import {getStatus} from "@/api/iot/ashbin";

export default {
    components: {
        // mailTable,
    },
    data(){
        return{
            imgShow: false,
            ashbinOption:{
                ashbinImg2:'',
                statuslist:[
                    '未用','未满','已满','单故障','总故障',
                ],
                imagelist: [
                    require('@/images/page/ashbin_unknown.png'), //未用
                    require('@/images/page/ashbin_notFull02.png'), //在用
                    require('@/images/page/ashbin_Full.png'),    //已满
                    require('@/images/page/ashbin_warning.png'),  //单故障
                    require('@/images/page/ashbin_warning.png'),  //总故障
                ],
            },
            map: Object,
            icon: Object,
            gps:{
                lng:'',
                lat:''
            },

            auth: 'admin',
            statusType: 'info',
            data0:{
                deviceId:'',
                deviceName:'',
                createTime:'——',
                lastUpdateTime:'——',
                deviceStatus:'未激活',
                gatewayAddress:'——',
                collectorAddress:'——'
            },
            activeName2: 'first',
            
            tags: [
                { name: '0900', type: 'success' },
                
            ],
            ashbinData:{
                ashbinStatus: Object,
                iccid:'——',
                location:{
                    lng:'',
                    lat:''
                },
                userId:'',
                porigin:'',
                pbranch:Object,
                lastUpdateTime:'',
                createTime:'',
            },

            dataThird: [
                {
                    uploadTime:'2019/12/30 12:00:34',
                    key:'0920',
                    value: 123
                }, {
                    uploadTime:'2019/12/30 12:05:57',
                    key:'0900',
                    value: 36
                }
            ],
            pageThird: {
                pageSizes: [5,10, 20, 30, 40,50,100],
                pageSize: 5,
                currentPage: 1,
                total: 0
            },
            optionThird:{
                page:true,
                align:'center',
                menu:false,
                addBtn: false,
                dialogType:'drawer',
                dialogWidth:800,
                column:[
                    {
                    label:'上传时间',
                    prop:'uploadTime'
                    }, {
                    label:'键(Key)',
                    prop:'key'
                    }, {
                    label:'值(Value)',
                    prop:'value'
                    }
                ]
            }

            }
    },
    computed: {
        listTemp() {
            var list = this.tags;
            var arrTemp = [];
            var index = 0;
            var sectionCount = 10;
            for (var i = 0; i < list.length; i++) {
                index = parseInt(i / sectionCount);
                if (arrTemp.length <= index) {
                    arrTemp.push([]);
                }
                arrTemp[index].push(list[i]);
            }
            return arrTemp;
        }
    },
    methods:{
        onload(){
           getDetail(this.$route.query.deviceId).then(res => {
                console.log(res)
                this.data0 = res.data.data;
                if(this.data0.deviceStatus){
                    this.statusType = 'success'
                    this.data0.deviceStatus = '已激活'
                }else{
                    this.data0.deviceStatus = '未激活'
                }
          });
          
        },

        backToDevices(){
            this.$router.push({ path: '/productShow/ashbin'})
        },
        handleClick() {
            // console.log(tab, event);
        }

    },
    mounted(){
        getStatus(this.$route.query.deviceId).then(res=>{
                console.log(res)
                if(res.status === 200){
                    this.ashbinData = res.data.data;
                    this.imgShow = true;

                    let str={
                        // lng:120.07031391,
                        // lng:120.12832446341031,
                        lng:parseFloat(this.ashbinData.location.lng)||120.12832446341031,
                        // lat:30.15856606
                        // lat:30.26824270617709
                        lat:parseFloat(this.ashbinData.location.lat)||30.26824270617709
                    }
                    // console.log(str)
                    var c=new Convertor();
                    var r1=c.WGS2GCJ(str);
                    this.map = new AMap.Map('map_canvas', {
                        zoom:13,//级别
                        center: [r1.lng, r1.lat],//中心点坐标120.12832446341031, 30.26824270617709
                        viewMode:'3D',//使用3D视图
                        pitch:65, // 地图俯仰角度，有效范围 0 度- 83 度
                        // mapStyle: 'amap://styles/whitesmoke', 
                    });

                    this.icon = new AMap.Icon({
                        size: new AMap.Size(55.7, 50),    // 图标尺寸
                        // size: new AMap.Size(75.7, 50),    // 图标尺寸
                        image: require('@/images/page/icon_ashbin_blue04.png'),  // Icon的图像
                        // imageOffset: new AMap.Pixel(0, -60),  // 图像相对展示区域的偏移量，适于雪碧图等
                        imageSize: new AMap.Size(55.7, 50)   // 根据所设置的大小拉伸或压缩图片
                    });

                    // console.log(this.ashbinData.location.lng)

                    if(this.ashbinData.location.lng !== undefined && this.ashbinData.location.lng !== ''){
                        var marker = new AMap.Marker({
                            // position:new AMap.LngLat(r1.lng,r1.lat),//位置，
                            position: this.map.getCenter(),//位置，
                            icon: this.icon, // 添加 Icon 实例
                            // animation: "AMAP_ANIMATION_BOUNCE",
                            // offset: new AMap.Pixel(-5, -5)
                            offset: new AMap.Pixel(-27, -40)
                        })
                        this.map.add([marker]);//添加到地图
                    }else{
                        var text = new AMap.Text({
                            text:'暂无数据',
                            anchor:'center', // 设置文本标记锚点
                            draggable:true,
                            cursor:'pointer',
                            angle:10,
                            style:{
                                'padding': '.75rem 1.25rem',
                                'margin-bottom': '1rem',
                                'border-radius': '.25rem',
                                'background-color': 'white',
                                'width': '15rem',
                                'border-width': 0,
                                'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
                                'text-align': 'center',
                                'font-size': '20px',
                                'color': 'blue'
                            },
                            position: this.map.getCenter(),//位置，
                        });

                        text.setMap(this.map);
                    }
                    
                }  
          }).catch(()=>{
                // console.log(error)
                // this.$message({
                // type: "error",
                // message: 123
                // });
                this.$confirm('请先绑定网关地址?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$router.push({ path: '/deviceManagement/devices/deviceData',query: { deviceId: this.$route.query.deviceId} })
                }).catch(() => {
                    this.$router.push({ path: '/productShow/ashbin'})       
                });
          })
    },
    created(){
        console.log(this.$route.query.deviceId)
        // this.data0.deviceId = this.$route.query.deviceId;
        this.onload();
    },
}
</script>

<style scoped>
.deviceName{
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 10px;
  margin-top: 25px;
}
.icon-arrow{
  font-size: 30px;
  font-weight: 900;
  margin-bottom: 0px;
  margin-top: 27px;

  cursor: pointer;
}
.tableFont{
    font-size: 12px;
    padding: 0px 20px;
    line-height: 36px;
}
.tableFont_center{
    font-size: 12px;
    /* padding: 0px 20px; */
    line-height: 36px;
    text-align: center;
}
.tableRow{
    margin-bottom: 0px;
}
.selectRow{
    margin-bottom: 10px;
}
.tagListRow{
    margin-bottom: 5px;
}
.tagRow{
    margin-left: 10px;
}
#map_canvas{
    height: 450px;
    width: 100%;
    /* z-index: 99999; */
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.5);
}
.tableTitle{
  display: inline;
  padding: 10px;
  color: rgb(64, 158, 255);
  font-weight: 600;
}

.mapPos{
    margin-left: -35px;
}

.imgs{
    width: 50px;
    height: 40px;
}
</style>

<style scoped>
  .el-row {
    /* margin-bottom: 20px; */
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .bg-blue-light{
    background-color: rgba(64,158,255,.1);
    color: #409EFF;
    border-radius: 4px ;
  }

  
</style>