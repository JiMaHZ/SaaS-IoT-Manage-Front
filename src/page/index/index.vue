<template>
  <div class="avue-contail"
       :class="{'avue--collapse':isCollapse}">
    <div class="avue-header">
      <!-- 顶部导航栏 -->
      <top />
    </div>

    <div class="avue-layout">
      <div class="avue-left">
        <!-- 左侧导航栏 -->
        <sidebar />
      </div>
      <div class="avue-main">
        <!-- 顶部标签卡 -->
        <tags />
        <!-- 主体视图层 -->
        <el-scrollbar style="height:100%">
          <keep-alive>
            <router-view class="avue-view"
                         v-if="$route.meta.keepAlive" />
          </keep-alive>
          <router-view class="avue-view"
                       v-if="!$route.meta.keepAlive" />
        </el-scrollbar>

      </div>
    </div>

    <!-- <el-footer class="avue-footer"> -->
    <!-- <div class="avue-footer " z-index="99">
      <img src="/svg/logo.svg"
           alt=""
           class="logo">
      <p class="copyright">© 2018 Avue designed by smallwei</p>
    </div>  -->

    <div class="footer">
        <p class="copyright">© 2020 浙ICP备20003474号-1</p>
    </div>

    <!-- </el-footer>  -->
    <div class="avue-shade"
         @click="showCollapse">
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import tags from "./tags";
import top from "./top/";
import sidebar from "./sidebar/";
import admin from "@/util/admin";
// import { validatenull } from "@/util/validate";
// import { calcDate } from "@/util/date.js";
// import { getStore } from "@/util/store.js";
export default {
  components: {
    top,
    tags,
    sidebar
  },
  name: "index",
  data() {
    return {
      //刷新token锁
      refreshLock: false,
      //刷新token的时间
      refreshTime: ""
    };
  },
  created() {
    //实时检测刷新token
    this.refreshToken();
  },
  mounted() {
    this.init();
  },
  computed: mapGetters(["isLock", "isCollapse", "website"]),
  props: [],
  methods: {
    showCollapse() {
      this.$store.commit("SET_COLLAPSE");
    },
    // 屏幕检测
    init() {
      this.$store.commit("SET_SCREEN", admin.getScreen());
      window.onresize = () => {
        setTimeout(() => {
          this.$store.commit("SET_SCREEN", admin.getScreen());
        }, 0);
      };
    },
    // 10分钟检测一次token
    refreshToken() {
      /*this.refreshTime = setInterval(() => {
        const token = getStore({
          name: "token",
          debug: true
        });
        const date = calcDate(token.datetime, new Date().getTime());
        if (validatenull(date)) return;
        if (!(date.seconds >= this.website.tokenTime) && !this.refreshLock) {
          this.refreshLock = true;
          this.$store
            .dispatch("RefeshToken")
            .then(() => {
              this.refreshLock = false;
            })
            .catch(() => {
              this.refreshLock = false;
            });
        }
      }, 10000);*/
    }
  }
};
</script>

<style scoped>
.footer {
  font-size: 10px;
  /* line-height: 20px; */
  /* margin-bottom: 10px; */
  margin-bottom: 0px;
  border: 0px;
  position: fixed;
  left: 0%;
  bottom: 0px;
  width: 100%;
  height: 20px;
  background-color: rgb(236, 233, 233,0.5);
  z-index: 10;
  text-align: center;
}
.copyright{
  margin: 0;
}
</style>