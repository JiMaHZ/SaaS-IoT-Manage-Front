<template>
  <basic-container>
    <el-row :span="24">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/wel/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item >垃圾桶监测</el-breadcrumb-item>
        <!-- <el-breadcrumb-item >test01</el-breadcrumb-item> -->
        <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
      </el-breadcrumb>
    </el-row >

    <el-row :span="24" class="tableRow">
      <el-col :span="2">
          <p></p>
      </el-col>  
      <el-col :span="6">
        <p class="deviceName">垃圾桶监测</p>
        <!-- <avue-select v-model="form" placeholder="请选择内容"  :option="option1" type="tree" :dic="dic"></avue-select> -->
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2"><p></p></el-col>  
      <el-col :span="4" >
        <div class="numList">
          <img class="img" :src="imagelist" alt=""/>
          <p class="numTitle">设备总数</p>
          <span class="splitLine" />
          <p class="num">4</p>
          <!-- <img class="img" src="@/images/page/Image003.png" alt=""/> -->
        </div>
        <!-- <avue-data-display :option="option"></avue-data-display> -->
      </el-col>
      <el-col :span="4" >
        <div class="numList">
          <img class="img" :src="imagelist" alt=""/>
          <p class="numTitle">今日在线</p>
          <span class="splitLine" />
          <p class="num" style="color:#67C23A">1</p>
          <!-- <img class="img" src="@/images/page/Image003.png" alt=""/> -->
        </div>
        <!-- <avue-data-display :option="option"></avue-data-display> -->
      </el-col>
      <el-col :span="4" >
        <div class="numList">
          <img class="img" :src="imagelist" alt=""/>
          <p class="numTitle">垃圾已满</p>
          <span class="splitLine" />
          <p class="num" style="color:red">0</p>
          <!-- <img class="img" src="@/images/page/Image003.png" alt=""/> -->
        </div>
        <!-- <avue-data-display :option="option"></avue-data-display> -->
      </el-col>
    </el-row >

    <!-- <el-row :span="24">
        <el-button size="small" type="primary" icon="el-icon-plus">新增</el-button>
    </el-row> -->

    <!-- <el-row :span="24">
      <el-col :span="4">
        <p></p>
      </el-col>
      <el-col :span="12">
        <el-table
          :data="tableData2"
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
        </el-col >
    </el-row> -->

  <el-row type="flex" justify="center">
    <el-col :span="22">
      <avue-crud :option="option1"
                :table-loading="loading"
                :data="data1"
                :page="page"
                :permission="permissionList"
                :before-open="beforeOpen"
                v-model="form"
                ref="crud"
                @row-update="rowUpdate"
                @row-save="rowSave"
                @row-del="rowDel"
                @search-change="searchChange"
                @search-reset="searchReset"
                @selection-change="selectionChange"
                @current-change="currentChange"
                @size-change="sizeChange"
                @on-load="onLoad">
        <template slot="menuLeft">
          <el-button type="danger"
                    size="small"
                    icon="el-icon-delete"
                    plain
                    v-if="permission.ashbin_delete"
                    @click="handleDelete">删 除
          </el-button>
        </template>
      </avue-crud>
    </el-col >
  </el-row>
    
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/iot/devicestatus";
  // import {getUploadData} from "@/api/iot/uploaddata";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        imagelist: require('@/images/page/Image003.png'),
        option: {
          // labelPosition: right,
          span:6,
          data: [
            {
                click: function (item) {
                  alert(JSON.stringify(item));
                },
                count: 2,
                title: '设备总数',
                // href:'https://avuejs.com',
                // target:'_blank'
              },
              {
                click: function (item) {
                  alert(JSON.stringify(item));
                },
                count: '1',
                title: '今日在线',
                // href:'https://avuejs.com',
                // target:'_blank'
              },
              {
                click: function (item) {
                  alert(JSON.stringify(item));
                },
                color: 'red',
                count: '0',
                title: '垃圾已满',
                // href:'https://avuejs.com',
                // target:'_blank'
              },
              
            ]
        },
        options: [{
          label:'全部',
          value:0
        // },{
        //   label:'设备1',
        //   value:1
        }
        ],
        value: 0,

        form: {},
        query: {},
        loading: true,
        page: {
          pageSizes: [5,10, 20, 30, 40,50,100],
          pageSize: 5,
          currentPage: 1,
          total: 0
        },
        selectionList: [],
        option1: {
          tip: false,
          border: true,
          index: true,
          viewBtn: true,
          selection: true,
          align: 'center',
          column: [
            {
              label: "设备名",
              prop: "deviceName",
              search: true,
              rules: [{
                required: true,
                message: "请输入设备id",
                trigger: "blur"
              }]
            },
            {
              label: "设备id",
              prop: "deviceId",
              rules: [{
                required: true,
                message: "请输入设备id",
                trigger: "blur"
              }]
            },
            {
              label: "设备激活状态",
              prop: "deviceStatus",
              // search: true,
              // row: true,
              rules: [{
                required: true,
                message: "请输入设备状态",
                trigger: "blur"
              }],
              type:'switch',
              displayAs:'switch'
            },
            {
              label: "最后上传时间",
              prop: "lastUpdateTime",
                // row: true,
              width: 100,
              rules: [{
                required: true,
                message: "请输入最后上传时间",
                trigger: "blur"
              }]
            },
            {
              label: "创建时间",
              prop: "createTime",
              hide: true,
              rules: [{
                required: true,
                message: "请输入创建时间",
                trigger: "blur"
              }]
            },
          ]
        },
        data1: []

      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.devicestatus_add, true),
          viewBtn: this.vaildData(this.permission.devicestatus_view, true),
          delBtn: this.vaildData(this.permission.devicestatus_delete, true),
          editBtn: this.vaildData(this.permission.devicestatus_edit, true)
        };
      },
      ids() {
        let ids = [];
        this.selectionList.forEach(ele => {
          ids.push(ele.id);
        });
        return ids.join(",");
      }
    },
    methods: {
      rowSave(row, loading, done) {
        console.log("save")
        add(row).then(() => {
          loading();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        }, error => {
          done();
          console.log(error);
        });
      },
      rowUpdate(row, index, loading, done) {
        console.log("update")
        update(row).then(() => {
          loading();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        }, error => {
          done();
          console.log(error);
        });
      },
      rowDel(row) {
        console.log("rowdel")
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(row.id);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
      },
      handleDelete() {
        console.log("handleDel")
        if (this.selectionList.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(this.ids);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.$refs.crud.toggleSelection();
          });
      },
      beforeOpen(done, type) {
        console.log("beforeopen")
        // console.log(this.form)
        if (["edit"].includes(type)) {
          // console.log("bianji")
          getDetail(this.form.deviceId).then(res => {
            this.form = res.data.data;
          });
          done();
        }else if(["view"].includes(type)){
          // console.log("查看");
          this.$router.push({ path: '/productShow/ashbin/ashbinData',query: { deviceId: this.form.deviceId } })
          // this.$router.push({ path: '/discharge/query', query: { vin: vin } })
          // done();
        }
        
      },
      searchReset() {
        // console.log("sreset")
        this.query = {};
        this.onLoad(this.page);
      },
      searchChange(params) {
        // console.log("searchchange")
        this.query = params;
        this.onLoad(this.page, params);
      },
      selectionChange(list) {
        // console.log("selectchange")
        this.selectionList = list;
      },
      selectionClear() {
        // console.log("selectclear")
        this.selectionList = [];
        this.$refs.crud.toggleSelection();
      },
      currentChange(currentPage){
        // console.log("currentChange")
        this.page.currentPage = currentPage;
      },
      sizeChange(pageSize){
        // console.log("sizeChange")
        this.page.pageSize = pageSize;
      },
      onLoad(page, params = {}) {
        // console.log("onload")
        this.loading = true;
        this.query['deviceType'] = '垃圾桶'
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
          const data = res.data.data;
          this.page.total = data.total;
          this.data1 = data.records;
          this.loading = false;
          this.selectionClear();
        });

        // getUploadData('121124','0B00').then(res=>{
        //   console.log(res)
        // })
      }
    }
  };
</script>

<style scoped>
.dataBlock{
  display: inline-block;
  width: 700px;
}
.deviceName{
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 10px;
  margin-top: 25px;
}
.img{
  width: 100px;
  height: 100px;
  background-color: azure;
}

.numList{
  display: flex;
  flex-direction: column;
  /* align-content: center; */
  align-items: center;
  text-align: center;
}
.splitLine {
    display: block;
    margin: 0 auto;
    width: 24px;
    height: 1px;
    background: #9B9B9B;
}
.numTitle{
  font-size: 20px;
  margin: 0px;
  /* line-height: 32px; */
  color: #999;
}
.num{
  margin-top: 10px; 
  margin-bottom: 0px;
  color: #409EFF;
  font-size: 32px;
}
.tableRow{
    margin-bottom: 0px;
}
</style>