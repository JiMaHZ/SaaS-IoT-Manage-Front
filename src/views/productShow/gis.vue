<template>
    <basic-container>
    <!-- <div ></div> -->
        <pointerData class="card" :ashbinData="ashbinData" v-if="showCard"></pointerData>
        <div id="map_canvas">
            <div id="amap-page-container" > </div>
        </div>
    </basic-container>
</template>
  
<script>
    import AMap from 'AMap'
    import {Convertor} from '@/const/map/mapConvert.js' 
    import {getStatus} from "@/api/iot/ashbin";
    import {getMapLocation} from "@/api/iot/devices";
    import pointerData from '@/components/map/pointerData.vue';
    // import {getDetail} from "@/api/iot/devicestatus";
    
    export default {
        components: {
            pointerData,
            // HelloWorld
        },
      data(){
        return {
            showCard: false,

            ashbinData:Object,
            map: Object,
            icon: Object,
        };
      },

      methods: {
        markerPos(){
            console.log("点击")
        },
        getMap() {
          
        },
        fmarkerClick(e) {
            console.log(e.target.content)
            
            // infoWindow.setContent(e.target.content);
            // infoWindow.open(map, e.target.getPosition());
        }
      },
      mounted() {
        // var map = new AMap.Map('map_canvas');  'amap-page-container't
        this.map = new AMap.Map('amap-page-container', {
            resizeEnable: true,
            zoom:11,//级别
            center: [120.12832446341031, 30.26824270617709],//中心点坐标120.12832446341031, 30.26824270617709
            // viewMode:'3D',//使用3D视图
            // pitch:65, // 地图俯仰角度，有效范围 0 度- 83 度
            // mapStyle: 'amap://styles/whitesmoke', //远山黛
            // mapStyle: 'amap://styles/macaron', //马卡龙
            // mapStyle: 'amap://styles/fresh', //
        });
        
        this.icon = new AMap.Icon({
            size: new AMap.Size(55.7, 50),    // 图标尺寸
            image: require('@/images/page/icon_ashbin_blue04.png'),  // Icon的图像
            // imageOffset: new AMap.Pixel(0, -10),  // 图像相对展示区域的偏移量，适于雪碧图等
            imageSize: new AMap.Size(55.7, 50)   // 根据所设置的大小拉伸或压缩图片
        });

        // //测试用例
        // var marker = new AMap.Marker({
        //     position:[120.12, 30.27]//位置，
        // })
        // var marker2 = new AMap.Marker({
        //     position:[120.12, 30.27],//位置，
        //     offset: new AMap.Pixel(-27, -40),//设置偏移
        //     icon: this.icon, // 添加 Icon 实例
        // })
        // this.map.add([marker,marker2]);//添加到地图
      } ,
      created(){
        let c=new Convertor();
        getMapLocation().then(res=>{
            console.log(res)
            if(res.status === 200){
                res.data.forEach(element => {
                    let str={
                        lng:parseFloat(element.lng),
                        lat:parseFloat(element.lat)
                    }
                    let r=c.WGS2GCJ(str);

                    let marker0 = new AMap.Marker({
                        map: this.map,
                        position:new AMap.LngLat(r.lng,r.lat),//位置，
                        icon: this.icon, // 添加 Icon 实例
                        offset: new AMap.Pixel(-27, -40),//设置偏移
                        extData:element,
                    })

                    // marker0.on('click', this.markerPos());
                    AMap.event.addListener(marker0,'click',e=>{
                        console.log(e)
                        this.showCard = false;
                        // console.log(e.target.Le.extData.deviceId)
                        getStatus(e.target.Ke.extData.deviceId).then(res=>{
                            // console.log(res)
                            if(res.status === 200){
                                this.ashbinData = res.data.data;
                                this.showCard = true
                            }
                        })
                    });
                });

                // this.map.setFitView({avoid:[10,20,10,10]});
                this.map.setFitView();
                
            }
        })
      }  
    }
</script>

<style type="text/css" scoped>
body, html,#map_canvas {width: 100%;height: 580px;overflow: hidden;margin:0;font-family:"微软雅黑";}

#amap-page-container{
    height: 580px;
    width: 100%;
    /* z-index: 99999; */
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.6);
}

.card{
    position: absolute;
    right: 5%;
    top: 4%;
    z-index: 9999;
    background-color: rgb(230, 230, 230,.7);
}
</style>

<style >


</style>