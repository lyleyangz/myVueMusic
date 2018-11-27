<style lang="less">
    @import '../../../common/styles/common.less';
    @import 'wangeditor.less';
</style>


<template>
    <span class="noticeCount" style="width:90%"> 
        <span ref="editorElem" :id="editorId"></span>
    </span>
</template>

<script>
import E from 'wangeditor';
export default {
    name: 'my-wangeditor',
    props: {
        editorId:{
            type: String,
            default: function () {
                return "editorElem"
            }
        },
        content: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    data () {
        return {
            headers:{},
           
        };
    },
    methods: {
        init(){
            this.editor = new E('#'+this.editorId);
            // this.editor.customConfig.uploadImgShowBase64 = true;   // 使用 base64 保存图片
            this.editor.customConfig.uploadImgMaxLength = 10;//限制图片上传数量：10张
            this.editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024;//限制每张图片上传大小：1M
            this.editor.customConfig.uploadImgServer = 'http://albups.xsl.one/service/app/upload/img';
            this.editor.customConfig.uploadImgTimeout = 20000;
            this.editor.customConfig.uploadFileName = 'file';
            // let token = localStorage.getItem('token');
            // if (token) {
            //     this.editor.customConfig.uploadImgHeaders = {
            //         'token': token
            //     }
            // }
            
            this.editor.customConfig.uploadImgHooks = {
                before: function (xhr, editor, files) {
                   
                },
                success: function (xhr, editor, result) {
                    console.log('上传成功，插入成功');
                    
                },
                fail: function (xhr, editor, result) {
                    console.log('上传成功，插入失败');
                   
                },
                error: function (xhr, editor) {
                    console.log('上传出错');
                   
                },
                timeout: function (xhr, editor) {
                    console.log('超时');
                },

                customInsert: function (insertImg, result, editor) {
                    var url = result.result.url;
                    insertImg(url);
                }
            }
             this.editor.config = {
                pasteText : true
            }
            this.editor.customConfig.pasteFilterStyle = false;
            this.editor.customConfig.onchange = (html) => {
                this.content.html = html;
                // this.content.text = this.editor.txt.text();
                
                this.setText();
                
                let domObj = document.createElement('div');
                domObj.innerHTML = html;
            }
            
            this.editor.create();
            // this.editor.disable();
            //设置初始内容
            if (this.content.html) {
                this.setContent(this.content.html);
               
            }
        },
        setContent(content){
            this.editor.txt.html(content);
            this.setText();
        },
        setText(){
            var editorElem = this.$refs.editorElem;
            var text = editorElem.innerText;
            text = text.replace(/\&nbsp;/g, "" );
            text = text.replace(/\ /g, "" );
            text=text.replace(/\r\n/g,"")  
            text=text.replace(/\n/g,""); 
            this.content.text = text;
        }
    },
    mounted () {
        this.init();
    }
};
</script>
