import{r as b,n as S,g as M,j as s,k as P,a1 as F,h as g,l as h,o as $,I as D,i as x,v as V,b as p}from"./index-A8xx-xxW.js";var m="Tabs",[k,H]=P(m,[h]),C=h(),[G,T]=k(m),I=b.forwardRef((e,t)=>{const{__scopeTabs:c,value:a,onValueChange:r,defaultValue:l,orientation:n="horizontal",dir:d,activationMode:v="automatic",...f}=e,i=S(d),[o,u]=M({prop:a,onChange:r,defaultProp:l});return s.jsx(G,{scope:c,baseId:F(),value:o,onValueChange:u,orientation:n,dir:i,activationMode:v,children:s.jsx(g.div,{dir:i,"data-orientation":n,...f,ref:t})})});I.displayName=m;var j="TabsList",y=b.forwardRef((e,t)=>{const{__scopeTabs:c,loop:a=!0,...r}=e,l=T(j,c),n=C(c);return s.jsx($,{asChild:!0,...n,orientation:l.orientation,dir:l.dir,loop:a,children:s.jsx(g.div,{role:"tablist","aria-orientation":l.orientation,...r,ref:t})})});y.displayName=j;var _="TabsTrigger",N=b.forwardRef((e,t)=>{const{__scopeTabs:c,value:a,disabled:r=!1,...l}=e,n=T(_,c),d=C(c),v=A(n.baseId,a),f=E(n.baseId,a),i=a===n.value;return s.jsx(D,{asChild:!0,...d,focusable:!r,active:i,children:s.jsx(g.button,{type:"button",role:"tab","aria-selected":i,"aria-controls":f,"data-state":i?"active":"inactive","data-disabled":r?"":void 0,disabled:r,id:v,...l,ref:t,onMouseDown:x(e.onMouseDown,o=>{!r&&o.button===0&&o.ctrlKey===!1?n.onValueChange(a):o.preventDefault()}),onKeyDown:x(e.onKeyDown,o=>{[" ","Enter"].includes(o.key)&&n.onValueChange(a)}),onFocus:x(e.onFocus,()=>{const o=n.activationMode!=="manual";!i&&!r&&o&&n.onValueChange(a)})})})});N.displayName=_;var w="TabsContent",R=b.forwardRef((e,t)=>{const{__scopeTabs:c,value:a,forceMount:r,children:l,...n}=e,d=T(w,c),v=A(d.baseId,a),f=E(d.baseId,a),i=a===d.value,o=b.useRef(i);return b.useEffect(()=>{const u=requestAnimationFrame(()=>o.current=!1);return()=>cancelAnimationFrame(u)},[]),s.jsx(V,{present:r||i,children:({present:u})=>s.jsx(g.div,{"data-state":i?"active":"inactive","data-orientation":d.orientation,role:"tabpanel","aria-labelledby":v,hidden:!u,id:f,tabIndex:0,...n,ref:t,style:{...e.style,animationDuration:o.current?"0s":void 0},children:u&&l})})});R.displayName=w;function A(e,t){return`${e}-trigger-${t}`}function E(e,t){return`${e}-content-${t}`}var L=I,z=y,K=N,B=R;function O({className:e,...t}){return s.jsx(L,{"data-slot":"tabs",className:p("flex flex-col gap-2",e),...t})}function J({className:e,...t}){return s.jsx(z,{"data-slot":"tabs-list",className:p("bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-1",e),...t})}function Q({className:e,...t}){return s.jsx(K,{"data-slot":"tabs-trigger",className:p("data-[state=active]:bg-background data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",e),...t})}function U({className:e,...t}){return s.jsx(B,{"data-slot":"tabs-content",className:p("flex-1 outline-none",e),...t})}export{O as T,J as a,Q as b,U as c};
