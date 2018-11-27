
<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        登录日志
                    </p>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :columns="columns" :data="list"></Table>
                    </Row>
                    <Page v-if="pageTotal>0" :current="page"  :total="pageTotal" :page-size="searchParams.pageSize"  @on-change="convertPage" @on-page-size-change="convertPageSize"  show-elevator show-total show-sizer :page-size-opts="[10,20,50]" placement="top"></Page>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import { getList } from '@/api/api_home.js'
export default {
    data () {
        return {
            columns:[],
            list: [],
            page:1,
            pageTotal:0,
            searchParams:{
                pageNo: 1,
                pageSize: 10
            },
        };
    },
    methods: {
        init () {
            this.getList()
            this.setColumns();
        },
        setColumns(){
            this.columns = [
            {
                key: 'loginTime',
                title: '时间'
            },{
                key: 'ip',
                title: 'IP',
            },{
                key: 'area',
                title: '地区',
            },{
                key: 'adminAccount',
                title: '账户',
            },{
                key: 'browser',
                title: '浏览器',
            }];
        },
        getList(){
            this.$Spin.show()
            getList(this.searchParams).then(res => {
                if(res.code == 200) {
                    this.$Spin.hide()
                    this.list = res.data.entities || []
                    this.pageTotal = res.data.count
                }else {
                    this.$Spin.hide()
                }
            })
        },
        // 选择页数
		convertPage(index) {
			this.searchParams.pageNo = index;
			this.getList(() => {
				this.page = index;
			});
        },
        convertPageSize(size){
            this.searchParams.pageSize = size;
            this.getList();
        }
    },
    mounted () {
        this.init();
    }
};
</script>
<style lang="less">
    @import '../../common/styles/common.less';
</style>