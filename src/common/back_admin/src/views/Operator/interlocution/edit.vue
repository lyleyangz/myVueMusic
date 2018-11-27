<template>
  <Row class="edit"> 
        <Card>
            <p slot="title">{{params.id?"编辑":"添加"}}百问百答</p>
            <div class="cnt">
                <div class="item">
                    <span class="lb">分类：</span>                   
                    <span>
                        <Input v-model.trim="params.questionType" placeholder="请输入分类" style="width: 300px" :maxlength="15"/>
                    </span>   
                    <span class="tip">限制15字以内</span>
                </div>
                <div class="item">
                    <span class="lb">分类排序：</span>  
                    <span>
                        <input v-limitNum class="ivu-input" v-model.trim="params.questionNumber" style="width:300px;" maxlength="9"/>
                    </span>
                    <span class="tip">数值越小，排序越前，从1开始的正整数</span>
                </div>
                <div class="item">
                    <span class="lb">标题：</span>  
                    <span>
                        <Input v-model.trim="params.title" placeholder="请输入标题" style="width: 300px" :maxlength="20"/>
                    </span>
                    <span class="tip">限制20字以内</span>
                </div>
                <div class="item">
                    <span class="lb">回答：</span>
                    <div style="width:90%">
                        <my-wangeditor ref="interlocution" :editorId="`interlocution`" :content="interlocution"></my-wangeditor>
                    </div>
                </div>
                <div class="item">
                    <span class="lb"></span>  
                    <span>
                        <Button type="info" size="large" @click="confirm()">确定</Button>
                        <Button type="info" size="large" @click="cancel()">取消</Button>
                    </span>
                </div>
            </div>
        </Card>
           
	</Row>
</template>
<script>
    import eventBus from "@/common/evnetBus/eventBus.js";
    import myWangeditor from "@/views/my-components/my-wangeditor/wangeditor";
    import {addInterlocution ,updateInterlocution ,interlocutionInfo} from "@/api/api_interlocution.js"
    export default {
        components: {
		    myWangeditor
	    },
        data (){
             return {
                interlocution:{},
                params: {
                    questionType: "",
                    questionNumber: 1,
                    title: '',
                    answer: '',
                    id:this.$route.query.id,
                },
             }
        },
        created(){
            if(this.params.id){
                this.interlocutionInfo(this.params.id)
            }
        },
        methods : {
            interlocutionInfo(id){
                interlocutionInfo({
                    id:id
                }).then(res => {
                    if(res.code == 200){
                        this.params = res.data;
                        this.interlocution.html = this.params.answer
                        this.$refs.interlocution.setContent(this.params.answer);
                    }
                })
            },
            confirm(){
               
                if(!this.params.questionType){
                    this.$Message.error('请输入分类');
                    return false;
                }
                if(!this.params.questionNumber){
                    this.$Message.error('请输入分类排序');
                    return false;
                }
                if(!this.params.title){
                    this.$Message.error('请输入标题');
                    return false;
                }
                var text = this.interlocution.text;
                
                if(!text){
                    this.$Message.error('请输入问答');
                    return false;
                }
                console.log(text.length)
                if(text.length>300){
                    this.$Message.error('问答限制300字以内');
                    return false;
                }
                
                if(this.interlocution.html !=''){
                    this.params.answer = this.interlocution.html;
                }
                if(this.params.id){
                    updateInterlocution(this.params).then((res) => {
                        if (res.code == 200) {
                            this.$Message.success('提交成功');
                            history.go(-1);
                            eventBus.$emit('closeTag', 'interlocutionEdit');
                        } else {
                            this.$message.error(res.errCode);
                        }
                    })
                }else{
                    addInterlocution(this.params).then((res) => {
                        if (res.code == 200) {
                            this.$Message.success('提交成功');
                            eventBus.$emit('closeTag', 'interlocutionAdd');
                            history.go(-1);
                        } else {
                            this.$message.error(res.errCode);
                        }
                    })
                }   
            },
            
            cancel(){
                if(this.params.id){
                    eventBus.$emit('closeTag', 'interlocution_edit');
                }else{  
                    eventBus.$emit('closeTag', 'interlocution_add');
                }
                history.go(-1);
            }
        },
        mounted() {
        },
       
    }
</script>
<style lang="less" scoped>
    @import "../../../common/styles/common.less";
    @import "./edit.less";
</style>

