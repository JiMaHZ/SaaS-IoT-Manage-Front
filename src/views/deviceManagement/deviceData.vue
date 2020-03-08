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
                <el-col :span="1"><div ><el-button type="primary" size="small" icon="el-icon-plus" @click="addKey">添加Key</el-button></div></el-col>
            </el-row>

            <div v-for="(row,i) in listTemp" :key= i >
                <el-row class="tagListRow">
                    <el-col :span="1"><div ></div></el-col>
                    <div  v-for="(tag,index) in row" :key="tag.deviceKey">
                        <el-col :span="2">
                            <el-tag 
                            class="tagPointer"
                            closable
                            @close="handleCloseTag(tag)"
                            @click="viewKey(tag,index)"
                            :type="'success'">
                            {{tag.deviceKey}}
                            </el-tag>
                        </el-col>
                    </div>
                </el-row>
            </div>

             <el-row style="margin-top:10px">
                <el-col :span="1"><div ></div></el-col>
                <el-col :span="4">
                    <div class="grid-content bg-blue-light tableFont">Key值属性{{dataSecond[0]&&dataSecond[0].deviceKey!=='———'?': '+dataSecond[0].deviceKey:''}}</div>
                </el-col>
                <el-col :span="6"><div ></div></el-col>
                <el-col :span="8"><div ></div></el-col>
                <!-- <el-col :span="1"><div ><el-button type="primary" size="small" icon="el-icon-plus">添加Key</el-button></div></el-col> -->
            </el-row>

            <!-- <el-row :gutter="20" class="contentCenter">
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
                
            </el-row> -->

            <el-row type="flex" justify="center" class="tableRow">
                <el-col :span="22">
                    <avue-crud :option="optionSecond"
                        :data="dataSecond"
                        v-model="formSecond"
                        :before-open="beforeOpen"
                        ref="crud">
                        <template slot-scope="scope" slot="menu">
                            <el-button size="small" @click.native="editData(scope.row,scope.index)" type="primary" plain>编辑</el-button>
                        </template>

                        <!-- <template slot-scope="{row}"
                            slot="clpp">
                            <el-tag>{{row.clpp}}</el-tag>
                        </template> -->
                    </avue-crud>
                </el-col >
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
                <el-button @click="cancelGatewayFirst">取 消</el-button>
                <el-button type="primary" @click="handleBind">{{buttonName}}</el-button>
            </div>
        </el-dialog>

        <el-dialog 
            title="属性配置"  
            :visible.sync="dialogFormVisibleSecond"
            :before-close="handleClose"
        >
            <!-- <avue-form ref="formSecond" v-model="dialogSecondForm" :option="dialogSecondOption">
                <template slot="menuForm">
                    <el-button type="primary" @click="handleSubmit">提 交</el-button>
                    <el-button  @click="handleEmpty">清 空</el-button>
                </template>
            </avue-form> -->
            <el-form ref="dialogSecondForm" :rules="ruleSecond" :model="dialogSecondForm" label-width="150px" >
                <!-- <el-row type="flex">
                    <el-col :span="12">
                        <el-form-item label="键">
                            <el-input v-model="dialogSecondForm.deviceKey"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="属性名">
                            <el-input v-model="dialogSecondForm.keyName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> -->
                <el-form-item label="键" prop="deviceKey">
                    <el-col :span="12">
                        <el-input v-model="dialogSecondForm.deviceKey" :disabled="dialogStatus =='edit'" placeholder="请输入键"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="属性名" prop="keyName">
                    <el-col :span="12">
                        <el-input v-model="dialogSecondForm.keyName" placeholder="请输入属性名"></el-input>
                    </el-col>
                </el-form-item>
                <!-- <el-form-item label="值范围" prop="min">
                    <el-col :span="6">
                    <el-input v-model="dialogSecondForm.min" style="width: 100%;" placeholder="最小边界值" ></el-input>
                    </el-col>
                    <el-col class="line" :span="1" :offset="0.5">&nbsp;～</el-col>
                    <el-col :span="6">
                    <el-input v-model="dialogSecondForm.max" style="width: 100%;" placeholder="最大边界值" ></el-input>
                    </el-col>
                </el-form-item> -->
                <el-row type="flex">
                    <el-col :span="12">
                        <el-form-item label="值范围" prop="min">
                            <el-input v-model="dialogSecondForm.min" style="width: 100%;" placeholder="最小边界值" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :pull="4">
                        <el-form-item label="～" prop="max">
                            <el-input v-model="dialogSecondForm.max" style="width: 100%;" placeholder="最大边界值"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="步长" prop="dataStep">
                    <el-col :span="12">
                    <el-input v-model="dialogSecondForm.dataStep" placeholder="请输入步长"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="设备数据范围" prop="dataOriginWidth">
                    <el-col :span="12">
                    <el-input v-model="dialogSecondForm.dataOriginWidth" placeholder="设备原始数据范围"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="单位" prop="unit">
                    <el-col :span="12">
                    <el-input v-model="dialogSecondForm.unit" placeholder="请输入单位"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="数据类型" prop="dataType">
                    <el-select v-model="dialogSecondForm.dataType" placeholder="请选择数据类型">
                        <el-option label="int32(整数型)" value="int"></el-option>
                        <el-option label="folat(单精度浮点型)" value="float"></el-option>
                        <el-option label="double(双精度浮点型)" value="double"></el-option>
                        <el-option label="bool(布尔型)" value="bool"></el-option>
                        <el-option label="text(字符串)" value="String"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="其他规则" prop="rule">
                    <el-col :span="16">
                        <el-input type="textarea" v-model="dialogSecondForm.rule" placeholder="请输入其他规则"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>    

            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('dialogSecondForm')" v-if="dialogStatus =='add'">重 置</el-button>
                <el-button @click="cancelSecond('dialogSecondForm')">取 消</el-button>
                <el-button type="primary" @click="submit(dialogSecondForm,'dialogSecondForm')">确 定</el-button>
            </div>
        </el-dialog>

    </basic-container>
</template>

<script>
// import mailTable from '@/components/utils/tableComponent.vue' v-if="index < 10"
import {getDetail} from "@/api/iot/devicestatus";
import {getDeviceById,getNoBindList,bindDeviceId,unbindDeviceId} from "@/api/iot/devices"; //网关相关
import {saveOrUpdateDeviceKey,getDeviceKeyList,removeDeviceKey} from "@/api/iot/devices";      //key相关

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

            optionSecond: {
                tip: false,
                border: true,
                index: false,
                addBtn: false,
                selection: false,
                //表内按钮
                viewBtn: false,
                delBtn:false,
                editBtn:false,
                menuWidth:180,
                align:'center',
                column: [
                    {
                        label: "键/Key",
                        prop: "deviceKey",
                        // hide:true,
                        // editDisabled:true,
                        rules: [{
                            required: true,
                            message: "请输入设备编号",
                            trigger: "blur"
                        }]
                    },
                    {
                        label: "属性名/Name",
                        prop: "keyName",
                        // hide:true,
                        // editDisabled:true,
                        rules: [{
                            required: true,
                            message: "请输入设备编号",
                            trigger: "blur"
                        }]
                    },
                    {
                        label: "值范围/range",
                        prop: "valueRange",
                        // hide:true,
                        // editDisabled:true,
                        rules: [{
                            required: true,
                            message: "请输入设备编号",
                            trigger: "blur"
                        }]
                    },
                    {
                        label: "单位/unit",
                        prop: "unit",
                        // hide:true,
                        // editDisabled:true,
                        rules: [{
                            required: true,
                            message: "请输入设备编号",
                            trigger: "blur"
                        }]
                    },
                ],
            },
            dataSecond:[
                {
                    deviceKey:'———',
                    keyName:'———',
                    valueRange:"———",
                    unit:'———'
                },
                // {
                //     deviceKey:'0900',
                //     keyName:'水流量',
                //     valueRange:"1~9",
                //     unit:'m3/s'
                // }
            ],
            formSecond:[  
            ],
            dialogFormVisibleSecond: false,
            dialogStatus:'add',
            // ruleTip:false,
            dialogSecondForm: {
                deviceId:'',
                deviceKey:'',
                keyName:'',
                min:'',
                max:'',
                dataStep:'',
                dataOriginWidth:'',
                unit:'',
                dataType:'',
                rule:''
            },
            ruleSecond:{
                deviceKey:[{ required: true, message: '请输入键', trigger: 'blur' }],
                keyName:[{ required: true, message: '请输入属性名', trigger: 'blur' }],
                unit:[{ required: true, message: '请输入单位', trigger: 'blur' }],
                dataType:[{ required: true, message: '请输入数据类型', trigger: 'blur' }]
            },
            dialogSecondOption: {
                emptyBtn: false,
                submitBtn:false,  
                column: [
                    {
                        label: "键",
                        prop: "deviceKey",
                        // hide:true,
                        row: true,
                        // editDisabled:true,
                        rules: [{
                            required: true,
                            message: "请输入设备编号",
                            trigger: "blur"
                        }]
                    },
                    {
                        label: "属性名",
                        prop: "keyName",
                        // hide:true,
                        // editDisabled:true,
                        rules: [{
                            required: true,
                            message: "请输入设备编号",
                            trigger: "blur"
                        }]
                    },
                    
                ]
            },
            
            tableData: [
                {key: '单号', value: '1001'},
                {key: '商品名称', value: '篮球'},
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
                
                // { name: '0920', type: 'success' },
            ],
            tagIndex: 0,

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
                list[i]['index'] = i;
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

            getDeviceKeyList(deviceId).then(res=>{
                console.log(res)
                if(res.data.code == 200){
                    this.tags = []
                    this.tags = res.data.data
                    // res.data.data.forEach(element => {
                    //     tags[name] = element.deviceKey

                        // let obj = {}
                        // obj[element.deviceKey] = element;
                        // this.tags.push(obj)

                        // this.tags.push({
                        //     name : element.deviceKey,
                        //     type : 'success'
                        // })
                    // });
                    // console.log("tag")
                    // console.log(this.tags)
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

        cancelGatewayFirst(){
            this.dialogFormVisible = false

            this.formAddress = []
            
        },

        editData(row,index){   
            this.dialogStatus = 'edit'
            this.dialogFormVisibleSecond = true;
            // this.dialogSecondForm = this.tags[row.index]
            this.dialogSecondForm = this.tags[this.tagIndex]
            // this.tagIndex = row.index; //确认当前key的Index
            console.log(row)
            console.log(index)

        },

        addKey(){
            this.dialogStatus = 'add';
            this.initDiaglog()
            this.dialogFormVisibleSecond = true;
        },
        initDiaglog(){
            this.dialogSecondForm={
                deviceId:this.data0.deviceId,
                deviceKey:'',
                keyName:'',
                min:'',
                max:'',
                dataStep:'',
                dataOriginWidth:'',
                unit:'',
                dataType:'',
                rule:''
            }
        },
        submit(form,formName){
            console.log(form);
            this.$refs[formName].validate((valid) => {
            if (valid) {
                // alert('submit!');
                saveOrUpdateDeviceKey(form).then(res=>{
                    console.log(res)
                    if(res.status == 200){
                        this.$message({
                            type: "success",
                            message: "添加成功!"
                        });
                    
                        getDeviceKeyList(this.$route.query.deviceId).then(res=>{
                            console.log(res)
                            if(res.data.code == 200){
                                // this.tags = []
                                this.tags = res.data.data
                                // this.viewKey(this.tags[this.tagIndex],this.tagIndex)
                                this.dataSecond = [{
                                    deviceKey: this.tags[this.tagIndex].deviceKey,
                                    keyName:this.tags[this.tagIndex].keyName,
                                    valueRange: this.tags[this.tagIndex].min?this.tags[this.tagIndex].min+'~'+this.tags[this.tagIndex].max:'——',
                                    unit: this.tags[this.tagIndex].unit?this.tags[this.tagIndex].unit:'——',
                                    // index:this.tags[this.tagIndex].index
                                }]
                            }
                        })
                    }
                    this.dialogFormVisibleSecond = false;
                })
            } else {
                console.log('请填写完整！');
                // this.$message({
                //     type: "danger",
                //     message: "请填写完整!"
                // });
                this.$message.error('请填写完整！');
                return false;
            }
            });
            
        },
        cancelSecond(form){
            if( this.dialogStatus === 'add'){
                this.$nextTick(()=>{
                    this.$refs[form].resetFields(); //待解决
                })
            }
            this.dialogFormVisibleSecond = false;
        },
        handleClose(){
            if( this.dialogStatus === 'add'){
                this.$nextTick(()=>{
                    this.$refs['dialogSecondForm'].resetFields(); //待解决
                })
            }
            this.dialogFormVisibleSecond = false;
        },
        resetForm(form){
            console.log(form)
            this.$nextTick(()=>{
                 this.$refs[form].resetFields(); //待解决
            })
            this.initDiaglog()
            // if (this.$refs[form] !== undefined) {
            //     this.$refs[form].resetFields();
            // }
            // this.$refs[form].resetFields(); 待解决
        },
        viewKey(tag,index){
            console.log(tag)
            console.log(index)
            this.tagIndex = tag.index; //确认当前key的Index
            this.dataSecond = [{
                deviceKey: tag.deviceKey,
                keyName:tag.keyName,
                valueRange: tag.min?tag.min+'~'+tag.max:'——',
                unit: tag.unit?tag.unit:'——',
                index:tag.index
            }]
        },
        handleCloseTag(tag){
            this.$confirm('确认要删除这个key(属性)吗, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                removeDeviceKey(this.$route.query.deviceId,tag.deviceKey).then(res=>{
                    console.log(res)
                    if(res.data.code === 200){
                        this.tags.splice(tag.index,1)
                        this.$message({
                            type: 'success',
                            message: '成功删除 '+tag.deviceKey+' !'
                        });
                    }
                })
            }).catch(() => {

            });
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

.tagPointer{
    cursor: pointer;
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