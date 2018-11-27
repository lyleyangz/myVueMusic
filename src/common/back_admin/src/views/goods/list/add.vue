<template>

    <div>
       
        <Row class="edit">
            <Col class="goods">
                <Card>
                    <p slot="title">
                        添加商品
                    </p>
                    <a href="#" slot="extra" @click.prevent="addTemplet">
                        <Icon type="ios-redo"></Icon>
                        选择模板
                    </a>
                    <!-- 第一步 -->    
                    <div class="cnt" v-show="skip == 1">
                        <div class="title-block">商品基本信息</div>
                        <Row>
                            <Col span="10" class="item">
                                <span class="lb"><em>*</em>商品名称：</span>                   
                                <span>
                                    <Input v-model.trim="params.name" :maxlength="20" style="width:300px" placeholder="限制20字"/>
                                </span>  
                            </Col>
                            <Col span="10" class="item">
                                <span class="lb"><em>*</em>商品分类：</span>                   
                                <Select style="width:300px" v-model="params.classLfyId" placeholder="请选择">
                                    <Option :value="``" >请选择</Option>
                                    <Option v-for="(item,index) of classifyList" :value="item.id" :key="index">{{ item.name }}</Option>
                                </Select>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="10" class="item">
                                <span class="lb"><em>*</em>商品批次：</span>                   
                                <Select style="width:300px" v-model="params.batchId" placeholder="请选择">
                                    <Option :value="``" >请选择</Option>
                                    <Option v-for="(item,index) of batchList" :value="item.id" :key="index">{{ item.name }}</Option>
                                </Select>
                            </Col>
                            <Col span="10" class="item">
                                <span class="lb"><em>*</em>商品总量：</span>                   
                                <span>
                                    <input v-limitNum class="ivu-input" v-model.trim="params.number" :maxlength="3" placeholder="最大数量为100"  style="width:300px"/>
                                </span> 
                            </Col>
                        </Row>
                        <div class="item">
                            <span class="lb">商品图片：</span>                   
                            <span>
                                <my-upload :uploadList="goodsImgList" :maxSize="8"></my-upload>
                            </span>
                            <span class="tip">仅支持 jpeg、 png 2种格式, 大小不超过10.0 MB，建议尺寸750X1334</span>
                        </div>
                        <div class="title-block">商品属性信息</div>
                        <div class="item align-items">
                            <span class="lb">属性名：</span>                   
                            <span>
                                <Input v-model.trim="goodsProperty.obj.name" :maxlength="10" style="width:150px" placeholder="限制10字"/>
                            </span>
                            <span class="lb">属性值：</span>                   
                            <span>
                                <Input v-model.trim="goodsProperty.obj.value" :maxlength="20" style="width:350px"  placeholder="限制20字"/>
                            </span>
                            <span @click="attributeAdd('goodsProperty')"><Icon class="add" type="plus-circled"></Icon></span>
                            <span @click="attributeUp('goodsProperty')"><Icon class="up" type="arrow-up-c"></Icon></span>
                            <span @click="attributeDown('goodsProperty')"><Icon class="down" type="arrow-down-c"></Icon></span>
                        </div>
                        <div class="sku-table">
                            <div class="th">
                                <div>属性名</div>
                                <div>属性值</div>
                                <div>操作</div>
                            </div>
                            <div class="td" :class="goodsProperty.index == index?'active':''" v-for="(item,index) of params.goodsProperty" :key="index" @click="attributeCheck('goodsProperty',index)">
                                <div>{{item.name}}</div>
                                <div>{{item.value}}</div>
                                <div><span @click="attributeDel('goodsProperty',index)"><Icon class="del" type="minus-circled"></Icon></span></div>
                            </div>
                        </div>

                        <div class="title-block">相关证明</div>
                        <div>
                            <my-wangeditor ref="prove" :editorId="`prove`" :content="prove"></my-wangeditor>
                        </div>
                    </div>
                    <!-- 第二步 -->    
                    <div class="cnt" v-show="skip == 2">
                        <div class="title-block">质检</div>
                        <div class="item">
                            <span class="lb">质检机构：</span>                   
                            <span>
                                <Input v-model.trim="params.feeler" :maxlength="20" style="width:300px" placeholder="限制20字"/>
                            </span>   
                        </div>
                        <div class="title-block">检测信息</div>
                        <div class="item align-items">
                            <span class="lb">属性名：</span>                   
                            <span>
                                <Input v-model.trim="goodsPropertyQuality.obj.name" :maxlength="10" style="width:150px" placeholder="限制10字"/>
                            </span>
                            <span class="lb">属性值：</span>                   
                            <span>
                                <Input v-model.trim="goodsPropertyQuality.obj.value" :maxlength="20" style="width:350px"  placeholder="限制20字"/>
                            </span>
                            <span @click="attributeAdd('goodsPropertyQuality')"><Icon class="add" type="plus-circled"></Icon></span>
                            <span @click="attributeUp('goodsPropertyQuality')"><Icon class="up" type="arrow-up-c"></Icon></span>
                            <span @click="attributeDown('goodsPropertyQuality')"><Icon class="down" type="arrow-down-c"></Icon></span>
                        </div>
                        <div class="sku-table">
                            <div class="th">
                                <div>属性名</div>
                                <div>属性值</div>
                                <div>操作</div>
                            </div>
                            <div class="td" :class="goodsPropertyQuality.index == index?'active':''" v-for="(item,index) of params.goodsPropertyQuality" :key="index" @click="attributeCheck('goodsPropertyQuality',index)">
                                <div>{{item.name}}</div>
                                <div>{{item.value}}</div>
                                <div><span @click="attributeDel('goodsPropertyQuality',index)"><Icon class="del" type="minus-circled"></Icon></span></div>
                            </div>
                        </div>

                        <div class="title-block">检测溯源</div>
                        <div>
                           <my-wangeditor ref="feelerTrace" :editorId="`feelerTrace`" :content="feelerTrace"></my-wangeditor>
                        </div>
                    </div>  

                    <!-- 第三步 -->    
                    <div class="cnt" v-show="skip == 3">
                        <div class="title-block">地理位置</div>
                        <div class="item">
                            <span class="lb">名称：</span>                   
                            <span>
                                <Input v-model.trim="params.addressName" :maxlength="50" style="width:300px" placeholder="限制50字"/>
                            </span>   
                        </div>
                        <div class="item align-items">
                            <span class="lb">详细地址：</span>                   
                            <span>
                                <Input v-model.trim="params.address" disabled :maxlength="200" style="width:500px" placeholder="限制200字"/>
                            </span>  
                            <span @click="location"><Icon class="location" type="ios-location"></Icon></span>
                        </div>
                        <div class="item">
                            <span class="lb">banner图：</span>                   
                            <span>
                                <my-upload :uploadList="bannerList" :maxSize="10"></my-upload>
                            </span>
                            <span class="tip">仅支持 jpeg、 png 2种格式, 大小不超过10.0 MB，建议尺寸750X1334</span>
                        </div>
                    </div>
                    <!-- 第四步 -->    
                    <div class="cnt" v-show="skip == 4">
                        <div class="title-block">货源轨迹</div>
                        <Row>
                            <!-- <Col span="10" class="item">
                                <span class="lb">发货地：</span>                   
                                <Select style="width:300px" v-model="goodsTrajectory.obj.send" placeholder="请选择" @on-change="changeSelect('send','sendName','locationsRefList')">
                                    <Option :value="``" >请选择</Option>
                                    <Option v-for="(value,key) of locationsRefList" :value="key" :key="key">{{ value }}</Option>
                                </Select>
                            </Col> -->
                            <Col span="10" class="item">
                                <span class="lb"><em>*</em>场地：</span>                   
                                <Select style="width:300px" v-model="goodsTrajectory.obj.receive" placeholder="请选择" @on-change="changeSelect('receive','receiveName','locationsRefList')">
                                    <Option :value="``" >请选择</Option>
                                    <Option v-for="(value,key) of locationsRefList" :value="key" :key="key">{{ value }}</Option>
                                </Select>
                            </Col>
                            <!-- <Col span="14" class="item">
                                <span class="lb">仓库存放位置：</span>                   
                                <span style="flex:1">
                                    <Input v-model.trim="goodsTrajectory.obj.location" :maxlength="100" style="width:80%" placeholder="限制200字"/>
                                </span>  
                            </Col> -->
                        </Row>
                        <Row>
                            <Col span="10" class="item">
                                <span class="lb">承运人：</span>                   
                                <Select style="width:300px" v-model="goodsTrajectory.obj.driverId" placeholder="请选择" @on-change="changeSelect('driverId','driverName','carrierList')">
                                    <Option :value="``" >请选择</Option>
                                    <Option v-for="(value,key) of carrierList" :value="key" :key="key">{{ value }}</Option>
                                </Select>
                            </Col>
                            <Col span="10" class="item">
                                <span class="lb">珠宝大师：</span>                   
                                <Select style="width:300px" v-model="goodsTrajectory.obj.artistId" placeholder="请选择" @on-change="changeSelect('artistId','artistName','greatMasterList')">
                                    <Option :value="``" >请选择</Option>
                                    <Option v-for="(value,key) of greatMasterList" :value="key" :key="key">{{ value }}</Option>
                                </Select>
                            </Col>
                            <Col span="4" class="item">
                                <div class="align-items">
                                    <span @click="attributeAdd('goodsTrajectory')"><Icon class="add" type="plus-circled"></Icon></span>
                                    <span @click="attributeUp('goodsTrajectory')"><Icon class="up" type="arrow-up-c"></Icon></span>
                                    <span @click="attributeDown('goodsTrajectory')"><Icon class="down" type="arrow-down-c"></Icon></span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div class="sku-table">
                                    <div class="th">
                                        <div>编号</div>
                                        <!-- <div>发货地</div> -->
                                        <div>场地</div>
                                        <div>承运人</div>
                                        <div>珠宝大师</div>
                                        <!-- <div>存放位置</div> -->
                                        <div>操作</div>
                                    </div>
                                    <div class="td" :class="goodsTrajectory.index == index?'active':''" v-for="(item,index) of params.goodsTrajectory" :key="index" @click="attributeCheck('goodsTrajectory',index)">
                                        <div>{{index+1}}</div>
                                        <!-- <div>{{item.sendName}}</div> -->
                                        <div>{{item.receiveName}}</div>
                                        <div>{{item.driverName}}</div>
                                        <div>{{item.artistName}}</div>
                                        <!-- <div>{{item.location}}</div> -->
                                        <div><span @click="attributeDel('goodsTrajectory',index)"><Icon class="del" type="minus-circled"></Icon></span></div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <div class="title-block">加工轨迹</div>
                        <Row>
                            <Col span="10" class="item">
                                <span class="lb">商品批次：</span>                   
                                <Select style="width:300px" v-model="params.ptBatch" placeholder="请选择" @on-change="changeBatchByTrace()">
                                    <Option :value="``" >请选择</Option>
                                    <Option v-for="(item,index) of batchList" :value="item.id" :key="index">{{ item.name }}</Option>
                                </Select>
                            </Col>
                            <Col span="10" class="item">
                                <span class="lb">轨迹名称：</span>                   
                                <Select style="width:300px" v-model="params.traceId" placeholder="请选择">
                                    <Option :value="``" >请选择</Option>
                                    <Option v-for="(value,key) of traceList" :value="key" :key="key">{{ value }}</Option>
                                </Select>
                            </Col>
                           
                        </Row>
                        <div class="title-block">责任人上传签字证明</div>
                        <Row>
                            <Col span="24" class="item">
                                <span>
                                    <my-upload :uploadList="leaderList" ></my-upload>
                                </span>
                                <span class="tip">仅支持 jpeg、 png 2种格式, 大小不超过10.0 MB，建议尺寸750X1334</span>
                            </Col>
                        </Row>
                    </div>
                    <div class="item btn">
                        <Button size="large" @click="cancel()" v-if="skip==1">取消</Button>
                        <Button type="info" size="large" @click="prev()" v-if="skip>1">上一步</Button>
                        <Button type="info" size="large" @click="next()" v-if="skip!=4">下一步</Button>
                        <Button type="info" size="large" :loading="loading" @click="submit()" v-if="skip==4">提交</Button>
                        <Button type="info" size="large" @click="saveTemplet()" v-if="skip==4">保存为模板</Button>
                    </div>
                </Card>
            </Col>
            <Col span="8" class="preview">
                <Card>
                    <p slot="title">
                        预览
                    </p>
                    <div class="preview-block">
                        <img src="../../../common/images/shell.png">
                        <div class="preview-cnt">
                            实时预览功能，即将上线
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>
        <Modal :width="500" class="modal" v-model="modal.is" title="保存为模板">
            <Row>
                <Col>
                    <span class="lb"><em>*</em>模板分类：</span>
                    <Select style="width:300px" v-model="modal.info.classlfyId" placeholder="请选择">
                        <Option :value="``" >请选择</Option>
                        <Option v-for="(item,index) of classifyList" :value="item.id" :key="index">{{ item.name }}</Option>
                    </Select>
                </Col>
            </Row>
            <Row class="margin-top-20">
                <Col>
                    <span class="lb"><em>*</em>模板名称：</span>
                    <span><Input v-model.trim="modal.info.name" style="width: 300px" /></span>
                </Col>
            </Row>
            <div slot="footer">
                <Button @click="modal.is=false">取消</Button>
                <Button type="primary" @click="submitTemplet()">提交</Button>
            </div>
        </Modal>

        <Modal :width="1200" class="map-modal" v-model="mapModal.is" >
            <baidu-map ref="baiduMap" v-if="mapModal.is"></baidu-map>
            <div slot="footer">
                <Button @click="mapModal.is=false">取消</Button>
                <Button type="primary" @click="mapConfirm()">确定</Button>
            </div>
        </Modal>
        <Modal :width="500" class="modal" v-model="templetModal.is" title="选择模板">
            <Row>
                <Col>
                    <span class="lb"><em>*</em>模板分类：</span>
                    <Select style="width:300px" v-model="templetModal.info.classlfyId" placeholder="请选择" @on-change="changeClasslfy">
                        <Option :value="``" >请选择</Option>
                        <Option v-for="(item,index) of classifyList" :value="item.id" :key="index">{{ item.name }}</Option>
                    </Select>
                </Col>
            </Row>
            <Row class="margin-top-20">
                <Col>
                    <span class="lb"><em>*</em>模板名称：</span>
                    <Select style="width:300px" v-model="templetModal.info.templetId" placeholder="请选择">
                        <Option :value="``" >请选择</Option>
                        <Option v-for="(item,index) of templetList" :value="item.gid" :key="index">{{ item.name }}</Option>
                    </Select>
                </Col>
            </Row>
            <div slot="footer">
                <Button @click="templetModal.is=false">取消</Button>
                <Button type="primary" @click="templetConfirm()">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import E from 'wangeditor';
import myUpload from '@/views/my-components/my-upload/upload';
import myWangeditor from '@/views/my-components/my-wangeditor/wangeditor';

import baiduMap from '../../../common/components/baiduMap/index';
import eventBus from '../../../common/evnetBus/eventBus.js';
import { addGoods,comboBoxClassLfy,comboBoxBatch,addTemplet,comboBoxTemplate,getTempletDetail,getTrackByBatch } from '../../../api/api_goods.js';
import { comboBoxLocationsRef } from '../../../api/api_areaManage.js';
import { carrierList } from '../../../api/api_carrierManage.js';
import { comboBoxGreatMaster } from '../../../api/api_greatMasterManage.js';


export default {
    components: {
        myUpload,
        baiduMap,
        myWangeditor
    },
    data () {
        return {
            skip: 1,
            locationsRefList:{}, // 场地列表
            carrierList: {},
            greatMasterList: {},
            traceList:{},

            goodsImgList: [],//商品图片
            bannerList: [],//banner图片
            leaderList: [],
            goodsProperty: {
                index: -1,
                obj: {}
            },
            goodsPropertyQuality: {
                index: -1,
                obj: {}
            },
            goodsTrajectory: {
                index: -1,
                obj: {}
            },
           
            params: {
                goodsProperty: [],
                goodsPropertyQuality: [],
                goodsTrajectory: []
            },
            classifyList:[],
            batchList: [],
            templetList: [],
            modal: {
                is: false,
                info: {}
            },
            mapModal:{
                is: false
            },
            templetModal: {
                is: false,
                info: {}
            },
            prove: {},
            feelerTrace: {},
            loading: false
        };
    },
    mounted () {
        this.getClassLfyList();
        this.getBathList();
        
    },
    methods: {
        addTemplet(){
            this.templetModal = {
                is: true,
                info :{}
            }
        },
        changeClasslfy(){
            this.getTempletList(this.templetModal.info.classlfyId);
        },
        getLocationsRefList(){
            comboBoxLocationsRef().then(res=>{
                if(res.code == 200){
                    var list = res.data || [];
                    var map = {};
                    list.forEach((item)=>{
                        map[item.id] = item.locName;
                    })
                    this.locationsRefList = map;
                }
            })
        },
        getCarrierList(){
            carrierList({pageNo: 1,pageSize: 100}).then(res=>{
                if(res.code == 200){
                    var list = res.data.entities || [];
                    var map = {};
                    list.forEach((item)=>{
                        map[item.id] = item.name;
                    })
                    this.carrierList = map;
                }
            })
        },
        changeBatchByTrace(){
            var id = this.params.ptBatch;
            if(id){
                // this.traceList = [];
                console.log(this.params.traceId)
                this.params.traceId = "";
                this.getTrackByBatch(id);
            }
           
        },
        getTrackByBatch(id,callback){
            getTrackByBatch({
                    traBatch: id
                }).then(res=>{
                    if(res.code == 200){
                        var list = res.data;
                        if(!Array.isArray(list)){
                            list = []
                        }
                        var map = {};
                        list.forEach((item)=>{  
                            map[item.id] = item.traName;
                        })
                        this.traceList = map;
                        if(callback){
                            callback();
                        }
                    }
                })
        },
        getGreatMasterList(){
            comboBoxGreatMaster().then(res=>{
                if(res.code == 200){
                    var list = res.data || [];
                    var map = {};
                    list.forEach((item)=>{
                        map[item.id] = item.mName;
                    })
                    this.greatMasterList = map;
                }
            })
        },
        
        templetConfirm(){
            if(!this.templetModal.info.classlfyId){
                this.$Message.error('请选择模板分类');
                return false;
            }
            if(!this.templetModal.info.templetId){
                this.$Message.error('请选择模板名称');
                return false;
            }
            var _this = this;
            getTempletDetail({
                id: this.templetModal.info.templetId
            }).then(res=>{
                if(res.code == 200){
                    this.params = res.data;
                    if(this.params.goodsImgUrl){
                        var goodsImgList = [];
                        this.params.goodsImgUrl.split(",").forEach((item,index)=>{
                            goodsImgList.push({url:item})
                        })
                        this.goodsImgList = goodsImgList;
                    }
                    if(this.params.bannerUrl){
                        var bannerList = [];
                        this.params.bannerUrl.split(",").forEach((item,index)=>{
                            bannerList.push({url:item})
                        })
                        this.bannerList = bannerList;
                    }
                    if(this.params.leaderImgurl){
                        this.leaderList = [{url:this.params.leaderImgurl}]
                    }
                    this.getTrackByBatch(this.params.ptBatch,function(){
                        _this.params.traceId = _this.params.traceId + "";
                    });
                    
                    this.$refs.prove.setContent(this.params.prove);
                    this.prove.html = this.params.prove;
                    this.$refs.feelerTrace.setContent(this.params.feelerTrace)
                    this.feelerTrace.html = this.params.feelerTrace;
                    this.templetModal.is = false;

                    
                }
            }) 
        },
        getClassLfyList(){
            comboBoxClassLfy().then(res=>{
                if(res.code == 200){
                    this.classifyList = res.data;
                }
            })
        },
        getBathList(){
            comboBoxBatch().then(res=>{
                if(res.code == 200){
                    this.batchList = res.data;
                }
            })
        },
        getTempletList(id){
            this.templetList = [];
            if(id){
                comboBoxTemplate({
                    classLfyId: id
                }).then(res=>{
                    if(res.code == 200){
                        this.templetList = res.data;
                    }
                })
            }
        },
        changeSelect(id,name,arrName){
            var obj = this[arrName][this.goodsTrajectory.obj[id]];
            this.goodsTrajectory.obj[name] = obj;
        },
        // 上一步
        prev(){
            this.skip = this.skip - 1;
        },
        // 下一步
        next(){

            if(this.skip == 1){
                if(!this.params.name){
                    this.$Message.error('请输入商品名称');
                    return false;
                }
                if(!this.params.classLfyId){
                    this.$Message.error('请选择商品分类');
                    return false;
                }
                if(!this.params.batchId){
                    this.$Message.error('请选择商品批次');
                    return false;
                }
                if(!this.params.number){
                    this.$Message.error('请输入商品总量');
                    return false;
                }
                if(this.params.number>100){
                    this.$Message.error('商品数量不能大于100');
                    return false;
                }
                if(this.goodsImgList.length>0){
                    var goodsImgList = [];
                    this.goodsImgList.forEach((item,index)=>{
                        goodsImgList.push(item.url)
                    })
                    this.params.goodsImgUrl = goodsImgList.join(",");
                }
                
                if(this.prove.html !=''){
                    this.params.prove = this.prove.html;
                }
            }
            if(this.skip == 2){
                // if(!this.params.feeler){
                //     this.$Message.error('请输入质检机构');
                //     return false;
                // }
                if(this.feelerTrace.html !=''){
                    this.params.feelerTrace = this.feelerTrace.html;
                }
            }
            if(this.skip == 3){
                // if(!this.params.addressName){
                //     this.$Message.error('请输入名称');
                //     return false;
                // }
                // if(!this.params.address){
                //     this.$Message.error('请选择详细地址');
                //     return false;
                // }
                if(this.bannerList.length>0){
                    var bannerList = [];
                    this.bannerList.forEach((item,index)=>{
                        bannerList.push(item.url)
                    })
                    this.params.bannerUrl = bannerList.join(",");
                }

                this.getLocationsRefList();
                this.getCarrierList();
                this.getGreatMasterList();
            }
            this.skip = this.skip + 1;
        },
        // 打开保存模板的模态框
        saveTemplet(){
            // if(!this.params.ptBatch){	
            //     this.$Message.error('请选择加工批次');
            //     return false;
            // }
            // if(!this.params.traceId){
            //     this.$Message.error('请选择轨迹名称');
            //     return false;
            // }            if(this.leaderList.length>0){
            if(this.leaderList.length>0){
                this.params.leaderImgurl = this.leaderList[0].url
            }
    
            this.params.traceName = this.traceList[this.params.traceId];

            this.modal.is = true;
        },
        // 商品添加提交
        submit(){
            
            // if(!this.params.ptBatch){	
            //     this.$Message.error('请选择加工批次');
            //     return false;
            // }
            // if(!this.params.traceId){
            //     this.$Message.error('请选择轨迹名称');
            //     return false;
            // }            
            
            if(!this.loading){
                this.loading = true;
                if(this.leaderList.length>0){
                    this.params.leaderImgurl = this.leaderList[0].url
                }
                
                this.params.traceName = this.traceList[this.params.traceId];
                
                var _this = this;
                addGoods(this.params).then(res=>{
                    if(res.code == 200){
                        this.$Message.success('提交成功');
                        _this.cancel();
                    }
                    this.loading = false;
                })
            }
            
        },
        // 提交模板
        submitTemplet(){
            if(!this.modal.info.classlfyId){
                this.$Message.error('请选择模板分类');
                return false;
            }
            if(!this.modal.info.name){
                this.$Message.error('请输入模板名称');
                return false;
            }
            this.$Modal.confirm({
                content: '确定创建“'+this.modal.info.name+'”模板，新模板将生效',
                onOk: () => {
                    this.modal.is = false;
                    addTemplet({
                        name: this.modal.info.name,
                        classlfyId: this.modal.info.classlfyId,
                        goods: this.params
                    }).then(res=>{
                        if(res.code == 200){
                            this.$Message.success('模板保存成功');
                        }
                    });
                }
            });
        },
        // 打开地图
        location(){
            this.mapModal.is = true;     
        },
        // 地图坐标确认
        mapConfirm(){
            this.mapModal.is = false; 
            var point = this.$refs.baiduMap.point;
            this.params.lon = point.lng;
            this.params.lat = point.lat;
            this.params.address = point.address;
            console.log(this.$refs.baiduMap.point.lng+","+this.$refs.baiduMap.point.lat+","+this.$refs.baiduMap.point.address);
        },
        // 属性添加
        attributeAdd(name){
            switch(name){
                case 'goodsProperty':
                    if(!this.goodsProperty.obj.name){
                        this.$Message.error('请输入商品属性名');
                        return false;
                    }
                    if(!this.goodsProperty.obj.value){
                        this.$Message.error('请输入商品属性值');
                        return false;
                    }
                    break;
                case 'goodsPropertyQuality':
                    if(!this.goodsPropertyQuality.obj.name){
                        this.$Message.error('请输入检测属性名');
                        return false;
                    }
                    if(!this.goodsPropertyQuality.obj.value){
                        this.$Message.error('请输入检测属性值');
                        return false;
                    }
                    break;
                case 'goodsTrajectory':
                    // if(!this.goodsTrajectory.obj.send){
                    //     this.$Message.error('请选择发货地');
                    //     return false;
                    // }
                    if(!this.goodsTrajectory.obj.receive){
                        this.$Message.error('请选择场地');
                        return false;
                    }
                    // if(!this.goodsTrajectory.obj.location){
                    //     this.$Message.error('请输入仓库存放位置');
                    //     return false;
                    // }
                    // if(!this.goodsTrajectory.obj.driverId){
                    //     this.$Message.error('请选择承运人');
                    //     return false;
                    // }
                    //  if(!this.goodsTrajectory.obj.artistId){
                    //     this.$Message.error('请选择珠宝大师');
                    //     return false;
                    // }
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
            eventBus.$emit('closeTag', 'goodsAdd');
            history.go(-1);
        }
    }
};
</script>
<style lang="less">
    @import '../../../common/styles/common.less';
    @import './add.less';
</style>