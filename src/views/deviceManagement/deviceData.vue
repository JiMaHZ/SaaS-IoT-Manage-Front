<template>
    <basic-container>
        <el-row :span="24">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/wel/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/deviceManagement/deviceList' }">设备列表</el-breadcrumb-item>
                <el-breadcrumb-item>设备详情</el-breadcrumb-item>
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
            <!-- <el-col :span="1">
                
            </el-col>  -->
            <el-col :span="16">
                <!-- <avue-data-display :option="option"></avue-data-display> -->
            </el-col>
        </el-row >

        <el-row type="flex" justify="center" class="tableRow">
            <el-col :span="22">
                <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                    <el-tab-pane label="设备信息" name="first"></el-tab-pane>
                    <el-tab-pane label="参数配置" name="second"></el-tab-pane>
                    <el-tab-pane label="数据查看" name="third"></el-tab-pane>
                    <!-- <el-tab-pane label="遥测数据" name="fourth">遥测数据</el-tab-pane> -->
                </el-tabs>
            </el-col >
        </el-row>

        <div v-if="activeName2=='first'">
            <el-row class="tableRow">
                <el-col :span="1"><div ></div></el-col>
                <el-col :span="4"><div class="grid-content bg-blue-light tableFont">硬件地址绑定</div></el-col>
                
            </el-row>
            <el-row class="tableRow" >
                <el-col :span="1"><div ></div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple tableFont">设备名称</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light tableFont">{{data0.deviceName}}</div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple tableFont">设备ID</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light tableFont">{{data0.deviceId}}</div></el-col>
            </el-row>
            <el-row class="tableRow">
                <el-col :span="1"><div ></div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple tableFont">创建时间</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light tableFont">{{data0.createTime}}</div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple tableFont">最后上线时间</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light tableFont">{{data0.lastUpdateTime}}</div></el-col>
            </el-row>
            
            <el-row style="margin-bottom:10px">
                <el-col :span="1"><div ></div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple tableFont">激活状态</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light tableFont">{{data0.deviceStatus}}</div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple tableFont">ICCID</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light tableFont">{{deviceData.iccid?deviceData.iccid:"——"}}</div></el-col>
            </el-row>

            <el-row class="tableRow">
                <el-col :span="1"><div ></div></el-col>
                <el-col :span="4"><div class="grid-content bg-blue-light tableFont">硬件地址绑定</div></el-col>
                <el-col :span="6"><div ></div></el-col>
                <el-col :span="8"><div ></div></el-col>
                <el-col :span="1">
                    <div >
                        <el-button type="primary" size="small" icon="el-icon-upload" @click="bindGateway">绑定地址</el-button>
                    </div>
                </el-col>
            </el-row>

            <el-row style="margin-bottom:10px">
                <el-col :span="1"><div ></div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple tableFont">网关地址</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light tableFont">{{deviceData.gatewayAddress?deviceData.gatewayAddress:"——"}}</div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple tableFont">采控器地址</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light tableFont">{{deviceData.collectorAddress?deviceData.collectorAddress:"——"}}</div></el-col>
            </el-row>
        </div>

        <div v-if="activeName2=='second'">
            <el-row style="margin-bottom:10px">
                <el-col :span="1"><div ></div></el-col>
                <el-col :span="4"><div class="grid-content bg-blue-light tableFont">已激活的Key</div></el-col>
                <el-col :span="6"><div ></div></el-col>
                <el-col :span="8"><div ></div></el-col>
                <el-col :span="1"><div ><el-button type="primary" size="small" icon="el-icon-plus">添加Key</el-button></div></el-col>
            </el-row>

            <div v-for="(row,i) in listTemp" :key= i >
                <el-row class="tagListRow">
                    <el-col :span="1"><div ></div></el-col>
                    <div  v-for="tag in row" :key="tag.name">
                        <el-col :span="2">
                            <el-tag 
                            closable
                            :type="tag.type">
                            {{tag.name}}
                            </el-tag>
                        </el-col>
                    </div>
                </el-row>
            </div>

             <el-row style="margin-top:10px">
                <el-col :span="1"><div ></div></el-col>
                <el-col :span="4"><div class="grid-content bg-blue-light tableFont">Key值属性</div></el-col>
                <el-col :span="6"><div ></div></el-col>
                <el-col :span="8"><div ></div></el-col>
                <!-- <el-col :span="1"><div ><el-button type="primary" size="small" icon="el-icon-plus">添加Key</el-button></div></el-col> -->
            </el-row>

            <el-row :gutter="20" class="contentCenter">
                <el-col :span="1"></el-col>
                <el-col :span="2" class="itemCenter">键值</el-col>
                <el-col :span="3">别名</el-col>
                <el-col :span="2">单位</el-col>
                <el-col :span="2">最小值</el-col>
                <el-col :span="2">最大值</el-col>
                <el-col :span="2">步长</el-col>
                <el-col :span="3">数据类型</el-col>

            </el-row>

            <el-row :gutter="20" class="contentCenter">
                <el-col :span="1"></el-col>
                <el-col :span="2" class="itemCenter"><el-tag>0900</el-tag></el-col>
                <el-col :span="3"><el-input placeholder="请输入别名" v-model="input.alias" :disabled="true">123</el-input></el-col>
                <el-col :span="2"><el-input placeholder="请输入单位" v-model="input.unit" :disabled="true">%</el-input></el-col>
                <el-col :span="2"><el-input placeholder="请输入最小值" v-model="input.min" :disabled="true">10</el-input></el-col>
                <el-col :span="2"><el-input placeholder="请输入最大值" v-model="input.max" :disabled="true">150</el-input></el-col>
                <el-col :span="2"><el-input placeholder="请输入步长" v-model="input.step" :disabled="true">0.1</el-input></el-col>
                <el-col :span="3"><el-input placeholder="请输入类型" v-model="input.type" :disabled="true">浮点型</el-input></el-col>

                <el-col :span="1" :offset="2"><i class="el-icon-edit iconStyle"></i></el-col>
                <el-col :span="1" :offset="0"><i class="el-icon-check iconStyle"></i></el-col>
                
            </el-row>
        </div>

        <div v-if="activeName2=='third'">
            <el-row class="tableRow">
                <el-col :span="1"><div ></div></el-col>
                <el-col :span="4"><div class="grid-content bg-blue-light tableFont">数据查看</div></el-col>
                
            </el-row>
            <el-row type="flex" justify="center" class="tableRow">
                <el-col :span="22">
                    <avue-crud ref="crud" :data="dataThird" :page="pageThird" :option="optionThird" ></avue-crud>
                 </el-col >
            </el-row>
        </div>

        <el-dialog title="绑定地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="网关地址" :label-width="formLabelWidth">
                <!-- <el-select v-model="form.region" placeholder="请选择网关地址">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select> -->
                    <!-- <span >可选择任意一级菜单的选项</span> :disabled="selectDisabled"-->
                    <el-cascader
                        placeholder="选择需要绑定的网关"
                        v-model="formAddress"
                        :disabled="selectDisabled"
                        :options="optionAddress"
                        filterable
                    ></el-cascader>
                </el-form-item>
                <!-- <el-form-item>
                    
                </el-form-item> -->
            </el-form>
            <!-- <avue-input v-model="formAddress" placeholder="请选择内容" type="tree" :dic="dic"> -->
            

            <!-- </avue-input> -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="handleBind">{{buttonName}}</el-button>
            </div>
        </el-dialog>

    </basic-container>
</template>

<script>
// import mailTable from '@/components/utils/tableComponent.vue' v-if="index < 10"
import {getDetail} from "@/api/iot/devicestatus";
import {getDeviceById,getNoBindList,bindDeviceId,unbindDeviceId} from "@/api/iot/devices";

export default {
    components: {
        // mailTable,
    },
    data(){
        return{
            input:{
                alias:'123',
                unit:'%',
                min:'12',
                max:'999',
                step:'0.1',
                type:'double'
            },            
            statusType: 'info',
            data0:{
                deviceId:'',
                deviceName:'',
                createTime:'——',
                lastUpdateTime:'——',
                deviceStatus:'未激活',
            },
            deviceData:{
                gatewayAddress:'',
                collectorAddress:'——',
                iccid:''
            },
            activeName2: 'first',
            tableData: [
                {key: '单号', value: '1001'},
                {key: '商品名称', value: '篮球'},
                {key: '价格', value: '120.00'},
                {key: '订单日期', value: '2017-03-01'},
                {key: '付款方式', value: '在线支付'},
                {key: '收货地址', value: '北京市海淀区西北旺镇'},
            ],
            tableData1: [{
                date: '2016-05-02',
                name: '王小虎',
                // address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                // address: '上海市普陀区金沙江路 1517 弄'
            }],
            tags: [
                { name: '0900', type: 'success' },
                { name: '0904', type: 'success' },
                { name: '0908', type: 'success' },
                { name: '090C', type: 'success' },
                { name: '0920', type: 'success' },
                { name: '0900', type: 'success' },
                { name: '0904', type: 'success' },
                { name: '0908', type: 'success' },
                { name: '090C', type: 'success' },
                { name: '0920', type: 'success' },
                { name: '0900', type: 'success' },
                { name: '0904', type: 'success' },
                { name: '0908', type: 'success' },
                { name: '090C', type: 'success' },
                { name: '0920', type: 'success' },
                { name: '0900', type: 'success' },
                { name: '0904', type: 'success' },
                { name: '0908', type: 'success' },
                { name: '090C', type: 'success' },
                { name: '0920', type: 'success' },
            ],

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
            },

            //弹出框 网关绑定
            dialogFormVisible: false,
            buttonName:'绑 定',
            form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
            },
            formLabelWidth: '120px',

            formAddress: [],
            dic: [],
            optionAddress: [],
            selectDisabled: false
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
            console.log(this.$route.query.deviceId)
            // if(this.$route.query.deviceId)
            if(this.$route.query.deviceId !== undefined){
                this.getDeviceRequest(this.$route.query.deviceId)
            }else{
                

                this.$alert('请先选择需要具体的设备', '提示', {
                confirmButtonText: '确定',
                callback: () => {
                    // this.$message({
                    // type: 'info',
                    // message: `action: ${ action }`
                    // });
                    this.$router.push({ path: '/deviceManagement/deviceList'})
                }
                });
            }
        },

        getDeviceRequest(deviceId){
            getDetail(deviceId).then(res => {
                    // console.log(res)
                    if(res.status == 200){
                        this.data0 = res.data.data;
                        if(this.data0.deviceStatus){
                            this.statusType = 'success'
                            this.data0.deviceStatus = '已激活'
                        }else{
                            this.data0.deviceStatus = '未激活'
                        }
                    }
                });
                getDeviceById(deviceId).then(res=>{
                    console.log(res)
                    if(res.status == 200){
                    //   this.data0 = res.data;
                        this.deviceData.gatewayAddress = res.data.gatewayAddress;
                        this.deviceData.collectorAddress = res.data.collectorAddress;
                        this.deviceData.iccid = res.data.iccid;
                        console.log(this.deviceData)
                    }
                })
        },

        backToDevices(){
            this.$router.push({ path: '/deviceManagement/deviceList'})
        },
        handleClick() {
            // console.log(tab, event);
        },

        bindGateway(){
            this.dialogFormVisible = true;
            //下拉框清空
            this.optionAddress =[]
            getNoBindList().then(res=>{
                    // console.log(res)
                if(res.status == 200){
                    for(let i=0;i<res.data.length;i++){
                        let item = {}
                        item['label'] = res.data[i].gatewayAddress;
                        item['value'] = res.data[i].gatewayAddress;
                        // item['value'] = i;
                        this.optionAddress.push(item)
                    }

                    console.log(this.deviceData.gatewayAddress)
                    if(this.deviceData.gatewayAddress && this.deviceData.gatewayAddress !== ''){
                        //增加已绑定项 用于显示在选择框中
                        let item = {}
                        item['label'] = this.deviceData.gatewayAddress;
                        item['value'] = this.deviceData.gatewayAddress;
                        this.optionAddress.push(item)
                        //设置默认项为 已绑定项 默认项需为下拉选择项中的内容
                        this.formAddress = []
                        this.formAddress.push(this.deviceData.gatewayAddress)
                        // console.log(this.formAddress)
                        //锁定select框
                        this.selectDisabled = true
                        this.buttonName = '解 绑'
                    }else{
                        this.buttonName = '绑 定'
                    }
                    // console.log(this.optionAddress)
                }
                // this.optionAddress = res.data;
            })
        },

        handleBind(){
            console.log(this.formAddress)
            console.log(this.data0.deviceId)
            if(this.buttonName === '绑 定'){
                bindDeviceId(this.formAddress[0],this.data0.deviceId).then(res=>{
                    console.log(res)
                    if(res.status == 200){
                        this.$message({
                            type: "success",
                            message: "绑定成功!"
                        });
                        //下拉框清空
                        this.optionAddress =[]
                        this.dialogFormVisible = false
                        this.onload()
                    }
                },error=>{
                    console.log(error)
                })
            }else if(this.buttonName === '解 绑') {
                unbindDeviceId(this.formAddress[0]).then(res=>{
                    console.log(res)
                    if(res.status == 200){
                        this.$message({
                            type: "success",
                            message: "解绑成功!"
                        });
                        //解除锁定框
                        this.selectDisabled = false
                        //默认值清空
                        this.formAddress = []
                        //下拉框清空
                        this.optionAddress =[]
                        this.dialogFormVisible = false
                        this.onload()
                    }
                },error=>{
                    console.log(error)
                })
            }
        },

        cancel(){
            this.dialogFormVisible = false

            this.formAddress = []
            
        }
    },
    created(){
        console.log(this.$route.query.deviceId)
        // this.data0.deviceId = this.$route.query.deviceId;
        this.onload();
        // getDetail("12").then(res => {
        //         console.log(res)
        //         this.data0 = res.data.data;
        // });
    }
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
.tableRow{
    margin-bottom: 0px;
}
.tagListRow{
    margin-bottom: 5px;
}
.tagRow{
    margin-left: 10px;
}

.contentCenter{
    margin-top: 1em;
    display: flex;
    /* justify-content:center; */
    align-items:center;
    /* align-content:center; */
}

.itemCenter{
    display: flex;
    justify-content:center;
    /* align-items:center; */
    /* align-content:center; */
}

.iconStyle{
    font-size: 1.5em;
    color: #606266;
}

.iconStyle:hover{
    /* font-size: 1.5em; */
    color: #ffffff;
    background-color: #409eff;
}

</style>

<style lang="scss" scoped>
  .el-row {
    // margin-bottom: 20px;
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