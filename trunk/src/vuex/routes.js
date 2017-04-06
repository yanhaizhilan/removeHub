/**
 * Created by xiekai on 2017/4/5.
 */
import Login from '../views/Login.vue';
import NotFound from '../views/404.vue';
import Main from '../views/Main.vue';
import Home from '../views/Home.vue';
import Form from '../views/nav1/form.vue';
import Table from '../views/nav2/Table.vue';


let routes = [
	{
		path: '/login',
		component: Login,
		name: '登录',
		iconCls:'fa fa-recycle',
		hidden: true,

	},
	{
		path: '/404',
		component: NotFound,
		name: '未找到',
		iconCls:'fa fa-recycle',
		hidden: true,

	},
	{
		path: '/',
		component: Home,
		name: '导航一',
		iconCls: 'el-icon-message',//图标样式class
		children: [
			{ path: '/main', component: Main, name: '主页', hidden: false },
			{ path: '/form', component: Form, name: 'Form', hidden: false },
		]
	},{
		path: '/',
		component: Home,
		name: '用户列表',
		iconCls: 'el-icon-message',//图标样式class
		leaf: true,//只有一个节点
		children: [
			{ path: '/Table', component: Table, name: '用户列表', hidden: false },
		]
	},
];

export default routes;

















