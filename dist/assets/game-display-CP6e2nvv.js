import{p as F,q as $,r as l,u as R,a as _,j as e,L as A,m as b,f as D,B as f,H as G,b as k,S as M,ak as P}from"./index-A8xx-xxW.js";import{u as q,e as B}from"./catalog-layout-CapVVbF_.js";import{u as K}from"./use-games-B7VBt7au.js";import{s as y}from"./toast-Cu_8kZFb.js";import{C as V,a as W,b as Y}from"./card-DVQQUcVi.js";import{m as j,T as X,S as J}from"./motion-BMEn2pEQ.js";import{C as O,a as H,P as Q,b as U,c as L,d as Z,e as ee}from"./pagination-Cxq5DVxe.js";import{C as se}from"./select-pnobd5xa.js";import"./skeleton-D6u_i3Qj.js";import"./games-Ckgb04l5.js";import"./ellipsis-DGixAxWM.js";import"./index-DNZbadIk.js";import"./check-De8WsGE6.js";const z=F()($(s=>({recentlyViewed:[],addToRecentlyViewed:i=>s(c=>{const o={id:i.id,title:i.title,coverImage:i.coverImage,timestamp:Date.now()},d=c.recentlyViewed.filter(g=>g.id!==i.id).slice(0,9);return{recentlyViewed:[o,...d]}}),clearRecentlyViewed:()=>s({recentlyViewed:[]})}),{name:"history-storage",version:1,migrate:(s,i)=>i===0?{recentlyViewed:[]}:s}));function te({game:s}){const[i,c]=l.useState(!0),[o,d]=l.useState(!1),{addItem:g}=R(),{addItem:I,removeItem:w,isInWishlist:m}=_(),{addToRecentlyViewed:h}=z(),u=t=>{t.preventDefault(),t.stopPropagation(),g({id:s.id.toString(),name:s.title,price:s.price,image:s.coverImage,quantity:1}),y.success("Added to cart")},v=t=>{t.preventDefault(),t.stopPropagation(),m(s.id.toString())?(w(s.id.toString()),y.success("Removed from wishlist")):(I(s),y.success("Added to wishlist"))},n=()=>{h(s)};return e.jsx(A,{to:`/games/${s.id}`,onClick:n,children:e.jsx(b.div,{...j.cards.container,children:e.jsxs(X,{className:"group relative w-full",rotationFactor:j.tilt.rotationFactor,springOptions:j.tilt.springOptions,children:[e.jsx(J,{className:"z-10 from-game-primary/40 via-game-primary/20 to-transparent blur-3xl",size:400,springOptions:{stiffness:20,damping:10}}),e.jsxs(V,{className:"h-full overflow-hidden transition-all hover:shadow-lg border-none",children:[e.jsx(b.div,{className:"relative aspect-[16/9] overflow-hidden",whileHover:j.cards.image.hover,transition:j.cards.image.transition,children:e.jsx("img",{src:s.coverImage,alt:s.title,className:"h-full w-full object-cover",onError:()=>d(!0),onLoad:()=>c(!1)})}),e.jsxs(W,{className:"p-4",children:[e.jsx("h3",{className:"line-clamp-1 text-lg font-semibold group-hover:text-primary",children:s.title}),e.jsx("p",{className:"mt-2 line-clamp-2 text-sm text-muted-foreground",children:s.description})]}),e.jsx(Y,{className:"p-4 pt-0",children:e.jsxs("div",{className:"flex items-center justify-between w-full",children:[e.jsx("span",{className:"text-lg font-bold",children:D(s.price)}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(b.div,{className:"cursor-pointer",whileHover:j.buttons.hover,whileTap:j.buttons.tap,children:e.jsx(f,{size:"icon",variant:"secondary",className:"h-8 w-8 rounded-full opacity-90 hover:opacity-100",onClick:v,children:e.jsx(G,{className:k("h-4 w-4",m(s.id.toString())&&"fill-current text-red-500")})})}),e.jsx(b.div,{className:"cursor-pointer",whileHover:j.buttons.hover,whileTap:j.buttons.tap,children:e.jsx(f,{size:"icon",variant:"secondary",className:"h-8 w-8 rounded-full opacity-90 hover:opacity-100",onClick:u,children:e.jsx(M,{className:"h-4 w-4"})})})]})]})})]})]})})})}function ie({game:s,onPrevious:i,onNext:c}){const[o,d]=l.useState(!0),[g,I]=l.useState(!1),{addItem:w}=R(),{addItem:m,removeItem:h,isInWishlist:u}=_(),{addToRecentlyViewed:v}=z(),n=r=>{r.preventDefault(),r.stopPropagation(),w({id:s.id.toString(),name:s.title,price:s.price,image:s.coverImage,quantity:1}),y.success("Added to cart")},t=r=>{r.preventDefault(),r.stopPropagation(),u(s.id.toString())?(h(s.id.toString()),y.success("Removed from wishlist")):(m(s),y.success("Added to wishlist"))},p=()=>{v(s)};return e.jsx(A,{to:`/games/${s.id}`,onClick:p,children:e.jsxs(V,{className:"group relative aspect-[16/9] overflow-hidden border-none",children:[e.jsx("img",{src:s.coverImage,alt:s.title,className:"h-full w-full object-cover transition-transform duration-300 group-hover:scale-105",onError:()=>I(!0),onLoad:()=>d(!1)}),e.jsxs("div",{className:"absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 flex flex-col justify-end",children:[e.jsx("h3",{className:"text-xl font-bold text-white mb-2",children:s.title}),e.jsx("p",{className:"line-clamp-2 text-sm text-white/80 mb-4",children:s.description}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("p",{className:"text-lg font-bold text-white",children:D(s.price)}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(f,{size:"icon",variant:"secondary",className:"h-8 w-8",onClick:t,children:e.jsx(G,{className:k("h-5 w-5",u(s.id.toString())&&"fill-current text-red-500")})}),e.jsx(f,{size:"icon",variant:"secondary",className:"h-8 w-8",onClick:n,children:e.jsx(M,{className:"h-5 w-5"})})]})]})]}),e.jsxs("div",{className:"absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 transition-opacity group-hover:opacity-100",children:[i&&e.jsx(f,{variant:"secondary",size:"icon",className:"h-10 w-10 rounded-full bg-black/50 hover:bg-black/70",onClick:r=>{r.preventDefault(),r.stopPropagation(),i()},children:e.jsx(O,{className:"h-6 w-6 text-white"})}),c&&e.jsx(f,{variant:"secondary",size:"icon",className:"h-10 w-10 rounded-full bg-black/50 hover:bg-black/70",onClick:r=>{r.preventDefault(),r.stopPropagation(),c()},children:e.jsx(H,{className:"h-6 w-6 text-white"})})]})]})})}function re({game:s}){const[i,c]=l.useState(!0),[o,d]=l.useState(!1),{addItem:g}=R(),{addItem:I,removeItem:w,isInWishlist:m}=_(),{addToRecentlyViewed:h}=z(),u=t=>{t.preventDefault(),t.stopPropagation(),g({id:s.id.toString(),name:s.title,price:s.price,image:s.coverImage,quantity:1}),y.success("Added to cart")},v=t=>{t.preventDefault(),t.stopPropagation(),m(s.id.toString())?(w(s.id.toString()),y.success("Removed from wishlist")):(I(s),y.success("Added to wishlist"))},n=()=>{h(s)};return e.jsx(A,{to:`/games/${s.id}`,onClick:n,className:"block h-full w-full py-2",children:e.jsxs(V,{className:"grid grid-cols-[60%_1fr] h-full w-full overflow-hidden border-none transition-all hover:bg-accent/5",children:[e.jsx("div",{className:"relative h-full",children:e.jsx("img",{src:s.coverImage,alt:s.title,className:"absolute inset-0 h-full w-full object-cover",onError:()=>d(!0),onLoad:()=>c(!1)})}),e.jsx(W,{className:"flex flex-col justify-between w-full p-4",children:e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-start justify-between gap-4",children:[e.jsx("h3",{className:"text-lg font-semibold line-clamp-1 flex-1",children:s.title}),e.jsxs("div",{className:"flex gap-2 shrink-0",children:[e.jsx(f,{size:"icon",variant:"ghost",className:"h-8 w-8",onClick:v,children:e.jsx(G,{className:k("h-5 w-5",m(s.id.toString())&&"fill-current text-red-500")})}),e.jsx(f,{size:"icon",variant:"ghost",className:"h-8 w-8",onClick:u,children:e.jsx(M,{className:"h-5 w-5"})})]})]}),e.jsx("p",{className:"text-sm text-muted-foreground line-clamp-2",children:s.description}),e.jsx("p",{className:"text-lg font-semibold",children:D(s.price)})]})})]})})}const S=8,T=4,ae=Array.from({length:S},(s,i)=>`skeleton-${i}`),ne=5;function ye(){const{games:s}=K(),i=q(),c=B(t=>t.displayMode),[o,d]=l.useState(1),[g,I]=l.useState(0),[w,m]=l.useState(T),[h,u]=l.useState(!1),v=l.useRef(null),n=l.useMemo(()=>s.filter(t=>{const p=t.title.toLowerCase().includes(i.search.toLowerCase()),r=i.platforms.length===0||t.platforms.some(E=>i.platforms.includes(E)),N=(!i.priceRange[0]||t.price.amount>=i.priceRange[0])&&(!i.priceRange[1]||t.price.amount<=i.priceRange[1]),x=i.categories.length===0||t.genres.some(E=>i.categories.includes(E)),a=!i.onlyDiscounted||(t.price.discount??0)>0,C=!i.onlyNewReleases||t.isNewRelease;return p&&r&&N&&x&&a&&C}),[s,i]);if(l.useEffect(()=>{const t=new IntersectionObserver(p=>{p[0].isIntersecting&&c==="infinite"&&!h&&(u(!0),setTimeout(()=>{m(N=>{const x=Math.min(N+T,n.length);return x===N&&t.disconnect(),x}),u(!1)},500))},{root:null,rootMargin:"100px",threshold:.1});return v.current&&c==="infinite"&&t.observe(v.current),()=>t.disconnect()},[c,n.length,h]),l.useEffect(()=>{m(T),u(!1)},[]),!s)return e.jsx("div",{className:"grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",children:ae.map(t=>e.jsx("div",{className:"h-[300px] animate-pulse rounded-lg bg-muted"},t))});if(n.length===0)return e.jsx("div",{className:"flex h-40 items-center justify-center rounded-lg border bg-card",children:e.jsx("p",{className:"text-center text-muted-foreground",children:"Aucun jeu ne correspond à vos critères de recherche."})});switch(c){case"grid":{const t=Math.ceil(n.length/S),p=(o-1)*S,r=p+S,N=n.slice(p,r);let x=[];return t<=ne?x=Array.from({length:t},(a,C)=>C+1):o<=3?x=[1,2,3,4,"ellipsis",t]:o>=t-2?x=[1,"ellipsis",t-3,t-2,t-1,t]:x=[1,"ellipsis",o-1,o,o+1,"ellipsis",t],e.jsxs("div",{className:"space-y-6",children:[e.jsx("div",{className:"grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",children:e.jsx(P,{mode:"popLayout",children:N.map((a,C)=>e.jsx(b.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.3,delay:C%4*.1},children:e.jsx(te,{game:a})},a.id))})}),t>1&&e.jsx(Q,{children:e.jsxs(U,{children:[e.jsx(L,{children:e.jsx(f,{variant:"ghost",size:"icon",onClick:()=>d(a=>Math.max(1,a-1)),disabled:o===1,children:e.jsx(O,{className:"h-4 w-4"})})}),x.map(a=>e.jsx(L,{children:a==="ellipsis"?e.jsx(Z,{}):e.jsx(ee,{onClick:()=>d(a),isActive:o===a,children:a})},typeof a=="number"?a:`ellipsis-${a}`)),e.jsx(L,{children:e.jsx(f,{variant:"ghost",size:"icon",onClick:()=>d(a=>Math.min(t,a+1)),disabled:o===t,children:e.jsx(H,{className:"h-4 w-4"})})})]})})]})}case"carousel":return e.jsx("div",{className:"relative group",children:e.jsx(P,{mode:"popLayout",children:e.jsx(b.div,{initial:{opacity:0,x:100},animate:{opacity:1,x:0},exit:{opacity:0,x:-100},transition:{duration:.3},children:e.jsx(ie,{game:n[g]})},n[g].id)})});case"infinite":{const t=w<n.length,p=n.slice(0,w);return e.jsx("div",{className:"relative flex flex-col h-[calc(100dvh-14rem)] -mx-6",children:e.jsxs("div",{className:"flex-1 flex flex-col divide-y divide-border overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",children:[e.jsx(P,{mode:"popLayout",children:p.map((r,N)=>e.jsx(b.div,{className:"flex-1 min-h-[28%] px-6",initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.3,delay:N%4*.1},children:e.jsx(re,{game:r})},r.id))}),t&&e.jsx("div",{ref:v,className:"h-20 flex items-center justify-center px-6",children:e.jsx(b.div,{animate:h?{rotate:360,scale:[1,1.2,1]}:{y:[0,10,0]},transition:{duration:h?1:1.5,repeat:Number.POSITIVE_INFINITY,ease:"easeInOut"},children:e.jsx(se,{className:k("h-6 w-6",h?"text-primary animate-spin":"text-muted-foreground")})})})]})})}default:return null}}export{ye as GameDisplay};
