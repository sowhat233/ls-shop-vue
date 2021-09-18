import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const LoginIndex = () => import('@/views/login/Index');
const LayoutIndex = () => import('@/views/layout/Index');
const HomeIndex = () => import('@/views/home/Index');

//product
const ProductIndex = () => import('@/views/product/Index');
const ProductAdd = () => import('@/views/product/Add');
const ProductEdit = () => import('@/views/product/Edit');
const ProductShow = () => import('@/views/product/Show');

//category
const CategoryIndex = () => import('@/views/category/Index');
const CategoryAdd = () => import('@/views/category/Add');
const CategoryEdit = () => import('@/views/category/Edit');


const routes = [
    {
        path: '/login',
        name: 'LoginIndex',
        component: LoginIndex,
    }, {
        path: '/',
        component: LayoutIndex,
        children: [
            {
                path: '',
                name: 'HomeIndex',
                component: HomeIndex,
            },
            //product
            {
                path: '/product',
                name: 'ProductIndex',
                component: ProductIndex,
            }, {
                path: '/product/show',
                name: 'ProductShow',
                component: ProductShow,
            }, {
                path: '/product/add',
                name: 'ProductAdd',
                component: ProductAdd,
            }, {
                path: '/product/edit',
                name: 'productEdit',
                component: ProductEdit,
            },
            //category
            {
                path: '/category',
                name: 'CategoryIndex',
                component: CategoryIndex,
            }, {
                path: '/category/add',
                name: 'CategoryAdd',
                component: CategoryAdd,
            }, {
                path: '/category/edit',
                name: 'CategoryEdit',
                component: CategoryEdit,
            },
        ],
    },
];


export default new Router({
    routes,
});