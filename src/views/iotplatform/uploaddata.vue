<template>
  <basic-container>
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
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
                   v-if="permission.uploaddata_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/iotplatform/uploaddata";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
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
        option: {
          tip: false,
          border: true,
          index: true,
          viewBtn: true,
          selection: true,
          delBtn: true,
          editBtn: true,
          menuWidth:120,
          align: "center",
          column: [
            // {
            //   label: "",
            //   prop: "id",
            //   rules: [{
            //     required: true,
            //     message: "请输入",
            //     trigger: "blur"
            //   }]
            // },
            {
              label: "网关地址",
              prop: "gatewayAddress",
              search: true,
              // gutter: 12,
              labelWidth: 120,
              span: 24,
              rules: [{
                required: true,
                message: "请输入网关地址",
                trigger: "blur"
              }]
            },
            {
              label: "采控器地址",
              prop: "collectorAddress",
              search: true,
              labelWidth: 120,
              span: 24,
              rules: [{
                required: true,
                message: "请输入采控器地址",
                trigger: "blur"
              }]
            },
            {
              label: "命令",
              prop: "command",
              labelWidth: 120,
              rules: [{
                required: true,
                message: "请输入命令",
                trigger: "blur"
              }]
            },
            {
              label: "设备键",
              prop: "deviceKey",
              rules: [{
                required: true,
                message: "请输入设备键",
                trigger: "blur"
              }]
            },
            {
              label: "设备键",
              prop: "deviceValue",
              labelWidth: 120,
              span: 24,
              rules: [{
                required: true,
                message: "请输入设备键",
                trigger: "blur"
              }]
            },
            {
              label: "上传时间",
              prop: "uploadTime",
              labelWidth: 120,
              width: 98,
              rules: [{
                required: true,
                message: "请输入上传时间",
                trigger: "blur"
              }]
            },
            {
              label: "远程连接地址",
              prop: "remoteAddress",
              labelWidth: 120,
              span: 24,
              rules: [{
                required: true,
                message: "请输入远程连接地址",
                trigger: "blur"
              }]
            },
          ]
        },
        data: []
      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.uploaddata_add, false),
          viewBtn: this.vaildData(this.permission.uploaddata_view, true),
          delBtn: this.vaildData(this.permission.uploaddata_delete, false),
          editBtn: this.vaildData(this.permission.uploaddata_edit, false)
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
        if (["edit", "view"].includes(type)) {
          getDetail(this.form.id).then(res => {
            this.form = res.data.data;
          });
        }
        done();
      },
      searchReset() {
        this.query = {};
        this.onLoad(this.page);
      },
      searchChange(params) {
        this.query = params;
        this.onLoad(this.page, params);
      },
      selectionChange(list) {
        this.selectionList = list;
      },
      selectionClear() {
        this.selectionList = [];
        this.$refs.crud.toggleSelection();
      },
      currentChange(currentPage){
        this.page.currentPage = currentPage;
      },
      sizeChange(pageSize){
        this.page.pageSize = pageSize;
      },
      onLoad(page, params = {}) {
        this.loading = true;
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
          const data = res.data.data;
          this.page.total = data.total;
          this.data = data.records;
          this.loading = false;
          this.selectionClear();
        });
      }
    }
  };
</script>

<style>
</style>
