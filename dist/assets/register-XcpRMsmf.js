import{r as h,K as F,M as P,j as e,m as d,O as p,B as j,L as v}from"./index-A8xx-xxW.js";import{u as q,F as T,a as o,b as t,c as n,d as i,h as c,e as m,s as k,o as A,f as M,g as u}from"./form-NQCUH1ql.js";import{C as V}from"./checkbox-0GfaeNTR.js";import{s as f}from"./toast-Cu_8kZFb.js";import{E as N}from"./eye-off-DnHDftsS.js";import{E as C}from"./eye-CQnemKJn.js";import"./index-DNZbadIk.js";import"./check-De8WsGE6.js";const D=A({name:u().min(2,{message:"Le nom doit contenir au moins 2 caractères"}).max(50,{message:"Le nom ne peut pas dépasser 50 caractères"}).regex(/^[a-zA-Z0-9\s\-']+$/,{message:"Le nom contient des caractères invalides"}),email:u().min(1,{message:"L'email est requis"}).email({message:"Format d'email invalide"}).max(100,{message:"L'email ne peut pas dépasser 100 caractères"}),password:u().min(6,{message:"Le mot de passe doit contenir au moins 6 caractères"}).max(100,{message:"Le mot de passe ne peut pas dépasser 100 caractères"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,{message:"Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre"}),confirmPassword:u().min(6,{message:"La confirmation du mot de passe est requise"}),acceptTerms:M().refine(a=>a===!0,{message:"Vous devez accepter les conditions d'utilisation"})}).refine(a=>a.password===a.confirmPassword,{message:"Les mots de passe ne correspondent pas",path:["confirmPassword"]});function _(){const[a,b]=h.useState(!1),[l,L]=h.useState(!1),{register:S,user:y}=F(),x=P();h.useEffect(()=>{y&&x("/")},[y,x]);const r=q({resolver:k(D),defaultValues:{name:"",email:"",password:"",confirmPassword:"",acceptTerms:!1}});async function z(s){try{const w=s.name.trim(),E=s.email.trim().toLowerCase(),g=await S({name:w,email:E,password:s.password});g.success?(f.success("Compte créé avec succès"),x("/")):f.error(g.error||"L'inscription a échoué")}catch{f.error("Une erreur est survenue")}}return e.jsx(d.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-12",children:e.jsxs(d.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:"w-full max-w-md space-y-6",children:[e.jsxs("div",{className:"space-y-2 text-center",children:[e.jsx(d.h1,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},className:"text-3xl font-bold",children:"Créer un compte"}),e.jsx(d.p,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},className:"text-muted-foreground",children:"Entrez vos informations pour créer un compte"})]}),e.jsx(T,{...r,children:e.jsxs("form",{onSubmit:r.handleSubmit(z),className:"space-y-4",children:[e.jsx(o,{control:r.control,name:"name",render:({field:s})=>e.jsxs(t,{children:[e.jsx(n,{children:"Nom complet"}),e.jsx(i,{children:e.jsx(p,{placeholder:"John Doe",autoComplete:"name",...s})}),e.jsx(c,{children:"C'est votre nom public qui sera affiché."}),e.jsx(m,{})]})}),e.jsx(o,{control:r.control,name:"email",render:({field:s})=>e.jsxs(t,{children:[e.jsx(n,{children:"Email"}),e.jsx(i,{children:e.jsx(p,{type:"email",placeholder:"exemple@email.com",autoComplete:"email",...s})}),e.jsx(c,{children:"Nous ne partagerons jamais votre email avec qui que ce soit."}),e.jsx(m,{})]})}),e.jsx(o,{control:r.control,name:"password",render:({field:s})=>e.jsxs(t,{children:[e.jsx(n,{children:"Mot de passe"}),e.jsx(i,{children:e.jsxs("div",{className:"relative",children:[e.jsx(p,{type:a?"text":"password",placeholder:"••••••••",autoComplete:"new-password",...s}),e.jsxs(j,{type:"button",variant:"ghost",size:"icon",className:"absolute right-0 top-0 h-full px-3",onClick:()=>b(!a),children:[a?e.jsx(N,{className:"h-4 w-4"}):e.jsx(C,{className:"h-4 w-4"}),e.jsx("span",{className:"sr-only",children:a?"Masquer le mot de passe":"Afficher le mot de passe"})]})]})}),e.jsx(c,{children:"Doit contenir au moins 6 caractères avec une majuscule, une minuscule et un chiffre."}),e.jsx(m,{})]})}),e.jsx(o,{control:r.control,name:"confirmPassword",render:({field:s})=>e.jsxs(t,{children:[e.jsx(n,{children:"Confirmer le mot de passe"}),e.jsx(i,{children:e.jsxs("div",{className:"relative",children:[e.jsx(p,{type:l?"text":"password",placeholder:"••••••••",autoComplete:"new-password",...s}),e.jsxs(j,{type:"button",variant:"ghost",size:"icon",className:"absolute right-0 top-0 h-full px-3",onClick:()=>L(!l),children:[l?e.jsx(N,{className:"h-4 w-4"}):e.jsx(C,{className:"h-4 w-4"}),e.jsx("span",{className:"sr-only",children:l?"Masquer le mot de passe":"Afficher le mot de passe"})]})]})}),e.jsx(c,{children:"Entrez à nouveau votre mot de passe pour confirmer."}),e.jsx(m,{})]})}),e.jsx(o,{control:r.control,name:"acceptTerms",render:({field:s})=>e.jsxs(t,{className:"flex flex-row items-start space-x-3 space-y-0",children:[e.jsx(i,{children:e.jsx(V,{checked:s.value,onCheckedChange:s.onChange})}),e.jsxs("div",{className:"space-y-1 leading-none",children:[e.jsxs(n,{children:["J'accepte les"," ",e.jsx(v,{to:"/terms",className:"text-primary hover:underline",children:"conditions d'utilisation"})]}),e.jsx(c,{children:"Vous devez accepter nos conditions d'utilisation pour créer un compte."})]}),e.jsx(m,{})]})}),e.jsx(j,{type:"submit",className:"w-full",disabled:r.formState.isSubmitting,children:r.formState.isSubmitting?"Création en cours...":"Créer un compte"})]})}),e.jsxs("div",{className:"text-center text-sm",children:["Vous avez déjà un compte ?"," ",e.jsx(v,{to:"/login",className:"text-primary hover:underline",children:"Se connecter"})]})]})})}export{_ as default};
