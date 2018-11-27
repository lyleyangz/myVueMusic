/* eslint-disable no-undefined */
<template>
    <div id="main" class="app-main">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                theme: this.$store.state.app.themeColor
            };
        },
        created() {
            document.title = '澳绿宝溯源项目管理后台';
        },
        mounted () {

        },
        beforeDestroy () {

        },
        methods: {
            
        }
    };
</script>

<style>
@import '../src/common/styles/common.less';
@import '../src/common/styles/reset.css';
html,body{
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
}
.app-main{
    width: 100%;
    height: 100%;
    /* color: #333333;
    font-size: 14px; */
}
</style>
<style>
    .list-title .ivu-table-column-left {
        text-align: center !important;
    }
    .ivu-input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        font-size: 12px !important;
        color: #bbbec4 !important;
        font-family: 'MicroSoft YaHei';
    }
    .ivu-input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        font-size: 12px !important;
        color: #bbbec4 !important;
        font-family: 'MicroSoft YaHei';
    }
    .ivu-input::-moz-placeholder { /* Mozilla Firefox 19+ */
        font-size: 12px !important;
        color: #bbbec4 !important;
        font-family: 'MicroSoft YaHei';
    }
    .ivu-input:-ms-input-placeholder { /* Internet Explorer 10-11 */
        font-size: 12px !important;
        color: #bbbec4 !important;
        font-family: 'MicroSoft YaHei';
    }
</style>

