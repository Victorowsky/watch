(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{103:function(e,t,n){},134:function(e,t,n){},138:function(e,t,n){},145:function(e,t,n){},147:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(16),o=n.n(c),i=(n(103),n(8)),s=n(5),u=n(84),l=n.n(u),m=(n(134),n(88)),d=n(177),f=n(179),v=Object(d.a)((function(e){return{root:{"& > *":{margin:e.spacing(1),borderColor:"white",color:"white",transition:"0.3s","&:hover":{boxShadow:"0 0 10px white"}}}}}));function E(e){var t=e.text,n=e.onClick,a=e.style,c=v();return r.a.createElement("div",{className:c.root},r.a.createElement(f.a,{onClick:n&&n,style:a&&a,variant:"outlined"},t||"Enter text"))}var b=Object(d.a)((function(e){return{root:{"& > *":{margin:e.spacing(1),borderColor:"white",color:"white",transition:"0.3s","&:hover":{color:"red",borderColor:"red"}}}}}));function O(e){var t=e.text,n=e.onClick,a=e.style,c=b();return r.a.createElement("div",{className:c.root},r.a.createElement(f.a,{onClick:n&&n,style:a&&a,variant:"outlined"},t||"Enter text"))}n(138);var h=function(e){var t=e.item,n=e.index,c=Object(a.useState)(),o=Object(i.a)(c,2),s=o[0],u=o[1];return Object(a.useEffect)((function(){fetch("https://noembed.com/embed?url=".concat(t)).then((function(e){return e.json()})).then((function(e){u(e.title)}))}),[t]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"queueItem"},r.a.createElement("a",{href:t,target:"_blank",rel:"noopener noreferrer"},n+1,".",s||t)))},j=function(){var e=Object(a.useContext)(V).videoQueue.map((function(e,t){return r.a.createElement(h,{item:e,index:t,key:t})}));return r.a.createElement("div",{className:"queue"},e)},p=function(){var e=Object(a.useContext)(V),t=e.admin,n=e.setAdmin,c=e.setCurrentVideoLink,o=e.socket,u=e.setVideoQueue,l=e.videoQueue,d=Object(a.useState)(),f=Object(i.a)(d,2),v=f[0],b=f[1],h=Object(s.h)().twitchStreamer;void 0===h&&(h="victorowsky_"),Object(a.useEffect)((function(){return o.emit("adminQueueUpdate",{videoQueue:l,currentRoom:h}),function(){o.removeAllListeners("adminQueueUpdate")}}),[l,o,h]);var p=function(){v&&(c(v),b(""))};return r.a.createElement(r.a.Fragment,null,r.a.createElement("br",null),t&&r.a.createElement("form",null,r.a.createElement("input",{type:"text",value:v,placeholder:"VIDEO URL",onChange:function(e){t&&b(e.target.value)}}),r.a.createElement("button",{style:{display:"none"},onClick:function(e){e.preventDefault(),p()},type:"submit"}),r.a.createElement("div",{className:"optionButtons"},r.a.createElement(E,{text:"PLAY NOW",onClick:p}),r.a.createElement(E,{text:"ADD TO QUEUE",onClick:function(){v&&(u((function(e){return[].concat(Object(m.a)(e),[v])})),b(""))}}),r.a.createElement(E,{text:"SKIP",onClick:function(){t&&l&&(c(l[0]),u((function(e){return e.slice(1)})))}}),r.a.createElement(O,{text:"LEAVE ADMIN",onClick:function(){window.confirm("Are you sure you don't want to be an admin?")&&(n(!1),o.emit("adminLeave"))}}))),r.a.createElement("div",{className:"adminButtonsDiv"}),r.a.createElement(j,null))},g=n(85),w=n.n(g),C=(n(145),n(87)),y=n.n(C),k=n(86),A=n.n(k),S=function(){var e=Object(s.g)(),t=Object(s.h)().twitchStreamer;void 0===t&&(t="victorowsky_");var n=Object(a.useState)(null),c=Object(i.a)(n,2),o=c[0],u=c[1],l=Object(a.useState)(t),m=Object(i.a)(l,2),d=m[0],f=m[1],v=Object(a.useContext)(V),E=v.admin,b=v.setCurrentVideoLink,h=v.currentVideoLink,j=v.socket,p=v.setAdmin,g=v.setIsSuccess,C=v.setIsError,k=v.setErrorMessage,S=v.setSuccessMessage,N=v.videoQueue,x=v.setVideoQueue,L=Object(a.useState)(!1),R=Object(i.a)(L,2),I=R[0],D=R[1],Q=Object(a.useRef)(),M=Object(a.useState)(2),P=Object(i.a)(M,2),T=P[0],U=P[1],q=Object(a.useState)(!0),F=Object(i.a)(q,2),_=F[0],B=F[1];Object(a.useEffect)((function(){var e;return E&&(e=setInterval((function(){j.emit("adminData",{currentRoom:d,currentSeconds:Q.current.getCurrentTime(),videoQueue:N})}),3e3)),function(){clearInterval(e)}}),[E,j,d,N]),Object(a.useEffect)((function(){E&&j.emit("videoChange",{currentVideoLink:h,currentRoom:d})}),[h,j]),Object(a.useEffect)((function(){window.addEventListener("beforeunload",(function(e){e.preventDefault(),j.emit("leaveRoom",{currentRoom:d}),j.emit("adminLeave")})),f(t)}),[e.pathname]),Object(a.useEffect)((function(){return j.emit("joinRoom",{currentRoom:d}),function(){j.emit("leaveRoom",{currentRoom:d}),p(!1),j.emit("adminLeave")}}),[d]),Object(a.useEffect)((function(){if(j.on("onlineUsersAnswer",(function(e){var t=e.onlineUsers;u(t)})),!E)return j.on("videoChangeAnswer",(function(e){var t=e.currentVideoLink;b(t)})),j.on("isPlayingSocketAnswer",(function(e){var t=e.isPlaying;e.currentRoom;D(t)})),j.on("joinRoomAnswer",(function(e){var t=e.docs;b(t.currentVideoLink),u(t.onlineUsers),t.admin?B(!0):B(!1)})),j.on("adminAnswer",(function(e){var t=e.isAdminTaken;B(t),console.log(t)})),j.on("adminDataAnswer",(function(e){var t=e.currentSeconds,n=e.videoQueue;if(x(n),Q.current){var a=Q.current.getDuration(),r=Q.current.getCurrentTime();a>t?r-T<t&&r+T>t||Q.current.seekTo(t,"seconds"):r<a+6&&r>a-6||Q.current.seekTo(a,"seconds")}})),j.on("adminRequestAnswer",(function(e){var t=e.success,n=e.message;t?(g(!0),S(n),p(!0)):(C(!0),k(n))})),j.on("adminQueueUpdateAnswer",(function(e){var t=e.videoQueue;console.log(t),x(t)})),function(){j.removeAllListeners("adminDataAnswer"),j.removeAllListeners("joinRoomAnswer"),j.removeAllListeners("isPlayingSocketAnswer"),j.removeAllListeners("videoChangeAnswer"),j.removeAllListeners("adminAnswer"),j.removeAllListeners("adminRequestAnswer"),j.removeAllListeners("adminQueueUpdateAnswer")}}),[d,E,j,T]);var G=function(e){"increment"===e?U((function(e){return e+1})):"decrement"===e&&U((function(e){return e>2?e+-1:e}))};return r.a.createElement("div",{className:"videoAndChat"},r.a.createElement("div",{className:"playerAndChat"},r.a.createElement("div",{className:"player-wrapper"},r.a.createElement(w.a,{ref:Q,onPlay:function(){E&&(D(!0),j.emit("isPlaying",{isPlaying:!0,currentRoom:d}))},onPause:function(){E&&(D(!1),j.emit("isPlaying",{isPlaying:!1,currentRoom:d}))},playing:I,onEnded:function(){E&&N&&(b(N[0]),x((function(e){return e.slice(1)})))},className:"react-player",url:h,width:"100%",height:"100%",controls:!0,volume:.1})),r.a.createElement("div",{className:"twitchChat"},r.a.createElement("span",{className:"onlineUsers"},null!==o?"".concat(o," ONLINE"):"CONNECTING"),r.a.createElement("iframe",{style:{border:"2px solid #121212"},title:"TwitchChat",id:"chat_embed",src:"https://www.twitch.tv/embed/".concat(t,"/chat?darkpopout&parent=").concat("victorowsky.github.io"),height:"100%",width:"100%"}),!E&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"delayInfoContainer"},r.a.createElement("span",{className:"delayInfo"},"Max Delay: ",T," seconds"),r.a.createElement("div",{className:"delayManage"},r.a.createElement("div",{className:"delayManageOptionDecrement",onClick:function(){return G("decrement")}},r.a.createElement(A.a,null)),r.a.createElement("div",{className:"delayManageOptionIncrement",onClick:function(){return G("increment")}},r.a.createElement(y.a,null))),!_&&r.a.createElement(O,{text:"GET ADMIN",onClick:function(){j.emit("adminRequest",{currentRoom:t})},style:{borderColor:"white",color:"white"}}))))))},N=n(181),x=n(182);function L(e){return r.a.createElement(x.a,Object.assign({elevation:6,variant:"filled"},e))}var R=Object(d.a)((function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}}}));function I(){var e=Object(a.useContext)(V),t=e.isSuccess,n=e.setIsSuccess,c=e.successMessage,o=R(),i=function(e,t){"clickaway"!==t&&n(!1)};return r.a.createElement("div",{className:o.root},r.a.createElement(N.a,{open:t,autoHideDuration:1e3,onClose:i},r.a.createElement(L,{onClose:i,severity:"success"},c)))}function D(e){return r.a.createElement(x.a,Object.assign({elevation:6,variant:"filled"},e))}var Q=Object(d.a)((function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}}}));function M(){var e=Object(a.useContext)(V),t=e.isError,n=e.setIsError,c=e.errorMessage,o=Q(),i=function(e,t){"clickaway"!==t&&n(!1)};return r.a.createElement("div",{className:o.root},r.a.createElement(N.a,{open:t,autoHideDuration:1e3,onClose:i},r.a.createElement(D,{onClose:i,severity:"error"},c)))}var V=r.a.createContext(),P=l()("https://boiling-bastion-80662.herokuapp.com/"),T=function(){var e=Object(s.f)(),t=Object(a.useState)(!1),n=Object(i.a)(t,2),c=n[0],o=n[1],u=Object(a.useState)(""),l=Object(i.a)(u,2),m=l[0],d=l[1],f=Object(a.useState)(!1),v=Object(i.a)(f,2),E=v[0],b=v[1],O=Object(a.useState)(!1),h=Object(i.a)(O,2),g=h[0],w=h[1],C=Object(a.useState)(""),y=Object(i.a)(C,2),k=y[0],A=y[1],N=Object(a.useState)(""),x=Object(i.a)(N,2),L=x[0],R=x[1],D=Object(a.useState)([]),Q=Object(i.a)(D,2),T=Q[0],U=Q[1];return Object(a.useEffect)((function(){fetch("https://noembed.com/embed?url=".concat(m)).then((function(e){return e.json()})).then((function(e){document.title=e.title,void 0===e.title&&(document.title="Watch Together")}))}),[m]),r.a.createElement(r.a.Fragment,null,r.a.createElement(V.Provider,{value:{admin:c,setAdmin:o,socket:P,currentVideoLink:m,setCurrentVideoLink:d,history:e,isSuccess:E,setIsSuccess:b,isError:g,setIsError:w,successMessage:k,setSuccessMessage:A,errorMessage:L,setErrorMessage:R,videoQueue:T,setVideoQueue:U}},r.a.createElement("div",{className:"app"},r.a.createElement(s.c,null,r.a.createElement(s.a,{path:"/",exact:!0},r.a.createElement(S,null),r.a.createElement("div",{className:"bottomDiv"},c?r.a.createElement(p,null):r.a.createElement(j,null))),r.a.createElement(s.a,{path:"/:twitchStreamer",exact:!0},r.a.createElement(S,null),r.a.createElement("div",{className:"bottomDiv"},c?r.a.createElement(p,null):r.a.createElement(j,null)))),r.a.createElement(I,null),r.a.createElement(M,null))))},U=n(32);o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(U.a,null,r.a.createElement(T,null))),document.getElementById("root"))},98:function(e,t,n){e.exports=n(147)}},[[98,13,14]]]);
//# sourceMappingURL=main.9328c563.chunk.js.map