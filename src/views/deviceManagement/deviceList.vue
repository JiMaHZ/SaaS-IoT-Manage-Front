<template>
  <basic-container>
    <el-row :span="24">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/wel/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item >设备列表</el-breadcrumb-item>
        <!-- <el-breadcrumb-item >test01</el-breadcrumb-item> -->
        <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
      </el-breadcrumb>
    </el-row >

    <el-row :span="24">
      <el-col :span="2">
          <p></p>
      </el-col>  
      <el-col :span="6">
        <p class="deviceName">设备</p>
        <!-- <avue-select v-model="form" placeholder="请选择内容"  :option="option1" type="tree" :dic="dic"></avue-select> -->
        <!-- <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>  
        </el-select> -->
      </el-col>
      <el-col :span="16">
        <avue-data-display :option="option"></avue-data-display>
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
                    v-if="permission.devicestatus_delete"
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
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
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
                title: '激活设备',
                // href:'https://avuejs.com',
                // target:'_blank'
              },
              {
                click: function (item) {
                  alert(JSON.stringify(item));
                },
                count: '0',
                title: '当前在线',
                // href:'https://avuejs.com',
                // target:'_blank'
              },
            ]
        },
        options: [{
          label:'全部',
          value:0
        },{
          label:'设备1',
          value:1
        }],
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
          filterMultiple: false,
          // defaultExpandAll:true,
          align: 'center',
          column: [
            {
              label: "设备名",
              prop: "deviceName",
              search: true,
              labelWidth: 120,
              span: 24,
              row: true,
              rules: [{
                required: true,
                message: "请输入设备id",
                trigger: "blur"
              }]
            },
            {
              label: "设备id",
              prop: "deviceId",
              addDisplay: false,
              editDisabled: true,
              labelWidth: 120,
              span: 24,
              row: true,
              width:160,
              rules: [{
                required: false,
                message: "请输入设备id",
                trigger: "blur"
              }]
            },
            {
              label: "设备类型",
              prop: "deviceType",
              search: true,
              // addDisplay: false,
              labelWidth: 120,
              span: 12,
              // editDisabled: true,
              width: 110,
              // row: true,
              // rules: [{
              //   required: true,
              //   message: "请输入设备状态",
              //   trigger: "blur"
              // }]
              type:'select',
              dicData:[{
                  label:'垃圾桶',
                  value:'垃圾桶'
                },{
                  label:'厕所',
                  value:'厕所'
                }]
            },
            {
              label: "设备激活状态",
              prop: "deviceStatus",
              // search: true,
              addDisplay: false,
              labelWidth: 120,
              span: 12,
              editDisabled: true,
              width: 110,
              // row: true,
              // rules: [{
              //   required: true,
              //   message: "请输入设备状态",
              //   trigger: "blur"
              // }]
              type:'switch',
              displayAs:'switch'
            },
            {
              label: "远程连接地址",
              prop: "remoteAddress",
              hide: true,
              addDisplay: false,
              editDisabled: true,
              labelWidth: 120,
              span: 12,
              // row: true,
              rules: [{
                required: false,
                message: "请输入远程连接地址",
                trigger: "blur"
              }]
            },
            {
              label: "最后上传时间",
              prop: "lastUpdateTime",
              editDisabled: true,
                // row: true,
              addDisplay: false,
              labelWidth: 120,
              span: 12,
              type: "date",
              format: "yyyy-MM-dd HH:mm:ss",
              valueFormat: "yyyy-MM-dd hh:mm:ss",
              width: 100,
              rules: [{
                required: false,
                message: "请输入最后上传时间",
                trigger: "blur"
              }]
            },
            {
              label: "创建时间",
              prop: "createTime",
              type: "date",
              addDisplay: false,
              editDisabled: true,
              labelWidth: 120,
              span: 12,
              format: "yyyy-MM-dd HH:mm:ss",
              valueFormat: "yyyy-MM-dd hh:mm:ss",
              hide: true,
              rules: [{
                required: false,
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
        add(row).then((res) => {
          console.log(res)
          if(res.data.code == 200){
            loading();
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          }else{
            // console.log(res);
            this.$message({
              type: "error",
              message: res.data.msg
            });
            // setTimeout(()=>{
            //   done();
            //   // this.$message.success('3秒后关闭表单')
            // },1000)
            // loading();
            done();
          }
          
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
        console.log(row)
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(row.deviceId);
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
        // console.log("beforeopen")
        // console.log(type)
        // console.log(this.form)
        if (["edit"].includes(type)) {
          console.log("bianji")
          getDetail(this.form.deviceId).then(res => {
            this.form = res.data.data;
          });
          done();
        }else if(["view"].includes(type)){
          console.log("查看");
          this.$router.push({ path: '/deviceManagement/deviceData',query: { deviceId: this.form.deviceId } })
          // this.$router.push({ path: '/discharge/query', query: { vin: vin } })
          // done();
        }else if(["add"].includes(type)){
          console.log("新增")
          // add(this.form).then(() => {
          //   // loading();
          //   this.onLoad(this.page);
          //   this.$message({
          //     type: "success",
          //     message: "操作成功!"
          //   });
          // }, error => {
          //   done();
          //   console.log(error);
          // });
          done()
        }
        
      },
      searchReset() {
        console.log("sreset")
        this.query = {};
        this.onLoad(this.page);
      },
      searchChange(params) {
        console.log("searchchange")
        this.query = params;
        this.onLoad(this.page, params);
      },
      selectionChange(list) {
        console.log("selectchange")
        this.selectionList = list;
      },
      selectionClear() {
        console.log("selectclear")
        this.selectionList = [];
        this.$refs.crud.toggleSelection();
      },
      currentChange(currentPage){
        console.log("currentChange")
        this.page.currentPage = currentPage;
      },
      sizeChange(pageSize){
        console.log("sizeChange")
        this.page.pageSize = pageSize;
      },
      onLoad(page, params = {}) {
        // console.log("onload")
        this.loading = true;
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
          console.log(res)
          const data = res.data.data;
          this.page.total = data.total;
          this.data1 = data.records;
          this.loading = false;
          this.selectionClear();
        });
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
</style>