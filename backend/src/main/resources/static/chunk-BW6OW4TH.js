import{b as n}from"./chunk-U455DCWQ.js";import{Y as e,ba as a}from"./chunk-VETP3HG3.js";var p=class o{constructor(t){this.http=t}apiUrl="http://localhost:8080/api/auth";login(t,r){let i={email:t,password:r};return this.http.post(`${this.apiUrl}/login`,i)}register(t,r){let i={email:t,password:r};return this.http.post(`${this.apiUrl}/register`,i)}static \u0275fac=function(r){return new(r||o)(a(n))};static \u0275prov=e({token:o,factory:o.\u0275fac,providedIn:"root"})};export{p as a};
