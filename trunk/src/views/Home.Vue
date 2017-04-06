
<template>
    <!--<div id="app">-->
    <!--<img src="./assets/logo.png">-->
    <!--<h1 v-loading="listLoading">{{ msg }}</h1>-->
    <!--<el-button @click.native="startHacking">Let's do it</el-button>-->
    <!--</div>-->
    <el-row class="container">
        <el-col :span="24" class="header">
            <el-col :span="10" class="logo" :class="collapsed?'logo-collapsed-width':'logo-width'">
                {{collapsed?'':sysName}}
            </el-col>
            <el-col :span="10" >
                <div class="tools" @click.prevent="collapse">
                    <i class="fa fa-align-justify"></i>
                </div>
            </el-col>
            <el-col :span="4" class="userinfo">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link userinfo-inner"><img class="userHead" :src="this.userAvatar"/>{{userName}}</span>
                    <el-dropdown-menu >
                        <el-dropdown-item>我的消息</el-dropdown-item>
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-col>

        <el-col :span="24" class="main">
            <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
                <!--导航菜单-->
                <el-menu :default-active="$route.path" class="el-menu-vertical-demo"  unique-opened router v-show="!collapsed">
                    <template v-for="(item , index) in $router.options.routes" v-if="!item.hidden">
                        <el-submenu :index="index+''"  v-if="!item.leaf">
                            <template  slot="title"><i :class="item.iconCls" ></i>{{item.name}}</template>
                            <el-menu-item v-for="child in item.children"   :index="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
                        </el-submenu>
                        <el-menu-item v-if="item.leaf &&  item.children && item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls" ></i>{{item.children[0].name}}</el-menu-item>

                    </template>
                </el-menu>
                <!--导航菜单--折叠后-->
                <ul class="el-menu el-menu-vertical-demo" v-show="collapsed" ref="menuCollapsed">
                    <li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="item" >
                        <template v-if="!item.leaf">
                            <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
                            <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                                <li v-for="child in item.children"  @click="$router.push({path:child.path})"  v-if="!child.hidden" class="el-menu-item" style="padding-left: 40px;"  >{{child.name}}</li>
                            </ul>
                        </template>
                        <template v-else>
                            <li class="el-submenu">
                                <div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;"><i :class="item.iconCls"></i></div>
                            </li>
                        </template>
                    </li>
                </ul>
            </aside>
            <section class="content-container">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" class="breadcrumb-container">
                        <strong class="title">{{$route.name}}</strong>
                        <el-breadcrumb separator="/" class="breadcrumb-inner">
                            <el-breadcrumb-item v-for="item in $route.matched">
                                {{ item.name }}
                                        </el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="24" class="content-wrapper">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </el-col>
                </div>
            </section>
        </el-col>
    </el-row>
</template>

<script>
	import '../style/app.css'
	export default {
		data () {
			return {
				msg: 'Use Vue 2.0 Today!',
				listLoading:false,
				collapsed:false,
				sysName:'犀牛法律',
				userName:'谢凯',
				userAvatar:'',
				routes:[
					{
						path: '/',
//                        component: Home,
						name: '导航一',
						iconCls: 'el-icon-message',//图标样式class
						children: [
							{ path: '/main',  name: '主页', hidden: true },
							{ path: '/table', name: 'Table' , hidden: false},
							{ path: '/form',  name: 'Form' },
							{ path: '/user',  name: '列表' },
						]
					},
					{
						path: '/',
//                        component: Home,
						name: '导航二',
						iconCls: 'fa fa-id-card-o',
						children: [
							{ path: '/page43',  name: '页面45' },
							{ path: '/page4',  name: '页面4' },
							{ path: '/page5',  name: '页面5' }
						]
					},
					{
						path: '/',
//                        component: Home,
						name: '',
						iconCls: 'fa fa-address-card',
						leaf: true,//只有一个节点
						children: [
							{ path: '/page6',  name: '导航三' }
						]
					},
				]
			}
		},
		handleopen() {
			//console.log('handleopen');
		},
		handleclose() {
			//console.log('handleclose');
		},
		handleselect: function (a, b) {
		},
		methods: {
			collapse (){
				this.collapsed = !this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			},
			startHacking () {
//      this.$notify({
//        title: 'It Works',
//        message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
//        duration: 6000
//      })
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;

				}).catch(() => {
					console.log('取消')
				});

			},
			logout:function(){
				this.$confirm('确认要退出吗？','提示',{
					type:'warning'
				}).then(()=>{
					this.$router.push({path:'/login'})
				}).catch(()=>{
					console.log('取消');
				})
			}
		},
		mounted(){
			var user = sessionStorage.getItem('user');
			if(user){
				user = JSON.parse(user);
				this.userName = user.name || '';
				this.userAvatar = user.avatar || '';
				this.sysName = '犀牛法律';
            }
        }
	}
</script>














