(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{105:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(54),i=n.n(c),o=(n(64),n(6)),u=n(1),l=n(55),s=n.n(l),m=(n(95),n(57)),d=n(22),f=n.n(d),p=function(){var e=Object(a.useContext)(h),t=e.admin,n=e.setAdmin,c=e.setCurrentVideoLink,i=e.setVideoQueue,u=Object(a.useState)(),l=Object(o.a)(u,2),s=l[0],d=l[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{onClick:function(){return n((function(e){return!e}))},style:t?{backgroundColor:"#06d6a0"}:{}},"ADMIN"),t&&r.a.createElement("form",null,r.a.createElement("input",{type:"text",value:s,onChange:function(e){t&&d(e.target.value)}}),r.a.createElement("button",{style:{display:"none"},onClick:function(e){e.preventDefault(),f.a.canPlay(s)&&(c(s),i((function(e){return[].concat(Object(m.a)(e),[s])}))),d("")},type:"submit"})))},v=function(){var e=Object(a.useContext)(h),t=e.socket,n=e.admin,c=e.setAdmin,i=e.history,u=Object(a.useState)(""),l=Object(o.a)(u,2),s=l[0],m=l[1];return t.on("handleLoginAnswer",(function(e){e.success&&(n||c(!0),i.push("/"))})),r.a.createElement("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}},r.a.createElement("form",null,r.a.createElement("input",{type:"text",value:s,onChange:function(e){m(e.target.value)}}),r.a.createElement("button",{onClick:function(e){e.preventDefault(),t.emit("handleLogin",{password:s})},type:"submit",style:{display:"none"}})))},b=function(){var e=Object(a.useContext)(h),t=e.admin,n=e.setCurrentVideoLink,c=e.currentVideoLink,i=e.socket,u=e.setVideoQueue,l=(e.videoQueue,Object(a.useState)(!1)),s=Object(o.a)(l,2),m=s[0],d=s[1],p=Object(a.useRef)();Object(a.useEffect)((function(){t&&setInterval((function(){i.emit("currentSeconds",p.current.getCurrentTime())}),3e3)}),[t,i]),Object(a.useEffect)((function(){t&&i.emit("videoChange",c)}),[c,i,t]),Object(a.useEffect)((function(){c||i.emit("getAllData")}),[]),i.on("getAllDataAnswer",(function(e){var t=e.currentVideoLinkServer,a=e.isPlayingServer,r=e.videoQueueServer;n(t),d(a),u(r)})),i.on("currentSecondsAnswer",(function(e){if(p.current){var t=p.current.getCurrentTime();t<e+2&&t>e-2||p.current.seekTo(e,"seconds")}})),i.on("videoChangeAnswer",(function(e){t||n(e)}));i.on("isPlayingSocketAnswer",(function(e){d(e)})),i.on("currentSeconds",(function(e){var t=e.time;p.current&&p.current.seekTo(t,"seconds")}));return r.a.createElement("div",{className:"videoAndChat"},r.a.createElement("div",{className:"playerAndChat"},r.a.createElement("div",{className:"player-wrapper"},r.a.createElement(f.a,{ref:p,onPlay:function(){t&&(d(!0),i.emit("isPlaying",{isPlaying:!0}))},onPause:function(){t&&(d(!1),i.emit("isPlaying",{isPlaying:!1}))},onEnded:function(){u((function(e){return e.filter((function(e){return!e.includes(c)}))}))},playing:m,className:"react-player",url:c,width:"100%",height:"100%",controls:!0,volume:.1})),r.a.createElement("div",{className:"twitchChat"},r.a.createElement("iframe",{style:{border:"2px solid #121212"},title:"TwitchChat",id:"chat_embed",src:"https://www.twitch.tv/embed/demonzz1/chat?darkpopout&parent=".concat("victorowsky.github.io"),height:"100%",width:"350"}))))},h=r.a.createContext(),E=function(){var e=Object(u.f)(),t=Object(a.useState)(!1),n=Object(o.a)(t,2),c=n[0],i=n[1],l=Object(a.useState)(""),m=Object(o.a)(l,2),d=m[0],f=m[1],E=Object(a.useState)([]),y=Object(o.a)(E,2),g=y[0],j=y[1],C=s()("http://localhost:3001/");return r.a.createElement(r.a.Fragment,null,r.a.createElement(h.Provider,{value:{admin:c,setAdmin:i,socket:C,currentVideoLink:d,setCurrentVideoLink:f,videoQueue:g,setVideoQueue:j,history:e}},r.a.createElement("div",{className:"app"},r.a.createElement(u.c,null,r.a.createElement(u.a,{path:"/",exact:!0},r.a.createElement(b,null),c&&r.a.createElement("div",{className:"bottomDiv"},r.a.createElement(p,null))),r.a.createElement(u.a,{path:"/admin"},r.a.createElement(v,null))))))},y=n(31);i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(y.a,null,r.a.createElement(E,null))),document.getElementById("root"))},59:function(e,t,n){e.exports=n(105)},64:function(e,t,n){},95:function(e,t,n){}},[[59,13,14]]]);
//# sourceMappingURL=main.474cfbe9.chunk.js.map