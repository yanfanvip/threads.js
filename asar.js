(()=>{var t={10:(t,e,r)=>{const i=r(601),n=r(243);e.addAsarToLookupPaths=i.addAsarToLookupPaths,e.removeAsarToLookupPaths=i.removeAsarToLookupPaths,e.register=n.register,e.unregister=n.unregister,e.getState=function(){return{lookupAsar:i.checkLookupState(),registered:n.checkRegisterState()}},e.version="3.1.1"},893:(t,e,r)=>{const{disk:i}=r(969),n=r(17),{openSync:s,writeSync:o,closeSync:a,chmodSync:c}=r(260),{readFileChunk:f,TEMP_DIR:h,splitPath:l}=r(650),{createHash:u}=r(113),p="win32"===process.platform?/[\\/]/:/\//;class d{static create(t){const e=new d(t);return e.init()?e:null}constructor(t){this._src=t,this._headerSize=0,this._header=null,this._externalFiles=Object.create(null)}get headerSize(){return this._headerSize}get header(){return this._header}get src(){return this._src}init(){let t;try{t=i.readArchiveHeaderSync(this._src)}catch(t){return!1}return this._header=t.header,this._headerSize=8+t.headerSize,!0}getNodeFromPath(t,e){let r=this._header;if(!t||!r)return r;const i=t.split(p);for(let t=0;t<i.length;++t){const n=i[t];if("."!==n){if(r=r.files[n],!r)return null;r.link&&(t===i.length-1?e&&(r=this.getNodeFromPath(r.link,e)):r=this.getNodeFromPath(r.link,e))}}return r}getFileInfo(t){if(!this._header)return!1;const e=this.getNodeFromPath(t,!0);if(!e)return!1;const r=new y;return!!g(r,this._headerSize,e)&&{size:r.size,unpacked:r.unpacked,offset:r.offset,executable:r.executable,integrity:r.integrity}}statNode(t){if(!t)return!1;const e=new P;return!!function(t,e,r){return"link"in r?(t.isFile=!1,t.isLink=!0,!0):"files"in r?(t.isFile=!1,t.isDirectory=!0,!0):g(t,e,r)}(e,this._headerSize,t)&&{size:e.size,offset:e.offset,isFile:e.isFile,isDirectory:e.isDirectory,isLink:e.isLink}}stat(t,e){if(!this._header)return!1;const r=this.getNodeFromPath(t,e);return!!r&&this.statNode(r)}readdir(t){if(!this._header)return!1;const e=this.getNodeFromPath(t,!0);return!!e&&(null==e.files||"object"!=typeof e.files?0:Object.keys(e.files))}realpath(t){if(!this._header)return!1;const e=this.getNodeFromPath(t,!1);return!!e&&("link"in e?e.link:t)}getUnpackedPath(t){return n.join(this._src+".unpacked",t)}copyFileOut(t){if(this._externalFiles[t])return this._externalFiles[t];if(!this._header)return!1;const e=this.getNodeFromPath(t,!0);if(!e)return!1;if(e.unpacked)return this.getUnpackedPath(t);const r=this._src;let i;if(e.integrity&&e.integrity.hash)i=e.integrity.hash;else{const t=u("sha256"),n=s(r,"r");try{f(n,this._headerSize+parseInt(e.offset,10),this._headerSize+parseInt(e.offset,10)+e.size,((e,r)=>{t.update(e)}))}catch(t){return a(n),!1}a(n),i=t.digest("hex")}const l=`${n.join(h,i)}${n.extname(t)}`,p=s(r,"r"),d=s(l,"w");try{f(p,this._headerSize+parseInt(e.offset,10),this._headerSize+parseInt(e.offset,10)+e.size,((t,e)=>{o(d,t,0,t.length)}))}catch(t){return a(d),a(p),!1}return a(d),a(p),e.executable&&c(l,"755"),this._externalFiles[t]=l,l}withOpen(t,...e){const r=s(this._src);let i;try{i=t(r,...e)}catch(t){throw a(r),t}return a(r),i}}class y{constructor(){this.unpacked=!1,this.executable=!1,this.size=0,this.offset=0,this.integrity=null}}class P extends y{constructor(){super(),this.isFile=!0,this.isDirectory=!1,this.isLink=!1}}function g(t,e,r){return"size"in r&&(t.size=r.size,"executable"in r&&(t.executable=r.executable),r.integrity&&"SHA256"===r.integrity.algorithm&&r.integrity.hash&&(t.integrity={algorithm:"SHA256",hash:r.integrity.hash||""}),"unpacked"in r&&(t.unpacked=r.unpacked,t.unpacked)?t:"offset"in r&&(t.offset=parseInt(r.offset,10),t.offset+=e,!0))}function I(t){return d.create(t)}const _=new Map;e.createArchive=I,e.splitPath=l,e.getOrCreateArchive=function(t){if(_.has(t))return _.get(t);const e=I(t);return e?(_.set(t,e),e):null}},969:(t,e,r)=>{const{openSync:i,readSync:n,closeSync:s}=r(260),o=r(604),a={readArchiveHeaderSync:function(t){const e=i(t,"r");let r,a;try{const t=Buffer.alloc(8);if(8!==n(e,t,0,8,null))throw new Error("Unable to read header size");if(r=o.createFromBuffer(t).createIterator().readUInt32(),a=Buffer.alloc(r),n(e,a,0,r,null)!==r)throw new Error("Unable to read header")}finally{s(e)}const c=o.createFromBuffer(a).createIterator().readString();return{header:JSON.parse(c),headerSize:r}}};e.disk=a},604:(t,e)=>{var r=function(t,e){return t+(e-t%e)%e},i=function(){function t(t){this.payload=t.header,this.payloadOffset=t.headerSize,this.readIndex=0,this.endIndex=t.getPayloadSize()}return t.prototype.readBool=function(){return 0!==this.readInt()},t.prototype.readInt=function(){return this.readBytes(4,Buffer.prototype.readInt32LE)},t.prototype.readUInt32=function(){return this.readBytes(4,Buffer.prototype.readUInt32LE)},t.prototype.readInt64=function(){return this.readBytes(8,Buffer.prototype.readInt64LE)},t.prototype.readUInt64=function(){return this.readBytes(8,Buffer.prototype.readUInt64LE)},t.prototype.readFloat=function(){return this.readBytes(4,Buffer.prototype.readFloatLE)},t.prototype.readDouble=function(){return this.readBytes(8,Buffer.prototype.readDoubleLE)},t.prototype.readString=function(){return this.readBytes(this.readInt()).toString()},t.prototype.readBytes=function(t,e){var r=this.getReadPayloadOffsetAndAdvance(t);return null!=e?e.call(this.payload,r,t):this.payload.slice(r,r+t)},t.prototype.getReadPayloadOffsetAndAdvance=function(t){if(t>this.endIndex-this.readIndex)throw this.readIndex=this.endIndex,new Error("Failed to read data with length of "+t);var e=this.payloadOffset+this.readIndex;return this.advance(t),e},t.prototype.advance=function(t){var e=r(t,4);this.endIndex-this.readIndex<e?this.readIndex=this.endIndex:this.readIndex+=e},t}(),n=function(){function t(t){t?this.initFromBuffer(t):this.initEmpty()}return t.prototype.initEmpty=function(){this.header=Buffer.alloc(0),this.headerSize=4,this.capacityAfterHeader=0,this.writeOffset=0,this.resize(64),this.setPayloadSize(0)},t.prototype.initFromBuffer=function(t){this.header=t,this.headerSize=t.length-this.getPayloadSize(),this.capacityAfterHeader=9007199254740992,this.writeOffset=0,this.headerSize>t.length&&(this.headerSize=0),this.headerSize!==r(this.headerSize,4)&&(this.headerSize=0),0===this.headerSize&&(this.header=Buffer.alloc(0))},t.prototype.createIterator=function(){return new i(this)},t.prototype.toBuffer=function(){return this.header.slice(0,this.headerSize+this.getPayloadSize())},t.prototype.writeBool=function(t){return this.writeInt(t?1:0)},t.prototype.writeInt=function(t){return this.writeBytes(t,4,Buffer.prototype.writeInt32LE)},t.prototype.writeUInt32=function(t){return this.writeBytes(t,4,Buffer.prototype.writeUInt32LE)},t.prototype.writeInt64=function(t){return this.writeBytes(t,8,Buffer.prototype.writeInt64LE)},t.prototype.writeUInt64=function(t){return this.writeBytes(t,8,Buffer.prototype.writeUInt64LE)},t.prototype.writeFloat=function(t){return this.writeBytes(t,4,Buffer.prototype.writeFloatLE)},t.prototype.writeDouble=function(t){return this.writeBytes(t,8,Buffer.prototype.writeDoubleLE)},t.prototype.writeString=function(t){var e=Buffer.byteLength(t,"utf8");return!!this.writeInt(e)&&this.writeBytes(t,e)},t.prototype.setPayloadSize=function(t){return this.header.writeUInt32LE(t,0)},t.prototype.getPayloadSize=function(){return this.header.readUInt32LE(0)},t.prototype.writeBytes=function(t,e,i){var n=r(e,4),s=this.writeOffset+n;s>this.capacityAfterHeader&&this.resize(Math.max(2*this.capacityAfterHeader,s)),null!=i?i.call(this.header,t,this.headerSize+this.writeOffset):this.header.write(t,this.headerSize+this.writeOffset,e);var o=this.headerSize+this.writeOffset+e;return this.header.fill(0,o,o+n-e),this.setPayloadSize(s),this.writeOffset=s,!0},t.prototype.resize=function(t){t=r(t,64),this.header=Buffer.concat([this.header,Buffer.alloc(t)]),this.capacityAfterHeader=t},t}();e.createEmpty=function(){return new n},e.createFromBuffer=function(t){return new n(t)}},696:(t,e,r)=>{const i=r(17),n=r(837),{getOrCreateArchive:s}=r(893),{isAsarDisabled:o,splitPath:a,createError:c,AsarError:f,invokeWithNoAsar:h}=r(650),l=r(81);let u,p,d,y,P=!1;e.overwriteChildProcess=function(){if(P)return;function t(t,e,r,n){if(o())return u.apply(this,arguments);const{isAsar:h,asarPath:l,filePath:p}=a(i.resolve(t));if(!h||""===p)return u.apply(this,arguments);"function"==typeof e?(n=e,e=[],r=void 0):"function"==typeof r&&(n=r,r=void 0);const d=s(l);if(!d)throw c(f.INVALID_ARCHIVE,{asarPath:l});const y=d.copyFileOut(p);if(!y)throw c(f.NOT_FOUND,{asarPath:l,filePath:p});return u.apply(this,[y,e,r,(t,e,r)=>{if(t)return n&&n(t);n&&n(null,e,r)}])}d=l.exec,l.exec=h(d),l.exec[n.promisify.custom]=h(d[n.promisify.custom]),y=l.execSync,l.execSync=h(y),u=l.execFile;const e=r(837).promisify.custom;Object.defineProperty(t,e,{configurable:!0,value:function(e,r,i){return new Promise(((n,s)=>{t(e,r,i,((t,e,r)=>{if(t)return s(t);n({stdout:e,stderr:r})}))}))}}),l.execFile=t,p=l.execFileSync,l.execFileSync=function(t,e,r){if(o())return p.apply(this,arguments);const{isAsar:n,asarPath:h,filePath:l}=a(i.resolve(t));if(!n||""===l)return p.apply(this,arguments);const u=s(h);if(!u)throw c(f.INVALID_ARCHIVE,{asarPath:h});const d=u.copyFileOut(l);if(!d)throw c(f.NOT_FOUND,{asarPath:h,filePath:l});const y=p.apply(this,[d,e,r]);return y},P=!0},e.cancel=function(){P&&(l.exec=d,d=void 0,l.execSync=y,y=void 0,l.execFile=u,u=void 0,l.execFileSync=p,p=void 0,P=!1)}},649:(t,e,r)=>{const i=r(260),{internalModuleReadJSON:n}=r(499),{getOrCreateArchive:s}=r(893),o=r(17),a=r(837),{splitPath:c,assertCallback:f,AsarError:h,createError:l,readFileChunk:u}=r(650),p=i.createReadStream,d=i.createWriteStream,y=i.openSync,P=i.closeSync,g=i.readFile,{Stats:I,constants:_}=i,O="function"==typeof BigInt,N=O?BigInt(10)**BigInt(6):0,m=(()=>{if(!O)return;function t(t){return new Date(Number(t)+.5)}const e=Object.getPrototypeOf(I);return class extends e{constructor(e,r,i,n,s,o,a,c,f,h,l,u,p,d){super(e,r,i,n,s,o,a,c,f,h),this.atimeMs=l/N,this.mtimeMs=u/N,this.ctimeMs=p/N,this.birthtimeMs=d/N,this.atimeNs=l,this.mtimeNs=u,this.ctimeNs=p,this.birthtimeNs=d,this.atime=t(this.atimeMs),this.mtime=t(this.mtimeMs),this.ctime=t(this.ctimeMs),this.birthtime=t(this.birthtimeMs)}_checkModeProperty(t){return("win32"!==process.platform||4096!==t&&24576!==t&&49152!==t)&&(this.mode&BigInt(61440))===BigInt(t)}}})();function v(t,e=[]){process.nextTick((()=>t(...e)))}function w(t,e){if(!e||!e.encoding||"utf8"===e.encoding)return t;const r=Buffer.from(t);return"buffer"===e.encoding?r:r.toString(e.encoding)}let A=0;const S=null!=process.getuid?process.getuid():0,F=null!=process.getgid?process.getgid():0,D=new Date,k=(t,e)=>{let r=_.S_IROTH^_.S_IRGRP^_.S_IRUSR^_.S_IWUSR;const i=t.isDirectory,n=t.isLink;return t.isFile?r^=_.S_IFREG:i?r^=_.S_IFDIR:n&&(r^=_.S_IFLNK),e&&m?new m(BigInt(1),BigInt(r),BigInt(1),BigInt(S),BigInt(F),BigInt(0),void 0,BigInt(++A),BigInt(t.size||0),void 0,BigInt(D.getTime())*N,BigInt(D.getTime())*N,BigInt(D.getTime())*N,BigInt(D.getTime())*N):new I(1,r,1,S,F,0,void 0,++A,t.size||0,void 0,D.getTime(),D.getTime(),D.getTime(),D.getTime())},E=t=>t.isDirectory?_.UV_DIRENT_DIR||2:t.isLink?_.UV_DIRENT_LINK||3:_.UV_DIRENT_FILE||1;let x=!1;const T=Object.create(null);function b(t,e){if(!(t in T))if(t.startsWith("promises.")){const r=t.substring(9),n=i.promises[r];T[t]=n,i.promises[r]=e(n)}else{const r=i[t];T[t]=r,i[t]=e(r)}}function B(t){if(t in T)if(t.startsWith("promises.")){const e=t.substring(9);i.promises[e]=T[t],delete T[t]}else i[t]=T[t],delete T[t]}let R,U;try{R=process.binding("fs")}catch(t){R={internalModuleReadJSON:()=>{}}}const L=t=>Buffer.isBuffer(t)?t.toString():t;t.exports={overwriteFs:function(){if(x)return i;function t(t){return function(e,r){e=L(e);const i=c(o.resolve(e));if(!i.isAsar)return t.apply(this,arguments);const{asarPath:n,filePath:a}=i,f=s(n);if(!f)throw l(h.INVALID_ARCHIVE,{asarPath:n});const u=f.realpath(a);if(!1===u)throw l(h.NOT_FOUND,{asarPath:n,filePath:a});if(r){if("string"==typeof r)r={encoding:r};else if("object"!=typeof r)throw new TypeError("Bad arguments")}else r={encoding:"utf8"};const p=o.join(t(n),u);return w(p,r)}}function e(t){return function(e,r,i){e=L(e);const n=c(o.resolve(e));if(!n.isAsar)return t.apply(this,arguments);"function"==typeof r&&(i=r,r=void 0),f(i);const{asarPath:a,filePath:u}=n,p=s(a);if(!p)return v(i,[l(h.INVALID_ARCHIVE,{asarPath:a})]);const d=p.realpath(u);if(!1===d)return v(i,[l(h.NOT_FOUND,{asarPath:a,filePath:u})]);if(r){if("string"==typeof r)r={encoding:r};else if("object"!=typeof r)throw new TypeError("Bad arguments")}else r={encoding:"utf8"};t(a,((t,e)=>{if(t)i(t);else{const t=o.join(e,d);i(null,w(t,r))}}))}}U=R.internalModuleReadJSON,R.internalModuleReadJSON=function(t){const{isAsar:e,filePath:r}=c(o.resolve(t));return e&&""!==r?n(t):U.apply(this,arguments)},b("readFileSync",(t=>function(e,r){e=L(e);const{isAsar:n,asarPath:a,filePath:f}=c(o.resolve(e));if(!n||""===f)return t.apply(this,arguments);const u=s(a);if(!u)throw l(h.INVALID_ARCHIVE,{asarPath:a});const p=u.getFileInfo(f);if(!p)throw l(h.NOT_FOUND,{asarPath:a,filePath:f});if(r){if("string"==typeof r)r={encoding:r,flag:"r"};else if("object"!=typeof r)throw new TypeError("Bad arguments")}else r={encoding:null,flag:"r"};if(0===p.size)return r.encoding?"":Buffer.alloc(0);if(p.unpacked){const e=u.getUnpackedPath(f);return t.apply(this,[e,r])}const{encoding:d}=r,y=Buffer.alloc(p.size);try{return u.withOpen((t=>(i.readSync(t,y,0,p.size,p.offset),d?y.toString(d):y)))}catch(t){throw l(h.NOT_FOUND,{asarPath:a,filePath:f})}})),b("readFile",(t=>function(e,r,n){e=L(e);const a=c(o.resolve(e)),{isAsar:u,asarPath:p,filePath:d}=a;if(!u||""===d)return t.apply(this,arguments);"function"==typeof r&&(n=r,r=void 0),f(n);const y=s(p);if(!y)return v(n,[l(h.INVALID_ARCHIVE,{asarPath:p})]);const P=y.getFileInfo(d);if(!P)return v(n,[l(h.NOT_FOUND,{asarPath:p,filePath:d})]);if(r){if("string"==typeof r)r={encoding:r,flag:"r"};else if("object"!=typeof r)throw new TypeError("Bad arguments")}else r={encoding:null,flag:"r"};if(0===P.size)return v(n,[null,r.encoding?"":Buffer.alloc(0)]);if(P.unpacked){const t=y.getUnpackedPath(d);return g.apply(this,[t,r])}const{encoding:I}=r,_=Buffer.alloc(P.size);try{y.withOpen((t=>{i.readSync(t,_,0,P.size,P.offset),v(n,[null,I?_.toString(I):_])}))}catch(t){return v(n,[l(h.NOT_FOUND,{asarPath:p,filePath:d})])}})),b("promises.readFile",(()=>a.promisify(i.readFile))),b("statSync",(t=>function(e,r){e=L(e);const i=c(o.resolve(e)),{isAsar:n,asarPath:a,filePath:f}=i;if(!n)return t.apply(this,arguments);const u=s(a);if(!u)throw l(h.INVALID_ARCHIVE,{asarPath:a});const p=u.stat(f,!0);if(!p)throw l(h.NOT_FOUND,{asarPath:a,filePath:f});return k(p,r&&r.bigint)})),b("stat",(t=>function(e,r,i){e=L(e);const n=c(o.resolve(e)),{isAsar:a}=n;if(!a)return t.apply(this,arguments);"function"==typeof r&&(i=r,r=void 0),f(i);const{asarPath:u,filePath:p}=n,d=s(u);if(!d)return v(i,[l(h.INVALID_ARCHIVE,{asarPath:u})]);const y=d.stat(p,!0);if(!y)return v(i,[l(h.NOT_FOUND,{asarPath:u,filePath:p})]);v(i,[null,k(y,r&&r.bigint)])})),b("promises.stat",(()=>a.promisify(i.stat))),b("lstatSync",(t=>function(e,r){e=L(e);const{isAsar:i,asarPath:n,filePath:a}=c(o.resolve(e));if(!i)return t.apply(this,arguments);const f=s(n);if(!f)throw l(h.INVALID_ARCHIVE,{asarPath:n});const u=f.stat(a,!1);if(!u)throw l(h.NOT_FOUND,{asarPath:n,filePath:a});return k(u,r&&r.bigint)})),b("lstat",(t=>function(e,r,i){e=L(e);const n=c(o.resolve(e)),{isAsar:a}=n;if(!a)return t.apply(this,arguments);"function"==typeof r&&(i=r,r=void 0),f(i);const{asarPath:u,filePath:p}=n,d=s(u);if(!d)return v(i,[l(h.INVALID_ARCHIVE,{asarPath:u})]);const y=d.stat(p,!1);if(!y)return v(i,[l(h.NOT_FOUND,{asarPath:u,filePath:p})]);v(i,[null,k(y,r&&r.bigint)])})),b("promises.lstat",(()=>a.promisify(i.lstat))),b("readdirSync",(t=>function(e,r){e=L(e);const{isAsar:n,asarPath:a,filePath:f}=c(o.resolve(e));if(!n)return t.apply(this,arguments);const u=s(a);if(!u)throw l(h.INVALID_ARCHIVE,{asarPath:a});if(r&&r.withFileTypes){const t=u.getNodeFromPath(f,!0);if(!t)throw l(h.NOT_FOUND,{asarPath:a,filePath:f});if(null==t.files||"object"!=typeof t.files)throw l(h.NOT_DIR);const e=Object.keys(t.files),r=[];for(let n=0;n<e.length;++n){const s=e[n],c=u.statNode(t.files[s]);if(!c)throw l(h.NOT_FOUND,{asarPath:a,filePath:o.join(f,s)});r.push(new i.Dirent(s,E(c)))}return r}{const t=u.readdir(f);if(!1===t)throw l(h.NOT_FOUND,{asarPath:a,filePath:f});if(0===t)throw l(h.NOT_DIR);return t}})),b("readdir",(t=>function(e,r,n){e=L(e);const a=c(o.resolve(e)),{isAsar:u}=a;if(!u)return t.apply(this,arguments);"function"==typeof r&&(n=r,r=void 0),f(n);const{asarPath:p,filePath:d}=a,y=s(p);if(!y)return v(n,[l(h.INVALID_ARCHIVE,{asarPath:p})]);if(r&&r.withFileTypes){const t=y.getNodeFromPath(d,!0);if(!t)return v(n,[l(h.NOT_FOUND,{asarPath:p,filePath:d})]);if(null==t.files||"object"!=typeof t.files)return v(n,[l(h.NOT_DIR)]);const e=Object.keys(t.files),r=[];for(let s=0;s<e.length;++s){const a=e[s],c=y.statNode(t.files[a]);if(!c)return v(n,[l(h.NOT_FOUND,{asarPath:p,filePath:o.join(d,a)})]);r.push(new i.Dirent(a,E(c)))}v(n,[null,r])}else{const t=y.readdir(d);if(!1===t)return v(n,[l(h.NOT_FOUND,{asarPath:p,filePath:d})]);if(0===t)return v(n,[l(h.NOT_DIR)]);v(n,[null,t])}})),b("promises.readdir",(()=>a.promisify(i.readdir))),b("existsSync",(t=>function(e){e=L(e);const r=c(o.resolve(e)),{isAsar:i,asarPath:n,filePath:a}=r;if(!i)return t.apply(this,arguments);const f=s(n);return!!f&&!1!==f.stat(a,!0)})),b("exists",(t=>{function e(e,r){e=L(e);const i=c(o.resolve(e)),{isAsar:n,asarPath:a,filePath:h}=i;if(!n)return t.apply(this,arguments);f(r);const l=s(a);if(!l)return v(r,[!1]);v(r,[!1!==l.stat(h,!0)])}return Object.defineProperty(e,a.promisify.custom,{configurable:!0,value:function(e){e=L(e);const r=c(o.resolve(e)),{isAsar:i,asarPath:n,filePath:f}=r;if(!i)return t[a.promisify.custom](e);const h=s(n);return h?Promise.resolve(!1!==h.stat(f,!0)):Promise.resolve(!1)}}),e})),b("realpathSync",(e=>{const r=t(e);return r.native=t(e.native),r})),b("realpath",(t=>{const r=e(t);return r.native=e(t.native),r})),b("promises.realpath",(()=>a.promisify(i.realpath))),b("mkdirSync",(t=>function(e,r){e=L(e);const{isAsar:i,filePath:n}=c(o.resolve(e));if(!i||""===n)return t.apply(this,arguments);throw l(h.NOT_DIR)})),b("mkdir",(t=>function(e,r,i){e=L(e);const{isAsar:n,filePath:s}=c(o.resolve(e));if(!n||""===s)return t.apply(this,arguments);"function"==typeof r&&(i=r,r=void 0),f(i),v(i,[l(h.NOT_DIR)])})),b("promises.mkdir",(()=>a.promisify(i.mkdir))),b("copyFileSync",(t=>function(e,r,n){e=L(e);const a=c(o.resolve(e)),{isAsar:f,asarPath:p,filePath:d}=a;if(!f||""===d)return t.apply(this,arguments);const g=s(p);if(!g)throw l(h.INVALID_ARCHIVE,{asarPath:p});const I=g.getFileInfo(d);if(!I)throw l(h.NOT_FOUND,{asarPath:p,filePath:d});if(I.unpacked)return t.call(this,g.getUnpackedPath(d),r,n);const _=y(p,"r");r=L(r);const O=y(r,"w");try{u(_,I.offset,I.offset+I.size,((t,e)=>{i.writeSync(O,t,0,t.length)}))}finally{P(_),P(O)}})),b("copyFile",(t=>function(e,r,n,s){e=L(e);const{isAsar:a,asarPath:u,filePath:y}=c(o.resolve(e));if(!a||""===y)return t.apply(this,arguments);"function"==typeof n&&(s=n,n=0),f(s),process.nextTick((()=>{let t;try{t=p(o.resolve(e))}catch(t){return void s(l(h.NOT_FOUND,{asarPath:u,filePath:y}))}const n=d.call(i,r,{flags:"w"});n.once("error",s),n.on("close",(()=>{s(null)})),t.once("error",s),t.pipe(n)}))}));const r=a.promisify(i.copyFile);return b("promises.copyFile",(t=>function(e,i,n){e=L(e);const{isAsar:s,filePath:a}=c(o.resolve(e));return s&&""!==a?r(e,i,n):t.apply(this,arguments)})),b("accessSync",(t=>function(e,r){e=L(e);const n=c(o.resolve(e)),{isAsar:a}=n;if(!a)return t.apply(this,arguments);const{asarPath:f,filePath:u}=n;null==r&&(r=_.F_OK);const p=s(f);if(!p)throw l(h.INVALID_ARCHIVE,{asarPath:f});const d=p.getFileInfo(u);if(!d)throw l(h.NOT_FOUND,{asarPath:f,filePath:u});if(d.unpacked){const e=p.getUnpackedPath(u);return t(e,r)}const y=p.stat(u,!0);if(!y)throw l(h.NOT_FOUND,{asarPath:f,filePath:u});if(r&i.constants.W_OK)throw l(h.NO_ACCESS,{asarPath:f,filePath:u})})),b("access",(t=>function(e,r,n){e=L(e);const a=c(o.resolve(e)),{isAsar:f}=a;if(!f)return t.apply(this,arguments);const{asarPath:u,filePath:p}=a;"function"==typeof r&&(n=r,r=i.constants.F_OK);const d=s(u);if(!d)return void v(n,[l(h.INVALID_ARCHIVE,{asarPath:u})]);const y=d.getFileInfo(p);if(!y)return void v(n,[l(h.NOT_FOUND,{asarPath:u,filePath:p})]);if(y.unpacked){const t=d.copyFileOut(p);return i.access(t,r,n)}const P=d.stat(p,!0);P?r&i.constants.W_OK?v(n,[l(h.NO_ACCESS,{asarPath:u,filePath:p})]):v(n,[null]):v(n,[l(h.NOT_FOUND,{asarPath:u,filePath:p})])})),b("promises.access",(()=>a.promisify(i.access))),b("openSync",(t=>function(e,r,i){e=L(e);const{isAsar:n,asarPath:a,filePath:f}=c(o.resolve(e));if(!n||""===f)return t.apply(this,arguments);const u=s(a);if(!u)throw l(h.INVALID_ARCHIVE,{asarPath:a});const p=u.copyFileOut(f);if(!p)throw l(h.NOT_FOUND,{asarPath:a,filePath:f});return t.apply(this,[p,r,i])})),b("open",(t=>function(e,r,i,n){e=L(e);const{isAsar:a,asarPath:u,filePath:p}=c(o.resolve(e));if(!a||""===p)return t.apply(this,arguments);"function"==typeof r?(n=r,r="r",i=438):"function"==typeof i&&(n=i,i=438),f(n);const d=s(u);if(!d)return v(n,[l(h.INVALID_ARCHIVE,{asarPath:u})]);const y=d.copyFileOut(p);if(!y)return v(n,[l(h.NOT_FOUND,{asarPath:u,filePath:p})]);t.apply(this,[y,r,i,n])})),b("promises.open",(t=>function(e,r,i){e=L(e);const{isAsar:n,asarPath:a,filePath:f}=c(o.resolve(e));return n&&""!==f?new Promise(((e,n)=>{const o=s(a);if(!o)return n(l(h.INVALID_ARCHIVE,{asarPath:a}));const c=o.copyFileOut(f);if(!c)return n(l(h.NOT_FOUND,{asarPath:a,filePath:f}));e(t(c,r,i))})):t.apply(this,arguments)})),x=!0,i},cancel:function(){if(!x)return;const t=Object.keys(T);for(let e=0;e<t.length;++e)B(t);R.internalModuleReadJSON=U,U=void 0,x=!1}}},260:(t,e,r)=>{const i=r(561)();let n;try{n=i("original-fs")}catch(t){n=r(147)}t.exports=n},534:(t,e,r)=>{const i=r(260),n={},s={...Object.getOwnPropertyDescriptors(i)};delete s.promises,Object.defineProperties(n,s);const o={};Object.defineProperties(o,{...Object.getOwnPropertyDescriptors(i.promises)}),Object.defineProperty(n,"promises",{configurable:!0,enumerable:!0,get:()=>o}),t.exports=n},561:t=>{t.exports=function(){let t;return t=function(){return"undefined"!=typeof require?require:void 0}(),t}},601:(t,e,r)=>{const{getModuleConstructor:i,isAsarDisabled:n}=r(271);let s,o=!1;e.addAsarToLookupPaths=function(){if(o)return;const t=i();if(t&&"function"==typeof t._resolveLookupPaths){const e=function(t){if(!n())for(let e=0;e<t.length;e++)"node_modules"===r(17).basename(t[e])&&(t.splice(e+1,0,t[e]+".asar"),e++)};s=t._resolveLookupPaths,t._resolveLookupPaths=2===s.length?function(t,r){const i=s.call(this,t,r);return i?(e(i),i):i}:function(t,r,i){const n=s.call(this,t,r,i),o=i?n:n[1];return e(o),n},o=!0}},e.removeAsarToLookupPaths=function(){if(!o)return;const t=i();t?(t._resolveLookupPaths=s,s=void 0,o=!1):o=!1},e.checkLookupState=function(){return o}},499:(t,e,r)=>{const i=r(17),n=i.toNamespacedPath,s=r(260),{tryRedirectUnpacked:o}=r(650);let a=null;function c(t){if(!a){a=new Map;for(let t=0;t<process.argv.length;++t){const e=process.argv[t];if(e.startsWith("--"))if(e.startsWith("--no-"))a.set("--"+e.slice(5),{value:!1});else{const t=e.split("=");a.set(t[0],{value:void 0===t[1]||t[1]})}}}if(t.startsWith("--no-")){const e=a.get("--"+t.slice(5));return e&&!e.value}const e=a.get(t);return null!=e?e.value:void 0}const f=c("--preserve-symlinks"),h=c("--preserve-symlinks-main"),l=(...t)=>Object.keys(...t),u=new Map;function p(t){return s.realpathSync(t)}function d(t){return(t.endsWith(".node")||t.endsWith(".asar"))&&(t=o(t)),t}function y(t,e){if(0===N(t))return f&&!e?i.resolve(t):p(t)}function P(t,e,r){for(let i=0;i<e.length;i++){const n=y(t+e[i],r);if(n)return n}return!1}function g(t,e,r,n){const s=function(t){const e=i.resolve(t,"package.json"),r=u.get(e);if(void 0!==r)return r;const n=O.read(e),s=!1===n.containsKeys?"{}":n.string;if(void 0===s)return u.set(e,!1),!1;try{const t=((...t)=>JSON.parse(...t))(s),r={name:t.name,main:t.main,exports:t.exports,imports:t.imports,type:t.type};return u.set(e,r),r}catch(t){throw t.path=e,t.message="Error parsing "+e+": "+t.message,t}}(t),o=null!=s?s.main:void 0;if(!o)return P(i.resolve(t,"index"),e,r);const a=i.resolve(t,o);let c=y(a,r)||P(a,e,r)||P(i.resolve(a,"index"),e,r);if(!1===c){if(c=P(i.resolve(t,"index"),e,r),!c){const e=new Error(`Cannot find module '${a}'. Please verify that the package.json has a valid "main" entry`);throw e.code="MODULE_NOT_FOUND",e.path=i.resolve(t,"package.json"),e.requestPath=n,e}{const e=i.resolve(t,"package.json");process.emitWarning(`Invalid 'main' field in '${e}' of '${o}'. Please either fix that or report it to the module author`,"DeprecationWarning","DEP0128")}}return c}function I(t){if(!s.existsSync(t))return[];let e;try{e=s.readFileSync(t,"utf8")}catch(t){return[]}return[e,e.length>0]}const _=new Map,O={read(t){if(_.has(t))return _.get(t);const{0:e,1:r}=I(n(t)),i={string:e,containsKeys:r};return _.set(t,i),i}};function N(t){return function(t){try{return s.statSync(t).isDirectory()?1:0}catch(t){return-1}}(t=i.toNamespacedPath(t))}const m=/(?:^|\/)\.?\.$/;e._findPath=function(t,e,r){const n=this;if(i.isAbsolute(t))e=[""];else if(!e||0===e.length)return!1;const s=t+"\0"+((...t)=>Array.prototype.join.call(...t))(e,"\0"),o=n._pathCache[s];if(o)return o;let a,c=t.length>0&&47===((...t)=>String.prototype.charCodeAt.call(...t))(t,t.length-1);c||(c=((...t)=>RegExp.prototype.test.call(...t))(m,t));for(let o=0;o<e.length;o++){const u=e[o];if(u&&N(u)<1&&!u.endsWith(".asar"))continue;const y=i.resolve(u,t);let I;const _=N(y);for(c||(0===_&&(I=r?h?i.resolve(y):p(y):f?i.resolve(y):p(y)),I||(void 0===a&&(a=l(n._extensions)),I=P(y,a,r))),I||1!==_||(void 0===a&&(a=l(n._extensions)),I=g(y,a,r,t));I&&I.endsWith(".asar");)void 0===a&&(a=l(n._extensions)),I=d(I),I=g(I,a,r,t);if(I)return I=d(I),n._pathCache[s]=I,I}return!1},e.tryPackage=g,e.redirectUnpackedPath=d,e.internalModuleReadJSON=I},243:(t,e,r)=>{const{isAsarDisabled:i,getModuleConstructor:n,initTempDir:s}=r(650),o=r(534),{overwriteChildProcess:a,cancel:c}=r(696),{overwriteFs:f,cancel:h}=r(649),{tryPackage:l,redirectUnpackedPath:u,_findPath:p}=r(499);let d,y,P,g=!1;e.register=function(){if("electron"in process.versions||g)return;s();const t=n();if(!t)return;const e=r(17);if(a(),f(),"function"==typeof t._load&&"function"==typeof t._findPath&&null!=t._extensions){d=t._load,t._load=function(t,e,r){try{return d.apply(this,arguments)}catch(e){if("MODULE_NOT_FOUND"===e.code&&"original-fs"===t)return o;throw e}};const n=function(e,r,i,n){let s=e;for(;s.endsWith(".asar");)if(s=u(s),s=l(e,Object.keys(t._extensions),i,r),!s)return!1;return s=u(s),n&&(t._pathCache[n]=s),s};y=t._findPath,t._findPath=function(e,r,s){const o=y.call(this,e,r,s);if(i())return o;if(o){const t=e+"\0"+(r?Array.prototype.join.call(r,"\0"):"");return n(o,e,s,t)}return p.call(t,e,r,s)},P=t._extensions[".asar"],t._extensions[".asar"]=function(s,o){if(i())return t._extensions[".js"](s,o);const a=n(o,o,s===r.c[r.s]);if(!a){const t=new Error(`Cannot find module '${o}'`);throw t.code="MODULE_NOT_FOUND",t}s.filename=a,s.paths=t._nodeModulePaths(e.dirname(a)).map((t=>t.replace(/\.asar\.unpacked([\\/])/g,".asar$1")));const c=e.extname(a);return t._extensions[c](s,a)},g=!0}},e.unregister=function(){if(!g)return;const t=n();t?(t._load=d,d=void 0,t._findPath=y,y=void 0,t._extensions[".asar"]=P,P=void 0,h(),c(),g=!1):g=!1},e.checkRegisterState=function(){return g}},271:(t,e,r)=>{const i=!(!process.env.ELECTRON_NO_ASAR||"browser"===process.type||"renderer"===process.type);e.envNoAsar=i,e.isAsarDisabled=()=>!(!process.noAsar&&!i),e.getModuleConstructor=function(){let t;try{t=r(188)}catch(t){}return t}},650:(t,e,r)=>{const{lstatSync:i,existsSync:n,openSync:s,readSync:o,closeSync:a,mkdirSync:c,readdirSync:f,unlinkSync:h,rmdirSync:l}=r(260),u=r(17),{tmpdir:p}=r(37),{envNoAsar:d,isAsarDisabled:y,getModuleConstructor:P}=r(271);function g(t){const e=I(u.dirname(t));return e.isAsar?u.join(e.asarPath+".unpacked",e.filePath,u.basename(t)):t}function I(t){const e={isAsar:!1};if(y())return e;if("string"!=typeof t)return e;if(t.endsWith(".asar"))return n(t)&&i(t).isFile()&&(e.isAsar=!0,e.asarPath=g(t),e.filePath=""),e;const r=t.lastIndexOf(".asar\\"),s=t.lastIndexOf(".asar/");if(-1===r&&-1===s)return e;const o=-1===s?r:s,a=t.substring(0,o+5);return n(a)&&i(a).isFile()&&(e.isAsar=!0,e.asarPath=g(a),e.filePath=t.substring(o+6)),e}const _={NOT_FOUND:"NOT_FOUND",NOT_DIR:"NOT_DIR",NO_ACCESS:"NO_ACCESS",INVALID_ARCHIVE:"INVALID_ARCHIVE"},O=u.join(p(),"asar-node-tmp");function N(){if(n(O))try{f(O).forEach((t=>{h(u.join(O,t))})),l(O)}catch(t){}}const m=65536;e.envNoAsar=d,e.isAsarDisabled=y,e.tryRedirectUnpacked=g,e.splitPath=I,e.AsarError=_,e.createError=(t,{asarPath:e,filePath:r}={})=>{let i;switch(t){case _.NOT_FOUND:i=new Error(`ENOENT, ${r} not found in ${e}`),i.code="ENOENT",i.errno=-2;break;case _.NOT_DIR:i=new Error("ENOTDIR, not a directory"),i.code="ENOTDIR",i.errno=-20;break;case _.NO_ACCESS:i=new Error(`EACCES: permission denied, access '${r}' in ${e}`),i.code="EACCES",i.errno=-13;break;case _.INVALID_ARCHIVE:i=new Error(`Invalid package ${e}`);break;default:throw new Error(`Invalid error type "${t}" passed to createError.`)}return i},e.assertCallback=function(t){if("function"!=typeof t)throw new TypeError("Callback must be a function. Received "+typeof t)},e.getModuleConstructor=P,e.readFileChunk=function(t,e,r,i){const n=[e,r],s=Buffer.alloc(m);let a=0,c=n[0];for(;c!==n[1];){const e=n[1]-c;a=o(t,s,0,e<m?e:m,c),c+=a,i(s.slice(0,a),c)}},e.TEMP_DIR=O,e.initTempDir=function(){process.env.__ASAR_NODE_CHILD_PROCESS__||!r(267).isMainThread||n(u.join(O,".lock"))||(N(),n(O)||(c(O),a(s(u.join(O,".lock"),"w"))),-1===process.listeners("exit").indexOf(N)&&process.on("exit",N))},e.invokeWithNoAsar=function(t){return function(){const e=process.noAsar;process.noAsar=!0;try{return t.apply(this,arguments)}finally{process.noAsar=e}}}},81:t=>{"use strict";t.exports=require("child_process")},113:t=>{"use strict";t.exports=require("crypto")},147:t=>{"use strict";t.exports=require("fs")},188:t=>{"use strict";t.exports=require("module")},37:t=>{"use strict";t.exports=require("os")},17:t=>{"use strict";t.exports=require("path")},837:t=>{"use strict";t.exports=require("util")},267:t=>{"use strict";t.exports=require("worker_threads")}},e={};function r(i){var n=e[i];if(void 0!==n)return n.exports;var s=e[i]={exports:{}};return t[i](s,s.exports,r),s.exports}r.c=e;var i=r(r.s=10);module.exports=i})();