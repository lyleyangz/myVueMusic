<template>
    <div>
        <Row class="edit">
            <Col class="goods">
                <Card>
                    <p slot="title">
                        添加承运人 
                    </p>
                    <div class="cnt" >
                        <div class="title-block">基本信息</div>
                        <Row>
                            <Col span="10" class="item">
                                <span class="lb"><em>*</em>承运人姓名：</span>                   
                                <span>
                                    <Input v-model.trim="params.name" :disabled="isEdit" :maxlength="50" style="width:300px" placeholder="限制50字"/>
                                </span>  
                            </Col>
                            <Col span="10" class="item">
                                <span class="lb">承运人性别：</span>                   
                                <Select style="width:300px"  v-model="params.sex" placeholder="全部">
                                    <Option v-for="(value,key) of sexList" :value="key" :key="key">{{ value }}</Option>
                                </Select>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="10" class="item">
                                <span class="lb">出生日期：</span>                   
                                <DatePicker type="date" :options="options" v-model.trim="params.birthday" placement="bottom-end" style="width: 300px"></DatePicker>
                            </Col>
                            <Col span="10" class="item">
                                <span class="lb">联系方式：</span>                   
                                <span>
                                    <input v-limitNum class="ivu-input" v-model.trim="params.phone" maxlength="11" style="width: 300px" />
                                </span>  
                            </Col>
                        </Row>
                        <Row>
                            <Col span="10" class="item">
                                <span class="lb">驾驶证类型：</span>                   
                                <span>
                                    <Input v-model.trim="params.drivingLicenseType" :maxlength="50" style="width:300px"/>
                                </span>  
                            </Col>
                            <Col span="10" class="item">
                                <span class="lb">驾龄：</span>                   
                                <span>
                                    <input v-limitNum class="ivu-input" maxlength="2" v-model.trim="params.drivingAge" style="width: 300px" />
                                </span>  
                            </Col>
                        </Row>
                        <div class="item">
                            <span class="lb">承运人照片：</span>                   
                            <span>
                                <my-upload :uploadList="photosList" ></my-upload>
                            </span>
                            <span class="tip">仅支持 jpeg、 png 2种格式, 大小不超过10.0 MB，建议尺寸750X1334</span>
                        </div>
                        
                        <div class="title-block">当前状况</div>
                        
                        <Row>
                            <Col span="10" class="item">
                                <span class="lb">健康：</span>                   
                                <span>
                                    <Input v-model.trim="params.health" :maxlength="50" style="width:300px"/>
                                </span>  
                            </Col>
                            <Col span="10" class="item">
                                <span class="lb">疾病史：</span>                   
                                <span>
                                    <Input v-model.trim="params.medicalHistory" :maxlength="50" style="width:300px"/>
                                </span>  
                            </Col>
                        </Row>
                        <div>
                            <my-wangeditor ref="content" :editorId="`content`" :content="content"></my-wangeditor>
                        </div>
                    </div>
                    <div class="item btn">
                        <Button size="large" @click="cancel()">取消</Button>
                        <Button type="info" size="large" :loading="loading" @click="submit()">提交</Button>
                    </div>
                </Card>
            </Col>
        </Row>
        
    </div>
</template>

<script>
import E from 'wangeditor';
import myUpload from '@/views/my-components/my-upload/upload';
import myWangeditor from '@/views/my-components/my-wangeditor/wangeditor';
import eventBus from '../../../common/evnetBus/eventBus.js';
import { addCarrier,detailCarrier,updateCarrier } from '../../../api/api_carrierManage.js';
export default {
    components: {
        myUpload,
        myWangeditor
    },
    data () {
        return {
            isEdit: false, // 是否编辑页面
            photosList:[],
            params:{
                id: this.$route.params.id || null,
                sex: "0",
            },
            sexList:{
                "0": "男",
                "1": "女"
            },
            content:{},
            options: {
                disabledDate (date) {
                    return date && date.valueOf() > Date.now() - 86400000;
                }
            },
            loading: false
        };
    },
    mounted () {
        var id = this.params.id;
        if(id){
            this.isEdit = true;
            detailCarrier({
                id: id
            }).then(res=>{
                if(res.code == 200){
                    this.params = res.data;
                    if(this.params.photos){
                        this.photosList = [{url:this.params.photos}]
                    }
                    this.params.sex = this.params.sex + "";
                    this.$refs.content.setContent(this.params.content);
                }
            })
        }
    },
    methods: {
        submit(){
            if(!this.params.name){
                this.$Message.error('请输入承运人姓名');
                return false;
            }
            // if(!this.params.birthday){
            //     this.$Message.error('请选择出生日期');
            //     return false;
            // }
            // if(!this.params.phone){
            //     this.$Message.error('请输入联系方式');
            //     return false;
            // }
            // if(!this.params.drivingLicenseType){
            //     this.$Message.error('请输入驾驶证类型');
            //     return false;
            // }
            // if(!this.params.drivingAge){
            //     this.$Message.error('请输入驾龄');
            //     return false;
            // }
            // if(this.photosList.length == 0){
            //     this.$Message.error('请上传承运人照片');
            //     return false;
            // }
            if(!this.loading){
                this.loading = true;
                if(this.params.birthday){
                    this.params.birthday = this.globalFun.dateFormat(this.params.birthday,'yyyy-MM-dd')
                }
                
                if(this.photosList.length>0){
                    this.params.photos = this.photosList[0].url;
                }
                if(this.content.html !=''){
                    this.params.content = this.content.html;
                }
                var _this = this;
                if(!this.params.id){
                    addCarrier(this.params).then(res=>{
                        if(res.code == 200){
                            _this.$Message.success('提交成功');
                            _this.cancel();
                        }
                        this.loading = false;
                    })
                }else{
                    updateCarrier(this.params).then(res=>{
                        if(res.code == 200){
                            _this.$Message.success('提交成功');
                            _this.cancel();
                        }
                        this.loading = false;
                    })
                }
            }
           
        },
        cancel(){
            if(this.params.id){
                eventBus.$emit('closeTag', 'carrier_edit');
            }else{  
                eventBus.$emit('closeTag', 'carrier_add');
            }
            history.go(-1);
        }
    }
};
</script>
<style lang="less">
    @import '../../../common/styles/common.less';
    @import './edit.less';
</style>