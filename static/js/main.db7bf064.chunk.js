(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{121:function(e,t,n){},125:function(e,t,n){},132:function(e,t,n){},133:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(15),o=n.n(c),i=(n(90),n(8)),s=n(5),u=n(75),l=n.n(u),m=(n(121),n(163)),d=n(165),f=Object(m.a)((function(e){return{root:{"& > *":{margin:e.spacing(1),borderColor:"white",color:"white",transition:"0.3s","&:hover":{color:"red",borderColor:"red"}}}}}));function E(e){var t=e.text,n=e.onClick,a=e.style,c=f();return r.a.createElement("div",{className:c.root},r.a.createElement(d.a,{onClick:n&&n,style:a&&a,variant:"outlined"},t||"Enter text"))}n(125);var v=function(){var e=Object(a.useContext)(A),t=e.admin,n=e.setAdmin,c=e.setCurrentVideoLink,o=e.socket,s=(e.setTwitchStreamerChat,Object(a.useState)()),u=Object(i.a)(s,2),l=u[0],m=u[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement("br",null),t&&r.a.createElement("form",null,r.a.createElement("input",{type:"text",value:l,placeholder:"VIDEO URL",onChange:function(e){t&&m(e.target.value)}}),r.a.createElement("button",{style:{display:"none"},onClick:function(e){e.preventDefault(),c(l),m("")},type:"submit"})),r.a.createElement("div",{className:"adminButtonsDiv"},r.a.createElement(E,{text:"LEAVE ADMIN",onClick:function(){window.confirm("Are you sure you don't want to be an admin?")&&(n(!1),o.emit("adminLeave"))}})))},b=function(){var e=Object(a.useContext)(A),t=e.socket,n=e.admin,c=e.setAdmin,o=e.history,u=Object(a.useState)(""),l=Object(i.a)(u,2),m=l[0],d=l[1],f=Object(a.useState)(0),E=Object(i.a)(f,2),v=(E[0],E[1]),b=Object(s.h)().twitchStreamer;return t.on("handleLoginAnswer",(function(e){var t=e.success,a=e.message;t?(n||c(!0),o.push("/")):v((function(e){1===++e&&alert(a),setTimeout((function(){v(0)}),100)}))})),r.a.createElement("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}},r.a.createElement("form",null,r.a.createElement("input",{type:"text",value:m,onChange:function(e){d(e.target.value)}}),r.a.createElement("button",{onClick:function(e){e.preventDefault(),t.emit("handleLogin",{password:m,twitchStreamer:b})},type:"submit",style:{display:"none"}})))},h=n(76),p=n.n(h),j=(n(132),function(){var e=Object(s.g)(),t=Object(s.h)().twitchStreamer;void 0===t&&(t="victorowsky_");var n=Object(a.useState)(1),c=Object(i.a)(n,2),o=c[0],u=c[1],l=Object(a.useState)(t),m=Object(i.a)(l,2),d=m[0],f=m[1],v=Object(a.useContext)(A),b=v.admin,h=v.setCurrentVideoLink,j=v.currentVideoLink,O=v.socket,g=v.setAdmin,w=v.setIsSuccess,C=v.setIsError,y=v.setErrorMessage,S=v.setSuccessMessage,k=Object(a.useState)(!1),N=Object(i.a)(k,2),x=N[0],L=N[1],R=Object(a.useRef)();Object(a.useEffect)((function(){var e;return b&&(e=setInterval((function(){O.emit("adminData",{currentRoom:d,currentSeconds:R.current.getCurrentTime()})}),3e3)),function(){clearInterval(e)}}),[b,O,d]),Object(a.useEffect)((function(){b&&O.emit("videoChange",{currentVideoLink:j,currentRoom:d})}),[j,O]),Object(a.useEffect)((function(){window.addEventListener("beforeunload",(function(e){e.preventDefault(),O.emit("leaveRoom",{currentRoom:d}),O.emit("adminLeave")})),f(t)}),[e.pathname]),Object(a.useEffect)((function(){return O.emit("joinRoom",{currentRoom:d}),function(){O.emit("leaveRoom",{currentRoom:d}),g(!1),O.emit("adminLeave"),console.log("refresh")}}),[d]),Object(a.useEffect)((function(){if(O.on("onlineUsersAnswer",(function(e){var t=e.onlineUsers;u(t)})),!b)return O.on("videoChangeAnswer",(function(e){var t=e.currentVideoLink;h(t)})),O.on("isPlayingSocketAnswer",(function(e){var t=e.isPlaying;e.currentRoom;L(t)})),O.on("joinRoomAnswer",(function(e){var t=e.docs;h(t.currentVideoLink),u(t.onlineUsers),console.log(t)})),O.on("adminDataAnswer",(function(e){var t=e.currentSeconds;if(R.current){var n=R.current.getDuration(),a=R.current.getCurrentTime();n>t?a<t+6&&a>t-6||R.current.seekTo(t,"seconds"):a<n+2-3&&a>n-2-3||R.current.seekTo(n-3,"seconds")}})),function(){O.offAny()}}),[d,b]);return O.on("adminRequestAnswer",(function(e){var t=e.success,n=e.message;t?(w(!0),S(n),g(!0)):(C(!0),y(n))})),r.a.createElement("div",{className:"videoAndChat"},r.a.createElement("div",{className:"playerAndChat"},r.a.createElement("div",{className:"player-wrapper"},r.a.createElement(p.a,{ref:R,onPlay:function(){b&&(L(!0),O.emit("isPlaying",{isPlaying:!0,currentRoom:d}))},onPause:function(){b&&(L(!1),O.emit("isPlaying",{isPlaying:!1,currentRoom:d}))},playing:x,className:"react-player",url:j,width:"100%",height:"100%",controls:!0,volume:.1})),r.a.createElement("div",{className:"twitchChat"},r.a.createElement("span",{className:"onlineUsers"},o?"".concat(o," ONLINE"):"CONNECTING"),r.a.createElement("iframe",{style:{border:"2px solid #121212"},title:"TwitchChat",id:"chat_embed",src:"https://www.twitch.tv/embed/".concat(t,"/chat?darkpopout&parent=").concat("victorowsky.github.io"),height:"100%",width:"100%"}),!b&&r.a.createElement(E,{text:"GET ADMIN",onClick:function(){O.emit("adminRequest",{currentRoom:t})},style:{borderColor:"white",color:"white"}}))))}),O=n(167),g=n(168);function w(e){return r.a.createElement(g.a,Object.assign({elevation:6,variant:"filled"},e))}var C=Object(m.a)((function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}}}));function y(){var e=Object(a.useContext)(A),t=e.isSuccess,n=e.setIsSuccess,c=e.successMessage,o=C(),i=function(e,t){"clickaway"!==t&&n(!1)};return r.a.createElement("div",{className:o.root},r.a.createElement(O.a,{open:t,autoHideDuration:3e3,onClose:i},r.a.createElement(w,{onClose:i,severity:"success"},c)))}function S(e){return r.a.createElement(g.a,Object.assign({elevation:6,variant:"filled"},e))}var k=Object(m.a)((function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}}}));function N(){var e=Object(a.useContext)(A),t=e.isError,n=e.setIsError,c=e.errorMessage,o=k(),i=function(e,t){"clickaway"!==t&&n(!1)};return r.a.createElement("div",{className:o.root},r.a.createElement(O.a,{open:t,autoHideDuration:3e3,onClose:i},r.a.createElement(S,{onClose:i,severity:"error"},c)))}var A=r.a.createContext(),x=l()("https://boiling-bastion-80662.herokuapp.com/"),L=function(){var e=Object(s.f)(),t=Object(a.useState)(!1),n=Object(i.a)(t,2),c=n[0],o=n[1],u=Object(a.useState)(""),l=Object(i.a)(u,2),m=l[0],d=l[1],f=Object(a.useState)(),E=Object(i.a)(f,2),h=E[0],p=E[1],O=Object(a.useState)(!1),g=Object(i.a)(O,2),w=g[0],C=g[1],S=Object(a.useState)(!1),k=Object(i.a)(S,2),L=k[0],R=k[1],D=Object(a.useState)(""),I=Object(i.a)(D,2),T=I[0],M=I[1],V=Object(a.useState)(""),P=Object(i.a)(V,2),U=P[0],q=P[1];return Object(a.useEffect)((function(){fetch("https://noembed.com/embed?url=".concat(m)).then((function(e){return e.json()})).then((function(e){document.title=e.title,void 0===e.title&&(document.title="Watch Together")}))}),[m]),r.a.createElement(r.a.Fragment,null,r.a.createElement(A.Provider,{value:{admin:c,setAdmin:o,socket:x,currentVideoLink:m,setCurrentVideoLink:d,history:e,twitchStreamerChat:h,setTwitchStreamerChat:p,isSuccess:w,setIsSuccess:C,isError:L,setIsError:R,successMessage:T,setSuccessMessage:M,errorMessage:U,setErrorMessage:q}},r.a.createElement("div",{className:"app"},r.a.createElement(s.c,null,r.a.createElement(s.a,{path:"/",exact:!0},r.a.createElement(j,null),r.a.createElement("div",{className:"bottomDiv"},c&&r.a.createElement(v,null))),r.a.createElement(s.a,{path:"/:twitchStreamer",exact:!0},r.a.createElement(j,null),r.a.createElement("div",{className:"bottomDiv"},c&&r.a.createElement(v,null))),r.a.createElement(s.a,{path:"/admin",exact:!0},r.a.createElement(b,null)),r.a.createElement(s.a,{path:"/:twitchStreamer/admin"},r.a.createElement(b,null))),r.a.createElement(y,null),r.a.createElement(N,null))))},R=n(31);o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(R.a,null,r.a.createElement(L,null))),document.getElementById("root"))},85:function(e,t,n){e.exports=n(133)},90:function(e,t,n){}},[[85,13,14]]]);
//# sourceMappingURL=main.db7bf064.chunk.js.map