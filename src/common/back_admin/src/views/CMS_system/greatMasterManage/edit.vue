
<template>
    <Row class="edit">
        <Card>
            <p slot="title">
                {{id?"编辑":"添加"}}珠宝大师
            </p>
            <div class="cnt">
                <Col>
                    <div class="item">
                        <span class="lb"><em>*</em>珠宝大师姓名：</span>                   
                        <span>
                            <Input v-model.trim="params.mName" :maxlength="20" style="width:400px" placeholder="限制20字以内"/>
                        </span>   
                    </div>
                    <div class="item">
                        <span class="lb">珠宝大师性别：</span>                   
                        <span>
                            <Select style="width:400px" v-model="params.sex">
                                <Option v-for="(val,key) of sexList" :value="key" :key="key">{{ val }}</Option>
                            </Select>
                        </span>
                    </div>
                </Col>
                <Col>
                    <div class="item">
                        <span class="lb">出生日期：</span>                   
                        <span>
                             <DatePicker v-model="params.born" type="date" placeholder="请选择日期..." style="width: 400px"></DatePicker>
                        </span>
                    </div>
                </Col>
                <div class="item align-items">
                    <span class="lb">珠宝大师照片：</span>                   
                    <span>
                        <my-upload :uploadList="grandmasterUrlList" ></my-upload>
                    </span>  
                    <span class="tip">仅支持 jpeg、 png 2种格式, 大小不超过10.0 MB，建议尺寸750X1334</span> 
                </div>
                <Col>
                    <!-- <div class="title-block">作品风格：</div>                  -->
                    <div class="item align-items">
                        <!-- <span class="lb">属性名：</span>                   
                        <span>
                            <Input v-model.trim="params.style" :maxlength="20" style="width:150px" placeholder="限制20字以内"/>
                        </span> -->
                        <span class="lb">作品风格：</span>                   
                        <span>
                            <Input v-model.trim="styleInput" :maxlength="50" style="width:400px"  placeholder="限制50字以内"/>
                        </span>
                        <span @click="attributeAdd('style')"><Icon class="add" type="plus-circled"></Icon></span>
                        <span @click="attributeUp('style')"><Icon class="up" type="arrow-up-c"></Icon></span>
                        <span @click="attributeDown('style')"><Icon class="down" type="arrow-down-c"></Icon></span>
                    </div> 
                </Col>
                
                 
                <div class="sku-table">
                    <div class="th">
                        <div style="max-width:10%">编号</div>
                        <div>作品风格</div>
                        <div style="max-width:10%">操作</div>
                    </div>
                    <div class="td" v-for="(item,index) of style" :key="index" :class="number == index ?'active':''" @click="attributeCheck('style',index)">
                        <div style="max-width:10%">{{index+1}}</div>
                        <div>{{item}}</div>
                        <div style="max-width:10%"><span @click="attributeDel('style',index)"><Icon class="del" type="minus-circled"></Icon></span></div>
                    </div>
                </div>
                <div class="title-block"></div>
                <div class="item">
                    <span class="lb">设计师简介：</span>                   
                    <span>
                         <Input v-model="params.personIntro" type="textarea" :rows="4" :maxlength="500" style="width:750px"></Input>
                    </span>   
                    <span class="tip">限制500字以内</span>
                </div>
                <div class="item align-items">
                    <span class="lb">作品照片：</span>                   
                    <span>
                        <my-upload :uploadList="productionUrlList" ></my-upload>
                    </span>  
                    <span class="tip">仅支持 jpeg、 png 2种格式, 大小不超过10.0 MB，建议尺寸750X1334</span> 
                </div>
                <div class="item">
                    <span class="lb">作品简介：</span>                   
                    <span>
                         <Input v-model="params.productionIntro" type="textarea" :rows="4" :maxlength="500" style="width:750px"></Input>
                    </span>   
                    <span class="tip">限制500字以内</span>
                </div>
                <div class="item">
                    <span class="lb">作品详情：</span>  
                    <div style="width:90%">
                        <my-wangeditor ref="detail" :editorId="`detail`" :content="detail"></my-wangeditor>
                    </div>
                </div>
                 <div class="item align-items">
                    <span class="lb">制作大师感言：</span>                   
                    <span>
                        <videoUpload :videoUploadList="videoUploadList" ></videoUpload>
                    </span>  
                    <span class="tip">仅支持 mp4 格式的视频, 大小不超过50.0 MB</span> 
                </div>
                <div class="item">
                    <span class="lb"></span>  
                    <span>
                        <Button type="info" size="large" :loading="loading" @click="confirm()">提交</Button>
                        <Button size="large" @click="cancel()">取消</Button>
                    </span>
                </div>
            </div>
        </Card>
    </Row>
</template>

<script>
import { addMaster,editMaster,getInfoById } from '@/api/api_greatMasterManage.js'
import E from 'wangeditor'
import eventBus from '@/common/evnetBus/eventBus.js';
import myUpload from '@/views/my-components/my-upload/upload';
import videoUpload from '@/views/my-components/my-upload/videoUpload';
import myWangeditor from '@/views/my-components/my-wangeditor/wangeditor';

export default {
    components: {
        myUpload,
        videoUpload,
        myWangeditor
    },
    data () {
        return {
            detail:{},
            productionUrlList:[],
            grandmasterUrlList:[],
            videoUploadList:[],
            id:this.$route.query.id,
            styleInput:'',
            params: {
                mName:"",
                sex: '1',
                born: '',
                headUrl:'',
                style: [],
                personIntro: "",
                productionUrl: "",
                productionIntro:'',
                productionInfo:'',
                testimonialsUrl:'',
            },
            style :[],
            sexList:{
                1: "男",
                2: "女"
            },
            number:-1,
            loading: false
        };
    },
    created(){
        if(this.id) {
            this.getInfoById()
        }
    },
    mounted() {
    
    },
    methods: {
        getInfoById(){
            getInfoById({
                id:this.id
            }).then(res => {
                if(res.code == 200) {
                    this.params.mName = res.data.mName
                    this.params.sex = res.data.sex + ''
                    this.params.born = res.data.born
                    this.params.personIntro = res.data.personIntro
                    this.params.productionIntro = res.data.productionIntro
                    this.params.testimonialsUrl = res.data.testimonialsUrl
                    this.$refs.detail.setContent(res.data.productionInfo)
                    if(res.data.style) {
                        this.style = res.data.style.split(',')
                    }
                    if(res.data.productionUrl) {
                        this.productionUrlList = [{url:res.data.productionUrl}]
                    }
                    if(res.data.headUrl) {
                        this.grandmasterUrlList = [{url:res.data.headUrl}]
                    }
                    if(res.data.testimonialsUrl) {
                        this.videoUploadList = [{url:res.data.testimonialsUrl}]
                    }
                }
            })
        },
        // 添加
        attributeAdd(name){
            if(!this.styleInput) {
                this.$Message.error("请输入作品风格");
                return false;
            }
            this[name].push(this.styleInput)
            this.styleInput = "";
        },
        // 删除
        attributeDel(name,index){
            this[name].splice(index,1);
        },
        // 选中项
        attributeCheck(name,index){
            this[name].index = index;
            this.number = index
        },
        // 上移
        attributeUp(name){
            var list = this[name];
            var currIndex = this[name].index;
            if(currIndex == -1){
                this.$Message.error('请选择');
                return false;
            }
            if(currIndex == 0){
                this.$Message.error('已经处于置顶，无法上移');
                return false;
            }
            this[name] = this.globalFun.arrMove(list,currIndex,currIndex-1);
            this[name].index = currIndex - 1;
            this.number = currIndex - 1;
        },
        // 下移
        attributeDown(name){
            var list = this[name];
            var currIndex = this[name].index;
            if(currIndex == -1){
                this.$Message.error('请选择');
                return false;
            }
            if(currIndex == list.length-1){
                this.$Message.error('已经处于置底，无法下移');
                return false;
            }
            this[name] = this.globalFun.arrMove(list,currIndex,currIndex+1);
            this[name].index = currIndex + 1;
            this.number = currIndex + 1;
        },
        // 提交
        confirm(){
            var _this = this
            if(!this.params.mName){
                this.$Message.error('请输入珠宝大师姓名');
                return false;
            }
            if(!this.loading){
                this.loading = true;
                this.params.born = this.globalFun.dateFormat(this.params.born,'yyyy-MM-dd')
                this.params.style = this.style.join(',')
                this.params.sex = this.params.sex - 0
                if(this.productionUrlList.length>0) {
                    this.params.productionUrl = this.productionUrlList[0].url
                }
                if(this.grandmasterUrlList.length>0){
                    this.params.headUrl = this.grandmasterUrlList[0].url
                }
                if(this.videoUploadList.length>0) {
                    this.params.testimonialsUrl = this.videoUploadList[0].url
                }
                if(this.detail.html != '') {
                    this.params.productionInfo = this.detail.html || ''
                }
                if (this.id) {
                    this.params.id = this.id
                    editMaster(this.params).then((res) => {
                        if (res.code == 200) {
                            this.$Message.success('修改成功');
                            _this.cancel()
                        }
                        this.loading = false;
                    });
                } else {
                    // this.params.productionInfo = this.detail.html
                    addMaster(this.params).then((res) => {
                        if (res.code == 200) {
                            this.$Message.success('添加成功');
                            _this.cancel()
                        }
                        this.loading = false;
                    })
                }
            }
            
        },
        cancel(){
            if(this.id){
                eventBus.$emit('closeTag', 'greatMasterManage_edit');
            }else {
                eventBus.$emit('closeTag', 'greatMasterManage_add');
            }
            history.go(-1);
        },
    },
    computed: {
        
    }
};
</script>
<style lang="less" scoped>
    @import '../../../common/styles/common.less';
    @import './edit.less';
</style>
