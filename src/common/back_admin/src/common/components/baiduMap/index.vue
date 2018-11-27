<style lang="less">
    @import './index.less';
</style>

<template>
    <Row>
        <Col>
            <div id="baiduMap"></div>
            <div class="map-search">
                <input ref="suggestId" name="searchVal" placeholder="地址" v-model="searchVal" />
                <ul class="searchResult" v-if="searchResult.length > 0">
                    <li v-for="(item,index) of searchResult" :key="index" @click="checkAddress(item)">
                        <label class="title" >{{item.title}}</label> <label class="address">- {{item.address}}</label>
                    </li>
                </ul>
            </div>
        </Col>
    </Row>
</template>

<script>

export default {
    name: 'baidu-map',
    props: {
       show:{
           type: Boolean,
           default: false
       }
    },
   
    data () {
        return {
            marker: null,
            map: null,
            geoc: null,
            searchVal:'',
            searchResult:[],
            point:{
                lng: 0,
                lat: 0
            }
        };
    },
    mounted () {
        this.initBaiduMap();
    },
    methods: {
        initBaiduMap() {
            var map = new BMap.Map("baiduMap");
　　　　　　 map.centerAndZoom(new BMap.Point(114.078763, 22.551041), 12);
            map.enableScrollWheelZoom(true);
            // 覆盖区域图层测试
            // map.addTileLayer(new BMap.PanoramaCoverageLayer());
            
            // 当前城市区域
            var myCity = new BMap.LocalCity();
            myCity.get(function(result){
                var cityName = result.name;
                map.setCenter(cityName);
            });
            this.geoc = new BMap.Geocoder();
            map.addEventListener("click", function(e){
                _this.createMarker(e)     
            });
            var ac = new BMap.Autocomplete();
            var _this = this;
            var local = new BMap.LocalSearch(map, { //智能搜索
                onSearchComplete: function(results){
                    if(results) {
                        _this.searchResult = results.Br || results.Ar;
                    }
                    
                }
            });
            
            this.$refs.suggestId.addEventListener("keyup",function(e){
                local.search(_this.searchVal);
            })
           
            //添加全景控件
            var stCtrl = new BMap.PanoramaControl(); 
            stCtrl.setOffset(new BMap.Size(20, 20));
            map.addControl(stCtrl);
            this.map = map;
        },
        createMarker(e){
            if(this.marker){
                this.marker.remove(); 
            }
            this.point = e.point;
            var _this = this;
            this.geoc.getLocation(e.point, function(rs){
                
                console.log("当前位置：" + _this.point.lng + ", " + _this.point.lat);      
                var p = new BMap.Point(_this.point.lng, _this.point.lat);//创建一个地理点坐标
                _this.marker = new BMap.Marker(p);
                
                _this.map.addOverlay(_this.marker);
                _this.map.centerAndZoom(p);
                _this.marker.setAnimation(BMAP_ANIMATION_BOUNCE); 
                _this.marker.enableDragging();    
                _this.marker.addEventListener("dragend", function(e){    
                    _this.point = e.point;
                    console.log("当前位置：" + e.point.lng + ", " + e.point.lat);
                    _this.createMarker(e);
                }) 
                _this.point.address = rs.address;
                _this.marker.openInfoWindow(new BMap.InfoWindow(rs.address,{offset:new BMap.Size(20,-10)}));
            });
        },
        checkAddress(item){
            this.searchResult = [];
            this.searchVal = item.title;
            this.createMarker(item);
        }
    }
}

</script>

