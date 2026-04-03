(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const d of l.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function t(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(n){if(n.ep)return;n.ep=!0;const l=t(n);fetch(n.href,l)}})();class me{constructor(){this.config={MAX_FILE_SIZE:5*1024*1024,ALLOWED_TYPES:["image/jpeg","image/jpg","image/png"],API_URL:"https://web-production-8699.up.railway.app/predict"}}init(){console.log("AppController initialized"),this.addAlertStyles()}getConfig(){return this.config}showAlert(e,t="info"){const a=document.createElement("div");a.className=`alert alert-${t}`,a.innerHTML=`
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${t==="error"?"#dc3545":t==="warning"?"#ffc107":"#28a745"};
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 10000;
                max-width: 300px;
                animation: slideIn 0.3s ease;
            ">
                ${e}
            </div>
        `,document.body.appendChild(a),setTimeout(()=>{a.parentNode&&a.parentNode.removeChild(a)},5e3)}addAlertStyles(){const e=document.createElement("style");e.textContent=`
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `,document.head.appendChild(e)}formatFileSize(e){if(e===0)return"0 Bytes";const t=1024,a=["Bytes","KB","MB","GB"],n=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,n)).toFixed(2))+" "+a[n]}debounce(e,t){let a;return function(...l){const d=()=>{clearTimeout(a),e(...l)};clearTimeout(a),a=setTimeout(d,t)}}handleAPIError(e,t){if(t)switch(t.status){case 400:return"Data yang dikirim tidak valid. Periksa kembali file yang diupload.";case 401:return"Tidak memiliki akses. Silakan login kembali.";case 413:return"File terlalu besar. Maksimal 5MB.";case 429:return"Terlalu banyak permintaan. Silakan tunggu sebentar.";case 500:return"Terjadi kesalahan server. Silakan coba lagi nanti.";default:return"Terjadi kesalahan saat menganalisis. Silakan coba lagi."}return e.message||"Terjadi kesalahan yang tidak diketahui."}}class pe{constructor(){this.pageId="home",this.isActive=!1,this.animationObserver=null,this.typingInterval=null,this.currentTextIndex=0,this.heroTexts=["Deteksi tingkat stress dalam percakapan chat dengan teknologi AI","Analisis mendalam untuk komunikasi yang lebih sehat","Tingkatkan kualitas hubungan digital Anda"]}render(){return console.log("[HomeView] render called"),`
            <div id="home" class="page-section ${this.isActive?"active":""}">
                <div class="hero-section">
                    <div class="hero-content">
                        <h1>🧠 Stress Chat Detector</h1>
                        <p class="hero-subtitle" id="dynamicSubtitle">Deteksi tingkat stress dalam percakapan chat dengan teknologi AI</p>
                        <div class="hero-features">
                            <div class="feature" data-aos="fade-up" data-aos-delay="100">
                                <div class="feature-icon">📱</div>
                                <h3>Upload Screenshot</h3>
                                <p>Upload screenshot chat dari berbagai platform media sosial dan aplikasi pesan dengan mudah dan cepat</p>
                            </div>
                            <div class="feature" data-aos="fade-up" data-aos-delay="200">
                                <div class="feature-icon">🔍</div>
                                <h3>Analisis AI</h3>
                                <p>Menggunakan teknologi AI terdepan untuk menganalisis tingkat stress, sentimen, dan pola komunikasi</p>
                            </div>
                            <div class="feature" data-aos="fade-up" data-aos-delay="300">
                                <div class="feature-icon">📊</div>
                                <h3>Hasil Detail</h3>
                                <p>Mendapatkan hasil analisis komprehensif dengan visualisasi menarik dan rekomendasi actionable</p>
                            </div>
                        </div>
                        
                        <button class="cta-button" id="startDetectionBtn" data-aos="zoom-in" data-aos-delay="500">
                            Mulai Deteksi
                        </button>
                    </div>
                </div>
            </div>
        `}mount(e){if(!e){console.error("[HomeView] Container element not found");return}console.log("[HomeView] Mounting view to container"),e.innerHTML=this.render(),this.bindEvents(),this.initializeAnimations(),this.startDynamicText()}bindEvents(){console.log("[HomeView] Binding events");const e=document.getElementById("startDetectionBtn");e?(e.removeEventListener("click",this.boundHandleStartClick),this.boundHandleStartClick=this.handleStartClick.bind(this),e.addEventListener("click",this.boundHandleStartClick),e.addEventListener("mouseenter",()=>{e.classList.add("pulse")}),e.addEventListener("mouseleave",()=>{e.classList.remove("pulse")}),console.log("[HomeView] Start button event bound successfully")):console.warn("[HomeView] Start button not found"),this.addFeatureCardEffects(),this.addScrollAnimations()}addFeatureCardEffects(){const e=document.querySelectorAll(".feature");e.forEach((t,a)=>{setTimeout(()=>{t.style.opacity="1",t.style.transform="translateY(0)"},a*150),t.addEventListener("mouseenter",()=>{this.createRippleEffect(t),e.forEach((n,l)=>{n!==t&&(n.style.transform="scale(0.95)",n.style.opacity="0.7")})}),t.addEventListener("mouseleave",()=>{e.forEach(n=>{n.style.transform="scale(1)",n.style.opacity="1"})}),t.addEventListener("click",()=>{t.style.transform="scale(0.95)",setTimeout(()=>{t.style.transform="scale(1)"},150)})})}createRippleEffect(e){const t=document.createElement("div");t.style.position="absolute",t.style.borderRadius="50%",t.style.background="rgba(102, 126, 234, 0.3)",t.style.transform="scale(0)",t.style.animation="ripple 0.6s linear",t.style.left="50%",t.style.top="50%",t.style.width="20px",t.style.height="20px",t.style.marginLeft="-10px",t.style.marginTop="-10px",t.style.zIndex="1",e.style.position="relative",e.appendChild(t),setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},600)}addScrollAnimations(){const e=new IntersectionObserver(a=>{a.forEach(n=>{n.isIntersecting&&(n.target.classList.add("animate-in"),n.target.classList.contains("stat-item")&&this.animateStatNumbers(n.target))})},{threshold:.2,rootMargin:"0px 0px -50px 0px"});document.querySelectorAll(".stat-item, .feature").forEach(a=>e.observe(a)),this.animationObserver=e}animateStatNumbers(e){const t=e.querySelector(".stat-number");if(!t)return;const a=t.textContent,n=parseInt(a);if(!isNaN(n)){let l=0;const d=n/30,h=setInterval(()=>{l+=d,l>=n?(t.textContent=a,clearInterval(h)):t.textContent=Math.floor(l)},50)}}initializeAnimations(){if(!document.querySelector("#homeAnimations")){const e=document.createElement("style");e.id="homeAnimations",e.textContent=`
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                
                .feature {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                
                .animate-in {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                
                .cta-button.pulse {
                    animation: buttonPulse 0.6s ease-in-out;
                }
                
                @keyframes buttonPulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
            `,document.head.appendChild(e)}}startDynamicText(){const e=document.getElementById("dynamicSubtitle");if(!e)return;let t=0;const a=()=>{e.style.opacity="0",e.style.transform="translateY(10px)",setTimeout(()=>{t=(t+1)%this.heroTexts.length,e.textContent=this.heroTexts[t],e.style.opacity="1",e.style.transform="translateY(0)"},300)};this.typingInterval=setInterval(a,4e3)}handleStartClick(e){e.preventDefault(),console.log("[HomeView] Start detection button clicked");const t=e.target;if(t.disabled){console.log("[HomeView] Button already disabled, ignoring click");return}t.style.transform="scale(0.95)",setTimeout(()=>{t.style.transform="scale(1)"},150);const a=t.innerHTML;t.innerHTML="Memuat...",t.disabled=!0,setTimeout(()=>{try{this.navigateToDetector()}catch(n){console.error("[HomeView] Navigation error:",n),t.innerHTML=a,t.disabled=!1}},500)}navigateToDetector(){if(console.log("[HomeView] Navigating to detector"),typeof window.navigateToPage=="function"){console.log("[HomeView] Using global navigateToPage function"),window.navigateToPage("detector");return}console.log("[HomeView] Using custom navigation event");const e=new CustomEvent("navigate",{detail:{page:"detector"}});if(window.dispatchEvent(e),window.app&&window.app.navigationController){console.log("[HomeView] Using direct navigation controller"),window.app.navigationController.navigateToPage("detector");return}if(window.navigationController){console.log("[HomeView] Using window.navigationController"),window.navigationController.navigateToPage("detector");return}console.warn("[HomeView] No navigation method available")}activate(){console.log("[HomeView] Activating view"),this.isActive=!0;const e=document.getElementById(this.pageId);e?(e.classList.add("active"),console.log("[HomeView] View activated successfully")):console.warn("[HomeView] Home element not found for activation")}deactivate(){console.log("[HomeView] Deactivating view"),this.isActive=!1;const e=document.getElementById(this.pageId);e&&e.classList.remove("active")}init(e){console.log("[HomeView] Init method called"),this.mount(e),this.activate()}destroy(){console.log("[HomeView] Destroying view"),this.typingInterval&&(clearInterval(this.typingInterval),this.typingInterval=null),this.animationObserver&&(this.animationObserver.disconnect(),this.animationObserver=null);const e=document.getElementById("startDetectionBtn");e&&this.boundHandleStartClick&&e.removeEventListener("click",this.boundHandleStartClick);const t=document.querySelector("#homeAnimations");t&&t.remove(),this.deactivate()}loadStylesheet(){const e=document.createElement("link");e.rel="stylesheet",e.href="./styles/home-styles.css",e.onload=()=>{console.log("Home page styles loaded successfully")},document.head.appendChild(e)}getMetadata(){return{title:"Home - Stress Chat Detector",description:"Deteksi tingkat stress dalam percakapan chat dengan teknologi AI. Analisis mendalam untuk komunikasi yang lebih sehat.",keywords:"stress detection, AI, chat analysis, mental health, communication",author:"Stress Chat Detector Team",robots:"index, follow"}}preloadAssets(){[].forEach(t=>{const a=document.createElement("link");a.rel="preload",a.href=t,a.as="image",document.head.appendChild(a)})}}function ge(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var ve={exports:{}};(function(i){var e=function(t){var a=Object.prototype,n=a.hasOwnProperty,l=Object.defineProperty||function(o,s,c){o[s]=c.value},d,h=typeof Symbol=="function"?Symbol:{},w=h.iterator||"@@iterator",L=h.asyncIterator||"@@asyncIterator",C=h.toStringTag||"@@toStringTag";function g(o,s,c){return Object.defineProperty(o,s,{value:c,enumerable:!0,configurable:!0,writable:!0}),o[s]}try{g({},"")}catch{g=function(s,c,m){return s[c]=m}}function S(o,s,c,m){var r=s&&s.prototype instanceof j?s:j,u=Object.create(r.prototype),p=new V(m||[]);return l(u,"_invoke",{value:X(o,c,p)}),u}t.wrap=S;function I(o,s,c){try{return{type:"normal",arg:o.call(s,c)}}catch(m){return{type:"throw",arg:m}}}var P="suspendedStart",B="suspendedYield",D="executing",x="completed",y={};function j(){}function O(){}function b(){}var U={};g(U,w,function(){return this});var G=Object.getPrototypeOf,H=G&&G(G(W([])));H&&H!==a&&n.call(H,w)&&(U=H);var F=b.prototype=j.prototype=Object.create(U);O.prototype=b,l(F,"constructor",{value:b,configurable:!0}),l(b,"constructor",{value:O,configurable:!0}),O.displayName=g(b,C,"GeneratorFunction");function K(o){["next","throw","return"].forEach(function(s){g(o,s,function(c){return this._invoke(s,c)})})}t.isGeneratorFunction=function(o){var s=typeof o=="function"&&o.constructor;return s?s===O||(s.displayName||s.name)==="GeneratorFunction":!1},t.mark=function(o){return Object.setPrototypeOf?Object.setPrototypeOf(o,b):(o.__proto__=b,g(o,C,"GeneratorFunction")),o.prototype=Object.create(F),o},t.awrap=function(o){return{__await:o}};function $(o,s){function c(u,p,v,f){var k=I(o[u],o,p);if(k.type==="throw")f(k.arg);else{var R=k.arg,T=R.value;return T&&typeof T=="object"&&n.call(T,"__await")?s.resolve(T.__await).then(function(M){c("next",M,v,f)},function(M){c("throw",M,v,f)}):s.resolve(T).then(function(M){R.value=M,v(R)},function(M){return c("throw",M,v,f)})}}var m;function r(u,p){function v(){return new s(function(f,k){c(u,p,f,k)})}return m=m?m.then(v,v):v()}l(this,"_invoke",{value:r})}K($.prototype),g($.prototype,L,function(){return this}),t.AsyncIterator=$,t.async=function(o,s,c,m,r){r===void 0&&(r=Promise);var u=new $(S(o,s,c,m),r);return t.isGeneratorFunction(s)?u:u.next().then(function(p){return p.done?p.value:u.next()})};function X(o,s,c){var m=P;return function(u,p){if(m===D)throw new Error("Generator is already running");if(m===x){if(u==="throw")throw p;return Y()}for(c.method=u,c.arg=p;;){var v=c.delegate;if(v){var f=q(v,c);if(f){if(f===y)continue;return f}}if(c.method==="next")c.sent=c._sent=c.arg;else if(c.method==="throw"){if(m===P)throw m=x,c.arg;c.dispatchException(c.arg)}else c.method==="return"&&c.abrupt("return",c.arg);m=D;var k=I(o,s,c);if(k.type==="normal"){if(m=c.done?x:B,k.arg===y)continue;return{value:k.arg,done:c.done}}else k.type==="throw"&&(m=x,c.method="throw",c.arg=k.arg)}}}function q(o,s){var c=s.method,m=o.iterator[c];if(m===d)return s.delegate=null,c==="throw"&&o.iterator.return&&(s.method="return",s.arg=d,q(o,s),s.method==="throw")||c!=="return"&&(s.method="throw",s.arg=new TypeError("The iterator does not provide a '"+c+"' method")),y;var r=I(m,o.iterator,s.arg);if(r.type==="throw")return s.method="throw",s.arg=r.arg,s.delegate=null,y;var u=r.arg;if(!u)return s.method="throw",s.arg=new TypeError("iterator result is not an object"),s.delegate=null,y;if(u.done)s[o.resultName]=u.value,s.next=o.nextLoc,s.method!=="return"&&(s.method="next",s.arg=d);else return u;return s.delegate=null,y}K(F),g(F,C,"Generator"),g(F,w,function(){return this}),g(F,"toString",function(){return"[object Generator]"});function Q(o){var s={tryLoc:o[0]};1 in o&&(s.catchLoc=o[1]),2 in o&&(s.finallyLoc=o[2],s.afterLoc=o[3]),this.tryEntries.push(s)}function N(o){var s=o.completion||{};s.type="normal",delete s.arg,o.completion=s}function V(o){this.tryEntries=[{tryLoc:"root"}],o.forEach(Q,this),this.reset(!0)}t.keys=function(o){var s=Object(o),c=[];for(var m in s)c.push(m);return c.reverse(),function r(){for(;c.length;){var u=c.pop();if(u in s)return r.value=u,r.done=!1,r}return r.done=!0,r}};function W(o){if(o){var s=o[w];if(s)return s.call(o);if(typeof o.next=="function")return o;if(!isNaN(o.length)){var c=-1,m=function r(){for(;++c<o.length;)if(n.call(o,c))return r.value=o[c],r.done=!1,r;return r.value=d,r.done=!0,r};return m.next=m}}return{next:Y}}t.values=W;function Y(){return{value:d,done:!0}}return V.prototype={constructor:V,reset:function(o){if(this.prev=0,this.next=0,this.sent=this._sent=d,this.done=!1,this.delegate=null,this.method="next",this.arg=d,this.tryEntries.forEach(N),!o)for(var s in this)s.charAt(0)==="t"&&n.call(this,s)&&!isNaN(+s.slice(1))&&(this[s]=d)},stop:function(){this.done=!0;var o=this.tryEntries[0],s=o.completion;if(s.type==="throw")throw s.arg;return this.rval},dispatchException:function(o){if(this.done)throw o;var s=this;function c(f,k){return u.type="throw",u.arg=o,s.next=f,k&&(s.method="next",s.arg=d),!!k}for(var m=this.tryEntries.length-1;m>=0;--m){var r=this.tryEntries[m],u=r.completion;if(r.tryLoc==="root")return c("end");if(r.tryLoc<=this.prev){var p=n.call(r,"catchLoc"),v=n.call(r,"finallyLoc");if(p&&v){if(this.prev<r.catchLoc)return c(r.catchLoc,!0);if(this.prev<r.finallyLoc)return c(r.finallyLoc)}else if(p){if(this.prev<r.catchLoc)return c(r.catchLoc,!0)}else if(v){if(this.prev<r.finallyLoc)return c(r.finallyLoc)}else throw new Error("try statement without catch or finally")}}},abrupt:function(o,s){for(var c=this.tryEntries.length-1;c>=0;--c){var m=this.tryEntries[c];if(m.tryLoc<=this.prev&&n.call(m,"finallyLoc")&&this.prev<m.finallyLoc){var r=m;break}}r&&(o==="break"||o==="continue")&&r.tryLoc<=s&&s<=r.finallyLoc&&(r=null);var u=r?r.completion:{};return u.type=o,u.arg=s,r?(this.method="next",this.next=r.finallyLoc,y):this.complete(u)},complete:function(o,s){if(o.type==="throw")throw o.arg;return o.type==="break"||o.type==="continue"?this.next=o.arg:o.type==="return"?(this.rval=this.arg=o.arg,this.method="return",this.next="end"):o.type==="normal"&&s&&(this.next=s),y},finish:function(o){for(var s=this.tryEntries.length-1;s>=0;--s){var c=this.tryEntries[s];if(c.finallyLoc===o)return this.complete(c.completion,c.afterLoc),N(c),y}},catch:function(o){for(var s=this.tryEntries.length-1;s>=0;--s){var c=this.tryEntries[s];if(c.tryLoc===o){var m=c.completion;if(m.type==="throw"){var r=m.arg;N(c)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(o,s,c){return this.delegate={iterator:W(o),resultName:s,nextLoc:c},this.method==="next"&&(this.arg=d),y}},t}(i.exports);try{regeneratorRuntime=e}catch{typeof globalThis=="object"?globalThis.regeneratorRuntime=e:Function("r","regeneratorRuntime = r")(e)}})(ve);var ae=(i,e)=>`${i}-${e}-${Math.random().toString(16).slice(3,8)}`;const fe=ae;let ie=0;var ce=({id:i,action:e,payload:t={}})=>{let a=i;return typeof a>"u"&&(a=fe("Job",ie),ie+=1),{id:a,action:e,payload:t}},_={};let ne=!1;_.logging=ne;_.setLogging=i=>{ne=i};_.log=(...i)=>ne?console.log.apply(void 0,i):null;const ke=ce,{log:J}=_,ye=ae;let se=0;var be=()=>{const i=ye("Scheduler",se),e={},t={};let a=[];se+=1;const n=()=>a.length,l=()=>Object.keys(e).length,d=()=>{if(a.length!==0){const g=Object.keys(e);for(let S=0;S<g.length;S+=1)if(typeof t[g[S]]>"u"){a[0](e[g[S]]);break}}},h=(g,S)=>new Promise((I,P)=>{const B=ke({action:g,payload:S});a.push(async D=>{a.shift(),t[D.id]=B;try{I(await D[g].apply(void 0,[...S,B.id]))}catch(x){P(x)}finally{delete t[D.id],d()}}),J(`[${i}]: Add ${B.id} to JobQueue`),J(`[${i}]: JobQueue length=${a.length}`),d()});return{addWorker:g=>(e[g.id]=g,J(`[${i}]: Add ${g.id}`),J(`[${i}]: Number of workers=${l()}`),d(),g.id),addJob:async(g,...S)=>{if(l()===0)throw Error(`[${i}]: You need to have at least one worker before adding jobs`);return h(g,S)},terminate:async()=>{Object.keys(e).forEach(async g=>{await e[g].terminate()}),a=[]},getQueueLen:n,getNumWorkers:l}};function we(i){throw new Error('Could not dynamically require "'+i+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}function Se(){return!!(typeof window<"u"&&typeof window.process=="object"&&window.process.type==="renderer"||typeof process<"u"&&typeof process.versions=="object"&&process.versions.electron||typeof navigator=="object"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Electron")>=0)}var Ee=Se;const Le=Ee;var Ae=i=>{const e={};return typeof WorkerGlobalScope<"u"?e.type="webworker":Le()?e.type="electron":typeof document=="object"?e.type="browser":typeof process=="object"&&typeof we=="function"&&(e.type="node"),typeof i>"u"?e:e[i]};const Ce=Ae("type")==="browser",Ie=Ce?i=>new URL(i,window.location.href).href:i=>i;var Te=i=>{const e={...i};return["corePath","workerPath","langPath"].forEach(t=>{i[t]&&(e[t]=Ie(e[t]))}),e},Me=i=>{const e=[],t=[],a=[],n=[],l=[];return i.blocks&&i.blocks.forEach(d=>{d.paragraphs.forEach(h=>{h.lines.forEach(w=>{w.words.forEach(L=>{L.symbols.forEach(C=>{l.push({...C,page:i,block:d,paragraph:h,line:w,word:L})}),n.push({...L,page:i,block:d,paragraph:h,line:w})}),a.push({...w,page:i,block:d,paragraph:h})}),t.push({...h,page:i,block:d})}),e.push({...d,page:i})}),{...i,blocks:e,paragraphs:t,lines:a,words:n,symbols:l}},de={TESSERACT_ONLY:0,LSTM_ONLY:1,TESSERACT_LSTM_COMBINED:2,DEFAULT:3};const Pe="5.1.1",Be={version:Pe};var De={workerBlobURL:!0,logger:()=>{}};const xe=Be.version,Fe=De;var Re={...Fe,workerPath:`https://cdn.jsdelivr.net/npm/tesseract.js@v${xe}/dist/worker.min.js`},Oe=({workerPath:i,workerBlobURL:e})=>{let t;if(Blob&&URL&&e){const a=new Blob([`importScripts("${i}");`],{type:"application/javascript"});t=new Worker(URL.createObjectURL(a))}else t=new Worker(i);return t},Ne=i=>{i.terminate()},ze=(i,e)=>{i.onmessage=({data:t})=>{e(t)}},je=async(i,e)=>{i.postMessage(e)};const ee=i=>new Promise((e,t)=>{const a=new FileReader;a.onload=()=>{e(a.result)},a.onerror=({target:{error:{code:n}}})=>{t(Error(`File could not be read! Code=${n}`))},a.readAsArrayBuffer(i)}),te=async i=>{let e=i;if(typeof i>"u")return"undefined";if(typeof i=="string")/data:image\/([a-zA-Z]*);base64,([^"]*)/.test(i)?e=atob(i.split(",")[1]).split("").map(t=>t.charCodeAt(0)):e=await(await fetch(i)).arrayBuffer();else if(typeof HTMLElement<"u"&&i instanceof HTMLElement)i.tagName==="IMG"&&(e=await te(i.src)),i.tagName==="VIDEO"&&(e=await te(i.poster)),i.tagName==="CANVAS"&&await new Promise(t=>{i.toBlob(async a=>{e=await ee(a),t()})});else if(typeof OffscreenCanvas<"u"&&i instanceof OffscreenCanvas){const t=await i.convertToBlob();e=await ee(t)}else(i instanceof File||i instanceof Blob)&&(e=await ee(i));return new Uint8Array(e)};var He=te;const $e=Re,_e=Oe,Ue=Ne,Ge=ze,qe=je,Ve=He;var We={defaultOptions:$e,spawnWorker:_e,terminateWorker:Ue,onMessage:Ge,send:qe,loadImage:Ve};const Ke=Te,Ye=Me,A=ce,{log:re}=_,Je=ae,z=de,{defaultOptions:Ze,spawnWorker:Xe,terminateWorker:Qe,onMessage:et,loadImage:oe,send:tt}=We;let le=0;var ue=async(i="eng",e=z.LSTM_ONLY,t={},a={})=>{const n=Je("Worker",le),{logger:l,errorHandler:d,...h}=Ke({...Ze,...t}),w={},L={},C=typeof i=="string"?i.split("+"):i;let g=e,S=a;const I=[z.DEFAULT,z.LSTM_ONLY].includes(e)&&!h.legacyCore;let P,B;const D=new Promise((r,u)=>{B=r,P=u}),x=r=>{P(r.message)};let y=Xe(h);y.onerror=x,le+=1;const j=(r,u)=>{w[r]=u},O=(r,u)=>{L[r]=u},b=({id:r,action:u,payload:p})=>new Promise((v,f)=>{re(`[${n}]: Start ${r}, action=${u}`);const k=`${u}-${r}`;j(k,v),O(k,f),tt(y,{workerId:n,jobId:r,action:u,payload:p})}),U=()=>console.warn("`load` is depreciated and should be removed from code (workers now come pre-loaded)"),G=r=>b(A({id:r,action:"load",payload:{options:{lstmOnly:I,corePath:h.corePath,logging:h.logging}}})),H=(r,u,p)=>b(A({id:p,action:"FS",payload:{method:"writeFile",args:[r,u]}})),F=(r,u)=>b(A({id:u,action:"FS",payload:{method:"readFile",args:[r,{encoding:"utf8"}]}})),K=(r,u)=>b(A({id:u,action:"FS",payload:{method:"unlink",args:[r]}})),$=(r,u,p)=>b(A({id:p,action:"FS",payload:{method:r,args:u}})),X=()=>console.warn("`loadLanguage` is depreciated and should be removed from code (workers now come with language pre-loaded)"),q=(r,u)=>b(A({id:u,action:"loadLanguage",payload:{langs:r,options:{langPath:h.langPath,dataPath:h.dataPath,cachePath:h.cachePath,cacheMethod:h.cacheMethod,gzip:h.gzip,lstmOnly:[z.DEFAULT,z.LSTM_ONLY].includes(g)&&!h.legacyLang}}})),Q=()=>console.warn("`initialize` is depreciated and should be removed from code (workers now come pre-initialized)"),N=(r,u,p,v)=>b(A({id:v,action:"initialize",payload:{langs:r,oem:u,config:p}})),V=(r="eng",u,p,v)=>{if(I&&[z.TESSERACT_ONLY,z.TESSERACT_LSTM_COMBINED].includes(u))throw Error("Legacy model requested but code missing.");const f=u||g;g=f;const k=p||S;S=k;const T=(typeof r=="string"?r.split("+"):r).filter(M=>!C.includes(M));return C.push(...T),T.length>0?q(T,v).then(()=>N(r,f,k,v)):N(r,f,k,v)},W=(r={},u)=>b(A({id:u,action:"setParameters",payload:{params:r}})),Y=async(r,u={},p={blocks:!0,text:!0,hocr:!0,tsv:!0},v)=>b(A({id:v,action:"recognize",payload:{image:await oe(r),options:u,output:p}})),o=(r="Tesseract OCR Result",u=!1,p)=>(console.log("`getPDF` function is depreciated. `recognize` option `savePDF` should be used instead."),b(A({id:p,action:"getPDF",payload:{title:r,textonly:u}}))),s=async(r,u)=>{if(I)throw Error("`worker.detect` requires Legacy model, which was not loaded.");return b(A({id:u,action:"detect",payload:{image:await oe(r)}}))},c=async()=>(y!==null&&(Qe(y),y=null),Promise.resolve());et(y,({workerId:r,jobId:u,status:p,action:v,data:f})=>{const k=`${v}-${u}`;if(p==="resolve"){re(`[${r}]: Complete ${u}`);let R=f;v==="recognize"?R=Ye(f):v==="getPDF"&&(R=Array.from({...f,length:Object.keys(f).length})),w[k]({jobId:u,data:R})}else if(p==="reject")if(L[k](f),v==="load"&&P(f),d)d(f);else throw Error(f);else p==="progress"&&l({...f,userJobId:u})});const m={id:n,worker:y,setResolve:j,setReject:O,load:U,writeText:H,readText:F,removeFile:K,FS:$,loadLanguage:X,initialize:Q,reinitialize:V,setParameters:W,recognize:Y,getPDF:o,detect:s,terminate:c};return G().then(()=>q(i)).then(()=>N(i,e,a)).then(()=>B(m)).catch(()=>{}),D};const he=ue,at=async(i,e,t)=>{const a=await he(e,1,t);return a.recognize(i).finally(async()=>{await a.terminate()})},nt=async(i,e)=>{const t=await he("osd",0,e);return t.detect(i).finally(async()=>{await t.terminate()})};var it={recognize:at,detect:nt},st={AFR:"afr",AMH:"amh",ARA:"ara",ASM:"asm",AZE:"aze",AZE_CYRL:"aze_cyrl",BEL:"bel",BEN:"ben",BOD:"bod",BOS:"bos",BUL:"bul",CAT:"cat",CEB:"ceb",CES:"ces",CHI_SIM:"chi_sim",CHI_TRA:"chi_tra",CHR:"chr",CYM:"cym",DAN:"dan",DEU:"deu",DZO:"dzo",ELL:"ell",ENG:"eng",ENM:"enm",EPO:"epo",EST:"est",EUS:"eus",FAS:"fas",FIN:"fin",FRA:"fra",FRK:"frk",FRM:"frm",GLE:"gle",GLG:"glg",GRC:"grc",GUJ:"guj",HAT:"hat",HEB:"heb",HIN:"hin",HRV:"hrv",HUN:"hun",IKU:"iku",IND:"ind",ISL:"isl",ITA:"ita",ITA_OLD:"ita_old",JAV:"jav",JPN:"jpn",KAN:"kan",KAT:"kat",KAT_OLD:"kat_old",KAZ:"kaz",KHM:"khm",KIR:"kir",KOR:"kor",KUR:"kur",LAO:"lao",LAT:"lat",LAV:"lav",LIT:"lit",MAL:"mal",MAR:"mar",MKD:"mkd",MLT:"mlt",MSA:"msa",MYA:"mya",NEP:"nep",NLD:"nld",NOR:"nor",ORI:"ori",PAN:"pan",POL:"pol",POR:"por",PUS:"pus",RON:"ron",RUS:"rus",SAN:"san",SIN:"sin",SLK:"slk",SLV:"slv",SPA:"spa",SPA_OLD:"spa_old",SQI:"sqi",SRP:"srp",SRP_LATN:"srp_latn",SWA:"swa",SWE:"swe",SYR:"syr",TAM:"tam",TEL:"tel",TGK:"tgk",TGL:"tgl",THA:"tha",TIR:"tir",TUR:"tur",UIG:"uig",UKR:"ukr",URD:"urd",UZB:"uzb",UZB_CYRL:"uzb_cyrl",VIE:"vie",YID:"yid"},rt={OSD_ONLY:"0",AUTO_OSD:"1",AUTO_ONLY:"2",AUTO:"3",SINGLE_COLUMN:"4",SINGLE_BLOCK_VERT_TEXT:"5",SINGLE_BLOCK:"6",SINGLE_LINE:"7",SINGLE_WORD:"8",CIRCLE_WORD:"9",SINGLE_CHAR:"10",SPARSE_TEXT:"11",SPARSE_TEXT_OSD:"12",RAW_LINE:"13"};const ot=be,lt=ue,ct=it,dt=st,ut=de,ht=rt,{setLogging:mt}=_;var pt={languages:dt,OEM:ut,PSM:ht,createScheduler:ot,createWorker:lt,setLogging:mt,...ct};const Z=ge(pt);class gt{constructor(){this.pageId="detector",this.isActive=!1,this.selectedFile=null,this.eventListenersAdded=!1,this.config={MAX_FILE_SIZE:5*1024*1024,ALLOWED_TYPES:["image/jpeg","image/jpg","image/png"],API_URL:"https://web-production-8699.up.railway.app/predict"},this.tesseractWorker=null}render(){return`
            <section id="detector" class="page-section ${this.isActive?"active":""}">
                <div class="detector-container">
                    <div class="detector-header">
                        <h1>🔍 Stress Chat Detector</h1>
                        <p>Upload screenshot chat untuk mendeteksi tingkat stress dalam percakapan</p>
                    </div>

                    <div class="upload-section" id="uploadSection">
                        <div class="upload-icon">📱</div>
                        <div class="upload-text">
                            <strong>Klik atau drag & drop screenshot chat</strong><br>
                            Format: JPG, PNG, JPEG (Max 5MB)
                        </div>
                        <button class="upload-btn" id="uploadBtn">
                            Pilih File
                        </button>
                        <input type="file" id="fileInput" accept="image/*" style="display: none;" />
                    </div>

                    <div class="preview-section" id="previewSection" style="display: none;">
                        <img id="previewImage" class="preview-image" alt="Preview" />
                        <div class="file-info" id="fileInfo"></div>
                        <button class="analyze-btn" id="analyzeBtn">
                            🔍 Analisis Tingkat Stress
                        </button>
                    </div>

                    <div class="loading" id="loadingSection" style="display: none;">
                        <div class="spinner"></div>
                        <p>Sedang menganalisis chat... Mohon tunggu sebentar</p>
                    </div>

                    <div class="result-section" id="resultSection" style="display: none;">
                        <div class="stress-level">
                            <h2>Hasil Analisis Stress</h2>
                            <div class="stress-meter">
                                <div class="stress-fill" id="stressFill"></div>
                            </div>
                            <h3 id="stressCategory">Tingkat Stress: -</h3>
                            <p id="stressPercentage">-</p>
                        </div>
                        
                        <div class="stress-details">
                            <h4>📊 Detail Analisis</h4>
                            <div id="analysisDetails">
                                <p><strong>Kata-kata indikator stress:</strong> <span id="stressWords">-</span></p>
                                <p><strong>Sentimen dominan:</strong> <span id="sentiment">-</span></p>
                                <p><strong>Rekomendasi:</strong> <span id="recommendation">-</span></p>
                            </div>
                        </div>
                        
                        <button class="reset-btn" id="resetBtn">Analisis Chat Lain</button>
                    </div>
                </div>
            </section>
        `}mount(e){e.innerHTML=this.render(),this.bindEvents(),this.initializeDragAndDrop()}init(e){this.mount(e)}bindEvents(){if(this.eventListenersAdded)return;const e=document.getElementById("uploadBtn"),t=document.getElementById("fileInput"),a=document.getElementById("analyzeBtn"),n=document.getElementById("resetBtn");e&&t&&(e.removeEventListener("click",this.handleUploadClick),t.removeEventListener("change",this.handleFileChange),this.handleUploadClick=this.handleUploadClick.bind(this),this.handleFileChange=this.handleFileChange.bind(this),e.addEventListener("click",this.handleUploadClick),t.addEventListener("change",this.handleFileChange)),a&&(a.removeEventListener("click",this.handleAnalyzeClick),this.handleAnalyzeClick=this.handleAnalyzeClick.bind(this),a.addEventListener("click",this.handleAnalyzeClick)),n&&(n.removeEventListener("click",this.handleResetClick),this.handleResetClick=this.handleResetClick.bind(this),n.addEventListener("click",this.handleResetClick)),this.eventListenersAdded=!0}handleUploadClick(){const e=document.getElementById("fileInput");e&&e.click()}handleFileChange(e){e.target.files.length>0&&this.handleFileSelect(e.target.files[0])}handleAnalyzeClick(){this.analyzeStress()}handleResetClick(){this.resetForm()}initializeDragAndDrop(){const e=document.getElementById("uploadSection");e&&(e.removeEventListener("dragover",this.handleDragOver),e.removeEventListener("dragleave",this.handleDragLeave),e.removeEventListener("drop",this.handleDrop),this.handleDragOver=this.handleDragOver.bind(this),this.handleDragLeave=this.handleDragLeave.bind(this),this.handleDrop=this.handleDrop.bind(this),e.addEventListener("dragover",this.handleDragOver),e.addEventListener("dragleave",this.handleDragLeave),e.addEventListener("drop",this.handleDrop))}handleDragOver(e){e.preventDefault();const t=document.getElementById("uploadSection");t&&t.classList.add("dragover")}handleDragLeave(){const e=document.getElementById("uploadSection");e&&e.classList.remove("dragover")}handleDrop(e){e.preventDefault();const t=document.getElementById("uploadSection");t&&t.classList.remove("dragover");const a=e.dataTransfer.files;a.length>0&&this.handleFileSelect(a[0])}handleFileSelect(e){console.log("File selected:",e.name),this.validateFile(e)&&(this.selectedFile=e,this.displayFilePreview(e))}validateFile(e){return this.config.ALLOWED_TYPES.includes(e.type)?e.size>this.config.MAX_FILE_SIZE?(this.showAlert("Ukuran file terlalu besar. Maksimal 5MB","error"),!1):!0:(this.showAlert("Mohon pilih file gambar (JPG, PNG, JPEG)","error"),!1)}displayFilePreview(e){const t=document.getElementById("previewSection"),a=document.getElementById("previewImage"),n=document.getElementById("fileInfo");if(!t||!a||!n)return;const l=new FileReader;l.onload=d=>{a.src=d.target.result,t.style.display="block",n.innerHTML=`
                <strong>📄 ${e.name}</strong><br>
                Ukuran: ${this.formatFileSize(e.size)} | Type: ${e.type}
            `,setTimeout(()=>{t.scrollIntoView({behavior:"smooth",block:"nearest"})},100)},l.onerror=()=>{this.showAlert("Gagal membaca file. Silakan coba lagi.","error")},l.readAsDataURL(e)}formatFileSize(e){if(e===0)return"0 Bytes";const t=1024,a=["Bytes","KB","MB","GB"],n=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,n)).toFixed(1))+" "+a[n]}async analyzeStress(){if(!this.selectedFile){this.showAlert("Silakan pilih file terlebih dahulu","warning");return}try{this.showLoading(!0),this.setAnalyzeButtonState(!1),this.hideResults();const e=await this.extractTextFromImage(this.selectedFile);if(!e||e.trim().length<5)throw new Error("Teks yang diekstrak terlalu pendek atau tidak dapat dibaca");const t=await this.sendToAPI(e);this.displayResults(this.formatApiResult(t,e))}catch(e){console.error("Analysis error:",e),this.showAlert(e.message||"Terjadi kesalahan saat menganalisis","error")}finally{this.showLoading(!1),this.setAnalyzeButtonState(!0)}}async extractTextFromImage(e){try{this.tesseractWorker||(this.tesseractWorker=await Z.createWorker("ind"),await this.tesseractWorker.setParameters({tessedit_char_whitelist:`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?:;()[]{}"'-/@#$%^&*+=<>|\\~ `,tessedit_pageseg_mode:Z.PSM.AUTO}));const{data:{text:t}}=await this.tesseractWorker.recognize(e);return this.cleanExtractedText(t)}catch(t){throw console.error("OCR Error:",t),new Error("Gagal mengekstrak teks dari gambar. Pastikan gambar jelas dan berisi teks.")}}cleanExtractedText(e){return e?e.replace(/\s+/g," ").replace(/[|_\-~]+/g," ").replace(/([.,!?:;])\1+/g,"$1").split(`
`).filter(t=>t.trim().length>2).join(" ").trim():""}async sendToAPI(e){try{const t=await fetch("/predict",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:e.substring(0,1e3)})});if(!t.ok){const a=await t.json().catch(()=>({}));throw new Error(a.message||"Error dari server analisis")}return await t.json()}catch(t){throw console.error("API Communication Error:",t),new Error("Gagal menghubungi server analisis. Coba beberapa saat lagi.")}}formatApiResult(e,t){const a=Math.min(100,Math.max(0,e.stress_percent||0)),n=e.prediction==="Negative",l=["stress","stres","tertekan","frustasi","panik","cemas","khawatir","gelisah","sedih","kecewa","capek","lelah","penat","pusing","deadline"],d=[...new Set(t.toLowerCase().split(/\s+/).filter(w=>l.some(L=>w.includes(L))))].slice(0,5);let h;return a>=80?h="Tingkat stress sangat tinggi. Segera cari dukungan profesional.":a>=60?h="Tingkat stress tinggi. Coba teknik relaksasi atau bicara dengan teman.":a>=40?h="Tingkat stress sedang. Luangkan waktu untuk istirahat.":h="Tingkat stress rendah. Pertahankan kondisi baik Anda.",{stress_level:a,category:this.getStressCategory(a),stress_words:d,sentiment:n?"Negatif":"Positif/Netral",recommendation:h,original_text:t}}getStressCategory(e){return e>=80?"Sangat Tinggi":e>=60?"Tinggi":e>=40?"Sedang":e>=20?"Rendah":"Minimal"}generateMockResult(){const e=Math.floor(Math.random()*100),t=["Rendah","Sedang","Tinggi"],a=[["deadline","capek","bingung"],["stress","kesal","frustasi","berat"],["panik","tertekan","overwhelmed","burnout"]],n=["Negatif","Netral","Campuran"],l=["Luangkan waktu untuk istirahat dan lakukan aktivitas yang menenangkan","Coba praktikkan teknik pernapasan dalam atau meditasi singkat","Berbicara dengan teman dekat atau keluarga dapat membantu mengurangi beban","Lakukan aktivitas fisik ringan seperti jalan santai untuk meredakan stress","Atur prioritas dan buat jadwal yang lebih realistis untuk menghindari tekanan berlebih"],d=e<30?0:e<70?1:2;return{stress_level:e,category:t[d],stress_words:a[d],sentiment:n[Math.floor(Math.random()*n.length)],recommendation:l[Math.floor(Math.random()*l.length)]}}displayResults(e){const t=document.getElementById("resultSection");if(!t)return;const a=e.stress_level||0;this.updateStressMeter(a),this.updateResultText(e,a),t.style.display="block",setTimeout(()=>{t.scrollIntoView({behavior:"smooth",block:"nearest"})},200)}updateStressMeter(e){const t=document.getElementById("stressFill");t&&(t.className="stress-fill",e<30?t.classList.add("stress-low"):e<70?t.classList.add("stress-medium"):t.classList.add("stress-high"),setTimeout(()=>{t.style.width=e+"%"},100))}updateResultText(e,t){const a=document.getElementById("stressCategory"),n=document.getElementById("stressPercentage"),l=document.getElementById("stressWords"),d=document.getElementById("sentiment"),h=document.getElementById("recommendation");a&&(a.textContent=`Tingkat Stress: ${e.category||"Tidak Diketahui"}`),n&&(n.textContent=`${t}% dari tingkat stress maksimal`),l&&(l.textContent=e.stress_words&&e.stress_words.length>0?e.stress_words.join(", "):"Tidak terdeteksi"),d&&(d.textContent=e.sentiment||"Netral"),h&&(h.textContent=e.recommendation||"Tidak ada rekomendasi khusus")}showLoading(e){const t=document.getElementById("loadingSection");t&&(t.style.display=e?"block":"none")}setAnalyzeButtonState(e){const t=document.getElementById("analyzeBtn");t&&(t.disabled=!e,t.textContent=e?"🔍 Analisis Tingkat Stress":"Sedang Menganalisis...")}hideResults(){const e=document.getElementById("resultSection");e&&(e.style.display="none")}resetForm(){this.selectedFile=null;const e=document.getElementById("previewSection"),t=document.getElementById("resultSection"),a=document.getElementById("loadingSection"),n=document.getElementById("fileInput"),l=document.getElementById("stressFill"),d=document.getElementById("analyzeBtn");e&&(e.style.display="none"),t&&(t.style.display="none"),a&&(a.style.display="none"),n&&(n.value=""),l&&(l.style.width="0%",l.className="stress-fill"),d&&(d.textContent="🔍 Analisis Tingkat Stress",d.disabled=!1);const h=document.getElementById("uploadSection");h&&setTimeout(()=>{h.scrollIntoView({behavior:"smooth",block:"center"})},100)}showAlert(e,t="info"){if(window.app&&window.app.showAlert)window.app.showAlert(e,t);else{const a=document.createElement("div");a.className=`alert alert-${t}`;const n={error:"#ef4444",warning:"#f59e0b",success:"#10b981",info:"#3b82f6"}[t]||"#3b82f6";a.innerHTML=`
                <div style="
                    position: fixed;
                    top: 24px;
                    right: 24px;
                    background: ${n};
                    color: white;
                    padding: 16px 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    z-index: 10000;
                    max-width: 320px;
                    font-size: 0.875rem;
                    font-weight: 500;
                    animation: slideInAlert 0.3s ease;
                ">
                    ${e}
                </div>
                <style>
                    @keyframes slideInAlert {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                </style>
            `,document.body.appendChild(a),setTimeout(()=>{a.parentNode&&(a.style.animation="slideInAlert 0.3s ease reverse",setTimeout(()=>{a.parentNode&&a.parentNode.removeChild(a)},300))},4e3)}}activate(){this.isActive=!0;const e=document.getElementById(this.pageId);e&&e.classList.add("active")}deactivate(){this.isActive=!1;const e=document.getElementById(this.pageId);e&&e.classList.remove("active"),this.eventListenersAdded=!1}async destroy(){this.tesseractWorker&&(await this.tesseractWorker.terminate(),this.tesseractWorker=null),this.selectedFile=null,this.eventListenersAdded=!1;const e=document.getElementById("uploadBtn"),t=document.getElementById("fileInput"),a=document.getElementById("analyzeBtn"),n=document.getElementById("resetBtn"),l=document.getElementById("uploadSection");e&&this.handleUploadClick&&e.removeEventListener("click",this.handleUploadClick),t&&this.handleFileChange&&t.removeEventListener("change",this.handleFileChange),a&&this.handleAnalyzeClick&&a.removeEventListener("click",this.handleAnalyzeClick),n&&this.handleResetClick&&n.removeEventListener("click",this.handleResetClick),l&&(this.handleDragOver&&l.removeEventListener("dragover",this.handleDragOver),this.handleDragLeave&&l.removeEventListener("dragleave",this.handleDragLeave),this.handleDrop&&l.removeEventListener("drop",this.handleDrop))}}class vt{constructor(){this.container=null}render(){return`
            <div class="content-container">
                <div class="page-header">
                    <h1>📖 Tutorial Penggunaan</h1>
                    <p class="page-subtitle">Pelajari cara menggunakan Stress Detector untuk menganalisis tingkat stress dari percakapan chat</p>
                </div>
                
                <div class="tutorial-content">
                    <div class="tutorial-steps">
                        <!-- Step 1: Screenshot -->
                        <div class="tutorial-step" data-step="0">
                            <div class="step-header">
                                <div class="step-number">1</div>
                                <div class="step-title">
                                    <h3>📱 Ambil Screenshot Chat</h3>
                                    <p class="step-subtitle">Persiapkan gambar percakapan yang akan dianalisis</p>
                                </div>
                            </div>
                            <div class="step-content">
                                <div class="step-visual">
                                    <div class="mock-phone">
                                        <div class="mock-chat">
                                            <div class="chat-bubble received">Hai, bagaimana kabarmu?</div>
                                            <div class="chat-bubble sent">Stress banget nih, deadline besok</div>
                                            <div class="chat-bubble received">Semangat ya! 💪</div>
                                            <div class="chat-bubble sent">Capek...</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="step-details">
                                    <p>Buat screenshot dari percakapan chat yang ingin dianalisis. Pastikan teks terlihat jelas dan tidak terpotong untuk hasil analisis yang optimal.</p>
                                    
                                    <div class="step-tips">
                                        <strong>📋 Tips untuk Screenshot Terbaik:</strong>
                                        <ul>
                                            <li><strong>Kualitas Gambar:</strong> Gunakan resolusi tinggi dan pastikan teks tidak blur</li>
                                            <li><strong>Pencahayaan:</strong> Hindari screenshot dalam kondisi gelap atau terlalu terang</li>
                                            <li><strong>Konten:</strong> Sertakan beberapa pesan untuk analisis yang lebih akurat</li>
                                            <li><strong>Platform:</strong> Mendukung WhatsApp, Telegram, LINE, Instagram, dan platform chat lainnya</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="step-warning">
                                        <strong>⚠️ Perhatian Privasi:</strong>
                                        Pastikan tidak ada informasi sensitif seperti nomor telepon, alamat, atau data pribadi lainnya dalam screenshot.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Step 2: Upload -->
                        <div class="tutorial-step" data-step="1">
                            <div class="step-header">
                                <div class="step-number">2</div>
                                <div class="step-title">
                                    <h3>📤 Upload Screenshot</h3>
                                    <p class="step-subtitle">Upload gambar ke sistem untuk diproses</p>
                                </div>
                            </div>
                            <div class="step-content">
                                <div class="step-visual">
                                    <div class="upload-demo">
                                        <div class="upload-area">
                                            <div class="upload-icon">📱</div>
                                            <div class="upload-text">Drag & Drop atau Klik untuk Upload</div>
                                        </div>
                                        <div class="file-preview">
                                            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgMTJMMTIgMTVMMjIgNSIgc3Ryb2tlPSIjNDhCQjc4IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMjEgMTJWMTlBMiAyIDAgMCAxIDE5IDIxSDVBMiAyIDAgMCAxIDMgMTlWNUEyIDIgMCAwIDEgNSAzSDEzIiBzdHJva2U9IiM0OEJCNzgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=" alt="Upload success">
                                            <div class="file-info">✅ chat-screenshot.png</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="step-details">
                                    <p>Navigasi ke halaman Detector dan upload screenshot yang sudah dibuat. Anda bisa menggunakan tombol "Pilih File" atau melakukan drag & drop langsung ke area upload.</p>
                                    
                                    <div class="step-tips">
                                        <strong>📋 Persyaratan File:</strong>
                                        <ul>
                                            <li><strong>Format:</strong> JPG, PNG, JPEG</li>
                                            <li><strong>Ukuran maksimal:</strong> 5MB</li>
                                            <li><strong>Resolusi minimal:</strong> 300x300 piksel</li>
                                            <li><strong>Orientasi:</strong> Portrait dan landscape keduanya didukung</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="step-action">
                                        <button class="demo-btn primary" onclick="navigateToPageSmooth('detector')">
                                            🚀 Coba Upload Sekarang
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Step 3: Analysis -->
                        <div class="tutorial-step" data-step="2">
                            <div class="step-header">
                                <div class="step-number">3</div>
                                <div class="step-title">
                                    <h3>🔍 Proses Analisis</h3>
                                    <p class="step-subtitle">Sistem akan menganalisis teks dari screenshot</p>
                                </div>
                            </div>
                            <div class="step-content">
                                <div class="step-visual">
                                    <div class="analysis-process">
                                        <div class="process-step">
                                            <div class="process-icon">🔍</div>
                                            <div class="process-text">Ekstraksi Teks</div>
                                        </div>
                                        <div class="process-arrow">→</div>
                                        <div class="process-step">
                                            <div class="process-icon">🧠</div>
                                            <div class="process-text">Analisis AI</div>
                                        </div>
                                        <div class="process-arrow">→</div>
                                        <div class="process-step">
                                            <div class="process-icon">📊</div>
                                            <div class="process-text">Hasil</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="step-details">
                                    <p>Setelah file berhasil diupload, klik tombol "Analisis Tingkat Stress" dan tunggu proses analisis selesai. Sistem akan memproses gambar dan mengekstrak teks percakapan.</p>
                                    
                                    <div class="step-tips">
                                        <strong>🔧 Proses yang Terjadi:</strong>
                                        <ul>
                                            <li><strong>OCR Processing:</strong> Ekstraksi teks dari gambar screenshot</li>
                                            <li><strong>Text Analysis:</strong> Identifikasi kata-kata indikator stress</li>
                                            <li><strong>Sentiment Analysis:</strong> Analisis emosi dalam percakapan</li>
                                            <li><strong>Stress Calculation:</strong> Perhitungan tingkat stress berdasarkan algoritma</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Step 4: Results -->
                        <div class="tutorial-step" data-step="3">
                            <div class="step-header">
                                <div class="step-number">4</div>
                                <div class="step-title">
                                    <h3>📊 Pahami Hasil Analisis</h3>
                                    <p class="step-subtitle">Interpretasi hasil tingkat stress yang terdeteksi</p>
                                </div>
                            </div>
                            <div class="step-content">
                                <div class="step-visual">
                                    <div class="result-demo">
                                        <div class="stress-meter-demo">
                                            <div class="meter-label">Tingkat Stress</div>
                                            <div class="meter-bar">
                                                <div class="meter-fill" style="width: 75%;"></div>
                                            </div>
                                            <div class="meter-value">75% - Tinggi</div>
                                        </div>
                                        <div class="analysis-demo">
                                            <div class="analysis-item">
                                                <strong>Kata Kunci:</strong> stress, deadline, capek, lelah
                                            </div>
                                            <div class="analysis-item">
                                                <strong>Sentimen:</strong> Negatif (68%)
                                            </div>
                                            <div class="analysis-item">
                                                <strong>Kategori:</strong> Stress Kerja
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="step-details">
                                    <p>Hasil analisis akan ditampilkan dalam bentuk dashboard yang mudah dipahami, lengkap dengan persentase stress dan rekomendasi.</p>
                                    
                                    <div class="step-tips">
                                        <strong>📋 Komponen Hasil Analisis:</strong>
                                        <ul>
                                            <li><strong>Persentase Stress:</strong> Skala 0-100% dengan kategori visual</li>
                                            <li><strong>Kata Indikator:</strong> Kata-kata yang menunjukkan tingkat stress</li>
                                            <li><strong>Analisis Sentimen:</strong> Persentase emosi positif/negatif</li>
                                            <li><strong>Rekomendasi:</strong> Saran praktis untuk mengatasi stress</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="step-interpretation">
                                        <strong>🎯 Skala Interpretasi Tingkat Stress:</strong>
                                        <div class="interpretation-grid">
                                            <div class="interpretation-item low">
                                                <div class="level-indicator">0-33%<br>Rendah</div>
                                            </div>
                                            <div class="interpretation-item medium">
                                                <div class="level-indicator">34-66%<br>Sedang</div>
                                            </div>
                                            <div class="interpretation-item high">
                                                <div class="level-indicator">67-100%<br>Tinggi</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Quick Tips Section -->
                    <div class="quick-tips-section">
                        <h2>💡 Tips Cepat</h2>
                        <div class="tips-grid">
                            <div class="tip-card">
                                <div class="tip-icon">📸</div>
                                <h3>Screenshot Berkualitas</h3>
                                <p>Pastikan teks jelas terbaca dan tidak ada bayangan atau pantulan pada screenshot</p>
                            </div>
                            <div class="tip-card">
                                <div class="tip-icon">🔒</div>
                                <h3>Privasi Terjaga</h3>
                                <p>Hapus atau tutup informasi pribadi sebelum mengambil screenshot untuk keamanan data</p>
                            </div>
                            <div class="tip-card">
                                <div class="tip-icon">📱</div>
                                <h3>Multi Platform</h3>
                                <p>Mendukung berbagai aplikasi chat seperti WhatsApp, Telegram, Line, dan lainnya</p>
                            </div>
                            <div class="tip-card">
                                <div class="tip-icon">⚡</div>
                                <h3>Hasil Cepat</h3>
                                <p>Proses analisis biasanya selesai dalam 10-30 detik tergantung ukuran gambar</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="tutorial-actions">
                        <h3>Siap Memulai Analisis?</h3>
                        <p>Ikuti langkah-langkah di atas dan mulai deteksi tingkat stress dari percakapan Anda</p>
                        <div class="action-buttons">
                            <button class="demo-btn primary" onclick="navigateToPageSmooth('detector')">
                                🎯 Mulai Analisis Sekarang
                            </button>
                            <button class="demo-btn secondary" onclick="navigateToPageSmooth('home')">
                                🏠 Kembali ke Beranda
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `}init(e){this.container=e,this.container.innerHTML=this.render(),this.addScrollAnimation(),window.scrollTo({top:0,behavior:"smooth"})}addScrollAnimation(){const e={threshold:.1,rootMargin:"0px 0px -50px 0px"},t=new IntersectionObserver(l=>{l.forEach(d=>{d.isIntersecting&&(d.target.style.opacity="1",d.target.style.transform="translateY(0)")})},e);this.container.querySelectorAll(".tutorial-step").forEach((l,d)=>{l.style.opacity="0",l.style.transform="translateY(30px)",l.style.transition=`opacity 0.6s ease ${d*.1}s, transform 0.6s ease ${d*.1}s`,t.observe(l)}),this.container.querySelectorAll(".tip-card").forEach((l,d)=>{l.style.opacity="0",l.style.transform="translateY(20px)",l.style.transition=`opacity 0.4s ease ${d*.1}s, transform 0.4s ease ${d*.1}s`,t.observe(l)})}}class ft{constructor(){this.container=null,this.animationObserver=null}render(){return`
            <div class="content-container">
                <h1>ℹ️ Tentang Stress Chat Detector</h1>
                <div class="about-content">
                    <div class="about-intro">
                        <p>Stress Chat Detector adalah aplikasi berbasis web yang menggunakan teknologi Artificial Intelligence untuk menganalisis tingkat stress dalam percakapan chat melalui screenshot. Aplikasi ini dirancang untuk membantu Anda memahami dinamika komunikasi digital dan meningkatkan kesehatan mental.</p>
                    </div>

                    <div class="about-features">
                        <h2>🚀 Fitur Utama</h2>
                        <div class="features-grid">
                            <div class="feature-card" data-aos="fade-up" data-aos-delay="100">
                                <div class="feature-icon">🔍</div>
                                <h3>Deteksi Otomatis</h3>
                                <p>Menganalisis teks dalam screenshot secara otomatis menggunakan teknologi OCR canggih dan AI untuk hasil yang akurat dan cepat</p>
                            </div>
                            <div class="feature-card" data-aos="fade-up" data-aos-delay="200">
                                <div class="feature-icon">📊</div>
                                <h3>Analisis Mendalam</h3>
                                <p>Memberikan analisis komprehensif terhadap tingkat stress, sentimen, dan pola komunikasi dengan visualisasi yang mudah dipahami</p>
                            </div>
                            <div class="feature-card" data-aos="fade-up" data-aos-delay="300">
                                <div class="feature-icon">💡</div>
                                <h3>Rekomendasi Cerdas</h3>
                                <p>Memberikan saran dan rekomendasi personal untuk mengatasi stress yang terdeteksi berdasarkan analisis kontekstual</p>
                            </div>
                            <div class="feature-card" data-aos="fade-up" data-aos-delay="400">
                                <div class="feature-icon">🔒</div>
                                <h3>Privasi Terjamin</h3>
                                <p>Data diproses secara lokal tanpa menyimpan informasi pribadi, memastikan keamanan dan privasi Anda sepenuhnya</p>
                            </div>
                        </div>
                    </div>

                    <div class="about-technology">
                        <h2>⚡ Teknologi yang Digunakan</h2>
                        <div class="tech-list">
                            <div class="tech-item" data-aos="slide-right" data-aos-delay="100">
                                <strong>🧠 Natural Language Processing (NLP)</strong>
                                <p>Teknologi canggih untuk menganalisis sentimen, emosi, dan konteks percakapan dengan tingkat akurasi tinggi dalam bahasa Indonesia dan Inggris</p>
                            </div>
                            <div class="tech-item" data-aos="slide-right" data-aos-delay="200">
                                <strong>🤖 Machine Learning</strong>
                                <p>Model yang dilatih dengan dataset besar untuk mendeteksi indikator stress, kecemasan, dan pola komunikasi negatif dalam teks</p>
                            </div>
                            <div class="tech-item" data-aos="slide-right" data-aos-delay="300">
                                <strong>👁️ Computer Vision</strong>
                                <p>Teknologi OCR (Optical Character Recognition) untuk mengekstrak teks dari screenshot dengan akurasi tinggi pada berbagai format</p>
                            </div>
                            <div class="tech-item" data-aos="slide-right" data-aos-delay="400">
                                <strong>⚙️ Tesseract.js</strong>
                                <p>Library OCR open-source terdepan untuk ekstraksi teks dari gambar secara real-time dengan dukungan multi-bahasa</p>
                            </div>
                        </div>
                    </div>

                    <div class="about-mission" data-aos="zoom-in">
                        <h2>🎯 Misi Kami</h2>
                        <p>Membantu individu dan komunitas untuk lebih aware terhadap tingkat stress dalam komunikasi digital, sehingga dapat meningkatkan kualitas hubungan interpersonal dan kesehatan mental di era digital. Kami percaya bahwa komunikasi yang sehat adalah kunci kebahagiaan.</p>
                    </div>

                    <div class="about-stats">
                        <h2>📈 Statistik & Performa</h2>
                        <div class="stats-grid">
                            <div class="stat-item" data-aos="flip-up" data-aos-delay="100">
                                <div class="stat-number" data-target="90">0</div>
                                <div class="stat-label">Tingkat Akurasi (%)</div>
                            </div>
                            <div class="stat-item" data-aos="flip-up" data-aos-delay="200">
                                <div class="stat-number" data-target="15">0</div>
                                <div class="stat-label">Platform Chat Didukung</div>
                            </div>
                            <div class="stat-item" data-aos="flip-up" data-aos-delay="300">
                                <div class="stat-number" data-target="5">0</div>
                                <div class="stat-label">Maksimal Ukuran (MB)</div>
                            </div>
                            <div class="stat-item" data-aos="flip-up" data-aos-delay="400">
                                <div class="stat-number">24/7</div>
                                <div class="stat-label">Tersedia Online</div>
                            </div>
                        </div>
                    </div>

                    <div class="about-team" data-aos="fade-up">
                        <h2>👥 Tim Pengembang</h2>
                        <p>Model Dikembangkan oleh tim Machine Learning, serta memiliki tampilan web yang modern. Kami berkomitmen untuk terus meningkatkan akurasi, menambah fitur inovatif, dan memastikan aplikasi ini dapat memberikan manfaat maksimal bagi pengguna dalam menjaga kesehatan mental di era digital.</p>
                    </div>
                </div>
            </div>
        `}mount(e){this.container=e,this.container.innerHTML=this.render(),this.addEventListeners(),this.initializeAnimations()}addEventListeners(){this.animateStats(),this.addFeatureCardEffects(),this.addScrollAnimations()}initializeAnimations(){this.container.querySelectorAll("[data-aos]").forEach((t,a)=>{t.style.opacity="0",t.style.transform="translateY(30px)",setTimeout(()=>{t.style.transition="all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",t.style.opacity="1",t.style.transform="translateY(0)"},a*100)})}addFeatureCardEffects(){this.container.querySelectorAll(".feature-card").forEach(t=>{t.addEventListener("mouseenter",()=>{const a=t.querySelector(".feature-icon");a.style.transform="scale(1.2) rotate(10deg)"}),t.addEventListener("mouseleave",()=>{const a=t.querySelector(".feature-icon");a.style.transform="scale(1) rotate(0deg)"})})}addScrollAnimations(){const e=new IntersectionObserver(a=>{a.forEach(n=>{n.isIntersecting&&n.target.classList.add("animate-in")})},{threshold:.1,rootMargin:"0px 0px -50px 0px"});this.container.querySelectorAll(".tech-item, .stat-item").forEach(a=>e.observe(a))}animateStats(){const e=this.container.querySelectorAll(".stat-number[data-target]"),t=new IntersectionObserver(a=>{a.forEach(n=>{n.isIntersecting&&(this.animateNumber(n.target),t.unobserve(n.target))})},{threshold:.5});e.forEach(a=>{t.observe(a)})}animateNumber(e){const t=parseInt(e.getAttribute("data-target")),a=2e3,n=t/(a/16);let l=0;const d=setInterval(()=>{l+=n,l>=t&&(l=t,clearInterval(d)),e.textContent=Math.floor(l)},16);setTimeout(()=>{e.style.transform="scale(1.1)",setTimeout(()=>{e.style.transform="scale(1)"},200)},a)}destroy(){this.animationObserver&&this.animationObserver.disconnect(),this.container&&(this.container.innerHTML="")}getMetadata(){return{title:"Tentang - Stress Chat Detector",description:"Pelajari lebih lanjut tentang teknologi AI yang digunakan dalam Stress Chat Detector untuk analisis stress dalam komunikasi digital",keywords:"about, AI, machine learning, stress detection, mental health, NLP, computer vision",author:"Stress Chat Detector Team",robots:"index, follow"}}loadStylesheet(){const e=document.createElement("link");e.rel="stylesheet",e.href="./styles/about-styles.css",e.onload=()=>{console.log("About page styles loaded successfully")},document.head.appendChild(e)}preloadAssets(){[].forEach(t=>{const a=document.createElement("link");a.rel="preload",a.href=t,a.as="image",document.head.appendChild(a)})}}class kt{constructor(){this.container=null,this.form=null}render(){return`
            <div class="content-container">
                <div class="page-header">
                    <h1>📞 Hubungi Kami</h1>
                    <p class="page-subtitle">Kami siap membantu Anda dengan pertanyaan, masukan, atau dukungan teknis terkait Stress Chat Detector</p>
                </div>
                
                <div class="contact-content">
                    <!-- Contact Information -->
                    <div class="contact-info">
                        <div class="contact-item">
                            <div class="contact-icon">📧</div>
                            <div class="contact-details">
                                <h3>Email Support</h3>
                                <p>support@stresschatdetector.com</p>
                                <p class="contact-note">Respon dalam 24 jam</p>
                                <a href="mailto:support@stresschatdetector.com" class="contact-link">
                                    📤 Kirim Email
                                </a>
                            </div>
                        </div>
                        
                        <div class="contact-item">
                            <div class="contact-icon">🌐</div>
                            <div class="contact-details">
                                <h3>Website Resmi</h3>
                                <p>www.stresschatdetector.com</p>
                                <p class="contact-note">Dokumentasi & Update</p>
                                <a href="#" class="contact-link">
                                    🔗 Kunjungi Website
                                </a>
                            </div>
                        </div>
                        
                        <div class="contact-item">
                            <div class="contact-icon">📱</div>
                            <div class="contact-details">
                                <h3>Media Sosial</h3>
                                <p>Ikuti update dan tips terbaru</p>
                                <div class="social-links">
                                    <a href="#" class="social-btn">📘 Facebook</a>
                                    <a href="#" class="social-btn">📷 Instagram</a>
                                    <a href="#" class="social-btn">💼 LinkedIn</a>
                                </div>
                            </div>
                        </div>
                        
                        <div class="contact-item">
                            <div class="contact-icon">🕒</div>
                            <div class="contact-details">
                                <h3>Jam Layanan</h3>
                                <p><strong>Email Support:</strong> 24/7</p>
                                <p><strong>Live Chat:</strong> 09:00 - 21:00 WIB</p>
                                <p class="contact-note">Senin - Minggu</p>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Form -->
                    <form class="contact-form" id="contactForm">
                        <h2>💬 Kirim Pesan</h2>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="name">Nama Lengkap *</label>
                                <input type="text" id="name" name="name" required placeholder="Masukkan nama lengkap Anda">
                                <span class="form-error" id="nameError"></span>
                            </div>
                            <div class="form-group">
                                <label for="email">Alamat Email *</label>
                                <input type="email" id="email" name="email" required placeholder="nama@email.com">
                                <span class="form-error" id="emailError"></span>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="subject">Kategori Pesan *</label>
                            <select id="subject" name="subject" required>
                                <option value="">-- Pilih Kategori --</option>
                                <option value="bug">🐛 Laporan Bug / Error</option>
                                <option value="feature">💡 Saran Fitur Baru</option>
                                <option value="support">🛠️ Bantuan Teknis</option>
                                <option value="feedback">💬 Feedback & Review</option>
                                <option value="partnership">🤝 Kerjasama Bisnis</option>
                                <option value="general">📋 Pertanyaan Umum</option>
                            </select>
                            <span class="form-error" id="subjectError"></span>
                        </div>
                        
                        <div class="form-group">
                            <label for="message">Pesan Anda *</label>
                            <textarea 
                                id="message" 
                                name="message" 
                                rows="6" 
                                required 
                                placeholder="Tuliskan pesan Anda dengan detail di sini. Semakin spesifik informasi yang Anda berikan, semakin baik kami dapat membantu Anda."
                                maxlength="500"
                            ></textarea>
                            <span class="form-error" id="messageError"></span>
                            <div class="char-counter">
                                <span id="charCount">0</span>/500 karakter
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="privacy" name="privacy" required>
                                <span class="checkmark"></span>
                                Saya menyetujui <a href="#" class="privacy-link">Kebijakan Privasi</a> dan <a href="#" class="privacy-link">Syarat Layanan</a> *
                            </label>
                            <span class="form-error" id="privacyError"></span>
                        </div>
                        
                        <button type="submit" class="submit-btn" id="submitBtn">
                            <span class="btn-text">📤 Kirim Pesan</span>
                            <span class="btn-loading">⏳ Mengirim...</span>
                        </button>
                    </form>
                </div>

                <!-- FAQ Section -->
                <div class="contact-faq">
                    <h2>❓ Pertanyaan yang Sering Diajukan</h2>
                    <div class="faq-grid">
                        <div class="faq-card">
                            <h4>🐛 Bagaimana cara melaporkan bug atau error?</h4>
                            <p>Pilih kategori "Laporan Bug / Error" dan berikan detail lengkap tentang masalah yang Anda alami, termasuk screenshot dan langkah-langkah untuk mereproduksi masalah tersebut.</p>
                        </div>
                        
                        <div class="faq-card">
                            <h4>💡 Bisakah saya mengusulkan fitur baru?</h4>
                            <p>Tentu saja! Kami sangat menghargai masukan dari pengguna. Pilih kategori "Saran Fitur Baru" dan jelaskan secara detail fitur yang Anda inginkan beserta alasan mengapa fitur tersebut berguna.</p>
                        </div>
                        
                        <div class="faq-card">
                            <h4>⏰ Berapa lama waktu respon dari tim support?</h4>
                            <p>Kami berusaha merespon email dalam waktu maksimal 24 jam. Untuk masalah urgent yang memerlukan respon cepat, mohon cantumkan kata "URGENT" di subjek pesan Anda.</p>
                        </div>
                        
                        <div class="faq-card">
                            <h4>🔒 Apakah data saya aman saat menghubungi support?</h4>
                            <p>Ya, semua komunikasi dengan tim support kami dilindungi dengan enkripsi dan kebijakan privasi yang ketat. Kami tidak akan membagikan informasi pribadi Anda kepada pihak ketiga.</p>
                        </div>
                        
                        <div class="faq-card">
                            <h4>📱 Apakah ada dukungan untuk platform mobile?</h4>
                            <p>Saat ini aplikasi web kami sudah responsive dan dapat diakses melalui browser mobile. Aplikasi mobile native sedang dalam tahap pengembangan dan akan segera diluncurkan.</p>
                        </div>
                        
                        <div class="faq-card">
                            <h4>🆓 Apakah layanan ini gratis atau berbayar?</h4>
                            <p>Stress Chat Detector menyediakan versi gratis dengan fitur dasar. Untuk fitur advanced dan kapasitas analisis yang lebih besar, tersedia paket premium dengan harga terjangkau.</p>
                        </div>
                    </div>
                </div>
            </div>
        `}init(e){this.container=e,this.container.innerHTML=this.render(),this.form=this.container.querySelector("#contactForm"),this.addEventListeners(),this.addScrollAnimation(),window.scrollTo({top:0,behavior:"smooth"})}addEventListeners(){if(this.form){this.form.addEventListener("submit",this.handleSubmit.bind(this)),this.form.querySelectorAll("input, select, textarea").forEach(n=>{n.addEventListener("blur",()=>this.validateField(n)),n.addEventListener("input",()=>{this.clearError(n),n.type==="email"&&n.value&&this.validateField(n)})});const t=this.form.querySelector("#message"),a=this.form.querySelector("#charCount");t&&a&&t.addEventListener("input",n=>{const l=n.target.value.length;a.textContent=l;const d=a.parentElement;l>450?d.classList.add("char-limit-exceeded"):d.classList.remove("char-limit-exceeded")})}}addScrollAnimation(){const e={threshold:.1,rootMargin:"0px 0px -30px 0px"},t=new IntersectionObserver(d=>{d.forEach(h=>{h.isIntersecting&&(h.target.style.opacity="1",h.target.style.transform="translateY(0)")})},e);this.container.querySelectorAll(".contact-item").forEach((d,h)=>{d.style.opacity="0",d.style.transform="translateY(20px)",d.style.transition=`opacity 0.5s ease ${h*.1}s, transform 0.5s ease ${h*.1}s`,t.observe(d)}),this.container.querySelectorAll(".faq-card").forEach((d,h)=>{d.style.opacity="0",d.style.transform="translateY(20px)",d.style.transition=`opacity 0.4s ease ${h*.1}s, transform 0.4s ease ${h*.1}s`,t.observe(d)});const l=this.container.querySelector(".contact-form");l&&(l.style.opacity="0",l.style.transform="translateX(20px)",l.style.transition="opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",t.observe(l))}validateField(e){const t=this.container.querySelector(`#${e.name}Error`);let a=!0,n="";if(e.required&&!e.value.trim())a=!1,n="Field ini wajib diisi";else if(e.value.trim())switch(e.type){case"email":/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.value)||(a=!1,n="Format email tidak valid");break;case"text":e.value.trim().length<2?(a=!1,n="Minimal 2 karakter"):e.value.trim().length>50&&(a=!1,n="Maksimal 50 karakter");break}return e.tagName==="TEXTAREA"&&(e.required&&e.value.trim().length<10?(a=!1,n="Pesan minimal 10 karakter"):e.value.length>500&&(a=!1,n="Pesan maksimal 500 karakter")),e.type==="checkbox"&&e.required&&!e.checked&&(a=!1,n="Anda harus menyetujui kebijakan privasi"),e.tagName==="SELECT"&&e.required&&!e.value&&(a=!1,n="Silakan pilih salah satu kategori"),t&&(t.textContent=n,e.classList.toggle("error",!a)),a}clearError(e){const t=this.container.querySelector(`#${e.name}Error`);t&&(t.textContent="",e.classList.remove("error"))}validateForm(){const e=this.form.querySelectorAll("input[required], select[required], textarea[required]");let t=!0;return e.forEach(a=>{this.validateField(a)||(t=!1)}),t}async handleSubmit(e){if(e.preventDefault(),!this.validateForm()){this.showAlert("Mohon perbaiki kesalahan pada form","error");return}const t=new FormData(this.form),a=this.form.querySelector("#submitBtn");a.classList.add("loading"),a.disabled=!0;try{await this.simulateFormSubmission(t),this.showAlert("Pesan berhasil dikirim! Kami akan segera menghubungi Anda.","success"),this.form.reset(),this.container.querySelector("#charCount").textContent="0"}catch(n){console.error("Form submission error:",n),this.showAlert("Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.","error")}finally{a.classList.remove("loading"),a.disabled=!1}}async simulateFormSubmission(e){return new Promise(t=>{setTimeout(()=>{console.log("Form data:",Object.fromEntries(e)),t()},2e3)})}showAlert(e,t="info"){const a=document.createElement("div");a.className=`alert alert-${t}`,a.innerHTML=`
            <div class="alert-content">
                <span class="alert-icon">${t==="success"?"✅":t==="error"?"❌":"ℹ️"}</span>
                <span class="alert-message">${e}</span>
                <button class="alert-close" onclick="this.parentElement.parentElement.remove()">✕</button>
            </div>
        `,this.container.insertBefore(a,this.container.firstChild),setTimeout(()=>{a.parentNode&&a.remove()},5e3)}destroy(){this.container&&(this.container.innerHTML="")}getMetadata(){return{title:"Kontak - Stress Chat Detector",description:"Hubungi tim support Stress Chat Detector untuk bantuan, feedback, atau pertanyaan",keywords:"contact, support, feedback, help, stress chat detector"}}}class yt{constructor(){this.views={home:new pe,detector:new gt,tutorial:new vt,about:new ft,contact:new kt},this.currentView=null,this.container=null}async renderPage(e){try{if(console.log(`Rendering page: ${e}`),this.container=document.getElementById("main-content")||document.querySelector(".main-content")||document.querySelector("main"),!this.container){console.error("Main content container not found");return}this.currentView&&typeof this.currentView.deactivate=="function"&&this.currentView.deactivate();const t=this.views[e];if(!t){console.error(`View not found for page: ${e}`);return}this.container.innerHTML="",typeof t.mount=="function"?t.mount(this.container):typeof t.init=="function"?t.init(this.container):typeof t.render=="function"&&(this.container.innerHTML=t.render(),typeof t.bindEvents=="function"&&t.bindEvents(),typeof t.initializeDragAndDrop=="function"&&t.initializeDragAndDrop()),typeof t.activate=="function"&&t.activate(),this.currentView=t,document.dispatchEvent(new CustomEvent("pageRendered",{detail:{page:e,view:t}})),console.log(`Page rendered successfully: ${e}`)}catch(t){console.error(`Error rendering page ${e}:`,t),this.renderErrorPage(t)}}renderErrorPage(e){this.container&&(this.container.innerHTML=`
                <div class="error-page">
                    <div class="error-content">
                        <h1>🚨 Oops! Terjadi Kesalahan</h1>
                        <p>Maaf, halaman tidak dapat dimuat dengan benar.</p>
                        <p class="error-details">${e.message}</p>
                        <button onclick="window.location.reload()" class="btn btn-primary">
                            🔄 Muat Ulang Halaman
                        </button>
                    </div>
                </div>
            `)}getCurrentView(){return this.currentView}destroyCurrentView(){this.currentView&&typeof this.currentView.destroy=="function"&&this.currentView.destroy(),this.currentView=null}}class bt{constructor(){this.currentPage="home",this.viewRenderer=new yt,this.navMenu=null,this.hamburger=null,this.isNavigating=!1,this.isMobileMenuOpen=!1}init(){console.log("NavigationController initialized"),this.setupEventListeners(),this.setupResponsiveHandling(),this.initializeHomePage()}async initializeHomePage(){try{console.log("Initializing home page..."),await this.viewRenderer.renderPage("home"),this.updateNavigation("home")}catch(e){console.error("Error initializing home page:",e)}}setupEventListeners(){document.addEventListener("click",e=>{if(e.target.classList.contains("nav-link")||e.target.classList.contains("footer-link")){e.preventDefault();const t=e.target.getAttribute("data-page");t&&this.navigateToPage(t)}}),window.navigateToPage=e=>{this.navigateToPage(e)},window.addEventListener("navigate",e=>{e.detail&&e.detail.page&&this.navigateToPage(e.detail.page)}),document.addEventListener("DOMContentLoaded",()=>{this.initHamburgerMenu()}),document.readyState!=="loading"&&setTimeout(()=>this.initHamburgerMenu(),100),document.addEventListener("pageRendered",e=>{console.log(`Page rendered successfully: ${e.detail.page}`),this.onPageRendered(e.detail.page,e.detail.view),setTimeout(()=>this.initHamburgerMenu(),100)})}initHamburgerMenu(){console.log("Initializing hamburger menu..."),this.hamburger=document.getElementById("hamburger"),this.navMenu=document.getElementById("navMenu"),console.log("Hamburger element:",this.hamburger),console.log("NavMenu element:",this.navMenu),this.hamburger&&this.navMenu?(this.hamburger.removeEventListener("click",this.handleHamburgerClick),this.hamburger.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),console.log("Hamburger clicked!"),this.toggleMobileMenu()}),this.setupMobileMenuStyles(),console.log("Hamburger menu initialized successfully")):console.error("Hamburger or NavMenu not found!")}setupMobileMenuStyles(){this.navMenu&&window.innerWidth<=968&&(this.navMenu.style.position="fixed",this.navMenu.style.top="0",this.navMenu.style.left="-100%",this.navMenu.style.width="80%",this.navMenu.style.height="100vh",this.navMenu.style.backgroundColor="#fff",this.navMenu.style.flexDirection="column",this.navMenu.style.padding="70px 20px 20px",this.navMenu.style.boxShadow="2px 0 10px rgba(0,0,0,0.1)",this.navMenu.style.zIndex="1000",this.navMenu.style.transition="left 0.3s ease",this.navMenu.style.display="flex",console.log("Mobile menu styles applied"))}setupResponsiveHandling(){window.addEventListener("resize",()=>{window.innerWidth>968?(this.navMenu&&(this.navMenu.style.position="",this.navMenu.style.top="",this.navMenu.style.left="",this.navMenu.style.width="",this.navMenu.style.height="",this.navMenu.style.backgroundColor="",this.navMenu.style.flexDirection="",this.navMenu.style.padding="",this.navMenu.style.boxShadow="",this.navMenu.style.zIndex="",this.navMenu.style.transition="",this.navMenu.style.display="",this.navMenu.classList.remove("active")),this.hamburger&&this.hamburger.classList.remove("active"),this.isMobileMenuOpen=!1):this.setupMobileMenuStyles()})}async navigateToPage(e){if(!(e===this.currentPage||this.isNavigating)){console.log(`Navigating to: ${e}`),this.isNavigating=!0;try{this.showLoadingIndicator(),this.closeMobileMenu(),await new Promise(t=>setTimeout(t,150)),await this.viewRenderer.renderPage(e),this.currentPage=e,this.updateNavigation(e),setTimeout(()=>{window.scrollTo({top:0,behavior:"smooth"})},100),console.log(`Successfully navigated to: ${e}`)}catch(t){console.error("Navigation error:",t),this.showNavigationError(t)}finally{this.isNavigating=!1,this.hideLoadingIndicator()}}}onPageRendered(e,t){console.log(`Setting up page-specific functionality for: ${e}`),e==="detector"&&window.app&&window.app.detectorController}updateNavigation(e){document.querySelectorAll(".nav-link").forEach(n=>{n.getAttribute("data-page")===e?n.classList.add("active"):n.classList.remove("active")}),document.querySelectorAll(".footer-link").forEach(n=>{n.getAttribute("data-page")===e?n.classList.add("active"):n.classList.remove("active")}),this.updatePageTitle(e)}updatePageTitle(e){const t={home:"Beranda - Stress Chat Detector",detector:"Detector - Stress Chat Detector",tutorial:"Tutorial - Stress Chat Detector",about:"Tentang - Stress Chat Detector",contact:"Kontak - Stress Chat Detector"};document.title=t[e]||"Stress Chat Detector"}showLoadingIndicator(){const e=document.getElementById("mainContent");e&&(e.style.transition="opacity 0.3s ease-out, transform 0.3s ease-out",e.style.opacity="0.3",e.style.transform="translateY(10px)")}hideLoadingIndicator(){const e=document.getElementById("mainContent");e&&setTimeout(()=>{e.style.opacity="1",e.style.transform="translateY(0)",setTimeout(()=>{e.style.transition=""},300)},50)}showNavigationError(e){window.app&&window.app.appController&&window.app.appController.showAlert?window.app.appController.showAlert("Terjadi kesalahan saat memuat halaman. Silakan coba lagi.","error"):(console.error("Navigation error:",e),alert("Terjadi kesalahan saat memuat halaman. Silakan coba lagi."))}toggleMobileMenu(){if(console.log("toggleMobileMenu called"),console.log("Current menu state:",this.isMobileMenuOpen),!this.navMenu){console.error("navMenu not found!");return}this.isMobileMenuOpen?(console.log("Closing mobile menu"),this.navMenu.style.left="-100%",this.navMenu.classList.remove("active"),this.hamburger&&this.hamburger.classList.remove("active"),this.isMobileMenuOpen=!1):(console.log("Opening mobile menu"),this.navMenu.style.left="0",this.navMenu.classList.add("active"),this.hamburger&&this.hamburger.classList.add("active"),this.isMobileMenuOpen=!0),console.log("Menu state after toggle:",this.isMobileMenuOpen),console.log("Menu left position:",this.navMenu.style.left)}closeMobileMenu(){this.navMenu&&(this.navMenu.style.left="-100%",this.navMenu.classList.remove("active")),this.hamburger&&this.hamburger.classList.remove("active"),this.isMobileMenuOpen=!1}getCurrentPage(){return this.currentPage}getCurrentView(){return this.viewRenderer.getCurrentView()}async refreshCurrentPage(){await this.navigateToPage(this.currentPage)}}class wt{constructor(){this.API_URL="https://web-production-8699.up.railway.app/predict",this.tesseractWorker=null,this.ocrConfig={lang:"ind",whitelist:`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?:;()[]{}"'-/@#$%^&*+=<>|\\~ `,psm:Z.PSM.AUTO,logger:e=>console.debug("Tesseract:",e)}}async analyzeStress(e){const t=performance.now();try{if(!e||!(e instanceof File))throw new Error("Invalid file input");const a=await this.extractTextFromImage(e),n=this.cleanExtractedText(a);if(n.split(" ").length<3)throw new Error("Teks terlalu pendek untuk analisis");const l=await this.sendToStressAPI(n),d=this.formatResult(l,n);return console.log(`Analysis completed in ${((performance.now()-t)/1e3).toFixed(2)}s`),d}catch(a){throw console.error("Analysis pipeline error:",a),this.handleAnalysisError(a)}}async extractTextFromImage(e){try{this.tesseractWorker||(this.tesseractWorker=Z.createWorker({logger:this.ocrConfig.logger}),await this.tesseractWorker.load(),await this.tesseractWorker.loadLanguage(this.ocrConfig.lang),await this.tesseractWorker.initialize(this.ocrConfig.lang),await this.tesseractWorker.setParameters({tessedit_char_whitelist:this.ocrConfig.whitelist,tessedit_pageseg_mode:this.ocrConfig.psm}));const{data:{text:t}}=await this.tesseractWorker.recognize(e);return t}catch(t){throw console.error("OCR Error:",t),new Error(`Gagal membaca teks dari gambar. Pastikan: 
1. Gambar jelas
2. Teks terbaca
3. Format didukung`)}}cleanExtractedText(e){return e?e.replace(/\s+/g," ").replace(/[|_\-~]+/g," ").replace(/([.,!?:;])\1+/g,"$1").split(`
`).filter(t=>{const a=t.trim();return a.length>2&&!/^[\W\d_]+$/.test(a)}).join(" ").trim():""}async sendToStressAPI(e){try{const a=await fetch("https://web-production-8699.up.railway.app/predict",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:e.substring(0,1e3)})});if(!a.ok){const n=await a.json().catch(()=>({}));throw new Error(n.message||"Error dari server analisis")}return await a.json()}catch(t){throw console.error("API Communication Error:",t),new Error("Gagal menghubungi server analisis. Coba beberapa saat lagi.")}}formatResult(e,t){const a=Math.min(100,Math.max(0,e.stress_percent||0)),n=e.prediction==="Negative";return{stress_level:a,category:this.getStressCategory(a),prediction:e.prediction,stress_words:this.extractStressKeywords(t),sentiment:n?"Negatif":"Positif/Netral",recommendation:this.generateRecommendation(a),confidence:this.calculateConfidence(a),analysis_details:{key_phrases:this.extractKeyPhrases(t),word_count:t.split(/\s+/).length,readability:this.assessReadability(t)}}}getStressCategory(e){const t=[{threshold:80,label:"Sangat Tinggi",emoji:"🔥"},{threshold:60,label:"Tinggi",emoji:"⚠️"},{threshold:40,label:"Sedang",emoji:"😐"},{threshold:20,label:"Rendah",emoji:"😊"},{threshold:0,label:"Minimal",emoji:"😌"}];return t.find(a=>e>=a.threshold)||t[t.length-1]}extractStressKeywords(e){const t=["stress","stres","tertekan","frustasi","panik","cemas","khawatir","gelisah","sedih","kecewa","capek","lelah","penat","pusing","sakit kepala","deadline","tumpuk","numpuk","beban kerja","target","gabut","bete","drama","risih","jengkel"];return[...new Set(e.toLowerCase().split(/\s+/).filter(a=>t.some(n=>a.includes(n))))].slice(0,5)}generateRecommendation(e){const t={high:["Pertimbangkan konsultasi dengan profesional kesehatan mental","Lakukan teknik grounding: fokus pada pernapasan dan lingkungan sekitar","Batasi paparan terhadap sumber stres jika memungkinkan"],medium:["Lakukan aktivitas fisik ringan seperti jalan kaki","Prakirakan teknik manajemen waktu seperti Pomodoro","Diskusikan perasaan dengan orang terpercaya"],low:["Pertahankan rutinitas yang sehat dan seimbang","Lakukan hobi atau aktivitas menyenangkan","Latih mindfulness atau meditasi singkat"]},a=e>=60?"high":e>=30?"medium":"low";return t[a][Math.floor(Math.random()*t[a].length)]}handleAPIError(e,t){const a={400:"Teks tidak valid untuk analisis",413:"Teks terlalu panjang",429:"Terlalu banyak permintaan. Coba lagi nanti",500:"Kesalahan server internal",503:"Layanan tidak tersedia sementara"};return new Error(t.message||a[e]||`Kesalahan server (${e})`)}handleAnalysisError(e){const t={NetworkError:"Koneksi internet bermasalah",SyntaxError:"Respons server tidak valid",TypeError:"Operasi tidak didukung"};return new Error(t[e.name]||e.message||"Terjadi kesalahan selama analisis")}async cleanup(){this.tesseractWorker&&(await this.tesseractWorker.terminate(),this.tesseractWorker=null)}}class St{constructor(){this.config={MAX_FILE_SIZE:5*1024*1024,ALLOWED_TYPES:["image/jpeg","image/jpg","image/png"]}}validateFile(e){return this.config.ALLOWED_TYPES.includes(e.type)?e.size>this.config.MAX_FILE_SIZE?{isValid:!1,message:"Ukuran file terlalu besar. Maksimal 5MB"}:{isValid:!0}:{isValid:!1,message:"Mohon pilih file gambar (JPG, PNG, JPEG)"}}}class Et{constructor(){this.selectedFile=null,this.stressModel=new wt,this.fileUploadModel=new St,this.isAnalyzing=!1,this.isInitialized=!1,this.uploadSection=null,this.fileInput=null,this.previewSection=null,this.previewImage=null,this.fileInfo=null,this.analyzeBtn=null,this.loadingSection=null,this.resultSection=null,this.resetBtn=null,this.boundHandlers={}}init(){console.log("DetectorController initialized"),this.setupEventListeners()}setupEventListeners(){this.pageRenderedListener&&document.removeEventListener("pageRendered",this.pageRenderedListener),this.pageRenderedListener=e=>{e.detail.page==="detector"&&(console.log("Detector page rendered, initializing elements..."),setTimeout(()=>{this.initializeDetectorElements()},100))},document.addEventListener("pageRendered",this.pageRenderedListener)}initializeDetectorElements(){if(this.isInitialized){console.log("Detector already initialized, skipping...");return}if(console.log("Initializing detector elements..."),this.uploadSection=document.getElementById("uploadSection"),this.fileInput=document.getElementById("fileInput"),this.previewSection=document.getElementById("previewSection"),this.previewImage=document.getElementById("previewImage"),this.fileInfo=document.getElementById("fileInfo"),this.analyzeBtn=document.getElementById("analyzeBtn"),this.loadingSection=document.getElementById("loadingSection"),this.resultSection=document.getElementById("resultSection"),this.resetBtn=document.getElementById("resetBtn"),!this.uploadSection||!this.fileInput){console.error("Required detector elements not found");return}this.cleanupEventListeners()}isViewPatternActive(){return window.app&&window.app.currentView&&(window.app.currentView.constructor.name==="DetectorView"||window.app.currentView.pageId==="detector")}cleanupEventListeners(){Object.values(this.boundHandlers).forEach(e=>{e.element&&e.event&&e.callback&&e.element.removeEventListener(e.event,e.callback)}),this.boundHandlers={}}setupDragAndDrop(){if(!this.uploadSection)return;const e=n=>this.handleDragOver(n),t=()=>this.handleDragLeave(),a=n=>this.handleDrop(n);this.uploadSection.addEventListener("dragover",e),this.uploadSection.addEventListener("dragleave",t),this.uploadSection.addEventListener("drop",a),this.boundHandlers.dragover={element:this.uploadSection,event:"dragover",callback:e},this.boundHandlers.dragleave={element:this.uploadSection,event:"dragleave",callback:t},this.boundHandlers.drop={element:this.uploadSection,event:"drop",callback:a}}setupFileInput(){if(!this.fileInput)return;const e=t=>{console.log("File input change event triggered"),t.target.files.length>0&&this.handleFileSelect(t.target.files[0])};this.fileInput.addEventListener("change",e),this.boundHandlers.filechange={element:this.fileInput,event:"change",callback:e}}setupUploadButton(){const e=document.querySelector(".upload-btn")||document.getElementById("uploadBtn");if(!e)return;const t=()=>{console.log("Upload button clicked"),this.fileInput&&this.fileInput.click()};e.addEventListener("click",t),this.boundHandlers.uploadclick={element:e,event:"click",callback:t}}setupAnalyzeButton(){if(!this.analyzeBtn)return;const e=()=>this.analyzeStress();this.analyzeBtn.addEventListener("click",e),this.boundHandlers.analyzeclick={element:this.analyzeBtn,event:"click",callback:e}}setupResetButton(){if(!this.resetBtn)return;const e=()=>this.resetForm();this.resetBtn.addEventListener("click",e),this.boundHandlers.resetclick={element:this.resetBtn,event:"click",callback:e}}handleDragOver(e){e.preventDefault(),this.uploadSection&&this.uploadSection.classList.add("dragover")}handleDragLeave(){this.uploadSection&&this.uploadSection.classList.remove("dragover")}handleDrop(e){e.preventDefault(),this.uploadSection&&this.uploadSection.classList.remove("dragover");const t=e.dataTransfer.files;t.length>0&&this.handleFileSelect(t[0])}handleFileSelect(e){console.log("DetectorController: File selected:",e.name);const t=this.fileUploadModel.validateFile(e);if(!t.isValid){this.showAlert(t.message,"error");return}this.selectedFile=e,this.displayFilePreview(e)}displayFilePreview(e){if(!this.previewSection||!this.previewImage||!this.fileInfo)return;const t=new FileReader;t.onload=a=>{this.previewImage.src=a.target.result,this.previewSection.style.display="block",this.fileInfo.innerHTML=`
                <strong>📄 ${e.name}</strong><br>
                Ukuran: ${this.formatFileSize(e.size)}<br>
                Type: ${e.type}
            `},t.onerror=()=>{this.showAlert("Gagal membaca file. Silakan coba lagi.","error")},t.readAsDataURL(e)}async analyzeStress(){if(!this.selectedFile){this.showAlert("Silakan pilih file terlebih dahulu","warning");return}if(!this.isAnalyzing)try{this.isAnalyzing=!0,this.showLoading(!0),this.setAnalyzeButtonState(!1),this.hideResults();const e=await this.stressModel.analyzeStress(this.selectedFile);this.displayResults(e)}catch(e){console.error("Analysis error:",e);const t=this.handleAPIError(e);this.showAlert(t,"error")}finally{this.isAnalyzing=!1,this.showLoading(!1),this.setAnalyzeButtonState(!0)}}displayResults(e){if(!this.resultSection)return;const t=e.stress_level||0;this.updateStressMeter(t),this.updateResultText(e,t),this.resultSection.style.display="block",this.resultSection.scrollIntoView({behavior:"smooth"})}updateStressMeter(e){const t=document.getElementById("stressFill");t&&(setTimeout(()=>{t.style.width=e+"%"},100),t.className="stress-fill",e<30?t.classList.add("stress-low"):e<70?t.classList.add("stress-medium"):t.classList.add("stress-high"))}updateResultText(e,t){const a={category:document.getElementById("stressCategory"),percentage:document.getElementById("stressPercentage"),words:document.getElementById("stressWords"),sentiment:document.getElementById("sentiment"),recommendation:document.getElementById("recommendation")};a.category&&(a.category.textContent=`Tingkat Stress: ${e.category||"Tidak Diketahui"}`),a.percentage&&(a.percentage.textContent=`${t}% dari tingkat stress maksimal`),a.words&&(a.words.textContent=e.stress_words?e.stress_words.join(", "):"Tidak terdeteksi"),a.sentiment&&(a.sentiment.textContent=e.sentiment||"Netral"),a.recommendation&&(a.recommendation.textContent=e.recommendation||"Tidak ada rekomendasi khusus")}showLoading(e){this.loadingSection&&(this.loadingSection.style.display=e?"block":"none")}setAnalyzeButtonState(e){this.analyzeBtn&&(this.analyzeBtn.disabled=!e)}hideResults(){this.resultSection&&(this.resultSection.style.display="none")}resetForm(){this.selectedFile=null,this.previewSection&&(this.previewSection.style.display="none"),this.resultSection&&(this.resultSection.style.display="none"),this.loadingSection&&(this.loadingSection.style.display="none"),this.fileInput&&(this.fileInput.value="");const e=document.getElementById("stressFill");e&&(e.style.width="0%",e.className="stress-fill")}cleanup(){console.log("Cleaning up DetectorController..."),this.cleanupEventListeners(),this.pageRenderedListener&&(document.removeEventListener("pageRendered",this.pageRenderedListener),this.pageRenderedListener=null),this.isInitialized=!1,this.selectedFile=null,this.isAnalyzing=!1,this.uploadSection=null,this.fileInput=null,this.previewSection=null,this.previewImage=null,this.fileInfo=null,this.analyzeBtn=null,this.loadingSection=null,this.resultSection=null,this.resetBtn=null}formatFileSize(e){if(e===0)return"0 Bytes";const t=1024,a=["Bytes","KB","MB","GB"],n=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,n)).toFixed(2))+" "+a[n]}handleAPIError(e){return e.name==="NetworkError"?"Tidak dapat terhubung ke server. Periksa koneksi internet Anda.":e.status===413?"File terlalu besar. Maksimal ukuran file adalah 5MB.":e.status===415?"Format file tidak didukung. Gunakan JPG, PNG, atau JPEG.":"Terjadi kesalahan saat menganalisis. Silakan coba lagi."}showAlert(e,t="info"){window.app&&window.app.appController&&window.app.appController.showAlert?window.app.appController.showAlert(e,t):(console.log(`Alert [${t}]:`,e),alert(e))}}class Lt{constructor(){this.contactForm=null}init(){console.log("ContactController initialized"),this.setupEventListeners()}setupEventListeners(){document.addEventListener("pageRendered",e=>{e.detail.page==="contact"&&this.initializeContactForm()})}initializeContactForm(){this.contactForm=document.getElementById("contactForm"),this.contactForm&&this.contactForm.addEventListener("submit",e=>this.handleContactSubmit(e))}handleContactSubmit(e){e.preventDefault();const t=new FormData(e.target),a={name:t.get("name"),email:t.get("email"),subject:t.get("subject"),message:t.get("message")},n=this.validateContactForm(a);if(!n.isValid){window.app.appController.showAlert(n.message,"warning");return}this.submitContactForm(e.target,a)}validateContactForm(e){return!e.name||!e.email||!e.subject||!e.message?{isValid:!1,message:"Mohon lengkapi semua field yang wajib diisi"}:/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email)?{isValid:!0}:{isValid:!1,message:"Format email tidak valid"}}submitContactForm(e,t){const a=e.querySelector(".submit-btn"),n=a.textContent;a.textContent="Mengirim...",a.disabled=!0,setTimeout(()=>{console.log("Contact form submitted:",t),window.app.appController.showAlert("Pesan berhasil dikirim! Kami akan segera menghubungi Anda.","success"),e.reset(),a.textContent=n,a.disabled=!1},2e3)}}class At{constructor(){console.log("[App] Constructor called"),this.appController=null,this.navigationController=null,this.detectorController=null,this.contactController=null,this.init()}init(){console.log("[App] Init called"),document.readyState==="loading"?(console.log("[App] DOM still loading, waiting..."),document.addEventListener("DOMContentLoaded",()=>this.start())):(console.log("[App] DOM ready, starting immediately"),this.start())}start(){console.log("🚀 Stress Chat Detector App Started");try{this.checkRequiredElements(),console.log("[App] Initializing controllers..."),this.appController=new me,this.navigationController=new bt,this.detectorController=new Et,this.contactController=new Lt,this.appController.init(),this.navigationController.init(),this.detectorController.init(),this.contactController.init(),console.log("[App] Controllers initialized successfully"),setTimeout(()=>{console.log("[App] Navigating to home page..."),this.navigationController.navigateToPage("home")},100),this.setupGlobalErrorHandling()}catch(e){console.error("[App] Error during startup:",e),this.handleStartupError(e)}}checkRequiredElements(){console.log("[App] Checking required HTML elements...");const e=document.getElementById("mainContent")||document.querySelector(".main-content")||document.querySelector("main");e?console.log("[App] Main content element found:",e.id||e.className):(console.warn("[App] Main content element not found, will create one"),this.createMainContentElement())}createMainContentElement(){console.log("[App] Creating main content element");const e=document.createElement("div");e.id="mainContent",e.className="main-content",(document.getElementById("app")||document.body).appendChild(e),console.log("[App] Main content element created and appended")}handleStartupError(e){console.error("[App] Startup error:",e);const t=`
            <div style="padding: 20px; text-align: center; color: #721c24; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 5px; margin: 20px;">
                <h2>🚫 Aplikasi Gagal Dimuat</h2>
                <p>Terjadi kesalahan saat memulai aplikasi.</p>
                <p><strong>Error:</strong> ${e.message}</p>
                <button onclick="location.reload()" style="padding: 10px 20px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Coba Lagi
                </button>
            </div>
        `,a=document.getElementById("mainContent")||document.getElementById("app")||document.body;a.innerHTML=t}setupGlobalErrorHandling(){console.log("[App] Setting up global error handling"),window.addEventListener("error",e=>{console.error("[App] Global error:",e.error),this.appController&&typeof this.appController.showAlert=="function"&&this.appController.showAlert("Terjadi kesalahan yang tidak terduga. Silakan refresh halaman.","error")}),window.addEventListener("unhandledrejection",e=>{console.error("[App] Unhandled promise rejection:",e.reason),this.appController&&typeof this.appController.showAlert=="function"&&this.appController.showAlert("Terjadi kesalahan dalam memproses permintaan.","error")})}}console.log("[Main] Starting application...");const E=new At;window.app=E;window.navigateToPage=i=>{console.log(`[Global] Navigate to page: ${i}`),E.navigationController&&typeof E.navigationController.navigateToPage=="function"?(E.navigationController.navigateToPage(i),setTimeout(()=>{window.scrollTo({top:0,behavior:"smooth"})},100)):console.error("[Global] Navigation controller not available")};window.navigateToPageSmooth=(i,e=null)=>{console.log(`[Global] Navigate to page with smooth scroll: ${i}`),E.navigationController&&typeof E.navigationController.navigateToPage=="function"?(E.navigationController.navigateToPage(i),setTimeout(()=>{if(e){const t=document.querySelector(e)||document.getElementById(e);t?t.scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"}):window.scrollTo({top:0,behavior:"smooth"})}else window.scrollTo({top:0,behavior:"smooth"})},150)):console.error("[Global] Navigation controller not available")};window.analyzeStress=()=>{console.log("[Global] Analyze stress called"),E.detectorController&&typeof E.detectorController.analyzeStress=="function"?(E.detectorController.analyzeStress(),setTimeout(()=>{const i=document.querySelector(".result-section")||document.querySelector(".analysis-result")||document.getElementById("resultSection");i&&i.scrollIntoView({behavior:"smooth",block:"start"})},500)):console.error("[Global] Detector controller not available")};window.resetForm=()=>{console.log("[Global] Reset form called"),E.detectorController&&typeof E.detectorController.resetForm=="function"?(E.detectorController.resetForm(),setTimeout(()=>{window.scrollTo({top:0,behavior:"smooth"})},100)):console.error("[Global] Detector controller not available")};window.smoothScrollTo=(i,e=0)=>{const t=typeof i=="string"?document.querySelector(i)||document.getElementById(i):i;if(t){const n=t.getBoundingClientRect().top+window.pageYOffset+e;window.scrollTo({top:n,behavior:"smooth"})}};window.smoothScrollToTop=()=>{window.scrollTo({top:0,behavior:"smooth"})};console.log("[Main] Application setup complete with smooth navigation");
