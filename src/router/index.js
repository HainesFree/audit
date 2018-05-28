import Vue from 'vue'
import Router from 'vue-router'
import AuditList from '@/pages/audit/audit_list'
import AuditDetail from '@/pages/audit/audit_detail'
Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'AuditList',
      component: AuditList
    },
    {
      path: '/auditdetail/:id',
      name: 'AuditDetail',
      component: AuditDetail
    },
  ]
})
