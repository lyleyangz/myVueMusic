<template>
    <div>
        <Row class="edit">
            <Col class="goods">
                <Card>
                    <p slot="title">
                        {{isEdit?'编辑':'添加'}}场地
                    </p>
                    <!-- 第一步 -->    
                    <div class="cnt" v-show="skip == 1">
                        <div class="title-block">基本信息</div>
                        <Row>
                            <Col class="item">
                                <span class="lb"><em>*</em> 场地名称：</span>                   
                                <span>
                                    <Input v-model.trim="params.locName" :maxlength="50" style="width:300px" placeholder="限制50字以内"/>
                                </span>
                            </Col>
                            <Col class="item">
                                <span class="lb">场地位置：</span>                   
                                <span>
                                    <Input v-model.trim="params.site" disabled :maxlength="200" style="width:300px" placeholder="限制200字以内"/>
                                </span>
                                <span @click="location"><Icon class="location" type="ios-location"></Icon></span>
                            </Col>
                        </Row>
                        <Row>
                            <Col class="item">
                                <span class="lb">场地主要负责人：</span>                   
                                <span>
                                    <Input v-model.trim="params.chargePerson" :maxlength="20" style="width:300px" placeholder="限制20字以内"/>
                                </span>                            
                            </Col>
                            <Col class="item">
                                <span class="lb">其他相关负责人：</span>                   
                                <span>
                                    <Input v-model.trim="params.otherChargePerson" :maxlength="20" style="width:300px" placeholder="限制20字以内"/>
                                </span>  
                            </Col>
                            <Col class="item">
                                <span class="lb">矿石状态：</span>                   
                                <span>
                                    <Select style="width:300px" v-model="params.mineralStatus" placeholder="请选择">
                                        <Option :value="-1" >请选择</Option>
                                        <Option v-for="(val,key) of statusList" :value="key" :key="key">{{ val }}</Option>
                                    </Select>
                                </span> 
                            </Col>
                        </Row>
                        <div class="item">
                            <span class="lb">场地图片：</span>                   
                            <span>
                                <my-upload :uploadList="uploadList"></my-upload>
                            </span>
                            <span class="tip">仅支持 jpeg、 png 2种格式, 大小不超过10.0 MB，建议尺寸750X1334</span>
                        </div>
                        <div class="title-block">场地详情</div>
                        <div class="item align-items">
                            <span class="lb">属性名：</span>                   
                            <span>
                                <Input v-model.trim="locInfo.obj.attrName" :maxlength="20" style="width:150px" placeholder="限制20字以内"/>
                            </span>
                            <span class="lb">属性值：</span>                   
                            <span>
                                <Input v-model.trim="locInfo.obj.attrVal" :maxlength="100" style="width:350px"  placeholder="限制100字以内"/>
                            </span>
                            <span @click="attributeAdd('locInfo')"><Icon class="add" type="plus-circled"></Icon></span>
                            <span @click="attributeUp('locInfo')"><Icon class="up" type="arrow-up-c"></Icon></span>
                            <span @click="attributeDown('locInfo')"><Icon class="down" type="arrow-down-c"></Icon></span>
                        </div>
                        <div class="sku-table">
                            <div class="th">
                                <div style="max-width:30%">属性名</div>
                                <div style="max-width:60%">属性值</div>
                                <div style="max-width:10%">操作</div>
                            </div>
                            <div class="td" :class="locInfo.index == index?'active':''" v-for="(item,index) of params.locInfo" :key="index" @click="attributeCheck('locInfo',index)">
                                <div style="max-width:30%">{{item.attrName}}</div>
                                <div style="max-width:60%">{{item.attrVal}}</div>
                                <div style="max-width:10%"><span @click="attributeDel('locInfo',index)"><Icon class="del" type="minus-circled"></Icon></span></div>
                            </div>
                        </div>

                        <div class="title-block">场地相关资质</div>
                        <div class="item align-items">
                            <span class="lb">资质名称：</span>                   
                            <span>
                                <Input v-model.trim="locAptitude.obj.aptitudeName" :maxlength="100" style="width:350px"  placeholder="限制100字以内"/>
                            </span>
                            <span @click="attributeAdd('locAptitude')"><Icon class="add" type="plus-circled"></Icon></span>
                            <span @click="attributeUp('locAptitude')"><Icon class="up" type="arrow-up-c"></Icon></span>
                            <span @click="attributeDown('locAptitude')"><Icon class="down" type="arrow-down-c"></Icon></span>
                        </div>
                        <div class="sku-table">
                            <div class="th">
                                <div>编号</div>
                                <div>资质名称</div>
                                <div>操作</div>
                            </div>
                            <div class="td" :class="locAptitude.index == index?'active':''" v-for="(item,index) of params.locAptitude" :key="index" @click="attributeCheck('locAptitude',index)">
                                <div>{{index + 1}}</div>
                                <div>{{item.aptitudeName}}</div>
                                <div><span @click="attributeDel('locAptitude',index)"><Icon class="del" type="minus-circled"></Icon></span></div>
                            </div>
                            
                        </div>
                        <div class="item">资质凭证：</div>
                        <div class="item">
                            <div style="width:100%">
                                <my-wangeditor ref="locAptitudeInfo" :editorId="`locAptitudeInfo`" :content="locAptitudeInfo"></my-wangeditor>
                            </div>
                        </div>
                    </div>
                    <!-- 第二步 -->    
                    <div class="cnt" v-show="skip == 2">
                        <div class="title-block">相关参数及存放位置</div>
                        <div class="item">
                            <span class="lb">场地存放位置：</span>                   
                            <span>
                                <Input v-model.trim="params.saveLoc" :maxlength="100" style="width:500px" placeholder="限制200字以内"/>
                            </span>
                        </div>
                        <div class="title-block">存放位置相关照片</div>
                        <div style="width:90%">
                            <my-wangeditor ref="saveLocPicurl" :editorId="`saveLocPicurl`" :content="saveLocPicurl"></my-wangeditor>
                        </div>
                        <div class="title-block">场地相关数据监测</div>
                        <div style="width:90%">
                            <my-wangeditor ref="monitorData" :editorId="`monitorData`" :content="monitorData"></my-wangeditor>
                        </div>
                        <div class="title-block">监测相关证明</div>
                        <div style="width:90%">
                            <my-wangeditor ref="monitorProof" :editorId="`monitorProof`" :content="monitorProof"></my-wangeditor>
                        </div>
                    </div>

                    <div class="item btn">
                        <Button size="large" @click="cancel()" v-if="skip!=2 || skip==2">取消</Button>
                        <Button type="info" size="large" @click="prev()" v-if="skip>1">上一步</Button>
                        <Button type="info" size="large" @click="next()" v-if="skip!=2">下一步</Button>
                        <Button type="info" size="large" @click="submit()" :loading="loading" v-if="skip==2">提交</Button>
                    </div>
                </Card>
            </Col>
        </Row>
        <Modal :width="1200" class="map-modal" v-model="mapModal.is" >
            <baidu-map ref="baiduMap" v-if="mapModal.is"></baidu-map>
            <div slot="footer">
                <Button @click="mapModal.is=false">取消</Button>
                <Button type="primary" @click="mapConfirm()">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { addfirst,addTwo,add,detail,edit } from '@/api/api_areaManage.js'
import E from "wangeditor";
import myUpload from "@/views/my-components/my-upload/upload";
import eventBus from "../../../common/evnetBus/eventBus.js";
import myWangeditor from "@/views/my-components/my-wangeditor/wangeditor";
import baiduMap from '../../../common/components/baiduMap/index';
export default {
    components: {
        myUpload,
        baiduMap,
        "my-wangeditor": myWangeditor
    },
    data() {
        return {
            isEdit: false,
            skip: 1,
            uploadList: [],
            aptitude: {},
            interrelatedImg: {},
            dataMonitoring: {},
            prove: {},
            params:{
                id: this.$route.params.id || null,
                locName:"",
                site:"",
                chargePerson:"",
                otherChargePerson:"",
                mineralStatus:"",
                locPicUrl:"",
                longitude:"",
                latitude:"",
                locInfo:[],
                locAptitude:[],
            },
            locInfo:{
                obj:{},
                index: -1
            },
            locAptitude:{ 
                obj:{},
                index: -1
            },
            locAptitudeInfo: {},
            saveLocPicurl: {},
            monitorData: {},
            monitorProof: {},
            loading: false,
            statusList:{
                1:'原矿',
                2:'初加工',
                3:'进一步打磨',
                4:'精细加工',
                5:'产品成型'
            },
            mapModal:{
                is: false
            },
        };
    },
    methods: {
        prev() {
            this.skip = this.skip - 1;
        },
        next() {
            if(this.skip == 1){
                if(!this.params.locName){
                    this.$Message.error('请输入场地名称');
                    return false;
                }
            }
            this.skip = this.skip + 1;
          
        },
        // 打开地图
        location(){
            this.mapModal.is = true;     
        },
        // 地图坐标确认
        mapConfirm(){
            this.mapModal.is = false; 
            var point = this.$refs.baiduMap.point;
            this.params.longitude = point.lng;
            this.params.latitude = point.lat;
            this.params.site = point.address;
            console.log(this.$refs.baiduMap.point.lng+","+this.$refs.baiduMap.point.lat+","+this.$refs.baiduMap.point.address);
        },
        submit(){
            if(!this.loading){
                this.loading = true;
                
                if(this.uploadList.length>0){
                    var uploadList = [];
                    this.uploadList.forEach((item,index)=>{
                        uploadList.push(item.url)
                    })
                    this.params.locPicUrl = uploadList.join(",");
                }
                if(this.saveLocPicurl.html !=''){
                    this.params.saveLocPicurl = this.saveLocPicurl.html;
                }
                if(this.monitorData.html !=''){
                    this.params.monitorData = this.monitorData.html;
                }
                if(this.monitorProof.html !=''){
                    this.params.monitorProof = this.monitorProof.html;
                }
                if(this.locAptitudeInfo.html !=''){
                    this.params.locAptitudeInfo = this.locAptitudeInfo.html;
                }
                var params = JSON.parse(JSON.stringify(this.params))
                params.locInfo = JSON.stringify(this.params.locInfo);
                params.locAptitude = JSON.stringify(this.params.locAptitude);
                if(this.params.id){
                    edit(params).then(res=>{
                        if(res.code == 200){
                            this.$Message.success('提交成功');
                            this.cancel();
                        }
                        this.loading = false;
                    })
                }else{
                    add(params).then(res=>{
                        if(res.code == 200){
                            this.$Message.success('提交成功');
                            this.cancel();
                        }
                        this.loading = false;
                    })
                }
            }
            
        },
        // 属性添加
        attributeAdd(name){
            switch(name){
                case 'locInfo':
                    if(!this.locInfo.obj.attrName){
                        this.$Message.error('请输入属性名');
                        return false;
                    }
                    if(!this.locInfo.obj.attrVal){
                        this.$Message.error('请输入属性值');
                        return false;
                    }
                    break;
                case 'locAptitude':
                    if(!this.locAptitude.obj.aptitudeName){
                        this.$Message.error('请输入资质名称');
                        return false;
                    }
                    break;
            }
            this.params[name].push(this[name].obj)
            this[name].obj = {};
        },
        // 属性上移
        attributeUp(name){
            var list = this.params[name];
            var currIndex = this[name].index;
            if(currIndex == -1){
                this.$Message.error('请选择');
                return false;
            }
            if(currIndex == 0){
                this.$Message.error('已经处于置顶，无法上移');
                return false;
            }
            this.params[name] = this.globalFun.arrMove(list,currIndex,currIndex-1);
            this[name].index = currIndex - 1;
        },
        // 属性下移
        attributeDown(name){
            var list = this.params[name];
            var currIndex = this[name].index;
            if(currIndex == -1){
                this.$Message.error('请选择');
                return false;
            }
            if(currIndex == list.length-1){
                this.$Message.error('已经处于置底，无法下移');
                return false;
            }
            this.params[name] = this.globalFun.arrMove(list,currIndex,currIndex+1);
            this[name].index = currIndex + 1;
        },
        // 属性值删除
        attributeDel(name,index){
            this.params[name].splice(index,1);
        },
        // 属性列表选择某一项
        attributeCheck(name,index){
            this[name].index = index;
        },
        cancel(){
            if(this.params.id){
                eventBus.$emit('closeTag', 'areaManage_edit');
            }else {
                eventBus.$emit('closeTag', 'areaManage_add');
            }
            history.go(-1);
        },
    
    },
    updated() {
        this.$nextTick(() => {
        
        });
    },
    mounted() {
        var id = this.params.id;
        if(id){
            this.isEdit = true;
            detail({
                id: id
            }).then(res=>{
                if(res.code == 200){
                    this.params = res.data;
                    this.params.mineralStatus = res.data.mineralStatus + "";
                    this.params.locInfo = JSON.parse(res.data.locInfo);
                    this.params.locAptitude = JSON.parse(res.data.locAptitude);
                    if(res.data.locPicUrl){
                        this.uploadList = [{url:res.data.locPicUrl}]
                    }
                    if(res.data.locPicUrl){
                        var uploadList = [];
                        res.data.locPicUrl.split(",").forEach((item,index)=>{
                            uploadList.push({url:item})
                        })
                        this.uploadList = uploadList;
                    }
                    this.$refs.saveLocPicurl.setContent(this.params.saveLocPicurl);
                    this.$refs.monitorData.setContent(this.params.monitorData);
                    this.$refs.monitorProof.setContent(this.params.monitorProof);
                    this.$refs.locAptitudeInfo.setContent(this.params.locAptitudeInfo);  
                }
            })
        }
    }
};
</script>
<style lang="less" scoped>
@import "../../../common/styles/common.less";
@import "./edit.less";
</style>