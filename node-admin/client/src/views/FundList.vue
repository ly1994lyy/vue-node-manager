<template>
    <div class="fillContainer">
        <div>
            <el-form :inline="true" ref="add_data" :model='search_data'>
                <el-form-item label="按照时间筛选:">
                    <el-date-picker
                    v-model="search_data.startTime"
                    type="datetime"
                    placeholder="选择开始时间"
                    >
                    </el-date-picker>
                    --
                    <el-date-picker
                    v-model="search_data.endTime"
                    type="datetime"
                    placeholder="选择结束时间"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type='primary' size="search" @click="handleSearch()">筛选</el-button>
                </el-form-item>
                <el-form-item class="btnRight">
                    <el-button type='primary' size="small" @click="handleAdd()">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table
            v-if="tableData.length > 0"
            :data="tableData"
            max-height='450'
            border
            style="width: 100%">
            <el-table-column
                type='index'
                label="序号"
                align='center'
                width="70">
                </el-table-column>
                <el-table-column
                prop='date'
                label="创建时间"
                align='center'
                width="250">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop='type'
                label="收支类型"
                align='center'
                width="150">
                </el-table-column>
                <el-table-column
                prop='describe'
                label="收支描述"
                align='center'
                width="180">
                </el-table-column>
                <el-table-column
                prop='incode'
                label="收入"
                align='center'
                width="170">
                <template slot-scope="scope">
                    <span style="color:#00d053">{{ scope.row.incode }}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop='expend'
                label="支出"
                align='center'
                width="170">
                <template slot-scope="scope">
                    <span style="color:#f56767">{{ scope.row.expend }}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop='cash'
                label="账户现金"
                align='center'
                width="170">
                <template slot-scope="scope">
                    <span style="color:#4db3ff">{{ scope.row.cash }}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop='remark'
                label="备注"
                align='center'
                width="220">
                </el-table-column>
                <el-table-column label="操作" v-if="user.identity == 'manager'" prop="operation" fixed="right" align="center" width="320">
                    <template slot-scope="scope">
                        <el-button
                        type='warning'
                        icon='edit'
                        size="small"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="small"
                        icon='delete'
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row>
                <el-col :span='24'>
                    <div class="pagination">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="paginations.page_index"
                        :page-sizes="paginations.page_sizes"
                        :page-size="paginations.page_size"
                        :layout="paginations.layout"
                        :total="paginations.total">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>
        <Dialog :dialog="dialog" :formData="formData" @update='getProfile'></Dialog>    
    </div>    
</template>

<script>
import Dialog from '../components/Dialog'

export default {
    data(){
        return {
            search_data:{
                startTime:'',
                endTime:''
            },
            paginations:{
                page_index:1, //当前位于多少页
                total:0, //总数
                page_size:5,  //一页显示多少条
                page_sizes:[5,10,15], //每页显示多少条
                layout:'total,sizes,prev,pager,next,jumper' // 翻页属性
            },
            tableData:[],
            allTableData:[],
            fileterTableData:[],
            formData:{
                type:'',
                describe:'',
                incode:'',
                expend:'',
                cash:'',
                remark:'',
                id:''
            },
            dialog:{
                show:false,
                title:'',
                option:'edit'
            }
        }
    },
    methods:{
        getProfile(){
            this.$http.get('/api/profiles')
            .then(res=>{
                this.allTableData = res.data
                this.fileterTableData = res.data
                //设置分页数据
                this.setPaginations()
            })
            .catch(err=>console.log(err))
        },
        handleAdd(){
            this.dialog = {
                show:true,
                title:'添加资金管理信息',
                option:'add'
            }
            this.formData = {
                type:'',
                describe:'',
                incode:'',
                expend:'',
                cash:'',
                remark:'',
                id:''
            }
        },
        handleEdit(index,row){
            this.dialog = {
                show:true,
                title:'编辑资金管理信息',
                option:'exit'
            }
            this.formData = {
                type:row.type,
                describe:row.describe,
                incode:row.incode,
                expend:row.expend,
                cash:row.cash,
                remark:row.remark,
                id:row._id
            }
        },
        handleDelete(index,row){
            this.$http.delete(`/api/profiles/delete/${row._id}`).then(()=>{
                this.$message('删除成功')
                this.getProfile()
            })
        },
        setPaginations(){
            this.paginations.total = this.allTableData.length
            this.paginations.page_index = 1
            this.paginations.page_size = 5
            //设置默认分页数据
            this.tableData = this.allTableData.filter((item,index)=>{
                return index < this.paginations.page_size
            })
        },
        handleSizeChange(page_size){
            this.paginations.page_index = 1
            this.paginations.page_size = page_size
            this.tableData = this.allTableData.filter((item,index)=>{
                return index < page_size
            })
        },
        handleCurrentChange(page){
            //获取当前页
            let index = this.paginations.page_size * (page-1)
            //数据总数
            let nums = this.paginations.page_size * page
            let tables = []
            for(let i=index; i<nums; i++){
                if(this.allTableData[i]){
                    tables.push(this.allTableData[i])
                }
                this.tableData = tables
            }
        },
        handleSearch(){
            if(!this.search_data.startTime || !this.search_data.endTime){
                this.$message({
                    type:'warning',
                    message:'请选择时间区间'
                })
                this.getProfile()
                return
            }
            const sTime = this.search_data.startTime.getTime()
            const eTime = this.search_data.endTime.getTime()
            this.allTableData = this.fileterTableData.filter(item=>{
                let date = new Date(item.date)
                let time = date.getTime()
                return time >= sTime && time <= eTime
            })
            this.setPaginations()
        }
    },
    computed:{
        user(){
            return this.$store.getters.user
        }
    },
    created(){
        this.getProfile()
    },
    components:{
        Dialog,
    }
}
</script>

<style scoped>
.fillContainer{
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box
}

.btnRight{
    float: right;
}

.pagination{
    text-align: right;
    margin-top: 10px;
}
</style>
