const routes = [
    { path: '/', component: HomeComponent },
    { path: '/etudiant', component: EtudiantListComponent }
];

const router = new VueRouter({
    routes,
    // mode: 'history'
});

const app = new Vue({
    router
}).$mount('#app');


