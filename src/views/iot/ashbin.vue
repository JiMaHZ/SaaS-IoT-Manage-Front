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
                   v-if="permission.ashbin_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/iot/ashbin";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        form: {},
        query: {},
        loading: true,
        page: {
          pageSize: 10,
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
          column: [
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
              label: "设备名称",
              prop: "deviceName",
              search: true,
              rules: [{
                required: true,
                message: "请输入设备名称",
                trigger: "blur"
              }]
            },
            {
              label: "设备信息",
              prop: "additionalInfo",
              rules: [{
                required: true,
                message: "请输入设备信息",
                trigger: "blur"
              }]
            },
            {
              label: "垃圾桶状态",
              prop: "ashbinStatus",
              rules: [{
                required: true,
                message: "请输入垃圾桶状态",
                trigger: "blur"
              }]
            },
            {
              label: "总压",
              prop: "pOrigin",
              rules: [{
                required: true,
                message: "请输入总压",
                trigger: "blur"
              }]
            },
            {
              label: "分压(数组)",
              prop: "pBranch",
              rules: [{
                required: true,
                message: "请输入分压(数组)",
                trigger: "blur"
              }]
            },
            {
              label: "用户id",
              prop: "userId",
              rules: [{
                required: true,
                message: "请输入用户id",
                trigger: "blur"
              }]
            },
            {
              label: "最后上传时间",
              prop: "lastUpdateTime",
              rules: [{
                required: true,
                message: "请输入最后上传时间",
                trigger: "blur"
              }]
            },
            {
              label: "创建时间",
              prop: "createTime",
              rules: [{
                required: true,
                message: "请输入创建时间",
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
          addBtn: this.vaildData(this.permission.ashbin_add, false),
          viewBtn: this.vaildData(this.permission.ashbin_view, false),
          delBtn: this.vaildData(this.permission.ashbin_delete, false),
          editBtn: this.vaildData(this.permission.ashbin_edit, false)
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
        console.log('beforeopen')
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
        console.log(params)
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
        console.log('onload')
        // this.query['deviceType'] = '垃圾桶'
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
          console.log(this.query)
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
