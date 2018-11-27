<style lang="less">
@import "../../../common/styles/common.less";
@import "./edit.less";

</style>

<template>
    <div class="edit">
        <Card>
            <p slot="title">
               修改token价值
            </p>
            <div class="cnt">
                <div class="item">
                    <span class="lb">矿池总量比例：</span>                   
                    <span>
                        <Input v-model.number="params.left" style="width:50px"/>
                    </span>
                    ：
                    <span>
                        <Input v-model.number="params.right" style="width:50px"/>
                    </span>   
                </div>
                <div class="item">
                    <span class="lb">token价值(元)：</span>                   
                    <span>
                        <Input v-model.number="params.worth" style="width:350px" />
                    </span>   
                </div>
				<div class="item btn">
					<span class="lb"></span>       
					<span>
						<Button size="large" @click="cancel()">取消</Button>
						<Button type="info" size="large" @click="confirm()" :loading="loading">确定</Button>
					</span>	
				</div>
            </div>
			
        </Card>
    </div>
</template>

<script>
import {} from "@/api/api_syetemParams.js";
import eventBus from "@/common/evnetBus/eventBus.js";
import md5 from "@/common/libs/md5.js";
export default {
	data() {
		return {
			loading: false,
			params: {

            },
		};
	},
	created() {
        this.getDetail();
	},
  	mounted() {},
	methods: {
        getDetail(){
        },
	
		confirm() {
            console.log(this.params)
        },
		cancel(){
            eventBus.$emit('closeTag', 'worth_edit');
			history.go(-1);
		}
  	},
  	computed: {}
};
</script>