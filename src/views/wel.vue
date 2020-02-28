<template>
  <basic-container>
    <avue-data-box :option="option"></avue-data-box>
  </basic-container>
</template>

<script>
  export default {
  data(){
    return {
      option: {
        span:8,
        data: [
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            title: '创建设备数量',
            count: 1,
            icon: 'el-icon-view',
            color: 'rgb(49, 180, 141)',
            // href:'https://avuejs.com',
            target:'_blank'
          },
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            title: '在线设备数量',
            count: 1,
            icon: 'el-icon-upload',
            color: 'rgb(56, 161, 242)',
            // href:'https://avuejs.com',
            target:'_blank'
          },
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            title: '异常设备数量',
            count: 0,
            icon: 'el-icon-warning',
            color: 'rgb(117, 56, 199)',
            // href:'https://avuejs.com',
            target:'_blank'
          },
          // {
          //   click: function (item) {
          //     alert(JSON.stringify(item));
          //   },
          //   title: '权限管理',
          //   count: 2223,
          //   icon: 'el-icon-setting',
          //   color: 'rgb(117, 56, 199)',
          //   href:'https://avuejs.com',
          //   target:'_blank'
          // },
        ]
      },
    }
  }
}
</script>

