(this["webpackJsonpusers-app"]=this["webpackJsonpusers-app"]||[]).push([[0],{100:function(e,t,a){},101:function(e,t,a){},102:function(e,t,a){},103:function(e,t,a){},104:function(e,t,a){"use strict";a.r(t);var c=a(1),n=a.n(c),s=a(35),r=a.n(s),o=a(4),i=a.n(o),l=a(16),j=a.n(l),u=a(105),d=a(21),b=a(6),p=a(2),h=a(27),m=(a(78),a(0)),O=function(e){var t=e.feelist,a=e.age,c=e.time;return console.log(t),console.log(a),console.log(c),Object(m.jsx)("div",{})},x="https://webhok.net/reservation_system",f={LOGIN:"".concat(x,"/account/login/"),REGISTRATION:"".concat(x,"/account/registration/"),LOGOUT:"".concat(x,"/account/logout/"),CHANGE_PASSWORD:"".concat(x,"/account/password/change/"),RESET_PASSWORD:"".concat(x,"/account/password/"),RESET_PASSWORD_CONFIRM:"".concat(x,"/account/password/reset/"),TOKEN:"".concat(x,"/account/token/"),TOKEN_VERIFY:"".concat(x,"/account/token/verify/"),TOKEN_REFRESH:"".concat(x,"/account/token/refresh/"),GET_USER_DATA:"".concat(x,"/account/user/"),GET_USER_LIST:"".concat(x,"/api/users/")},g=function(){var e=Object(c.useState)([]),t=Object(p.a)(e,2),a=t[0],n=t[1],s=Object(c.useState)(),r=Object(p.a)(s,2),o=r[0],l=r[1],j=Object(c.useState)(),u=Object(p.a)(j,2),d=u[0],b=u[1],x=Object(c.useState)(),f=Object(p.a)(x,2),g=f[0],_=f[1],v=Object(c.useState)(),N=Object(p.a)(v,2),w=N[0],y=N[1],S=Object(c.useState)(),k=Object(p.a)(S,2),C=k[0],E=k[1];Object(c.useEffect)((function(){i.a.get("".concat("https://webhok.net/reservation_system","/api/facility-fees/")).then((function(e){var t=e.data;l(t),_(t[1])})).catch((function(e){console.log(e)}))}),[]),Object(c.useEffect)((function(){i.a.get("https://webhok.net/reservation_system/api/places/").then((function(e){var t=e.data;n(t),b(t[0].name)})).catch((function(e){console.log(e)}))}),[]),Object(c.useEffect)((function(){i.a.get("".concat("https://webhok.net/reservation_system","/api/ages/")).then((function(e){var t=e.data;y(t)})).catch((function(e){console.log(e)}))}),[]),Object(c.useEffect)((function(){i.a.get("".concat("https://webhok.net/reservation_system","/api/times/")).then((function(e){var t=e.data;E(t)})).catch((function(e){console.log(e)}))}),[]);var T=a.map((function(e){return Object(m.jsx)(h.a,{onClick:function(){return function(e){b(e);var t=o.filter((function(t){return t.place===e}));return _(t[0])}(e.name)},children:e.name})})),R=a.map((function(e){return Object(m.jsx)(h.c,{children:Object(m.jsx)(O,{feelist:g,age:w,time:C})})}));return Object(m.jsxs)(h.d,{children:[Object(m.jsx)(h.b,{children:T}),Object(m.jsxs)("p",{children:[d,"\u3067\u3059"]}),R]})},_=a(5),v=a.n(_),N=a(15),w=a(18),y=(a(81),a(82),function(e){return Object(m.jsx)("div",{className:"logobox",onClick:function(){window.location.href="/"},children:Object(m.jsx)("img",{src:e.logo})})}),S=a.p+"static/media/logo.0d0657fa.png",k=(a(83),a(36)),C=a.n(k),E=a(9),T=(a(95),function(e){return Object(m.jsx)("div",{children:Object(m.jsx)(d.b,{to:e.url,className:"linkdeco",children:Object(m.jsx)("p",{className:"pagename",style:{color:e.namecolor},children:e.pagename})})})}),R=(a(20),function(e){var t=new w.a,a=f.LOGOUT;return Object(m.jsx)("div",{className:"logout-container",onClick:function(){i.a.post(a,{headers:{Authorization:"JWT ".concat(t.get("access_token"))}}).then((function(e){t.remove("access_token"),t.remove("refresh_token"),t.remove("user_id"),window.location.href="/"})).catch((function(e){console.log(e)}))},children:"\u30ed\u30b0\u30a2\u30a6\u30c8"})});C.a.setAppElement("#root");var F=function(e){var t=Object(c.useState)(!1),a=Object(p.a)(t,2),n=a[0],s=a[1];return Object(m.jsxs)("div",{children:[Object(m.jsxs)("div",{className:"usericonbox",onClick:function(){return s(!0)},children:[Object(m.jsx)("div",{className:"circle"}),Object(m.jsx)("p",{children:Object(m.jsx)(E.a,{icon:e.icon})})]}),Object(m.jsxs)(C.a,{className:"modal",overlayClassName:"overlay",isOpen:n,onRequestClose:function(){return s(!1)},children:[Object(m.jsx)(T,{url:"/account",pagename:"\u30de\u30a4\u30da\u30fc\u30b8"}),Object(m.jsx)(T,{url:"/account",pagename:"\u4e88\u7d04\u4e00\u89a7"}),Object(m.jsx)(R,{})]})]})},A=(a(98),function(e){return Object(m.jsx)("div",{className:"cartbox",children:Object(m.jsx)("p",{children:Object(m.jsx)(E.a,{icon:e.icon})})})}),I=a(29),D=function(){return Object(m.jsx)("button",{type:"button",className:"login-link",onClick:function(){window.location.href="/login"},children:"\u30ed\u30b0\u30a4\u30f3"})},Z=function(){return Object(m.jsx)("button",{type:"button",className:"registration-link",onClick:function(){window.location.href="/registration"},children:"\u65b0\u898f\u767b\u9332"})},G=(a(99),function(){return Object(m.jsx)("div",{className:"loading-container",children:Object(m.jsx)("div",{className:"loading"})})}),L=function(){var e=new w.a,t=n.a.useState(!1),a=Object(p.a)(t,2),c=a[0],s=a[1],r=n.a.useState(!1),o=Object(p.a)(r,2),l=o[0],j=o[1],u=f.TOKEN_VERIFY,d=f.TOKEN_REFRESH,b=function(){var t=Object(N.a)(v.a.mark((function t(){var a;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:(a=new FormData).append("token",e.get("access_token")),j(!0),i.a.post(u,a,{headers:{"Content-Type":"multipart/form-data"}}).then((function(t){s(!0),j(!1);var a=new FormData;a.append("refresh",e.get("refresh_token")),i.a.post(d,a,{headers:{"Content-Type":"multipart/form-data"}}).then((function(t){e.set("access_token",t.data.access,{path:"/"},{httpOnly:!0}),console.log("\u30a2\u30af\u30bb\u30b9\u30c8\u30fc\u30af\u30f3\u3092\u66f4\u65b0\u3057\u307e\u3057\u305f")})).catch((function(e){console.log(e)}))})).catch((function(e){s(!1),j(!1)}));case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return n.a.useEffect((function(){b()}),[]),Object(m.jsxs)("div",{className:"header-box",children:[Object(m.jsx)(y,{logo:S}),Object(m.jsx)("div",{className:"box"}),c?Object(m.jsxs)("div",{className:"rightside",children:[Object(m.jsx)(F,{icon:I.b}),Object(m.jsx)(A,{icon:I.a})]}):Object(m.jsxs)("div",{className:"rightside-login",children:[Object(m.jsx)(D,{}),Object(m.jsx)("span",{}),Object(m.jsx)(Z,{})]}),l&&Object(m.jsx)(G,{})]})},q=(a(100),a(101),function(){return Object(m.jsxs)("div",{className:"footer-box",children:[Object(m.jsx)("div",{className:"logo",children:Object(m.jsx)(y,{logo:S})}),Object(m.jsx)("p",{children:"Copyright \xa9 2020 \u7279\u5b9a\u975e\u55b6\u5229\u6d3b\u52d5\u6cd5\u4eba\u7a1a\u5185\u30ab\u30fc\u30ea\u30f3\u30b0\u5354\u4f1a All Rights Reserved."})]})}),B=function(e){var t=e.children;return Object(m.jsx)(b.b,{exact:!0,path:t.props.path,children:Object(m.jsx)(m.Fragment,{children:Object(m.jsxs)("div",{className:"allbox",children:[Object(m.jsx)(L,{}),Object(m.jsx)("div",{className:"mainbox",children:Object(m.jsx)("div",{className:"contents",children:t})}),Object(m.jsx)(q,{})]})})})};B.defaultProps={};var K=B,P=function(e){var t=new w.a;if(t.get("access_token")){var a=new FormData;a.append("token",t.get("access_token"));var c=f.TOKEN_VERIFY;return i.a.post(c,a,{headers:{"Content-Type":"multipart/form-data"}}).catch((function(e){t.remove("access_token"),t.remove("refresh_token"),t.remove("user_id"),window.location.href="/",alert("\u518d\u5ea6\u30ed\u30b0\u30a4\u30f3\u3057\u3066\u304f\u3060\u3055\u3044")})),e.children}return Object(m.jsx)(b.a,{to:"/login"})},U=(a(102),function(){return Object(m.jsxs)("div",{className:"mypage-wrapper",children:[Object(m.jsx)("p",{className:"title",children:"\u30a2\u30ab\u30a6\u30f3\u30c8"}),Object(m.jsxs)("table",{className:"mail-pass",children:[Object(m.jsxs)("tr",{className:"mail-address",children:[Object(m.jsx)("td",{className:"mail-pass-title",children:"\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9"}),Object(m.jsx)("td",{className:"mail-pass-body",children:"sample@example.jp"}),Object(m.jsx)("td",{children:Object(m.jsx)(T,{url:"/account/email",namecolor:"#2699FB",pagename:"\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u306e\u5909\u66f4"})})]}),Object(m.jsxs)("tr",{className:"pass-word",children:[Object(m.jsx)("td",{className:"mail-pass-title",children:"\u30d1\u30b9\u30ef\u30fc\u30c9"}),Object(m.jsx)("td",{className:"mail-pass-body",children:"***************"}),Object(m.jsx)("td",{className:"change-link",children:Object(m.jsx)(T,{url:"/account/password",namecolor:"#2699FB",pagename:"\u30d1\u30b9\u30ef\u30fc\u30c9\u306e\u5909\u66f4"})})]}),Object(m.jsx)("tr",{className:"mail-address",children:Object(m.jsx)("td",{children:Object(m.jsx)(T,{url:"/account/delete",namecolor:"#2699FB",pagename:"\u30a2\u30ab\u30a6\u30f3\u30c8\u524a\u9664"})})})]})]})}),W=(a(103),function(){return Object(m.jsxs)("div",{className:"mail-address-change-wrapper",children:[Object(m.jsx)("p",{className:"title",children:"\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u306e\u5909\u66f4"}),Object(m.jsx)("p",{className:"new-mail-address",children:"\u65b0\u3057\u3044\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9"}),Object(m.jsx)("p",{className:"register",children:"\u767b\u9332"}),Object(m.jsx)("p",{children:"\u30ad\u30e3\u30f3\u30bb\u30eb"})]})}),H=a(7),$=a(17),J=function(e,t){var a=Object(c.useState)(t),n=Object(p.a)(a,2),s=n[0],r=n[1];return[s,Object(c.useCallback)((function(t){e.current||r(t)}),[r,e])]},V=function(){var e=Object(c.useRef)(!1);return Object(c.useEffect)((function(){return function(){e.current=!0}}),[]),e},Y=function(){var e=V(),t=J(e,!1),a=Object(p.a)(t,2),c=a[0],n=a[1],s=J(e,""),r=Object(p.a)(s,2),o=r[0],l=r[1],j=J(e,"\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002"),u=Object(p.a)(j,2),d=u[0],b=u[1],h=J(e,null),O=Object(p.a)(h,2),x=O[0],g=(O[1],Object($.a)()),_=g.register,v=g.handleSubmit,N=g.formState.errors,w=f.RESET_PASSWORD;return Object(m.jsxs)("div",{className:"auth-page",children:[Object(m.jsx)("div",{className:"link",children:Object(m.jsx)("h2",{className:"auth-page__title",children:d})}),x&&Object(m.jsx)("p",{className:"auth-page__error",children:x}),Object(m.jsxs)("form",{className:"auth-page__form",onSubmit:v((function(){var e=new FormData;e.append("email",o),n(!0),b("\u30e1\u30fc\u30eb\u3092\u9001\u4fe1\u3057\u3066\u3044\u307e\u3059\u3002"),i.a.post(w,e,{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0}).then((function(e){n(!1),b("\u65b0\u898f\u30d1\u30b9\u30ef\u30fc\u30c9\u767a\u884c\u306e\u6848\u5185\u30e1\u30fc\u30eb\u3092\u9001\u4fe1\u3057\u307e\u3057\u305f\u3002\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044\u3002")})).catch((function(e){n(!1)}))})),children:[Object(m.jsxs)("div",{className:"auth-page__form-group",children:[Object(m.jsx)("label",{className:"auth-page__form-label",htmlFor:"email",children:"\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9"}),N.email&&Object(m.jsx)("span",{className:"auth-page__form-error",children:"\u203b\u3053\u306e\u9805\u76ee\u306f\u5fc5\u9808\u3067\u3059"}),Object(m.jsx)("input",Object(H.a)(Object(H.a)({className:"auth-page__form-input",type:"email",name:"email",placeholder:"samlple@example.com",autoComplete:"off"},_("email",{required:!0,pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i})),{},{value:o,onChange:function(e){return l(e.target.value)}}))]}),Object(m.jsx)("div",{className:"auth-btn-wrapper",children:Object(m.jsx)("button",{className:"btn auth-btn",type:"submit",children:"\u5b8c\u4e86"})})]}),c&&Object(m.jsx)(G,{})]})},M=function(){return Object(m.jsx)(Y,{})},X=a(12),z=function(e){var t=V(),a=J(t,!1),c=Object(p.a)(a,2),n=c[0],s=c[1],r=J(t,""),o=Object(p.a)(r,2),l=o[0],u=o[1],d=J(t,!1),b=Object(p.a)(d,2),h=b[0],O=b[1],x=J(t,"\u65b0\u898f\u30d1\u30b9\u30ef\u30fc\u30c9\u3092\u5165\u529b\u3057\u3066\u4e0b\u3055\u3044\u3002"),g=Object(p.a)(x,2),_=g[0],v=g[1],N=J(t,null),w=Object(p.a)(N,2),y=w[0],S=w[1],k=Object($.a)(),C=k.register,T=k.handleSubmit,R=k.formState.errors,F="".concat(f.RESET_PASSWORD_CONFIRM).concat(e.uid,"/").concat(e.token,"/"),A=function(){var e=document.getElementById("password");"password"===e.type?(e.type="text",O(!0)):(e.type="password",O(!1))};return Object(m.jsxs)("div",{className:"auth-page",children:[Object(m.jsx)("div",{className:"link",children:Object(m.jsx)("h2",{className:"auth-page__title",children:_})}),y&&Object(m.jsx)("p",{className:"auth-page__error",children:y}),Object(m.jsxs)("form",{className:"auth-page__form",onSubmit:T((function(){console.log(e.uid);var t=new FormData;t.append("new_password1",l),t.append("new_password2",l),t.append("uid",e.uid),t.append("token",e.token),s(!0),v("\u65b0\u898f\u30d1\u30b9\u30ef\u30fc\u30c9\u3092\u767b\u9332\u3057\u3066\u3044\u307e\u3059..."),i.a.post(F,t,{headers:{"X-CSRFToken":j.a.get("csrftoken"),"Content-Type":"multipart/form-data"}}).then((function(e){s(!1),v("\u65b0\u898f\u30d1\u30b9\u30ef\u30fc\u30c9\u3092\u767b\u9332\u3057\u307e\u3057\u305f\u3002"),S(null),setTimeout((function(){window.location.href="/account"}),1e3)})).catch((function(e){s(!1),v("\u65b0\u898f\u30d1\u30b9\u30ef\u30fc\u30c9\u306e\u767b\u9332\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002")}))})),children:[Object(m.jsxs)("div",{className:"auth-page__form-group",children:[Object(m.jsx)("label",{className:"auth-page__form-label",htmlFor:"password",children:"\u30d1\u30b9\u30ef\u30fc\u30c9"}),R.password&&Object(m.jsx)("span",{className:"auth-page__form-error",children:"\u203b\u3053\u306e\u9805\u76ee\u306f\u5fc5\u9808\u3067\u3059"}),Object(m.jsxs)("div",{className:"auth-page__password",children:[Object(m.jsx)("input",Object(H.a)(Object(H.a)({className:"password",type:"password",name:"password",id:"password"},C("password",{required:!0,minLength:6})),{},{value:l,onChange:function(e){return u(e.target.value)}})),h?Object(m.jsx)(E.a,{icon:X.a,id:"btn-eye",onClick:A}):Object(m.jsx)(E.a,{icon:X.b,id:"btn-eye",onClick:A})]})]}),Object(m.jsx)("div",{className:"auth-btn-wrapper",children:Object(m.jsx)("button",{className:"btn auth-btn",type:"submit",children:"\u65b0\u898f\u30d1\u30b9\u30ef\u30fc\u30c9\u767a\u884c"})})]}),n&&Object(m.jsx)(G,{})]})},Q=function(e){var t=Object(b.g)(),a=t.uid,c=t.token;return Object(m.jsx)(z,{uid:a,token:c})},ee=a(106),te=function(){var e=Object(c.useState)(!1),t=Object(p.a)(e,2),a=t[0],n=t[1],s=Object(c.useState)(""),r=Object(p.a)(s,2),o=r[0],l=r[1],j=Object(c.useState)(""),u=Object(p.a)(j,2),d=u[0],b=u[1],h=Object(c.useState)(!1),O=Object(p.a)(h,2),x=O[0],g=O[1],_=Object(c.useState)(null),v=Object(p.a)(_,2),N=v[0],w=v[1],y=Object(ee.a)(),k=Object(p.a)(y,2),C=(k[0],k[1],Object($.a)()),T=C.register,R=C.handleSubmit,F=C.formState.errors,A=f.GET_USER_DATA,I=f.LOGIN,D=function(){var e=document.getElementById("password");"password"===e.type?(e.type="text",g(!0)):(e.type="password",g(!1))};return Object(m.jsxs)("div",{className:"auth-page",children:[Object(m.jsx)("div",{className:"auth-page__logo",children:Object(m.jsx)("img",{src:S,alt:"logo"})}),Object(m.jsxs)("div",{className:"link",children:[Object(m.jsx)("h1",{className:"auth-page__title",children:"\u30ed\u30b0\u30a4\u30f3"}),Object(m.jsx)(Z,{})]}),N&&Object(m.jsx)("p",{className:"auth-page__error",children:N}),Object(m.jsxs)("form",{className:"auth-page__form",onSubmit:R((function(){var e=new FormData;e.append("email",o),e.append("password",d),n(!0),w(null),i.a.post(I,e,{headers:{"Content-Type":"application/json"}}).then((function(e){n(!1),console.log(e.data),i.a.get(A,{headers:{"Content-Type":"application/json"}}).then((function(e){console.log(e.data)})).catch((function(e){console.log(e)}))})).catch((function(e){n(!1),console.log(e),w(e.response.data.non_field_errors)}))})),children:[Object(m.jsxs)("div",{className:"auth-page__form-group",children:[Object(m.jsx)("label",{className:"auth-page__form-label",htmlFor:"email",children:"\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9"}),F.email&&Object(m.jsx)("span",{className:"auth-page__form-error",children:"\u203b\u3053\u306e\u9805\u76ee\u306f\u5fc5\u9808\u3067\u3059"}),Object(m.jsx)("input",Object(H.a)(Object(H.a)({className:"auth-page__form-input",type:"email",name:"email",placeholder:"samlple@example.com",autoComplete:"off"},T("email",{required:!0,pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i})),{},{value:o,onChange:function(e){return l(e.target.value)}}))]}),Object(m.jsxs)("div",{className:"auth-page__form-group",children:[Object(m.jsx)("label",{className:"auth-page__form-label",htmlFor:"password",children:"\u30d1\u30b9\u30ef\u30fc\u30c9"}),F.password&&Object(m.jsx)("span",{className:"auth-page__form-error",children:"\u203b\u3053\u306e\u9805\u76ee\u306f\u5fc5\u9808\u3067\u3059"}),Object(m.jsxs)("div",{className:"auth-page__password",children:[Object(m.jsx)("input",Object(H.a)(Object(H.a)({className:"password",type:"password",name:"password",id:"password"},T("password",{required:!0,minLength:6})),{},{value:d,onChange:function(e){return b(e.target.value)}})),x?Object(m.jsx)(E.a,{icon:X.a,id:"btn-eye",onClick:D}):Object(m.jsx)(E.a,{icon:X.b,id:"btn-eye",onClick:D})]})]}),Object(m.jsx)("div",{className:"auth-btn-wrapper",children:Object(m.jsx)("button",{className:"btn auth-btn",type:"submit",children:"\u30ed\u30b0\u30a4\u30f3"})})]}),a&&Object(m.jsx)(G,{})]})},ae=function(){return Object(m.jsx)(te,{})},ce=function(){var e=Object(c.useState)(!1),t=Object(p.a)(e,2),a=t[0],n=t[1],s=Object(c.useState)(""),r=Object(p.a)(s,2),o=r[0],l=r[1],j=Object(c.useState)(""),u=Object(p.a)(j,2),d=u[0],b=u[1],h=Object(c.useState)(!1),O=Object(p.a)(h,2),x=O[0],g=O[1],_=Object(c.useState)(""),v=Object(p.a)(_,2),N=v[0],w=v[1],y=Object($.a)(),k=y.register,C=y.handleSubmit,T=y.formState.errors,R=f.REGISTRATION,F=function(){var e=document.getElementById("password");"password"===e.type?(e.type="text",g(!0)):(e.type="password",g(!1))};return Object(m.jsxs)("div",{className:"auth-page",children:[Object(m.jsx)("div",{className:"auth-page__logo",children:Object(m.jsx)("img",{src:S,alt:"logo"})}),Object(m.jsx)("h1",{className:"auth-page__title-registration",children:"\u30a2\u30ab\u30a6\u30f3\u30c8\u767b\u9332"}),N&&Object(m.jsx)("p",{className:"success",children:N}),Object(m.jsxs)("form",{className:"auth-page__form",onSubmit:C((function(e){var t=new FormData;t.append("email",o),t.append("password1",d),t.append("password2",d),n(!0),w(null),i.a.post(R,t).then((function(e){n(!1),w("\u30a2\u30ab\u30a6\u30f3\u30c8\u4f5c\u6210\u304c\u5b8c\u4e86\u3057\u307e\u3057\u305f\u3002"),setTimeout((function(){window.location.href="/login"}),500)})).catch((function(e){n(!1)}))})),children:[N&&Object(m.jsx)("p",{children:N}),Object(m.jsxs)("div",{className:"auth-page__form-group",children:[Object(m.jsx)("label",{className:"auth-page__form-label",htmlFor:"email",children:"\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9"}),T.email&&Object(m.jsx)("span",{className:"auth-page__form-error",children:"\u203b\u3053\u306e\u9805\u76ee\u306f\u5fc5\u9808\u3067\u3059"}),Object(m.jsx)("input",Object(H.a)(Object(H.a)({className:"auth-page__form-input",type:"email",name:"email",placeholder:"samlple@example.com",autoComplete:"off"},k("email",{required:!0,pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i})),{},{value:o,onChange:function(e){return l(e.target.value)}}))]}),Object(m.jsxs)("div",{className:"auth-page__form-group",children:[Object(m.jsx)("label",{className:"auth-page__form-label",htmlFor:"password",children:"\u30d1\u30b9\u30ef\u30fc\u30c9"}),T.password&&Object(m.jsx)("span",{className:"auth-page__form-error",children:"\u203b\u3053\u306e\u9805\u76ee\u306f\u5fc5\u9808\u3067\u3059"}),Object(m.jsxs)("div",{className:"auth-page__password",children:[Object(m.jsx)("input",Object(H.a)(Object(H.a)({className:"password",type:"password",name:"password",id:"password"},k("password",{required:!0,minLength:6})),{},{value:d,onChange:function(e){return b(e.target.value)}})),x?Object(m.jsx)(E.a,{icon:X.a,id:"btn-eye",onClick:F}):Object(m.jsx)(E.a,{icon:X.b,id:"btn-eye",onClick:F})]})]}),Object(m.jsx)("div",{className:"auth-btn-wrapper",children:Object(m.jsx)("button",{type:"submit",className:"btn auth-btn",children:"\u30a2\u30ab\u30a6\u30f3\u30c8\u4f5c\u6210"})})]}),a&&Object(m.jsx)(G,{})]})},ne=function(e){var t=V(),a=J(t,!1),c=Object(p.a)(a,2),n=c[0],s=c[1],r=J(t,""),o=Object(p.a)(r,2),l=o[0],u=o[1],d=J(t,""),b=Object(p.a)(d,2),h=b[0],O=b[1],x=J(t,!1),g=Object(p.a)(x,2),_=g[0],v=g[1],N=J(t,"\u4ee5\u4e0b\u306e\u9805\u76ee\u3092\u5165\u529b\u3057\u3066\u4e0b\u3055\u3044\u3002"),w=Object(p.a)(N,2),y=w[0],S=w[1],k=J(t,null),C=Object(p.a)(k,2),T=C[0],R=C[1],F=Object($.a)(),A=F.register,I=F.handleSubmit,D=F.formState.errors,Z=f.TOKEN,L=f.GET_USER_LIST,q=function(){var e=document.getElementById("password");"password"===e.type?(e.type="text",v(!0)):(e.type="password",v(!1))};return Object(m.jsxs)("div",{className:"auth-page",children:[Object(m.jsx)("div",{className:"link",children:Object(m.jsx)("h2",{className:"auth-page__title",children:y})}),T&&Object(m.jsx)("p",{className:"auth-page__error",children:T}),Object(m.jsxs)("form",{className:"auth-page__form",onSubmit:I((function(){var e=new FormData;e.append("email",l),e.append("password",h),s(!0),S("\u8a8d\u8a3c\u4e2d\u3067\u3059\u3002"),i.a.post(Z,e,{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0}).then((function(e){var t=j.a.get("user_id");i.a.delete("".concat(L,"/").concat(t),{headers:{"Content-Type":"application/json"},withCredentials:!0}).then((function(e){j.a.remove("access_token"),j.a.remove("refresh_token"),j.a.remove("user_id"),s(!1),S("\u30a2\u30ab\u30a6\u30f3\u30c8\u3092\u524a\u9664\u3057\u307e\u3057\u305f\u3002"),setTimeout((function(){window.location.href="/"}),500)})).catch((function(e){s(!1)}))})).catch((function(e){s(!1),R(e.response.data)}))})),children:[Object(m.jsxs)("div",{className:"auth-page__form-group",children:[Object(m.jsx)("label",{className:"auth-page__form-label",htmlFor:"email",children:"\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9"}),D.email&&Object(m.jsx)("span",{className:"auth-page__form-error",children:"\u203b\u3053\u306e\u9805\u76ee\u306f\u5fc5\u9808\u3067\u3059"}),Object(m.jsx)("input",Object(H.a)(Object(H.a)({className:"auth-page__form-input",type:"email",name:"email",placeholder:"samlple@example.com",autoComplete:"off"},A("email",{required:!0,pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i})),{},{value:l,onChange:function(e){return u(e.target.value)}}))]}),Object(m.jsxs)("div",{className:"auth-page__form-group",children:[Object(m.jsx)("label",{className:"auth-page__form-label",htmlFor:"password",children:"\u30d1\u30b9\u30ef\u30fc\u30c9"}),D.password&&Object(m.jsx)("span",{className:"auth-page__form-error",children:"\u203b\u3053\u306e\u9805\u76ee\u306f\u5fc5\u9808\u3067\u3059"}),Object(m.jsxs)("div",{className:"auth-page__password",children:[Object(m.jsx)("input",Object(H.a)(Object(H.a)({className:"password",type:"password",name:"password",id:"password"},A("password",{required:!0,minLength:6})),{},{value:h,onChange:function(e){return O(e.target.value)}})),_?Object(m.jsx)(E.a,{icon:X.a,id:"btn-eye",onClick:q}):Object(m.jsx)(E.a,{icon:X.b,id:"btn-eye",onClick:q})]})]}),Object(m.jsx)("div",{className:"auth-btn-wrapper",children:Object(m.jsx)("button",{className:"btn auth-btn",type:"submit",children:"\u30a2\u30ab\u30a6\u30f3\u30c8\u524a\u9664"})})]}),n&&Object(m.jsx)(G,{})]})},se=function(){return Object(m.jsx)(ne,{})};j.a.get("csrftoken");i.a.defaults.xsrfCookieName="csrftoken",i.a.defaults.xsrfHeaderName="X-CSRFToken",i.a.defaults.withCredentials=!0;var re=function(){return Object(m.jsx)(d.a,{children:Object(m.jsx)(u.a,{children:Object(m.jsxs)(b.d,{children:[Object(m.jsx)(b.b,{path:"/login",exact:!0,children:Object(m.jsx)(ae,{})}),Object(m.jsx)(b.b,{path:"/registration",exact:!0,children:Object(m.jsx)(ce,{})}),Object(m.jsx)(K,{path:"/",exact:!0,children:Object(m.jsx)(g,{})}),Object(m.jsx)(P,{children:Object(m.jsx)(b.b,{path:"/account",render:function(e){var t=e.match.url;return Object(m.jsx)(m.Fragment,{children:Object(m.jsxs)(b.d,{children:[Object(m.jsx)(K,{path:"".concat(t,"/"),exact:!0,children:Object(m.jsx)(U,{})}),Object(m.jsx)(K,{path:"".concat(t,"/email"),exact:!0,children:Object(m.jsx)(W,{})}),Object(m.jsx)(K,{path:"".concat(t,"/password"),exact:!0,children:Object(m.jsx)(M,{})}),Object(m.jsx)(b.b,{path:"".concat(t,"/password/reset/:uid/:token"),children:Object(m.jsx)(K,{exact:!0,children:Object(m.jsx)(Q,{})})}),Object(m.jsx)(K,{path:"".concat(t,"/delete"),exact:!0,children:Object(m.jsx)(se,{})})]})})}})})]})})})};r.a.render(Object(m.jsx)(re,{}),document.getElementById("root"))},20:function(e,t,a){},81:function(e,t,a){},82:function(e,t,a){},83:function(e,t,a){},95:function(e,t,a){},98:function(e,t,a){},99:function(e,t,a){}},[[104,1,2]]]);