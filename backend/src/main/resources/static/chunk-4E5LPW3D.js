import{a as i,c as s}from"./chunk-MBQSM3KJ.js";import{X as a,aa as n}from"./chunk-5LZVEOV6.js";var l=class o{constructor(t){this.http=t}apiUrl="http://localhost:8080/api/auth";login(t,e){let r={email:t,password:e};return this.http.post(`${this.apiUrl}/login`,r,{headers:new i({"Content-Type":"application/json"}),withCredentials:!0})}setActivity(t,e){localStorage.setItem("activity_id",t),localStorage.setItem("activity_name",e)}setUser(t,e){localStorage.setItem("user",t),localStorage.setItem("user_id",e)}setSession(t){localStorage.setItem("jwt_token",t)}getToken(){return localStorage.getItem("jwt_token")}removeSession(){localStorage.removeItem("jwt_token"),localStorage.removeItem("user_id"),localStorage.removeItem("user"),localStorage.removeItem("activity_id"),localStorage.removeItem("activity_name")}register(t,e){let r={email:t,password:e};return this.http.post(`${this.apiUrl}/register`,r,{headers:new i({"Content-Type":"application/json"})})}isAuthenticated(){return!!(localStorage.getItem("jwt_token")||this.getCookie("jwt_token"))}getCookie(t){let e=document.cookie.match(new RegExp("(^| )"+t+"=([^;]+)"));return e?decodeURIComponent(e[2]):null}static \u0275fac=function(e){return new(e||o)(n(s))};static \u0275prov=a({token:o,factory:o.\u0275fac,providedIn:"root"})};export{l as a};