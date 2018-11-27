<style lang="less" scoped>
    @import '../../../common/styles/common.less';
    @import 'upload.less';
</style>


<template>
    <div class="block">
        <div class="demo-upload-list" v-for="(item,index) of uploadList" :key="index">
            <img :src="item.url" >
            <div class="demo-upload-list-cover">
                <Icon type="ios-trash-outline" @click.native="handleRemove(item,index)"></Icon>
            </div>
        </div>
        <Upload :headers="headers" ref="upload" :show-upload-list="false" :format="['jpg','jpeg','png']" :max-size="10240" :on-success="handleSuccess" :before-upload="handleBeforeUpload" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" type="drag" :action="action" style="display: inline-block;width:58px;" :data="params">
            <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20"></Icon>
            </div>
        </Upload>
    </div>
</template>

<script>
export default {
    name: 'my-upload',
    props: {
        uploadList:{
            type: Array,
            default: function () {
                return []
            }
        },
        maxSize:{
            type: Number,
            default: function () {
                return 1
            }
        },
        action:{
            type: String,
            default: function(){
                return "http://albups.xsl.one/service/app/upload/img"
            }
        },
        add:{
            type: Function,
            default: function(){
                
            }
        },
        remove:{
            type: Function,
            default: function(){
                
            }
        },
        params:{
            type: Object,
            default: function(){
                return {
                   
                }
            }
        }
    },
    data () {
        return {
            headers:{},
           
        };
    },
    methods: {
        handleBeforeUpload(file) {
            if(this.maxSize >0){
                const check = this.uploadList.length < this.maxSize;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 '+this.maxSize+' 张图片。'
                    });
                    return false;
                }
            }
        },
        handleRemove(file,index) {
            this.uploadList.splice(this.uploadList.indexOf(file), 1);
            this.remove(index)
        },
        handleSuccess (res, file) {  
            if(res && res.code == 0){
                this.uploadList.push({
                    url:res.result.url,
                    id: res.id || ''
                })
                this.add(res.id,res.data);
            }
        },  
        handleFormatError(file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。',
                duration: 3
            })
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: '超出文件大小限制',
                desc: '文件 ' + file.name + ' 太大，不能超过 10M。',
                duration: 3
            })
        }
    },
    mounted () {
        // this.headers={
        //     "transaction-token": sessionStorage.getItem("token")
        // }
    }
};
</script>
