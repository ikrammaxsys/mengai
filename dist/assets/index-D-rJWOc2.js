var $d=Object.defineProperty;var Kd=(i,t,e)=>t in i?$d(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var R=(i,t,e)=>Kd(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const me={movementRadius:28,groundRadius:35,grassRadius:33,crocodilePortal:{x:18,z:-20,useRadius:2.8},campfire:{x:0,z:20,useRadius:4.8},trees:[[-12,-8],[-13,7],[12,-10],[13,7],[-7,14],[8,13],[16,-1],[-16,0],[-21,-9],[-22,7],[-17,19],[-8,24],[5,22],[20,14],[24,4],[21,-13],[9,-24],[-8,-25],[-24,-12],[0,26]],rocks:[[-8,-2],[8,3],[-3,12],[3,-13],[-15,-9],[14,11],[10,-4],[20,-8],[23,12],[-23,14],[-20,-17],[6,26],[-6,-27],[26,0],[-27,-3],[15,21],[-15,21],[11,-24],[-19,11]]},nn={blendDurationMs:5e3,effects:{maxRainParticles:360,rainFallSpeed:23,rainSpread:18,rainHeight:22,rippleCount:12,rippleLifetimeMs:1100,lightningCycleMs:17e3,lightningFlashMs:280,lightningMaxIntensity:2.6},states:{clear:{name:"Clear",emoji:"☀️",toast:"The skies are clearing ☀️",hint:"Common fish are biting 🎣",visuals:{skyColor:"#c6e5df",ambientSkyColor:"#f4fff4",ambientGroundColor:"#8aa69a",ambientIntensity:2.15,directionalColor:"#fff6d9",directionalIntensity:3.3,fogDensity:.009,waterTint:"#5bb7c1",cloudOpacity:0,rainIntensity:0,waterChop:0,shadowRadius:3},fishing:{speciesAffinity:{bluegill:1.2,"rainbow-trout":1,"largemouth-bass":.9,"common-carp":.85,"golden-koi":.8},biteWaitMultiplier:1.08,reelGreenWidthMultiplier:1}},cloudy:{name:"Cloudy",emoji:"☁️",toast:"Clouds are gathering ☁️",hint:"A little variety is biting 🎣",visuals:{skyColor:"#b7c9c8",ambientSkyColor:"#e0e8e4",ambientGroundColor:"#7e918f",ambientIntensity:1.9,directionalColor:"#d8dfdc",directionalIntensity:2.15,fogDensity:.012,waterTint:"#579eaa",cloudOpacity:.82,rainIntensity:0,waterChop:.002,shadowRadius:5},fishing:{speciesAffinity:{bluegill:1,"rainbow-trout":1.08,"largemouth-bass":1.08,"common-carp":1,"golden-koi":1},biteWaitMultiplier:1,reelGreenWidthMultiplier:1}},rain:{name:"Rain",emoji:"🌧️",toast:"It’s starting to rain 🌧️",hint:"Rare fish are biting 🎣",visuals:{skyColor:"#91a9ae",ambientSkyColor:"#c4d2d2",ambientGroundColor:"#627b7d",ambientIntensity:1.65,directionalColor:"#b7c8ca",directionalIntensity:1.65,fogDensity:.015,waterTint:"#448c9b",cloudOpacity:.88,rainIntensity:.68,waterChop:.012,shadowRadius:7},fishing:{speciesAffinity:{bluegill:.9,"rainbow-trout":1.1,"largemouth-bass":1.25,"common-carp":1.35,"golden-koi":1.3},biteWaitMultiplier:.9,reelGreenWidthMultiplier:1}},fog:{name:"Fog",emoji:"🌫️",toast:"A gentle fog is rolling in 🌫️",hint:"Trout like the mist 🎣",visuals:{skyColor:"#b8c8c3",ambientSkyColor:"#dce5df",ambientGroundColor:"#87958b",ambientIntensity:1.8,directionalColor:"#d2d9d2",directionalIntensity:1.4,fogDensity:.023,waterTint:"#65979a",cloudOpacity:.25,rainIntensity:0,waterChop:.001,shadowRadius:6},fishing:{speciesAffinity:{bluegill:.95,"rainbow-trout":1.2,"largemouth-bass":1.12,"common-carp":1.05,"golden-koi":1},biteWaitMultiplier:1.12,reelGreenWidthMultiplier:1}},storm:{name:"Storm",emoji:"⛈️",toast:"A storm is rolling in ⛈️",hint:"Rare fish love a storm 🎣",visuals:{skyColor:"#536d78",ambientSkyColor:"#9aabb2",ambientGroundColor:"#43535b",ambientIntensity:1.4,directionalColor:"#aabac6",directionalIntensity:1.1,fogDensity:.02,waterTint:"#326d80",cloudOpacity:1,rainIntensity:1,waterChop:.035,shadowRadius:9},fishing:{speciesAffinity:{bluegill:.82,"rainbow-trout":1.08,"largemouth-bass":1.35,"common-carp":1.48,"golden-koi":1.42},biteWaitMultiplier:.86,reelGreenWidthMultiplier:.92}}}},ut={bigCatch:{bannerDurationMs:5e3,spectacularDurationMs:7e3,queueLimit:3},stones:{pickupRange:2.5,apexMin:1.1,apexDistanceFactor:.12,splashDurationSeconds:.8,respawnDelayMs:5e3,heldOffset:{x:.55,y:1.72,z:.16},pebbles:[{id:"pebble-1",x:-5.5,z:-8.5,color:"#f0d9d9"},{id:"pebble-2",x:-4.5,z:8.4,color:"#efe7d8"},{id:"pebble-3",x:6.2,z:9.2,color:"#e5c5d6"},{id:"pebble-4",x:10.2,z:5.8,color:"#f2ece2"},{id:"pebble-5",x:-10.2,z:5.2,color:"#d9c7e5"},{id:"pebble-6",x:4.5,z:-10.2,color:"#f0ded0"},{id:"pebble-7",x:14,z:2.3,color:"#eee7d8"},{id:"pebble-8",x:-13.5,z:-3.5,color:"#e7cbd5"},{id:"pebble-9",x:1,z:14.5,color:"#f3e6de"},{id:"pebble-10",x:-1.5,z:-14.3,color:"#ddd0e8"}]},sync:{interpolationDelayMs:120,nominalSnapshotIntervalMs:50,interpolationIntervals:2,interpolationDelayMinMs:80,interpolationDelayMaxMs:300,maxExtrapolationMs:150,snapshotBufferLimit:32,correctionBlendMs:150,hardCorrectionDistance:6,maxBufferedMovementBytes:16384},movement:{maxSpeed:5.2,turnSpeedRadians:2.6,maxFrameSeconds:.05,mapRadius:me.movementRadius,waterRadius:4.25,waterSafetyMargin:.01,speedAllowance:1.5,speedSlack:.4,turnAllowance:1.5,turnSlackRadians:.24},pond:{waterRadius:4.15,edgeRange:4,minTargetRadius:.25,maxTargetRadius:.85,waterY:.23,splashSeconds:.8},cast:{maxApexHeight:2.8,apexDistanceFactor:.34,reelSeconds:.48,floatHeight:.31,floatAmplitude:.055,floatPeriodMs:1250},reel:{markerMin:0,markerMax:100,markerStart:50,markerAccelerationHold:140,markerMaxVelocity:60,markerBounce:.32,simulationMaxStepSeconds:.05,helperDisplayCount:3,greenCenterStart:50,greenCenterMin:20,greenCenterMax:80,greenWidthMin:18,greenWidthMax:38,driftSpeedMin:6,driftSpeedMax:16,fillRateMin:.12,fillRateMax:.18,catchMeterStart:.3,zoneSineRate:.035,zoneRippleRate:.075,zoneMainAmplitude:23,zoneRippleAmplitude:5,fishPullIntervalMinSeconds:5,fishPullIntervalMaxSeconds:8,fishPullDurationSeconds:1,fishPullDriftMultiplier:1.45},species:[{id:"bluegill",name:"Bluegill",rarity:"common",rarityColor:"#929d98",medianKg:.2,sigma:.35,minKg:.05,maxKg:1,baseWeight:50,depthGroup:"common",lengthK:37.6},{id:"rainbow-trout",name:"Rainbow Trout",rarity:"uncommon",rarityColor:"#55a66c",medianKg:.9,sigma:.5,minKg:.2,maxKg:6,baseWeight:25,depthGroup:"neutral",lengthK:51.8},{id:"largemouth-bass",name:"Largemouth Bass",rarity:"rare",rarityColor:"#4b8bc8",medianKg:1.2,sigma:.5,minKg:.3,maxKg:6,baseWeight:14,depthGroup:"rare",lengthK:42.4},{id:"common-carp",name:"Common Carp",rarity:"epic",rarityColor:"#a16bc2",medianKg:3.5,sigma:.55,minKg:.8,maxKg:20,baseWeight:8,depthGroup:"rare",lengthK:42},{id:"golden-koi",name:"Golden Koi",rarity:"legendary",rarityColor:"#d5a633",medianKg:3,sigma:.45,minKg:1,maxKg:12,baseWeight:3,depthGroup:"rare",lengthK:42}]};function Bh(i,t,e){const n=ut.reel,s=Math.max(0,Math.min(1,i));return{greenWidth:n.greenWidthMax+(n.greenWidthMin-n.greenWidthMax)*s,driftSpeed:n.driftSpeedMin+(n.driftSpeedMax-n.driftSpeedMin)*s,fillRate:n.fillRateMax+(n.fillRateMin-n.fillRateMax)*s,rarity:t,rarityColor:e}}class Zd{constructor(t){R(this,"socket");R(this,"handlers");R(this,"intentionalClose",!1);R(this,"simulation",this.readSimulation());R(this,"pingTimer",0);R(this,"pingId",0);R(this,"pendingPings",new Map);R(this,"rttMs",null);R(this,"jitterMs",0);R(this,"snapshotIntervalMs",ut.sync.nominalSnapshotIntervalMs);R(this,"snapshotJitterMs",0);R(this,"lastSnapshotAt",0);R(this,"serverOffsetMs",0);R(this,"hasServerOffset",!1);R(this,"serverOffsetSamples",[]);R(this,"snapshotTimes",[]);R(this,"droppedSimulatedMessages",0);R(this,"scheduledTimers",new Set);R(this,"pendingMoveTimer",0);R(this,"pendingMovePayload",null);this.handlers=t}connect(t,e,n){var o;this.intentionalClose=!1,(o=this.socket)==null||o.close();const r=`${location.protocol==="https:"?"wss:":"ws:"}//${location.host}/ws`,a=new WebSocket(r);this.socket=a,a.addEventListener("open",()=>{this.send({type:"join",room:t,name:e,resumeToken:n}),this.pingTimer=window.setInterval(()=>{const c=++this.pingId;this.pendingPings.set(c,Date.now());for(const[l,h]of this.pendingPings)Date.now()-h>15e3&&this.pendingPings.delete(l);this.send({type:"ping",id:c,clientTime:Date.now()})},2500)}),a.addEventListener("message",c=>this.scheduleReceive(String(c.data))),a.addEventListener("close",()=>{window.clearInterval(this.pingTimer),this.intentionalClose||this.handlers.disconnected()}),a.addEventListener("error",()=>{a.readyState===WebSocket.CONNECTING&&a.close()})}scheduleReceive(t){let e="";try{e=String(JSON.parse(t).type??"")}catch{return}this.shouldDrop(e,"receive")||window.setTimeout(()=>this.dispatch(t),this.simulatedDelay())}dispatch(t){let e;try{e=JSON.parse(t)}catch{return}switch(e.type){case"joined":this.handlers.joined(e);break;case"state":{const n=Date.now();if(this.lastSnapshotAt){const s=n-this.lastSnapshotAt;this.snapshotJitterMs=this.snapshotJitterMs*.8+Math.abs(s-this.snapshotIntervalMs)*.2,this.snapshotIntervalMs=this.snapshotIntervalMs*.8+s*.2}this.lastSnapshotAt=n}this.snapshotTimes.push(Date.now()),this.snapshotTimes=this.snapshotTimes.filter(n=>Date.now()-n<=1e3),this.handlers.state(e.players,Number(e.serverTime)||Date.now());break;case"player_joined":this.handlers.playerJoined(e.player,Number(e.serverTime)||Date.now());break;case"player_left":this.handlers.playerLeft(String(e.playerId));break;case"correction":this.handlers.correction(e);break;case"error":this.handlers.error(String(e.message));break;case"notice":this.handlers.notice(String(e.message));break;case"pong":{const n=Number(e.id),s=this.pendingPings.get(n);if(s!==void 0){const r=Date.now(),a=Number(e.serverReceiveTime),o=Number(e.serverSendTime),c=Math.max(0,o-a),l=Math.max(0,r-s-c);this.jitterMs=this.rttMs===null?0:this.jitterMs*.8+Math.abs(l-this.rttMs)*.2,this.rttMs=this.rttMs===null?l:this.rttMs*.8+l*.2;const h=(a-s+(o-r))/2;this.serverOffsetSamples.push(h),this.serverOffsetSamples.length>5&&this.serverOffsetSamples.shift();const u=[...this.serverOffsetSamples].sort((p,g)=>p-g),f=u[Math.floor(u.length/2)];this.serverOffsetMs=this.hasServerOffset?this.serverOffsetMs+(f-this.serverOffsetMs)*.2:f,this.hasServerOffset=!0,this.handlers.clockOffset(this.serverOffsetMs),this.pendingPings.delete(n)}break}case"fish_cast_broadcast":this.handlers.fishCast(e);break;case"fish_bite":this.handlers.fishBite(e);break;case"fish_reel":this.handlers.fishReel(e);break;case"fish_escaped":this.handlers.fishEscaped(String(e.playerId));break;case"reel_params":this.handlers.reelParams(e);break;case"reel_state":this.handlers.reelState(String(e.playerId),!!e.active);break;case"catch_result":this.handlers.catchResult(e);break;case"leaderboard_update":this.handlers.leaderboard(e.entries);break;case"crocodile_score":this.handlers.crocodileScore(e);break;case"portalEnter":this.handlers.portalEntered(e.arena);break;case"arenaState":this.handlers.arenaState(e.arena);break;case"arenaPartyState":this.handlers.arenaPartyState(e);break;case"arenaPartyInvite":this.handlers.arenaPartyInvite(e);break;case"arenaPartyClosed":this.handlers.arenaPartyClosed(e);break;case"monsterHit":this.handlers.monsterHit(e);break;case"playerDamaged":this.handlers.playerDamaged(e);break;case"monsterDied":this.handlers.monsterDied();break;case"playerDied":this.handlers.playerDied(Number(e.respawnAt));break;case"portalExit":this.handlers.portalExited(!!e.respawned);break;case"room_announcement":this.handlers.announcement(String(e.message));break;case"big_catch":this.handlers.bigCatch(e);break;case"stone_picked":this.handlers.stonePicked(String(e.stoneId),String(e.playerId));break;case"stone_thrown":this.handlers.stoneThrown(e);break;case"stone_landed":this.handlers.stoneLanded(e);break;case"stone_respawn":this.handlers.stoneRespawn(e);break;case"stone_hit":this.handlers.stoneHit(String(e.playerId),!!e.fishingCancelled);break;case"chicken_hit":this.handlers.chickenHit(e);break;case"chicken_state":this.handlers.chickenState(e.chickens,Number(e.serverTime)||Date.now());break;case"chat":this.handlers.chat(e.message);break;case"inventory_sync":this.handlers.inventorySync(e.items,Number(e.totalCaught)||0,e.personalBest,e.collection??[]);break;case"inventory_add":this.handlers.inventoryAdd(e.item);break;case"inventory_remove":this.handlers.inventoryRemove(String(e.catchId));break;case"player_holding":this.handlers.playerHolding(String(e.playerId),e.fish);break;case"campfire_cooking":this.handlers.campfireCooking(e.cooking);break;case"campfire_cooked":this.handlers.campfireCooked(e);break;case"weather:update":this.handlers.weatherChanged(e.weather);break}}diagnostics(){var s;const t=Date.now();this.snapshotTimes=this.snapshotTimes.filter(r=>t-r<=1e3);const e=this.rttMs===null?0:Math.min(150,this.rttMs/2),n=Math.max(ut.sync.interpolationDelayMinMs,Math.min(ut.sync.interpolationDelayMaxMs,ut.sync.interpolationIntervals*this.snapshotIntervalMs+this.snapshotJitterMs+e));return{rttMs:this.rttMs,jitterMs:this.jitterMs,snapshotsPerSecond:this.snapshotTimes.length,interpolationDelayMs:n,droppedSimulatedMessages:this.droppedSimulatedMessages,bufferedAmount:((s=this.socket)==null?void 0:s.bufferedAmount)??0,simulation:this.simulation}}readSimulation(){return new URLSearchParams(location.search),{lagMs:0,jitterMs:0,lossPercent:0}}simulatedDelay(){const t=(Math.random()*2-1)*this.simulation.jitterMs;return Math.max(0,this.simulation.lagMs+t)}shouldDrop(t,e){return this.simulation.lossPercent&&(e==="send"?t==="move":t==="state")&&Math.random()*100<this.simulation.lossPercent?(this.droppedSimulatedMessages+=1,!0):!1}sendMove(t,e,n,s,r,a,o=!1){this.send({type:"move",seq:t,x:e,z:n,rotY:s,moving:r,t:a,rttMs:this.rttMs??0,inPhotobooth:o})}castFish(t,e){this.send({type:"fish_cast",targetX:t,targetZ:e})}startReel(){this.send({type:"reel_start",rttMs:this.rttMs??0})}endReel(t){this.send({type:"reel_end",success:t})}cancelFishing(){this.send({type:"fish_cancel"})}sendChat(t){this.send({type:"chat",text:t})}pickStone(t){this.send({type:"stone_pickup",stoneId:t})}throwStone(){this.send({type:"stone_throw"})}setDebugWeather(t){this.send({type:"weather:debug",weatherType:t})}releaseFish(t){this.send({type:"inventory_release",catchId:t})}holdFish(t){this.send({type:"hold_fish",catchId:t})}cookFish(t){this.send({type:"campfire_cook",catchId:t})}createArenaParty(){this.send({type:"arenaPartyCreate"})}inviteArenaPartyPlayer(t){this.send({type:"arenaPartyInvite",playerId:t})}respondArenaPartyInvite(t,e){this.send({type:"arenaPartyRespond",partyId:t,accept:e})}leaveArenaParty(){this.send({type:"arenaPartyLeave"})}startArenaParty(){this.send({type:"arenaPartyStart"})}moveArena(t,e,n){this.send({type:"arenaMove",x:t,z:e,facing:n})}arenaStoneAction(){this.send({type:"arenaStoneAction"})}leaveArena(){this.send({type:"arenaLeave"})}restartArena(){this.send({type:"arenaRestart"})}close(){var t;this.intentionalClose=!0,window.clearInterval(this.pingTimer);for(const e of this.scheduledTimers)window.clearTimeout(e);this.scheduledTimers.clear(),this.pendingMoveTimer=0,this.pendingMovePayload=null,(t=this.socket)==null||t.close()}send(t){const e=this.socket;if((e==null?void 0:e.readyState)!==WebSocket.OPEN)return;const n=JSON.stringify(t);let s="";try{s=String(JSON.parse(n).type??"")}catch{}if(this.shouldDrop(s,"send"))return;if(s==="move"){if(this.pendingMovePayload=n,this.pendingMoveTimer)return;this.scheduleMoveSend(this.simulatedDelay());return}const r=window.setTimeout(()=>{this.scheduledTimers.delete(r),e.readyState===WebSocket.OPEN&&e.send(n)},this.simulatedDelay());this.scheduledTimers.add(r)}scheduleMoveSend(t){const e=this.socket;if(!e)return;const n=window.setTimeout(()=>{this.scheduledTimers.delete(n),this.pendingMoveTimer=0;const s=this.pendingMovePayload;if(!s||e.readyState!==WebSocket.OPEN){this.pendingMovePayload=null;return}if(e.bufferedAmount>ut.sync.maxBufferedMovementBytes){this.scheduleMoveSend(50);return}this.pendingMovePayload=null,e.send(s)},t);this.pendingMoveTimer=n,this.scheduledTimers.add(n)}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const lc="170",Jd=0,jc=1,jd=2,zh=1,Hh=2,On=3,di=0,qe=1,We=2,ai=0,ms=1,Qc=2,tl=3,el=4,Qd=5,wi=100,tu=101,eu=102,nu=103,iu=104,su=200,ru=201,au=202,ou=203,ho=204,uo=205,cu=206,lu=207,hu=208,du=209,uu=210,fu=211,pu=212,mu=213,gu=214,fo=0,po=1,mo=2,xs=3,go=4,vo=5,_o=6,xo=7,Gh=0,vu=1,_u=2,oi=0,xu=1,yu=2,Mu=3,hc=4,Su=5,bu=6,wu=7,Vh=300,ys=301,Ms=302,yo=303,Mo=304,da=306,So=1e3,Ti=1001,bo=1002,je=1003,Eu=1004,gr=1005,bn=1006,va=1007,Ai=1008,Wn=1009,Wh=1010,Xh=1011,er=1012,dc=1013,ki=1014,wn=1015,ur=1016,uc=1017,fc=1018,Ss=1020,qh=35902,Yh=1021,$h=1022,gn=1023,Kh=1024,Zh=1025,gs=1026,bs=1027,pc=1028,mc=1029,Jh=1030,gc=1031,vc=1033,Yr=33776,$r=33777,Kr=33778,Zr=33779,wo=35840,Eo=35841,To=35842,Ao=35843,Co=36196,Ro=37492,Po=37496,Lo=37808,Io=37809,Do=37810,Uo=37811,No=37812,Fo=37813,Oo=37814,ko=37815,Bo=37816,zo=37817,Ho=37818,Go=37819,Vo=37820,Wo=37821,Jr=36492,Xo=36494,qo=36495,jh=36283,Yo=36284,$o=36285,Ko=36286,Tu=3200,Au=3201,Qh=0,Cu=1,ei="",be="srgb",As="srgb-linear",ua="linear",ne="srgb",Zi=7680,nl=519,Ru=512,Pu=513,Lu=514,td=515,Iu=516,Du=517,Uu=518,Nu=519,il=35044,ed=35048,sl="300 es",Bn=2e3,na=2001;class Cs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Fe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let rl=1234567;const Ys=Math.PI/180,nr=180/Math.PI;function Rs(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Fe[i&255]+Fe[i>>8&255]+Fe[i>>16&255]+Fe[i>>24&255]+"-"+Fe[t&255]+Fe[t>>8&255]+"-"+Fe[t>>16&15|64]+Fe[t>>24&255]+"-"+Fe[e&63|128]+Fe[e>>8&255]+"-"+Fe[e>>16&255]+Fe[e>>24&255]+Fe[n&255]+Fe[n>>8&255]+Fe[n>>16&255]+Fe[n>>24&255]).toLowerCase()}function Ce(i,t,e){return Math.max(t,Math.min(e,i))}function _c(i,t){return(i%t+t)%t}function Fu(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Ou(i,t,e){return i!==t?(e-i)/(t-i):0}function $s(i,t,e){return(1-e)*i+e*t}function ku(i,t,e,n){return $s(i,t,1-Math.exp(-e*n))}function Bu(i,t=1){return t-Math.abs(_c(i,t*2)-t)}function zu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Hu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Gu(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Vu(i,t){return i+Math.random()*(t-i)}function Wu(i){return i*(.5-Math.random())}function Xu(i){i!==void 0&&(rl=i);let t=rl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function qu(i){return i*Ys}function Yu(i){return i*nr}function $u(i){return(i&i-1)===0&&i!==0}function Ku(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Zu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ju(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+n)/2),h=a((t+n)/2),u=r((t-n)/2),f=a((t-n)/2),p=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*h,c*u,c*f,o*l);break;case"YZY":i.set(c*f,o*h,c*u,o*l);break;case"ZXZ":i.set(c*u,c*f,o*h,o*l);break;case"XZX":i.set(o*h,c*g,c*p,o*l);break;case"YXY":i.set(c*p,o*h,c*g,o*l);break;case"ZYZ":i.set(c*g,c*p,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ds(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ze(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const mi={DEG2RAD:Ys,RAD2DEG:nr,generateUUID:Rs,clamp:Ce,euclideanModulo:_c,mapLinear:Fu,inverseLerp:Ou,lerp:$s,damp:ku,pingpong:Bu,smoothstep:zu,smootherstep:Hu,randInt:Gu,randFloat:Vu,randFloatSpread:Wu,seededRandom:Xu,degToRad:qu,radToDeg:Yu,isPowerOfTwo:$u,ceilPowerOfTwo:Ku,floorPowerOfTwo:Zu,setQuaternionFromProperEuler:Ju,normalize:ze,denormalize:ds};class mt{constructor(t=0,e=0){mt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ce(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Nt{constructor(t,e,n,s,r,a,o,c,l){Nt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],p=n[5],g=n[8],v=s[0],m=s[3],d=s[6],S=s[1],M=s[4],_=s[7],I=s[2],T=s[5],A=s[8];return r[0]=a*v+o*S+c*I,r[3]=a*m+o*M+c*T,r[6]=a*d+o*_+c*A,r[1]=l*v+h*S+u*I,r[4]=l*m+h*M+u*T,r[7]=l*d+h*_+u*A,r[2]=f*v+p*S+g*I,r[5]=f*m+p*M+g*T,r[8]=f*d+p*_+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=h*a-o*l,f=o*c-h*r,p=l*r-a*c,g=e*u+n*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(s*l-h*n)*v,t[2]=(o*n-s*a)*v,t[3]=f*v,t[4]=(h*e-s*c)*v,t[5]=(s*r-o*e)*v,t[6]=p*v,t[7]=(n*c-l*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(_a.makeScale(t,e)),this}rotate(t){return this.premultiply(_a.makeRotation(-t)),this}translate(t,e){return this.premultiply(_a.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const _a=new Nt;function nd(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function ir(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ju(){const i=ir("canvas");return i.style.display="block",i}const al={};function Vs(i){i in al||(al[i]=!0,console.warn(i))}function Qu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function tf(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function ef(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Yt={enabled:!0,workingColorSpace:As,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ne&&(i.r=Vn(i.r),i.g=Vn(i.g),i.b=Vn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ne&&(i.r=vs(i.r),i.g=vs(i.g),i.b=vs(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ei?ua:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Vn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function vs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const ol=[.64,.33,.3,.6,.15,.06],cl=[.2126,.7152,.0722],ll=[.3127,.329],hl=new Nt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),dl=new Nt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Yt.define({[As]:{primaries:ol,whitePoint:ll,transfer:ua,toXYZ:hl,fromXYZ:dl,luminanceCoefficients:cl,workingColorSpaceConfig:{unpackColorSpace:be},outputColorSpaceConfig:{drawingBufferColorSpace:be}},[be]:{primaries:ol,whitePoint:ll,transfer:ne,toXYZ:hl,fromXYZ:dl,luminanceCoefficients:cl,outputColorSpaceConfig:{drawingBufferColorSpace:be}}});let Ji;class nf{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ji===void 0&&(Ji=ir("canvas")),Ji.width=t.width,Ji.height=t.height;const n=Ji.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ji}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ir("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Vn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Vn(e[n]/255)*255):e[n]=Vn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let sf=0;class id{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:sf++}),this.uuid=Rs(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(xa(s[a].image)):r.push(xa(s[a]))}else r=xa(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function xa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?nf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let rf=0;class De extends Cs{constructor(t=De.DEFAULT_IMAGE,e=De.DEFAULT_MAPPING,n=Ti,s=Ti,r=bn,a=Ai,o=gn,c=Wn,l=De.DEFAULT_ANISOTROPY,h=ei){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:rf++}),this.uuid=Rs(),this.name="",this.source=new id(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new mt(0,0),this.repeat=new mt(1,1),this.center=new mt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Vh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case So:t.x=t.x-Math.floor(t.x);break;case Ti:t.x=t.x<0?0:1;break;case bo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case So:t.y=t.y-Math.floor(t.y);break;case Ti:t.y=t.y<0?0:1;break;case bo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}De.DEFAULT_IMAGE=null;De.DEFAULT_MAPPING=Vh;De.DEFAULT_ANISOTROPY=1;class se{constructor(t=0,e=0,n=0,s=1){se.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],p=c[5],g=c[9],v=c[2],m=c[6],d=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(l+1)/2,_=(p+1)/2,I=(d+1)/2,T=(h+f)/4,A=(u+v)/4,L=(g+m)/4;return M>_&&M>I?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=T/n,r=A/n):_>I?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=T/s,r=L/s):I<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(I),n=A/r,s=L/r),this.set(n,s,r,e),this}let S=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(f-h)*(f-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(u-v)/S,this.z=(f-h)/S,this.w=Math.acos((l+p+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class af extends Cs{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new se(0,0,t,e),this.scissorTest=!1,this.viewport=new se(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new De(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new id(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Bi extends af{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class sd extends De{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=je,this.minFilter=je,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class of extends De{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=je,this.minFilter=je,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class fr{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const f=r[a+0],p=r[a+1],g=r[a+2],v=r[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=p,t[e+2]=g,t[e+3]=v;return}if(u!==v||c!==f||l!==p||h!==g){let m=1-o;const d=c*f+l*p+h*g+u*v,S=d>=0?1:-1,M=1-d*d;if(M>Number.EPSILON){const I=Math.sqrt(M),T=Math.atan2(I,d*S);m=Math.sin(m*T)/I,o=Math.sin(o*T)/I}const _=o*S;if(c=c*m+f*_,l=l*m+p*_,h=h*m+g*_,u=u*m+v*_,m===1-o){const I=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=I,l*=I,h*=I,u*=I}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[a],f=r[a+1],p=r[a+2],g=r[a+3];return t[e]=o*g+h*u+c*p-l*f,t[e+1]=c*g+h*f+l*u-o*p,t[e+2]=l*g+h*p+o*f-c*u,t[e+3]=h*g-o*u-c*f-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),u=o(r/2),f=c(n/2),p=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=f*h*u+l*p*g,this._y=l*p*u-f*h*g,this._z=l*h*g+f*p*u,this._w=l*h*u-f*p*g;break;case"YXZ":this._x=f*h*u+l*p*g,this._y=l*p*u-f*h*g,this._z=l*h*g-f*p*u,this._w=l*h*u+f*p*g;break;case"ZXY":this._x=f*h*u-l*p*g,this._y=l*p*u+f*h*g,this._z=l*h*g+f*p*u,this._w=l*h*u-f*p*g;break;case"ZYX":this._x=f*h*u-l*p*g,this._y=l*p*u+f*h*g,this._z=l*h*g-f*p*u,this._w=l*h*u+f*p*g;break;case"YZX":this._x=f*h*u+l*p*g,this._y=l*p*u+f*h*g,this._z=l*h*g-f*p*u,this._w=l*h*u-f*p*g;break;case"XZY":this._x=f*h*u-l*p*g,this._y=l*p*u-f*h*g,this._z=l*h*g+f*p*u,this._w=l*h*u+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=n+o+u;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(a-s)*p}else if(n>o&&n>u){const p=2*Math.sqrt(1+n-o-u);this._w=(h-c)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+l)/p}else if(o>u){const p=2*Math.sqrt(1+o-n-u);this._w=(r-l)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+u-n-o);this._w=(a-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ce(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const p=1-e;return this._w=p*a+e*this._w,this._x=p*n+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(t=0,e=0,n=0){C.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ul.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ul.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),h=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=s+c*u+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ya.copy(this).projectOnVector(t),this.sub(ya)}reflect(t){return this.sub(ya.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ce(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ya=new C,ul=new fr;class Wi{constructor(t=new C(1/0,1/0,1/0),e=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(hn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(hn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=hn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,hn):hn.fromBufferAttribute(r,a),hn.applyMatrix4(t.matrixWorld),this.expandByPoint(hn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),vr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),vr.copy(n.boundingBox)),vr.applyMatrix4(t.matrixWorld),this.union(vr)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,hn),hn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ns),_r.subVectors(this.max,Ns),ji.subVectors(t.a,Ns),Qi.subVectors(t.b,Ns),ts.subVectors(t.c,Ns),$n.subVectors(Qi,ji),Kn.subVectors(ts,Qi),gi.subVectors(ji,ts);let e=[0,-$n.z,$n.y,0,-Kn.z,Kn.y,0,-gi.z,gi.y,$n.z,0,-$n.x,Kn.z,0,-Kn.x,gi.z,0,-gi.x,-$n.y,$n.x,0,-Kn.y,Kn.x,0,-gi.y,gi.x,0];return!Ma(e,ji,Qi,ts,_r)||(e=[1,0,0,0,1,0,0,0,1],!Ma(e,ji,Qi,ts,_r))?!1:(xr.crossVectors($n,Kn),e=[xr.x,xr.y,xr.z],Ma(e,ji,Qi,ts,_r))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,hn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(hn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(In[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),In[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),In[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),In[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),In[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),In[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),In[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),In[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(In),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const In=[new C,new C,new C,new C,new C,new C,new C,new C],hn=new C,vr=new Wi,ji=new C,Qi=new C,ts=new C,$n=new C,Kn=new C,gi=new C,Ns=new C,_r=new C,xr=new C,vi=new C;function Ma(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){vi.fromArray(i,r);const o=s.x*Math.abs(vi.x)+s.y*Math.abs(vi.y)+s.z*Math.abs(vi.z),c=t.dot(vi),l=e.dot(vi),h=n.dot(vi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const cf=new Wi,Fs=new C,Sa=new C;class Xi{constructor(t=new C,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):cf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Fs.subVectors(t,this.center);const e=Fs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Fs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Sa.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Fs.copy(t.center).add(Sa)),this.expandByPoint(Fs.copy(t.center).sub(Sa))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Dn=new C,ba=new C,yr=new C,Zn=new C,wa=new C,Mr=new C,Ea=new C;class xc{constructor(t=new C,e=new C(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Dn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Dn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Dn.copy(this.origin).addScaledVector(this.direction,e),Dn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){ba.copy(t).add(e).multiplyScalar(.5),yr.copy(e).sub(t).normalize(),Zn.copy(this.origin).sub(ba);const r=t.distanceTo(e)*.5,a=-this.direction.dot(yr),o=Zn.dot(this.direction),c=-Zn.dot(yr),l=Zn.lengthSq(),h=Math.abs(1-a*a);let u,f,p,g;if(h>0)if(u=a*c-o,f=a*o-c,g=r*h,u>=0)if(f>=-g)if(f<=g){const v=1/h;u*=v,f*=v,p=u*(u+a*f+2*o)+f*(a*u+f+2*c)+l}else f=r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-c),r),p=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),p=f*(f+2*c)+l):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-c),r),p=-u*u+f*(f+2*c)+l);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(ba).addScaledVector(yr,f),p}intersectSphere(t,e){Dn.subVectors(t.center,this.origin);const n=Dn.dot(this.direction),s=Dn.dot(Dn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Dn)!==null}intersectTriangle(t,e,n,s,r){wa.subVectors(e,t),Mr.subVectors(n,t),Ea.crossVectors(wa,Mr);let a=this.direction.dot(Ea),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Zn.subVectors(this.origin,t);const c=o*this.direction.dot(Mr.crossVectors(Zn,Mr));if(c<0)return null;const l=o*this.direction.dot(wa.cross(Zn));if(l<0||c+l>a)return null;const h=-o*Zn.dot(Ea);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class jt{constructor(t,e,n,s,r,a,o,c,l,h,u,f,p,g,v,m){jt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,h,u,f,p,g,v,m)}set(t,e,n,s,r,a,o,c,l,h,u,f,p,g,v,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=h,d[10]=u,d[14]=f,d[3]=p,d[7]=g,d[11]=v,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new jt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/es.setFromMatrixColumn(t,0).length(),r=1/es.setFromMatrixColumn(t,1).length(),a=1/es.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=a*h,p=a*u,g=o*h,v=o*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=p+g*l,e[5]=f-v*l,e[9]=-o*c,e[2]=v-f*l,e[6]=g+p*l,e[10]=a*c}else if(t.order==="YXZ"){const f=c*h,p=c*u,g=l*h,v=l*u;e[0]=f+v*o,e[4]=g*o-p,e[8]=a*l,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=p*o-g,e[6]=v+f*o,e[10]=a*c}else if(t.order==="ZXY"){const f=c*h,p=c*u,g=l*h,v=l*u;e[0]=f-v*o,e[4]=-a*u,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*h,e[9]=v-f*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const f=a*h,p=a*u,g=o*h,v=o*u;e[0]=c*h,e[4]=g*l-p,e[8]=f*l+v,e[1]=c*u,e[5]=v*l+f,e[9]=p*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const f=a*c,p=a*l,g=o*c,v=o*l;e[0]=c*h,e[4]=v-f*u,e[8]=g*u+p,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=p*u+g,e[10]=f-v*u}else if(t.order==="XZY"){const f=a*c,p=a*l,g=o*c,v=o*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+v,e[5]=a*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=o*h,e[10]=v*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(lf,t,hf)}lookAt(t,e,n){const s=this.elements;return $e.subVectors(t,e),$e.lengthSq()===0&&($e.z=1),$e.normalize(),Jn.crossVectors(n,$e),Jn.lengthSq()===0&&(Math.abs(n.z)===1?$e.x+=1e-4:$e.z+=1e-4,$e.normalize(),Jn.crossVectors(n,$e)),Jn.normalize(),Sr.crossVectors($e,Jn),s[0]=Jn.x,s[4]=Sr.x,s[8]=$e.x,s[1]=Jn.y,s[5]=Sr.y,s[9]=$e.y,s[2]=Jn.z,s[6]=Sr.z,s[10]=$e.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],p=n[13],g=n[2],v=n[6],m=n[10],d=n[14],S=n[3],M=n[7],_=n[11],I=n[15],T=s[0],A=s[4],L=s[8],w=s[12],y=s[1],P=s[5],H=s[9],z=s[13],X=s[2],Z=s[6],W=s[10],j=s[14],V=s[3],at=s[7],ft=s[11],wt=s[15];return r[0]=a*T+o*y+c*X+l*V,r[4]=a*A+o*P+c*Z+l*at,r[8]=a*L+o*H+c*W+l*ft,r[12]=a*w+o*z+c*j+l*wt,r[1]=h*T+u*y+f*X+p*V,r[5]=h*A+u*P+f*Z+p*at,r[9]=h*L+u*H+f*W+p*ft,r[13]=h*w+u*z+f*j+p*wt,r[2]=g*T+v*y+m*X+d*V,r[6]=g*A+v*P+m*Z+d*at,r[10]=g*L+v*H+m*W+d*ft,r[14]=g*w+v*z+m*j+d*wt,r[3]=S*T+M*y+_*X+I*V,r[7]=S*A+M*P+_*Z+I*at,r[11]=S*L+M*H+_*W+I*ft,r[15]=S*w+M*z+_*j+I*wt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],p=t[14],g=t[3],v=t[7],m=t[11],d=t[15];return g*(+r*c*u-s*l*u-r*o*f+n*l*f+s*o*p-n*c*p)+v*(+e*c*p-e*l*f+r*a*f-s*a*p+s*l*h-r*c*h)+m*(+e*l*u-e*o*p-r*a*u+n*a*p+r*o*h-n*l*h)+d*(-s*o*h-e*c*u+e*o*f+s*a*u-n*a*f+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],p=t[11],g=t[12],v=t[13],m=t[14],d=t[15],S=u*m*l-v*f*l+v*c*p-o*m*p-u*c*d+o*f*d,M=g*f*l-h*m*l-g*c*p+a*m*p+h*c*d-a*f*d,_=h*v*l-g*u*l+g*o*p-a*v*p-h*o*d+a*u*d,I=g*u*c-h*v*c-g*o*f+a*v*f+h*o*m-a*u*m,T=e*S+n*M+s*_+r*I;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/T;return t[0]=S*A,t[1]=(v*f*r-u*m*r-v*s*p+n*m*p+u*s*d-n*f*d)*A,t[2]=(o*m*r-v*c*r+v*s*l-n*m*l-o*s*d+n*c*d)*A,t[3]=(u*c*r-o*f*r-u*s*l+n*f*l+o*s*p-n*c*p)*A,t[4]=M*A,t[5]=(h*m*r-g*f*r+g*s*p-e*m*p-h*s*d+e*f*d)*A,t[6]=(g*c*r-a*m*r-g*s*l+e*m*l+a*s*d-e*c*d)*A,t[7]=(a*f*r-h*c*r+h*s*l-e*f*l-a*s*p+e*c*p)*A,t[8]=_*A,t[9]=(g*u*r-h*v*r-g*n*p+e*v*p+h*n*d-e*u*d)*A,t[10]=(a*v*r-g*o*r+g*n*l-e*v*l-a*n*d+e*o*d)*A,t[11]=(h*o*r-a*u*r-h*n*l+e*u*l+a*n*p-e*o*p)*A,t[12]=I*A,t[13]=(h*v*s-g*u*s+g*n*f-e*v*f-h*n*m+e*u*m)*A,t[14]=(g*o*s-a*v*s-g*n*c+e*v*c+a*n*m-e*o*m)*A,t[15]=(a*u*s-h*o*s+h*n*c-e*u*c-a*n*f+e*o*f)*A,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,u=o+o,f=r*l,p=r*h,g=r*u,v=a*h,m=a*u,d=o*u,S=c*l,M=c*h,_=c*u,I=n.x,T=n.y,A=n.z;return s[0]=(1-(v+d))*I,s[1]=(p+_)*I,s[2]=(g-M)*I,s[3]=0,s[4]=(p-_)*T,s[5]=(1-(f+d))*T,s[6]=(m+S)*T,s[7]=0,s[8]=(g+M)*A,s[9]=(m-S)*A,s[10]=(1-(f+v))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=es.set(s[0],s[1],s[2]).length();const a=es.set(s[4],s[5],s[6]).length(),o=es.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],dn.copy(this);const l=1/r,h=1/a,u=1/o;return dn.elements[0]*=l,dn.elements[1]*=l,dn.elements[2]*=l,dn.elements[4]*=h,dn.elements[5]*=h,dn.elements[6]*=h,dn.elements[8]*=u,dn.elements[9]*=u,dn.elements[10]*=u,e.setFromRotationMatrix(dn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=Bn){const c=this.elements,l=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s);let p,g;if(o===Bn)p=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===na)p=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Bn){const c=this.elements,l=1/(e-t),h=1/(n-s),u=1/(a-r),f=(e+t)*l,p=(n+s)*h;let g,v;if(o===Bn)g=(a+r)*u,v=-2*u;else if(o===na)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=v,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const es=new C,dn=new jt,lf=new C(0,0,0),hf=new C(1,1,1),Jn=new C,Sr=new C,$e=new C,fl=new jt,pl=new fr;class An{constructor(t=0,e=0,n=0,s=An.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Ce(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ce(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ce(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ce(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ce(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ce(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return fl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(fl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return pl.setFromEuler(this),this.setFromQuaternion(pl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}An.DEFAULT_ORDER="XYZ";class rd{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let df=0;const ml=new C,ns=new fr,Un=new jt,br=new C,Os=new C,uf=new C,ff=new fr,gl=new C(1,0,0),vl=new C(0,1,0),_l=new C(0,0,1),xl={type:"added"},pf={type:"removed"},is={type:"childadded",child:null},Ta={type:"childremoved",child:null};class xe extends Cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:df++}),this.uuid=Rs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xe.DEFAULT_UP.clone();const t=new C,e=new An,n=new fr,s=new C(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new jt},normalMatrix:{value:new Nt}}),this.matrix=new jt,this.matrixWorld=new jt,this.matrixAutoUpdate=xe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new rd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ns.setFromAxisAngle(t,e),this.quaternion.multiply(ns),this}rotateOnWorldAxis(t,e){return ns.setFromAxisAngle(t,e),this.quaternion.premultiply(ns),this}rotateX(t){return this.rotateOnAxis(gl,t)}rotateY(t){return this.rotateOnAxis(vl,t)}rotateZ(t){return this.rotateOnAxis(_l,t)}translateOnAxis(t,e){return ml.copy(t).applyQuaternion(this.quaternion),this.position.add(ml.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(gl,t)}translateY(t){return this.translateOnAxis(vl,t)}translateZ(t){return this.translateOnAxis(_l,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Un.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?br.copy(t):br.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Os.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Un.lookAt(Os,br,this.up):Un.lookAt(br,Os,this.up),this.quaternion.setFromRotationMatrix(Un),s&&(Un.extractRotation(s.matrixWorld),ns.setFromRotationMatrix(Un),this.quaternion.premultiply(ns.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(xl),is.child=t,this.dispatchEvent(is),is.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(pf),Ta.child=t,this.dispatchEvent(Ta),Ta.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Un.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Un.multiply(t.parent.matrixWorld)),t.applyMatrix4(Un),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(xl),is.child=t,this.dispatchEvent(is),is.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,t,uf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,ff,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}xe.DEFAULT_UP=new C(0,1,0);xe.DEFAULT_MATRIX_AUTO_UPDATE=!0;xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const un=new C,Nn=new C,Aa=new C,Fn=new C,ss=new C,rs=new C,yl=new C,Ca=new C,Ra=new C,Pa=new C,La=new se,Ia=new se,Da=new se;class mn{constructor(t=new C,e=new C,n=new C){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),un.subVectors(t,e),s.cross(un);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){un.subVectors(s,e),Nn.subVectors(n,e),Aa.subVectors(t,e);const a=un.dot(un),o=un.dot(Nn),c=un.dot(Aa),l=Nn.dot(Nn),h=Nn.dot(Aa),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,p=(l*c-o*h)*f,g=(a*h-o*c)*f;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Fn)===null?!1:Fn.x>=0&&Fn.y>=0&&Fn.x+Fn.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,Fn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Fn.x),c.addScaledVector(a,Fn.y),c.addScaledVector(o,Fn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return La.setScalar(0),Ia.setScalar(0),Da.setScalar(0),La.fromBufferAttribute(t,e),Ia.fromBufferAttribute(t,n),Da.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(La,r.x),a.addScaledVector(Ia,r.y),a.addScaledVector(Da,r.z),a}static isFrontFacing(t,e,n,s){return un.subVectors(n,e),Nn.subVectors(t,e),un.cross(Nn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return un.subVectors(this.c,this.b),Nn.subVectors(this.a,this.b),un.cross(Nn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return mn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return mn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return mn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return mn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return mn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;ss.subVectors(s,n),rs.subVectors(r,n),Ca.subVectors(t,n);const c=ss.dot(Ca),l=rs.dot(Ca);if(c<=0&&l<=0)return e.copy(n);Ra.subVectors(t,s);const h=ss.dot(Ra),u=rs.dot(Ra);if(h>=0&&u<=h)return e.copy(s);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(ss,a);Pa.subVectors(t,r);const p=ss.dot(Pa),g=rs.dot(Pa);if(g>=0&&p<=g)return e.copy(r);const v=p*l-c*g;if(v<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(n).addScaledVector(rs,o);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return yl.subVectors(r,s),o=(u-h)/(u-h+(p-g)),e.copy(s).addScaledVector(yl,o);const d=1/(m+v+f);return a=v*d,o=f*d,e.copy(n).addScaledVector(ss,a).addScaledVector(rs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const ad={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},jn={h:0,s:0,l:0},wr={h:0,s:0,l:0};function Ua(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Pt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=be){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Yt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=Yt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Yt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=Yt.workingColorSpace){if(t=_c(t,1),e=Ce(e,0,1),n=Ce(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Ua(a,r,t+1/3),this.g=Ua(a,r,t),this.b=Ua(a,r,t-1/3)}return Yt.toWorkingColorSpace(this,s),this}setStyle(t,e=be){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=be){const n=ad[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Vn(t.r),this.g=Vn(t.g),this.b=Vn(t.b),this}copyLinearToSRGB(t){return this.r=vs(t.r),this.g=vs(t.g),this.b=vs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=be){return Yt.fromWorkingColorSpace(Oe.copy(this),t),Math.round(Ce(Oe.r*255,0,255))*65536+Math.round(Ce(Oe.g*255,0,255))*256+Math.round(Ce(Oe.b*255,0,255))}getHexString(t=be){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Yt.workingColorSpace){Yt.fromWorkingColorSpace(Oe.copy(this),e);const n=Oe.r,s=Oe.g,r=Oe.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Yt.workingColorSpace){return Yt.fromWorkingColorSpace(Oe.copy(this),e),t.r=Oe.r,t.g=Oe.g,t.b=Oe.b,t}getStyle(t=be){Yt.fromWorkingColorSpace(Oe.copy(this),t);const e=Oe.r,n=Oe.g,s=Oe.b;return t!==be?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(jn),this.setHSL(jn.h+t,jn.s+e,jn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(jn),t.getHSL(wr);const n=$s(jn.h,wr.h,e),s=$s(jn.s,wr.s,e),r=$s(jn.l,wr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Oe=new Pt;Pt.NAMES=ad;let mf=0;class qi extends Cs{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mf++}),this.uuid=Rs(),this.name="",this.blending=ms,this.side=di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ho,this.blendDst=uo,this.blendEquation=wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pt(0,0,0),this.blendAlpha=0,this.depthFunc=xs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=nl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zi,this.stencilZFail=Zi,this.stencilZPass=Zi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ms&&(n.blending=this.blending),this.side!==di&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ho&&(n.blendSrc=this.blendSrc),this.blendDst!==uo&&(n.blendDst=this.blendDst),this.blendEquation!==wi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==xs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==nl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Zi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Zi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Zi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class vn extends qi{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Pt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new An,this.combine=Gh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Me=new C,Er=new mt;class an{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=il,this.updateRanges=[],this.gpuType=wn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Er.fromBufferAttribute(this,e),Er.applyMatrix3(t),this.setXY(e,Er.x,Er.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix3(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix4(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyNormalMatrix(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.transformDirection(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ds(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ze(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ds(e,this.array)),e}setX(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ds(e,this.array)),e}setY(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ds(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ds(e,this.array)),e}setW(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ze(e,this.array),n=ze(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ze(e,this.array),n=ze(n,this.array),s=ze(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ze(e,this.array),n=ze(n,this.array),s=ze(s,this.array),r=ze(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==il&&(t.usage=this.usage),t}}class od extends an{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class cd extends an{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ce extends an{constructor(t,e,n){super(new Float32Array(t),e,n)}}let gf=0;const en=new jt,Na=new xe,as=new C,Ke=new Wi,ks=new Wi,Te=new C;class Ue extends Cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gf++}),this.uuid=Rs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(nd(t)?cd:od)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Nt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return en.makeRotationFromQuaternion(t),this.applyMatrix4(en),this}rotateX(t){return en.makeRotationX(t),this.applyMatrix4(en),this}rotateY(t){return en.makeRotationY(t),this.applyMatrix4(en),this}rotateZ(t){return en.makeRotationZ(t),this.applyMatrix4(en),this}translate(t,e,n){return en.makeTranslation(t,e,n),this.applyMatrix4(en),this}scale(t,e,n){return en.makeScale(t,e,n),this.applyMatrix4(en),this}lookAt(t){return Na.lookAt(t),Na.updateMatrix(),this.applyMatrix4(Na.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(as).negate(),this.translate(as.x,as.y,as.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ce(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Ke.setFromBufferAttribute(r),this.morphTargetsRelative?(Te.addVectors(this.boundingBox.min,Ke.min),this.boundingBox.expandByPoint(Te),Te.addVectors(this.boundingBox.max,Ke.max),this.boundingBox.expandByPoint(Te)):(this.boundingBox.expandByPoint(Ke.min),this.boundingBox.expandByPoint(Ke.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Xi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(t){const n=this.boundingSphere.center;if(Ke.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];ks.setFromBufferAttribute(o),this.morphTargetsRelative?(Te.addVectors(Ke.min,ks.min),Ke.expandByPoint(Te),Te.addVectors(Ke.max,ks.max),Ke.expandByPoint(Te)):(Ke.expandByPoint(ks.min),Ke.expandByPoint(ks.max))}Ke.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Te.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Te));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Te.fromBufferAttribute(o,l),c&&(as.fromBufferAttribute(t,l),Te.add(as)),s=Math.max(s,n.distanceToSquared(Te))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new an(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let L=0;L<n.count;L++)o[L]=new C,c[L]=new C;const l=new C,h=new C,u=new C,f=new mt,p=new mt,g=new mt,v=new C,m=new C;function d(L,w,y){l.fromBufferAttribute(n,L),h.fromBufferAttribute(n,w),u.fromBufferAttribute(n,y),f.fromBufferAttribute(r,L),p.fromBufferAttribute(r,w),g.fromBufferAttribute(r,y),h.sub(l),u.sub(l),p.sub(f),g.sub(f);const P=1/(p.x*g.y-g.x*p.y);isFinite(P)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(P),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(P),o[L].add(v),o[w].add(v),o[y].add(v),c[L].add(m),c[w].add(m),c[y].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let L=0,w=S.length;L<w;++L){const y=S[L],P=y.start,H=y.count;for(let z=P,X=P+H;z<X;z+=3)d(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const M=new C,_=new C,I=new C,T=new C;function A(L){I.fromBufferAttribute(s,L),T.copy(I);const w=o[L];M.copy(w),M.sub(I.multiplyScalar(I.dot(w))).normalize(),_.crossVectors(T,w);const P=_.dot(c[L])<0?-1:1;a.setXYZW(L,M.x,M.y,M.z,P)}for(let L=0,w=S.length;L<w;++L){const y=S[L],P=y.start,H=y.count;for(let z=P,X=P+H;z<X;z+=3)A(t.getX(z+0)),A(t.getX(z+1)),A(t.getX(z+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new an(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const s=new C,r=new C,a=new C,o=new C,c=new C,l=new C,h=new C,u=new C;if(t)for(let f=0,p=t.count;f<p;f+=3){const g=t.getX(f+0),v=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,p=e.count;f<p;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Te.fromBufferAttribute(t,e),Te.normalize(),t.setXYZ(e,Te.x,Te.y,Te.z)}toNonIndexed(){function t(o,c){const l=o.array,h=o.itemSize,u=o.normalized,f=new l.constructor(c.length*h);let p=0,g=0;for(let v=0,m=c.length;v<m;v++){o.isInterleavedBufferAttribute?p=c[v]*o.data.stride+o.offset:p=c[v]*h;for(let d=0;d<h;d++)f[g++]=l[p++]}return new an(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ue,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){const f=l[h],p=t(f,n);c.push(p)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const p=l[u];h.push(p.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,h=a.length;l<h;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ml=new jt,_i=new xc,Tr=new Xi,Sl=new C,Ar=new C,Cr=new C,Rr=new C,Fa=new C,Pr=new C,bl=new C,Lr=new C;class Q extends xe{constructor(t=new Ue,e=new vn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Pr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],u=r[c];h!==0&&(Fa.fromBufferAttribute(u,t),a?Pr.addScaledVector(Fa,h):Pr.addScaledVector(Fa.sub(e),h))}e.add(Pr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Tr.copy(n.boundingSphere),Tr.applyMatrix4(r),_i.copy(t.ray).recast(t.near),!(Tr.containsPoint(_i.origin)===!1&&(_i.intersectSphere(Tr,Sl)===null||_i.origin.distanceToSquared(Sl)>(t.far-t.near)**2))&&(Ml.copy(r).invert(),_i.copy(t.ray).applyMatrix4(Ml),!(n.boundingBox!==null&&_i.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,_i)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],d=a[m.materialIndex],S=Math.max(m.start,p.start),M=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let _=S,I=M;_<I;_+=3){const T=o.getX(_),A=o.getX(_+1),L=o.getX(_+2);s=Ir(this,d,t,n,l,h,u,T,A,L),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=g,d=v;m<d;m+=3){const S=o.getX(m),M=o.getX(m+1),_=o.getX(m+2);s=Ir(this,a,t,n,l,h,u,S,M,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],d=a[m.materialIndex],S=Math.max(m.start,p.start),M=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let _=S,I=M;_<I;_+=3){const T=_,A=_+1,L=_+2;s=Ir(this,d,t,n,l,h,u,T,A,L),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(c.count,p.start+p.count);for(let m=g,d=v;m<d;m+=3){const S=m,M=m+1,_=m+2;s=Ir(this,a,t,n,l,h,u,S,M,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function vf(i,t,e,n,s,r,a,o){let c;if(t.side===qe?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===di,o),c===null)return null;Lr.copy(o),Lr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Lr);return l<e.near||l>e.far?null:{distance:l,point:Lr.clone(),object:i}}function Ir(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,Ar),i.getVertexPosition(c,Cr),i.getVertexPosition(l,Rr);const h=vf(i,t,e,n,Ar,Cr,Rr,bl);if(h){const u=new C;mn.getBarycoord(bl,Ar,Cr,Rr,u),s&&(h.uv=mn.getInterpolatedAttribute(s,o,c,l,u,new mt)),r&&(h.uv1=mn.getInterpolatedAttribute(r,o,c,l,u,new mt)),a&&(h.normal=mn.getInterpolatedAttribute(a,o,c,l,u,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:c,c:l,normal:new C,materialIndex:0};mn.getNormal(Ar,Cr,Rr,f.normal),h.face=f,h.barycoord=u}return h}class Se extends Ue{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],u=[];let f=0,p=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ce(l,3)),this.setAttribute("normal",new ce(h,3)),this.setAttribute("uv",new ce(u,2));function g(v,m,d,S,M,_,I,T,A,L,w){const y=_/A,P=I/L,H=_/2,z=I/2,X=T/2,Z=A+1,W=L+1;let j=0,V=0;const at=new C;for(let ft=0;ft<W;ft++){const wt=ft*P-z;for(let Bt=0;Bt<Z;Bt++){const re=Bt*y-H;at[v]=re*S,at[m]=wt*M,at[d]=X,l.push(at.x,at.y,at.z),at[v]=0,at[m]=0,at[d]=T>0?1:-1,h.push(at.x,at.y,at.z),u.push(Bt/A),u.push(1-ft/L),j+=1}}for(let ft=0;ft<L;ft++)for(let wt=0;wt<A;wt++){const Bt=f+wt+Z*ft,re=f+wt+Z*(ft+1),Y=f+(wt+1)+Z*(ft+1),nt=f+(wt+1)+Z*ft;c.push(Bt,re,nt),c.push(re,Y,nt),V+=6}o.addGroup(p,V,w),p+=V,f+=j}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Se(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ws(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function He(i){const t={};for(let e=0;e<i.length;e++){const n=ws(i[e]);for(const s in n)t[s]=n[s]}return t}function _f(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function ld(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Yt.workingColorSpace}const xf={clone:ws,merge:He};var yf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Mf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ui extends qi{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yf,this.fragmentShader=Mf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ws(t.uniforms),this.uniformsGroups=_f(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class hd extends xe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new jt,this.projectionMatrix=new jt,this.projectionMatrixInverse=new jt,this.coordinateSystem=Bn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Qn=new C,wl=new mt,El=new mt;class Pe extends hd{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=nr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ys*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return nr*2*Math.atan(Math.tan(Ys*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Qn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Qn.x,Qn.y).multiplyScalar(-t/Qn.z),Qn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Qn.x,Qn.y).multiplyScalar(-t/Qn.z)}getViewSize(t,e){return this.getViewBounds(t,wl,El),e.subVectors(El,wl)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ys*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const os=-90,cs=1;class Sf extends xe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Pe(os,cs,t,e);s.layers=this.layers,this.add(s);const r=new Pe(os,cs,t,e);r.layers=this.layers,this.add(r);const a=new Pe(os,cs,t,e);a.layers=this.layers,this.add(a);const o=new Pe(os,cs,t,e);o.layers=this.layers,this.add(o);const c=new Pe(os,cs,t,e);c.layers=this.layers,this.add(c);const l=new Pe(os,cs,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===Bn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===na)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class dd extends De{constructor(t,e,n,s,r,a,o,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:ys,super(t,e,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class bf extends Bi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new dd(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:bn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Se(5,5,5),r=new ui({name:"CubemapFromEquirect",uniforms:ws(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:qe,blending:ai});r.uniforms.tEquirect.value=e;const a=new Q(s,r),o=e.minFilter;return e.minFilter===Ai&&(e.minFilter=bn),new Sf(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const Oa=new C,wf=new C,Ef=new Nt;class Si{constructor(t=new C(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Oa.subVectors(n,e).cross(wf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Oa),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Ef.getNormalMatrix(t),s=this.coplanarPoint(Oa).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const xi=new Xi,Dr=new C;class yc{constructor(t=new Si,e=new Si,n=new Si,s=new Si,r=new Si,a=new Si){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Bn){const n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],c=s[3],l=s[4],h=s[5],u=s[6],f=s[7],p=s[8],g=s[9],v=s[10],m=s[11],d=s[12],S=s[13],M=s[14],_=s[15];if(n[0].setComponents(c-r,f-l,m-p,_-d).normalize(),n[1].setComponents(c+r,f+l,m+p,_+d).normalize(),n[2].setComponents(c+a,f+h,m+g,_+S).normalize(),n[3].setComponents(c-a,f-h,m-g,_-S).normalize(),n[4].setComponents(c-o,f-u,m-v,_-M).normalize(),e===Bn)n[5].setComponents(c+o,f+u,m+v,_+M).normalize();else if(e===na)n[5].setComponents(o,u,v,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),xi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),xi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(xi)}intersectsSprite(t){return xi.center.set(0,0,0),xi.radius=.7071067811865476,xi.applyMatrix4(t.matrixWorld),this.intersectsSphere(xi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Dr.x=s.normal.x>0?t.max.x:t.min.x,Dr.y=s.normal.y>0?t.max.y:t.min.y,Dr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Dr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ud(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Tf(i){const t=new WeakMap;function e(o,c){const l=o.array,h=o.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),o.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,o),u.length===0)i.bufferSubData(l,0,h);else{u.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<u.length;p++){const g=u[f],v=u[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,u[f]=v)}u.length=f+1;for(let p=0,g=u.length;p<g;p++){const v=u[p];i.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}class Ii extends Ue{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,u=t/o,f=e/c,p=[],g=[],v=[],m=[];for(let d=0;d<h;d++){const S=d*f-a;for(let M=0;M<l;M++){const _=M*u-r;g.push(_,-S,0),v.push(0,0,1),m.push(M/o),m.push(1-d/c)}}for(let d=0;d<c;d++)for(let S=0;S<o;S++){const M=S+l*d,_=S+l*(d+1),I=S+1+l*(d+1),T=S+1+l*d;p.push(M,_,T),p.push(_,I,T)}this.setIndex(p),this.setAttribute("position",new ce(g,3)),this.setAttribute("normal",new ce(v,3)),this.setAttribute("uv",new ce(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ii(t.width,t.height,t.widthSegments,t.heightSegments)}}var Af=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Cf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Rf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Pf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Lf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,If=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Df=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Uf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Nf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Ff=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Of=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,kf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Bf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,zf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Hf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Gf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Vf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Wf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Xf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Yf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,$f=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Kf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Zf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Jf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,jf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Qf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,tp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ep=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,np=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ip="gl_FragColor = linearToOutputTexel( gl_FragColor );",sp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,rp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ap=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,op=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,cp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,lp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,hp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,dp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,up=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,pp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,mp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,gp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_p=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,xp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,yp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Mp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Sp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,bp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ep=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Tp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ap=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Cp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Rp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Pp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ip=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Dp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Up=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Np=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Fp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Op=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,kp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Bp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,zp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Hp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Vp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Xp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,qp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$p=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Kp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Zp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Jp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,jp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Qp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,tm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,em=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,nm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,im=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,sm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,rm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,am=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,om=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,cm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,lm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,hm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,dm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,um=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,fm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,pm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,mm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,gm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_m=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ym=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Mm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Sm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,bm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,wm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Em=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Tm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Am=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Im=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Dm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Um=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Nm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Fm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Om=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,km=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Bm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,zm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Hm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Xm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Ym=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,$m=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Km=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Jm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,eg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ng=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ig=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,rg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ot={alphahash_fragment:Af,alphahash_pars_fragment:Cf,alphamap_fragment:Rf,alphamap_pars_fragment:Pf,alphatest_fragment:Lf,alphatest_pars_fragment:If,aomap_fragment:Df,aomap_pars_fragment:Uf,batching_pars_vertex:Nf,batching_vertex:Ff,begin_vertex:Of,beginnormal_vertex:kf,bsdfs:Bf,iridescence_fragment:zf,bumpmap_pars_fragment:Hf,clipping_planes_fragment:Gf,clipping_planes_pars_fragment:Vf,clipping_planes_pars_vertex:Wf,clipping_planes_vertex:Xf,color_fragment:qf,color_pars_fragment:Yf,color_pars_vertex:$f,color_vertex:Kf,common:Zf,cube_uv_reflection_fragment:Jf,defaultnormal_vertex:jf,displacementmap_pars_vertex:Qf,displacementmap_vertex:tp,emissivemap_fragment:ep,emissivemap_pars_fragment:np,colorspace_fragment:ip,colorspace_pars_fragment:sp,envmap_fragment:rp,envmap_common_pars_fragment:ap,envmap_pars_fragment:op,envmap_pars_vertex:cp,envmap_physical_pars_fragment:xp,envmap_vertex:lp,fog_vertex:hp,fog_pars_vertex:dp,fog_fragment:up,fog_pars_fragment:fp,gradientmap_pars_fragment:pp,lightmap_pars_fragment:mp,lights_lambert_fragment:gp,lights_lambert_pars_fragment:vp,lights_pars_begin:_p,lights_toon_fragment:yp,lights_toon_pars_fragment:Mp,lights_phong_fragment:Sp,lights_phong_pars_fragment:bp,lights_physical_fragment:wp,lights_physical_pars_fragment:Ep,lights_fragment_begin:Tp,lights_fragment_maps:Ap,lights_fragment_end:Cp,logdepthbuf_fragment:Rp,logdepthbuf_pars_fragment:Pp,logdepthbuf_pars_vertex:Lp,logdepthbuf_vertex:Ip,map_fragment:Dp,map_pars_fragment:Up,map_particle_fragment:Np,map_particle_pars_fragment:Fp,metalnessmap_fragment:Op,metalnessmap_pars_fragment:kp,morphinstance_vertex:Bp,morphcolor_vertex:zp,morphnormal_vertex:Hp,morphtarget_pars_vertex:Gp,morphtarget_vertex:Vp,normal_fragment_begin:Wp,normal_fragment_maps:Xp,normal_pars_fragment:qp,normal_pars_vertex:Yp,normal_vertex:$p,normalmap_pars_fragment:Kp,clearcoat_normal_fragment_begin:Zp,clearcoat_normal_fragment_maps:Jp,clearcoat_pars_fragment:jp,iridescence_pars_fragment:Qp,opaque_fragment:tm,packing:em,premultiplied_alpha_fragment:nm,project_vertex:im,dithering_fragment:sm,dithering_pars_fragment:rm,roughnessmap_fragment:am,roughnessmap_pars_fragment:om,shadowmap_pars_fragment:cm,shadowmap_pars_vertex:lm,shadowmap_vertex:hm,shadowmask_pars_fragment:dm,skinbase_vertex:um,skinning_pars_vertex:fm,skinning_vertex:pm,skinnormal_vertex:mm,specularmap_fragment:gm,specularmap_pars_fragment:vm,tonemapping_fragment:_m,tonemapping_pars_fragment:xm,transmission_fragment:ym,transmission_pars_fragment:Mm,uv_pars_fragment:Sm,uv_pars_vertex:bm,uv_vertex:wm,worldpos_vertex:Em,background_vert:Tm,background_frag:Am,backgroundCube_vert:Cm,backgroundCube_frag:Rm,cube_vert:Pm,cube_frag:Lm,depth_vert:Im,depth_frag:Dm,distanceRGBA_vert:Um,distanceRGBA_frag:Nm,equirect_vert:Fm,equirect_frag:Om,linedashed_vert:km,linedashed_frag:Bm,meshbasic_vert:zm,meshbasic_frag:Hm,meshlambert_vert:Gm,meshlambert_frag:Vm,meshmatcap_vert:Wm,meshmatcap_frag:Xm,meshnormal_vert:qm,meshnormal_frag:Ym,meshphong_vert:$m,meshphong_frag:Km,meshphysical_vert:Zm,meshphysical_frag:Jm,meshtoon_vert:jm,meshtoon_frag:Qm,points_vert:tg,points_frag:eg,shadow_vert:ng,shadow_frag:ig,sprite_vert:sg,sprite_frag:rg},st={common:{diffuse:{value:new Pt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Nt}},envmap:{envMap:{value:null},envMapRotation:{value:new Nt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Nt},normalScale:{value:new mt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Pt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0},uvTransform:{value:new Nt}},sprite:{diffuse:{value:new Pt(16777215)},opacity:{value:1},center:{value:new mt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}}},Mn={basic:{uniforms:He([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.fog]),vertexShader:Ot.meshbasic_vert,fragmentShader:Ot.meshbasic_frag},lambert:{uniforms:He([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new Pt(0)}}]),vertexShader:Ot.meshlambert_vert,fragmentShader:Ot.meshlambert_frag},phong:{uniforms:He([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new Pt(0)},specular:{value:new Pt(1118481)},shininess:{value:30}}]),vertexShader:Ot.meshphong_vert,fragmentShader:Ot.meshphong_frag},standard:{uniforms:He([st.common,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.roughnessmap,st.metalnessmap,st.fog,st.lights,{emissive:{value:new Pt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag},toon:{uniforms:He([st.common,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.gradientmap,st.fog,st.lights,{emissive:{value:new Pt(0)}}]),vertexShader:Ot.meshtoon_vert,fragmentShader:Ot.meshtoon_frag},matcap:{uniforms:He([st.common,st.bumpmap,st.normalmap,st.displacementmap,st.fog,{matcap:{value:null}}]),vertexShader:Ot.meshmatcap_vert,fragmentShader:Ot.meshmatcap_frag},points:{uniforms:He([st.points,st.fog]),vertexShader:Ot.points_vert,fragmentShader:Ot.points_frag},dashed:{uniforms:He([st.common,st.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ot.linedashed_vert,fragmentShader:Ot.linedashed_frag},depth:{uniforms:He([st.common,st.displacementmap]),vertexShader:Ot.depth_vert,fragmentShader:Ot.depth_frag},normal:{uniforms:He([st.common,st.bumpmap,st.normalmap,st.displacementmap,{opacity:{value:1}}]),vertexShader:Ot.meshnormal_vert,fragmentShader:Ot.meshnormal_frag},sprite:{uniforms:He([st.sprite,st.fog]),vertexShader:Ot.sprite_vert,fragmentShader:Ot.sprite_frag},background:{uniforms:{uvTransform:{value:new Nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ot.background_vert,fragmentShader:Ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Nt}},vertexShader:Ot.backgroundCube_vert,fragmentShader:Ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ot.cube_vert,fragmentShader:Ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ot.equirect_vert,fragmentShader:Ot.equirect_frag},distanceRGBA:{uniforms:He([st.common,st.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ot.distanceRGBA_vert,fragmentShader:Ot.distanceRGBA_frag},shadow:{uniforms:He([st.lights,st.fog,{color:{value:new Pt(0)},opacity:{value:1}}]),vertexShader:Ot.shadow_vert,fragmentShader:Ot.shadow_frag}};Mn.physical={uniforms:He([Mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Nt},clearcoatNormalScale:{value:new mt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Nt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Nt},sheen:{value:0},sheenColor:{value:new Pt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Nt},transmissionSamplerSize:{value:new mt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Nt},attenuationDistance:{value:0},attenuationColor:{value:new Pt(0)},specularColor:{value:new Pt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Nt},anisotropyVector:{value:new mt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Nt}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag};const Ur={r:0,b:0,g:0},yi=new An,ag=new jt;function og(i,t,e,n,s,r,a){const o=new Pt(0);let c=r===!0?0:1,l,h,u=null,f=0,p=null;function g(S){let M=S.isScene===!0?S.background:null;return M&&M.isTexture&&(M=(S.backgroundBlurriness>0?e:t).get(M)),M}function v(S){let M=!1;const _=g(S);_===null?d(o,c):_&&_.isColor&&(d(_,1),M=!0);const I=i.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,a):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(S,M){const _=g(M);_&&(_.isCubeTexture||_.mapping===da)?(h===void 0&&(h=new Q(new Se(1,1,1),new ui({name:"BackgroundCubeMaterial",uniforms:ws(Mn.backgroundCube.uniforms),vertexShader:Mn.backgroundCube.vertexShader,fragmentShader:Mn.backgroundCube.fragmentShader,side:qe,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(I,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),yi.copy(M.backgroundRotation),yi.x*=-1,yi.y*=-1,yi.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(yi.y*=-1,yi.z*=-1),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(ag.makeRotationFromEuler(yi)),h.material.toneMapped=Yt.getTransfer(_.colorSpace)!==ne,(u!==_||f!==_.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,u=_,f=_.version,p=i.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new Q(new Ii(2,2),new ui({name:"BackgroundMaterial",uniforms:ws(Mn.background.uniforms),vertexShader:Mn.background.vertexShader,fragmentShader:Mn.background.fragmentShader,side:di,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=Yt.getTransfer(_.colorSpace)!==ne,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||f!==_.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,u=_,f=_.version,p=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function d(S,M){S.getRGB(Ur,ld(i)),n.buffers.color.setClear(Ur.r,Ur.g,Ur.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(S,M=1){o.set(S),c=M,d(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,d(o,c)},render:v,addToRenderList:m}}function cg(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,a=!1;function o(y,P,H,z,X){let Z=!1;const W=u(z,H,P);r!==W&&(r=W,l(r.object)),Z=p(y,z,H,X),Z&&g(y,z,H,X),X!==null&&t.update(X,i.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,_(y,P,H,z),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function c(){return i.createVertexArray()}function l(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function u(y,P,H){const z=H.wireframe===!0;let X=n[y.id];X===void 0&&(X={},n[y.id]=X);let Z=X[P.id];Z===void 0&&(Z={},X[P.id]=Z);let W=Z[z];return W===void 0&&(W=f(c()),Z[z]=W),W}function f(y){const P=[],H=[],z=[];for(let X=0;X<e;X++)P[X]=0,H[X]=0,z[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:H,attributeDivisors:z,object:y,attributes:{},index:null}}function p(y,P,H,z){const X=r.attributes,Z=P.attributes;let W=0;const j=H.getAttributes();for(const V in j)if(j[V].location>=0){const ft=X[V];let wt=Z[V];if(wt===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(wt=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(wt=y.instanceColor)),ft===void 0||ft.attribute!==wt||wt&&ft.data!==wt.data)return!0;W++}return r.attributesNum!==W||r.index!==z}function g(y,P,H,z){const X={},Z=P.attributes;let W=0;const j=H.getAttributes();for(const V in j)if(j[V].location>=0){let ft=Z[V];ft===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(ft=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(ft=y.instanceColor));const wt={};wt.attribute=ft,ft&&ft.data&&(wt.data=ft.data),X[V]=wt,W++}r.attributes=X,r.attributesNum=W,r.index=z}function v(){const y=r.newAttributes;for(let P=0,H=y.length;P<H;P++)y[P]=0}function m(y){d(y,0)}function d(y,P){const H=r.newAttributes,z=r.enabledAttributes,X=r.attributeDivisors;H[y]=1,z[y]===0&&(i.enableVertexAttribArray(y),z[y]=1),X[y]!==P&&(i.vertexAttribDivisor(y,P),X[y]=P)}function S(){const y=r.newAttributes,P=r.enabledAttributes;for(let H=0,z=P.length;H<z;H++)P[H]!==y[H]&&(i.disableVertexAttribArray(H),P[H]=0)}function M(y,P,H,z,X,Z,W){W===!0?i.vertexAttribIPointer(y,P,H,X,Z):i.vertexAttribPointer(y,P,H,z,X,Z)}function _(y,P,H,z){v();const X=z.attributes,Z=H.getAttributes(),W=P.defaultAttributeValues;for(const j in Z){const V=Z[j];if(V.location>=0){let at=X[j];if(at===void 0&&(j==="instanceMatrix"&&y.instanceMatrix&&(at=y.instanceMatrix),j==="instanceColor"&&y.instanceColor&&(at=y.instanceColor)),at!==void 0){const ft=at.normalized,wt=at.itemSize,Bt=t.get(at);if(Bt===void 0)continue;const re=Bt.buffer,Y=Bt.type,nt=Bt.bytesPerElement,Mt=Y===i.INT||Y===i.UNSIGNED_INT||at.gpuType===dc;if(at.isInterleavedBufferAttribute){const ot=at.data,Ct=ot.stride,It=at.offset;if(ot.isInstancedInterleavedBuffer){for(let zt=0;zt<V.locationSize;zt++)d(V.location+zt,ot.meshPerAttribute);y.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let zt=0;zt<V.locationSize;zt++)m(V.location+zt);i.bindBuffer(i.ARRAY_BUFFER,re);for(let zt=0;zt<V.locationSize;zt++)M(V.location+zt,wt/V.locationSize,Y,ft,Ct*nt,(It+wt/V.locationSize*zt)*nt,Mt)}else{if(at.isInstancedBufferAttribute){for(let ot=0;ot<V.locationSize;ot++)d(V.location+ot,at.meshPerAttribute);y.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let ot=0;ot<V.locationSize;ot++)m(V.location+ot);i.bindBuffer(i.ARRAY_BUFFER,re);for(let ot=0;ot<V.locationSize;ot++)M(V.location+ot,wt/V.locationSize,Y,ft,wt*nt,wt/V.locationSize*ot*nt,Mt)}}else if(W!==void 0){const ft=W[j];if(ft!==void 0)switch(ft.length){case 2:i.vertexAttrib2fv(V.location,ft);break;case 3:i.vertexAttrib3fv(V.location,ft);break;case 4:i.vertexAttrib4fv(V.location,ft);break;default:i.vertexAttrib1fv(V.location,ft)}}}}S()}function I(){L();for(const y in n){const P=n[y];for(const H in P){const z=P[H];for(const X in z)h(z[X].object),delete z[X];delete P[H]}delete n[y]}}function T(y){if(n[y.id]===void 0)return;const P=n[y.id];for(const H in P){const z=P[H];for(const X in z)h(z[X].object),delete z[X];delete P[H]}delete n[y.id]}function A(y){for(const P in n){const H=n[P];if(H[y.id]===void 0)continue;const z=H[y.id];for(const X in z)h(z[X].object),delete z[X];delete H[y.id]}}function L(){w(),a=!0,r!==s&&(r=s,l(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:L,resetDefaultState:w,dispose:I,releaseStatesOfGeometry:T,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:m,disableUnusedAttributes:S}}function lg(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function a(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function o(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,n,1)}function c(l,h,u,f){if(u===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)a(l[g],h[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*f[v];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function hg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==gn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const L=A===ur&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Wn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==wn&&!L)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),I=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:S,maxVaryings:M,maxFragmentUniforms:_,vertexTextures:I,maxSamples:T}}function dg(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new Si,o=new Nt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const p=u.length!==0||f||n!==0||s;return s=f,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,p){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,d=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const S=r?0:n,M=S*4;let _=d.clippingState||null;c.value=_,_=h(g,f,M,p);for(let I=0;I!==M;++I)_[I]=e[I];d.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,p,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=c.value,g!==!0||m===null){const d=p+v*4,S=f.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<d)&&(m=new Float32Array(d));for(let M=0,_=p;M!==v;++M,_+=4)a.copy(u[M]).applyMatrix4(S,o),a.normal.toArray(m,_),m[_+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function ug(i){let t=new WeakMap;function e(a,o){return o===yo?a.mapping=ys:o===Mo&&(a.mapping=Ms),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===yo||o===Mo)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new bf(c.height);return l.fromEquirectangularTexture(i,a),t.set(a,l),a.addEventListener("dispose",s),e(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class fd extends hd{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const fs=4,Tl=[.125,.215,.35,.446,.526,.582],Ei=20,ka=new fd,Al=new Pt;let Ba=null,za=0,Ha=0,Ga=!1;const bi=(1+Math.sqrt(5))/2,ls=1/bi,Cl=[new C(-bi,ls,0),new C(bi,ls,0),new C(-ls,0,bi),new C(ls,0,bi),new C(0,bi,-ls),new C(0,bi,ls),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)];class Rl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Ba=this._renderer.getRenderTarget(),za=this._renderer.getActiveCubeFace(),Ha=this._renderer.getActiveMipmapLevel(),Ga=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Il(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ll(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ba,za,Ha),this._renderer.xr.enabled=Ga,t.scissorTest=!1,Nr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ys||t.mapping===Ms?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ba=this._renderer.getRenderTarget(),za=this._renderer.getActiveCubeFace(),Ha=this._renderer.getActiveMipmapLevel(),Ga=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:bn,minFilter:bn,generateMipmaps:!1,type:ur,format:gn,colorSpace:As,depthBuffer:!1},s=Pl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Pl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=fg(r)),this._blurMaterial=pg(r,t,e)}return s}_compileMaterial(t){const e=new Q(this._lodPlanes[0],t);this._renderer.compile(e,ka)}_sceneToCubeUV(t,e,n,s){const o=new Pe(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Al),h.toneMapping=oi,h.autoClear=!1;const p=new vn({name:"PMREM.Background",side:qe,depthWrite:!1,depthTest:!1}),g=new Q(new Se,p);let v=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,v=!0):(p.color.copy(Al),v=!0);for(let d=0;d<6;d++){const S=d%3;S===0?(o.up.set(0,c[d],0),o.lookAt(l[d],0,0)):S===1?(o.up.set(0,0,c[d]),o.lookAt(0,l[d],0)):(o.up.set(0,c[d],0),o.lookAt(0,0,l[d]));const M=this._cubeSize;Nr(s,S*M,d>2?M:0,M,M),h.setRenderTarget(s),v&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===ys||t.mapping===Ms;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Il()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ll());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Q(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;Nr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,ka)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Cl[(s-r-1)%Cl.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Q(this._lodPlanes[s],l),f=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Ei-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):Ei;m>Ei&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ei}`);const d=[];let S=0;for(let A=0;A<Ei;++A){const L=A/v,w=Math.exp(-L*L/2);d.push(w),A===0?S+=w:A<m&&(S+=2*w)}for(let A=0;A<d.length;A++)d[A]=d[A]/S;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:M}=this;f.dTheta.value=g,f.mipInt.value=M-n;const _=this._sizeLods[s],I=3*_*(s>M-fs?s-M+fs:0),T=4*(this._cubeSize-_);Nr(e,I,T,3*_,2*_),c.setRenderTarget(e),c.render(u,ka)}}function fg(i){const t=[],e=[],n=[];let s=i;const r=i-fs+1+Tl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let c=1/o;a>i-fs?c=Tl[a-i+fs-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,v=3,m=2,d=1,S=new Float32Array(v*g*p),M=new Float32Array(m*g*p),_=new Float32Array(d*g*p);for(let T=0;T<p;T++){const A=T%3*2/3-1,L=T>2?0:-1,w=[A,L,0,A+2/3,L,0,A+2/3,L+1,0,A,L,0,A+2/3,L+1,0,A,L+1,0];S.set(w,v*g*T),M.set(f,m*g*T);const y=[T,T,T,T,T,T];_.set(y,d*g*T)}const I=new Ue;I.setAttribute("position",new an(S,v)),I.setAttribute("uv",new an(M,m)),I.setAttribute("faceIndex",new an(_,d)),t.push(I),s>fs&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Pl(i,t,e){const n=new Bi(i,t,e);return n.texture.mapping=da,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Nr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function pg(i,t,e){const n=new Float32Array(Ei),s=new C(0,1,0);return new ui({name:"SphericalGaussianBlur",defines:{n:Ei,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Mc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function Ll(){return new ui({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Mc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function Il(){return new ui({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Mc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function Mc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function mg(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===yo||c===Mo,h=c===ys||c===Ms;if(l||h){let u=t.get(o);const f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new Rl(i)),u=l?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const p=o.image;return l&&p&&p.height>0||h&&p&&s(p)?(e===null&&(e=new Rl(i)),u=l?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function gg(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Vs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function vg(i,t,e,n){const s={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const v=f.morphAttributes[g];for(let m=0,d=v.length;m<d;m++)t.remove(v[m])}f.removeEventListener("dispose",a),delete s[f.id];const p=r.get(f);p&&(t.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function c(u){const f=u.attributes;for(const g in f)t.update(f[g],i.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const v=p[g];for(let m=0,d=v.length;m<d;m++)t.update(v[m],i.ARRAY_BUFFER)}}function l(u){const f=[],p=u.index,g=u.attributes.position;let v=0;if(p!==null){const S=p.array;v=p.version;for(let M=0,_=S.length;M<_;M+=3){const I=S[M+0],T=S[M+1],A=S[M+2];f.push(I,T,T,A,A,I)}}else if(g!==void 0){const S=g.array;v=g.version;for(let M=0,_=S.length/3-1;M<_;M+=3){const I=M+0,T=M+1,A=M+2;f.push(I,T,T,A,A,I)}}else return;const m=new(nd(f)?cd:od)(f,1);m.version=v;const d=r.get(u);d&&t.remove(d),r.set(u,m)}function h(u){const f=r.get(u);if(f){const p=u.index;p!==null&&f.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function _g(i,t,e){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,p){i.drawElements(n,p,r,f*a),e.update(p,n,1)}function l(f,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,f*a,g),e.update(p,n,g))}function h(f,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];e.update(m,n,1)}function u(f,p,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)l(f[d]/a,p[d],v[d]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,f,0,v,0,g);let d=0;for(let S=0;S<g;S++)d+=p[S]*v[S];e.update(d,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function xg(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function yg(i,t,e){const n=new WeakMap,s=new se;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(o);if(f===void 0||f.count!==u){let y=function(){L.dispose(),n.delete(o),o.removeEventListener("dispose",y)};var p=y;f!==void 0&&f.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],S=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let _=0;g===!0&&(_=1),v===!0&&(_=2),m===!0&&(_=3);let I=o.attributes.position.count*_,T=1;I>t.maxTextureSize&&(T=Math.ceil(I/t.maxTextureSize),I=t.maxTextureSize);const A=new Float32Array(I*T*4*u),L=new sd(A,I,T,u);L.type=wn,L.needsUpdate=!0;const w=_*4;for(let P=0;P<u;P++){const H=d[P],z=S[P],X=M[P],Z=I*T*4*P;for(let W=0;W<H.count;W++){const j=W*w;g===!0&&(s.fromBufferAttribute(H,W),A[Z+j+0]=s.x,A[Z+j+1]=s.y,A[Z+j+2]=s.z,A[Z+j+3]=0),v===!0&&(s.fromBufferAttribute(z,W),A[Z+j+4]=s.x,A[Z+j+5]=s.y,A[Z+j+6]=s.z,A[Z+j+7]=0),m===!0&&(s.fromBufferAttribute(X,W),A[Z+j+8]=s.x,A[Z+j+9]=s.y,A[Z+j+10]=s.z,A[Z+j+11]=X.itemSize===4?s.w:1)}}f={count:u,texture:L,size:new mt(I,T)},n.set(o,f),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const v=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",v),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Mg(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}class pd extends De{constructor(t,e,n,s,r,a,o,c,l,h=gs){if(h!==gs&&h!==bs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===gs&&(n=ki),n===void 0&&h===bs&&(n=Ss),super(null,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:je,this.minFilter=c!==void 0?c:je,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const md=new De,Dl=new pd(1,1),gd=new sd,vd=new of,_d=new dd,Ul=[],Nl=[],Fl=new Float32Array(16),Ol=new Float32Array(9),kl=new Float32Array(4);function Ps(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Ul[s];if(r===void 0&&(r=new Float32Array(s),Ul[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function we(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ee(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function fa(i,t){let e=Nl[t];e===void 0&&(e=new Int32Array(t),Nl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Sg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function bg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;i.uniform2fv(this.addr,t),Ee(e,t)}}function wg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(we(e,t))return;i.uniform3fv(this.addr,t),Ee(e,t)}}function Eg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;i.uniform4fv(this.addr,t),Ee(e,t)}}function Tg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ee(e,t)}else{if(we(e,n))return;kl.set(n),i.uniformMatrix2fv(this.addr,!1,kl),Ee(e,n)}}function Ag(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ee(e,t)}else{if(we(e,n))return;Ol.set(n),i.uniformMatrix3fv(this.addr,!1,Ol),Ee(e,n)}}function Cg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ee(e,t)}else{if(we(e,n))return;Fl.set(n),i.uniformMatrix4fv(this.addr,!1,Fl),Ee(e,n)}}function Rg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Pg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;i.uniform2iv(this.addr,t),Ee(e,t)}}function Lg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;i.uniform3iv(this.addr,t),Ee(e,t)}}function Ig(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;i.uniform4iv(this.addr,t),Ee(e,t)}}function Dg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Ug(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;i.uniform2uiv(this.addr,t),Ee(e,t)}}function Ng(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;i.uniform3uiv(this.addr,t),Ee(e,t)}}function Fg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;i.uniform4uiv(this.addr,t),Ee(e,t)}}function Og(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Dl.compareFunction=td,r=Dl):r=md,e.setTexture2D(t||r,s)}function kg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||vd,s)}function Bg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||_d,s)}function zg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||gd,s)}function Hg(i){switch(i){case 5126:return Sg;case 35664:return bg;case 35665:return wg;case 35666:return Eg;case 35674:return Tg;case 35675:return Ag;case 35676:return Cg;case 5124:case 35670:return Rg;case 35667:case 35671:return Pg;case 35668:case 35672:return Lg;case 35669:case 35673:return Ig;case 5125:return Dg;case 36294:return Ug;case 36295:return Ng;case 36296:return Fg;case 35678:case 36198:case 36298:case 36306:case 35682:return Og;case 35679:case 36299:case 36307:return kg;case 35680:case 36300:case 36308:case 36293:return Bg;case 36289:case 36303:case 36311:case 36292:return zg}}function Gg(i,t){i.uniform1fv(this.addr,t)}function Vg(i,t){const e=Ps(t,this.size,2);i.uniform2fv(this.addr,e)}function Wg(i,t){const e=Ps(t,this.size,3);i.uniform3fv(this.addr,e)}function Xg(i,t){const e=Ps(t,this.size,4);i.uniform4fv(this.addr,e)}function qg(i,t){const e=Ps(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Yg(i,t){const e=Ps(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function $g(i,t){const e=Ps(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Kg(i,t){i.uniform1iv(this.addr,t)}function Zg(i,t){i.uniform2iv(this.addr,t)}function Jg(i,t){i.uniform3iv(this.addr,t)}function jg(i,t){i.uniform4iv(this.addr,t)}function Qg(i,t){i.uniform1uiv(this.addr,t)}function t0(i,t){i.uniform2uiv(this.addr,t)}function e0(i,t){i.uniform3uiv(this.addr,t)}function n0(i,t){i.uniform4uiv(this.addr,t)}function i0(i,t,e){const n=this.cache,s=t.length,r=fa(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||md,r[a])}function s0(i,t,e){const n=this.cache,s=t.length,r=fa(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||vd,r[a])}function r0(i,t,e){const n=this.cache,s=t.length,r=fa(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||_d,r[a])}function a0(i,t,e){const n=this.cache,s=t.length,r=fa(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||gd,r[a])}function o0(i){switch(i){case 5126:return Gg;case 35664:return Vg;case 35665:return Wg;case 35666:return Xg;case 35674:return qg;case 35675:return Yg;case 35676:return $g;case 5124:case 35670:return Kg;case 35667:case 35671:return Zg;case 35668:case 35672:return Jg;case 35669:case 35673:return jg;case 5125:return Qg;case 36294:return t0;case 36295:return e0;case 36296:return n0;case 35678:case 36198:case 36298:case 36306:case 35682:return i0;case 35679:case 36299:case 36307:return s0;case 35680:case 36300:case 36308:case 36293:return r0;case 36289:case 36303:case 36311:case 36292:return a0}}class c0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Hg(e.type)}}class l0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=o0(e.type)}}class h0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Va=/(\w+)(\])?(\[|\.)?/g;function Bl(i,t){i.seq.push(t),i.map[t.id]=t}function d0(i,t,e){const n=i.name,s=n.length;for(Va.lastIndex=0;;){const r=Va.exec(n),a=Va.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Bl(e,l===void 0?new c0(o,i,t):new l0(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new h0(o),Bl(e,u)),e=u}}}class jr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);d0(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function zl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const u0=37297;let f0=0;function p0(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Hl=new Nt;function m0(i){Yt._getMatrix(Hl,Yt.workingColorSpace,i);const t=`mat3( ${Hl.elements.map(e=>e.toFixed(4))} )`;switch(Yt.getTransfer(i)){case ua:return[t,"LinearTransferOETF"];case ne:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Gl(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+p0(i.getShaderSource(t),a)}else return s}function g0(i,t){const e=m0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function v0(i,t){let e;switch(t){case xu:e="Linear";break;case yu:e="Reinhard";break;case Mu:e="Cineon";break;case hc:e="ACESFilmic";break;case bu:e="AgX";break;case wu:e="Neutral";break;case Su:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Fr=new C;function _0(){Yt.getLuminanceCoefficients(Fr);const i=Fr.x.toFixed(4),t=Fr.y.toFixed(4),e=Fr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function x0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ws).join(`
`)}function y0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function M0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Ws(i){return i!==""}function Vl(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Wl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const S0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zo(i){return i.replace(S0,w0)}const b0=new Map;function w0(i,t){let e=Ot[t];if(e===void 0){const n=b0.get(t);if(n!==void 0)e=Ot[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Zo(e)}const E0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xl(i){return i.replace(E0,T0)}function T0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ql(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function A0(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===zh?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Hh?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===On&&(t="SHADOWMAP_TYPE_VSM"),t}function C0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ys:case Ms:t="ENVMAP_TYPE_CUBE";break;case da:t="ENVMAP_TYPE_CUBE_UV";break}return t}function R0(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ms:t="ENVMAP_MODE_REFRACTION";break}return t}function P0(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Gh:t="ENVMAP_BLENDING_MULTIPLY";break;case vu:t="ENVMAP_BLENDING_MIX";break;case _u:t="ENVMAP_BLENDING_ADD";break}return t}function L0(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function I0(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=A0(e),l=C0(e),h=R0(e),u=P0(e),f=L0(e),p=x0(e),g=y0(r),v=s.createProgram();let m,d,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ws).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ws).join(`
`),d.length>0&&(d+=`
`)):(m=[ql(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ws).join(`
`),d=[ql(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==oi?"#define TONE_MAPPING":"",e.toneMapping!==oi?Ot.tonemapping_pars_fragment:"",e.toneMapping!==oi?v0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ot.colorspace_pars_fragment,g0("linearToOutputTexel",e.outputColorSpace),_0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ws).join(`
`)),a=Zo(a),a=Vl(a,e),a=Wl(a,e),o=Zo(o),o=Vl(o,e),o=Wl(o,e),a=Xl(a),o=Xl(o),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===sl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===sl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const M=S+m+a,_=S+d+o,I=zl(s,s.VERTEX_SHADER,M),T=zl(s,s.FRAGMENT_SHADER,_);s.attachShader(v,I),s.attachShader(v,T),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function A(P){if(i.debug.checkShaderErrors){const H=s.getProgramInfoLog(v).trim(),z=s.getShaderInfoLog(I).trim(),X=s.getShaderInfoLog(T).trim();let Z=!0,W=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(Z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,I,T);else{const j=Gl(s,I,"vertex"),V=Gl(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+H+`
`+j+`
`+V)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(z===""||X==="")&&(W=!1);W&&(P.diagnostics={runnable:Z,programLog:H,vertexShader:{log:z,prefix:m},fragmentShader:{log:X,prefix:d}})}s.deleteShader(I),s.deleteShader(T),L=new jr(s,v),w=M0(s,v)}let L;this.getUniforms=function(){return L===void 0&&A(this),L};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(v,u0)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=f0++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=I,this.fragmentShader=T,this}let D0=0;class U0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new N0(t),e.set(t,n)),n}}class N0{constructor(t){this.id=D0++,this.code=t,this.usedTimes=0}}function F0(i,t,e,n,s,r,a){const o=new rd,c=new U0,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(w){return l.add(w),w===0?"uv":`uv${w}`}function m(w,y,P,H,z){const X=H.fog,Z=z.geometry,W=w.isMeshStandardMaterial?H.environment:null,j=(w.isMeshStandardMaterial?e:t).get(w.envMap||W),V=j&&j.mapping===da?j.image.height:null,at=g[w.type];w.precision!==null&&(p=s.getMaxPrecision(w.precision),p!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",p,"instead."));const ft=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,wt=ft!==void 0?ft.length:0;let Bt=0;Z.morphAttributes.position!==void 0&&(Bt=1),Z.morphAttributes.normal!==void 0&&(Bt=2),Z.morphAttributes.color!==void 0&&(Bt=3);let re,Y,nt,Mt;if(at){const Qt=Mn[at];re=Qt.vertexShader,Y=Qt.fragmentShader}else re=w.vertexShader,Y=w.fragmentShader,c.update(w),nt=c.getVertexShaderID(w),Mt=c.getFragmentShaderID(w);const ot=i.getRenderTarget(),Ct=i.state.buffers.depth.getReversed(),It=z.isInstancedMesh===!0,zt=z.isBatchedMesh===!0,ue=!!w.map,Xt=!!w.matcap,ye=!!j,F=!!w.aoMap,Qe=!!w.lightMap,Gt=!!w.bumpMap,Vt=!!w.normalMap,Tt=!!w.displacementMap,le=!!w.emissiveMap,Et=!!w.metalnessMap,E=!!w.roughnessMap,x=w.anisotropy>0,O=w.clearcoat>0,$=w.dispersion>0,J=w.iridescence>0,q=w.sheen>0,St=w.transmission>0,ct=x&&!!w.anisotropyMap,pt=O&&!!w.clearcoatMap,qt=O&&!!w.clearcoatNormalMap,tt=O&&!!w.clearcoatRoughnessMap,gt=J&&!!w.iridescenceMap,At=J&&!!w.iridescenceThicknessMap,Rt=q&&!!w.sheenColorMap,vt=q&&!!w.sheenRoughnessMap,Wt=!!w.specularMap,Ft=!!w.specularColorMap,ae=!!w.specularIntensityMap,D=St&&!!w.transmissionMap,rt=St&&!!w.thicknessMap,G=!!w.gradientMap,K=!!w.alphaMap,dt=w.alphaTest>0,lt=!!w.alphaHash,Dt=!!w.extensions;let ge=oi;w.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(ge=i.toneMapping);const Ne={shaderID:at,shaderType:w.type,shaderName:w.name,vertexShader:re,fragmentShader:Y,defines:w.defines,customVertexShaderID:nt,customFragmentShaderID:Mt,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:p,batching:zt,batchingColor:zt&&z._colorsTexture!==null,instancing:It,instancingColor:It&&z.instanceColor!==null,instancingMorph:It&&z.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ot===null?i.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:As,alphaToCoverage:!!w.alphaToCoverage,map:ue,matcap:Xt,envMap:ye,envMapMode:ye&&j.mapping,envMapCubeUVHeight:V,aoMap:F,lightMap:Qe,bumpMap:Gt,normalMap:Vt,displacementMap:f&&Tt,emissiveMap:le,normalMapObjectSpace:Vt&&w.normalMapType===Cu,normalMapTangentSpace:Vt&&w.normalMapType===Qh,metalnessMap:Et,roughnessMap:E,anisotropy:x,anisotropyMap:ct,clearcoat:O,clearcoatMap:pt,clearcoatNormalMap:qt,clearcoatRoughnessMap:tt,dispersion:$,iridescence:J,iridescenceMap:gt,iridescenceThicknessMap:At,sheen:q,sheenColorMap:Rt,sheenRoughnessMap:vt,specularMap:Wt,specularColorMap:Ft,specularIntensityMap:ae,transmission:St,transmissionMap:D,thicknessMap:rt,gradientMap:G,opaque:w.transparent===!1&&w.blending===ms&&w.alphaToCoverage===!1,alphaMap:K,alphaTest:dt,alphaHash:lt,combine:w.combine,mapUv:ue&&v(w.map.channel),aoMapUv:F&&v(w.aoMap.channel),lightMapUv:Qe&&v(w.lightMap.channel),bumpMapUv:Gt&&v(w.bumpMap.channel),normalMapUv:Vt&&v(w.normalMap.channel),displacementMapUv:Tt&&v(w.displacementMap.channel),emissiveMapUv:le&&v(w.emissiveMap.channel),metalnessMapUv:Et&&v(w.metalnessMap.channel),roughnessMapUv:E&&v(w.roughnessMap.channel),anisotropyMapUv:ct&&v(w.anisotropyMap.channel),clearcoatMapUv:pt&&v(w.clearcoatMap.channel),clearcoatNormalMapUv:qt&&v(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:tt&&v(w.clearcoatRoughnessMap.channel),iridescenceMapUv:gt&&v(w.iridescenceMap.channel),iridescenceThicknessMapUv:At&&v(w.iridescenceThicknessMap.channel),sheenColorMapUv:Rt&&v(w.sheenColorMap.channel),sheenRoughnessMapUv:vt&&v(w.sheenRoughnessMap.channel),specularMapUv:Wt&&v(w.specularMap.channel),specularColorMapUv:Ft&&v(w.specularColorMap.channel),specularIntensityMapUv:ae&&v(w.specularIntensityMap.channel),transmissionMapUv:D&&v(w.transmissionMap.channel),thicknessMapUv:rt&&v(w.thicknessMap.channel),alphaMapUv:K&&v(w.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(Vt||x),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!Z.attributes.uv&&(ue||K),fog:!!X,useFog:w.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ct,skinning:z.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:wt,morphTextureStride:Bt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:w.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:ge,decodeVideoTexture:ue&&w.map.isVideoTexture===!0&&Yt.getTransfer(w.map.colorSpace)===ne,decodeVideoTextureEmissive:le&&w.emissiveMap.isVideoTexture===!0&&Yt.getTransfer(w.emissiveMap.colorSpace)===ne,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===We,flipSided:w.side===qe,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Dt&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Dt&&w.extensions.multiDraw===!0||zt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Ne.vertexUv1s=l.has(1),Ne.vertexUv2s=l.has(2),Ne.vertexUv3s=l.has(3),l.clear(),Ne}function d(w){const y=[];if(w.shaderID?y.push(w.shaderID):(y.push(w.customVertexShaderID),y.push(w.customFragmentShaderID)),w.defines!==void 0)for(const P in w.defines)y.push(P),y.push(w.defines[P]);return w.isRawShaderMaterial===!1&&(S(y,w),M(y,w),y.push(i.outputColorSpace)),y.push(w.customProgramCacheKey),y.join()}function S(w,y){w.push(y.precision),w.push(y.outputColorSpace),w.push(y.envMapMode),w.push(y.envMapCubeUVHeight),w.push(y.mapUv),w.push(y.alphaMapUv),w.push(y.lightMapUv),w.push(y.aoMapUv),w.push(y.bumpMapUv),w.push(y.normalMapUv),w.push(y.displacementMapUv),w.push(y.emissiveMapUv),w.push(y.metalnessMapUv),w.push(y.roughnessMapUv),w.push(y.anisotropyMapUv),w.push(y.clearcoatMapUv),w.push(y.clearcoatNormalMapUv),w.push(y.clearcoatRoughnessMapUv),w.push(y.iridescenceMapUv),w.push(y.iridescenceThicknessMapUv),w.push(y.sheenColorMapUv),w.push(y.sheenRoughnessMapUv),w.push(y.specularMapUv),w.push(y.specularColorMapUv),w.push(y.specularIntensityMapUv),w.push(y.transmissionMapUv),w.push(y.thicknessMapUv),w.push(y.combine),w.push(y.fogExp2),w.push(y.sizeAttenuation),w.push(y.morphTargetsCount),w.push(y.morphAttributeCount),w.push(y.numDirLights),w.push(y.numPointLights),w.push(y.numSpotLights),w.push(y.numSpotLightMaps),w.push(y.numHemiLights),w.push(y.numRectAreaLights),w.push(y.numDirLightShadows),w.push(y.numPointLightShadows),w.push(y.numSpotLightShadows),w.push(y.numSpotLightShadowsWithMaps),w.push(y.numLightProbes),w.push(y.shadowMapType),w.push(y.toneMapping),w.push(y.numClippingPlanes),w.push(y.numClipIntersection),w.push(y.depthPacking)}function M(w,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),w.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),w.push(o.mask)}function _(w){const y=g[w.type];let P;if(y){const H=Mn[y];P=xf.clone(H.uniforms)}else P=w.uniforms;return P}function I(w,y){let P;for(let H=0,z=h.length;H<z;H++){const X=h[H];if(X.cacheKey===y){P=X,++P.usedTimes;break}}return P===void 0&&(P=new I0(i,y,w,r),h.push(P)),P}function T(w){if(--w.usedTimes===0){const y=h.indexOf(w);h[y]=h[h.length-1],h.pop(),w.destroy()}}function A(w){c.remove(w)}function L(){c.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:_,acquireProgram:I,releaseProgram:T,releaseShaderCache:A,programs:h,dispose:L}}function O0(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function k0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Yl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function $l(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u,f,p,g,v,m){let d=i[t];return d===void 0?(d={id:u.id,object:u,geometry:f,material:p,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},i[t]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=v,d.group=m),t++,d}function o(u,f,p,g,v,m){const d=a(u,f,p,g,v,m);p.transmission>0?n.push(d):p.transparent===!0?s.push(d):e.push(d)}function c(u,f,p,g,v,m){const d=a(u,f,p,g,v,m);p.transmission>0?n.unshift(d):p.transparent===!0?s.unshift(d):e.unshift(d)}function l(u,f){e.length>1&&e.sort(u||k0),n.length>1&&n.sort(f||Yl),s.length>1&&s.sort(f||Yl)}function h(){for(let u=t,f=i.length;u<f;u++){const p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:h,sort:l}}function B0(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new $l,i.set(n,[a])):s>=r.length?(a=new $l,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function z0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new C,color:new Pt};break;case"SpotLight":e={position:new C,direction:new C,color:new Pt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new C,color:new Pt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new C,skyColor:new Pt,groundColor:new Pt};break;case"RectAreaLight":e={color:new Pt,position:new C,halfWidth:new C,halfHeight:new C};break}return i[t.id]=e,e}}}function H0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let G0=0;function V0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function W0(i){const t=new z0,e=H0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new C);const s=new C,r=new jt,a=new jt;function o(l){let h=0,u=0,f=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let p=0,g=0,v=0,m=0,d=0,S=0,M=0,_=0,I=0,T=0,A=0;l.sort(V0);for(let w=0,y=l.length;w<y;w++){const P=l[w],H=P.color,z=P.intensity,X=P.distance,Z=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=H.r*z,u+=H.g*z,f+=H.b*z;else if(P.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(P.sh.coefficients[W],z);A++}else if(P.isDirectionalLight){const W=t.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const j=P.shadow,V=e.get(P);V.shadowIntensity=j.intensity,V.shadowBias=j.bias,V.shadowNormalBias=j.normalBias,V.shadowRadius=j.radius,V.shadowMapSize=j.mapSize,n.directionalShadow[p]=V,n.directionalShadowMap[p]=Z,n.directionalShadowMatrix[p]=P.shadow.matrix,S++}n.directional[p]=W,p++}else if(P.isSpotLight){const W=t.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(H).multiplyScalar(z),W.distance=X,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,n.spot[v]=W;const j=P.shadow;if(P.map&&(n.spotLightMap[I]=P.map,I++,j.updateMatrices(P),P.castShadow&&T++),n.spotLightMatrix[v]=j.matrix,P.castShadow){const V=e.get(P);V.shadowIntensity=j.intensity,V.shadowBias=j.bias,V.shadowNormalBias=j.normalBias,V.shadowRadius=j.radius,V.shadowMapSize=j.mapSize,n.spotShadow[v]=V,n.spotShadowMap[v]=Z,_++}v++}else if(P.isRectAreaLight){const W=t.get(P);W.color.copy(H).multiplyScalar(z),W.halfWidth.set(P.width*.5,0,0),W.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=W,m++}else if(P.isPointLight){const W=t.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),W.distance=P.distance,W.decay=P.decay,P.castShadow){const j=P.shadow,V=e.get(P);V.shadowIntensity=j.intensity,V.shadowBias=j.bias,V.shadowNormalBias=j.normalBias,V.shadowRadius=j.radius,V.shadowMapSize=j.mapSize,V.shadowCameraNear=j.camera.near,V.shadowCameraFar=j.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=Z,n.pointShadowMatrix[g]=P.shadow.matrix,M++}n.point[g]=W,g++}else if(P.isHemisphereLight){const W=t.get(P);W.skyColor.copy(P.color).multiplyScalar(z),W.groundColor.copy(P.groundColor).multiplyScalar(z),n.hemi[d]=W,d++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=st.LTC_FLOAT_1,n.rectAreaLTC2=st.LTC_FLOAT_2):(n.rectAreaLTC1=st.LTC_HALF_1,n.rectAreaLTC2=st.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const L=n.hash;(L.directionalLength!==p||L.pointLength!==g||L.spotLength!==v||L.rectAreaLength!==m||L.hemiLength!==d||L.numDirectionalShadows!==S||L.numPointShadows!==M||L.numSpotShadows!==_||L.numSpotMaps!==I||L.numLightProbes!==A)&&(n.directional.length=p,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=_+I-T,n.spotLightMap.length=I,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=A,L.directionalLength=p,L.pointLength=g,L.spotLength=v,L.rectAreaLength=m,L.hemiLength=d,L.numDirectionalShadows=S,L.numPointShadows=M,L.numSpotShadows=_,L.numSpotMaps=I,L.numLightProbes=A,n.version=G0++)}function c(l,h){let u=0,f=0,p=0,g=0,v=0;const m=h.matrixWorldInverse;for(let d=0,S=l.length;d<S;d++){const M=l[d];if(M.isDirectionalLight){const _=n.directional[u];_.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),u++}else if(M.isSpotLight){const _=n.spot[p];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),p++}else if(M.isRectAreaLight){const _=n.rectArea[g];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),_.halfWidth.set(M.width*.5,0,0),_.halfHeight.set(0,M.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const _=n.point[f];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const _=n.hemi[v];_.direction.setFromMatrixPosition(M.matrixWorld),_.direction.transformDirection(m),v++}}}return{setup:o,setupView:c,state:n}}function Kl(i){const t=new W0(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function X0(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Kl(i),t.set(s,[o])):r>=a.length?(o=new Kl(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class q0 extends qi{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Tu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Y0 extends qi{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const $0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,K0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Z0(i,t,e){let n=new yc;const s=new mt,r=new mt,a=new se,o=new q0({depthPacking:Au}),c=new Y0,l={},h=e.maxTextureSize,u={[di]:qe,[qe]:di,[We]:We},f=new ui({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new mt},radius:{value:4}},vertexShader:$0,fragmentShader:K0}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new Ue;g.setAttribute("position",new an(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Q(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=zh;let d=this.type;this.render=function(T,A,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const w=i.getRenderTarget(),y=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),H=i.state;H.setBlending(ai),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const z=d!==On&&this.type===On,X=d===On&&this.type!==On;for(let Z=0,W=T.length;Z<W;Z++){const j=T[Z],V=j.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const at=V.getFrameExtents();if(s.multiply(at),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/at.x),s.x=r.x*at.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/at.y),s.y=r.y*at.y,V.mapSize.y=r.y)),V.map===null||z===!0||X===!0){const wt=this.type!==On?{minFilter:je,magFilter:je}:{};V.map!==null&&V.map.dispose(),V.map=new Bi(s.x,s.y,wt),V.map.texture.name=j.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();const ft=V.getViewportCount();for(let wt=0;wt<ft;wt++){const Bt=V.getViewport(wt);a.set(r.x*Bt.x,r.y*Bt.y,r.x*Bt.z,r.y*Bt.w),H.viewport(a),V.updateMatrices(j,wt),n=V.getFrustum(),_(A,L,V.camera,j,this.type)}V.isPointLightShadow!==!0&&this.type===On&&S(V,L),V.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(w,y,P)};function S(T,A){const L=t.update(v);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Bi(s.x,s.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(A,null,L,f,v,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(A,null,L,p,v,null)}function M(T,A,L,w){let y=null;const P=L.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)y=P;else if(y=L.isPointLight===!0?c:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const H=y.uuid,z=A.uuid;let X=l[H];X===void 0&&(X={},l[H]=X);let Z=X[z];Z===void 0&&(Z=y.clone(),X[z]=Z,A.addEventListener("dispose",I)),y=Z}if(y.visible=A.visible,y.wireframe=A.wireframe,w===On?y.side=A.shadowSide!==null?A.shadowSide:A.side:y.side=A.shadowSide!==null?A.shadowSide:u[A.side],y.alphaMap=A.alphaMap,y.alphaTest=A.alphaTest,y.map=A.map,y.clipShadows=A.clipShadows,y.clippingPlanes=A.clippingPlanes,y.clipIntersection=A.clipIntersection,y.displacementMap=A.displacementMap,y.displacementScale=A.displacementScale,y.displacementBias=A.displacementBias,y.wireframeLinewidth=A.wireframeLinewidth,y.linewidth=A.linewidth,L.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const H=i.properties.get(y);H.light=L}return y}function _(T,A,L,w,y){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&y===On)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,T.matrixWorld);const z=t.update(T),X=T.material;if(Array.isArray(X)){const Z=z.groups;for(let W=0,j=Z.length;W<j;W++){const V=Z[W],at=X[V.materialIndex];if(at&&at.visible){const ft=M(T,at,w,y);T.onBeforeShadow(i,T,A,L,z,ft,V),i.renderBufferDirect(L,null,z,ft,T,V),T.onAfterShadow(i,T,A,L,z,ft,V)}}}else if(X.visible){const Z=M(T,X,w,y);T.onBeforeShadow(i,T,A,L,z,Z,null),i.renderBufferDirect(L,null,z,Z,T,null),T.onAfterShadow(i,T,A,L,z,Z,null)}}const H=T.children;for(let z=0,X=H.length;z<X;z++)_(H[z],A,L,w,y)}function I(T){T.target.removeEventListener("dispose",I);for(const L in l){const w=l[L],y=T.target.uuid;y in w&&(w[y].dispose(),delete w[y])}}}const J0={[fo]:po,[mo]:_o,[go]:xo,[xs]:vo,[po]:fo,[_o]:mo,[xo]:go,[vo]:xs};function j0(i,t){function e(){let D=!1;const rt=new se;let G=null;const K=new se(0,0,0,0);return{setMask:function(dt){G!==dt&&!D&&(i.colorMask(dt,dt,dt,dt),G=dt)},setLocked:function(dt){D=dt},setClear:function(dt,lt,Dt,ge,Ne){Ne===!0&&(dt*=ge,lt*=ge,Dt*=ge),rt.set(dt,lt,Dt,ge),K.equals(rt)===!1&&(i.clearColor(dt,lt,Dt,ge),K.copy(rt))},reset:function(){D=!1,G=null,K.set(-1,0,0,0)}}}function n(){let D=!1,rt=!1,G=null,K=null,dt=null;return{setReversed:function(lt){if(rt!==lt){const Dt=t.get("EXT_clip_control");rt?Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.ZERO_TO_ONE_EXT):Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.NEGATIVE_ONE_TO_ONE_EXT);const ge=dt;dt=null,this.setClear(ge)}rt=lt},getReversed:function(){return rt},setTest:function(lt){lt?ot(i.DEPTH_TEST):Ct(i.DEPTH_TEST)},setMask:function(lt){G!==lt&&!D&&(i.depthMask(lt),G=lt)},setFunc:function(lt){if(rt&&(lt=J0[lt]),K!==lt){switch(lt){case fo:i.depthFunc(i.NEVER);break;case po:i.depthFunc(i.ALWAYS);break;case mo:i.depthFunc(i.LESS);break;case xs:i.depthFunc(i.LEQUAL);break;case go:i.depthFunc(i.EQUAL);break;case vo:i.depthFunc(i.GEQUAL);break;case _o:i.depthFunc(i.GREATER);break;case xo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}K=lt}},setLocked:function(lt){D=lt},setClear:function(lt){dt!==lt&&(rt&&(lt=1-lt),i.clearDepth(lt),dt=lt)},reset:function(){D=!1,G=null,K=null,dt=null,rt=!1}}}function s(){let D=!1,rt=null,G=null,K=null,dt=null,lt=null,Dt=null,ge=null,Ne=null;return{setTest:function(Qt){D||(Qt?ot(i.STENCIL_TEST):Ct(i.STENCIL_TEST))},setMask:function(Qt){rt!==Qt&&!D&&(i.stencilMask(Qt),rt=Qt)},setFunc:function(Qt,cn,Pn){(G!==Qt||K!==cn||dt!==Pn)&&(i.stencilFunc(Qt,cn,Pn),G=Qt,K=cn,dt=Pn)},setOp:function(Qt,cn,Pn){(lt!==Qt||Dt!==cn||ge!==Pn)&&(i.stencilOp(Qt,cn,Pn),lt=Qt,Dt=cn,ge=Pn)},setLocked:function(Qt){D=Qt},setClear:function(Qt){Ne!==Qt&&(i.clearStencil(Qt),Ne=Qt)},reset:function(){D=!1,rt=null,G=null,K=null,dt=null,lt=null,Dt=null,ge=null,Ne=null}}}const r=new e,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let h={},u={},f=new WeakMap,p=[],g=null,v=!1,m=null,d=null,S=null,M=null,_=null,I=null,T=null,A=new Pt(0,0,0),L=0,w=!1,y=null,P=null,H=null,z=null,X=null;const Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,j=0;const V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(V)[1]),W=j>=1):V.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),W=j>=2);let at=null,ft={};const wt=i.getParameter(i.SCISSOR_BOX),Bt=i.getParameter(i.VIEWPORT),re=new se().fromArray(wt),Y=new se().fromArray(Bt);function nt(D,rt,G,K){const dt=new Uint8Array(4),lt=i.createTexture();i.bindTexture(D,lt),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Dt=0;Dt<G;Dt++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(rt,0,i.RGBA,1,1,K,0,i.RGBA,i.UNSIGNED_BYTE,dt):i.texImage2D(rt+Dt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,dt);return lt}const Mt={};Mt[i.TEXTURE_2D]=nt(i.TEXTURE_2D,i.TEXTURE_2D,1),Mt[i.TEXTURE_CUBE_MAP]=nt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Mt[i.TEXTURE_2D_ARRAY]=nt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Mt[i.TEXTURE_3D]=nt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ot(i.DEPTH_TEST),a.setFunc(xs),Gt(!1),Vt(jc),ot(i.CULL_FACE),F(ai);function ot(D){h[D]!==!0&&(i.enable(D),h[D]=!0)}function Ct(D){h[D]!==!1&&(i.disable(D),h[D]=!1)}function It(D,rt){return u[D]!==rt?(i.bindFramebuffer(D,rt),u[D]=rt,D===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=rt),D===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=rt),!0):!1}function zt(D,rt){let G=p,K=!1;if(D){G=f.get(rt),G===void 0&&(G=[],f.set(rt,G));const dt=D.textures;if(G.length!==dt.length||G[0]!==i.COLOR_ATTACHMENT0){for(let lt=0,Dt=dt.length;lt<Dt;lt++)G[lt]=i.COLOR_ATTACHMENT0+lt;G.length=dt.length,K=!0}}else G[0]!==i.BACK&&(G[0]=i.BACK,K=!0);K&&i.drawBuffers(G)}function ue(D){return g!==D?(i.useProgram(D),g=D,!0):!1}const Xt={[wi]:i.FUNC_ADD,[tu]:i.FUNC_SUBTRACT,[eu]:i.FUNC_REVERSE_SUBTRACT};Xt[nu]=i.MIN,Xt[iu]=i.MAX;const ye={[su]:i.ZERO,[ru]:i.ONE,[au]:i.SRC_COLOR,[ho]:i.SRC_ALPHA,[uu]:i.SRC_ALPHA_SATURATE,[hu]:i.DST_COLOR,[cu]:i.DST_ALPHA,[ou]:i.ONE_MINUS_SRC_COLOR,[uo]:i.ONE_MINUS_SRC_ALPHA,[du]:i.ONE_MINUS_DST_COLOR,[lu]:i.ONE_MINUS_DST_ALPHA,[fu]:i.CONSTANT_COLOR,[pu]:i.ONE_MINUS_CONSTANT_COLOR,[mu]:i.CONSTANT_ALPHA,[gu]:i.ONE_MINUS_CONSTANT_ALPHA};function F(D,rt,G,K,dt,lt,Dt,ge,Ne,Qt){if(D===ai){v===!0&&(Ct(i.BLEND),v=!1);return}if(v===!1&&(ot(i.BLEND),v=!0),D!==Qd){if(D!==m||Qt!==w){if((d!==wi||_!==wi)&&(i.blendEquation(i.FUNC_ADD),d=wi,_=wi),Qt)switch(D){case ms:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qc:i.blendFunc(i.ONE,i.ONE);break;case tl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case el:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case ms:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qc:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case tl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case el:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}S=null,M=null,I=null,T=null,A.set(0,0,0),L=0,m=D,w=Qt}return}dt=dt||rt,lt=lt||G,Dt=Dt||K,(rt!==d||dt!==_)&&(i.blendEquationSeparate(Xt[rt],Xt[dt]),d=rt,_=dt),(G!==S||K!==M||lt!==I||Dt!==T)&&(i.blendFuncSeparate(ye[G],ye[K],ye[lt],ye[Dt]),S=G,M=K,I=lt,T=Dt),(ge.equals(A)===!1||Ne!==L)&&(i.blendColor(ge.r,ge.g,ge.b,Ne),A.copy(ge),L=Ne),m=D,w=!1}function Qe(D,rt){D.side===We?Ct(i.CULL_FACE):ot(i.CULL_FACE);let G=D.side===qe;rt&&(G=!G),Gt(G),D.blending===ms&&D.transparent===!1?F(ai):F(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);const K=D.stencilWrite;o.setTest(K),K&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),le(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ot(i.SAMPLE_ALPHA_TO_COVERAGE):Ct(i.SAMPLE_ALPHA_TO_COVERAGE)}function Gt(D){y!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),y=D)}function Vt(D){D!==Jd?(ot(i.CULL_FACE),D!==P&&(D===jc?i.cullFace(i.BACK):D===jd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ct(i.CULL_FACE),P=D}function Tt(D){D!==H&&(W&&i.lineWidth(D),H=D)}function le(D,rt,G){D?(ot(i.POLYGON_OFFSET_FILL),(z!==rt||X!==G)&&(i.polygonOffset(rt,G),z=rt,X=G)):Ct(i.POLYGON_OFFSET_FILL)}function Et(D){D?ot(i.SCISSOR_TEST):Ct(i.SCISSOR_TEST)}function E(D){D===void 0&&(D=i.TEXTURE0+Z-1),at!==D&&(i.activeTexture(D),at=D)}function x(D,rt,G){G===void 0&&(at===null?G=i.TEXTURE0+Z-1:G=at);let K=ft[G];K===void 0&&(K={type:void 0,texture:void 0},ft[G]=K),(K.type!==D||K.texture!==rt)&&(at!==G&&(i.activeTexture(G),at=G),i.bindTexture(D,rt||Mt[D]),K.type=D,K.texture=rt)}function O(){const D=ft[at];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function $(){try{i.compressedTexImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function J(){try{i.compressedTexImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function q(){try{i.texSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function St(){try{i.texSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ct(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function pt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function qt(){try{i.texStorage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function tt(){try{i.texStorage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function gt(){try{i.texImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function At(){try{i.texImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Rt(D){re.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),re.copy(D))}function vt(D){Y.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),Y.copy(D))}function Wt(D,rt){let G=l.get(rt);G===void 0&&(G=new WeakMap,l.set(rt,G));let K=G.get(D);K===void 0&&(K=i.getUniformBlockIndex(rt,D.name),G.set(D,K))}function Ft(D,rt){const K=l.get(rt).get(D);c.get(rt)!==K&&(i.uniformBlockBinding(rt,K,D.__bindingPointIndex),c.set(rt,K))}function ae(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},at=null,ft={},u={},f=new WeakMap,p=[],g=null,v=!1,m=null,d=null,S=null,M=null,_=null,I=null,T=null,A=new Pt(0,0,0),L=0,w=!1,y=null,P=null,H=null,z=null,X=null,re.set(0,0,i.canvas.width,i.canvas.height),Y.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ot,disable:Ct,bindFramebuffer:It,drawBuffers:zt,useProgram:ue,setBlending:F,setMaterial:Qe,setFlipSided:Gt,setCullFace:Vt,setLineWidth:Tt,setPolygonOffset:le,setScissorTest:Et,activeTexture:E,bindTexture:x,unbindTexture:O,compressedTexImage2D:$,compressedTexImage3D:J,texImage2D:gt,texImage3D:At,updateUBOMapping:Wt,uniformBlockBinding:Ft,texStorage2D:qt,texStorage3D:tt,texSubImage2D:q,texSubImage3D:St,compressedTexSubImage2D:ct,compressedTexSubImage3D:pt,scissor:Rt,viewport:vt,reset:ae}}function Zl(i,t,e,n){const s=Q0(n);switch(e){case Yh:return i*t;case Kh:return i*t;case Zh:return i*t*2;case pc:return i*t/s.components*s.byteLength;case mc:return i*t/s.components*s.byteLength;case Jh:return i*t*2/s.components*s.byteLength;case gc:return i*t*2/s.components*s.byteLength;case $h:return i*t*3/s.components*s.byteLength;case gn:return i*t*4/s.components*s.byteLength;case vc:return i*t*4/s.components*s.byteLength;case Yr:case $r:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Kr:case Zr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Eo:case Ao:return Math.max(i,16)*Math.max(t,8)/4;case wo:case To:return Math.max(i,8)*Math.max(t,8)/2;case Co:case Ro:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Po:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Lo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Io:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Do:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Uo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case No:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Fo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Oo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ko:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Bo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case zo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ho:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Go:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Vo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Wo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Jr:case Xo:case qo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case jh:case Yo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case $o:case Ko:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Q0(i){switch(i){case Wn:case Wh:return{byteLength:1,components:1};case er:case Xh:case ur:return{byteLength:2,components:1};case uc:case fc:return{byteLength:2,components:4};case ki:case dc:case wn:return{byteLength:4,components:1};case qh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function tv(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new mt,h=new WeakMap;let u;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,x){return p?new OffscreenCanvas(E,x):ir("canvas")}function v(E,x,O){let $=1;const J=Et(E);if((J.width>O||J.height>O)&&($=O/Math.max(J.width,J.height)),$<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const q=Math.floor($*J.width),St=Math.floor($*J.height);u===void 0&&(u=g(q,St));const ct=x?g(q,St):u;return ct.width=q,ct.height=St,ct.getContext("2d").drawImage(E,0,0,q,St),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+q+"x"+St+")."),ct}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),E;return E}function m(E){return E.generateMipmaps}function d(E){i.generateMipmap(E)}function S(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(E,x,O,$,J=!1){if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let q=x;if(x===i.RED&&(O===i.FLOAT&&(q=i.R32F),O===i.HALF_FLOAT&&(q=i.R16F),O===i.UNSIGNED_BYTE&&(q=i.R8)),x===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(q=i.R8UI),O===i.UNSIGNED_SHORT&&(q=i.R16UI),O===i.UNSIGNED_INT&&(q=i.R32UI),O===i.BYTE&&(q=i.R8I),O===i.SHORT&&(q=i.R16I),O===i.INT&&(q=i.R32I)),x===i.RG&&(O===i.FLOAT&&(q=i.RG32F),O===i.HALF_FLOAT&&(q=i.RG16F),O===i.UNSIGNED_BYTE&&(q=i.RG8)),x===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(q=i.RG8UI),O===i.UNSIGNED_SHORT&&(q=i.RG16UI),O===i.UNSIGNED_INT&&(q=i.RG32UI),O===i.BYTE&&(q=i.RG8I),O===i.SHORT&&(q=i.RG16I),O===i.INT&&(q=i.RG32I)),x===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(q=i.RGB8UI),O===i.UNSIGNED_SHORT&&(q=i.RGB16UI),O===i.UNSIGNED_INT&&(q=i.RGB32UI),O===i.BYTE&&(q=i.RGB8I),O===i.SHORT&&(q=i.RGB16I),O===i.INT&&(q=i.RGB32I)),x===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),O===i.UNSIGNED_INT&&(q=i.RGBA32UI),O===i.BYTE&&(q=i.RGBA8I),O===i.SHORT&&(q=i.RGBA16I),O===i.INT&&(q=i.RGBA32I)),x===i.RGB&&O===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),x===i.RGBA){const St=J?ua:Yt.getTransfer($);O===i.FLOAT&&(q=i.RGBA32F),O===i.HALF_FLOAT&&(q=i.RGBA16F),O===i.UNSIGNED_BYTE&&(q=St===ne?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function _(E,x){let O;return E?x===null||x===ki||x===Ss?O=i.DEPTH24_STENCIL8:x===wn?O=i.DEPTH32F_STENCIL8:x===er&&(O=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===ki||x===Ss?O=i.DEPTH_COMPONENT24:x===wn?O=i.DEPTH_COMPONENT32F:x===er&&(O=i.DEPTH_COMPONENT16),O}function I(E,x){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==je&&E.minFilter!==bn?Math.log2(Math.max(x.width,x.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?x.mipmaps.length:1}function T(E){const x=E.target;x.removeEventListener("dispose",T),L(x),x.isVideoTexture&&h.delete(x)}function A(E){const x=E.target;x.removeEventListener("dispose",A),y(x)}function L(E){const x=n.get(E);if(x.__webglInit===void 0)return;const O=E.source,$=f.get(O);if($){const J=$[x.__cacheKey];J.usedTimes--,J.usedTimes===0&&w(E),Object.keys($).length===0&&f.delete(O)}n.remove(E)}function w(E){const x=n.get(E);i.deleteTexture(x.__webglTexture);const O=E.source,$=f.get(O);delete $[x.__cacheKey],a.memory.textures--}function y(E){const x=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(x.__webglFramebuffer[$]))for(let J=0;J<x.__webglFramebuffer[$].length;J++)i.deleteFramebuffer(x.__webglFramebuffer[$][J]);else i.deleteFramebuffer(x.__webglFramebuffer[$]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[$])}else{if(Array.isArray(x.__webglFramebuffer))for(let $=0;$<x.__webglFramebuffer.length;$++)i.deleteFramebuffer(x.__webglFramebuffer[$]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let $=0;$<x.__webglColorRenderbuffer.length;$++)x.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[$]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const O=E.textures;for(let $=0,J=O.length;$<J;$++){const q=n.get(O[$]);q.__webglTexture&&(i.deleteTexture(q.__webglTexture),a.memory.textures--),n.remove(O[$])}n.remove(E)}let P=0;function H(){P=0}function z(){const E=P;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),P+=1,E}function X(E){const x=[];return x.push(E.wrapS),x.push(E.wrapT),x.push(E.wrapR||0),x.push(E.magFilter),x.push(E.minFilter),x.push(E.anisotropy),x.push(E.internalFormat),x.push(E.format),x.push(E.type),x.push(E.generateMipmaps),x.push(E.premultiplyAlpha),x.push(E.flipY),x.push(E.unpackAlignment),x.push(E.colorSpace),x.join()}function Z(E,x){const O=n.get(E);if(E.isVideoTexture&&Tt(E),E.isRenderTargetTexture===!1&&E.version>0&&O.__version!==E.version){const $=E.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(O,E,x);return}}e.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+x)}function W(E,x){const O=n.get(E);if(E.version>0&&O.__version!==E.version){Y(O,E,x);return}e.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+x)}function j(E,x){const O=n.get(E);if(E.version>0&&O.__version!==E.version){Y(O,E,x);return}e.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+x)}function V(E,x){const O=n.get(E);if(E.version>0&&O.__version!==E.version){nt(O,E,x);return}e.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+x)}const at={[So]:i.REPEAT,[Ti]:i.CLAMP_TO_EDGE,[bo]:i.MIRRORED_REPEAT},ft={[je]:i.NEAREST,[Eu]:i.NEAREST_MIPMAP_NEAREST,[gr]:i.NEAREST_MIPMAP_LINEAR,[bn]:i.LINEAR,[va]:i.LINEAR_MIPMAP_NEAREST,[Ai]:i.LINEAR_MIPMAP_LINEAR},wt={[Ru]:i.NEVER,[Nu]:i.ALWAYS,[Pu]:i.LESS,[td]:i.LEQUAL,[Lu]:i.EQUAL,[Uu]:i.GEQUAL,[Iu]:i.GREATER,[Du]:i.NOTEQUAL};function Bt(E,x){if(x.type===wn&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===bn||x.magFilter===va||x.magFilter===gr||x.magFilter===Ai||x.minFilter===bn||x.minFilter===va||x.minFilter===gr||x.minFilter===Ai)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,at[x.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,at[x.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,at[x.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,ft[x.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,ft[x.minFilter]),x.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,wt[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===je||x.minFilter!==gr&&x.minFilter!==Ai||x.type===wn&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");i.texParameterf(E,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function re(E,x){let O=!1;E.__webglInit===void 0&&(E.__webglInit=!0,x.addEventListener("dispose",T));const $=x.source;let J=f.get($);J===void 0&&(J={},f.set($,J));const q=X(x);if(q!==E.__cacheKey){J[q]===void 0&&(J[q]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,O=!0),J[q].usedTimes++;const St=J[E.__cacheKey];St!==void 0&&(J[E.__cacheKey].usedTimes--,St.usedTimes===0&&w(x)),E.__cacheKey=q,E.__webglTexture=J[q].texture}return O}function Y(E,x,O){let $=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&($=i.TEXTURE_3D);const J=re(E,x),q=x.source;e.bindTexture($,E.__webglTexture,i.TEXTURE0+O);const St=n.get(q);if(q.version!==St.__version||J===!0){e.activeTexture(i.TEXTURE0+O);const ct=Yt.getPrimaries(Yt.workingColorSpace),pt=x.colorSpace===ei?null:Yt.getPrimaries(x.colorSpace),qt=x.colorSpace===ei||ct===pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,qt);let tt=v(x.image,!1,s.maxTextureSize);tt=le(x,tt);const gt=r.convert(x.format,x.colorSpace),At=r.convert(x.type);let Rt=M(x.internalFormat,gt,At,x.colorSpace,x.isVideoTexture);Bt($,x);let vt;const Wt=x.mipmaps,Ft=x.isVideoTexture!==!0,ae=St.__version===void 0||J===!0,D=q.dataReady,rt=I(x,tt);if(x.isDepthTexture)Rt=_(x.format===bs,x.type),ae&&(Ft?e.texStorage2D(i.TEXTURE_2D,1,Rt,tt.width,tt.height):e.texImage2D(i.TEXTURE_2D,0,Rt,tt.width,tt.height,0,gt,At,null));else if(x.isDataTexture)if(Wt.length>0){Ft&&ae&&e.texStorage2D(i.TEXTURE_2D,rt,Rt,Wt[0].width,Wt[0].height);for(let G=0,K=Wt.length;G<K;G++)vt=Wt[G],Ft?D&&e.texSubImage2D(i.TEXTURE_2D,G,0,0,vt.width,vt.height,gt,At,vt.data):e.texImage2D(i.TEXTURE_2D,G,Rt,vt.width,vt.height,0,gt,At,vt.data);x.generateMipmaps=!1}else Ft?(ae&&e.texStorage2D(i.TEXTURE_2D,rt,Rt,tt.width,tt.height),D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,tt.width,tt.height,gt,At,tt.data)):e.texImage2D(i.TEXTURE_2D,0,Rt,tt.width,tt.height,0,gt,At,tt.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Ft&&ae&&e.texStorage3D(i.TEXTURE_2D_ARRAY,rt,Rt,Wt[0].width,Wt[0].height,tt.depth);for(let G=0,K=Wt.length;G<K;G++)if(vt=Wt[G],x.format!==gn)if(gt!==null)if(Ft){if(D)if(x.layerUpdates.size>0){const dt=Zl(vt.width,vt.height,x.format,x.type);for(const lt of x.layerUpdates){const Dt=vt.data.subarray(lt*dt/vt.data.BYTES_PER_ELEMENT,(lt+1)*dt/vt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,G,0,0,lt,vt.width,vt.height,1,gt,Dt)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,G,0,0,0,vt.width,vt.height,tt.depth,gt,vt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,G,Rt,vt.width,vt.height,tt.depth,0,vt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ft?D&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,G,0,0,0,vt.width,vt.height,tt.depth,gt,At,vt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,G,Rt,vt.width,vt.height,tt.depth,0,gt,At,vt.data)}else{Ft&&ae&&e.texStorage2D(i.TEXTURE_2D,rt,Rt,Wt[0].width,Wt[0].height);for(let G=0,K=Wt.length;G<K;G++)vt=Wt[G],x.format!==gn?gt!==null?Ft?D&&e.compressedTexSubImage2D(i.TEXTURE_2D,G,0,0,vt.width,vt.height,gt,vt.data):e.compressedTexImage2D(i.TEXTURE_2D,G,Rt,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ft?D&&e.texSubImage2D(i.TEXTURE_2D,G,0,0,vt.width,vt.height,gt,At,vt.data):e.texImage2D(i.TEXTURE_2D,G,Rt,vt.width,vt.height,0,gt,At,vt.data)}else if(x.isDataArrayTexture)if(Ft){if(ae&&e.texStorage3D(i.TEXTURE_2D_ARRAY,rt,Rt,tt.width,tt.height,tt.depth),D)if(x.layerUpdates.size>0){const G=Zl(tt.width,tt.height,x.format,x.type);for(const K of x.layerUpdates){const dt=tt.data.subarray(K*G/tt.data.BYTES_PER_ELEMENT,(K+1)*G/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,tt.width,tt.height,1,gt,At,dt)}x.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,gt,At,tt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Rt,tt.width,tt.height,tt.depth,0,gt,At,tt.data);else if(x.isData3DTexture)Ft?(ae&&e.texStorage3D(i.TEXTURE_3D,rt,Rt,tt.width,tt.height,tt.depth),D&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,gt,At,tt.data)):e.texImage3D(i.TEXTURE_3D,0,Rt,tt.width,tt.height,tt.depth,0,gt,At,tt.data);else if(x.isFramebufferTexture){if(ae)if(Ft)e.texStorage2D(i.TEXTURE_2D,rt,Rt,tt.width,tt.height);else{let G=tt.width,K=tt.height;for(let dt=0;dt<rt;dt++)e.texImage2D(i.TEXTURE_2D,dt,Rt,G,K,0,gt,At,null),G>>=1,K>>=1}}else if(Wt.length>0){if(Ft&&ae){const G=Et(Wt[0]);e.texStorage2D(i.TEXTURE_2D,rt,Rt,G.width,G.height)}for(let G=0,K=Wt.length;G<K;G++)vt=Wt[G],Ft?D&&e.texSubImage2D(i.TEXTURE_2D,G,0,0,gt,At,vt):e.texImage2D(i.TEXTURE_2D,G,Rt,gt,At,vt);x.generateMipmaps=!1}else if(Ft){if(ae){const G=Et(tt);e.texStorage2D(i.TEXTURE_2D,rt,Rt,G.width,G.height)}D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,gt,At,tt)}else e.texImage2D(i.TEXTURE_2D,0,Rt,gt,At,tt);m(x)&&d($),St.__version=q.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function nt(E,x,O){if(x.image.length!==6)return;const $=re(E,x),J=x.source;e.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+O);const q=n.get(J);if(J.version!==q.__version||$===!0){e.activeTexture(i.TEXTURE0+O);const St=Yt.getPrimaries(Yt.workingColorSpace),ct=x.colorSpace===ei?null:Yt.getPrimaries(x.colorSpace),pt=x.colorSpace===ei||St===ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt);const qt=x.isCompressedTexture||x.image[0].isCompressedTexture,tt=x.image[0]&&x.image[0].isDataTexture,gt=[];for(let K=0;K<6;K++)!qt&&!tt?gt[K]=v(x.image[K],!0,s.maxCubemapSize):gt[K]=tt?x.image[K].image:x.image[K],gt[K]=le(x,gt[K]);const At=gt[0],Rt=r.convert(x.format,x.colorSpace),vt=r.convert(x.type),Wt=M(x.internalFormat,Rt,vt,x.colorSpace),Ft=x.isVideoTexture!==!0,ae=q.__version===void 0||$===!0,D=J.dataReady;let rt=I(x,At);Bt(i.TEXTURE_CUBE_MAP,x);let G;if(qt){Ft&&ae&&e.texStorage2D(i.TEXTURE_CUBE_MAP,rt,Wt,At.width,At.height);for(let K=0;K<6;K++){G=gt[K].mipmaps;for(let dt=0;dt<G.length;dt++){const lt=G[dt];x.format!==gn?Rt!==null?Ft?D&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt,0,0,lt.width,lt.height,Rt,lt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt,Wt,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ft?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt,0,0,lt.width,lt.height,Rt,vt,lt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt,Wt,lt.width,lt.height,0,Rt,vt,lt.data)}}}else{if(G=x.mipmaps,Ft&&ae){G.length>0&&rt++;const K=Et(gt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,rt,Wt,K.width,K.height)}for(let K=0;K<6;K++)if(tt){Ft?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,gt[K].width,gt[K].height,Rt,vt,gt[K].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Wt,gt[K].width,gt[K].height,0,Rt,vt,gt[K].data);for(let dt=0;dt<G.length;dt++){const Dt=G[dt].image[K].image;Ft?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt+1,0,0,Dt.width,Dt.height,Rt,vt,Dt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt+1,Wt,Dt.width,Dt.height,0,Rt,vt,Dt.data)}}else{Ft?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Rt,vt,gt[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Wt,Rt,vt,gt[K]);for(let dt=0;dt<G.length;dt++){const lt=G[dt];Ft?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt+1,0,0,Rt,vt,lt.image[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt+1,Wt,Rt,vt,lt.image[K])}}}m(x)&&d(i.TEXTURE_CUBE_MAP),q.__version=J.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function Mt(E,x,O,$,J,q){const St=r.convert(O.format,O.colorSpace),ct=r.convert(O.type),pt=M(O.internalFormat,St,ct,O.colorSpace),qt=n.get(x),tt=n.get(O);if(tt.__renderTarget=x,!qt.__hasExternalTextures){const gt=Math.max(1,x.width>>q),At=Math.max(1,x.height>>q);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?e.texImage3D(J,q,pt,gt,At,x.depth,0,St,ct,null):e.texImage2D(J,q,pt,gt,At,0,St,ct,null)}e.bindFramebuffer(i.FRAMEBUFFER,E),Vt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,J,tt.__webglTexture,0,Gt(x)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,J,tt.__webglTexture,q),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ot(E,x,O){if(i.bindRenderbuffer(i.RENDERBUFFER,E),x.depthBuffer){const $=x.depthTexture,J=$&&$.isDepthTexture?$.type:null,q=_(x.stencilBuffer,J),St=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=Gt(x);Vt(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ct,q,x.width,x.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,ct,q,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,q,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,St,i.RENDERBUFFER,E)}else{const $=x.textures;for(let J=0;J<$.length;J++){const q=$[J],St=r.convert(q.format,q.colorSpace),ct=r.convert(q.type),pt=M(q.internalFormat,St,ct,q.colorSpace),qt=Gt(x);O&&Vt(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,qt,pt,x.width,x.height):Vt(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,qt,pt,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,pt,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ct(E,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,E),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=n.get(x.depthTexture);$.__renderTarget=x,(!$.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),Z(x.depthTexture,0);const J=$.__webglTexture,q=Gt(x);if(x.depthTexture.format===gs)Vt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0);else if(x.depthTexture.format===bs)Vt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function It(E){const x=n.get(E),O=E.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==E.depthTexture){const $=E.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),$){const J=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,$.removeEventListener("dispose",J)};$.addEventListener("dispose",J),x.__depthDisposeCallback=J}x.__boundDepthTexture=$}if(E.depthTexture&&!x.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");Ct(x.__webglFramebuffer,E)}else if(O){x.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[$]),x.__webglDepthbuffer[$]===void 0)x.__webglDepthbuffer[$]=i.createRenderbuffer(),ot(x.__webglDepthbuffer[$],E,!1);else{const J=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=x.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,q)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),ot(x.__webglDepthbuffer,E,!1);else{const $=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,J)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function zt(E,x,O){const $=n.get(E);x!==void 0&&Mt($.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&It(E)}function ue(E){const x=E.texture,O=n.get(E),$=n.get(x);E.addEventListener("dispose",A);const J=E.textures,q=E.isWebGLCubeRenderTarget===!0,St=J.length>1;if(St||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=x.version,a.memory.textures++),q){O.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer[ct]=[];for(let pt=0;pt<x.mipmaps.length;pt++)O.__webglFramebuffer[ct][pt]=i.createFramebuffer()}else O.__webglFramebuffer[ct]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer=[];for(let ct=0;ct<x.mipmaps.length;ct++)O.__webglFramebuffer[ct]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(St)for(let ct=0,pt=J.length;ct<pt;ct++){const qt=n.get(J[ct]);qt.__webglTexture===void 0&&(qt.__webglTexture=i.createTexture(),a.memory.textures++)}if(E.samples>0&&Vt(E)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ct=0;ct<J.length;ct++){const pt=J[ct];O.__webglColorRenderbuffer[ct]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[ct]);const qt=r.convert(pt.format,pt.colorSpace),tt=r.convert(pt.type),gt=M(pt.internalFormat,qt,tt,pt.colorSpace,E.isXRRenderTarget===!0),At=Gt(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,At,gt,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,O.__webglColorRenderbuffer[ct])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),ot(O.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(q){e.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),Bt(i.TEXTURE_CUBE_MAP,x);for(let ct=0;ct<6;ct++)if(x.mipmaps&&x.mipmaps.length>0)for(let pt=0;pt<x.mipmaps.length;pt++)Mt(O.__webglFramebuffer[ct][pt],E,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,pt);else Mt(O.__webglFramebuffer[ct],E,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);m(x)&&d(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(St){for(let ct=0,pt=J.length;ct<pt;ct++){const qt=J[ct],tt=n.get(qt);e.bindTexture(i.TEXTURE_2D,tt.__webglTexture),Bt(i.TEXTURE_2D,qt),Mt(O.__webglFramebuffer,E,qt,i.COLOR_ATTACHMENT0+ct,i.TEXTURE_2D,0),m(qt)&&d(i.TEXTURE_2D)}e.unbindTexture()}else{let ct=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ct=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ct,$.__webglTexture),Bt(ct,x),x.mipmaps&&x.mipmaps.length>0)for(let pt=0;pt<x.mipmaps.length;pt++)Mt(O.__webglFramebuffer[pt],E,x,i.COLOR_ATTACHMENT0,ct,pt);else Mt(O.__webglFramebuffer,E,x,i.COLOR_ATTACHMENT0,ct,0);m(x)&&d(ct),e.unbindTexture()}E.depthBuffer&&It(E)}function Xt(E){const x=E.textures;for(let O=0,$=x.length;O<$;O++){const J=x[O];if(m(J)){const q=S(E),St=n.get(J).__webglTexture;e.bindTexture(q,St),d(q),e.unbindTexture()}}}const ye=[],F=[];function Qe(E){if(E.samples>0){if(Vt(E)===!1){const x=E.textures,O=E.width,$=E.height;let J=i.COLOR_BUFFER_BIT;const q=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,St=n.get(E),ct=x.length>1;if(ct)for(let pt=0;pt<x.length;pt++)e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let pt=0;pt<x.length;pt++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),ct){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,St.__webglColorRenderbuffer[pt]);const qt=n.get(x[pt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,qt,0)}i.blitFramebuffer(0,0,O,$,0,0,O,$,J,i.NEAREST),c===!0&&(ye.length=0,F.length=0,ye.push(i.COLOR_ATTACHMENT0+pt),E.depthBuffer&&E.resolveDepthBuffer===!1&&(ye.push(q),F.push(q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,F)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ye))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ct)for(let pt=0;pt<x.length;pt++){e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,St.__webglColorRenderbuffer[pt]);const qt=n.get(x[pt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,qt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&c){const x=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function Gt(E){return Math.min(s.maxSamples,E.samples)}function Vt(E){const x=n.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Tt(E){const x=a.render.frame;h.get(E)!==x&&(h.set(E,x),E.update())}function le(E,x){const O=E.colorSpace,$=E.format,J=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||O!==As&&O!==ei&&(Yt.getTransfer(O)===ne?($!==gn||J!==Wn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),x}function Et(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=H,this.setTexture2D=Z,this.setTexture2DArray=W,this.setTexture3D=j,this.setTextureCube=V,this.rebindTextures=zt,this.setupRenderTarget=ue,this.updateRenderTargetMipmap=Xt,this.updateMultisampleRenderTarget=Qe,this.setupDepthRenderbuffer=It,this.setupFrameBufferTexture=Mt,this.useMultisampledRTT=Vt}function ev(i,t){function e(n,s=ei){let r;const a=Yt.getTransfer(s);if(n===Wn)return i.UNSIGNED_BYTE;if(n===uc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===fc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===qh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Wh)return i.BYTE;if(n===Xh)return i.SHORT;if(n===er)return i.UNSIGNED_SHORT;if(n===dc)return i.INT;if(n===ki)return i.UNSIGNED_INT;if(n===wn)return i.FLOAT;if(n===ur)return i.HALF_FLOAT;if(n===Yh)return i.ALPHA;if(n===$h)return i.RGB;if(n===gn)return i.RGBA;if(n===Kh)return i.LUMINANCE;if(n===Zh)return i.LUMINANCE_ALPHA;if(n===gs)return i.DEPTH_COMPONENT;if(n===bs)return i.DEPTH_STENCIL;if(n===pc)return i.RED;if(n===mc)return i.RED_INTEGER;if(n===Jh)return i.RG;if(n===gc)return i.RG_INTEGER;if(n===vc)return i.RGBA_INTEGER;if(n===Yr||n===$r||n===Kr||n===Zr)if(a===ne)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Yr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===$r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Yr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===$r)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Zr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===wo||n===Eo||n===To||n===Ao)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===wo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Eo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===To)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ao)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Co||n===Ro||n===Po)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Co||n===Ro)return a===ne?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Po)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Lo||n===Io||n===Do||n===Uo||n===No||n===Fo||n===Oo||n===ko||n===Bo||n===zo||n===Ho||n===Go||n===Vo||n===Wo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Lo)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Io)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Do)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Uo)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===No)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Fo)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Oo)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ko)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Bo)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===zo)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ho)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Go)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Vo)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Wo)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Jr||n===Xo||n===qo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Jr)return a===ne?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Xo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===qo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===jh||n===Yo||n===$o||n===Ko)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Jr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Yo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===$o)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ko)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ss?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class nv extends Pe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ve extends xe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const iv={type:"move"};class Wa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ve,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ve,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ve,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),d=this._getHandJoint(l,v);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&f>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(iv)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ve;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const sv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,rv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class av{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new De,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new ui({vertexShader:sv,fragmentShader:rv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Q(new Ii(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ov extends Cs{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,f=null,p=null,g=null;const v=new av,m=e.getContextAttributes();let d=null,S=null;const M=[],_=[],I=new mt;let T=null;const A=new Pe;A.viewport=new se;const L=new Pe;L.viewport=new se;const w=[A,L],y=new nv;let P=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let nt=M[Y];return nt===void 0&&(nt=new Wa,M[Y]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(Y){let nt=M[Y];return nt===void 0&&(nt=new Wa,M[Y]=nt),nt.getGripSpace()},this.getHand=function(Y){let nt=M[Y];return nt===void 0&&(nt=new Wa,M[Y]=nt),nt.getHandSpace()};function z(Y){const nt=_.indexOf(Y.inputSource);if(nt===-1)return;const Mt=M[nt];Mt!==void 0&&(Mt.update(Y.inputSource,Y.frame,l||a),Mt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function X(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",Z);for(let Y=0;Y<M.length;Y++){const nt=_[Y];nt!==null&&(_[Y]=null,M[Y].disconnect(nt))}P=null,H=null,v.reset(),t.setRenderTarget(d),p=null,f=null,u=null,s=null,S=null,re.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(d=t.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",X),s.addEventListener("inputsourceschange",Z),m.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(I),s.renderState.layers===void 0){const nt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,nt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Bi(p.framebufferWidth,p.framebufferHeight,{format:gn,type:Wn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let nt=null,Mt=null,ot=null;m.depth&&(ot=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=m.stencil?bs:gs,Mt=m.stencil?Ss:ki);const Ct={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(Ct),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),S=new Bi(f.textureWidth,f.textureHeight,{format:gn,type:Wn,depthTexture:new pd(f.textureWidth,f.textureHeight,Mt,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),re.setContext(s),re.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function Z(Y){for(let nt=0;nt<Y.removed.length;nt++){const Mt=Y.removed[nt],ot=_.indexOf(Mt);ot>=0&&(_[ot]=null,M[ot].disconnect(Mt))}for(let nt=0;nt<Y.added.length;nt++){const Mt=Y.added[nt];let ot=_.indexOf(Mt);if(ot===-1){for(let It=0;It<M.length;It++)if(It>=_.length){_.push(Mt),ot=It;break}else if(_[It]===null){_[It]=Mt,ot=It;break}if(ot===-1)break}const Ct=M[ot];Ct&&Ct.connect(Mt)}}const W=new C,j=new C;function V(Y,nt,Mt){W.setFromMatrixPosition(nt.matrixWorld),j.setFromMatrixPosition(Mt.matrixWorld);const ot=W.distanceTo(j),Ct=nt.projectionMatrix.elements,It=Mt.projectionMatrix.elements,zt=Ct[14]/(Ct[10]-1),ue=Ct[14]/(Ct[10]+1),Xt=(Ct[9]+1)/Ct[5],ye=(Ct[9]-1)/Ct[5],F=(Ct[8]-1)/Ct[0],Qe=(It[8]+1)/It[0],Gt=zt*F,Vt=zt*Qe,Tt=ot/(-F+Qe),le=Tt*-F;if(nt.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(le),Y.translateZ(Tt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Ct[10]===-1)Y.projectionMatrix.copy(nt.projectionMatrix),Y.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const Et=zt+Tt,E=ue+Tt,x=Gt-le,O=Vt+(ot-le),$=Xt*ue/E*Et,J=ye*ue/E*Et;Y.projectionMatrix.makePerspective(x,O,$,J,Et,E),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function at(Y,nt){nt===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(nt.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let nt=Y.near,Mt=Y.far;v.texture!==null&&(v.depthNear>0&&(nt=v.depthNear),v.depthFar>0&&(Mt=v.depthFar)),y.near=L.near=A.near=nt,y.far=L.far=A.far=Mt,(P!==y.near||H!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),P=y.near,H=y.far),A.layers.mask=Y.layers.mask|2,L.layers.mask=Y.layers.mask|4,y.layers.mask=A.layers.mask|L.layers.mask;const ot=Y.parent,Ct=y.cameras;at(y,ot);for(let It=0;It<Ct.length;It++)at(Ct[It],ot);Ct.length===2?V(y,A,L):y.projectionMatrix.copy(A.projectionMatrix),ft(Y,y,ot)};function ft(Y,nt,Mt){Mt===null?Y.matrix.copy(nt.matrixWorld):(Y.matrix.copy(Mt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(nt.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(nt.projectionMatrix),Y.projectionMatrixInverse.copy(nt.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=nr*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(Y){c=Y,f!==null&&(f.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(y)};let wt=null;function Bt(Y,nt){if(h=nt.getViewerPose(l||a),g=nt,h!==null){const Mt=h.views;p!==null&&(t.setRenderTargetFramebuffer(S,p.framebuffer),t.setRenderTarget(S));let ot=!1;Mt.length!==y.cameras.length&&(y.cameras.length=0,ot=!0);for(let It=0;It<Mt.length;It++){const zt=Mt[It];let ue=null;if(p!==null)ue=p.getViewport(zt);else{const ye=u.getViewSubImage(f,zt);ue=ye.viewport,It===0&&(t.setRenderTargetTextures(S,ye.colorTexture,f.ignoreDepthValues?void 0:ye.depthStencilTexture),t.setRenderTarget(S))}let Xt=w[It];Xt===void 0&&(Xt=new Pe,Xt.layers.enable(It),Xt.viewport=new se,w[It]=Xt),Xt.matrix.fromArray(zt.transform.matrix),Xt.matrix.decompose(Xt.position,Xt.quaternion,Xt.scale),Xt.projectionMatrix.fromArray(zt.projectionMatrix),Xt.projectionMatrixInverse.copy(Xt.projectionMatrix).invert(),Xt.viewport.set(ue.x,ue.y,ue.width,ue.height),It===0&&(y.matrix.copy(Xt.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ot===!0&&y.cameras.push(Xt)}const Ct=s.enabledFeatures;if(Ct&&Ct.includes("depth-sensing")){const It=u.getDepthInformation(Mt[0]);It&&It.isValid&&It.texture&&v.init(t,It,s.renderState)}}for(let Mt=0;Mt<M.length;Mt++){const ot=_[Mt],Ct=M[Mt];ot!==null&&Ct!==void 0&&Ct.update(ot,nt,l||a)}wt&&wt(Y,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),g=null}const re=new ud;re.setAnimationLoop(Bt),this.setAnimationLoop=function(Y){wt=Y},this.dispose=function(){}}}const Mi=new An,cv=new jt;function lv(i,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,ld(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,S,M,_){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),u(m,d)):d.isMeshPhongMaterial?(r(m,d),h(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,_)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),v(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?c(m,d,S,M):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===qe&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===qe&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const S=t.get(d),M=S.envMap,_=S.envMapRotation;M&&(m.envMap.value=M,Mi.copy(_),Mi.x*=-1,Mi.y*=-1,Mi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Mi.y*=-1,Mi.z*=-1),m.envMapRotation.value.setFromMatrix4(cv.makeRotationFromEuler(Mi)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function c(m,d,S,M){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*S,m.scale.value=M*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function u(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,S){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===qe&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function v(m,d){const S=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function hv(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,M){const _=M.program;n.uniformBlockBinding(S,_)}function l(S,M){let _=s[S.id];_===void 0&&(g(S),_=h(S),s[S.id]=_,S.addEventListener("dispose",m));const I=M.program;n.updateUBOMapping(S,I);const T=t.render.frame;r[S.id]!==T&&(f(S),r[S.id]=T)}function h(S){const M=u();S.__bindingPointIndex=M;const _=i.createBuffer(),I=S.__size,T=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,I,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,_),_}function u(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(S){const M=s[S.id],_=S.uniforms,I=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let T=0,A=_.length;T<A;T++){const L=Array.isArray(_[T])?_[T]:[_[T]];for(let w=0,y=L.length;w<y;w++){const P=L[w];if(p(P,T,w,I)===!0){const H=P.__offset,z=Array.isArray(P.value)?P.value:[P.value];let X=0;for(let Z=0;Z<z.length;Z++){const W=z[Z],j=v(W);typeof W=="number"||typeof W=="boolean"?(P.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,H+X,P.__data)):W.isMatrix3?(P.__data[0]=W.elements[0],P.__data[1]=W.elements[1],P.__data[2]=W.elements[2],P.__data[3]=0,P.__data[4]=W.elements[3],P.__data[5]=W.elements[4],P.__data[6]=W.elements[5],P.__data[7]=0,P.__data[8]=W.elements[6],P.__data[9]=W.elements[7],P.__data[10]=W.elements[8],P.__data[11]=0):(W.toArray(P.__data,X),X+=j.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,H,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(S,M,_,I){const T=S.value,A=M+"_"+_;if(I[A]===void 0)return typeof T=="number"||typeof T=="boolean"?I[A]=T:I[A]=T.clone(),!0;{const L=I[A];if(typeof T=="number"||typeof T=="boolean"){if(L!==T)return I[A]=T,!0}else if(L.equals(T)===!1)return L.copy(T),!0}return!1}function g(S){const M=S.uniforms;let _=0;const I=16;for(let A=0,L=M.length;A<L;A++){const w=Array.isArray(M[A])?M[A]:[M[A]];for(let y=0,P=w.length;y<P;y++){const H=w[y],z=Array.isArray(H.value)?H.value:[H.value];for(let X=0,Z=z.length;X<Z;X++){const W=z[X],j=v(W),V=_%I,at=V%j.boundary,ft=V+at;_+=at,ft!==0&&I-ft<j.storage&&(_+=I-ft),H.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=_,_+=j.storage}}}const T=_%I;return T>0&&(_+=I-T),S.__size=_,S.__cache={},this}function v(S){const M={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(M.boundary=4,M.storage=4):S.isVector2?(M.boundary=8,M.storage=8):S.isVector3||S.isColor?(M.boundary=16,M.storage=12):S.isVector4?(M.boundary=16,M.storage=16):S.isMatrix3?(M.boundary=48,M.storage=48):S.isMatrix4?(M.boundary=64,M.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),M}function m(S){const M=S.target;M.removeEventListener("dispose",m);const _=a.indexOf(M.__bindingPointIndex);a.splice(_,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function d(){for(const S in s)i.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:c,update:l,dispose:d}}class sr{constructor(t={}){const{canvas:e=ju(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,d=null;const S=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=be,this.toneMapping=oi,this.toneMappingExposure=1;const _=this;let I=!1,T=0,A=0,L=null,w=-1,y=null;const P=new se,H=new se;let z=null;const X=new Pt(0);let Z=0,W=e.width,j=e.height,V=1,at=null,ft=null;const wt=new se(0,0,W,j),Bt=new se(0,0,W,j);let re=!1;const Y=new yc;let nt=!1,Mt=!1;const ot=new jt,Ct=new jt,It=new C,zt=new se,ue={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Xt=!1;function ye(){return L===null?V:1}let F=n;function Qe(b,U){return e.getContext(b,U)}try{const b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${lc}`),e.addEventListener("webglcontextlost",K,!1),e.addEventListener("webglcontextrestored",dt,!1),e.addEventListener("webglcontextcreationerror",lt,!1),F===null){const U="webgl2";if(F=Qe(U,b),F===null)throw Qe(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Gt,Vt,Tt,le,Et,E,x,O,$,J,q,St,ct,pt,qt,tt,gt,At,Rt,vt,Wt,Ft,ae,D;function rt(){Gt=new gg(F),Gt.init(),Ft=new ev(F,Gt),Vt=new hg(F,Gt,t,Ft),Tt=new j0(F,Gt),Vt.reverseDepthBuffer&&f&&Tt.buffers.depth.setReversed(!0),le=new xg(F),Et=new O0,E=new tv(F,Gt,Tt,Et,Vt,Ft,le),x=new ug(_),O=new mg(_),$=new Tf(F),ae=new cg(F,$),J=new vg(F,$,le,ae),q=new Mg(F,J,$,le),Rt=new yg(F,Vt,E),tt=new dg(Et),St=new F0(_,x,O,Gt,Vt,ae,tt),ct=new lv(_,Et),pt=new B0,qt=new X0(Gt),At=new og(_,x,O,Tt,q,p,c),gt=new Z0(_,q,Vt),D=new hv(F,le,Vt,Tt),vt=new lg(F,Gt,le),Wt=new _g(F,Gt,le),le.programs=St.programs,_.capabilities=Vt,_.extensions=Gt,_.properties=Et,_.renderLists=pt,_.shadowMap=gt,_.state=Tt,_.info=le}rt();const G=new ov(_,F);this.xr=G,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const b=Gt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Gt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(b){b!==void 0&&(V=b,this.setSize(W,j,!1))},this.getSize=function(b){return b.set(W,j)},this.setSize=function(b,U,k=!0){if(G.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=b,j=U,e.width=Math.floor(b*V),e.height=Math.floor(U*V),k===!0&&(e.style.width=b+"px",e.style.height=U+"px"),this.setViewport(0,0,b,U)},this.getDrawingBufferSize=function(b){return b.set(W*V,j*V).floor()},this.setDrawingBufferSize=function(b,U,k){W=b,j=U,V=k,e.width=Math.floor(b*k),e.height=Math.floor(U*k),this.setViewport(0,0,b,U)},this.getCurrentViewport=function(b){return b.copy(P)},this.getViewport=function(b){return b.copy(wt)},this.setViewport=function(b,U,k,B){b.isVector4?wt.set(b.x,b.y,b.z,b.w):wt.set(b,U,k,B),Tt.viewport(P.copy(wt).multiplyScalar(V).round())},this.getScissor=function(b){return b.copy(Bt)},this.setScissor=function(b,U,k,B){b.isVector4?Bt.set(b.x,b.y,b.z,b.w):Bt.set(b,U,k,B),Tt.scissor(H.copy(Bt).multiplyScalar(V).round())},this.getScissorTest=function(){return re},this.setScissorTest=function(b){Tt.setScissorTest(re=b)},this.setOpaqueSort=function(b){at=b},this.setTransparentSort=function(b){ft=b},this.getClearColor=function(b){return b.copy(At.getClearColor())},this.setClearColor=function(){At.setClearColor.apply(At,arguments)},this.getClearAlpha=function(){return At.getClearAlpha()},this.setClearAlpha=function(){At.setClearAlpha.apply(At,arguments)},this.clear=function(b=!0,U=!0,k=!0){let B=0;if(b){let N=!1;if(L!==null){const et=L.texture.format;N=et===vc||et===gc||et===mc}if(N){const et=L.texture.type,ht=et===Wn||et===ki||et===er||et===Ss||et===uc||et===fc,_t=At.getClearColor(),xt=At.getClearAlpha(),Lt=_t.r,Ut=_t.g,yt=_t.b;ht?(g[0]=Lt,g[1]=Ut,g[2]=yt,g[3]=xt,F.clearBufferuiv(F.COLOR,0,g)):(v[0]=Lt,v[1]=Ut,v[2]=yt,v[3]=xt,F.clearBufferiv(F.COLOR,0,v))}else B|=F.COLOR_BUFFER_BIT}U&&(B|=F.DEPTH_BUFFER_BIT),k&&(B|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",K,!1),e.removeEventListener("webglcontextrestored",dt,!1),e.removeEventListener("webglcontextcreationerror",lt,!1),pt.dispose(),qt.dispose(),Et.dispose(),x.dispose(),O.dispose(),q.dispose(),ae.dispose(),D.dispose(),St.dispose(),G.dispose(),G.removeEventListener("sessionstart",Wc),G.removeEventListener("sessionend",Xc),pi.stop()};function K(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function dt(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const b=le.autoReset,U=gt.enabled,k=gt.autoUpdate,B=gt.needsUpdate,N=gt.type;rt(),le.autoReset=b,gt.enabled=U,gt.autoUpdate=k,gt.needsUpdate=B,gt.type=N}function lt(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Dt(b){const U=b.target;U.removeEventListener("dispose",Dt),ge(U)}function ge(b){Ne(b),Et.remove(b)}function Ne(b){const U=Et.get(b).programs;U!==void 0&&(U.forEach(function(k){St.releaseProgram(k)}),b.isShaderMaterial&&St.releaseShaderCache(b))}this.renderBufferDirect=function(b,U,k,B,N,et){U===null&&(U=ue);const ht=N.isMesh&&N.matrixWorld.determinant()<0,_t=Xd(b,U,k,B,N);Tt.setMaterial(B,ht);let xt=k.index,Lt=1;if(B.wireframe===!0){if(xt=J.getWireframeAttribute(k),xt===void 0)return;Lt=2}const Ut=k.drawRange,yt=k.attributes.position;let $t=Ut.start*Lt,oe=(Ut.start+Ut.count)*Lt;et!==null&&($t=Math.max($t,et.start*Lt),oe=Math.min(oe,(et.start+et.count)*Lt)),xt!==null?($t=Math.max($t,0),oe=Math.min(oe,xt.count)):yt!=null&&($t=Math.max($t,0),oe=Math.min(oe,yt.count));const he=oe-$t;if(he<0||he===1/0)return;ae.setup(N,B,_t,k,xt);let Ve,Zt=vt;if(xt!==null&&(Ve=$.get(xt),Zt=Wt,Zt.setIndex(Ve)),N.isMesh)B.wireframe===!0?(Tt.setLineWidth(B.wireframeLinewidth*ye()),Zt.setMode(F.LINES)):Zt.setMode(F.TRIANGLES);else if(N.isLine){let bt=B.linewidth;bt===void 0&&(bt=1),Tt.setLineWidth(bt*ye()),N.isLineSegments?Zt.setMode(F.LINES):N.isLineLoop?Zt.setMode(F.LINE_LOOP):Zt.setMode(F.LINE_STRIP)}else N.isPoints?Zt.setMode(F.POINTS):N.isSprite&&Zt.setMode(F.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)Zt.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Gt.get("WEBGL_multi_draw"))Zt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const bt=N._multiDrawStarts,Ln=N._multiDrawCounts,Jt=N._multiDrawCount,ln=xt?$.get(xt).bytesPerElement:1,Ki=Et.get(B).currentProgram.getUniforms();for(let Ye=0;Ye<Jt;Ye++)Ki.setValue(F,"_gl_DrawID",Ye),Zt.render(bt[Ye]/ln,Ln[Ye])}else if(N.isInstancedMesh)Zt.renderInstances($t,he,N.count);else if(k.isInstancedBufferGeometry){const bt=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,Ln=Math.min(k.instanceCount,bt);Zt.renderInstances($t,he,Ln)}else Zt.render($t,he)};function Qt(b,U,k){b.transparent===!0&&b.side===We&&b.forceSinglePass===!1?(b.side=qe,b.needsUpdate=!0,mr(b,U,k),b.side=di,b.needsUpdate=!0,mr(b,U,k),b.side=We):mr(b,U,k)}this.compile=function(b,U,k=null){k===null&&(k=b),d=qt.get(k),d.init(U),M.push(d),k.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(d.pushLight(N),N.castShadow&&d.pushShadow(N))}),b!==k&&b.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(d.pushLight(N),N.castShadow&&d.pushShadow(N))}),d.setupLights();const B=new Set;return b.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const et=N.material;if(et)if(Array.isArray(et))for(let ht=0;ht<et.length;ht++){const _t=et[ht];Qt(_t,k,N),B.add(_t)}else Qt(et,k,N),B.add(et)}),M.pop(),d=null,B},this.compileAsync=function(b,U,k=null){const B=this.compile(b,U,k);return new Promise(N=>{function et(){if(B.forEach(function(ht){Et.get(ht).currentProgram.isReady()&&B.delete(ht)}),B.size===0){N(b);return}setTimeout(et,10)}Gt.get("KHR_parallel_shader_compile")!==null?et():setTimeout(et,10)})};let cn=null;function Pn(b){cn&&cn(b)}function Wc(){pi.stop()}function Xc(){pi.start()}const pi=new ud;pi.setAnimationLoop(Pn),typeof self<"u"&&pi.setContext(self),this.setAnimationLoop=function(b){cn=b,G.setAnimationLoop(b),b===null?pi.stop():pi.start()},G.addEventListener("sessionstart",Wc),G.addEventListener("sessionend",Xc),this.render=function(b,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),G.enabled===!0&&G.isPresenting===!0&&(G.cameraAutoUpdate===!0&&G.updateCamera(U),U=G.getCamera()),b.isScene===!0&&b.onBeforeRender(_,b,U,L),d=qt.get(b,M.length),d.init(U),M.push(d),Ct.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Y.setFromProjectionMatrix(Ct),Mt=this.localClippingEnabled,nt=tt.init(this.clippingPlanes,Mt),m=pt.get(b,S.length),m.init(),S.push(m),G.enabled===!0&&G.isPresenting===!0){const et=_.xr.getDepthSensingMesh();et!==null&&ga(et,U,-1/0,_.sortObjects)}ga(b,U,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(at,ft),Xt=G.enabled===!1||G.isPresenting===!1||G.hasDepthSensing()===!1,Xt&&At.addToRenderList(m,b),this.info.render.frame++,nt===!0&&tt.beginShadows();const k=d.state.shadowsArray;gt.render(k,b,U),nt===!0&&tt.endShadows(),this.info.autoReset===!0&&this.info.reset();const B=m.opaque,N=m.transmissive;if(d.setupLights(),U.isArrayCamera){const et=U.cameras;if(N.length>0)for(let ht=0,_t=et.length;ht<_t;ht++){const xt=et[ht];Yc(B,N,b,xt)}Xt&&At.render(b);for(let ht=0,_t=et.length;ht<_t;ht++){const xt=et[ht];qc(m,b,xt,xt.viewport)}}else N.length>0&&Yc(B,N,b,U),Xt&&At.render(b),qc(m,b,U);L!==null&&(E.updateMultisampleRenderTarget(L),E.updateRenderTargetMipmap(L)),b.isScene===!0&&b.onAfterRender(_,b,U),ae.resetDefaultState(),w=-1,y=null,M.pop(),M.length>0?(d=M[M.length-1],nt===!0&&tt.setGlobalState(_.clippingPlanes,d.state.camera)):d=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function ga(b,U,k,B){if(b.visible===!1)return;if(b.layers.test(U.layers)){if(b.isGroup)k=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(U);else if(b.isLight)d.pushLight(b),b.castShadow&&d.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Y.intersectsSprite(b)){B&&zt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Ct);const ht=q.update(b),_t=b.material;_t.visible&&m.push(b,ht,_t,k,zt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Y.intersectsObject(b))){const ht=q.update(b),_t=b.material;if(B&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),zt.copy(b.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),zt.copy(ht.boundingSphere.center)),zt.applyMatrix4(b.matrixWorld).applyMatrix4(Ct)),Array.isArray(_t)){const xt=ht.groups;for(let Lt=0,Ut=xt.length;Lt<Ut;Lt++){const yt=xt[Lt],$t=_t[yt.materialIndex];$t&&$t.visible&&m.push(b,ht,$t,k,zt.z,yt)}}else _t.visible&&m.push(b,ht,_t,k,zt.z,null)}}const et=b.children;for(let ht=0,_t=et.length;ht<_t;ht++)ga(et[ht],U,k,B)}function qc(b,U,k,B){const N=b.opaque,et=b.transmissive,ht=b.transparent;d.setupLightsView(k),nt===!0&&tt.setGlobalState(_.clippingPlanes,k),B&&Tt.viewport(P.copy(B)),N.length>0&&pr(N,U,k),et.length>0&&pr(et,U,k),ht.length>0&&pr(ht,U,k),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1)}function Yc(b,U,k,B){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[B.id]===void 0&&(d.state.transmissionRenderTarget[B.id]=new Bi(1,1,{generateMipmaps:!0,type:Gt.has("EXT_color_buffer_half_float")||Gt.has("EXT_color_buffer_float")?ur:Wn,minFilter:Ai,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Yt.workingColorSpace}));const et=d.state.transmissionRenderTarget[B.id],ht=B.viewport||P;et.setSize(ht.z,ht.w);const _t=_.getRenderTarget();_.setRenderTarget(et),_.getClearColor(X),Z=_.getClearAlpha(),Z<1&&_.setClearColor(16777215,.5),_.clear(),Xt&&At.render(k);const xt=_.toneMapping;_.toneMapping=oi;const Lt=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),d.setupLightsView(B),nt===!0&&tt.setGlobalState(_.clippingPlanes,B),pr(b,k,B),E.updateMultisampleRenderTarget(et),E.updateRenderTargetMipmap(et),Gt.has("WEBGL_multisampled_render_to_texture")===!1){let Ut=!1;for(let yt=0,$t=U.length;yt<$t;yt++){const oe=U[yt],he=oe.object,Ve=oe.geometry,Zt=oe.material,bt=oe.group;if(Zt.side===We&&he.layers.test(B.layers)){const Ln=Zt.side;Zt.side=qe,Zt.needsUpdate=!0,$c(he,k,B,Ve,Zt,bt),Zt.side=Ln,Zt.needsUpdate=!0,Ut=!0}}Ut===!0&&(E.updateMultisampleRenderTarget(et),E.updateRenderTargetMipmap(et))}_.setRenderTarget(_t),_.setClearColor(X,Z),Lt!==void 0&&(B.viewport=Lt),_.toneMapping=xt}function pr(b,U,k){const B=U.isScene===!0?U.overrideMaterial:null;for(let N=0,et=b.length;N<et;N++){const ht=b[N],_t=ht.object,xt=ht.geometry,Lt=B===null?ht.material:B,Ut=ht.group;_t.layers.test(k.layers)&&$c(_t,U,k,xt,Lt,Ut)}}function $c(b,U,k,B,N,et){b.onBeforeRender(_,U,k,B,N,et),b.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),N.onBeforeRender(_,U,k,B,b,et),N.transparent===!0&&N.side===We&&N.forceSinglePass===!1?(N.side=qe,N.needsUpdate=!0,_.renderBufferDirect(k,U,B,N,b,et),N.side=di,N.needsUpdate=!0,_.renderBufferDirect(k,U,B,N,b,et),N.side=We):_.renderBufferDirect(k,U,B,N,b,et),b.onAfterRender(_,U,k,B,N,et)}function mr(b,U,k){U.isScene!==!0&&(U=ue);const B=Et.get(b),N=d.state.lights,et=d.state.shadowsArray,ht=N.state.version,_t=St.getParameters(b,N.state,et,U,k),xt=St.getProgramCacheKey(_t);let Lt=B.programs;B.environment=b.isMeshStandardMaterial?U.environment:null,B.fog=U.fog,B.envMap=(b.isMeshStandardMaterial?O:x).get(b.envMap||B.environment),B.envMapRotation=B.environment!==null&&b.envMap===null?U.environmentRotation:b.envMapRotation,Lt===void 0&&(b.addEventListener("dispose",Dt),Lt=new Map,B.programs=Lt);let Ut=Lt.get(xt);if(Ut!==void 0){if(B.currentProgram===Ut&&B.lightsStateVersion===ht)return Zc(b,_t),Ut}else _t.uniforms=St.getUniforms(b),b.onBeforeCompile(_t,_),Ut=St.acquireProgram(_t,xt),Lt.set(xt,Ut),B.uniforms=_t.uniforms;const yt=B.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(yt.clippingPlanes=tt.uniform),Zc(b,_t),B.needsLights=Yd(b),B.lightsStateVersion=ht,B.needsLights&&(yt.ambientLightColor.value=N.state.ambient,yt.lightProbe.value=N.state.probe,yt.directionalLights.value=N.state.directional,yt.directionalLightShadows.value=N.state.directionalShadow,yt.spotLights.value=N.state.spot,yt.spotLightShadows.value=N.state.spotShadow,yt.rectAreaLights.value=N.state.rectArea,yt.ltc_1.value=N.state.rectAreaLTC1,yt.ltc_2.value=N.state.rectAreaLTC2,yt.pointLights.value=N.state.point,yt.pointLightShadows.value=N.state.pointShadow,yt.hemisphereLights.value=N.state.hemi,yt.directionalShadowMap.value=N.state.directionalShadowMap,yt.directionalShadowMatrix.value=N.state.directionalShadowMatrix,yt.spotShadowMap.value=N.state.spotShadowMap,yt.spotLightMatrix.value=N.state.spotLightMatrix,yt.spotLightMap.value=N.state.spotLightMap,yt.pointShadowMap.value=N.state.pointShadowMap,yt.pointShadowMatrix.value=N.state.pointShadowMatrix),B.currentProgram=Ut,B.uniformsList=null,Ut}function Kc(b){if(b.uniformsList===null){const U=b.currentProgram.getUniforms();b.uniformsList=jr.seqWithValue(U.seq,b.uniforms)}return b.uniformsList}function Zc(b,U){const k=Et.get(b);k.outputColorSpace=U.outputColorSpace,k.batching=U.batching,k.batchingColor=U.batchingColor,k.instancing=U.instancing,k.instancingColor=U.instancingColor,k.instancingMorph=U.instancingMorph,k.skinning=U.skinning,k.morphTargets=U.morphTargets,k.morphNormals=U.morphNormals,k.morphColors=U.morphColors,k.morphTargetsCount=U.morphTargetsCount,k.numClippingPlanes=U.numClippingPlanes,k.numIntersection=U.numClipIntersection,k.vertexAlphas=U.vertexAlphas,k.vertexTangents=U.vertexTangents,k.toneMapping=U.toneMapping}function Xd(b,U,k,B,N){U.isScene!==!0&&(U=ue),E.resetTextureUnits();const et=U.fog,ht=B.isMeshStandardMaterial?U.environment:null,_t=L===null?_.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:As,xt=(B.isMeshStandardMaterial?O:x).get(B.envMap||ht),Lt=B.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Ut=!!k.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),yt=!!k.morphAttributes.position,$t=!!k.morphAttributes.normal,oe=!!k.morphAttributes.color;let he=oi;B.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(he=_.toneMapping);const Ve=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Zt=Ve!==void 0?Ve.length:0,bt=Et.get(B),Ln=d.state.lights;if(nt===!0&&(Mt===!0||b!==y)){const tn=b===y&&B.id===w;tt.setState(B,b,tn)}let Jt=!1;B.version===bt.__version?(bt.needsLights&&bt.lightsStateVersion!==Ln.state.version||bt.outputColorSpace!==_t||N.isBatchedMesh&&bt.batching===!1||!N.isBatchedMesh&&bt.batching===!0||N.isBatchedMesh&&bt.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&bt.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&bt.instancing===!1||!N.isInstancedMesh&&bt.instancing===!0||N.isSkinnedMesh&&bt.skinning===!1||!N.isSkinnedMesh&&bt.skinning===!0||N.isInstancedMesh&&bt.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&bt.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&bt.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&bt.instancingMorph===!1&&N.morphTexture!==null||bt.envMap!==xt||B.fog===!0&&bt.fog!==et||bt.numClippingPlanes!==void 0&&(bt.numClippingPlanes!==tt.numPlanes||bt.numIntersection!==tt.numIntersection)||bt.vertexAlphas!==Lt||bt.vertexTangents!==Ut||bt.morphTargets!==yt||bt.morphNormals!==$t||bt.morphColors!==oe||bt.toneMapping!==he||bt.morphTargetsCount!==Zt)&&(Jt=!0):(Jt=!0,bt.__version=B.version);let ln=bt.currentProgram;Jt===!0&&(ln=mr(B,U,N));let Ki=!1,Ye=!1,Ds=!1;const de=ln.getUniforms(),xn=bt.uniforms;if(Tt.useProgram(ln.program)&&(Ki=!0,Ye=!0,Ds=!0),B.id!==w&&(w=B.id,Ye=!0),Ki||y!==b){Tt.buffers.depth.getReversed()?(ot.copy(b.projectionMatrix),tf(ot),ef(ot),de.setValue(F,"projectionMatrix",ot)):de.setValue(F,"projectionMatrix",b.projectionMatrix),de.setValue(F,"viewMatrix",b.matrixWorldInverse);const qn=de.map.cameraPosition;qn!==void 0&&qn.setValue(F,It.setFromMatrixPosition(b.matrixWorld)),Vt.logarithmicDepthBuffer&&de.setValue(F,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&de.setValue(F,"isOrthographic",b.isOrthographicCamera===!0),y!==b&&(y=b,Ye=!0,Ds=!0)}if(N.isSkinnedMesh){de.setOptional(F,N,"bindMatrix"),de.setOptional(F,N,"bindMatrixInverse");const tn=N.skeleton;tn&&(tn.boneTexture===null&&tn.computeBoneTexture(),de.setValue(F,"boneTexture",tn.boneTexture,E))}N.isBatchedMesh&&(de.setOptional(F,N,"batchingTexture"),de.setValue(F,"batchingTexture",N._matricesTexture,E),de.setOptional(F,N,"batchingIdTexture"),de.setValue(F,"batchingIdTexture",N._indirectTexture,E),de.setOptional(F,N,"batchingColorTexture"),N._colorsTexture!==null&&de.setValue(F,"batchingColorTexture",N._colorsTexture,E));const Us=k.morphAttributes;if((Us.position!==void 0||Us.normal!==void 0||Us.color!==void 0)&&Rt.update(N,k,ln),(Ye||bt.receiveShadow!==N.receiveShadow)&&(bt.receiveShadow=N.receiveShadow,de.setValue(F,"receiveShadow",N.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(xn.envMap.value=xt,xn.flipEnvMap.value=xt.isCubeTexture&&xt.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&U.environment!==null&&(xn.envMapIntensity.value=U.environmentIntensity),Ye&&(de.setValue(F,"toneMappingExposure",_.toneMappingExposure),bt.needsLights&&qd(xn,Ds),et&&B.fog===!0&&ct.refreshFogUniforms(xn,et),ct.refreshMaterialUniforms(xn,B,V,j,d.state.transmissionRenderTarget[b.id]),jr.upload(F,Kc(bt),xn,E)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(jr.upload(F,Kc(bt),xn,E),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&de.setValue(F,"center",N.center),de.setValue(F,"modelViewMatrix",N.modelViewMatrix),de.setValue(F,"normalMatrix",N.normalMatrix),de.setValue(F,"modelMatrix",N.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const tn=B.uniformsGroups;for(let qn=0,Yn=tn.length;qn<Yn;qn++){const Jc=tn[qn];D.update(Jc,ln),D.bind(Jc,ln)}}return ln}function qd(b,U){b.ambientLightColor.needsUpdate=U,b.lightProbe.needsUpdate=U,b.directionalLights.needsUpdate=U,b.directionalLightShadows.needsUpdate=U,b.pointLights.needsUpdate=U,b.pointLightShadows.needsUpdate=U,b.spotLights.needsUpdate=U,b.spotLightShadows.needsUpdate=U,b.rectAreaLights.needsUpdate=U,b.hemisphereLights.needsUpdate=U}function Yd(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(b,U,k){Et.get(b.texture).__webglTexture=U,Et.get(b.depthTexture).__webglTexture=k;const B=Et.get(b);B.__hasExternalTextures=!0,B.__autoAllocateDepthBuffer=k===void 0,B.__autoAllocateDepthBuffer||Gt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,U){const k=Et.get(b);k.__webglFramebuffer=U,k.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(b,U=0,k=0){L=b,T=U,A=k;let B=!0,N=null,et=!1,ht=!1;if(b){const xt=Et.get(b);if(xt.__useDefaultFramebuffer!==void 0)Tt.bindFramebuffer(F.FRAMEBUFFER,null),B=!1;else if(xt.__webglFramebuffer===void 0)E.setupRenderTarget(b);else if(xt.__hasExternalTextures)E.rebindTextures(b,Et.get(b.texture).__webglTexture,Et.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const yt=b.depthTexture;if(xt.__boundDepthTexture!==yt){if(yt!==null&&Et.has(yt)&&(b.width!==yt.image.width||b.height!==yt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(b)}}const Lt=b.texture;(Lt.isData3DTexture||Lt.isDataArrayTexture||Lt.isCompressedArrayTexture)&&(ht=!0);const Ut=Et.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ut[U])?N=Ut[U][k]:N=Ut[U],et=!0):b.samples>0&&E.useMultisampledRTT(b)===!1?N=Et.get(b).__webglMultisampledFramebuffer:Array.isArray(Ut)?N=Ut[k]:N=Ut,P.copy(b.viewport),H.copy(b.scissor),z=b.scissorTest}else P.copy(wt).multiplyScalar(V).floor(),H.copy(Bt).multiplyScalar(V).floor(),z=re;if(Tt.bindFramebuffer(F.FRAMEBUFFER,N)&&B&&Tt.drawBuffers(b,N),Tt.viewport(P),Tt.scissor(H),Tt.setScissorTest(z),et){const xt=Et.get(b.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+U,xt.__webglTexture,k)}else if(ht){const xt=Et.get(b.texture),Lt=U||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,xt.__webglTexture,k||0,Lt)}w=-1},this.readRenderTargetPixels=function(b,U,k,B,N,et,ht){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _t=Et.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ht!==void 0&&(_t=_t[ht]),_t){Tt.bindFramebuffer(F.FRAMEBUFFER,_t);try{const xt=b.texture,Lt=xt.format,Ut=xt.type;if(!Vt.textureFormatReadable(Lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Vt.textureTypeReadable(Ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=b.width-B&&k>=0&&k<=b.height-N&&F.readPixels(U,k,B,N,Ft.convert(Lt),Ft.convert(Ut),et)}finally{const xt=L!==null?Et.get(L).__webglFramebuffer:null;Tt.bindFramebuffer(F.FRAMEBUFFER,xt)}}},this.readRenderTargetPixelsAsync=async function(b,U,k,B,N,et,ht){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _t=Et.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ht!==void 0&&(_t=_t[ht]),_t){const xt=b.texture,Lt=xt.format,Ut=xt.type;if(!Vt.textureFormatReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Vt.textureTypeReadable(Ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=b.width-B&&k>=0&&k<=b.height-N){Tt.bindFramebuffer(F.FRAMEBUFFER,_t);const yt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,yt),F.bufferData(F.PIXEL_PACK_BUFFER,et.byteLength,F.STREAM_READ),F.readPixels(U,k,B,N,Ft.convert(Lt),Ft.convert(Ut),0);const $t=L!==null?Et.get(L).__webglFramebuffer:null;Tt.bindFramebuffer(F.FRAMEBUFFER,$t);const oe=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Qu(F,oe,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,yt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,et),F.deleteBuffer(yt),F.deleteSync(oe),et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,U=null,k=0){b.isTexture!==!0&&(Vs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,b=arguments[1]);const B=Math.pow(2,-k),N=Math.floor(b.image.width*B),et=Math.floor(b.image.height*B),ht=U!==null?U.x:0,_t=U!==null?U.y:0;E.setTexture2D(b,0),F.copyTexSubImage2D(F.TEXTURE_2D,k,0,0,ht,_t,N,et),Tt.unbindTexture()},this.copyTextureToTexture=function(b,U,k=null,B=null,N=0){b.isTexture!==!0&&(Vs("WebGLRenderer: copyTextureToTexture function signature has changed."),B=arguments[0]||null,b=arguments[1],U=arguments[2],N=arguments[3]||0,k=null);let et,ht,_t,xt,Lt,Ut,yt,$t,oe;const he=b.isCompressedTexture?b.mipmaps[N]:b.image;k!==null?(et=k.max.x-k.min.x,ht=k.max.y-k.min.y,_t=k.isBox3?k.max.z-k.min.z:1,xt=k.min.x,Lt=k.min.y,Ut=k.isBox3?k.min.z:0):(et=he.width,ht=he.height,_t=he.depth||1,xt=0,Lt=0,Ut=0),B!==null?(yt=B.x,$t=B.y,oe=B.z):(yt=0,$t=0,oe=0);const Ve=Ft.convert(U.format),Zt=Ft.convert(U.type);let bt;U.isData3DTexture?(E.setTexture3D(U,0),bt=F.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(E.setTexture2DArray(U,0),bt=F.TEXTURE_2D_ARRAY):(E.setTexture2D(U,0),bt=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,U.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,U.unpackAlignment);const Ln=F.getParameter(F.UNPACK_ROW_LENGTH),Jt=F.getParameter(F.UNPACK_IMAGE_HEIGHT),ln=F.getParameter(F.UNPACK_SKIP_PIXELS),Ki=F.getParameter(F.UNPACK_SKIP_ROWS),Ye=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,he.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,he.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,xt),F.pixelStorei(F.UNPACK_SKIP_ROWS,Lt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Ut);const Ds=b.isDataArrayTexture||b.isData3DTexture,de=U.isDataArrayTexture||U.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){const xn=Et.get(b),Us=Et.get(U),tn=Et.get(xn.__renderTarget),qn=Et.get(Us.__renderTarget);Tt.bindFramebuffer(F.READ_FRAMEBUFFER,tn.__webglFramebuffer),Tt.bindFramebuffer(F.DRAW_FRAMEBUFFER,qn.__webglFramebuffer);for(let Yn=0;Yn<_t;Yn++)Ds&&F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Et.get(b).__webglTexture,N,Ut+Yn),b.isDepthTexture?(de&&F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Et.get(U).__webglTexture,N,oe+Yn),F.blitFramebuffer(xt,Lt,et,ht,yt,$t,et,ht,F.DEPTH_BUFFER_BIT,F.NEAREST)):de?F.copyTexSubImage3D(bt,N,yt,$t,oe+Yn,xt,Lt,et,ht):F.copyTexSubImage2D(bt,N,yt,$t,oe+Yn,xt,Lt,et,ht);Tt.bindFramebuffer(F.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else de?b.isDataTexture||b.isData3DTexture?F.texSubImage3D(bt,N,yt,$t,oe,et,ht,_t,Ve,Zt,he.data):U.isCompressedArrayTexture?F.compressedTexSubImage3D(bt,N,yt,$t,oe,et,ht,_t,Ve,he.data):F.texSubImage3D(bt,N,yt,$t,oe,et,ht,_t,Ve,Zt,he):b.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,N,yt,$t,et,ht,Ve,Zt,he.data):b.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,N,yt,$t,he.width,he.height,Ve,he.data):F.texSubImage2D(F.TEXTURE_2D,N,yt,$t,et,ht,Ve,Zt,he);F.pixelStorei(F.UNPACK_ROW_LENGTH,Ln),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Jt),F.pixelStorei(F.UNPACK_SKIP_PIXELS,ln),F.pixelStorei(F.UNPACK_SKIP_ROWS,Ki),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Ye),N===0&&U.generateMipmaps&&F.generateMipmap(bt),Tt.unbindTexture()},this.copyTextureToTexture3D=function(b,U,k=null,B=null,N=0){return b.isTexture!==!0&&(Vs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),k=arguments[0]||null,B=arguments[1]||null,b=arguments[2],U=arguments[3],N=arguments[4]||0),Vs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,U,k,B,N)},this.initRenderTarget=function(b){Et.get(b).__webglFramebuffer===void 0&&E.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?E.setTextureCube(b,0):b.isData3DTexture?E.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?E.setTexture2DArray(b,0):E.setTexture2D(b,0),Tt.unbindTexture()},this.resetState=function(){T=0,A=0,L=null,Tt.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Yt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Yt._getUnpackColorSpace()}}class rr{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Pt(t),this.density=e}clone(){return new rr(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Sc{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Pt(t),this.near=e,this.far=n}clone(){return new Sc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class ar extends xe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new An,this.environmentIntensity=1,this.environmentRotation=new An,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class dv extends De{constructor(t=null,e=1,n=1,s,r,a,o,c,l=je,h=je,u,f){super(null,a,o,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Jl extends an{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const hs=new jt,jl=new jt,Or=[],Ql=new Wi,uv=new jt,Bs=new Q,zs=new Xi;class xd extends Q{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Jl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,uv)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Wi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,hs),Ql.copy(t.boundingBox).applyMatrix4(hs),this.boundingBox.union(Ql)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Xi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,hs),zs.copy(t.boundingSphere).applyMatrix4(hs),this.boundingSphere.union(zs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Bs.geometry=this.geometry,Bs.material=this.material,Bs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zs.copy(this.boundingSphere),zs.applyMatrix4(n),t.ray.intersectsSphere(zs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,hs),jl.multiplyMatrices(n,hs),Bs.matrixWorld=jl,Bs.raycast(t,Or);for(let a=0,o=Or.length;a<o;a++){const c=Or[a];c.instanceId=r,c.object=this,e.push(c)}Or.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Jl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new dv(new Float32Array(s*this.count),s,this.count,pc,wn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*t;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class yd extends qi{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Pt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ia=new C,sa=new C,th=new jt,Hs=new xc,kr=new Xi,Xa=new C,eh=new C;class fv extends xe{constructor(t=new Ue,e=new yd){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)ia.fromBufferAttribute(e,s-1),sa.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=ia.distanceTo(sa);t.setAttribute("lineDistance",new ce(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),kr.copy(n.boundingSphere),kr.applyMatrix4(s),kr.radius+=r,t.ray.intersectsSphere(kr)===!1)return;th.copy(s).invert(),Hs.copy(t.ray).applyMatrix4(th);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=p,m=g-1;v<m;v+=l){const d=h.getX(v),S=h.getX(v+1),M=Br(this,t,Hs,c,d,S);M&&e.push(M)}if(this.isLineLoop){const v=h.getX(g-1),m=h.getX(p),d=Br(this,t,Hs,c,v,m);d&&e.push(d)}}else{const p=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let v=p,m=g-1;v<m;v+=l){const d=Br(this,t,Hs,c,v,v+1);d&&e.push(d)}if(this.isLineLoop){const v=Br(this,t,Hs,c,g-1,p);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Br(i,t,e,n,s,r){const a=i.geometry.attributes.position;if(ia.fromBufferAttribute(a,s),sa.fromBufferAttribute(a,r),e.distanceSqToSegment(ia,sa,Xa,eh)>n)return;Xa.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Xa);if(!(c<t.near||c>t.far))return{distance:c,point:eh.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}class Md extends qi{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Pt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const nh=new jt,Jo=new xc,zr=new Xi,Hr=new C;class pv extends xe{constructor(t=new Ue,e=new Md){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),zr.copy(n.boundingSphere),zr.applyMatrix4(s),zr.radius+=r,t.ray.intersectsSphere(zr)===!1)return;nh.copy(s).invert(),Jo.copy(t.ray).applyMatrix4(nh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,u=n.attributes.position;if(l!==null){const f=Math.max(0,a.start),p=Math.min(l.count,a.start+a.count);for(let g=f,v=p;g<v;g++){const m=l.getX(g);Hr.fromBufferAttribute(u,m),ih(Hr,m,c,s,t,e,this)}}else{const f=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let g=f,v=p;g<v;g++)Hr.fromBufferAttribute(u,g),ih(Hr,g,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ih(i,t,e,n,s,r,a){const o=Jo.distanceSqToPoint(i);if(o<e){const c=new C;Jo.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class mv extends De{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Rn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);const h=n[s],f=n[s+1]-h,p=(a-h)/f;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),c=e||(a.isVector2?new mt:new C);return c.copy(o).sub(a).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new C,s=[],r=[],a=[],o=new C,c=new jt;for(let p=0;p<=t;p++){const g=p/t;s[p]=this.getTangentAt(g,new C)}r[0]=new C,a[0]=new C;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),f<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(s[p-1],s[p]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Ce(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(o,g))}a[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos(Ce(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],p*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class bc extends Rn{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(t,e=new mt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,p=l-this.aY;c=f*h-p*u+this.aX,l=f*u+p*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class gv extends bc{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function wc(){let i=0,t=0,e=0,n=0;function s(r,a,o,c){i=r,t=o,e=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,u){let f=(a-r)/l-(o-r)/(l+h)+(o-a)/h,p=(o-a)/h-(c-a)/(h+u)+(c-o)/u;f*=h,p*=h,s(a,o,f,p)},calc:function(r){const a=r*r,o=a*r;return i+t*r+e*a+n*o}}}const Gr=new C,qa=new wc,Ya=new wc,$a=new wc;class vv extends Rn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new C){const n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=s[(o-1)%r]:(Gr.subVectors(s[0],s[1]).add(s[0]),l=Gr);const u=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Gr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Gr),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),p),v=Math.pow(u.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(h),p);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),qa.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,g,v,m),Ya.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,g,v,m),$a.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(qa.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),Ya.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),$a.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return n.set(qa.calc(c),Ya.calc(c),$a.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new C().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function sh(i,t,e,n,s){const r=(n-t)*.5,a=(s-e)*.5,o=i*i,c=i*o;return(2*e-2*n+r+a)*c+(-3*e+3*n-2*r-a)*o+r*i+e}function _v(i,t){const e=1-i;return e*e*t}function xv(i,t){return 2*(1-i)*i*t}function yv(i,t){return i*i*t}function Ks(i,t,e,n){return _v(i,t)+xv(i,e)+yv(i,n)}function Mv(i,t){const e=1-i;return e*e*e*t}function Sv(i,t){const e=1-i;return 3*e*e*i*t}function bv(i,t){return 3*(1-i)*i*i*t}function wv(i,t){return i*i*i*t}function Zs(i,t,e,n,s){return Mv(i,t)+Sv(i,e)+bv(i,n)+wv(i,s)}class Sd extends Rn{constructor(t=new mt,e=new mt,n=new mt,s=new mt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new mt){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Zs(t,s.x,r.x,a.x,o.x),Zs(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ev extends Rn{constructor(t=new C,e=new C,n=new C,s=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new C){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Zs(t,s.x,r.x,a.x,o.x),Zs(t,s.y,r.y,a.y,o.y),Zs(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class bd extends Rn{constructor(t=new mt,e=new mt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new mt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new mt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Tv extends Rn{constructor(t=new C,e=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new C){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new C){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class wd extends Rn{constructor(t=new mt,e=new mt,n=new mt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new mt){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Ks(t,s.x,r.x,a.x),Ks(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Av extends Rn{constructor(t=new C,e=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new C){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Ks(t,s.x,r.x,a.x),Ks(t,s.y,r.y,a.y),Ks(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ed extends Rn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new mt){const n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(sh(o,c.x,l.x,h.x,u.x),sh(o,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new mt().fromArray(s))}return this}}var rh=Object.freeze({__proto__:null,ArcCurve:gv,CatmullRomCurve3:vv,CubicBezierCurve:Sd,CubicBezierCurve3:Ev,EllipseCurve:bc,LineCurve:bd,LineCurve3:Tv,QuadraticBezierCurve:wd,QuadraticBezierCurve3:Av,SplineCurve:Ed});class Cv extends Rn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new rh[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,c=a.getPoints(o);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new rh[s.type]().fromJSON(s))}return this}}class Rv extends Cv{constructor(t){super(),this.type="Path",this.currentPoint=new mt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new bd(this.currentPoint.clone(),new mt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new wd(this.currentPoint.clone(),new mt(t,e),new mt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){const o=new Sd(this.currentPoint.clone(),new mt(t,e),new mt(n,s),new mt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Ed(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+o,e+c,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,a,o,c),this}absellipse(t,e,n,s,r,a,o,c){const l=new bc(t,e,n,s,r,a,o,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Ec extends Ue{constructor(t=[new mt(0,-.5),new mt(.5,0),new mt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Ce(s,0,Math.PI*2);const r=[],a=[],o=[],c=[],l=[],h=1/e,u=new C,f=new mt,p=new C,g=new C,v=new C;let m=0,d=0;for(let S=0;S<=t.length-1;S++)switch(S){case 0:m=t[S+1].x-t[S].x,d=t[S+1].y-t[S].y,p.x=d*1,p.y=-m,p.z=d*0,v.copy(p),p.normalize(),c.push(p.x,p.y,p.z);break;case t.length-1:c.push(v.x,v.y,v.z);break;default:m=t[S+1].x-t[S].x,d=t[S+1].y-t[S].y,p.x=d*1,p.y=-m,p.z=d*0,g.copy(p),p.x+=v.x,p.y+=v.y,p.z+=v.z,p.normalize(),c.push(p.x,p.y,p.z),v.copy(g)}for(let S=0;S<=e;S++){const M=n+S*h*s,_=Math.sin(M),I=Math.cos(M);for(let T=0;T<=t.length-1;T++){u.x=t[T].x*_,u.y=t[T].y,u.z=t[T].x*I,a.push(u.x,u.y,u.z),f.x=S/e,f.y=T/(t.length-1),o.push(f.x,f.y);const A=c[3*T+0]*_,L=c[3*T+1],w=c[3*T+0]*I;l.push(A,L,w)}}for(let S=0;S<e;S++)for(let M=0;M<t.length-1;M++){const _=M+S*t.length,I=_,T=_+t.length,A=_+t.length+1,L=_+1;r.push(I,T,L),r.push(A,L,T)}this.setIndex(r),this.setAttribute("position",new ce(a,3)),this.setAttribute("uv",new ce(o,2)),this.setAttribute("normal",new ce(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ec(t.points,t.segments,t.phiStart,t.phiLength)}}class pa extends Ec{constructor(t=1,e=1,n=4,s=8){const r=new Rv;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new pa(t.radius,t.length,t.capSegments,t.radialSegments)}}class En extends Ue{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],c=[],l=new C,h=new mt;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const p=n+u/e*s;l.x=t*Math.cos(p),l.y=t*Math.sin(p),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[f]/t+1)/2,h.y=(a[f+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new ce(a,3)),this.setAttribute("normal",new ce(o,3)),this.setAttribute("uv",new ce(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new En(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Ae extends Ue{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],p=[];let g=0;const v=[],m=n/2;let d=0;S(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new ce(u,3)),this.setAttribute("normal",new ce(f,3)),this.setAttribute("uv",new ce(p,2));function S(){const _=new C,I=new C;let T=0;const A=(e-t)/n;for(let L=0;L<=r;L++){const w=[],y=L/r,P=y*(e-t)+t;for(let H=0;H<=s;H++){const z=H/s,X=z*c+o,Z=Math.sin(X),W=Math.cos(X);I.x=P*Z,I.y=-y*n+m,I.z=P*W,u.push(I.x,I.y,I.z),_.set(Z,A,W).normalize(),f.push(_.x,_.y,_.z),p.push(z,1-y),w.push(g++)}v.push(w)}for(let L=0;L<s;L++)for(let w=0;w<r;w++){const y=v[w][L],P=v[w+1][L],H=v[w+1][L+1],z=v[w][L+1];(t>0||w!==0)&&(h.push(y,P,z),T+=3),(e>0||w!==r-1)&&(h.push(P,H,z),T+=3)}l.addGroup(d,T,0),d+=T}function M(_){const I=g,T=new mt,A=new C;let L=0;const w=_===!0?t:e,y=_===!0?1:-1;for(let H=1;H<=s;H++)u.push(0,m*y,0),f.push(0,y,0),p.push(.5,.5),g++;const P=g;for(let H=0;H<=s;H++){const X=H/s*c+o,Z=Math.cos(X),W=Math.sin(X);A.x=w*W,A.y=m*y,A.z=w*Z,u.push(A.x,A.y,A.z),f.push(0,y,0),T.x=Z*.5+.5,T.y=W*.5*y+.5,p.push(T.x,T.y),g++}for(let H=0;H<s;H++){const z=I+H,X=P+H;_===!0?h.push(X,X+1,z):h.push(X+1,X,z),L+=3}l.addGroup(d,L,_===!0?1:2),d+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ae(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Je extends Ae{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Je(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Tc extends Ue{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],a=[];o(s),l(n),h(),this.setAttribute("position",new ce(r,3)),this.setAttribute("normal",new ce(r.slice(),3)),this.setAttribute("uv",new ce(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(S){const M=new C,_=new C,I=new C;for(let T=0;T<e.length;T+=3)p(e[T+0],M),p(e[T+1],_),p(e[T+2],I),c(M,_,I,S)}function c(S,M,_,I){const T=I+1,A=[];for(let L=0;L<=T;L++){A[L]=[];const w=S.clone().lerp(_,L/T),y=M.clone().lerp(_,L/T),P=T-L;for(let H=0;H<=P;H++)H===0&&L===T?A[L][H]=w:A[L][H]=w.clone().lerp(y,H/P)}for(let L=0;L<T;L++)for(let w=0;w<2*(T-L)-1;w++){const y=Math.floor(w/2);w%2===0?(f(A[L][y+1]),f(A[L+1][y]),f(A[L][y])):(f(A[L][y+1]),f(A[L+1][y+1]),f(A[L+1][y]))}}function l(S){const M=new C;for(let _=0;_<r.length;_+=3)M.x=r[_+0],M.y=r[_+1],M.z=r[_+2],M.normalize().multiplyScalar(S),r[_+0]=M.x,r[_+1]=M.y,r[_+2]=M.z}function h(){const S=new C;for(let M=0;M<r.length;M+=3){S.x=r[M+0],S.y=r[M+1],S.z=r[M+2];const _=m(S)/2/Math.PI+.5,I=d(S)/Math.PI+.5;a.push(_,1-I)}g(),u()}function u(){for(let S=0;S<a.length;S+=6){const M=a[S+0],_=a[S+2],I=a[S+4],T=Math.max(M,_,I),A=Math.min(M,_,I);T>.9&&A<.1&&(M<.2&&(a[S+0]+=1),_<.2&&(a[S+2]+=1),I<.2&&(a[S+4]+=1))}}function f(S){r.push(S.x,S.y,S.z)}function p(S,M){const _=S*3;M.x=t[_+0],M.y=t[_+1],M.z=t[_+2]}function g(){const S=new C,M=new C,_=new C,I=new C,T=new mt,A=new mt,L=new mt;for(let w=0,y=0;w<r.length;w+=9,y+=6){S.set(r[w+0],r[w+1],r[w+2]),M.set(r[w+3],r[w+4],r[w+5]),_.set(r[w+6],r[w+7],r[w+8]),T.set(a[y+0],a[y+1]),A.set(a[y+2],a[y+3]),L.set(a[y+4],a[y+5]),I.copy(S).add(M).add(_).divideScalar(3);const P=m(I);v(T,y+0,S,P),v(A,y+2,M,P),v(L,y+4,_,P)}}function v(S,M,_,I){I<0&&S.x===1&&(a[M]=S.x-1),_.x===0&&_.z===0&&(a[M]=I/2/Math.PI+.5)}function m(S){return Math.atan2(S.z,-S.x)}function d(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Tc(t.vertices,t.indices,t.radius,t.details)}}class Xe extends Tc{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Xe(t.radius,t.detail)}}class rn extends Ue{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const h=[],u=new C,f=new C,p=[],g=[],v=[],m=[];for(let d=0;d<=n;d++){const S=[],M=d/n;let _=0;d===0&&a===0?_=.5/e:d===n&&c===Math.PI&&(_=-.5/e);for(let I=0;I<=e;I++){const T=I/e;u.x=-t*Math.cos(s+T*r)*Math.sin(a+M*o),u.y=t*Math.cos(a+M*o),u.z=t*Math.sin(s+T*r)*Math.sin(a+M*o),g.push(u.x,u.y,u.z),f.copy(u).normalize(),v.push(f.x,f.y,f.z),m.push(T+_,1-M),S.push(l++)}h.push(S)}for(let d=0;d<n;d++)for(let S=0;S<e;S++){const M=h[d][S+1],_=h[d][S],I=h[d+1][S],T=h[d+1][S+1];(d!==0||a>0)&&p.push(M,_,T),(d!==n-1||c<Math.PI)&&p.push(_,I,T)}this.setIndex(p),this.setAttribute("position",new ce(g,3)),this.setAttribute("normal",new ce(v,3)),this.setAttribute("uv",new ce(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new rn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class sn extends Ue{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],c=[],l=[],h=new C,u=new C,f=new C;for(let p=0;p<=n;p++)for(let g=0;g<=s;g++){const v=g/s*r,m=p/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(v),u.y=(t+e*Math.cos(m))*Math.sin(v),u.z=e*Math.sin(m),o.push(u.x,u.y,u.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(g/s),l.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=s;g++){const v=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,d=(s+1)*(p-1)+g,S=(s+1)*p+g;a.push(v,m,S),a.push(m,d,S)}this.setIndex(a),this.setAttribute("position",new ce(o,3)),this.setAttribute("normal",new ce(c,3)),this.setAttribute("uv",new ce(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new sn(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Kt extends qi{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Pt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qh,this.normalScale=new mt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new An,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const ah={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Pv{constructor(t,e,n){const s=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){const p=l[u],g=l[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}}const Lv=new Pv;class Ac{constructor(t){this.manager=t!==void 0?t:Lv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}Ac.DEFAULT_MATERIAL_NAME="__DEFAULT";class Iv extends Ac{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,a=ah.get(t);if(a!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0),a;const o=ir("img");function c(){h(),ah.add(t,this),e&&e(this),r.manager.itemEnd(t)}function l(u){h(),s&&s(u),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(t),o.src=t,o}}class Dv extends Ac{constructor(t){super(t)}load(t,e,n,s){const r=new De,a=new Iv(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){r.image=o,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}}class Cc extends xe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Pt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class or extends Cc{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Pt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Ka=new jt,oh=new C,ch=new C;class Td{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new mt(512,512),this.map=null,this.mapPass=null,this.matrix=new jt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new yc,this._frameExtents=new mt(1,1),this._viewportCount=1,this._viewports=[new se(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;oh.setFromMatrixPosition(t.matrixWorld),e.position.copy(oh),ch.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ch),e.updateMatrixWorld(),Ka.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ka),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ka)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const lh=new jt,Gs=new C,Za=new C;class Uv extends Td{constructor(){super(new Pe(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new mt(4,2),this._viewportCount=6,this._viewports=[new se(2,1,1,1),new se(0,1,1,1),new se(3,1,1,1),new se(1,1,1,1),new se(3,0,1,1),new se(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Gs.setFromMatrixPosition(t.matrixWorld),n.position.copy(Gs),Za.copy(n.position),Za.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Za),n.updateMatrixWorld(),s.makeTranslation(-Gs.x,-Gs.y,-Gs.z),lh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(lh)}}class Ad extends Cc{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Uv}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Nv extends Td{constructor(){super(new fd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Es extends Cc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.target=new xe,this.shadow=new Nv}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:lc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=lc);const Fv=new Map(ut.species.map(i=>[i.id,i]));function Rc(i,t){return new Kt({color:i,roughness:.82,flatShading:!0,emissive:t??"#000000",emissiveIntensity:t?.18:0})}function fe(i,t,e,n,s=8,r){const a=new Q(new rn(1,s,Math.max(5,s-2)),Rc(t,r));return a.position.set(...e),a.scale.set(...n),a.castShadow=!0,i.add(a),a}function Ze(i,t,e,n,s=0){const r=new Q(new Je(.38,.72,5),Rc(t));return r.position.set(...e),r.scale.set(...n),r.rotation.z=s,i.add(r),r}function Ja(i){const t=new Set,e=new Set;i.traverse(n=>{if(n instanceof Q){t.add(n.geometry);for(const s of Array.isArray(n.material)?n.material:[n.material])e.add(s)}});for(const n of t)n.dispose();for(const n of e)n.dispose()}function cr(i,t){const e=Fv.get(i),n=new ve,s=Math.cbrt(Math.max(.01,t)/e.medianKg);if(n.scale.setScalar(s),i==="bluegill")fe(n,"#71834b",[0,0,0],[.51,.55,.2],9),fe(n,"#e4a64b",[.04,-.24,.025],[.39,.29,.195],8),fe(n,"#273c31",[.29,.04,.18],[.075,.085,.035],6),Ze(n,"#637747",[-.55,0,0],[.75,.8,.65],Math.PI/2),Ze(n,"#7f914c",[-.02,.48,0],[1.2,.55,.6]),Ze(n,"#e7a14a",[.05,-.42,0],[.8,.4,.5],Math.PI);else if(i==="rainbow-trout"){fe(n,"#b7c3bb",[0,0,0],[.79,.32,.19],10),fe(n,"#df8e9b",[-.02,.005,.17],[.58,.075,.035],8),fe(n,"#f1e4d1",[.05,-.17,.02],[.56,.16,.16],8),Ze(n,"#aebdb4",[-.78,0,0],[.7,.75,.65],Math.PI/2),Ze(n,"#bd8790",[-.2,.29,0],[1.5,.38,.6]),Ze(n,"#b4c5bd",[.12,-.24,0],[.7,.45,.6],Math.PI);for(let r=0;r<12;r++){const a=-.48+r%6*.17,o=r<6?.12:-.1;fe(n,"#52645e",[a,o,.192],[.025,.025,.012],5)}}else if(i==="largemouth-bass"){fe(n,"#66844d",[0,0,0],[.82,.36,.21],9),fe(n,"#384f39",[-.02,-.015,.19],[.63,.105,.035],8),fe(n,"#a5a264",[.06,-.24,.01],[.62,.15,.17],8),Ze(n,"#567340",[-.82,0,0],[.76,.8,.7],Math.PI/2);for(let r=0;r<7;r++)Ze(n,"#51683e",[-.45+r*.14,.28+r%2*.035,0],[.45,.5,.55]);fe(n,"#40543a",[.78,-.08,0],[.26,.12,.19],7),fe(n,"#f3d996",[.83,-.09,.16],[.15,.025,.025],6)}else if(i==="common-carp"){fe(n,"#a8793e",[0,.02,0],[.72,.47,.27],9),fe(n,"#d3a052",[-.02,-.26,.03],[.53,.23,.23],8),Ze(n,"#936a3c",[-.73,.02,0],[.7,.75,.65],Math.PI/2),Ze(n,"#aa8044",[-.05,.4,0],[1.2,.45,.65]);for(let r=0;r<3;r++)for(let a=0;a<5;a++)fe(n,r%2?"#d5aa60":"#c6944c",[-.47+a*.19,.12-r*.14,.245],[.065,.055,.018],5);fe(n,"#745832",[.66,-.16,.12],[.11,.07,.11],6);for(const r of[-.2,-.27]){const a=new Q(new Ae(.012,.018,.15,5),Rc("#765634"));a.position.set(.72,r,.2),a.rotation.z=-.75,n.add(a)}}else fe(n,"#f1ead7",[0,0,0],[.84,.34,.2],10,"#8a6917"),fe(n,"#e87b36",[-.38,.12,.17],[.25,.18,.045],7),fe(n,"#d9a734",[.2,-.05,.17],[.27,.19,.045],7),fe(n,"#e9873c",[.59,.11,.13],[.19,.16,.045],7),Ze(n,"#df913f",[-.84,0,0],[.95,1.1,.8],Math.PI/2),Ze(n,"#e8a744",[-.08,.32,0],[1.35,.44,.75]),Ze(n,"#e8a744",[.12,-.28,0],[1.15,.38,.75],Math.PI),fe(n,"#bb6e39",[.05,.18,.19],[.7,.018,.012],6,"#d0a741");return fe(n,"#fff9e9",[.42,.11,.175],[.075,.075,.04],7),fe(n,"#1d302c",[.445,.11,.21],[.032,.038,.02],6),n}class Ov{constructor(t){R(this,"previewRenderer");R(this,"previewScene",new ar);R(this,"previewCamera",new Pe(35,1.5,.1,30));R(this,"previewFish");R(this,"previewVisible",!1);R(this,"previewEndsAt",0);R(this,"iconRenderer");R(this,"iconScene",new ar);R(this,"iconCamera",new Pe(38,1.5,.1,30));this.canvas=t,this.previewRenderer=new sr({canvas:t,alpha:!0,antialias:!0,preserveDrawingBuffer:!0}),this.previewRenderer.setPixelRatio(Math.min(devicePixelRatio,2)),this.previewRenderer.setSize(300,190,!1),this.previewRenderer.outputColorSpace=be,this.previewScene.add(new or("#fff9e8","#738b7a",2.2));const e=new Es("#fff5d3",3);e.position.set(-2,4,5),this.previewScene.add(e),this.previewCamera.position.set(0,.25,6),this.previewCamera.lookAt(0,0,0);const n=document.createElement("canvas");this.iconRenderer=new sr({canvas:n,alpha:!0,antialias:!0,preserveDrawingBuffer:!0}),this.iconRenderer.setPixelRatio(1),this.iconRenderer.setSize(96,64),this.iconRenderer.outputColorSpace=be,this.iconScene.add(new or("#fff9e8","#738b7a",2.2));const s=new Es("#fff5d3",3);s.position.set(-2,4,5),this.iconScene.add(s),this.iconCamera.position.set(0,.1,5),this.iconCamera.lookAt(0,0,0)}show(t,e){this.previewFish&&(this.previewScene.remove(this.previewFish),Ja(this.previewFish)),this.previewFish=cr(t,e),this.previewScene.add(this.previewFish),this.previewVisible=!0,this.previewEndsAt=performance.now()+3200}iconDataUrl(t,e){const n=cr(t,e);this.iconScene.add(n),this.iconRenderer.render(this.iconScene,this.iconCamera);const s=this.iconRenderer.domElement.toDataURL("image/png");return this.iconScene.remove(n),Ja(n),s}render(t){return!this.previewFish||!this.previewVisible?!1:(t>=this.previewEndsAt?this.previewVisible=!1:(this.previewFish.rotation.y=Math.sin(t*.0012)*.48,this.previewFish.rotation.x=Math.sin(t*8e-4)*.08),this.previewRenderer.render(this.previewScene,this.previewCamera),this.previewVisible)}dispose(){this.previewFish&&Ja(this.previewFish),this.previewRenderer.dispose(),this.iconRenderer.dispose()}}const ja={maxCount:8,scorePopupDurationMs:1e3},fn=class fn{constructor(t,e){R(this,"tracks",new Map);R(this,"order",[]);R(this,"hiddenChickens",new Set);R(this,"popups",[]);R(this,"bursts",[]);R(this,"bodies");R(this,"wings");R(this,"heads");R(this,"beaks");R(this,"combs");R(this,"tails");R(this,"legs");R(this,"eyes");R(this,"root",new xe);R(this,"part",new xe);R(this,"worldMatrix",new jt);this.scene=t,this.labels=e;const n=new Kt({color:"#fffdf4",roughness:1,flatShading:!0}),s=new Kt({color:"#e79a45",roughness:1,flatShading:!0}),r=new Kt({color:"#cf6258",roughness:1,flatShading:!0}),a=new Kt({color:"#34433a",roughness:1,flatShading:!0});this.bodies=this.makeInstances(new Xe(1,0),n,fn.count),this.wings=this.makeInstances(new Xe(1,0),n,fn.count*2),this.heads=this.makeInstances(new rn(1,7,5),n,fn.count),this.beaks=this.makeInstances(new Je(1,1,5),s,fn.count),this.combs=this.makeInstances(new Xe(1,0),r,fn.count),this.tails=this.makeInstances(new Je(1,1,5),n,fn.count),this.legs=this.makeInstances(new Ae(1,1,1,5),s,fn.count*2),this.eyes=this.makeInstances(new rn(1,6,4),a,fn.count*2)}setSnapshots(t,e){this.order.length=0;const n=new Set;for(const[s,r]of t.entries()){n.add(r.id),this.order.push(r.id);let a=this.tracks.get(r.id);a||(a={id:r.id,bodyColor:new Pt(r.bodyColor),samples:[],state:r.state,phase:s*2.31},this.tracks.set(r.id,a)),a.state=r.state,a.bodyColor.set(r.bodyColor),r.state==="respawning"?this.hiddenChickens.add(r.id):this.hiddenChickens.delete(r.id);const o=a.samples[a.samples.length-1];if((o==null?void 0:o.state)==="respawning"&&r.state!=="respawning")a.samples=[{...r,serverTime:e}];else if(!o||e>o.serverTime)for(a.samples.push({...r,serverTime:e});a.samples.length>4;)a.samples.shift();this.bodies.setColorAt(s,a.bodyColor),this.wings.setColorAt(s*2,a.bodyColor),this.wings.setColorAt(s*2+1,a.bodyColor)}for(const s of this.tracks.keys())n.has(s)||this.tracks.delete(s);this.setActiveCount(t.length),this.bodies.instanceColor&&(this.bodies.instanceColor.needsUpdate=!0),this.wings.instanceColor&&(this.wings.instanceColor.needsUpdate=!0)}hit(t){this.hiddenChickens.add(t.chickenId);const e=document.createElement("div");e.className="chicken-score-pop",e.textContent="+1",this.labels.appendChild(e),this.popups.push({chickenId:t.chickenId,element:e,startedAt:t.startTime});const n=this.tracks.get(t.chickenId),s=n==null?void 0:n.samples[n.samples.length-1];s&&this.createPopBurst(s.x,s.z,t.startTime)}render(t,e){const n=t-120,s=t/1e3;for(const[r,a]of this.order.entries()){const o=this.tracks.get(a);if(!o)continue;const c=this.poseAt(o,n),l=c.state==="wander",h=l?9:2.2,u=Math.sin(s*h+o.phase)*(l?.06:.02),f=Math.sin(s*h*1.8+o.phase)*.14;this.root.position.set(c.x,0,c.z),this.root.scale.setScalar(c.state==="respawning"||this.hiddenChickens.has(a)?0:1),this.root.rotation.set(0,c.facing,u),this.root.updateMatrix(),this.place(this.bodies,r,[0,.34,0],[.36,.27,.45]),this.place(this.heads,r,[0,.59,.27],[.17,.17,.17]),this.place(this.beaks,r,[0,.58,.43],[.075,.075,.13],[Math.PI/2,0,0]),this.place(this.combs,r,[0,.78,.25],[.105,.12,.09]),this.place(this.tails,r,[0,.45,-.39],[.12,.2,.13],[-Math.PI/4,0,0]);for(const p of[-1,1]){const g=r*2+(p===-1?0:1),v=Math.abs(f)*.08;this.place(this.wings,g,[p*.25,.36,0],[.13,.18,.27],[0,0,p*(.22+v)]),this.place(this.legs,g,[p*.105,.115,f*p*.035],[.035,.12,.035],[f*p,0,0]),this.place(this.eyes,g,[p*.105,.62,.405],[.027,.03,.027])}}for(const r of[this.bodies,this.wings,this.heads,this.beaks,this.combs,this.tails,this.legs,this.eyes])r.instanceMatrix.needsUpdate=!0;this.renderPopups(t,n,e),this.renderPopBursts(t)}createPopBurst(t,e,n){const r=new Ue,a=new Float32Array(21),o=new Float32Array(21);for(let h=0;h<7;h++){const u=h/7*Math.PI*2,f=h*3;o[f]=Math.cos(u)*(.5+h%3*.12),o[f+1]=.55+h%4*.13,o[f+2]=Math.sin(u)*(.5+h%2*.16)}r.setAttribute("position",new an(a,3));const c=new Md({color:"#fff1c8",size:.2,transparent:!0,opacity:.95,depthWrite:!1,sizeAttenuation:!0}),l=new pv(r,c);l.position.set(t,.72,e),l.frustumCulled=!1,this.scene.add(l),this.bursts.push({points:l,geometry:r,material:c,startedAt:n,velocities:o})}renderPopBursts(t){for(let e=this.bursts.length-1;e>=0;e--){const n=this.bursts[e],s=(t-n.startedAt)/450;if(s>=1){this.scene.remove(n.points),n.geometry.dispose(),n.material.dispose(),this.bursts.splice(e,1);continue}const r=Math.max(0,s),a=n.geometry.attributes.position;for(let o=0;o<n.velocities.length/3;o++){const c=o*3;a.setXYZ(c/3,n.velocities[c]*r,n.velocities[c+1]*r+.22*r*r,n.velocities[c+2]*r)}a.needsUpdate=!0,n.material.opacity=.95*(1-r)}}setActiveCount(t){this.bodies.count=t,this.heads.count=t,this.beaks.count=t,this.combs.count=t,this.tails.count=t,this.wings.count=t*2,this.legs.count=t*2,this.eyes.count=t*2}poseAt(t,e){const n=t.samples;if(n.length<2||e<=n[0].serverTime){const l=n[0];return{x:l.x,z:l.z,facing:l.facing,state:l.state}}let s=n.findIndex(l=>l.serverTime>=e);if(s>0){const l=n[s-1],h=n[s],u=(e-l.serverTime)/Math.max(1,h.serverTime-l.serverTime),f=Math.atan2(Math.sin(h.facing-l.facing),Math.cos(h.facing-l.facing));return{x:l.x+(h.x-l.x)*u,z:l.z+(h.z-l.z)*u,facing:l.facing+f*u,state:u<.5?l.state:h.state}}s=n.length-1;const r=n[s],a=n[s-1],o=Math.max(1,r.serverTime-a.serverTime),c=Math.min(.12,Math.max(0,e-r.serverTime))/o;return{x:r.x+(r.x-a.x)*c,z:r.z+(r.z-a.z)*c,facing:r.facing,state:r.state}}renderPopups(t,e,n){for(let s=this.popups.length-1;s>=0;s--){const r=this.popups[s],a=t-r.startedAt;if(a>=ja.scorePopupDurationMs){r.element.remove(),this.popups.splice(s,1);continue}const o=this.tracks.get(r.chickenId);if(!o){r.element.style.display="none";continue}const c=this.poseAt(o,e),l=new C(c.x,1.35+Math.max(0,a)*45e-5,c.z).project(n);r.element.style.left=`${Math.round((l.x*.5+.5)*innerWidth)}px`,r.element.style.top=`${Math.round((-l.y*.5+.5)*innerHeight)}px`,r.element.style.opacity=String(Math.max(0,1-a/ja.scorePopupDurationMs)),r.element.style.display=l.z<=1&&Math.abs(l.x)<=1.2&&Math.abs(l.y)<=1.2?"block":"none"}}makeInstances(t,e,n){const s=new xd(t,e,n);return s.count=0,s.instanceMatrix.setUsage(ed),s.frustumCulled=!1,s.castShadow=!1,s.receiveShadow=!1,this.scene.add(s),s}place(t,e,n,s,r=[0,0,0]){this.part.position.set(n[0],n[1],n[2]),this.part.rotation.set(r[0],r[1],r[2]),this.part.scale.set(s[0],s[1],s[2]),this.part.updateMatrix(),this.worldMatrix.multiplyMatrices(this.root.matrix,this.part.matrix),t.setMatrixAt(e,this.worldMatrix)}};R(fn,"count",ja.maxCount);let jo=fn;class kv{constructor(t,e){R(this,"group",new ve);R(this,"flames",[]);R(this,"firelight");R(this,"interactionPrompt");R(this,"cookStatus");R(this,"cookTitle");R(this,"cookProgress");R(this,"cookProgressFill");R(this,"cooking",null);R(this,"cookedFish",null);this.group.position.set(me.campfire.x,0,me.campfire.z),t.add(this.group);const n=new Q(new En(4.5,12),new Kt({color:"#cbbb92",roughness:1,flatShading:!0}));n.rotation.x=-Math.PI/2,n.position.y=.028,n.receiveShadow=!0,this.group.add(n);const s=new Q(new sn(4.45,.07,4,12),new Kt({color:"#e1d2a9",roughness:1,flatShading:!0}));s.rotation.x=Math.PI/2,s.position.y=.04,this.group.add(s);const r=new Xe(.27,0),a=[new Kt({color:"#777d70",roughness:1,flatShading:!0}),new Kt({color:"#92917e",roughness:1,flatShading:!0})];for(let v=0;v<10;v++){const m=v/10*Math.PI*2,d=new Q(r,a[v%a.length]);d.position.set(Math.cos(m)*.88,.2,Math.sin(m)*.88),d.scale.set(1.05,.72,.88),d.rotation.set(.2*v,m,.15*v),d.castShadow=!0,d.receiveShadow=!0,this.group.add(d)}const o=new Kt({color:"#8b6344",roughness:1,flatShading:!0}),c=new Ae(.12,.15,1.05,6);for(let v=0;v<3;v++){const m=new Q(c,o);m.position.set(0,.31+v*.035,0),m.rotation.set(0,v*Math.PI/3,Math.PI/2),m.castShadow=!0,this.group.add(m)}const l=new Ae(.16,.2,1.75,7),h=new Kt({color:"#9b714e",roughness:1,flatShading:!0}),u=new Kt({color:"#72513b",roughness:1,flatShading:!0});for(let v=0;v<3;v++){const m=v/3*Math.PI*2+Math.PI/6,d=new Q(l,h);d.position.set(Math.cos(m)*2.7,.34,Math.sin(m)*2.7),d.rotation.set(0,m+Math.PI/2,Math.PI/2),d.castShadow=!0,d.receiveShadow=!0,this.group.add(d);for(const S of[-1,1]){const M=new Q(new Ae(.19,.2,.045,7),u);M.position.set(0,.86*S,0),d.add(M)}}this.flames.push(this.addFlame("#ef7040",.46,.98,.62),this.addFlame("#f6a33e",.32,.74,.69),this.addFlame("#ffcf63",.2,.52,.75)),this.firelight=new Ad("#ff9d50",2.3,11,2),this.firelight.position.set(0,1.05,0),this.group.add(this.firelight),this.interactionPrompt=document.createElement("div"),this.interactionPrompt.className="campfire-interaction-prompt hidden",this.interactionPrompt.setAttribute("aria-hidden","true");const f=document.createElement("kbd");f.textContent="C";const p=document.createElement("span");p.textContent="to cook",this.interactionPrompt.append(f,p),e.append(this.interactionPrompt),this.cookStatus=document.createElement("div"),this.cookStatus.className="campfire-cook-status hidden",this.cookStatus.setAttribute("aria-hidden","true");const g=document.createElement("strong");g.className="campfire-cook-title",this.cookTitle=g,this.cookProgress=document.createElement("div"),this.cookProgress.className="campfire-cook-progress",this.cookProgress.setAttribute("role","progressbar"),this.cookProgress.setAttribute("aria-valuemin","0"),this.cookProgress.setAttribute("aria-valuemax","100"),this.cookProgressFill=document.createElement("div"),this.cookProgressFill.className="campfire-cook-progress-fill",this.cookProgress.append(this.cookProgressFill),this.cookStatus.append(g,this.cookProgress),e.append(this.cookStatus)}get activeCookId(){var t;return((t=this.cooking)==null?void 0:t.cookId)??null}setCooking(t){var s;if(((s=this.cooking)==null?void 0:s.cookId)===(t==null?void 0:t.cookId))return;if(this.removeCookedFish(),this.cooking=t,!t){this.cookStatus.classList.add("hidden");return}const e=ut.species.find(r=>r.id===t.fish.species);this.cookTitle.textContent=`Cooking ${e.name}…`,this.cookProgressFill.style.width="0%";const n=cr(t.fish.species,t.fish.weightKg);n.scale.multiplyScalar(.52),n.position.set(.05,1.42,0),n.rotation.y=.35,this.group.add(n),this.cookedFish=n,this.cookStatus.classList.remove("hidden")}render(t,e,n){const s=t*.001;for(let a=0;a<this.flames.length;a++){const o=this.flames[a],c=Math.sin(s*(7+a*1.7)+a*1.8);o.scale.set(1+c*.08,.88+c*.15,1+c*.08),o.rotation.y=s*(a%2?-.55:.42)+a}this.firelight.intensity=2.15+Math.sin(s*9)*.32+Math.sin(s*17)*.12;const r=Math.hypot(n.x-me.campfire.x,n.z-me.campfire.z)<=me.campfire.useRadius;if(this.interactionPrompt.classList.toggle("hidden",!r||this.cooking!==null),this.cooking){const a=Math.max(0,Math.min(1,(t-this.cooking.startedAt)/this.cooking.durationMs)),o=Math.round(a*100);this.cookProgressFill.style.width=`${o}%`,this.cookProgress.setAttribute("aria-valuenow",String(o))}if(r||this.cooking){const a=new C(me.campfire.x,2.35,me.campfire.z).project(e),o=a.z<=1&&Math.abs(a.x)<=1.2&&Math.abs(a.y)<=1.2,c=`${(a.x*.5+.5)*innerWidth}px`,l=`${(-a.y*.5+.5)*innerHeight}px`,h=String(Math.round((1-a.z)*1e3));this.interactionPrompt.style.left=c,this.interactionPrompt.style.top=l,this.interactionPrompt.style.zIndex=h,this.interactionPrompt.style.display=o&&r&&!this.cooking?"flex":"none",this.cookStatus.style.left=c,this.cookStatus.style.top=l,this.cookStatus.style.zIndex=h,this.cookStatus.style.display=o&&this.cooking?"flex":"none"}else this.interactionPrompt.style.display="none",this.cookStatus.style.display="none"}removeCookedFish(){if(!this.cookedFish)return;this.group.remove(this.cookedFish);const t=new Set,e=new Set;this.cookedFish.traverse(n=>{if(n instanceof Q){t.add(n.geometry);for(const s of Array.isArray(n.material)?n.material:[n.material])e.add(s)}});for(const n of t)n.dispose();for(const n of e)n.dispose();this.cookedFish=null}addFlame(t,e,n,s){const r=new Kt({color:t,emissive:t,emissiveIntensity:.48,roughness:.72,flatShading:!0}),a=new Q(new Je(1,1,6),r);return a.position.set(0,s,0),a.scale.set(e,n,e),a.castShadow=!1,this.group.add(a),a}}function Qa(i){const t=nn.states[i].visuals;return{skyColor:new Pt(t.skyColor),ambientSkyColor:new Pt(t.ambientSkyColor),ambientGroundColor:new Pt(t.ambientGroundColor),ambientIntensity:t.ambientIntensity,directionalColor:new Pt(t.directionalColor),directionalIntensity:t.directionalIntensity,fogDensity:t.fogDensity,waterTint:new Pt(t.waterTint),cloudOpacity:t.cloudOpacity,rainIntensity:t.rainIntensity,waterChop:t.waterChop,shadowRadius:t.shadowRadius}}function hh(i){return{skyColor:i.skyColor.clone(),ambientSkyColor:i.ambientSkyColor.clone(),ambientGroundColor:i.ambientGroundColor.clone(),ambientIntensity:i.ambientIntensity,directionalColor:i.directionalColor.clone(),directionalIntensity:i.directionalIntensity,fogDensity:i.fogDensity,waterTint:i.waterTint.clone(),cloudOpacity:i.cloudOpacity,rainIntensity:i.rainIntensity,waterChop:i.waterChop,shadowRadius:i.shadowRadius}}class Bv{constructor(t,e,n,s,r){R(this,"rain");R(this,"rainSeeds");R(this,"rainTransform",new xe);R(this,"ripples");R(this,"waterPositions");R(this,"cloudDrifters",[]);R(this,"cloudMaterial");R(this,"ambientLight");R(this,"directionalLight");R(this,"waterGeometry");R(this,"waterMaterial");R(this,"scene");R(this,"current");R(this,"from");R(this,"to");R(this,"weatherType","clear");R(this,"weatherStartedAt",0);R(this,"transitionStartedAt",0);this.scene=t,this.ambientLight=e,this.directionalLight=n,this.waterGeometry=s,this.waterMaterial=r,this.current=Qa("clear"),this.from=hh(this.current),this.to=Qa("clear"),this.waterPositions=Float32Array.from(s.attributes.position.array),this.scene.fog=new rr(this.current.skyColor,this.current.fogDensity);const a=new vn({color:"#d9eff4",transparent:!0,opacity:.76,depthWrite:!1});this.rain=new xd(new Ae(.008,.008,.42,3),a,nn.effects.maxRainParticles),this.rain.instanceMatrix.setUsage(ed),this.rain.frustumCulled=!1,this.rain.renderOrder=3,this.scene.add(this.rain),this.rainSeeds=Array.from({length:nn.effects.maxRainParticles},()=>({x:Math.random(),z:Math.random(),phase:Math.random()*nn.effects.rainHeight}));const o=new sn(1,.025,3,12);this.ripples=Array.from({length:nn.effects.rippleCount},(u,f)=>{const p=new vn({color:"#e0fbff",transparent:!0,opacity:0,depthWrite:!1,side:We}),g=new Q(o,p);g.rotation.x=Math.PI/2,g.position.y=.255,g.visible=!1,this.scene.add(g);const v=f*2.399963229728653,m=.55+f%4*.72;return{mesh:g,material:p,x:Math.cos(v)*m,z:Math.sin(v)*m,phase:f/nn.effects.rippleCount}}),this.cloudMaterial=new Kt({color:"#d7dfdb",roughness:1,flatShading:!0,transparent:!0,opacity:0});const c=new Xe(1,0),l=new ve,h=[[-17,10,-11,2.8],[-8,12,-20,3.4],[7,9,-18,2.6],[19,11,-5,3.2],[12,13,14,3.6]];for(const[u,[f,p,g,v]]of h.entries()){const m=new ve;m.position.set(f,p,g);for(let d=0;d<4;d++){const S=new Q(c,this.cloudMaterial);S.position.set((d-1.5)*v*.42,d%2*v*.12,Math.sin(d*2.2)*v*.14),S.scale.set(v*(.48+d%3*.12),v*(.28+d%2*.08),v*.32),S.castShadow=!1,m.add(S)}l.add(m),this.cloudDrifters.push({group:m,x:f,z:g,phase:u*1.7})}this.scene.add(l)}setWeather(t,e){this.update(e,null),this.weatherType=t.type,this.weatherStartedAt=t.startedAt,this.transitionStartedAt=t.startedAt,this.from=hh(this.current);const n=Qa(t.type);Object.assign(this.to,n)}update(t,e){const n=Math.max(0,Math.min(1,(t-this.transitionStartedAt)/nn.blendDurationMs)),s=n*n*(3-2*n);this.current.skyColor.copy(this.from.skyColor).lerp(this.to.skyColor,s),this.current.ambientSkyColor.copy(this.from.ambientSkyColor).lerp(this.to.ambientSkyColor,s),this.current.ambientGroundColor.copy(this.from.ambientGroundColor).lerp(this.to.ambientGroundColor,s),this.current.ambientIntensity=mi.lerp(this.from.ambientIntensity,this.to.ambientIntensity,s),this.current.directionalColor.copy(this.from.directionalColor).lerp(this.to.directionalColor,s),this.current.directionalIntensity=mi.lerp(this.from.directionalIntensity,this.to.directionalIntensity,s),this.current.fogDensity=mi.lerp(this.from.fogDensity,this.to.fogDensity,s),this.current.waterTint.copy(this.from.waterTint).lerp(this.to.waterTint,s),this.current.cloudOpacity=mi.lerp(this.from.cloudOpacity,this.to.cloudOpacity,s),this.current.rainIntensity=mi.lerp(this.from.rainIntensity,this.to.rainIntensity,s),this.current.waterChop=mi.lerp(this.from.waterChop,this.to.waterChop,s),this.current.shadowRadius=mi.lerp(this.from.shadowRadius,this.to.shadowRadius,s);const r=this.scene.fog;r instanceof rr&&(r.color.copy(this.current.skyColor),r.density=this.current.fogDensity),this.scene.background instanceof Pt&&this.scene.background.copy(this.current.skyColor);const a=this.lightningIntensity(t);this.ambientLight.color.copy(this.current.ambientSkyColor),this.ambientLight.groundColor.copy(this.current.ambientGroundColor),this.ambientLight.intensity=this.current.ambientIntensity+a*.8,this.directionalLight.color.copy(this.current.directionalColor),this.directionalLight.intensity=this.current.directionalIntensity+a,this.directionalLight.shadow.radius=this.current.shadowRadius,this.waterMaterial.color.copy(this.current.waterTint),this.updateWaterChop(t),this.updateRain(t,e),this.updateRipples(t),this.updateClouds(t)}updateWaterChop(t){const e=this.waterGeometry.attributes.position,n=this.current.waterChop,s=t*.001;for(let r=0;r<e.count;r++){const a=r*3,o=this.waterPositions[a],c=this.waterPositions[a+1],l=this.waterPositions[a+2];e.setZ(r,l+n*Math.sin(s*2.8+o*1.8+c*1.4))}e.needsUpdate=!0,n>.001&&this.waterGeometry.computeVertexNormals()}updateRain(t,e){const n=this.current.rainIntensity,s=Math.round(this.rainSeeds.length*n);if(this.rain.count=s,this.rain.material.opacity=.76*n,this.rain.visible=s>0,!e||s===0)return;const r=e.position,{rainSpread:a,rainHeight:o,rainFallSpeed:c}=nn.effects,l=t/1e3;for(let h=0;h<s;h++){const u=this.rainSeeds[h],f=(l*c+u.phase)%o;this.rainTransform.position.set(r.x+(u.x-.5)*a,r.y+4-f,r.z+(u.z-.5)*a),this.rainTransform.rotation.set(.08,0,.12),this.rainTransform.scale.set(1,1,1),this.rainTransform.updateMatrix(),this.rain.setMatrixAt(h,this.rainTransform.matrix)}this.rain.instanceMatrix.needsUpdate=!0}updateRipples(t){const e=this.current.rainIntensity;for(const n of this.ripples){const s=(t/nn.effects.rippleLifetimeMs+n.phase)%1,r=e>.025&&s<.94;n.mesh.visible=r,r&&(n.mesh.position.x=n.x,n.mesh.position.z=n.z,n.mesh.scale.setScalar(.06+s*.42),n.material.opacity=(1-s)*e*.48)}}updateClouds(t){this.cloudMaterial.opacity=this.current.cloudOpacity;for(const e of this.cloudDrifters){e.group.visible=this.current.cloudOpacity>.01;const n=t/1e3;e.group.position.x=e.x+Math.sin(n*.025+e.phase)*1.1,e.group.position.z=e.z+Math.cos(n*.018+e.phase)*.6,e.group.rotation.y=Math.sin(n*.01+e.phase)*.035}}lightningIntensity(t){if(this.weatherType!=="storm")return 0;const{lightningCycleMs:e,lightningFlashMs:n,lightningMaxIntensity:s}=nn.effects,r=Math.max(0,t-this.weatherStartedAt),a=Math.floor(r/e),o=Math.abs(Math.sin((this.weatherStartedAt+a*12345.678)*17e-5)),c=a*e+e*(.18+o*.62),l=r-c;return l<0||l>n?0:Math.sin(Math.PI*l/n)*s}}const te={logoPath:"/toray-logo1.png",position:{x:0,z:-20},interactionRadius:3.4,stageWidth:7.6,stageDepth:7.2,cameraOffset:{x:0,y:3.1,z:9.8},targetOffset:{x:0,y:1.55,z:0},logoAspect:289/51,photoWidth:1080,photoHeight:1350},zv={none:{name:"Natural",css:"none"},warm:{name:"Warm",css:"sepia(.16) saturate(1.12)"},sunset:{name:"Sunset",css:"saturate(1.18) hue-rotate(-9deg)"},mono:{name:"Black & white",css:"grayscale(1)"}};class Hv{constructor(t,e){R(this,"root");R(this,"resultModal");R(this,"resultPhoto");R(this,"gallery");R(this,"countdown");R(this,"flash");R(this,"status");R(this,"timerSelect");R(this,"filterSelect");R(this,"showNameInput");R(this,"captureButton");R(this,"logo",new Image);R(this,"logoReady");R(this,"callbacks");R(this,"photos",[]);R(this,"active",!1);R(this,"busy",!1);R(this,"nextPhotoId",1);R(this,"countdownTimer",0);R(this,"flashTimer",0);R(this,"currentPhoto",null);this.root=t,this.callbacks=e,this.resultModal=document.querySelector("#photo-result"),this.resultPhoto=document.querySelector("#photo-result-image"),this.gallery=t.querySelector("#photobooth-gallery"),this.countdown=t.querySelector("#photobooth-countdown"),this.flash=t.querySelector("#photobooth-flash"),this.status=t.querySelector("#photobooth-status"),this.timerSelect=t.querySelector("#photo-timer"),this.filterSelect=t.querySelector("#photo-filter"),this.showNameInput=t.querySelector("#photo-show-name"),this.captureButton=t.querySelector("#photo-capture"),this.logoReady=new Promise(n=>{this.logo.onload=()=>n(!0),this.logo.onerror=()=>n(!1),this.logo.src=te.logoPath,this.logo.complete&&this.logo.naturalWidth>0&&n(!0)}),this.captureButton.addEventListener("click",()=>this.requestCapture()),t.querySelector("#photo-exit").addEventListener("click",e.onExit),this.resultModal.querySelector("#photo-download").addEventListener("click",()=>this.downloadCurrent()),this.resultModal.querySelector("#photo-share").addEventListener("click",()=>this.shareOrDownloadCurrent()),this.resultModal.querySelector("#photo-retake").addEventListener("click",()=>this.closeResult()),this.resultModal.querySelector("#photo-result-close").addEventListener("click",()=>this.closeResult()),this.resultModal.querySelector(".photo-result-backdrop").addEventListener("click",()=>this.closeResult())}open(){this.active=!0,this.root.classList.remove("hidden"),this.root.querySelector("#photo-capture").focus({preventScroll:!0})}close(){this.active=!1,this.clearCountdown(),this.closeResult(),this.root.classList.add("hidden"),this.status.textContent=""}handleKey(t){if(!this.active)return;if(t.key==="Escape"){t.preventDefault(),this.callbacks.onExit();return}const e=t.target,n=e instanceof HTMLInputElement||e instanceof HTMLSelectElement;if(t.key.toLowerCase()==="p"&&!n){t.preventDefault(),this.callbacks.onExit();return}(t.code==="Space"||t.key==="Enter")&&!n&&!(e instanceof HTMLButtonElement)&&this.resultModal.classList.contains("hidden")&&(t.preventDefault(),this.requestCapture())}requestCapture(){if(this.busy||!this.active)return;const t=Number(this.timerSelect.value);t>0?this.startCountdown(t):this.capture()}startCountdown(t){this.clearCountdown();let e=t;const n=()=>{this.countdown.textContent=String(e),this.countdown.classList.remove("hidden"),e<=1?this.countdownTimer=window.setTimeout(()=>{this.countdown.classList.add("hidden"),this.countdownTimer=0,this.capture()},1e3):(e-=1,this.countdownTimer=window.setTimeout(n,1e3))};n()}clearCountdown(){window.clearTimeout(this.countdownTimer),this.countdownTimer=0,this.countdown.classList.add("hidden")}async capture(){if(!(this.busy||!this.active)){this.busy=!0,this.captureButton.disabled=!0,this.status.textContent="Ready…";try{const[t]=await Promise.all([this.logoReady,this.callbacks.prepareCapture()]);if(!this.active)return;const e=new Date,n=this.callbacks.captureScene(this.showNameInput.checked),s=this.composePhoto(n,this.filterSelect.value,t,e),r={id:this.nextPhotoId++,dataUrl:s,filename:this.filename(n.room,e),room:n.room,playerName:n.playerName,date:e};this.photos.unshift(r),this.photos.length>10&&(this.photos.length=10),this.renderGallery(),this.openResult(r),this.flash.classList.remove("flash"),this.flash.offsetWidth,this.flash.classList.add("flash"),window.clearTimeout(this.flashTimer),this.flashTimer=window.setTimeout(()=>this.flash.classList.remove("flash"),180),this.status.textContent=""}catch{this.status.textContent="Couldn’t capture that photo. Try again."}finally{this.busy=!1,this.captureButton.disabled=!1}}}composePhoto(t,e,n,s){var M;const r=te.photoWidth,a=te.photoHeight,o=document.createElement("canvas");o.width=r,o.height=a;const c=o.getContext("2d");if(!c)throw new Error("Canvas is unavailable");const l=t.source,h=r/a,u=l.width/l.height;let f=0,p=0,g=l.width,v=l.height;u>h?(g=l.height*h,f=(l.width-g)/2):(v=l.width/h,p=(l.height-v)/2),c.filter=((M=zv[e])==null?void 0:M.css)??"none",c.drawImage(l,f,p,g,v,0,0,r,a),c.filter="none",this.showNameInput.checked&&t.namePoint&&this.drawNameTag(c,t.namePoint,f,p,g,v,l.width,l.height,t.playerName);const m=a-112;if(c.fillStyle="rgba(32, 54, 47, .76)",c.fillRect(0,m,r,112),c.strokeStyle="rgba(255,255,255,.9)",c.lineWidth=18,c.strokeRect(9,9,r-18,a-18),n&&this.logo.naturalWidth>0){const T=Math.min(178/this.logo.naturalWidth,48/this.logo.naturalHeight),A=this.logo.naturalWidth*T,L=this.logo.naturalHeight*T;c.fillStyle="rgba(255,255,255,.94)",this.roundRect(c,38,m+28,202,58,13),c.fill(),c.drawImage(this.logo,50,m+(112-L)/2,A,L)}const d=this.formatDate(s),S=`Room ${t.room} · ${t.playerName} · ${d}`;return c.fillStyle="#fff",c.font="600 27px Trebuchet MS, Segoe UI, sans-serif",c.textAlign="right",c.textBaseline="middle",c.fillText(S,r-42,m+56,r-315),o.toDataURL("image/png")}drawNameTag(t,e,n,s,r,a,o,c,l){const h=e.x*o,u=e.y*c;if(h<n||h>n+r||u<s||u>s+a)return;const f=(h-n)/r*te.photoWidth,p=(u-s)/a*te.photoHeight;t.font="700 24px Trebuchet MS, Segoe UI, sans-serif";const g=t.measureText(l).width+30;t.fillStyle="rgba(255,255,255,.92)",this.roundRect(t,f-g/2,p-64,g,40,20),t.fill(),t.fillStyle="#31564d",t.textAlign="center",t.textBaseline="middle",t.fillText(l,f,p-44,g-20)}roundRect(t,e,n,s,r,a){t.beginPath(),t.roundRect(e,n,s,r,a)}filename(t,e){return`pondside-room${t.toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/^-|-$/g,"")||"pond"}-${e.toISOString().slice(0,10)}.png`}formatDate(t){return new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"short",year:"numeric"}).format(t)}renderGallery(){this.gallery.replaceChildren(),this.gallery.classList.toggle("hidden",this.photos.length===0);for(const t of this.photos){const e=document.createElement("div");e.className="photo-gallery-tile";const n=document.createElement("button");n.type="button",n.className="photo-gallery-open",n.setAttribute("aria-label",`Open photo from ${this.formatDate(t.date)}`);const s=document.createElement("img");s.src=t.dataUrl,s.alt="",n.append(s),n.addEventListener("click",()=>this.openResult(t));const r=document.createElement("button");r.type="button",r.className="photo-gallery-delete",r.textContent="×",r.setAttribute("aria-label","Delete photo"),r.addEventListener("click",()=>{var o;const a=this.photos.findIndex(c=>c.id===t.id);a>=0&&this.photos.splice(a,1),((o=this.currentPhoto)==null?void 0:o.id)===t.id&&this.closeResult(),this.renderGallery()}),e.append(n,r),this.gallery.append(e)}}openResult(t){this.currentPhoto=t,this.resultPhoto.src=t.dataUrl,this.resultModal.classList.remove("hidden"),document.querySelector("#photo-download").focus({preventScroll:!0})}closeResult(){this.currentPhoto=null,this.resultModal.classList.add("hidden"),this.resultPhoto.removeAttribute("src")}downloadCurrent(){if(!this.currentPhoto)return;const t=document.createElement("a");t.href=this.currentPhoto.dataUrl,t.download=this.currentPhoto.filename,document.body.append(t),t.click(),t.remove()}async shareOrDownloadCurrent(){if(!this.currentPhoto)return;const t=this.currentPhoto;try{const e=await fetch(t.dataUrl),n=new File([await e.blob()],t.filename,{type:"image/png"});if(typeof navigator.share=="function"&&(!navigator.canShare||navigator.canShare({files:[n]}))){await navigator.share({files:[n],title:"Pondside photo"});return}}catch(e){if(e instanceof DOMException&&e.name==="AbortError")return}this.downloadCurrent()}}class Gv{constructor(t,e){R(this,"scene",new ar);R(this,"camera",new Pe(45,innerWidth/innerHeight,.1,150));R(this,"renderer");R(this,"avatars",new Map);R(this,"chatBubbles",new Map);R(this,"eatBubbles",new Map);R(this,"stones",new Map);R(this,"bonks",new Map);R(this,"labels");R(this,"stoneHint");R(this,"photoboothLabel");R(this,"ray",new C);R(this,"cameraOffset",new C(0,8.5,-11));R(this,"crocodilePortal",new ve);R(this,"crocodilePortalRing",new ve);R(this,"localId","");R(this,"leaderboardLeader","");R(this,"serverClockOffset",0);R(this,"interpolationDelayMs",ut.sync.interpolationDelayMs);R(this,"correctionCount",0);R(this,"correctionX",0);R(this,"correctionZ",0);R(this,"correctionRemaining",0);R(this,"interpolationUnderruns",0);R(this,"island");R(this,"ambientLight");R(this,"directionalLight");R(this,"waterGeometry");R(this,"waterMaterial");R(this,"firstPersonView",!1);R(this,"photoboothCameraActive",!1);R(this,"photoboothLogoReady",Promise.resolve());R(this,"photoboothCameraPosition",new C(te.position.x+te.cameraOffset.x,te.cameraOffset.y,te.position.z+te.cameraOffset.z));R(this,"photoboothCameraTarget",new C(te.position.x+te.targetOffset.x,te.targetOffset.y,te.position.z+te.targetOffset.z));R(this,"heldFishClickHandler");R(this,"chickens");R(this,"campfire");R(this,"weatherEffects");R(this,"onResize",()=>{this.camera.aspect=innerWidth/innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(innerWidth,innerHeight)});this.labels=e,this.stoneHint=document.createElement("div"),this.stoneHint.className="pebble-hint hidden",e.appendChild(this.stoneHint),this.photoboothLabel=document.createElement("div"),this.photoboothLabel.className="photobooth-world-label",this.photoboothLabel.textContent="Photobooth 📸",e.appendChild(this.photoboothLabel),this.renderer=new sr({antialias:!0,alpha:!1}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.75)),this.renderer.setSize(innerWidth,innerHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Hh,this.renderer.outputColorSpace=be,this.renderer.toneMapping=hc,this.renderer.toneMappingExposure=1.12,t.appendChild(this.renderer.domElement),this.scene.background=new Pt("#c6e5df"),this.scene.fog=new Sc("#c6e5df",38,90),this.camera.position.set(0,14,18),this.camera.lookAt(0,0,0),this.buildWorld(),this.weatherEffects=new Bv(this.scene,this.ambientLight,this.directionalLight,this.waterGeometry,this.waterMaterial),this.chickens=new jo(this.scene,this.labels),this.campfire=new kv(this.scene,this.labels),window.addEventListener("resize",this.onResize)}material(t,e=1){return new Kt({color:t,roughness:e,flatShading:!0})}buildWorld(){this.ambientLight=new or("#f4fff4","#8aa69a",2.15),this.scene.add(this.ambientLight),this.directionalLight=new Es("#fff6d9",3.3),this.directionalLight.position.set(-12,22,10),this.directionalLight.castShadow=!0,this.directionalLight.shadow.mapSize.set(2048,2048),this.directionalLight.shadow.bias=-15e-5,this.directionalLight.shadow.normalBias=.035,this.directionalLight.shadow.radius=3,this.directionalLight.shadow.camera.left=-34,this.directionalLight.shadow.camera.right=34,this.directionalLight.shadow.camera.top=34,this.directionalLight.shadow.camera.bottom=-34,this.directionalLight.shadow.camera.near=1,this.directionalLight.shadow.camera.far=60,this.scene.add(this.directionalLight),this.island=new ve,this.scene.add(this.island),this.crocodilePortal.position.set(me.crocodilePortal.x,0,me.crocodilePortal.z);const t=new Q(new En(2.25,12),this.material("#5e6564"));t.rotation.x=-Math.PI/2,t.position.y=.035,this.crocodilePortal.add(t);const e=new Q(new sn(2.15,.12,5,18),new Kt({color:"#70e8df",emissive:"#1ab8b6",emissiveIntensity:1.4,roughness:.45,flatShading:!0}));e.rotation.x=Math.PI/2,e.position.y=.08,this.crocodilePortal.add(e);const n=new Q(new En(1.38,16),new vn({color:"#48d9d4",transparent:!0,opacity:.28,side:We,depthWrite:!1}));n.position.set(0,1.62,0),this.crocodilePortalRing.add(n);const s=new Q(new sn(1.45,.16,6,20),new Kt({color:"#97fff0",emissive:"#1ecbc3",emissiveIntensity:1.8,roughness:.35,flatShading:!0}));s.position.set(0,1.62,0),this.crocodilePortalRing.add(s);const r=new Q(new Se(.34,.55,.32),this.material("#6b7370"));r.position.set(-1.3,.32,0),this.crocodilePortal.add(r);const a=r.clone();a.position.x=1.3,this.crocodilePortal.add(a),this.crocodilePortal.add(this.crocodilePortalRing);const o=new Ad("#45e3dd",1.8,9,2);o.position.set(0,1.6,0),this.crocodilePortal.add(o),this.scene.add(this.crocodilePortal);const c=new Q(new Ae(me.groundRadius-1,me.groundRadius,1.2,20),this.material("#7fbd83"));c.position.y=-.62,c.receiveShadow=!0,c.castShadow=!0,this.island.add(c);const l=new Q(new En(me.grassRadius,20),this.material("#a7d38e"));l.rotation.x=-Math.PI/2,l.position.y=.015,l.receiveShadow=!0,this.island.add(l);const h=new Q(new Ae(6.3,6.6,.25,12),this.material("#dfd09a"));h.position.y=.08,h.receiveShadow=!0,this.island.add(h),this.waterGeometry=new En(4.15,16),this.waterMaterial=new Kt({color:"#5bb7c1",roughness:.82,metalness:0,flatShading:!0});const u=new Q(this.waterGeometry,this.waterMaterial);u.rotation.x=-Math.PI/2,u.position.y=.23,this.island.add(u);const f=new Q(new sn(4.23,.13,4,16),this.material("#e9ddaf"));f.rotation.x=Math.PI/2,f.position.y=.19,this.island.add(f);const p=me.trees;for(const[v,m]of p)this.addTree(v,m,.75+Math.random()*.35);const g=me.rocks;for(const[v,m]of g){const d=new Q(new Xe(.55+Math.random()*.4,0),this.material("#9b9d80"));d.position.set(v,.25,m),d.scale.y=.62,d.rotation.set(Math.random(),Math.random(),Math.random()),d.castShadow=!0,this.island.add(d)}for(let v=0;v<15;v++){const m=v*2.4,d=new Q(new rn(.12,5,4),this.material(v%2?"#f4e9b0":"#e99a91"));d.position.set(Math.cos(m)*(7.3+v%3),.18,Math.sin(m)*(7.3+v%3)),this.island.add(d)}for(const v of ut.stones.pebbles){const m=new ve,d=new Q(new Xe(.24,0),this.material(v.color));d.scale.set(1,.65,.82),d.castShadow=!0,m.add(d);const S=new Q(new Xe(.105,0),this.material("#fff8f0"));S.position.set(.08,.08,.12),m.add(S),m.position.set(v.x,.18,v.z),this.scene.add(m);const M=new Q(new sn(.3,.035,4,12),new vn({color:"#dffaff",transparent:!0,opacity:0}));M.rotation.x=Math.PI/2,M.visible=!1,this.scene.add(M),this.stones.set(v.id,{group:m,state:"ground",x:v.x,z:v.z,color:v.color,carriedBy:null,flight:null,respawnAt:null,splashStartedAt:null,splash:M})}this.buildPhotobooth()}buildPhotobooth(){const t=new ve;t.position.set(te.position.x,0,te.position.z),this.scene.add(t);const e=new Q(new Se(te.stageWidth,.3,te.stageDepth),this.material("#b98b6e"));e.position.y=.15,e.receiveShadow=!0,e.castShadow=!0,t.add(e);const n=new Q(new Se(te.stageWidth-.4,.08,te.stageDepth-.4),this.material("#d9b39b"));n.position.y=.32,n.receiveShadow=!0,t.add(n);const s=new Q(new Ae(2.65,2.65,.055,12),this.material("#9c7084"));s.position.set(0,.38,.45),s.receiveShadow=!0,t.add(s);const r=new Q(new Ii(6.25,3.65),this.material("#e4ead6"));r.position.set(0,2.15,-3.32),r.receiveShadow=!0,t.add(r);const a=this.material("#8c684f");for(const M of[-3.22,3.22]){const _=new Q(new Se(.22,4.05,.28),a);_.position.set(M,2.02,-3.36),_.castShadow=!0,t.add(_)}const o=new Q(new Se(6.65,.24,.32),a);o.position.set(0,4.03,-3.36),o.castShadow=!0,t.add(o);const c=new Q(new Se(2.75,.5,.12),this.material("#f4e7cf"));c.position.set(0,4.38,-3.34),c.castShadow=!0,t.add(c);const l=this.makePhotoboothPlaceholderTexture(),h=new vn({map:l,transparent:!0,side:We,toneMapped:!1}),u=new Ii(3.8,3.8/te.logoAspect),f=new Q(u,h);f.position.set(0,2.75,-3.12),t.add(f),this.photoboothLogoReady=new Promise(M=>{new Dv().load(te.logoPath,_=>{_.colorSpace=be,_.anisotropy=Math.min(this.renderer.capabilities.getMaxAnisotropy(),8);const I=_.image,T=I.width&&I.height?I.width/I.height:te.logoAspect;f.geometry.dispose(),f.geometry=new Ii(3.8,3.8/T),h.map=_,h.needsUpdate=!0,l.dispose(),M()},void 0,()=>{M()})});const p=new ve;p.position.set(2.55,0,3.85),t.add(p);const g=this.material("#735b4b"),v=new C(0,1.22,0);for(const[M,_]of[[-.42,.42],[.42,.42],[0,-.48]]){const I=new C(M,.08,_),T=I.clone().sub(v),A=new Q(new Ae(.035,.05,T.length(),5),g);A.position.copy(I).add(v).multiplyScalar(.5),A.quaternion.setFromUnitVectors(new C(0,1,0),T.normalize()),A.castShadow=!0,p.add(A)}const m=new Q(new Se(.72,.48,.46),this.material("#51675f"));m.position.set(0,1.45,0),m.castShadow=!0,p.add(m);const d=new Q(new Ae(.17,.2,.28,8),this.material("#718b80"));d.rotation.x=-Math.PI/2,d.position.set(0,1.45,-.34),d.castShadow=!0,p.add(d);const S=new Q(new Se(.24,.16,.22),this.material("#d5bd8b"));S.position.set(-.12,1.77,0),S.castShadow=!0,p.add(S)}makePhotoboothPlaceholderTexture(){const t=document.createElement("canvas");t.width=566,t.height=100;const e=t.getContext("2d");e.fillStyle="rgba(255,255,255,.94)",e.fillRect(0,0,t.width,t.height),e.fillStyle="#284d43",e.font="800 54px Trebuchet MS, Segoe UI, sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText("LOGO",t.width/2,t.height/2+2);const n=new mv(t);return n.colorSpace=be,n}addTree(t,e,n){const s=new ve;s.position.set(t,0,e),s.scale.setScalar(n);const r=new Q(new Ae(.18,.28,1.35,6),this.material("#90694a"));r.position.y=.67,r.castShadow=!0,s.add(r);const a=new Q(new Je(1.15,2.5,7),this.material("#4f9972"));a.position.y=2.05,a.castShadow=!0,s.add(a);const o=new Q(new Je(.82,1.8,7),this.material("#68ad7b"));o.position.y=2.85,o.castShadow=!0,s.add(o),this.island.add(s)}makeAvatar(t,e){const n=new ve,s=new Q(new pa(.42,.65,3,6),this.material(t.color));s.position.y=.8,s.castShadow=!0,s.visible=!e||!this.firstPersonView,n.add(s);const r=new Q(new rn(.3,8,6),this.material("#f2c7a5"));r.position.set(0,1.55,.04),r.castShadow=!0,r.visible=!e||!this.firstPersonView,n.add(r);const a=new Q(new Je(.37,.35,7),this.material(t.color));a.position.set(0,1.86,.04),a.castShadow=!0,a.visible=!e||!this.firstPersonView,n.add(a);const o=this.createCrown();o.visible=!1,n.add(o);const c=new Q(new rn(.035,6,4),this.material("#344b45"));c.position.set(.11,1.57,.31),c.visible=!e||!this.firstPersonView,n.add(c);const l=new Q(new Ae(.025,.035,1.25,5),this.material("#765b40"));l.position.set(.48,1.2,.18),l.rotation.z=-.42,l.visible=!1,n.add(l);const h=Array.from({length:7},()=>new C),u=new fv(new Ue().setFromPoints(h),new yd({color:"#f8f4dc"}));u.visible=!1,this.scene.add(u);const f=new Q(new rn(.14,7,5),this.material("#f2745d"));f.visible=!1,this.scene.add(f);const p=Array.from({length:3},()=>{const m=new Q(new sn(.32,.035,4,12),new vn({color:"#dffaff",transparent:!0,opacity:0}));return m.rotation.x=Math.PI/2,m.visible=!1,this.scene.add(m),m}),g=document.createElement("div");g.className=`name-label${e?" self":""}`,g.dataset.name=t.name,g.addEventListener("click",m=>{var M;const d=m.target.closest(".held-fish-chip"),S=d==null?void 0:d.dataset.catchId;S&&((M=this.heldFishClickHandler)==null||M.call(this,t.id,S))}),this.labels.appendChild(g);const v={group:n,label:g,renderedLabelMarkup:"",rod:l,line:u,bobber:f,splash:p,cast:null,fishing:t.fishing,reelActive:t.fishing==="fighting",lineTaut:t.fishing==="fighting",samples:[],targetX:t.x,targetZ:t.z,targetFacing:t.facing,local:e,color:t.color,inPhotobooth:t.inPhotobooth??!1,inUnderrun:!1,blendOffsetX:0,blendOffsetZ:0,blendOffsetFacing:0,blendStartedAt:0,holdingFish:null,heldModel:null,bodyParts:[s,r,a,c,o],hat:a,crown:o};return n.position.set(t.x,0,t.z),this.scene.add(n),this.avatars.set(t.id,v),this.setFishing(t.id,t.fishing),this.updateLeaderAppearance(v),t.holdingFish&&this.setHoldingFish(t.id,t.holdingFish),v}setLocalId(t){this.localId=t}setFirstPersonView(t){this.firstPersonView=t;const e=this.avatars.get(this.localId);if(e){for(const n of e.bodyParts)n.visible=!t;this.updateLeaderAppearance(e)}}setPhotoboothMode(t){if(this.photoboothCameraActive=t,t){const e=this.avatars.get(this.localId);if(e){e.targetFacing=0,e.group.rotation.y=0;for(const n of e.bodyParts)n.visible=!0}}else this.setFirstPersonView(this.firstPersonView)}setPhotoboothState(t,e){const n=this.avatars.get(t);n&&(n.inPhotobooth=e)}photoboothNamePoint(t){const e=this.avatars.get(t);if(!e)return null;const n=e.group.localToWorld(new C(0,2.25,0)).project(this.camera);return n.z>1||Math.abs(n.x)>1||Math.abs(n.y)>1?null:{x:n.x*.5+.5,y:-n.y*.5+.5}}async preparePhotoboothCapture(){await this.photoboothLogoReady,this.photoboothCameraActive&&(this.camera.position.copy(this.photoboothCameraPosition),this.camera.lookAt(this.photoboothCameraTarget),this.camera.updateMatrixWorld())}setLeaderboardLeader(t){this.leaderboardLeader=(t==null?void 0:t.trim().toLocaleLowerCase())??"";for(const e of this.avatars.values())this.updateLeaderAppearance(e)}updateLeaderAppearance(t){var s;const e=this.leaderboardLeader!==""&&((s=t.label.dataset.name)==null?void 0:s.toLocaleLowerCase())===this.leaderboardLeader,n=!t.local||!this.firstPersonView;t.hat.visible=!e&&n,t.crown.visible=e&&n}createCrown(){const t=new ve,e=this.material("#e5b13a",.72),n=new Q(new Ae(.255,.31,.14,8),e);n.position.y=1.87,n.castShadow=!0,t.add(n);const s=new Q(new sn(.29,.027,4,8),e);s.rotation.x=Math.PI/2,s.position.y=1.94,s.castShadow=!0,t.add(s);for(let a=0;a<5;a++){const o=a/5*Math.PI*2,c=new Q(new Je(.075,.2,4),e);c.position.set(Math.cos(o)*.21,2.015,Math.sin(o)*.21),c.castShadow=!0,t.add(c)}const r=new Q(new Xe(.055,0),this.material("#e87962",.6));return r.position.set(0,1.88,.29),t.add(r),t}setHeldFishClickHandler(t){this.heldFishClickHandler=t}hitChicken(t){this.chickens.hit(t)}setChickens(t,e){this.chickens.setSnapshots(t,e)}setCampfireCooking(t){this.campfire.setCooking(t)}setWeather(t){this.weatherEffects.setWeather(t,Date.now()+this.serverClockOffset)}finishCampfireCooking(t){this.campfire.activeCookId===t&&this.campfire.setCooking(null)}heldFish(t){var e;return((e=this.avatars.get(t))==null?void 0:e.holdingFish)??null}playerName(t){var e;return((e=this.avatars.get(t))==null?void 0:e.label.dataset.name)??"Pond friend"}setServerClockOffset(t){this.serverClockOffset=t}setInterpolationDelay(t){this.interpolationDelayMs=Math.max(ut.sync.interpolationDelayMinMs,Math.min(ut.sync.interpolationDelayMaxMs,t))}noteCorrection(){this.correctionCount+=1}syncDiagnostics(){let t=0;for(const e of this.avatars.values())e.local||(t+=e.samples.length);return{bufferDepth:t,interpolationDelayMs:Math.round(this.interpolationDelayMs),corrections:this.correctionCount,underruns:this.interpolationUnderruns}}upsert(t,e=Date.now()+this.serverClockOffset){var s,r;let n=this.avatars.get(t.id);if(n||(n=this.makeAvatar(t,t.id===this.localId)),!n.local){n.targetX=t.x,n.targetZ=t.z,n.targetFacing=t.facing;const a=n.samples[n.samples.length-1];!a||e>a.time?(n.samples.push({time:e,x:t.x,z:t.z,facing:t.facing,moving:t.moving}),n.samples.length>ut.sync.snapshotBufferLimit&&n.samples.shift()):e===a.time&&(a.x=t.x,a.z=t.z,a.facing=t.facing,a.moving=t.moving)}n.fishing=t.fishing,this.setPhotoboothState(t.id,t.inPhotobooth??!1),t.holdingFish!==void 0&&this.setHoldingFish(t.id,t.holdingFish),n.reelActive=t.fishing==="fighting",n.reelActive&&(n.lineTaut=!0),t.cast?((!n.cast||n.cast.startTime!==t.cast.startTime)&&this.startCast(t.id,t.cast),n.fishing=t.fishing,t.fishing==="reeling"&&((s=n.cast)==null?void 0:s.phase)!=="reeling"&&this.startReel(t.id,t.cast.reelStartedAt??Date.now(),ut.cast.reelSeconds)):((r=n.cast)==null?void 0:r.phase)!=="reeling"&&this.clearCast(n)}addLocal(t){this.localId=t.id;const e=this.makeAvatar(t,!0);e.group.position.set(t.x,0,t.z),this.camera.position.copy(e.group.localToWorld(this.cameraOffset.clone())),this.camera.lookAt(e.group.position.x,.8,e.group.position.z)}setFishing(t,e){const n=this.avatars.get(t);n&&(n.fishing=e,n.rod.visible=e!=="idle")}cancelFishing(t){const e=this.avatars.get(t);e&&(e.reelActive=!1,e.lineTaut=!1,this.clearCast(e))}setHoldingFish(t,e){var o;const n=this.avatars.get(t);if(!n||((o=n.holdingFish)==null?void 0:o.catchId)===(e==null?void 0:e.catchId)||(n.heldModel&&(n.group.remove(n.heldModel),this.disposeFishModel(n.heldModel),n.heldModel=null),n.holdingFish=e,!e))return;const s=cr(e.species,e.weightKg),r=ut.species.find(c=>c.id===e.species),a=Math.cbrt(Math.max(.01,e.weightKg)/r.medianKg);s.scale.setScalar(Math.max(.6,Math.min(1.6,1+(a-1)*1.8))),s.position.set(.34,1.12,.4),s.rotation.y=.12,n.group.add(s),n.heldModel=s}disposeFishModel(t){const e=new Set,n=new Set;t.traverse(s=>{if(s instanceof Q){e.add(s.geometry);for(const r of Array.isArray(s.material)?s.material:[s.material])n.add(r)}});for(const s of e)s.dispose();for(const s of n)s.dispose()}startCast(t,e){const n=this.avatars.get(t);n&&(n.cast={...e,phase:"casting",reelSeconds:ut.cast.reelSeconds},n.fishing="casting",n.local||(n.targetX=e.startX,n.targetZ=e.startZ,n.group.position.x=e.startX,n.group.position.z=e.startZ,n.targetFacing=e.facing),n.rod.visible=!0,n.line.visible=!0,n.bobber.visible=!0)}showBite(t){const e=this.avatars.get(t);e&&(e.fishing="bite")}setReelActive(t,e){const n=this.avatars.get(t);n&&(n.reelActive=e,n.lineTaut=e)}setLineTaut(t,e){const n=this.avatars.get(t);n!=null&&n.reelActive&&(n.lineTaut=e)}setStones(t){for(const e of t){const n=this.stones.get(e.id);n&&(n.x=e.x,n.z=e.z,n.state=e.state,n.carriedBy=e.carriedBy,n.flight=e.flight,n.respawnAt=e.respawnAt)}}pickStone(t,e){const n=this.stones.get(t);n&&(n.state="carried",n.carriedBy=e,n.flight=null,n.respawnAt=null)}throwStone(t){const e=this.stones.get(t.stoneId);e&&(e.state="flying",e.carriedBy=null,e.flight=t,e.respawnAt=null)}landStone(t){const e=this.stones.get(t.stoneId);e&&(e.x=t.position.x,e.z=t.position.z,e.flight=null,e.carriedBy=null,e.state=t.water?"respawning":"ground",e.respawnAt=t.water?Date.now()+ut.stones.respawnDelayMs:null,e.splashStartedAt=t.water?Date.now():null)}respawnStone(t,e){const n=this.stones.get(t);n&&(n.x=e.x,n.z=e.z,n.state="ground",n.flight=null,n.carriedBy=null,n.respawnAt=null)}showBonk(t){if(!this.avatars.get(t))return;let n=this.bonks.get(t);if(!n){const s=document.createElement("div");s.className="bonk-puff",s.textContent="✦",this.labels.appendChild(s),n={element:s,startedAt:0},this.bonks.set(t,n)}n.startedAt=performance.now()}carryingStoneId(t=this.localId){var e;return((e=[...this.stones].find(([,n])=>n.state==="carried"&&n.carriedBy===t))==null?void 0:e[0])??null}nearbyStoneId(t=this.localId){const e=this.avatars.get(t);if(!e||this.carryingStoneId(t))return null;let n=null;for(const[s,r]of this.stones){if(r.state!=="ground")continue;const a=Math.hypot(r.x-e.group.position.x,r.z-e.group.position.z);a<=ut.stones.pickupRange&&(!n||a<n.distance)&&(n={id:s,distance:a})}return(n==null?void 0:n.id)??null}startReel(t,e,n=ut.cast.reelSeconds){const s=this.avatars.get(t);s!=null&&s.cast&&(s.cast.phase="reeling",s.cast.reelStartedAt=e,s.cast.reelSeconds=n,s.fishing="reeling")}clearCast(t){t.cast=null,t.fishing="idle",t.rod.visible=!1,t.line.visible=!1,t.bobber.visible=!1;for(const e of t.splash)e.visible=!1}castRodTip(t){const s=Math.cos(t.facing),r=Math.sin(t.facing);return new C(t.startX+s*.9+r*.2,1.72,t.startZ-r*.9+s*.2)}rodTip(t){return t.group.localToWorld(new C(.9,1.72,.2))}renderCast(t,e){const n=t.cast;if(!n)return;const s=n.flightSeconds*1e3,r=n.startTime+s,a=Math.hypot(n.targetX-n.startX,n.targetZ-n.startZ),o=ut.pond.waterY+ut.cast.floatHeight,c=this.castRodTip(n),l=new C(n.targetX,o,n.targetZ);let h,u=n.phase==="casting"?c:this.rodTip(t);if(n.phase==="casting"&&e<r){const v=Math.max(0,Math.min(1,(e-n.startTime)/s)),m=1-(1-v)*(1-v);h=c.clone().lerp(l,m);const d=Math.min(ut.cast.maxApexHeight,a*ut.cast.apexDistanceFactor);h.y=o+(c.y-o)*(1-v)+4*d*v*(1-v)}else if(n.phase==="reeling"){const v=n.reelStartedAt??e,m=Math.max(0,Math.min(1,(e-v)/(n.reelSeconds*1e3))),d=m*m*(3-2*m);if(h=l.clone().lerp(this.rodTip(t),d),h.y+=Math.sin(Math.PI*m)*.75,m>=1){this.clearCast(t);return}}else{n.phase="floating",u=this.rodTip(t);const v=t.fishing==="bite"?ut.cast.floatAmplitude*2.1:ut.cast.floatAmplitude;h=l.clone(),h.y+=Math.sin((e-r)*(Math.PI*2/ut.cast.floatPeriodMs))*v}t.bobber.visible=!0,t.line.visible=!0,t.bobber.position.copy(h);const f=t.line.geometry.attributes.position,p=t.reelActive?t.lineTaut?.025:.21:n.phase==="floating"?.13:.035;for(let v=0;v<f.count;v++){const m=v/(f.count-1),d=u.clone().lerp(h,m);d.y-=p*Math.sin(Math.PI*m),f.setXYZ(v,d.x,d.y,d.z)}f.needsUpdate=!0,t.line.geometry.computeBoundingSphere();const g=(e-r)/1e3;for(let v=0;v<t.splash.length;v++){const m=t.splash[v],d=Math.max(0,Math.min(1,(g-v*.12)/ut.pond.splashSeconds)),S=g>=v*.12&&d<1&&n.phase!=="reeling";m.visible=S,S&&(m.position.set(n.targetX,ut.pond.waterY+.025,n.targetZ),m.scale.setScalar(.35+d*1.7),m.material.opacity=.72*(1-d))}}remove(t){var n,s,r;const e=this.avatars.get(t);e&&(e.heldModel&&this.disposeFishModel(e.heldModel),this.scene.remove(e.group,e.line,e.bobber,...e.splash),e.label.remove(),this.avatars.delete(t)),(n=this.chatBubbles.get(t))==null||n.element.remove(),this.chatBubbles.delete(t),(s=this.eatBubbles.get(t))==null||s.element.remove(),this.eatBubbles.delete(t),(r=this.bonks.get(t))==null||r.element.remove(),this.bonks.delete(t)}clearPlayers(){for(const t of[...this.avatars.keys()])this.remove(t);this.localId=""}getPosition(){const t=this.avatars.get(this.localId);return(t==null?void 0:t.group.position)??new C}setPosition(t,e){const n=this.avatars.get(this.localId);n&&(n.group.position.x=t,n.group.position.z=e)}setLocalMotion(t,e,n){const s=this.avatars.get(this.localId);s&&(s.group.position.x=t,s.group.position.z=e,s.targetFacing=Math.atan2(Math.sin(n),Math.cos(n)),s.group.rotation.y=s.targetFacing)}applyCorrection(t,e){const n=this.avatars.get(this.localId);if(!n)return;this.correctionCount+=1;const s=t-n.group.position.x,r=e-n.group.position.z;Math.hypot(s,r)>ut.sync.hardCorrectionDistance?(n.group.position.x=t,n.group.position.z=e,this.correctionX=0,this.correctionZ=0,this.correctionRemaining=0):(this.correctionX=s,this.correctionZ=r,this.correctionRemaining=ut.sync.correctionBlendMs/1e3)}stepCorrection(t){const e=this.avatars.get(this.localId);if(!e||this.correctionRemaining<=0)return;const n=Math.min(1,t/this.correctionRemaining);e.group.position.x+=this.correctionX*n,e.group.position.z+=this.correctionZ*n,this.correctionX*=1-n,this.correctionZ*=1-n,this.correctionRemaining=Math.max(0,this.correctionRemaining-t)}face(t,e){const n=this.avatars.get(this.localId);n&&Math.hypot(t,e)>.01&&(n.targetFacing=Math.atan2(t,e),n.group.rotation.y=n.targetFacing)}turnLocal(t){const e=this.avatars.get(this.localId);e&&(e.targetFacing=Math.atan2(Math.sin(e.targetFacing+t),Math.cos(e.targetFacing+t)),e.group.rotation.y=e.targetFacing)}localFacing(){var t;return((t=this.avatars.get(this.localId))==null?void 0:t.targetFacing)??0}interpolateRemote(t,e){const n=t.samples;if(!n.length)return;let s=n.findIndex(h=>h.time>=e),r,a,o;if(s===0){const h=n[0];r=h.x,a=h.z,o=h.facing}else if(s>0){const h=n[s-1],u=n[s],f=Math.max(0,Math.min(1,(e-h.time)/Math.max(1,u.time-h.time)));r=h.x+(u.x-h.x)*f,a=h.z+(u.z-h.z)*f,o=h.facing+this.angleDelta(h.facing,u.facing)*f}else{const h=n[n.length-1],u=n[n.length-2],f=u?Math.min(ut.sync.maxExtrapolationMs,Math.max(0,e-h.time)):0;if(u&&h.moving&&h.time>u.time){const p=f/(h.time-u.time);r=h.x+(h.x-u.x)*p,a=h.z+(h.z-u.z)*p,o=h.facing+this.angleDelta(u.facing,h.facing)*p}else r=h.x,a=h.z,o=h.facing}const c=n[n.length-1],l=e>c.time+ut.sync.maxExtrapolationMs;if(l&&!t.inUnderrun&&(this.interpolationUnderruns+=1),!l&&t.inUnderrun&&(t.blendOffsetX=t.group.position.x-r,t.blendOffsetZ=t.group.position.z-a,t.blendOffsetFacing=this.angleDelta(o,t.group.rotation.y),t.blendStartedAt=performance.now()),t.inUnderrun=l,!l&&t.blendStartedAt){const h=Math.min(1,(performance.now()-t.blendStartedAt)/120),u=1-h;r+=t.blendOffsetX*u,a+=t.blendOffsetZ*u,o+=t.blendOffsetFacing*u,h>=1&&(t.blendStartedAt=0)}for(t.group.position.set(r,0,a),t.group.rotation.y=o;n.length>2&&n[1].time<e;)n.shift()}fishingState(){var t;return((t=this.avatars.get(this.localId))==null?void 0:t.fishing)??"idle"}playerCount(){return this.avatars.size}mapPlayers(){return[...this.avatars.values()].map(t=>({x:t.group.position.x,z:t.group.position.z,facing:t.local?t.targetFacing:t.group.rotation.y,color:t.color,name:t.label.dataset.name??"",fishing:t.fishing!=="idle",local:t.local}))}showChatBubble(t,e){if(!this.avatars.has(t))return;let n=this.chatBubbles.get(t);if(!n){const s=document.createElement("div");s.className="speech-bubble",this.labels.appendChild(s),n={element:s,expiresAt:0},this.chatBubbles.set(t,n)}n.element.textContent=e.length>100?`${e.slice(0,97)}…`:e,n.expiresAt=performance.now()+4500}showEatBubble(t,e){if(!this.avatars.has(t))return;let n=this.eatBubbles.get(t);if(!n){const s=document.createElement("div");s.className="eat-bubble",this.labels.appendChild(s),n={element:s,expiresAt:0},this.eatBubbles.set(t,n)}n.element.textContent=`Yummy! ${e} 🍲`,n.expiresAt=performance.now()+3600}render(t=1/60){var a;const e=Date.now()+this.serverClockOffset,n=Math.sin(e*.0025);this.crocodilePortalRing.rotation.y=Math.sin(e*7e-4)*.12,this.crocodilePortalRing.position.y=n*.06;const s=e-this.interpolationDelayMs,r=this.avatars.get(this.localId);if(r)if(r.group.rotation.y+=this.angleDelta(r.group.rotation.y,r.targetFacing)*.24,this.photoboothCameraActive){const o=1-Math.exp(-7*Math.max(0,t));this.camera.position.lerp(this.photoboothCameraPosition,o),this.camera.lookAt(this.photoboothCameraTarget)}else if(this.firstPersonView){const o=r.group.localToWorld(new C(0,1.56,.02)),c=r.group.rotation.y,l=1-Math.exp(-15*Math.max(0,t));this.camera.position.lerp(o,l),this.camera.lookAt(o.x+Math.sin(c)*10,o.y-.12,o.z+Math.cos(c)*10)}else{const o=r.group.localToWorld(this.cameraOffset.clone()),c=1-Math.exp(-8*Math.max(0,t));this.camera.position.lerp(o,c),this.camera.lookAt(r.group.position.x,.8,r.group.position.z)}this.camera.updateMatrixWorld(),this.ray.set(te.position.x,5.1,te.position.z).project(this.camera),this.photoboothLabel.style.left=`${Math.round((this.ray.x*.5+.5)*innerWidth)}px`,this.photoboothLabel.style.top=`${Math.round((-this.ray.y*.5+.5)*innerHeight)}px`,this.photoboothLabel.style.display=this.ray.z<=1&&Math.abs(this.ray.x)<=1.2&&Math.abs(this.ray.y)<=1.2?"block":"none";for(const[o,c]of this.avatars){if(c.rod.rotation.z=-.42+(c.reelActive?.12+Math.sin(Date.now()*.006)*.035:0),c.heldModel){c.heldModel.position.y=1.12+Math.sin(e*.0022+c.group.position.x)*.035,c.heldModel.rotation.z=Math.sin(e*.0018+c.group.position.z)*.055;const M=Math.sin(e*.0061+c.group.position.x*2.1);c.heldModel.rotation.x=M>.94?(M-.94)*.35:0}c.local||this.interpolateRemote(c,s);const l=this.bonks.get(o);if(l){const M=performance.now()-l.startedAt;if(M>=900)l.element.remove(),this.bonks.delete(o),c.group.rotation.z=0;else{const _=M/900;c.group.rotation.z=Math.sin(M*.045)*(1-_)*.18,l.element.style.left=c.label.style.left,l.element.style.top=`${Number.parseFloat(c.label.style.top)-22-_*24}px`,l.element.style.opacity=String(1-_),l.element.style.display=c.label.style.display}}else c.group.rotation.z=0;this.renderCast(c,e),this.ray.set(c.group.position.x,2.2,c.group.position.z).project(this.camera),c.label.style.left=`${Math.round((this.ray.x*.5+.5)*innerWidth)}px`,c.label.style.top=`${Math.round((-this.ray.y*.5+.5)*innerHeight)}px`,c.label.style.display=c.local&&this.firstPersonView||this.ray.z>1?"none":"block";const u=this.leaderboardLeader!==""&&((a=c.label.dataset.name)==null?void 0:a.toLocaleLowerCase())===this.leaderboardLeader?'<span class="leader-title"><span aria-hidden="true">👑</span><strong>Kapla Mengai</strong></span>':"",f=c.holdingFish,p=f?ut.species.find(M=>M.id===f.species):void 0,g=f&&p?`<button class="held-fish-chip" data-catch-id="${this.escape(f.catchId)}" style="--rarity-color:${p.rarityColor}" type="button">🐟 ${this.escape(p.name)} · ${f.weightKg.toFixed(1)} kg</button>`:"",v=c.inPhotobooth?'<span class="photo-camera-mark" aria-label="In photobooth">📸</span>':"",m=`${u}<span class="player-name">${this.escape(c.label.dataset.name??"")}${c.fishing==="bite"?'<span class="fishing-mark">!</span>':c.fishing==="waiting"?'<span class="fishing-mark">🎣</span>':""}${v}</span>${g}`;c.renderedLabelMarkup!==m&&(c.label.innerHTML=m,c.renderedLabelMarkup=m);const d=this.chatBubbles.get(o);d&&(d.expiresAt<=performance.now()?(d.element.remove(),this.chatBubbles.delete(o)):(d.element.style.left=c.label.style.left,d.element.style.top=`${Number.parseFloat(c.label.style.top)-10}px`,d.element.style.display=c.label.style.display));const S=this.eatBubbles.get(o);S&&(S.expiresAt<=performance.now()?(S.element.remove(),this.eatBubbles.delete(o)):c.local&&this.firstPersonView?(S.element.style.left=`${innerWidth/2}px`,S.element.style.top=`${innerHeight*.38}px`,S.element.style.zIndex="900",S.element.style.display="block"):(S.element.style.left=c.label.style.left,S.element.style.top=`${Number.parseFloat(c.label.style.top)-32}px`,S.element.style.display=c.label.style.display))}this.renderStones(e),this.chickens.render(e,this.camera),this.campfire.render(e,this.camera,this.getPosition()),this.weatherEffects.update(e,this.camera),this.renderer.render(this.scene,this.camera)}renderStones(t){for(const s of this.stones.values()){const{group:r}=s;if(s.state==="ground")r.visible=!0,r.position.set(s.x,.18,s.z),r.rotation.y=Math.sin(t*5e-4+s.x)*.12;else if(s.state==="carried"){const a=s.carriedBy?this.avatars.get(s.carriedBy):void 0;if(!a){r.visible=!1;continue}const o=ut.stones.heldOffset;r.visible=!0,r.position.copy(a.group.localToWorld(new C(o.x,o.y,o.z)))}else if(s.state==="flying"&&s.flight){const a=s.flight,o=Math.max(0,Math.min(1,(t-a.startTime)/a.flightMs)),c=1-(1-o)*(1-o),l=Math.hypot(a.end.x-a.start.x,a.end.z-a.start.z),h=Math.max(ut.stones.apexMin,l*ut.stones.apexDistanceFactor);r.visible=!0,r.position.set(a.start.x+(a.end.x-a.start.x)*c,a.start.y+(a.end.y-a.start.y)*o+4*h*o*(1-o),a.start.z+(a.end.z-a.start.z)*c),r.rotation.x+=.035,r.rotation.z+=.025}else r.visible=!1;if(s.splashStartedAt!==null){const a=(t-s.splashStartedAt)/1e3;if(a>=ut.stones.splashDurationSeconds)s.splash.visible=!1,s.splashStartedAt=null;else{const o=Math.max(0,a/ut.stones.splashDurationSeconds);s.splash.visible=!0,s.splash.position.set(s.x,ut.pond.waterY+.03,s.z),s.splash.scale.setScalar(.35+o*1.9),s.splash.material.opacity=.72*(1-o)}}}const e=this.avatars.get(this.localId);if(!e||e.fishing!=="idle"){this.stoneHint.classList.add("hidden");return}let n=null;if(this.carryingStoneId(this.localId))n=e.group.localToWorld(new C(0,2.3,0)),this.stoneHint.textContent="E to throw";else{const s=this.nearbyStoneId(this.localId),r=s?this.stones.get(s):void 0;r&&(n=new C(r.x,.65,r.z),this.stoneHint.textContent="E to pick up")}n?(this.ray.copy(n).project(this.camera),this.stoneHint.style.left=`${Math.round((this.ray.x*.5+.5)*innerWidth)}px`,this.stoneHint.style.top=`${Math.round((-this.ray.y*.5+.5)*innerHeight)}px`,this.stoneHint.style.display=this.ray.z>1?"none":"block",this.stoneHint.classList.remove("hidden")):this.stoneHint.classList.add("hidden")}escape(t){return t.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}angleDelta(t,e){return Math.atan2(Math.sin(e-t),Math.cos(e-t))}}class Vv{constructor(t,e){R(this,"renderer");R(this,"scene");R(this,"camera");R(this,"fish");R(this,"frame",0);R(this,"dragging",!1);R(this,"lastX",0);R(this,"lastY",0);R(this,"canvas");R(this,"stage");R(this,"rarity");R(this,"name");R(this,"weight");R(this,"length");R(this,"catcher");R(this,"caughtAt");R(this,"rank");R(this,"animate",()=>{!this.renderer||!this.scene||!this.camera||!this.fish||(this.dragging||(this.fish.rotation.y+=.006),this.renderer.render(this.scene,this.camera),this.frame=requestAnimationFrame(this.animate))});R(this,"onPointerDown",t=>{!this.canvas||!this.fish||(this.dragging=!0,this.lastX=t.clientX,this.lastY=t.clientY,this.canvas.setPointerCapture(t.pointerId))});R(this,"onPointerMove",t=>{if(!this.dragging||!this.fish)return;const e=t.clientX-this.lastX,n=t.clientY-this.lastY;this.fish.rotation.y+=e*.012,this.fish.rotation.x=Math.max(-.45,Math.min(.45,this.fish.rotation.x+n*.008)),this.lastX=t.clientX,this.lastY=t.clientY});R(this,"onPointerUp",()=>{this.dragging=!1});R(this,"onResize",()=>this.resize());this.root=t,this.leaderboard=e,this.stage=t.querySelector("#fish-viewer-stage"),this.rarity=t.querySelector("#fish-viewer-rarity"),this.name=t.querySelector("#fish-viewer-name"),this.weight=t.querySelector("#fish-viewer-weight"),this.length=t.querySelector("#fish-viewer-length"),this.catcher=t.querySelector("#fish-viewer-catcher"),this.caughtAt=t.querySelector("#fish-viewer-time"),this.rank=t.querySelector("#fish-viewer-rank"),t.querySelector("#fish-viewer-close").addEventListener("click",()=>this.close()),t.querySelector("#fish-viewer-backdrop").addEventListener("click",()=>this.close())}open(t){this.disposeScene();const e=ut.species.find(a=>a.id===t.species);this.rarity.textContent=e.rarity,this.rarity.style.setProperty("--rarity-color",e.rarityColor),this.name.textContent=e.name,this.weight.textContent=`${t.weightKg.toFixed(2)} kg`,this.length.textContent=`~${Math.round(e.lengthK*Math.cbrt(t.weightKg))} cm estimated length`,this.catcher.textContent=`Caught by ${t.playerName}`,this.caughtAt.textContent=this.timeAgo(t.timestamp);const n=this.leaderboard().findIndex(a=>a.id===t.id);this.rank.textContent=n>=0?`Room leaderboard · #${n+1}`:"Not in the room top 10",this.root.classList.remove("hidden"),this.scene=new ar,this.camera=new Pe(35,1.5,.1,30),this.camera.position.set(0,.2,6.2),this.camera.lookAt(0,0,0),this.scene.add(new or("#fff9e8","#738b7a",2.3));const s=new Es("#fff5d3",3.2);s.position.set(-2,4,5),this.scene.add(s);const r=new Es("#d2e9df",1.1);r.position.set(3,1,-2),this.scene.add(r),this.fish=cr(t.species,t.weightKg),this.scene.add(this.fish),this.canvas=document.createElement("canvas"),this.canvas.className="fish-viewer-canvas",this.stage.replaceChildren(this.canvas),this.renderer=new sr({canvas:this.canvas,alpha:!0,antialias:!0}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,2)),this.renderer.outputColorSpace=be,this.resize(),this.canvas.addEventListener("pointerdown",this.onPointerDown),this.canvas.addEventListener("pointermove",this.onPointerMove),this.canvas.addEventListener("pointerup",this.onPointerUp),this.canvas.addEventListener("pointercancel",this.onPointerUp),window.addEventListener("resize",this.onResize),this.animate()}close(){this.root.classList.add("hidden"),this.disposeScene()}dispose(){this.close()}resize(){if(!this.renderer||!this.camera)return;const t=Math.max(1,this.stage.clientWidth),e=Math.max(1,this.stage.clientHeight);this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,e,!1)}disposeScene(){var t,e,n;if(cancelAnimationFrame(this.frame),window.removeEventListener("resize",this.onResize),this.canvas&&(this.canvas.removeEventListener("pointerdown",this.onPointerDown),this.canvas.removeEventListener("pointermove",this.onPointerMove),this.canvas.removeEventListener("pointerup",this.onPointerUp),this.canvas.removeEventListener("pointercancel",this.onPointerUp)),this.fish){const s=new Set,r=new Set;this.fish.traverse(a=>{if(a instanceof Q){s.add(a.geometry);for(const o of Array.isArray(a.material)?a.material:[a.material])r.add(o)}});for(const a of s)a.dispose();for(const a of r)a.dispose();(t=this.scene)==null||t.remove(this.fish)}(e=this.renderer)==null||e.dispose(),(n=this.renderer)==null||n.forceContextLoss(),this.stage.replaceChildren(),this.renderer=void 0,this.scene=void 0,this.camera=void 0,this.fish=void 0,this.canvas=void 0,this.dragging=!1}timeAgo(t){const e=Math.max(0,Math.floor((Date.now()-t)/1e3));if(e<60)return`${e} sec ago`;const n=Math.floor(e/60);if(n<60)return`${n} min ago`;const s=Math.floor(n/60);return s<24?`${s} hr ago`:`${Math.floor(s/24)} days ago`}}class Wv{constructor(t,e,n){R(this,"zoom",36);R(this,"lastRenderAt",0);R(this,"canvases");R(this,"expanded");R(this,"zoomIn");R(this,"zoomOut");this.canvases=[t,e],this.expanded=n,this.zoomIn=document.querySelector("#map-zoom-in"),this.zoomOut=document.querySelector("#map-zoom-out"),this.zoomIn.addEventListener("click",()=>this.setZoom(this.zoom-3)),this.zoomOut.addEventListener("click",()=>this.setZoom(this.zoom+3))}setZoom(t){this.zoom=Math.max(10,Math.min(48,t)),this.lastRenderAt=0}toggleExpanded(t=this.expanded.classList.contains("hidden")){this.expanded.classList.toggle("hidden",!t)}render(t,e){if(t-this.lastRenderAt<66)return;this.lastRenderAt=t;const n=e.find(s=>s.local)??{x:0,z:0,facing:0};this.draw(this.canvases[0],e,n,t,this.zoom),this.expanded.classList.contains("hidden")||this.draw(this.canvases[1],e,n,t,Math.max(22,this.zoom+5))}draw(t,e,n,s,r){const a=t.getContext("2d");if(!a)return;const o=t.width,c=t.height,l=o/2,h=c/2,u=Math.min(o,c)*.46,f=u/r,p=(M,_)=>({x:l+(M-n.x)*f,y:h-(_-n.z)*f});a.clearRect(0,0,o,c),a.save(),a.beginPath(),a.arc(l,h,u,0,Math.PI*2),a.clip(),a.fillStyle="#c6e5e8",a.fillRect(0,0,o,c);const g=p(0,0),v=me.grassRadius*f;a.beginPath(),a.arc(g.x,g.y,v,0,Math.PI*2),a.fillStyle="#b8d99d",a.fill(),a.lineWidth=Math.max(2,f*1.8),a.strokeStyle="#e5d8a9",a.stroke();const m=ut.pond.waterRadius*f;a.beginPath(),a.arc(g.x,g.y,m+Math.max(2,f*.8),0,Math.PI*2),a.fillStyle="#e9dfbb",a.fill(),a.beginPath(),a.arc(g.x,g.y,m,0,Math.PI*2),a.fillStyle="#61b8c4",a.fill(),a.lineWidth=Math.max(1,f*.12),a.strokeStyle="rgba(255,255,255,.55)",a.stroke();for(const[M,_]of me.trees){const I=p(M,_);a.beginPath(),a.arc(I.x,I.y,Math.max(2.3,f*.42),0,Math.PI*2),a.fillStyle="#477f61",a.fill()}for(const[M,_]of me.rocks){const I=p(M,_);a.beginPath(),a.arc(I.x,I.y,Math.max(1.6,f*.23),0,Math.PI*2),a.fillStyle="#827e69",a.fill()}for(const M of ut.stones.pebbles){const _=p(M.x,M.z);a.beginPath(),a.arc(_.x,_.y,Math.max(1.2,f*.18),0,Math.PI*2),a.fillStyle="#786e62",a.fill()}const d=p(me.campfire.x,me.campfire.z);a.beginPath(),a.arc(d.x,d.y,12,0,Math.PI*2),a.fillStyle="rgba(232, 137, 74, .22)",a.fill(),a.lineCap="round",a.lineWidth=3.5,a.strokeStyle="#79543e",a.beginPath(),a.moveTo(d.x-7,d.y+6),a.lineTo(d.x+7,d.y+2),a.moveTo(d.x-6,d.y+2),a.lineTo(d.x+6,d.y+6),a.stroke(),a.beginPath(),a.moveTo(d.x,d.y+5),a.bezierCurveTo(d.x-8,d.y,d.x+1,d.y-4,d.x,d.y-9),a.bezierCurveTo(d.x+9,d.y-3,d.x+6,d.y+3,d.x,d.y+5),a.closePath(),a.fillStyle="#e8894a",a.fill(),a.lineWidth=1.8,a.strokeStyle="#fff8e9",a.stroke(),a.beginPath(),a.moveTo(d.x,d.y+2),a.quadraticCurveTo(d.x-3,d.y-1,d.x+1,d.y-5),a.strokeStyle="#ffe5a6",a.lineWidth=1.5,a.stroke();for(const M of e){if(M.local)continue;const _=p(M.x,M.z);M.fishing&&(a.beginPath(),a.arc(_.x,_.y,5+(Math.sin(s/180)+1)*2.4,0,Math.PI*2),a.strokeStyle="rgba(55, 157, 125, .7)",a.lineWidth=1.8,a.stroke()),a.beginPath(),a.arc(_.x,_.y,4.2,0,Math.PI*2),a.fillStyle=M.color,a.fill(),a.lineWidth=1.5,a.strokeStyle="#fff",a.stroke()}if(Math.hypot(g.x-l,g.y-h)>u-m*.85){const M=Math.atan2(g.y-h,g.x-l),_=l+Math.cos(M)*(u-7),I=h+Math.sin(M)*(u-7);a.save(),a.translate(_,I),a.rotate(M),a.beginPath(),a.moveTo(6,0),a.lineTo(-4,-4),a.lineTo(-4,4),a.closePath(),a.fillStyle="#2995a1",a.fill(),a.restore()}a.save(),a.translate(l,h),a.rotate(n.facing),a.beginPath(),a.moveTo(0,-10),a.lineTo(7,7),a.lineTo(0,4),a.lineTo(-7,7),a.closePath(),a.fillStyle="#f3a34f",a.fill(),a.lineWidth=2,a.strokeStyle="#fff",a.stroke(),a.restore(),a.restore()}}const Re={platformRadius:22,playerMoveSpeed:4.2,playerTurnRate:3.2,exitPortal:{x:-13,z:-5},stonePile:{x:-6,z:-1,maxCount:8},monsterDeathDurationMs:1400};class Xv{constructor(t,e){R(this,"renderer");R(this,"camera",new Pe(48,innerWidth/innerHeight,.1,100));R(this,"scene",new ar);R(this,"root");R(this,"partyHealth");R(this,"bossHp");R(this,"bossHpLabel");R(this,"bossName");R(this,"stonesHeld");R(this,"pileCount");R(this,"exitPrompt");R(this,"defeatedPanel");R(this,"victoryPanel");R(this,"monsterGroup",new ve);R(this,"monsterTail",new ve);R(this,"attackRing");R(this,"lungeWarning");R(this,"stonePile",new ve);R(this,"pileStones",[]);R(this,"projectileMeshes",new Map);R(this,"playerAvatars",new Map);R(this,"partyHealthRows",new Map);R(this,"monsterMaterials",[]);R(this,"snapshots",[]);R(this,"snapshot",null);R(this,"predictedPlayer",null);R(this,"callbacks");R(this,"deathStartedAt",null);R(this,"monsterHitUntil",0);R(this,"localHitUntil",0);R(this,"localPlayerId","");R(this,"onResize",()=>{this.camera.aspect=innerWidth/innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(innerWidth,innerHeight)});this.root=t,this.callbacks=e,this.partyHealth=t.querySelector("#arena-party-health"),this.bossHp=t.querySelector("#arena-boss-hp"),this.bossHpLabel=t.querySelector("#arena-boss-hp-label"),this.bossName=t.querySelector("#arena-boss-name"),this.stonesHeld=t.querySelector("#arena-stones-held"),this.pileCount=t.querySelector("#arena-pile-count"),this.exitPrompt=t.querySelector("#arena-exit-prompt"),this.defeatedPanel=t.querySelector("#arena-defeated"),this.victoryPanel=t.querySelector("#arena-victory"),t.querySelector("#arena-leave-button").addEventListener("click",()=>e.leave()),t.querySelector("#arena-retry-button").addEventListener("click",()=>e.restart()),this.renderer=new sr({antialias:!0,alpha:!1}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.5)),this.renderer.setSize(innerWidth,innerHeight),this.renderer.outputColorSpace=be,this.renderer.toneMapping=hc,this.renderer.toneMappingExposure=1.05,t.querySelector("#arena-canvas-host").appendChild(this.renderer.domElement),this.scene.background=new Pt("#a8bdb5"),this.scene.fog=new rr("#a8bdb5",.012),this.buildScene(),window.addEventListener("resize",this.onResize)}enter(t,e){this.root.classList.remove("hidden"),this.defeatedPanel.classList.add("hidden"),this.victoryPanel.classList.add("hidden"),this.deathStartedAt=null,this.snapshots=[],this.snapshot=null,this.predictedPlayer=null,this.localPlayerId=e,this.receive(t)}close(){this.root.classList.add("hidden"),this.exitPrompt.classList.add("hidden"),this.snapshots=[],this.snapshot=null,this.predictedPlayer=null;for(const t of this.playerAvatars.values())this.scene.remove(t.group);this.playerAvatars.clear(),this.partyHealthRows.clear(),this.partyHealth.replaceChildren(),this.deathStartedAt=null}receive(t){var n;((n=this.snapshot)==null?void 0:n.instanceId)!==t.instanceId&&(this.snapshots=[],this.predictedPlayer=null);const e=t.players.find(s=>s.playerId===this.localPlayerId);if(e)if(!this.predictedPlayer)this.predictedPlayer={x:e.x,z:e.z,facing:e.facing};else{Math.hypot(e.x-this.predictedPlayer.x,e.z-this.predictedPlayer.z)>1.4?(this.predictedPlayer.x=e.x,this.predictedPlayer.z=e.z):(this.predictedPlayer.x+=(e.x-this.predictedPlayer.x)*.22,this.predictedPlayer.z+=(e.z-this.predictedPlayer.z)*.22);const r=Math.atan2(Math.sin(e.facing-this.predictedPlayer.facing),Math.cos(e.facing-this.predictedPlayer.facing));this.predictedPlayer.facing+=r*.25}for(this.snapshot=t,this.snapshots.push(t);this.snapshots.length>5;)this.snapshots.shift();this.updateHud(t)}move(t,e,n){var o;const s=(o=this.snapshot)==null?void 0:o.players.find(c=>c.playerId===this.localPlayerId);if(!this.snapshot||!this.predictedPlayer||this.snapshot.state!=="active"||!s||s.hp<=0)return null;const r=Math.max(0,Math.min(.05,n)),a=this.predictedPlayer;if(a.facing=Math.atan2(Math.sin(a.facing+e*Re.playerTurnRate*r),Math.cos(a.facing+e*Re.playerTurnRate*r)),t!==0){let c=a.x+Math.sin(a.facing)*t*Re.playerMoveSpeed*r,l=a.z+Math.cos(a.facing)*t*Re.playerMoveSpeed*r;const h=Math.hypot(c,l),u=Re.platformRadius-1;h>u&&(c*=u/h,l*=u/h),a.x=c,a.z=l}return{...a}}isNearExit(){return!this.snapshot||!this.predictedPlayer?!1:Math.hypot(this.predictedPlayer.x-this.snapshot.exitPortal.x,this.predictedPlayer.z-this.snapshot.exitPortal.z)<=this.snapshot.exitPortal.useRadius}monsterHit(t){this.monsterHitUntil=performance.now()+240,this.bossHp.style.width=`${Math.max(0,Math.min(100,t.hp/t.maxHp*100))}%`,this.bossHpLabel.textContent=`${t.hp} / ${t.maxHp}`}playerDamaged(t){t.playerId===this.localPlayerId&&(this.localHitUntil=performance.now()+320)}monsterDied(){this.deathStartedAt=performance.now(),this.victoryPanel.classList.add("hidden")}playerDied(){this.defeatedPanel.classList.remove("hidden"),this.victoryPanel.classList.add("hidden")}render(t,e){if(!this.snapshot)return;const n=t-120,s=this.interpolateMonster(n),r=this.snapshot.players.find(u=>u.playerId===this.localPlayerId),a=r?this.predictedPlayer??r:null;if(!a)return;const o=new C(a.x-Math.sin(a.facing)*8.5,7.2,a.z-Math.cos(a.facing)*8.5),c=1-Math.exp(-5.5*Math.max(0,e));this.camera.position.lerp(o,c),this.camera.lookAt(a.x,1,a.z),this.camera.updateMatrixWorld();for(const u of this.snapshot.players){let f=this.playerAvatars.get(u.playerId);f||(f=this.buildPlayer(u.color),this.playerAvatars.set(u.playerId,f),this.scene.add(f.group));const p=u.playerId===this.localPlayerId?a:u;f.group.position.set(p.x,0,p.z),f.group.rotation.y=p.facing,f.group.scale.y=u.hp>0?1:.55,f.bodyMaterial.color.set(u.hp>0?u.color:"#595c54"),f.bodyMaterial.emissive.setHex(u.playerId===this.localPlayerId&&performance.now()<this.localHitUntil?9253921:0)}const l=new Set(this.snapshot.players.map(u=>u.playerId));for(const[u,f]of this.playerAvatars)l.has(u)||(this.scene.remove(f.group),this.playerAvatars.delete(u));if(this.monsterGroup.position.set(s.x,0,s.z),this.monsterGroup.rotation.y=s.facing,this.deathStartedAt!==null){const u=Math.min(1,(performance.now()-this.deathStartedAt)/Re.monsterDeathDurationMs);this.monsterGroup.rotation.z=u*1.5,this.monsterGroup.scale.y=1-u*.35,u>=1&&this.victoryPanel.classList.remove("hidden")}else this.monsterGroup.rotation.z=0,this.monsterGroup.scale.y=1+(this.snapshot.monster.state==="attack"?Math.sin(t*.02)*.06:0);this.monsterTail.rotation.x=this.snapshot.monster.state==="attack"?Math.sin(t*.025)*.18:Math.sin(t*.003)*.04,this.monsterMaterials[0].emissive.setHex(performance.now()<this.monsterHitUntil?9253921:0),this.renderAttackTelegraph(s.x,s.z),this.renderProjectiles(t),this.renderPile(t),this.exitPrompt.classList.toggle("hidden",!this.isNearExit()||this.snapshot.state==="victory"),this.renderer.render(this.scene,this.camera)}updateHud(t){const e=t.players.find(n=>n.playerId===this.localPlayerId);this.updatePartyHealth(t.players),e&&(this.stonesHeld.textContent=String(e.stones)),this.bossName.textContent=t.monster.name,this.bossHp.style.width=`${Math.max(0,Math.min(100,t.monster.hp/t.monster.maxHp*100))}%`,this.bossHpLabel.textContent=`${t.monster.hp} / ${t.monster.maxHp}`,this.pileCount.textContent=String(t.stonePile.count),t.state==="victory"?this.deathStartedAt??(this.deathStartedAt=performance.now()):t.state==="defeat"&&this.playerDied()}updatePartyHealth(t){const e=new Set(t.map(n=>n.playerId));for(const[n,s]of this.partyHealthRows)e.has(n)||(s.row.remove(),this.partyHealthRows.delete(n));for(const n of t){let s=this.partyHealthRows.get(n.playerId);if(!s){const a=document.createElement("div");a.className="arena-party-player";const o=document.createElement("span");o.className="arena-party-name";const c=document.createElement("div");c.className="arena-health-track";const l=document.createElement("div");l.className="arena-health-fill player-health-fill",l.style.backgroundColor=n.color,c.append(l);const h=document.createElement("strong");a.append(o,c,h),this.partyHealth.append(a),s={row:a,fill:l,label:h},this.partyHealthRows.set(n.playerId,s)}const r=n.playerId===this.localPlayerId?`${n.name} · YOU`:n.name;s.row.firstElementChild.textContent=r,s.row.classList.toggle("is-self",n.playerId===this.localPlayerId),s.row.classList.toggle("is-down",n.hp<=0),s.fill.style.width=`${Math.max(0,Math.min(100,n.hp/n.maxHp*100))}%`,s.fill.style.backgroundColor=n.color,s.label.textContent=`${n.hp} / ${n.maxHp}`}}interpolateMonster(t){var s;if(this.snapshots.length<2||t<=this.snapshots[0].serverTime){const r=((s=this.snapshots[0])==null?void 0:s.monster)??this.snapshot.monster;return{x:r.x,z:r.z,facing:r.facing}}const e=this.snapshots.findIndex(r=>r.serverTime>=t);if(e>0){const r=this.snapshots[e-1],a=this.snapshots[e],o=(t-r.serverTime)/Math.max(1,a.serverTime-r.serverTime),c=Math.atan2(Math.sin(a.monster.facing-r.monster.facing),Math.cos(a.monster.facing-r.monster.facing));return{x:r.monster.x+(a.monster.x-r.monster.x)*o,z:r.monster.z+(a.monster.z-r.monster.z)*o,facing:r.monster.facing+c*o}}const n=this.snapshot.monster;return{x:n.x,z:n.z,facing:n.facing}}renderAttackTelegraph(t,e){var s;const n=(s=this.snapshot)==null?void 0:s.monster.attack;this.attackRing.visible=!!(n&&n.phase==="windup"&&n.skill!=="lunge"),this.lungeWarning.visible=!!(n&&n.skill==="lunge"&&n.phase==="windup"),n&&(this.attackRing.visible&&(this.attackRing.position.set(n.originX,.075,n.originZ),this.attackRing.scale.setScalar(n.radius*2),this.attackRing.material.opacity=.2+Math.sin(performance.now()*.018)*.09),this.lungeWarning.visible&&(this.lungeWarning.position.set(t+n.directionX*5,.065,e+n.directionZ*5),this.lungeWarning.rotation.y=Math.atan2(n.directionX,n.directionZ),this.lungeWarning.scale.z=10))}renderPile(t){var n;const e=((n=this.snapshot)==null?void 0:n.stonePile.count)??0;this.stonePile.position.set(Re.stonePile.x,0,Re.stonePile.z);for(const[s,r]of this.pileStones.entries())r.visible=s<e,r.position.y=.3+Math.sin(t*.003+s)*.04}renderProjectiles(t){var n;const e=new Set;for(const s of((n=this.snapshot)==null?void 0:n.projectiles)??[]){e.add(s.id);let r=this.projectileMeshes.get(s.id);r||(r=new Q(new Xe(.22,0),new Kt({color:"#b7aa8b",roughness:1,flatShading:!0})),this.projectileMeshes.set(s.id,r),this.scene.add(r));const a=Math.max(0,Math.min(1,(t-s.startedAt)/s.durationMs)),o=1-(1-a)*(1-a);r.position.set(s.startX+(s.endX-s.startX)*o,1.25+Math.sin(Math.PI*a)*2,s.startZ+(s.endZ-s.startZ)*o),r.rotation.x+=.08,r.rotation.z+=.1}for(const[s,r]of this.projectileMeshes)e.has(s)||(this.scene.remove(r),r.geometry.dispose(),r.material.dispose(),this.projectileMeshes.delete(s))}buildScene(){this.scene.add(new or("#e8f5e7","#665f4b",2.1));const t=new Es("#fff0cf",2.8);t.position.set(-8,18,10),this.scene.add(t);const e=new Q(new Ae(Re.platformRadius,Re.platformRadius+.8,1,32),new Kt({color:"#756f5d",roughness:1,flatShading:!0}));e.position.y=-.52,e.receiveShadow=!0,this.scene.add(e);const n=new Q(new En(Re.platformRadius-.5,32),new Kt({color:"#aaa082",roughness:1,flatShading:!0}));n.rotation.x=-Math.PI/2,n.position.y=.005,n.receiveShadow=!0,this.scene.add(n);const s=new Q(new sn(Re.platformRadius-.5,.32,5,32),new Kt({color:"#5c594e",roughness:1,flatShading:!0}));s.rotation.x=Math.PI/2,s.position.y=.05,this.scene.add(s);for(let a=0;a<14;a++){const o=a/14*Math.PI*2,c=new Q(new Xe(.7+a%3*.12,0),new Kt({color:"#777565",roughness:1,flatShading:!0}));c.position.set(Math.cos(o)*20.5,.42,Math.sin(o)*20.5),c.scale.y=1.2+a%2*.5,this.scene.add(c)}this.buildCrocodile(),this.buildStonePile(),this.buildExitPortal();const r=new En(1,32);this.attackRing=new Q(r,new vn({color:"#f03746",transparent:!0,opacity:.25,side:We,depthWrite:!1})),this.attackRing.rotation.x=-Math.PI/2,this.attackRing.visible=!1,this.scene.add(this.attackRing),this.lungeWarning=new Q(new Se(.45,.035,1),new vn({color:"#ff303e",transparent:!0,opacity:.38,depthWrite:!1})),this.lungeWarning.visible=!1,this.scene.add(this.lungeWarning),this.camera.position.set(0,12,-18),this.camera.lookAt(0,0,0)}buildPlayer(t){const e=new ve,n=new Kt({color:t,roughness:1,flatShading:!0}),s=new Q(new pa(.42,.65,3,6),n);s.position.y=.8,e.add(s);const r=new Q(new rn(.3,8,6),new Kt({color:"#f2c7a5",roughness:1,flatShading:!0}));r.position.set(0,1.55,.04),e.add(r);const a=new Q(new Je(.37,.35,7),new Kt({color:t,roughness:1,flatShading:!0}));return a.position.set(0,1.86,.04),e.add(a),{group:e,bodyMaterial:n}}buildCrocodile(){const t=new Kt({color:"#547b45",roughness:1,flatShading:!0}),e=new Kt({color:"#c2aa70",roughness:1,flatShading:!0}),n=new Kt({color:"#385c37",roughness:1,flatShading:!0});this.monsterMaterials.push(t);const s=new Q(new Se(3.7,.9,1.45,3,1,2),t);s.position.y=.72,this.monsterGroup.add(s);const r=new Q(new Se(2.7,.22,1.15,3,1,2),e);r.position.set(0,.29,.15),this.monsterGroup.add(r);const a=new Q(new Se(1.55,.82,1.35,2,1,2),t);a.position.set(0,.82,1.85),this.monsterGroup.add(a);const o=new Q(new Se(1.72,.44,1.2,3,1,2),t);o.position.set(0,.58,2.65),this.monsterGroup.add(o);for(const l of[-1,1]){const h=new Q(new rn(.16,6,4),new Kt({color:"#efc64d",emissive:"#4d3910",flatShading:!0}));h.position.set(l*.57,1.24,2.02),this.monsterGroup.add(h);const u=new Q(new rn(.065,5,4),n);u.position.set(l*.6,1.25,2.14),this.monsterGroup.add(u);for(const f of[-.48,1.12]){const p=new Q(new Se(.45,.38,.7),t);p.position.set(l*1.56,.34,f),this.monsterGroup.add(p)}}this.monsterTail.position.set(0,.64,-1.85);const c=new Q(new Je(.73,3,5),t);c.rotation.x=-Math.PI/2,c.position.z=-1.25,this.monsterTail.add(c),this.monsterGroup.add(this.monsterTail);for(let l=0;l<5;l++){const h=new Q(new Je(.105,.25,4),e);h.rotation.x=Math.PI,h.position.set(-.52+l*.26,.35,2.7),this.monsterGroup.add(h)}this.scene.add(this.monsterGroup)}buildStonePile(){this.stonePile.position.set(Re.stonePile.x,0,Re.stonePile.z);for(let t=0;t<Re.stonePile.maxCount;t++){const e=new Q(new Xe(.32,0),new Kt({color:t%2?"#c9c2ae":"#aba48f",roughness:1,flatShading:!0})),n=t*2.399;e.position.set(Math.cos(n)*.65,.3+t%2*.24,Math.sin(n)*.65),this.stonePile.add(e),this.pileStones.push(e)}this.scene.add(this.stonePile)}buildExitPortal(){const t=new ve;t.position.set(Re.exitPortal.x,0,Re.exitPortal.z);const e=new Q(new sn(1.3,.14,5,18),new Kt({color:"#8de9b5",emissive:"#1b9d61",emissiveIntensity:1.2,roughness:.4,flatShading:!0}));e.position.y=1.45,t.add(e);const n=new Q(new En(1.22,16),new vn({color:"#50bd88",transparent:!0,opacity:.23,side:We,depthWrite:!1}));n.position.set(0,1.45,0),t.add(n),e.rotation.z=Math.PI/2,n.rotation.y=0,this.scene.add(t)}}class qv{constructor(t){R(this,"params");R(this,"marker",ut.reel.markerStart);R(this,"velocity",0);R(this,"meter",ut.reel.catchMeterStart);R(this,"elapsed",0);R(this,"held",!1);R(this,"pullRemaining",0);R(this,"nextPullAt",ut.reel.fishPullIntervalMinSeconds+Math.random()*(ut.reel.fishPullIntervalMaxSeconds-ut.reel.fishPullIntervalMinSeconds));R(this,"outcome","active");R(this,"snapshot");this.params=t,this.snapshot=this.makeSnapshot(!1)}setParameters(t){this.params=t}setHeld(t){this.held=t}get current(){return this.snapshot}get result(){return this.outcome}update(t){if(this.outcome!=="active")return this.snapshot;const e=ut.reel,n=Math.max(0,Math.min(t,e.simulationMaxStepSeconds));this.elapsed+=n,this.elapsed>=this.nextPullAt&&this.pullRemaining<=0&&(this.pullRemaining=e.fishPullDurationSeconds,this.nextPullAt=this.elapsed+e.fishPullIntervalMinSeconds+Math.random()*(e.fishPullIntervalMaxSeconds-e.fishPullIntervalMinSeconds)),this.pullRemaining=Math.max(0,this.pullRemaining-n);const s=this.pullRemaining>0,r=this.params.driftSpeed*(s?e.fishPullDriftMultiplier:1),a=e.greenCenterStart+e.zoneMainAmplitude*Math.sin(this.elapsed*r*e.zoneSineRate)+e.zoneRippleAmplitude*Math.sin(this.elapsed*r*e.zoneRippleRate),o=Math.max(e.greenCenterMin,Math.min(e.greenCenterMax,a)),c=this.held?e.markerAccelerationHold:-110;this.velocity=(this.velocity+c*n)*Math.exp(-.48*n),this.velocity=Math.max(-60,Math.min(e.markerMaxVelocity,this.velocity)),this.marker+=this.velocity*n,this.marker<e.markerMin?(this.marker=e.markerMin,this.velocity=Math.abs(this.velocity)*e.markerBounce):this.marker>e.markerMax&&(this.marker=e.markerMax,this.velocity=-Math.abs(this.velocity)*e.markerBounce);const l=Math.abs(this.marker-o)<=this.params.greenWidth/2;return this.meter+=this.params.fillRate*n*(l?1:-.5),this.meter=Math.max(0,Math.min(1,this.meter)),this.meter>=1?this.outcome="success":this.meter<=0&&(this.outcome="escaped"),this.snapshot={marker:this.marker,zoneCenter:o,zoneWidth:this.params.greenWidth,meter:this.meter,inside:l,pulling:s,elapsed:this.elapsed},this.snapshot}makeSnapshot(t){return{marker:this.marker,zoneCenter:ut.reel.greenCenterStart,zoneWidth:this.params.greenWidth,meter:this.meter,inside:t,pulling:!1,elapsed:0}}}const yn={...ut.movement};function Yv(i){return Math.atan2(Math.sin(i),Math.cos(i))}function $v(i,t,e,n){const s=Math.max(0,Math.min(n,yn.maxFrameSeconds)),r=Yv(i.rotY+e*yn.turnSpeedRadians*s);if(!t||s===0)return{...i,rotY:r};let a=i.x+Math.sin(r)*t*yn.maxSpeed*s,o=i.z+Math.cos(r)*t*yn.maxSpeed*s,c=Math.hypot(a,o);const l=yn.waterRadius+yn.waterSafetyMargin;if(c<l){const h=l/Math.max(c,.001);a*=h,o*=h,c=l}if(c>yn.mapRadius){const h=yn.mapRadius/Math.max(c,.001);a*=h,o*=h}return{x:a,z:o,rotY:r}}const dh=document.querySelector("#join-screen"),Pc=document.querySelector("#app"),Lc=document.querySelector("#join-form"),ra=document.querySelector("#room"),Xn=document.querySelector("#name"),Js=document.querySelector("#room-list"),Kv=document.querySelector("#refresh-rooms"),Zv=document.querySelector("#create-room"),ti=document.querySelector("#join-button"),ni=document.querySelector("#form-error"),uh=document.querySelector("#hud"),Jv=document.querySelector("#hud-room"),jv=document.querySelector("#player-count"),Qv=document.querySelector("#chicken-score"),t_=document.querySelector("#connection-dot"),e_=document.querySelector("#connection-label"),Xs=document.querySelector("#view-toggle"),zn=document.querySelector("#whats-new"),to=document.querySelector("#whats-new-grid"),Cd=document.querySelector("#whats-new-close"),n_=document.querySelector("#whats-new-dismiss"),eo=document.querySelector("#toast"),Vr=document.querySelector("#hit-flash"),_n=document.querySelector("#portal-prompt"),i_=document.querySelector("#portal-enter"),s_=document.querySelector("#portal-cancel"),Rd=document.querySelector("#arena-party-panel"),no=document.querySelector("#arena-party-members"),io=document.querySelector("#arena-party-room"),Qo=document.querySelector("#arena-party-start"),Pd=document.querySelector("#arena-party-leave"),r_=document.querySelector("#arena-party-invites"),fh=document.querySelector("#arena-party-invites-list"),a_=document.querySelector("#arena-overlay"),tc=document.querySelector("#photobooth-enter"),so=document.querySelector("#photobooth-prompt"),Qr=document.querySelector("#weather-control"),js=document.querySelector("#weather-badge"),o_=document.querySelector("#weather-icon"),c_=document.querySelector("#weather-name"),l_=document.querySelector("#weather-hint"),ta=document.querySelector("#fish-prompt"),ph=document.querySelector("#chat-ui"),Ld=document.querySelector("#chat-toggle"),Hn=document.querySelector("#chat-panel"),h_=document.querySelector("#chat-close"),Sn=document.querySelector("#chat-messages"),d_=document.querySelector("#chat-form"),ci=document.querySelector("#chat-input"),lr=document.querySelector("#chat-unread"),mh=document.querySelector("#leaderboard-ui"),ec=document.querySelector("#leaderboard-toggle"),ro=document.querySelector("#leaderboard-panel"),u_=document.querySelector("#leaderboard-close"),ao=document.querySelector("#leaderboard-list"),oo=document.querySelector("#crocodile-score-list"),gh=document.querySelector("#backpack-ui"),Ci=document.querySelector("#backpack-toggle"),Qs=document.querySelector("#backpack-panel"),f_=document.querySelector("#backpack-close"),p_=document.querySelector("#backpack-count"),m_=document.querySelector("#backpack-summary"),g_=document.querySelector("#backpack-stats"),vh=document.querySelector("#collection-strip"),_h=document.querySelector("#backpack-filters"),nc=document.querySelector("#backpack-sort"),Wr=document.querySelector("#backpack-list"),Ic=document.querySelector("#expanded-map"),v_=document.querySelector("#map-expand"),__=document.querySelector("#expanded-map-close"),x_=document.querySelector("#expanded-map-backdrop"),aa=document.querySelector("#catch-popup"),y_=document.querySelector("#catch-name"),M_=document.querySelector("#catch-weight"),S_=document.querySelector("#catch-rarity"),xh=document.querySelector("#catch-tags"),b_=document.querySelector("#catch-view-button"),Dc=document.querySelector("#catch-hold-button"),Di=document.querySelector("#big-catch-banner"),w_=document.querySelector("#big-catch-button"),E_=document.querySelector("#big-catch-icon"),T_=document.querySelector("#big-catch-tier"),A_=document.querySelector("#big-catch-text"),Id=document.querySelector("#fish-viewer"),Le=document.querySelector("#reel-game"),yh=document.querySelector("#reel-zone"),Mh=document.querySelector("#reel-marker"),Sh=document.querySelector("#reel-meter-fill"),C_=document.querySelector("#reel-percent"),R_=document.querySelector("#reel-helper"),Uc=document.querySelector("#reel-result");document.querySelector("#net-debug");const it=new Gv(document.querySelector("#game"),document.querySelector("#name-labels")),on=it.renderer.domElement;on.tabIndex=0;const Nc=new Wv(document.querySelector("#minimap-canvas"),document.querySelector("#expanded-map-canvas"),Ic),Fc=new Hv(document.querySelector("#photobooth-overlay"),{onExit:Hc,prepareCapture:()=>it.preparePhotoboothCapture(),captureScene:i=>(it.render(1/60),{source:it.renderer.domElement,namePoint:i?it.photoboothNamePoint(ie):null,room:Bc,playerName:Xn.value.trim()})}),Yi=new Ov(document.querySelector("#catch-fish-canvas"));let Dd=[],ic=[],Ge=[],Oc=0,Ui=null,oa=new Map,Xr="all",Ri=null,_e=null;const us=new Map,Ni=[];let zi=null,bh=0;const kc=new Vv(Id,()=>Dd);let Ht,ee=!1,ke=!1,Hi=!1,sc=0,kn=!1,ie="",Bc="",ii=null;const Gn=new Map,si=new Map,pn=new Xv(a_,{leave:()=>Ht.leaveArena(),restart:()=>Ht.restartArena()});let Ie=!1,Ud=0,ca=[],_s=0,pe=new Set,ri=0,wh=performance.now(),Eh=0,la=0,rc=0,ac=0,oc=null,Th=0,Ah=0,Ch=0,tr=0,hr=null,Rh=0,li=null,Pi=0,ea=!1,qs=null,Ph=null,kt=null,Ts=0,Lh=0,Fi=!1,ps=null;const ha=(()=>{const i=Number(new URLSearchParams(location.search).get("reelDifficulty"));return Number.isFinite(i)&&new URLSearchParams(location.search).has("reelDifficulty")?Math.max(0,Math.min(1,i)):null})(),P_=null,L_=ut.pond.waterRadius+ut.pond.edgeRange,Ih=[{icon:"🎒",title:"Your Backpack",description:"Catch records, species collection, filters, sorting, and fish release."},{icon:"🐟",title:"Hold your catch",description:"Press F to show a fish in your hands. Bigger catches look bigger, and everyone can see it."},{icon:"💾",title:"Catches that stay",description:"Your catch history, personal bests, Backpack fish, and room leaderboards are now saved for your next visit."},{icon:"👑",title:"Leaderboard crown",description:"The room’s top fisher wears a crown."},{icon:"🍲",title:"Cook and share at the campfire",description:"Choose Cook in your Backpack or press C near the campfire."},{icon:"👁️",title:"First-person view",description:"Switch views with V or the view button."},{icon:"🌦️",title:"Weather",description:"The pond has moods now. Rain, fog and storms change what’s biting."},{icon:"🗺️",title:"Island minimap",description:"Find the pond, campfire, stones, and other fishers at a glance. Press M to expand the map."},{icon:"🪨",title:"Friendly splash",description:"Want to keep your friend off the top spot? Toss a stone while they’re fishing!"},{icon:"🐔",title:"Chicken hits",description:"Toss a stone at a wandering chicken to earn a hit. Hit chickens pop out and respawn somewhere new."},{icon:"⌨️",title:"Quick controls",description:"Press Escape to close the chatbox."}];function Be(i){eo.textContent=i,eo.classList.add("show"),window.clearTimeout(Ah),Ah=window.setTimeout(()=>eo.classList.remove("show"),2600)}function I_(){Vr.classList.remove("show"),Vr.offsetWidth,Vr.classList.add("show"),window.clearTimeout(Ch),Ch=window.setTimeout(()=>Vr.classList.remove("show"),600)}function D_(i,t){it.showBonk(i),i===ie&&I_(),t&&(it.cancelFishing(i),i===ie&&(kt&&(kt.setHeld(!1),kt=null,pe.clear()),ps=null,Fi=!1,window.clearTimeout(Ts),Le.classList.add("hidden"),Le.classList.remove("is-ending","is-success","is-escaped","is-pulling"),Be("A stone hit you. Fishing cancelled.")))}function Nd(){if(!qs)return;const i=nn.states[qs.type],t=Math.max(0,Math.ceil((qs.endsAt-(Date.now()+Pi))/6e4));o_.innerHTML=U_(qs.type),c_.textContent=i.name,js.setAttribute("aria-label",`Weather: ${i.name}`);const e=Math.round((1/i.fishing.biteWaitMultiplier-1)*100),n=e>0?`Bites ${e}% faster`:e<0?`Bites ${Math.abs(e)}% slower`:"Bite pace unchanged";l_.textContent=`${i.hint.replace(/\s*🎣/gu,"")} · ${n} · ${t} min left`}function U_(i){return`<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${{clear:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',cloudy:'<path d="M7 18h10a4 4 0 0 0 .4-8A6 6 0 0 0 6 11a3.5 3.5 0 0 0 1 7Z"/>',rain:'<path d="M7 14h10a4 4 0 0 0 .4-8A6 6 0 0 0 6 7a3.5 3.5 0 0 0 1 7Zm1 3-1 2m6-2-1 2m6-2-1 2"/>',fog:'<path d="M7 10h10a4 4 0 0 0 .4-8A6 6 0 0 0 6 3a3.5 3.5 0 0 0 1 7Zm-4 4h18m-15 4h12"/>',storm:'<path d="M7 13h10a4 4 0 0 0 .4-8A6 6 0 0 0 6 6a3.5 3.5 0 0 0 1 7Zm5 1-2 4h3l-1 4 4-6h-3l1-2"/>'}[i]}</g></svg>`}function Dh(i,t){qs=i,it.setWeather(i),Nd(),t&&Be(nn.states[i.type].toast)}function ma(){zn.classList.add("hidden"),on.focus({preventScroll:!0})}function N_(){to.replaceChildren(),to.classList.toggle("five-columns",Ih.length>=10);for(const i of Ih){const t=document.createElement("article");t.className="whats-new-item";const e=document.createElement("span");e.className="whats-new-icon",e.setAttribute("aria-hidden","true"),e.textContent=i.icon;const n=document.createElement("h3");n.textContent=i.title;const s=document.createElement("p");s.className="whats-new-description";for(const r of i.description.split(/(Escape|\bF\b|\bC\b|\bV\b|\bM\b)/g))if(r)if(["Escape","F","C","V","M"].includes(r)){const a=document.createElement("kbd");a.className="whats-new-key",a.textContent=r==="Escape"?"Esc":r,r==="Escape"&&a.setAttribute("aria-label","Escape"),s.append(a)}else s.append(document.createTextNode(r));t.append(e,n,s),to.append(t)}}N_();function zc(i=kt==null?void 0:kt.current){if(!i)return;yh.style.left=`${i.zoneCenter-i.zoneWidth/2}%`,yh.style.width=`${i.zoneWidth}%`,Mh.style.left=`${i.marker}%`,Mh.classList.toggle("inside",i.inside),Sh.style.width=`${i.meter*100}%`;const t=25+118*i.meter;Sh.style.backgroundColor=`hsl(${t} 55% 59%)`,C_.textContent=`${Math.round(i.meter*100)}%`,Le.classList.toggle("is-pulling",i.pulling),it.setLineTaut(ie,i.inside)}function F_(){if(!ee||kt)return;window.clearTimeout(Ts),Fi=!1,Le.classList.remove("hidden","is-ending","is-success","is-escaped","is-pulling"),Uc.textContent="";const i=Bh(ha??0,"common",ha===1?"#d5a633":"#77b789");kt=new qv(i),kt.setHeld(!0),Le.style.setProperty("--reel-rarity-color",i.rarityColor),R_.classList.toggle("hidden",Lh>=ut.reel.helperDisplayCount),Lh+=1,pe.clear(),it.setFishing(ie,"fighting"),ta.classList.add("hidden"),zc(),Ht.startReel()}function O_(i){if(!kt)return;const t=ha===null?i:Bh(ha,i.rarity,i.rarityColor);kt.setParameters(t),Le.style.setProperty("--reel-rarity-color",t.rarityColor),zc()}function Fd(i,t=!0){!kt&&Le.classList.contains("hidden")||(kt==null||kt.setHeld(!1),kt=null,pe.clear(),it.setLineTaut(ie,!1),Le.classList.remove("is-pulling","is-success","is-escaped"),Le.classList.add("is-ending",i?"is-success":"is-escaped"),Uc.textContent=i?"Nice and steady…":"It got away…",Fi=!0,ps=t?i:null,window.clearTimeout(Ts),Ts=window.setTimeout(()=>{Le.classList.add("hidden"),Le.classList.remove("is-ending","is-success","is-escaped"),Fi=!1},i?650:1200),t&&Ht.endReel(i))}function qr(){jv.textContent=String(it.playerCount())}function co(i){Qv.textContent=String(Math.max(0,Math.floor(i)))}function k_(i){ke=!0,_n.classList.add("hidden"),Is(),pe.clear(),sc=0,Pc.classList.add("in-arena"),pn.enter(i,ie)}function B_(i){ke=!1,pn.close(),Pc.classList.remove("in-arena"),pe.clear(),Hi=!0,i&&Be("You have respawned by the portal.")}function Uh(i){let e=new Set(i.map(n=>n.id)).size!==si.size;for(const n of i){const s=si.get(n.id);(!s||s.name!==n.name||s.color!==n.color)&&(e=!0)}si.clear();for(const n of i)si.set(n.id,n);e&&Li()}function Li(){const i=ii;if(Rd.classList.toggle("hidden",!i),!i)return;no.replaceChildren();for(const s of i.members){const r=document.createElement("div");r.className="arena-party-member";const a=document.createElement("strong");a.textContent=`${s.name}${s.playerId===ie?" · You":""}`;const o=document.createElement("span");o.className="arena-party-role",o.textContent=s.playerId===i.leaderId?"Leader":"Joined",r.append(a,o),no.append(r)}for(const s of i.invited){const r=document.createElement("div");r.className="arena-party-member";const a=document.createElement("strong");a.textContent=s.name;const o=document.createElement("span");o.className="arena-party-role",o.textContent="Invite pending",r.append(a,o),no.append(r)}io.replaceChildren();const t=new Set([...i.members.map(s=>s.playerId),...i.invited.map(s=>s.playerId)]),e=[...si.values()].filter(s=>s.id!==ie&&!t.has(s.id));if(e.length===0){const s=document.createElement("div");s.className="arena-party-empty",s.textContent="No other players are currently in the room.",io.append(s)}for(const s of e){const r=document.createElement("div");r.className="arena-party-player";const a=document.createElement("span");a.textContent=s.name;const o=document.createElement("button");o.type="button",o.textContent="Invite",o.disabled=i.leaderId!==ie,o.addEventListener("click",()=>Ht.inviteArenaPartyPlayer(s.id)),r.append(a,o),io.append(r)}const n=i.leaderId===ie;Qo.disabled=!n,Qo.textContent=n?i.members.length>1?"Start together":"Start solo":"Waiting for leader",Pd.textContent=n?"Cancel party":"Leave party"}function Oi(){fh.replaceChildren(),r_.classList.toggle("hidden",Gn.size===0);for(const i of Gn.values()){const t=document.createElement("div");t.className="arena-party-invite";const e=document.createElement("span");e.textContent=`${i.leaderName} invited you`;const n=document.createElement("div"),s=document.createElement("button");s.type="button",s.textContent="Join",s.addEventListener("click",()=>{Gn.delete(i.partyId),Oi(),Ht.respondArenaPartyInvite(i.partyId,!0)});const r=document.createElement("button");r.type="button",r.textContent="No thanks",r.addEventListener("click",()=>{Gn.delete(i.partyId),Oi(),Ht.respondArenaPartyInvite(i.partyId,!1)}),n.append(s,r),t.append(e,n),fh.append(t)}}function z_(i){ii=i,Gn.delete(i.partyId),Oi(),_n.classList.add("hidden"),Li()}function H_(i,t){Gn.delete(i),(ii==null?void 0:ii.partyId)===i&&(ii=null,Li(),t==="cancelled"?Be("The arena party was cancelled."):t==="left"&&Be("You left the arena party.")),Oi()}function Od(){!ee||ke||(Hi=!0,_n.classList.add("hidden"),Ht.createArenaParty())}function G_(){if(!ee||ke){_n.classList.add("hidden");return}const i=it.getPosition();Math.hypot(i.x-me.crocodilePortal.x,i.z-me.crocodilePortal.z)>me.crocodilePortal.useRadius?(Hi=!1,_n.classList.add("hidden")):_n.classList.toggle("hidden",Hi)}function Gi(){return pe.has("w")||pe.has("s")}function $i(i=!1){if(!ee||typeof Ht>"u")return;const t=it.getPosition(),e=it.localFacing(),n=!Ie&&!kt&&it.fishingState()==="idle"&&Gi(),s=oc,r=!s||Math.hypot(t.x-s.x,t.z-s.z)>.002||Math.abs(Math.atan2(Math.sin(e-s.rotY),Math.cos(e-s.rotY)))>.002||n!==s.moving||Ie!==s.inPhotobooth,a=performance.now(),o=r&&a-rc>=50,c=a-ac>=1e3;!i&&!o&&!c||(la+=1,Ht.sendMove(la,t.x,t.z,e,n,Date.now(),Ie),oc={x:t.x,z:t.z,rotY:e,moving:n,inPhotobooth:Ie},rc=a,ac=a)}function kd(){const i=it.getPosition();return Math.hypot(i.x-te.position.x,i.z-te.position.z)<=te.interactionRadius}function Bd(){!ee||Ie||!kd()||kt||it.fishingState()!=="idle"||(Ie=!0,Ud=it.localFacing(),pe.clear(),Is(),Tn(!1),Cn(null),document.querySelector("#app").classList.add("photobooth-mode"),it.setPhotoboothMode(!0),it.setPhotoboothState(ie,!0),Fc.open(),$i(!0))}function Hc(){if(!Ie)return;Ie=!1,Fc.close();const i=it.getPosition();it.setLocalMotion(i.x,i.z,Ud),it.setPhotoboothState(ie,!1),it.setPhotoboothMode(!1),document.querySelector("#app").classList.remove("photobooth-mode"),$i(!0)}function V_(i){if(i-Th<200||typeof Ht>"u")return;Th=i;const t=Ht.diagnostics();it.setInterpolationDelay(t.interpolationDelayMs)}function lo(i){if(ea)return;const t=i-Date.now();Pi=ea?Pi+(t-Pi)*.08:t,ea=!0,it.setServerClockOffset(Pi)}function Nh(i){t_.classList.toggle("offline",!i),e_.textContent=i?"Connected":"Disconnected",document.querySelector("#connection-control").setAttribute("aria-label",i?"Connected":"Disconnected")}function zd(i){kn=i,it.setFirstPersonView(kn);const t=kn?"Switch to third-person view":"Switch to first-person view";Xs.setAttribute("aria-label",`${t} (V)`),Xs.title=`${t} · V`,Xs.setAttribute("aria-pressed",String(kn)),Xs.classList.toggle("active",kn),document.querySelector("#view-icon").innerHTML=kn?'<path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.5"/>':'<path d="M3 11.5 12 4l9 7.5v8a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-8Zm5 9v-6h8v6M9 9h.01M15 9h.01"/>'}function W_(){if(Js.replaceChildren(),ca.length===0){const i=document.createElement("p");i.className="rooms-empty",i.textContent="No open rooms yet. Create one below.",Js.append(i);return}for(const i of ca){const t=document.createElement("button");t.type="button",t.className="room-option";const e=document.createElement("span"),n=document.createElement("span");n.className="room-option-title",n.textContent=`Room ${i.room}`;const s=document.createElement("span");s.className="room-option-count",s.textContent=`${i.playerCount} ${i.playerCount===1?"player":"players"}`,e.append(n,document.createElement("br"),s);const r=document.createElement("span");r.className="room-option-action",r.textContent="Choose →",t.append(e,r),t.addEventListener("click",()=>X_(i.room)),Js.append(t)}}async function cc(){try{const i=await fetch("/api/rooms",{cache:"no-store"});if(!i.ok)throw new Error(`Room list request failed (${i.status})`);ca=(await i.json()).rooms,W_()}catch{Js.replaceChildren();const i=document.createElement("p");i.className="rooms-empty",i.textContent="Room list unavailable. You can still enter a room number above.",Js.append(i)}}function Hd(){_s&&window.clearInterval(_s),cc(),_s=window.setInterval(()=>{ee||cc()},5e3)}function X_(i){ra.value=i,ni.textContent="",Xn.value.trim()?Lc.requestSubmit():Xn.focus()}function Tn(i){i&&hr&&Cn(null),Hn.classList.toggle("hidden",!i),Ld.setAttribute("aria-expanded",String(i)),i?(tr=0,lr.classList.add("hidden"),lr.textContent="0",Sn.scrollTop=Sn.scrollHeight,ci.focus()):Hn.contains(document.activeElement)&&ci.blur()}function Ls(i){for(us.delete(i.id),us.set(i.id,i);us.size>100;)us.delete(us.keys().next().value)}function fi(i){Ls(i),kc.open(us.get(i.id))}it.setHeldFishClickHandler((i,t)=>{const e=it.heldFish(i);!e||e.catchId!==t||fi({id:e.catchId,playerId:i,playerName:it.playerName(i),species:e.species,weightKg:e.weightKg,rarity:e.rarity,timestamp:e.caughtAt})});function q_(i){var o,c;(o=Sn.querySelector(".chat-empty"))==null||o.remove();const t=document.createElement("article");t.className=`chat-message${i.playerId===ie?" mine":""}`;const e=document.createElement("div");e.className="chat-meta";const n=document.createElement("strong");n.textContent=i.name;const s=document.createElement("time");s.dateTime=new Date(i.at).toISOString(),s.textContent=new Date(i.at).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}),e.append(n,s);const r=document.createElement("p");if(r.textContent=i.text,t.append(e,r),i.catch){Ls(i.catch);const l=Vi(i.catch.species),h=document.createElement("button");h.type="button",h.className="catch-chip",h.style.setProperty("--rarity-color",l.rarityColor);const u=document.createElement("img");u.alt="",u.src=Yi.iconDataUrl(i.catch.species,i.catch.weightKg);const f=document.createElement("span");f.textContent=`${l.name} · ${i.catch.weightKg.toFixed(2)} kg`,h.append(u,f),h.addEventListener("click",()=>fi(i.catch)),t.append(h)}for(Sn.append(t);Sn.children.length>50;)(c=Sn.firstElementChild)==null||c.remove();!Hn.classList.contains("hidden")?Sn.scrollTop=Sn.scrollHeight:(tr+=1,lr.textContent=tr>9?"9+":String(tr),lr.classList.remove("hidden"))}function Vi(i){return ut.species.find(t=>t.id===i)}function Fh(i,t=Xn.value.trim()){return{id:i.catchId,playerId:ie,playerName:t||"You",species:i.species,weightKg:i.weightKg,rarity:i.rarity,timestamp:i.caughtAt}}function Y_(i){const t=Math.max(0,Math.floor((Date.now()-i)/1e3));if(t<60)return`${t} sec ago`;const e=Math.floor(t/60);if(e<60)return`${e} min ago`;const n=Math.floor(e/60);return n<24?`${n} hr ago`:`${Math.floor(n/24)} days ago`}function $_(){vh.replaceChildren();for(const i of ut.species){const t=oa.get(i.id),e=document.createElement("div");e.className=`collection-item${t?"":" uncaught"}`;const n=document.createElement("img");n.alt="",n.src=Yi.iconDataUrl(i.id,(t==null?void 0:t.weightKg)??i.medianKg);const s=document.createElement("strong");s.textContent=i.name;const r=document.createElement("span");r.textContent=t?`${t.weightKg.toFixed(2)} kg`:"?",e.append(n,s,r),vh.append(e)}}function hi(){p_.textContent=Ge.length>99?"99+":String(Ge.length),m_.textContent=`Backpack · ${Ge.length} ${Ge.length===1,"fish"}`,g_.textContent=`${Oc} total fish caught · Personal best ${Ui?`${Ui.weightKg.toFixed(2)} kg ${Vi(Ui.species).name}`:"—"}`,$_(),_h.replaceChildren();const i=[{id:"all",name:"All"},...ut.species.map(n=>({id:n.id,name:n.name}))];for(const n of i){const s=document.createElement("button");s.type="button",s.className=`backpack-filter${Xr===n.id?" active":""}`,s.textContent=n.name,s.addEventListener("click",()=>{Xr=n.id,hi()}),_h.append(s)}const t={common:0,uncommon:1,rare:2,epic:3,legendary:4},e=Ge.filter(n=>Xr==="all"||n.species===Xr);if(nc.value==="heaviest"?e.sort((n,s)=>s.weightKg-n.weightKg):nc.value==="rarity"?e.sort((n,s)=>t[s.rarity]-t[n.rarity]||s.weightKg-n.weightKg):e.sort((n,s)=>s.caughtAt-n.caughtAt),Wr.replaceChildren(),Ge.length===0){const n=document.createElement("p");n.className="backpack-empty",n.textContent="No fish yet. Go cast a line!",Wr.append(n);return}if(e.length===0){const n=document.createElement("p");n.className="backpack-empty",n.textContent="No fish of this kind yet.",Wr.append(n);return}for(const n of e){const s=Vi(n.species),r=document.createElement("article");r.className="backpack-row",r.style.setProperty("--rarity-color",s.rarityColor),r.tabIndex=0,r.setAttribute("role","button");const a=document.createElement("img");a.className="backpack-row-icon",a.alt="",a.src=Yi.iconDataUrl(n.species,n.weightKg);const o=document.createElement("div");o.className="backpack-row-main";const c=document.createElement("strong");c.textContent=s.name;const l=document.createElement("span");l.className="backpack-row-meta",l.textContent=`${n.weightKg.toFixed(2)} kg · ${Y_(n.caughtAt)}`;const h=document.createElement("span");h.className="backpack-rarity",h.textContent=n.rarity,o.append(c,l,h);const u=document.createElement("div");u.className="backpack-row-actions";const f=document.createElement("button");f.type="button",f.dataset.action="cook",f.textContent="Cook",f.addEventListener("click",()=>Ht.cookFish(n.catchId));const p=document.createElement("button");p.type="button",p.dataset.action="hold",p.textContent=(_e==null?void 0:_e.catchId)===n.catchId?"Put away":"Hold",p.addEventListener("click",()=>{(_e==null?void 0:_e.catchId)===n.catchId?Ht.holdFish(null):Gc(n.catchId)});const g=document.createElement("button");if(g.type="button",g.dataset.action="release",g.className="release-button",Ri===n.catchId){g.textContent="Sure?",g.addEventListener("click",()=>{Ht.releaseFish(n.catchId),Ri=null});const v=document.createElement("button");v.type="button",v.dataset.action="cancel-release",v.textContent="Keep",v.addEventListener("click",()=>{Ri=null,hi()}),u.append(f,p,g,v)}else g.textContent="Release",g.addEventListener("click",()=>{Ri=n.catchId,hi()}),u.append(f,p,g);r.addEventListener("click",v=>{v.target.closest("button")||fi(Fh(n))}),r.addEventListener("keydown",v=>{(v.key==="Enter"||v.key===" ")&&!(v.target instanceof HTMLButtonElement)&&(v.preventDefault(),fi(Fh(n)))}),r.append(a,o,u),Wr.append(r)}}function K_(i,t,e,n){Ge=[...i].sort((s,r)=>r.caughtAt-s.caughtAt),Oc=t,Ui=e,oa=new Map(n.map(s=>[s.species,s])),Ri=null,hi()}function Z_(i){!Ge.some(n=>n.catchId===i.catchId)&&(Ge.push(i),Oc+=1,ee&&(Ci.classList.remove("pulse"),Ci.offsetWidth,Ci.classList.add("pulse"),window.clearTimeout(Rh),Rh=window.setTimeout(()=>Ci.classList.remove("pulse"),900))),(!Ui||i.weightKg>Ui.weightKg)&&(Ui=i);const e=oa.get(i.species);(!e||i.weightKg>e.weightKg)&&oa.set(i.species,i),Ge.sort((n,s)=>s.caughtAt-n.caughtAt),hi()}function Gc(i){if(it.carryingStoneId(ie)){Be("Throw the stone first.");return}Ht.holdFish(i)}function Cn(i){i&&!Hn.classList.contains("hidden")&&Tn(!1),hr=i;const t=i==="leaderboard",e=i==="backpack";ro.classList.toggle("hidden",!t),Qs.classList.toggle("hidden",!e),ro.setAttribute("aria-hidden",String(!t)),Qs.setAttribute("aria-hidden",String(!e)),ro.inert=!t,Qs.inert=!e,ec.setAttribute("aria-expanded",String(t)),Ci.setAttribute("aria-expanded",String(e)),ec.classList.toggle("active",t),Ci.classList.toggle("active",e)}function Vc(i){Cn(i?"backpack":null)}function dr(i=Ic.classList.contains("hidden")){i&&(Cn(null),Tn(!1)),Nc.toggleExpanded(i)}function Gd(){if(zi||Ni.length===0)return;const i=Ni.shift();zi=i;const t=i.catch;Ls(t);const e=Vi(t.species);Di.style.setProperty("--rarity-color",e.rarityColor),Di.classList.toggle("spectacular",i.tier==="spectacular"),Di.classList.remove("hidden","is-leaving"),document.querySelector("#app").classList.add("has-big-catch"),E_.src=Yi.iconDataUrl(t.species,t.weightKg),T_.textContent=i.tier==="spectacular"?"SPECTACULAR CATCH":"BIG CATCH",A_.textContent=`${t.playerName} caught a ${t.weightKg.toFixed(2)} kg ${e.name}!`;const n=i.tier==="spectacular"?ut.bigCatch.spectacularDurationMs:ut.bigCatch.bannerDurationMs;window.clearTimeout(bh),bh=window.setTimeout(J_,n)}function J_(){zi&&(Di.classList.add("is-leaving"),window.setTimeout(()=>{Di.classList.add("hidden"),Di.classList.remove("is-leaving","spectacular"),zi=null,document.querySelector("#app").classList.toggle("has-big-catch",Ni.length>0),Gd()},240))}function j_(i){Ls(i.catch),Ni.length>=ut.bigCatch.queueLimit&&Ni.shift(),Ni.push(i),Gd()}function Oh(i){var t;Dd=i,it.setLeaderboardLeader(((t=i[0])==null?void 0:t.playerName)??null);for(const e of i)Ls(e);if(ao.replaceChildren(),i.length===0){const e=document.createElement("li");e.className="leaderboard-empty",e.textContent="No catches yet, be the first!",ao.append(e);return}for(const[e,n]of i.entries()){const s=Vi(n.species),r=document.createElement("li"),a=e<3?["gold","silver","bronze"][e]:"";r.className=`leaderboard-entry${a?` podium-${a}`:""}${n.playerName.toLocaleLowerCase()===Xn.value.trim().toLocaleLowerCase()?" own-entry":""}`,r.style.setProperty("--rarity-color",s.rarityColor);const o=document.createElement("span");o.className="leaderboard-rank",o.textContent=String(e+1);const c=document.createElement("img");c.className="leaderboard-fish",c.alt="",c.src=Yi.iconDataUrl(n.species,n.weightKg);const l=document.createElement("span");l.className="leaderboard-details";const h=document.createElement("strong");h.textContent=s.name;const u=document.createElement("span");u.textContent=`${n.weightKg.toFixed(2)} kg · ${n.playerName}`,l.append(h,u);const f=document.createElement("span");f.className="leaderboard-rarity",f.textContent=s.rarity,r.tabIndex=0,r.setAttribute("role","button"),r.addEventListener("click",()=>fi(n)),r.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),fi(n))}),r.append(o,c,l,f),ao.append(r)}}function kh(i){const t=[...i].filter(e=>e.count>0).sort((e,n)=>n.count-e.count||e.playerName.localeCompare(n.playerName));if(JSON.stringify(t)!==JSON.stringify(ic)){if(ic=t,oo.replaceChildren(),t.length===0){const e=document.createElement("li");e.className="crocodile-score-empty",e.textContent="No crocodiles slain yet.",oo.append(e);return}for(const[e,n]of t.slice(0,10).entries()){const s=document.createElement("li"),r=document.createElement("span");r.textContent=`${e+1}.`;const a=document.createElement("strong");a.textContent=n.playerName;const o=document.createElement("span");o.textContent=String(n.count),s.append(r,a,o),oo.append(s)}}}function Q_(i){li=i.entry,Ls(i.entry);const t=Vi(i.entry.species);Yi.show(i.entry.species,i.entry.weightKg),y_.textContent=t.name,M_.textContent=`${i.entry.weightKg.toFixed(2)} kg`,S_.textContent=t.rarity,xh.replaceChildren(),aa.style.setProperty("--rarity-color",t.rarityColor);for(const[e,n]of[["New personal best!",i.flags.newPersonalBest],["New room record!",i.flags.newRoomRecord]]){if(!n)continue;const s=document.createElement("span");s.textContent=e,xh.append(s)}aa.classList.remove("hidden"),Dc.textContent=(_e==null?void 0:_e.catchId)===i.entry.id?"Put away (F)":"Hold it (F)"}b_.addEventListener("click",()=>{li&&fi(li)});Dc.addEventListener("click",()=>{li&&((_e==null?void 0:_e.catchId)===li.id?Ht.holdFish(null):Gc(li.id))});w_.addEventListener("click",()=>{zi&&fi(zi.catch)});function tx(){const i=it.getPosition();if(Math.hypot(i.x,i.z)-ut.pond.waterRadius>ut.pond.edgeRange)return Be("Move closer to the pond to fish."),null;const e=Math.atan2(-i.z,-i.x)+(Math.random()-.5)*.22,n=ut.pond.minTargetRadius+Math.random()*(ut.pond.maxTargetRadius-ut.pond.minTargetRadius),s=Math.max(ut.pond.minTargetRadius,Math.min(ut.pond.maxTargetRadius,n+(Math.random()-.5)*.06)),r=ut.pond.waterRadius*s;return{x:Math.cos(e)*r,z:Math.sin(e)*r}}function ex(i,t){ni.textContent="",ti.disabled=!0,ti.innerHTML="Joining…",Ht=new Zd({joined:n=>{lo(n.serverTime),ke=!1,Pc.classList.remove("in-arena"),pn.close(),ii=null,Gn.clear(),Li(),Oi(),Hi=!1,Dh(n.weather,!1),ie=n.selfId,la=0,oc=null,rc=0,ac=0,Bc=n.room,document.querySelector("h1").innerHTML="Welcome to<br/><span>Mengai</span>",document.querySelector(".intro").textContent="Find a quiet spot by the water and see who else is out fishing.",it.clearPlayers(),it.setLocalId(ie),it.setFirstPersonView(kn),Uh(n.players);const s=n.players.find(c=>c.id===ie);_e=(s==null?void 0:s.holdingFish)??null,co((s==null?void 0:s.chickenScore)??0),s&&it.addLocal(s);for(const c of n.players)c.id!==ie&&it.upsert(c,n.serverTime);it.setStones(n.stones??[]),it.setChickens(n.chickens??[],n.serverTime),it.setCampfireCooking(n.campfireCooking??null),Jv.textContent=`Room ${n.room}`,Oh(n.leaderboard??[]),kh(n.crocodileScores??[]),Sn.replaceChildren();const r=document.createElement("p");r.className="chat-empty",r.textContent="Say hello to everyone in this room.",Sn.append(r),tr=0,lr.classList.add("hidden"),ph.classList.remove("hidden"),Tn(!1),mh.classList.remove("hidden"),gh.classList.remove("hidden"),Cn(null),qr(),ee=!0;const a=Ph??P_;Ph=null,a&&Ht.setDebugWeather(a),_s&&window.clearInterval(_s),_s=0,dh.classList.add("hidden"),uh.classList.remove("hidden"),Nh(!0),ti.disabled=!1,ti.innerHTML='Join the pond <span aria-hidden="true">→</span>',ni.textContent="";const o=`mengai:resume:${encodeURIComponent(n.room)}:${encodeURIComponent(t.toLocaleLowerCase())}`;n.resumeToken&&localStorage.setItem(o,n.resumeToken)},state:(n,s)=>{lo(s),Uh(n);for(const a of n)a.id!==ie&&it.upsert(a,s);const r=n.find(a=>a.id===ie);r&&co(r.chickenScore),qr()},playerJoined:(n,s)=>{lo(s),si.set(n.id,n),it.upsert(n,s),qr(),Li(),Be(`${n.name} joined the pond`)},playerLeft:n=>{si.delete(n),it.remove(n),qr(),Li()},correction:n=>{n.seq>=la&&it.applyCorrection(n.x,n.z)},clockOffset:n=>{Pi=n,ea=!0,it.setServerClockOffset(n)},error:n=>{ti.disabled=!1,ti.innerHTML='Join the pond <span aria-hidden="true">→</span>',ni.textContent=n,Ht.close()},notice:Be,fishCast:n=>it.startCast(n.playerId,n),fishBite:n=>it.showBite(n.playerId),fishReel:n=>it.startReel(n.playerId,n.startTime,n.duration),fishEscaped:n=>{n===ie&&(kt?Fd(!1,!1):ps===!0?(ps=null,Le.classList.remove("is-success"),Le.classList.add("is-escaped","is-ending"),Uc.textContent="It got away…",Fi=!0,window.clearTimeout(Ts),Ts=window.setTimeout(()=>{Le.classList.add("hidden"),Le.classList.remove("is-ending","is-success","is-escaped"),Fi=!1},1200)):Fi||Be("It got away!"))},reelParams:O_,reelState:(n,s)=>it.setReelActive(n,s),catchResult:n=>{ps=null,Q_(n)},leaderboard:Oh,crocodileScore:n=>kh([...ic.filter(s=>s.playerId!==n.playerId),n]),inventorySync:K_,inventoryAdd:Z_,inventoryRemove:n=>{Ge=Ge.filter(s=>s.catchId!==n),Ri===n&&(Ri=null),hi()},playerHolding:(n,s)=>{it.setHoldingFish(n,s),n===ie&&(_e=s,li&&(Dc.textContent=(_e==null?void 0:_e.catchId)===li.id?"Put away (F)":"Hold it (F)"),hi())},campfireCooking:n=>it.setCampfireCooking(n),campfireCooked:n=>{it.finishCampfireCooking(n.cooking.cookId);const s=Vi(n.cooking.fish.species);for(const r of n.recipientIds)it.showEatBubble(r,s.name)},weatherChanged:n=>Dh(n,!0),announcement:Be,chat:n=>{it.showChatBubble(n.playerId,n.text),q_(n)},bigCatch:j_,stonePicked:(n,s)=>it.pickStone(n,s),stoneThrown:n=>it.throwStone(n),stoneLanded:n=>it.landStone(n),stoneRespawn:n=>it.respawnStone(n.stoneId,n.position),stoneHit:D_,chickenHit:n=>{it.hitChicken(n),n.playerId===ie&&co(n.newScore)},chickenState:(n,s)=>it.setChickens(n,s),portalEntered:n=>k_(n),arenaState:n=>pn.receive(n),arenaPartyState:z_,arenaPartyInvite:n=>{Gn.set(n.partyId,n),Oi()},arenaPartyClosed:n=>H_(n.partyId,n.reason),monsterHit:n=>pn.monsterHit(n),playerDamaged:n=>pn.playerDamaged(n),monsterDied:()=>pn.monsterDied(),playerDied:()=>pn.playerDied(),portalExited:n=>B_(n),disconnected:()=>{ee=!1,si.clear(),ii=null,Gn.clear(),Li(),Oi(),Ie&&Hc(),Is(),it.clearPlayers(),ph.classList.add("hidden"),Tn(!1),mh.classList.add("hidden"),gh.classList.add("hidden"),Cn(null),Nc.toggleExpanded(!1),_e=null,aa.classList.add("hidden"),kc.close(),Ni.length=0,zi=null,Di.classList.add("hidden"),document.querySelector("#app").classList.remove("has-big-catch"),kt=null,ps=null,Le.classList.add("hidden"),Le.classList.remove("is-ending","is-success","is-escaped","is-pulling"),Nh(!1),uh.classList.add("hidden"),dh.classList.remove("hidden"),Hd(),document.querySelector("h1").innerHTML="Connection<br/><span>lost</span>",document.querySelector(".intro").textContent="The pond connection dropped. Join again to get back to the water.",ti.innerHTML='Rejoin the pond <span aria-hidden="true">→</span>',ti.disabled=!1,ni.textContent="Disconnected. Your old spot has been released."}});const e=`mengai:resume:${encodeURIComponent(i)}:${encodeURIComponent(t.toLocaleLowerCase())}`;Ht.connect(i,t,localStorage.getItem(e)??void 0)}Lc.addEventListener("submit",i=>{i.preventDefault();const t=ra.value.trim(),e=Xn.value.trim();if(!t){ni.textContent="Please enter a room number.",ra.focus();return}if(e.length<1||e.length>16){ni.textContent="Name must be 1–16 characters.",Xn.focus();return}Bc=t,ex(t,e)});Kv.addEventListener("click",()=>{cc()});Zv.addEventListener("click",()=>{const i=new Set(ca.map(e=>e.room));let t="";for(let e=0;e<100;e++){const n=String(1e4+Math.floor(Math.random()*9e4));if(!i.has(n)){t=n;break}}ra.value=t||String(Date.now()).slice(-6),ni.textContent="",Xn.value.trim()?Lc.requestSubmit():Xn.focus()});Hd();window.setInterval(Nd,1e3);js.addEventListener("click",()=>{const i=Qr.classList.toggle("is-open");js.setAttribute("aria-expanded",String(i)),i||js.blur()});document.addEventListener("click",i=>{Qr.contains(i.target)||(Qr.classList.remove("is-open"),js.setAttribute("aria-expanded","false"),document.activeElement instanceof HTMLElement&&Qr.contains(document.activeElement)&&document.activeElement.blur())});Ld.addEventListener("click",()=>Tn(Hn.classList.contains("hidden")));h_.addEventListener("click",()=>Tn(!1));Cd.addEventListener("click",ma);n_.addEventListener("click",ma);zn.querySelector(".whats-new-backdrop").addEventListener("click",ma);zn.addEventListener("keydown",i=>{if(i.key!=="Tab")return;const t=[...zn.querySelectorAll('button:not(:disabled), [href], input:not(:disabled), [tabindex]:not([tabindex="-1"])')].filter(s=>s.getClientRects().length>0);if(t.length===0){i.preventDefault();return}const e=t[0],n=t[t.length-1];i.shiftKey&&(document.activeElement===e||!zn.contains(document.activeElement))?(i.preventDefault(),n.focus()):!i.shiftKey&&(document.activeElement===n||!zn.contains(document.activeElement))&&(i.preventDefault(),e.focus())});ec.addEventListener("click",()=>{Cn(hr==="leaderboard"?null:"leaderboard")});Xs.addEventListener("click",()=>zd(!kn));tc.addEventListener("click",Bd);i_.addEventListener("click",Od);Qo.addEventListener("click",()=>Ht.startArenaParty());Pd.addEventListener("click",()=>Ht.leaveArenaParty());s_.addEventListener("click",()=>{Hi=!0,_n.classList.add("hidden")});u_.addEventListener("click",()=>Cn(null));Ci.addEventListener("click",()=>Vc(Qs.classList.contains("hidden")));f_.addEventListener("click",()=>Vc(!1));v_.addEventListener("click",()=>dr());__.addEventListener("click",()=>dr(!1));x_.addEventListener("click",()=>dr(!1));nc.addEventListener("change",hi);d_.addEventListener("submit",i=>{i.preventDefault();const t=ci.value.trim();!ee||!t||(Ht.sendChat(t),ci.value="",ci.focus())});function Is(){document.pointerLockElement===on&&document.exitPointerLock(),ri=0,on.classList.remove("is-turning")}on.addEventListener("pointerdown",i=>{if(!(!ee||Ie||kt||it.fishingState()!=="idle"||i.pointerType!=="mouse"||i.button!==0)&&document.pointerLockElement!==on){i.preventDefault();try{Promise.resolve(on.requestPointerLock()).catch(()=>{})}catch{Be("Mouse look could not be enabled. Use A/D to turn.")}}});on.addEventListener("pointermove",i=>{document.pointerLockElement!==on||!ee||Ie||kt||it.fishingState()!=="idle"||(ri=Math.max(-.5,Math.min(.5,ri-i.movementX*.006)),i.preventDefault())});document.addEventListener("pointerlockchange",()=>{const i=document.pointerLockElement===on;on.classList.toggle("is-turning",i),i||(ri=0)});document.addEventListener("pointerlockerror",()=>Be("Mouse look could not be enabled. Use A/D to turn."));const Vd={ArrowUp:"w",ArrowDown:"s",ArrowLeft:"a",ArrowRight:"d"," ":"space"};window.addEventListener("keydown",i=>{if(i.key==="Escape"&&!zn.classList.contains("hidden")){i.preventDefault(),ma();return}if(!zn.classList.contains("hidden")){zn.contains(i.target)||i.preventDefault();return}if(Ie){Fc.handleKey(i);return}if(i.key==="Escape"&&!Id.classList.contains("hidden")){kc.close();return}if(i.key==="Escape"&&!ke&&!Rd.classList.contains("hidden")){i.preventDefault(),Ht.leaveArenaParty();return}if(i.key==="Escape"&&!ke&&!_n.classList.contains("hidden")){i.preventDefault(),Hi=!0,_n.classList.add("hidden");return}if(i.key==="Escape"){if(i.preventDefault(),ke)return;document.pointerLockElement===on&&Is(),Ic.classList.contains("hidden")?hr?Cn(null):!Hn.classList.contains("hidden")&&Hn.contains(document.activeElement)?Tn(!1):Hn.classList.contains("hidden")?document.activeElement===ci&&ci.blur():Tn(!1):dr(!1);return}if(kt){i.code==="Space"?(i.preventDefault(),kt.setHeld(!0)):(["Enter","w","a","s","d","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(i.key)||i.key.startsWith("Arrow"))&&i.preventDefault();return}if(i.target instanceof HTMLInputElement||i.target instanceof HTMLTextAreaElement)return;const t=Vd[i.key]??i.key.toLowerCase();if(!ke&&i.key==="Enter"&&!_n.classList.contains("hidden")&&!(i.target instanceof HTMLButtonElement)){i.preventDefault(),Od();return}if(ke){if(t==="e"&&ee&&!i.repeat){i.preventDefault(),Ht.arenaStoneAction();return}if(i.key==="Enter"&&!(i.target instanceof HTMLButtonElement)){i.preventDefault(),pn.isNearExit()&&Ht.leaveArena();return}if(["w","a","s","d"].includes(t)){i.preventDefault(),i.repeat||pe.add(t);return}(i.key===" "||i.key.startsWith("Arrow"))&&i.preventDefault();return}if(t==="p"&&ee&&!i.repeat){i.preventDefault(),Ie?Hc():Bd();return}if(t==="m"&&ee&&!i.repeat){i.preventDefault(),dr();return}if(t==="l"&&ee&&!i.repeat){i.preventDefault(),Cn(hr==="leaderboard"?null:"leaderboard");return}if(t==="i"&&ee&&!i.repeat){i.preventDefault(),Vc(Qs.classList.contains("hidden"));return}if(t==="v"&&ee&&!i.repeat){i.preventDefault(),zd(!kn);return}if(t==="f"&&ee&&!i.repeat){i.preventDefault(),_e?Ht.holdFish(null):Ge.length?Gc([...Ge].sort((e,n)=>n.caughtAt-e.caughtAt)[0].catchId):Be("No fish to hold yet. Catch one first.");return}if(t==="c"&&ee&&!i.repeat){i.preventDefault();const e=_e??[...Ge].sort((n,s)=>s.caughtAt-n.caughtAt)[0];e?Ht.cookFish(e.catchId):Be("Catch a fish before cooking one.");return}if(["w","a","s","d"].includes(t)){if(i.preventDefault(),i.repeat)return;const e=Gi();pe.add(t),(e!==Gi()||t==="a"||t==="d")&&$i(!0);return}if(t==="e"&&ee&&!i.repeat){if(i.preventDefault(),it.fishingState()!=="idle")return;if(it.carryingStoneId(ie))Ht.throwStone();else{const e=it.nearbyStoneId(ie);e&&(_e&&Ht.holdFish(null),Ht.pickStone(e))}return}if(t==="space"&&ee){if(i.preventDefault(),i.repeat)return;const e=it.fishingState();if(e==="idle"){if(it.carryingStoneId(ie)){Be("Put the stone down first (E to throw).");return}const n=tx();n&&(_e&&Ht.holdFish(null),Ht.castFish(n.x,n.z))}else e==="bite"?F_():(e==="casting"||e==="waiting")&&Ht.cancelFishing();return}if(i.key==="Enter"&&ee&&!(i.target instanceof HTMLInputElement)&&!(i.target instanceof HTMLTextAreaElement)){i.preventDefault(),Hn.classList.contains("hidden")&&Tn(!0),ci.focus();return}(t==="space"||i.key.startsWith("Arrow"))&&i.preventDefault(),pe.add(t)});window.addEventListener("keyup",i=>{if(Ie)return;i.code==="Space"&&(kt==null||kt.setHeld(!1));const t=Vd[i.key]??i.key.toLowerCase();if(["w","a","s","d"].includes(t)){const e=Gi();pe.delete(t),(e!==Gi()||t==="a"||t==="d")&&$i(!0);return}pe.delete(t)});window.addEventListener("blur",()=>{const i=Gi();Is(),pe.clear(),kt==null||kt.setHeld(!1),i&&$i(!0)});document.addEventListener("visibilitychange",()=>{if(document.hidden){const i=Gi();Is(),pe.clear(),kt==null||kt.setHeld(!1),i&&$i(!0)}});function Wd(i){requestAnimationFrame(Wd);const t=Math.min((i-wh)/1e3,.05);if(wh=i,V_(i),ee&&kt){const e=kt.update(t);zc(e),kt.result!=="active"&&Fd(kt.result==="success")}if(ee&&!ke&&it.stepCorrection(t),ee&&ke&&!kt){const e=(pe.has("w")?1:0)-(pe.has("s")?1:0),n=(pe.has("a")?1:0)-(pe.has("d")?1:0),s=pn.move(e,n,t);s&&i-sc>=50&&(Ht.moveArena(s.x,s.z,s.facing),sc=i)}if(ee&&!ke&&!Ie&&!kt&&it.fishingState()==="idle"){const e=(pe.has("w")?1:0)-(pe.has("s")?1:0),n=(pe.has("a")?1:0)-(pe.has("d")?1:0);let s=n;if(n===0&&ri!==0&&t>0){const o=yn.turnSpeedRadians*t*1.35,c=Math.max(-o,Math.min(o,ri));ri-=c,s=c/(yn.turnSpeedRadians*t)}else n!==0&&(ri=0);const r=it.getPosition(),a=$v({x:r.x,z:r.z,rotY:it.localFacing()},e,s,t);it.setLocalMotion(a.x,a.z,a.rotY)}if(ee&&!ke&&i-Eh>=66&&(Eh=i,Nc.render(i,it.mapPlayers())),ee)if(ke)so.classList.add("hidden"),ta.classList.add("hidden");else{$i(!1);const e=Math.hypot(it.getPosition().x,it.getPosition().z),n=it.fishingState(),s=!Ie&&kd();so.classList.toggle("hidden",!s),tc.disabled=!s,ta.classList.toggle("hidden",Ie||kt!==null||n==="fighting"||e>L_),ta.textContent=n==="bite"?"A bite! Press Space to reel in":n==="waiting"?"Fishing… Space to stop":n==="casting"?"Casting… Space to reel in":n==="reeling"?"Reeling in…":"Space to cast",G_()}else so.classList.add("hidden"),tc.disabled=!0,_n.classList.add("hidden");aa.classList.toggle("hidden",!Yi.render(i)),ke?pn.render(Date.now()+Pi,t):it.render(t)}Cd.focus({preventScroll:!0});requestAnimationFrame(Wd);
