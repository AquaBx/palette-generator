import{S as N,g as j,o as G,a as K,i as Z,s as y,b as $,c as b,U as l,d as g,e as D,f as x,h as z,L as H,P as V,l as J,j as Q,p as W,B as X,R as k,k as C,m as p,n as U,q as ee,r as re,t as ne,u as F,v as te,w as ae,x as ie}from"./runtime.CVN073CC.js";import{c as fe}from"./store.BC6AAvCU.js";function S(a,v=null,P){if(typeof a!="object"||a===null||N in a)return a;const o=j(a);if(o!==G&&o!==K)return a;var f=new Map,c=Z(a),m=y(0);c&&f.set("length",y(a.length));var w;return new Proxy(a,{defineProperty(i,e,r){(!("value"in r)||r.configurable===!1||r.enumerable===!1||r.writable===!1)&&z();var t=f.get(e);return t===void 0?(t=y(r.value),f.set(e,t)):g(t,S(r.value,w)),!0},deleteProperty(i,e){var r=f.get(e);if(r===void 0)e in i&&f.set(e,y(l));else{if(c&&typeof e=="string"){var t=f.get("length"),n=Number(e);Number.isInteger(n)&&n<t.v&&g(t,n)}g(r,l),M(m)}return!0},get(i,e,r){var _;if(e===N)return a;var t=f.get(e),n=e in i;if(t===void 0&&(!n||(_=D(i,e))!=null&&_.writable)&&(t=y(S(n?i[e]:l,w)),f.set(e,t)),t!==void 0){var u=b(t);return u===l?void 0:u}return Reflect.get(i,e,r)},getOwnPropertyDescriptor(i,e){var r=Reflect.getOwnPropertyDescriptor(i,e);if(r&&"value"in r){var t=f.get(e);t&&(r.value=b(t))}else if(r===void 0){var n=f.get(e),u=n==null?void 0:n.v;if(n!==void 0&&u!==l)return{enumerable:!0,configurable:!0,value:u,writable:!0}}return r},has(i,e){var u;if(e===N)return!0;var r=f.get(e),t=r!==void 0&&r.v!==l||Reflect.has(i,e);if(r!==void 0||x!==null&&(!t||(u=D(i,e))!=null&&u.writable)){r===void 0&&(r=y(t?S(i[e],w):l),f.set(e,r));var n=b(r);if(n===l)return!1}return t},set(i,e,r,t){var R;var n=f.get(e),u=e in i;if(c&&e==="length")for(var _=r;_<n.v;_+=1){var I=f.get(_+"");I!==void 0?g(I,l):_ in i&&(I=y(l),f.set(_+"",I))}n===void 0?(!u||(R=D(i,e))!=null&&R.writable)&&(n=y(void 0),g(n,S(r,w)),f.set(e,n)):(u=n.v!==l,g(n,S(r,w)));var d=Reflect.getOwnPropertyDescriptor(i,e);if(d!=null&&d.set&&d.set.call(t,r),!u){if(c&&typeof e=="string"){var E=f.get("length"),O=Number(e);Number.isInteger(O)&&O>=E.v&&g(E,O+1)}M(m)}return!0},ownKeys(i){b(m);var e=Reflect.ownKeys(i).filter(n=>{var u=f.get(n);return u===void 0||u.v!==l});for(var[r,t]of f)t.v!==l&&!(r in i)&&e.push(r);return e},setPrototypeOf(){$()}})}function M(a,v=1){g(a,a.v+v)}function Y(a){for(var v=x,P=x;v!==null&&!(v.f&(X|k));)v=v.parent;try{return C(v),a()}finally{C(P)}}function ve(a,v,P,o){var q;var f=(P&p)!==0,c=!J||(P&Q)!==0,m=(P&V)!==0,w=(P&te)!==0,i=!1,e;m?[e,i]=fe(()=>a[v]):e=a[v];var r=N in a||H in a,t=((q=D(a,v))==null?void 0:q.set)??(r&&m&&v in a?s=>a[v]=s:void 0),n=o,u=!0,_=!1,I=()=>(_=!0,u&&(u=!1,w?n=F(o):n=o),n);e===void 0&&o!==void 0&&(t&&c&&W(),e=I(),t&&t(e));var d;if(c)d=()=>{var s=a[v];return s===void 0?I():(u=!0,_=!1,s)};else{var E=Y(()=>(f?U:ee)(()=>a[v]));E.f|=re,d=()=>{var s=b(E);return s!==void 0&&(n=void 0),s===void 0?n:s}}if(!(P&ae))return d;if(t){var O=a.$$legacy;return function(s,h){return arguments.length>0?((!c||!h||O||i)&&t(h?d():s),s):d()}}var R=!1,B=!1,L=ne(e),A=Y(()=>U(()=>{var s=d(),h=b(L);return R?(R=!1,B=!0,h):(B=!1,L.v=s)}));return f||(A.equals=ie),function(s,h){if(arguments.length>0){const T=h?b(A):c&&m?S(s):s;return A.equals(T)||(R=!0,g(L,T),_&&n!==void 0&&(n=T),F(()=>b(A))),s}return b(A)}}export{S as a,ve as p};