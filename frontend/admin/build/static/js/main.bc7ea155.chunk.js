(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{12:function(e,A,a){e.exports={root:"Login_root__VSeKR",username:"Login_username__38fGN",password:"Login_password__2mfQK",inputColumn:"Login_inputColumn__1HAyZ",btn:"Login_btn__1B4qV"}},25:function(e,A,a){},47:function(e,A,a){},48:function(e,A,a){},49:function(e,A,a){},68:function(e,A,a){},69:function(e,A,a){},70:function(e,A,a){},71:function(e,A,a){},72:function(e,A,a){},73:function(e,A,a){"use strict";a.r(A);var t=a(1),c=a(18),n=a.n(c),s=a(6),r=a(3),j=a(11),i=a(9),l=a(21),d=a(16),b=a.n(d),o=a(20);function O(e,A){return new Promise((function(A){A({id:123,username:e,email:"sample@email.com"})}))}var x=Object(l.b)({name:"auth",initialState:{user:null},reducers:{setUser:function(e,A){return Object.assign({},e,{user:A.payload})}}}),h=x.reducer,p=function(e){return null!==e.auth.user};function Q(e,A){return function(){var A=Object(o.a)(b.a.mark((function A(a){var t;return b.a.wrap((function(A){for(;;)switch(A.prev=A.next){case 0:return A.next=2,O(e);case 2:t=A.sent,a(x.actions.setUser(t));case 4:case"end":return A.stop()}}),A)})));return function(e){return A.apply(this,arguments)}}()}var u=Object(i.b)({auth:h}),B=Object(l.a)({reducer:u}),g=a(22),C=a(0);var v=function(e){return Object(j.c)(p)?Object(C.jsx)(r.b,Object(g.a)({},e)):Object(C.jsx)(r.a,{to:"/login"})};var f=function(e){return Object(j.c)(p)?Object(C.jsx)(r.a,{to:"/"}):Object(C.jsx)(r.b,Object(g.a)({},e))};var m=a(14),Y=a(12),G=a.n(Y);function E(){var e=Object(t.useState)(""),A=Object(m.a)(e,2),a=A[0],c=A[1],n=Object(t.useState)(""),s=Object(m.a)(n,2),i=s[0],l=s[1],d=Object(r.g)(),O=Object(j.b)(),x=function(){var e=Object(o.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O(Q(a));case 2:d.push("/mypage");case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(C.jsx)(C.Fragment,{children:Object(C.jsxs)("div",{className:G.a.root,children:[Object(C.jsx)("h1",{children:"\u7ba1\u7406\u8005\u30ed\u30b0\u30a4\u30f3"}),Object(C.jsx)("div",{className:G.a.username}),Object(C.jsxs)("form",{onSubmit:x,children:[Object(C.jsxs)("div",{className:G.a.username,children:[Object(C.jsxs)("label",{htmlFor:"username",children:["\u30e6\u30fc\u30b6\u30fcID",Object(C.jsx)("br",{})]}),Object(C.jsx)("input",{className:G.a.inputColumn,type:"text",value:a,onChange:function(e){return c(e.target.value)}})]}),Object(C.jsxs)("div",{className:G.a.password,children:[Object(C.jsxs)("label",{htmlFor:"password",children:["\u30d1\u30b9\u30ef\u30fc\u30c9",Object(C.jsx)("br",{})]}),Object(C.jsx)("input",{className:G.a.inputColumn,type:"password",value:i,onChange:function(e){return l(e.target.value)}})]}),Object(C.jsx)("button",{className:G.a.btn,type:"submit",children:"\u30ed\u30b0\u30a4\u30f3"})]})]})})}var w=function(){return Object(C.jsx)("div",{children:Object(C.jsx)("p",{children:"TopPage"})})},N=(a(47),a(48),function(e){return Object(C.jsx)("div",{className:"rogbtn",children:Object(C.jsx)("p",{children:e.btn_title})})}),D=function(e){return Object(C.jsx)("div",{className:"headerBox",children:Object(C.jsxs)("div",{className:"header",children:[Object(C.jsx)("div",{className:"header_title",children:e.pagename}),Object(C.jsx)(s.b,{style:{textDecoration:"none",color:"black"},to:"/Login",children:Object(C.jsx)("div",{className:"rogoutbtn",children:Object(C.jsx)(N,{btn_title:"\u30ed\u30b0\u30a2\u30a6\u30c8"})})})]})})},I=(a(25),function(e){return Object(C.jsx)("div",{className:"transBox",children:Object(C.jsx)(s.b,{to:e.url,className:"linkdeco",children:Object(C.jsxs)("p",{children:[Object(C.jsx)("img",{className:"icon",src:e.icon}),e.pagename]})})})}),U=function(e){return Object(C.jsx)("div",{className:"TitleBox",children:Object(C.jsx)(s.b,{to:e.url,className:"linkdeco",children:Object(C.jsx)("div",{className:"TitleString",children:"\u7ba1\u7406\u30b7\u30b9\u30c6\u30e0"})})})},X="data:image/png;base64,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",V=function(e){return Object(C.jsxs)("div",{className:"sideBox",children:[Object(C.jsx)(U,{url:"/TopPage"}),Object(C.jsx)(I,{url:"/ApprovalList",icon:X,pagename:"\u627f\u8a8d\u30ea\u30b9\u30c8"}),Object(C.jsx)(I,{url:"/UnapprovalList",icon:X,pagename:"\u672a\u627f\u8a8d\u30ea\u30b9\u30c8"}),Object(C.jsx)(I,{url:"/DisapprovalList",icon:X,pagename:"\u4e0d\u627f\u8a8d\u30ea\u30b9\u30c8"}),Object(C.jsx)(I,{url:"/CancelList",icon:X,pagename:"\u30ad\u30e3\u30f3\u30bb\u30eb\u30ea\u30b9\u30c8"}),Object(C.jsx)(I,{url:"/UserList",icon:X,pagename:"\u30e6\u30fc\u30b6\u30fc\u30ea\u30b9\u30c8"}),Object(C.jsx)(I,{url:"/Calendar",icon:"data:image/png;base64,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",pagename:"\u30ab\u30ec\u30f3\u30c0\u30fc"})]})},P=(a(49),function(e){var A=e.children,a=e.pagename;return Object(C.jsx)(r.b,{exact:!0,path:A.props.path,children:Object(C.jsx)(C.Fragment,{children:Object(C.jsxs)("div",{className:"allbox",children:[Object(C.jsx)("div",{className:"sidebar",children:Object(C.jsx)(V,{})}),Object(C.jsxs)("div",{className:"mainbox",children:[Object(C.jsx)(D,{pagename:a}),Object(C.jsx)("div",{className:"contents",children:A})]})]})})})});P.defaultProps={};var q=P,H=a(13),y=a.n(H),L=(a(68),function(){return Object(C.jsxs)("div",{children:[Object(C.jsx)("table",{className:"approvallistall",children:Object(C.jsxs)("tr",{children:[Object(C.jsx)("td",{children:"\u65e5\u4ed8"}),Object(C.jsx)("td",{children:"\u56e3\u4f53\u8005\u540d"}),Object(C.jsx)("td",{children:"\u500b\u4eba/\u56e3\u4f53"}),Object(C.jsx)("td",{children:"\u6642\u9593"}),Object(C.jsx)("td",{children:"\u4eba\u6570"}),Object(C.jsx)("td",{children:"\u5834\u6240"}),Object(C.jsx)("td",{children:"\u8a73\u7d30"})]})}),Object(C.jsx)("p",{children:"aaaaaaaaa"}),Object(C.jsx)("p",{children:"aaaaaaaaa"}),Object(C.jsx)("p",{children:"aaaaaaaaa"}),Object(C.jsx)("p",{children:"aaaaaaaaa"}),Object(C.jsx)("p",{children:"aaaaaaaaa"}),Object(C.jsx)("p",{children:"aaaaaaaaa"}),Object(C.jsx)("p",{children:"aaaaaaaaa"}),Object(C.jsx)("p",{children:"aaaaaaaaa"}),Object(C.jsx)("p",{children:"aaaaaaaaa"})]})}),T=(a(69),function(){return Object(C.jsx)("div",{className:"printingbutton-wrapper",children:Object(C.jsx)("p",{className:"printingbutton",children:"\u5370\u5237"})})}),R=(a(70),function(){return Object(C.jsx)("div",{children:Object(C.jsx)("div",{className:"good"})})}),K=(a(71),function(){return Object(C.jsxs)("div",{className:"list-wrapper",children:[Object(C.jsx)("div",{className:"scroll_box-wrapper",children:Object(C.jsxs)("div",{className:"scroll_box",children:[Object(C.jsx)(L,{}),Object(C.jsx)(R,{})]})}),Object(C.jsx)("div",{className:"printingbutton-wrapper-wrapper",children:Object(C.jsx)(T,{})})]})}),M=function(){return Object(C.jsx)("div",{children:Object(C.jsx)("p",{children:"DisapprovalList"})})},W=function(){return Object(C.jsx)("div",{children:Object(C.jsx)("p",{children:"UnapprovalList"})})},z=function(){return Object(C.jsx)("h1",{children:"MyPage"})},F=function(){var e=Object(t.useState)([]),A=Object(m.a)(e,2),a=A[0],c=A[1];return Object(t.useEffect)((function(){y.a.get("https://webhok.net/reservation_system/api/reservations/9999-01-01T00:00/approval-applications/?approval=2").then((function(e){var A=e.data;c(A)})).catch((function(e){console.log(e)}))}),[]),Object(C.jsxs)("div",{children:[Object(C.jsx)("table",{className:"userlistall",children:Object(C.jsxs)("tr",{children:[Object(C.jsx)("td",{children:"\u65e5\u4ed8"}),Object(C.jsx)("td",{children:"\u56e3\u4f53\u8005\u540d"}),Object(C.jsx)("td",{children:"\u500b\u4eba/\u56e3\u4f53"}),Object(C.jsx)("td",{children:"\u6642\u9593"}),Object(C.jsx)("td",{children:"\u4eba\u6570"}),Object(C.jsx)("td",{children:"\u5834\u6240"}),Object(C.jsx)("td",{children:"\u8a73\u7d30"})]})}),Object(C.jsx)("p",{children:"aaaaaaaaa"}),Object(C.jsx)("p",{children:"aaaaaaaaa"}),Object(C.jsx)("p",{children:"aaaaaaaaa"}),Object(C.jsx)("p",{children:"aaaaaaaaa"}),Object(C.jsx)("p",{children:"aaaaaaaaa"}),Object(C.jsx)("p",{children:"aaaaaaaaa"}),Object(C.jsx)("p",{children:"aaaaaaaaa"}),a.map((function(e){return Object(C.jsxs)("p",{children:[e.id," ",e.place]})}))]})},k=function(){return Object(C.jsx)("div",{className:"list-wrapper",children:Object(C.jsx)("div",{className:"scroll_box-wrapper",children:Object(C.jsx)("div",{className:"scroll_box",children:Object(C.jsx)(F,{})})})})},J=function(){var e=Object(t.useState)([]),A=Object(m.a)(e,2),a=A[0],c=A[1];return Object(t.useEffect)((function(){y.a.get("https://webhok.net/reservation_system/api/users/").then((function(e){var A=e.data;console.log(A),c(A)})).catch((function(e){console.log(e)}))}),[]),Object(C.jsxs)("div",{children:[Object(C.jsx)("table",{className:"userlistall",children:Object(C.jsxs)("tr",{children:[Object(C.jsx)("td",{children:"id"}),Object(C.jsx)("td",{children:"\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9"}),Object(C.jsx)("td",{children:"\u8a73\u7d30"})]})}),Object(C.jsx)("p",{children:"aaaaaaaaa"}),Object(C.jsx)("p",{children:"aaaaaaaaa"}),Object(C.jsx)("p",{children:"aaaaaaaaa"}),Object(C.jsx)("p",{children:"aaaaaaaaa"}),Object(C.jsx)("p",{children:"aaaaaaaaa"}),Object(C.jsx)("p",{children:"aaaaaaaaa"}),Object(C.jsx)("p",{children:"aaaaaaaaa"}),Object(C.jsx)("p",{children:"aaaaaaaaa"}),a.map((function(e){return Object(C.jsxs)("p",{children:[e.id," ",e.email]})}))]})},S=function(){return y.a.get("https://webhok.net/reservation_system/api/users/1").then((function(e){console.log(e)})).catch((function(e){console.log(e)})),Object(C.jsx)("div",{className:"list-wrapper",children:Object(C.jsx)("div",{className:"scroll_box-wrapper",children:Object(C.jsx)("div",{className:"scroll_box",children:Object(C.jsx)(J,{})})})})},Z=function(){return Object(C.jsx)("div",{children:Object(C.jsx)("p",{children:"Calendar"})})};a(72);function _(){return Object(C.jsx)(j.a,{store:B,children:Object(C.jsx)(s.a,{children:Object(C.jsxs)(r.d,{children:[Object(C.jsx)(r.b,{path:"/",exact:!0,children:Object(C.jsx)(E,{})}),Object(C.jsx)(f,{path:"/login",children:Object(C.jsx)(E,{})}),Object(C.jsx)(q,{path:"/toppage",exact:!0,children:Object(C.jsx)(v,{path:"/TopPage",exact:!0,children:Object(C.jsx)(w,{})})}),Object(C.jsx)(q,{path:"/mypage",exact:!0,children:Object(C.jsx)(v,{path:"/MyPage",exact:!0,children:Object(C.jsx)(z,{})})}),Object(C.jsx)(q,{pagename:"\u627f\u8a8d\u30ea\u30b9\u30c8",path:"/approvalList",exact:!0,children:Object(C.jsx)(v,{path:"/ApprovalList",exact:!0,children:Object(C.jsx)(K,{})})}),Object(C.jsx)(q,{pagename:"\u672a\u627f\u8a8d\u30ea\u30b9\u30c8",path:"/disapprovalList",exact:!0,children:Object(C.jsx)(v,{path:"/DisapprovalList",exact:!0,children:Object(C.jsx)(M,{})})}),Object(C.jsx)(q,{pagename:"\u4e0d\u627f\u8a8d\u30ea\u30b9\u30c8",path:"/unapprovalList",exact:!0,children:Object(C.jsx)(v,{path:"/UnapprovalList",exact:!0,children:Object(C.jsx)(W,{})})}),Object(C.jsx)(q,{pagename:"\u30ad\u30e3\u30f3\u30bb\u30eb\u30ea\u30b9\u30c8",path:"/cancellist",exact:!0,children:Object(C.jsx)(v,{path:"/CancelList",exact:!0,children:Object(C.jsx)(k,{})})}),Object(C.jsx)(q,{pagename:"\u30e6\u30fc\u30b6\u30fc\u30ea\u30b9\u30c8",path:"/userlist",exact:!0,children:Object(C.jsx)(v,{path:"/userlist",exact:!0,children:Object(C.jsx)(S,{})})}),Object(C.jsx)(q,{pagename:"\u30ab\u30ec\u30f3\u30c0\u30fc",path:"/calendar",exact:!0,children:Object(C.jsx)(v,{path:"/calendar",exact:!0,children:Object(C.jsx)(Z,{})})})]})})})}var $=document.querySelector("#root");n.a.render(Object(C.jsx)(_,{}),$)}},[[73,1,2]]]);
//# sourceMappingURL=main.bc7ea155.chunk.js.map