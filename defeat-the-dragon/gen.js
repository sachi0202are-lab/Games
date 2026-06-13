const fs=require('fs');
const SPR_LIT=fs.readFileSync('/home/claude/spr_literal.txt','utf8');

const CSS=`
  :root{--bg:#10101c;--panel:#1d1d33;--panel-line:#5a5a8c;--ink:#e6e6d8;
    --hp:#d6473f;--mp:#3f8fd6;--gold:#e8c84a;--dim:#8a8aa8;--def:#7fd0a0;}
  *{box-sizing:border-box;margin:0;padding:0;}
  html,body{height:100%;}
  body{background:var(--bg);color:var(--ink);font-family:'DotGothic16',monospace;
    display:flex;align-items:flex-start;justify-content:center;padding:8px;
    overflow-x:hidden;overflow-y:auto;-webkit-font-smoothing:none;line-height:1.45;}
  #game{width:100%;max-width:400px;border:4px solid var(--panel-line);background:#000;
    image-rendering:pixelated;position:relative;user-select:none;}
  canvas{image-rendering:pixelated;}
  .btn{background:#0c0c18;border:3px solid var(--gold);color:var(--gold);
    font-family:inherit;font-size:15px;padding:11px 24px;cursor:pointer;}
  .btn:active{background:#15152a;}
  .btn.sm{font-size:13px;padding:9px 16px;border-width:2px;}

  #title{padding:30px 18px;text-align:center;background:linear-gradient(#0a0a18,#181830);
    min-height:430px;display:flex;flex-direction:column;justify-content:center;gap:18px;}
  #title h1{font-size:24px;letter-spacing:2px;color:var(--gold);line-height:1.4;text-shadow:3px 3px 0 #6b5a13;}
  .sub{color:var(--dim);font-size:12px;}
  .blink{animation:blink 1s steps(2,start) infinite;}
  @keyframes blink{to{visibility:hidden;}}

  #base,#shop{display:none;flex-direction:column;background:linear-gradient(#1a1226,#120f20);padding:10px;}
  #base h2,#shop h2{color:var(--gold);font-size:15px;text-align:center;margin-bottom:6px;}
  .card{background:var(--panel);border:3px solid var(--panel-line);padding:7px 9px;margin-bottom:7px;}
  .card h3{font-size:11px;color:var(--gold);margin-bottom:4px;border-bottom:2px solid var(--panel-line);padding-bottom:3px;}
  .row{display:flex;justify-content:space-between;font-size:12px;padding:1px 0;}
  .row b{font-weight:normal;color:var(--dim);}
  .gold{color:var(--gold);}
  #summary{display:none;border-color:var(--gold);}
  #summary.lose{border-color:var(--hp);}
  #summary .head{font-size:13px;margin-bottom:4px;text-align:center;}
  #summary.win .head{color:var(--gold);} #summary.lose .head{color:var(--hp);}
  #summary .line{font-size:11.5px;padding:1px 0;}
  #tabs{display:flex;gap:4px;margin-bottom:6px;}
  .tab{flex:1;background:#0c0c18;border:2px solid #33334d;color:var(--dim);
    font-family:inherit;font-size:11px;padding:6px 2px;cursor:pointer;}
  .tab.on{border-color:var(--gold);color:var(--gold);background:#241f10;}
  .item{display:flex;justify-content:space-between;align-items:center;
    padding:6px 8px;border:2px solid #33334d;margin-bottom:5px;cursor:pointer;font-size:12px;}
  .item.eq{border-color:var(--gold);background:#241f10;}
  .item.no{cursor:default;opacity:.6;}
  .item .meta{font-size:10.5px;}
  .item .tag{font-size:10px;}
  .baseBtns{display:flex;gap:8px;justify-content:center;margin-top:2px;}

  #battle{display:none;flex-direction:column;}
  #stage{background:linear-gradient(#26213a,#1a1730 60%,#120f24);padding:10px 8px 6px;
    min-height:130px;display:flex;align-items:flex-end;justify-content:space-between;gap:4px;}
  .enemy{width:44%;display:flex;flex-direction:column;align-items:center;gap:4px;}
  .enemy.hidden{visibility:hidden;}
  .party{width:54%;display:flex;align-items:flex-end;justify-content:center;gap:2px;}
  .cname{font-size:11px;text-align:center;}
  #enemyName{color:var(--ink);}
  #eSprite{width:92px;height:92px;}
  #hSprite{width:80px;height:80px;}
  #fSprite{width:44px;height:44px;}
  #eSprite.metal{filter:grayscale(1) brightness(1.7) contrast(1.1);}
  #fSprite.shiny{filter:sepia(1) saturate(3.5) hue-rotate(2deg) brightness(1.12) drop-shadow(0 0 3px #f0cf4a);}
  .pcol{display:flex;flex-direction:column;align-items:center;gap:3px;}
  .fcol{display:flex;flex-direction:column;align-items:center;gap:2px;}
  .fcol .cname{color:var(--def);font-size:10px;}
  .hpwrap{width:104px;}
  .hpwrap .label{font-size:10px;color:var(--dim);display:flex;justify-content:space-between;}
  .bar{height:8px;background:#000;border:2px solid var(--panel-line);margin-top:2px;}
  .bar>i{display:block;height:100%;background:var(--hp);transition:width .35s;}
  .lungeL{animation:lungeL .3s;} @keyframes lungeL{50%{transform:translateX(-20px);}}
  .lungeR{animation:lungeR .3s;} @keyframes lungeR{50%{transform:translateX(20px);}}
  .hit{animation:shake .28s steps(2);}
  @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}50%{transform:translateX(6px)}75%{transform:translateX(-3px)}}
  .flash{animation:flash .2s;} @keyframes flash{50%{filter:brightness(3) saturate(0);}}

  #status{display:flex;justify-content:space-between;gap:8px;background:var(--panel);
    border-top:4px solid var(--panel-line);padding:6px 10px;font-size:12px;}
  #status .col{display:flex;flex-direction:column;gap:2px;}
  #status .name{color:var(--gold);}
  .stat{display:flex;align-items:center;gap:5px;}
  .stat b{font-weight:normal;color:var(--dim);width:20px;display:inline-block;}
  .minibar{width:56px;} .minibar>i{background:var(--hp);} .minibar.mp>i{background:var(--mp);}

  #window{background:var(--panel);border-top:4px solid var(--panel-line);min-height:70px;
    padding:10px 14px;font-size:14px;position:relative;cursor:pointer;}
  #msg{white-space:pre-wrap;min-height:46px;}
  #cursor{position:absolute;right:11px;bottom:6px;color:var(--gold);
    animation:bob .7s steps(2,start) infinite;font-size:13px;}
  @keyframes bob{to{transform:translateY(3px);opacity:.4;}}

  #commands{display:none;grid-template-columns:1fr 1fr;gap:6px;background:var(--panel);
    border-top:4px solid var(--panel-line);padding:8px;}
  .cmd{background:#0c0c18;border:3px solid var(--panel-line);color:var(--ink);
    font-family:inherit;font-size:14px;padding:9px 6px;cursor:pointer;transition:transform .05s;}
  .cmd:active{transform:scale(.96);background:#15152a;}
  .cmd:disabled{color:#4a4a66;border-color:#33334d;cursor:default;}
  .cmd.choice{border-color:var(--gold);color:var(--gold);}
  .cmd .n{font-size:10px;color:var(--dim);display:block;}
`;

const BODY=`
  <div id="title">
    <h1>ドラゴンを<br>たおせ</h1>
    <div class="sub">〜 ちいさな ゆうしゃの ものがたり 〜</div>
    <div style="display:flex;flex-direction:column;gap:10px;align-items:center;">
      <button class="btn" id="contBtn" style="display:none;">▶ つづきから</button>
      <button class="btn blink" id="newBtn">＋ はじめから</button>
    </div>
    <div class="sub" style="font-size:10px;" id="saveNote">きょてんに もどると じどうで セーブされます。</div>
  </div>

  <div id="base">
    <div style="display:flex;justify-content:center;align-items:center;gap:8px;margin-bottom:6px;">
      <h2 style="margin:0;">⛺ きょてん</h2>
      <button id="sndBtn" class="btn sm" style="padding:4px 9px;font-size:13px;border-color:var(--panel-line);color:var(--ink);">🔊</button>
    </div>
    <div class="card" id="summary"><div class="head" id="sumHead"></div><div id="sumLines"></div></div>
    <div class="card">
      <h3>ゆうしゃの じょうたい</h3>
      <div class="row"><b>レベル</b><span id="bLv">1</span></div>
      <div class="row"><b>つぎのLVまで</b><span id="bExp">0 / 12</span></div>
      <div class="row"><b>HP / MP</b><span id="bHpMp">30 / 8</span></div>
      <div class="row"><b>こうげき / ぼうぎょ</b><span id="bAtkDef">6 / 0</span></div>
      <div class="row"><b>ゴールド</b><span class="gold" id="bGold">0 G</span></div>
      <div class="row"><b>どうぐ</b><span id="bItems">やくそう×3</span></div>
      <div class="row"><b>ぶき / よろい</b><span id="bGear">ひのきのぼう / ぬののふく</span></div>
      <div class="row"><b>ゆびわ / なかま</b><span id="bRF">なし / なし</span></div>
      <div class="row"><b>ドラゴンげきは</b><span id="bClears">0 かい</span></div>
    </div>
    <div class="card">
      <h3>そうび と なかま</h3>
      <div id="tabs">
        <button class="tab on" data-tab="weapon">ぶき</button>
        <button class="tab" data-tab="armor">よろい</button>
        <button class="tab" data-tab="ring">ゆびわ</button>
        <button class="tab" data-tab="familiar">なかま</button>
      </div>
      <div id="equipList"></div>
    </div>
    <div class="baseBtns">
      <button class="btn sm" id="shopBtn">🏪 みせ・かじや</button>
      <button class="btn" id="goBtn">⚔ ぼうけんに でる</button>
    </div>
  </div>

  <div id="shop">
    <h2>🏪 みせ・かじや</h2>
    <div class="card"><div class="row"><b>しょじ ゴールド</b><span class="gold" id="shopGold">0 G</span></div></div>
    <div id="shopBody"></div>
    <button class="btn sm" id="shopBack" style="align-self:center;">← きょてんに もどる</button>
  </div>

  <div id="battle">
    <div id="stage">
      <div class="enemy" id="enemyBox">
        <div class="cname" id="enemyName">スライム</div>
        <canvas id="eSprite" width="24" height="24"></canvas>
        <div class="hpwrap"><div class="label"><span>てきHP</span><span id="ehpText">18/18</span></div>
          <div class="bar"><i id="ehpBar" style="width:100%"></i></div></div>
      </div>
      <div class="party">
        <div class="pcol"><div class="cname" style="color:var(--gold)">ゆうしゃ</div>
          <canvas id="hSprite" width="24" height="24"></canvas></div>
        <div class="fcol" id="famCol" style="display:none"><div class="cname" id="famName">なかま</div>
          <canvas id="fSprite" width="24" height="24"></canvas></div>
      </div>
    </div>
    <div id="status">
      <div class="col"><span class="name">ゆうしゃ</span><span class="stat"><b>LV</b><span id="pLv">1</span></span></div>
      <div class="col">
        <span class="stat"><b>HP</b><span class="bar minibar"><i id="phpBar" style="width:100%"></i></span><span id="phpText">30/30</span></span>
        <span class="stat"><b>MP</b><span class="bar minibar mp"><i id="pmpBar" style="width:100%"></i></span><span id="pmpText">8/8</span></span>
      </div>
    </div>
    <div id="window"><div id="msg"></div><div id="cursor" style="display:none;">▼</div></div>
    <div id="commands"></div>
  </div>
`;

const JS=`
(function(){
  "use strict";
  var PAL={g:'#6fd96f',G:'#2f8f3f',k:'#1a1a26',w:'#f4f4f4',e:'#0c0c14',
    r:'#e0584f',R:'#9a2f28',b:'#4f7fe0',B:'#2a4aa0',y:'#f0cf4a',o:'#f08a2a',
    s:'#e7bd91',d:'#b07a4a',S:'#cfd3e3',c:'#8a90a6',n:'#ece7d2',p:'#b06fd6',P:'#6f3f96'};

  ${SPR_LIT}

  function draw(id,name){
    var cv=document.getElementById(id),ctx=cv.getContext('2d'),s=SPR[name];
    var cols=s[0].length,rows=s.length; cv.width=cols; cv.height=rows;
    ctx.clearRect(0,0,cols,rows);
    for(var y=0;y<rows;y++)for(var x=0;x<cols;x++){
      var ch=s[y][x]; if(ch==='.'||ch===' ')continue;
      ctx.fillStyle=PAL[ch]||'#fff'; ctx.fillRect(x,y,1,1);
    }
  }

  var WEAPONS={stick:{name:'ひのきのぼう',atk:0},copper:{name:'どうのつるぎ',atk:3},
    steel:{name:'はがねのつるぎ',atk:6},flame:{name:'ほのおのつるぎ',atk:10},fang:{name:'りゅうのキバ',atk:15}};
  var ARMORS={cloth:{name:'ぬののふく',def:0},leather:{name:'かわのよろい',def:2},
    chain:{name:'くさりかたびら',def:4},plate:{name:'はがねのよろい',def:7},dragonmail:{name:'りゅうのよろい',def:11}};
  var RINGS={none:{name:'なし',skill:null},flame:{name:'ほのおのゆびわ',skill:'meramie'},
    heal:{name:'いやしのゆびわ',skill:'behoimi'},bolt:{name:'いかずちのゆびわ',skill:'raidein'}};
  var SKILLS={meramie:{label:'メラミ',mp:6},behoimi:{label:'ベホイミ',mp:5},raidein:{label:'ライデイン',mp:9}};
  var FAMILIARS={slime:{name:'スライム',atk:3,rate:12},mushroom:{name:'マッシュ',atk:4,rate:12},
    goblin:{name:'ゴブリン',atk:5,rate:10},wolf:{name:'ウルフ',atk:6,rate:10},
    bat:{name:'おおこうもり',atk:4,rate:10},mage:{name:'まどうし',atk:6,rate:9},
    skeleton:{name:'がいこつ',atk:7,rate:8},golem:{name:'ゴーレム',atk:9,rate:7},dragon:{name:'こりゅう',atk:12,rate:18}};
  var EVO={slime:'キングスライム',mushroom:'キノコルド',goblin:'ホブゴブリン',wolf:'ガルム',
    bat:'ヴァンパイア',mage:'だいまどうし',skeleton:'デュラハン',golem:'アイアンゴーレム',dragon:'キングドラゴン'};
  function famDisplayName(k){return (P.fam&&P.fam[k]&&P.fam[k].evolved)?EVO[k]:FAMILIARS[k].name;}
  function famLevelOf(k){return (P.fam&&P.fam[k]&&P.fam[k].lv)?P.fam[k].lv:1;}
  function famAtkOf(k){var lv=famLevelOf(k),ev=P.fam&&P.fam[k]&&P.fam[k].evolved;return FAMILIARS[k].atk+(lv-1)+(ev?3:0);}

  var soundOn=(function(){try{return localStorage.getItem('rpg_sound')!=='0';}catch(e){return true;}})();
  var actx=null;
  function audio(){if(actx)return actx;try{actx=new (window.AudioContext||window.webkitAudioContext)();}catch(e){actx=null;}return actx;}
  function beep(freq,dur,type,when,vol){var c=audio();if(!c)return;var t=c.currentTime+(when||0);
    var o=c.createOscillator(),gn=c.createGain();o.type=type||'square';o.frequency.value=freq;
    gn.gain.setValueAtTime(0.0001,t);gn.gain.exponentialRampToValueAtTime(vol||0.16,t+0.01);
    gn.gain.exponentialRampToValueAtTime(0.0001,t+dur);o.connect(gn);gn.connect(c.destination);o.start(t);o.stop(t+dur+0.03);}
  function sfx(name){if(!soundOn)return;var c=audio();if(!c)return;if(c.state==='suspended'){try{c.resume();}catch(e){}}
    if(name==='select')beep(680,0.05,'square');
    else if(name==='hit')beep(180,0.08,'square',0,0.18);
    else if(name==='crit'){beep(900,0.06,'square');beep(1350,0.1,'square',0.06);}
    else if(name==='magic'){beep(300,0.05,'sawtooth');beep(540,0.06,'sawtooth',0.05);beep(780,0.08,'sawtooth',0.1);}
    else if(name==='heal'){beep(523,0.07,'sine');beep(784,0.1,'sine',0.07);}
    else if(name==='enemy')beep(150,0.1,'sawtooth',0,0.16);
    else if(name==='level'){[523,659,784,1046].forEach(function(f,i){beep(f,0.1,'square',i*0.09);});}
    else if(name==='win'){[523,659,784,1046,1318].forEach(function(f,i){beep(f,0.12,'square',i*0.1);});}
    else if(name==='lose'){beep(330,0.18,'triangle');beep(196,0.32,'triangle',0.16);}
    else if(name==='evolve'){[659,880,1318,1760].forEach(function(f,i){beep(f,0.12,'sine',i*0.08);});}
    else if(name==='coin'){beep(988,0.06,'square');beep(1319,0.1,'square',0.06);}
    else if(name==='flee'){beep(720,0.05,'square');beep(500,0.07,'square',0.05);}
  }

  var ENEMIES=[
    {key:'slime',name:'スライム',hp:18,atk:5,def:0,exp:5,gold:6,fl:'ぷるぷる ふるえている。',
      drops:[{t:'weapon',k:'copper',r:12},{t:'ring',k:'heal',r:3}]},
    {key:'mushroom',name:'マッシュ',hp:22,atk:6,def:0,exp:7,gold:8,fl:'ほうしを まきちらす。',
      drops:[{t:'weapon',k:'copper',r:14}]},
    {key:'goblin',name:'ゴブリン',hp:28,atk:8,def:1,exp:8,gold:11,fl:'こんぼうを ふりまわす。',
      drops:[{t:'weapon',k:'copper',r:30},{t:'armor',k:'leather',r:25}]},
    {key:'wolf',name:'ウルフ',hp:32,atk:9,def:1,exp:12,gold:14,fl:'きばを むきだしている。',
      drops:[{t:'weapon',k:'steel',r:10},{t:'armor',k:'leather',r:18}]},
    {key:'bat',name:'おおこうもり',hp:26,atk:8,def:0,exp:12,gold:14,fl:'すばやく とびまわる。',
      drops:[{t:'weapon',k:'steel',r:8},{t:'ring',k:'bolt',r:4}]},
    {key:'mage',name:'まどうし',hp:34,atk:9,def:1,exp:16,gold:20,caster:true,fl:'つえに まりょくを ためている…',
      drops:[{t:'ring',k:'bolt',r:10},{t:'ring',k:'flame',r:8}]},
    {key:'skeleton',name:'がいこつけんし',hp:46,atk:11,def:2,exp:18,gold:24,fl:'カタカタと わらっている。',
      drops:[{t:'armor',k:'chain',r:30},{t:'weapon',k:'steel',r:25},{t:'armor',k:'plate',r:8}]},
    {key:'golem',name:'ゴーレム',hp:64,atk:13,def:5,exp:26,gold:34,fl:'いわの からだが きしむ。',
      drops:[{t:'armor',k:'plate',r:30},{t:'armor',k:'chain',r:25},{t:'armor',k:'dragonmail',r:6}]},
    {key:'dragon',name:'ドラゴン',hp:95,atk:16,def:3,exp:44,gold:85,fl:'ぜんしんから ほのおが もれている…！',boss:true,
      drops:[{t:'weapon',k:'flame',r:100},{t:'weapon',k:'fang',r:25},{t:'armor',k:'dragonmail',r:40},{t:'ring',k:'flame',r:30},{t:'ring',k:'bolt',r:15}]}
  ];
  var INV={weapon:{store:'weapons',table:WEAPONS,stat:'atk',enh:'weapon'},
           armor:{store:'armors',table:ARMORS,stat:'def',enh:'armor'},
           ring:{store:'rings',table:RINGS}};

  var P={};
  function maxHpFor(lv){return 30+(lv-1)*8;}
  function maxMpFor(lv){return 8+(lv-1)*3;}
  function atkFor(lv){return 6+(lv-1)*2;}
  function expNeed(lv){return lv*12;}
  function wPlus(){return P.enh.weapon[P.equipped]||0;}
  function aPlus(){return P.enh.armor[P.armor]||0;}
  function totalAtk(){return atkFor(P.lv)+WEAPONS[P.equipped].atk+wPlus();}
  function totalDef(){return ARMORS[P.armor].def+aPlus();}
  function wName(k){var p=P.enh.weapon[k]||0;return WEAPONS[k].name+(p>0?'+'+p:'');}
  function aName(k){var p=P.enh.armor[k]||0;return ARMORS[k].name+(p>0?'+'+p:'');}
  function resetPlayer(){P={lv:1,exp:0,clears:0,gold:0,herb:3,ether:0,
    weapons:['stick'],equipped:'stick',armors:['cloth'],armor:'cloth',
    rings:['none'],ring:'none',familiars:[],familiar:'none',
    enh:{weapon:{},armor:{}},fam:{},hp:30,mp:8};}

  var SAVE_KEY='rpg_save_v1';
  function storageOK(){try{var k='__rpgtest';localStorage.setItem(k,'1');localStorage.removeItem(k);return true;}catch(e){return false;}}
  var HAS_STORAGE=storageOK();
  function saveGame(){if(!HAS_STORAGE)return;try{localStorage.setItem(SAVE_KEY,JSON.stringify(P));}catch(e){}}
  function normalize(d){
    d.lv=d.lv||1;d.exp=d.exp||0;d.clears=d.clears||0;d.gold=d.gold||0;
    d.herb=(d.herb==null?3:d.herb);d.ether=d.ether||0;
    d.weapons=d.weapons||['stick'];d.equipped=d.equipped||'stick';
    d.armors=d.armors||['cloth'];d.armor=d.armor||'cloth';
    d.rings=d.rings||['none'];d.ring=d.ring||'none';
    d.familiars=d.familiars||[];d.familiar=d.familiar||'none';
    d.enh=d.enh||{};d.enh.weapon=d.enh.weapon||{};d.enh.armor=d.enh.armor||{};
    d.fam=d.fam||{};(d.familiars||[]).forEach(function(k){if(!d.fam[k])d.fam[k]={xp:0,lv:1,evolved:false};});
    d.hp=maxHpFor(d.lv);d.mp=maxMpFor(d.lv);return d;
  }
  function loadGame(){
    if(!HAS_STORAGE)return false;
    try{var s=localStorage.getItem(SAVE_KEY);if(!s)return false;P=normalize(JSON.parse(s));return true;}catch(e){return false;}
  }

  var stage=0,enemy=null,guarding=false,busy=false,dragonTurn=0,runExp=0,runGold=0,runDrops=[],runRec=[];
  function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
  function rnd(n){return Math.floor(Math.random()*n);}

  var elTitle=document.getElementById('title'),elBase=document.getElementById('base'),
      elBattle=document.getElementById('battle'),elShop=document.getElementById('shop');
  function show(w){elTitle.style.display=w==='title'?'flex':'none';
    elBase.style.display=w==='base'?'flex':'none';elBattle.style.display=w==='battle'?'flex':'none';
    elShop.style.display=w==='shop'?'flex':'none';}

  var win=document.getElementById('window'),msgEl=document.getElementById('msg'),
      cursor=document.getElementById('cursor'),cmdBox=document.getElementById('commands');
  var queue=[],afterQueue=null;
  function say(lines,after){queue=[].concat(lines);afterQueue=after||null;cmdBox.style.display='none';step();}
  function step(){if(queue.length===0){cursor.style.display='none';var cb=afterQueue;afterQueue=null;if(cb)cb();return;}
    msgEl.textContent=queue.shift();cursor.style.display='block';}
  win.addEventListener('click',function(){if(queue.length>0){step();}
    else if(afterQueue){var cb=afterQueue;afterQueue=null;cursor.style.display='none';cb();}});

  function refresh(){
    document.getElementById('pLv').textContent=P.lv;
    var mh=maxHpFor(P.lv),mm=maxMpFor(P.lv);
    document.getElementById('phpText').textContent=clamp(P.hp,0,mh)+'/'+mh;
    document.getElementById('pmpText').textContent=P.mp+'/'+mm;
    document.getElementById('phpBar').style.width=(clamp(P.hp,0,mh)/mh*100)+'%';
    document.getElementById('pmpBar').style.width=(P.mp/mm*100)+'%';
    if(enemy){document.getElementById('ehpText').textContent=clamp(enemy.hp,0,enemy.max)+'/'+enemy.max;
      document.getElementById('ehpBar').style.width=(clamp(enemy.hp,0,enemy.max)/enemy.max*100)+'%';}
  }
  function fx(id,cls){var cv=document.getElementById(id);cv.classList.remove(cls);void cv.offsetWidth;cv.classList.add(cls);}
  function stageShake(){var st=document.getElementById('stage');st.classList.remove('hit');void st.offsetWidth;st.classList.add('hit');}
  function enemyBox(vis){document.getElementById('enemyBox').classList.toggle('hidden',!vis);}

  function startBattle(){
    enemyBox(true);
    var d=ENEMIES[stage];
    enemy={key:d.key,sprite:d.key,name:d.name,hp:d.hp,max:d.hp,atk:d.atk,def:d.def,exp:d.exp,gold:d.gold,boss:!!d.boss,caster:!!d.caster,metal:false,drops:d.drops};
    if(!d.boss&&Math.random()<0.07){enemy.key='metal';enemy.name='はぐれメタル';enemy.metal=true;
      enemy.hp=12;enemy.max=12;enemy.def=40;enemy.atk=Math.max(2,Math.floor(d.atk/2));
      enemy.exp=d.exp*8;enemy.gold=d.gold*5;enemy.drops=[];enemy.caster=false;}
    dragonTurn=0; document.getElementById('enemyName').textContent=enemy.name;
    var ec=document.getElementById('eSprite');draw('eSprite',enemy.sprite);ec.classList.toggle('metal',enemy.metal);
    draw('hSprite','hero');
    var fc=document.getElementById('famCol'),fsp=document.getElementById('fSprite');
    if(P.familiar!=='none'){fc.style.display='flex';draw('fSprite',P.familiar);
      fsp.classList.toggle('shiny',!!(P.fam[P.familiar]&&P.fam[P.familiar].evolved));
      document.getElementById('famName').textContent=famDisplayName(P.familiar)+' Lv'+famLevelOf(P.familiar);}
    else fc.style.display='none';
    refresh();
    var intro=enemy.metal?['はぐれメタルが あらわれた！','すばやくて すぐ にげそうだ…']
      :(d.boss?['ついに さいごの たたかい！',d.name+'が たちはだかった！',d.fl]:[d.name+'が あらわれた！',d.fl]);
    if(enemy.metal)sfx('coin');
    say(intro,showCommands);
  }

  function showCommands(){
    busy=false;guarding=false;msgEl.textContent='コマンドを えらんでね。';cursor.style.display='none';
    cmdBox.innerHTML='';
    var list=[{a:'attack',label:'たたかう'},{a:'magic',label:'メラ',n:'MP4',dis:P.mp<4},
              {a:'herb',label:'やくそう',n:'×'+P.herb,dis:P.herb<=0}];
    if(P.ether>0)list.push({a:'ether',label:'まほうのみず',n:'×'+P.ether});
    list.push({a:'guard',label:'ぼうぎょ'});
    if(P.ring!=='none'&&RINGS[P.ring].skill){var sk=SKILLS[RINGS[P.ring].skill];
      list.push({a:'skill',label:sk.label,n:'MP'+sk.mp,dis:P.mp<sk.mp});}
    list.forEach(function(it){
      var b=document.createElement('button');b.className='cmd';
      b.innerHTML=it.label+(it.n?'<span class="n">'+it.n+'</span>':'');
      if(it.dis)b.disabled=true;
      b.addEventListener('click',function(){if(busy||b.disabled)return;sfx('select');busy=true;cmdBox.style.display='none';doAction(it.a);});
      cmdBox.appendChild(b);
    });
    cmdBox.style.display='grid';refresh();
  }

  function doAction(a){
    if(a==='attack')pAttack();else if(a==='magic')pMagic();else if(a==='herb')pHerb();
    else if(a==='ether')pEther();else if(a==='guard')pGuard();
    else if(a==='skill')doSkill(RINGS[P.ring].skill);
  }
  function pAttack(){var crit=Math.random()<0.12;var base=totalAtk()+rnd(4)-enemy.def;if(base<1)base=1;
    var dmg=crit?Math.floor(base*1.8):base;enemy.hp-=dmg;
    fx('hSprite','lungeL');setTimeout(function(){fx('eSprite',crit?'flash':'hit');},150);sfx(crit?'crit':'hit');
    var l=crit?['かいしんの いちげき！',enemy.name+'に '+dmg+'の だいダメージ！']:['ゆうしゃの こうげき！',enemy.name+'に '+dmg+'の ダメージ！'];
    say(l,afterP);}
  function pMagic(){P.mp-=4;var dmg=12+rnd(7);enemy.hp-=dmg;fx('eSprite','flash');sfx('magic');refresh();
    say(['ゆうしゃは メラを となえた！',enemy.name+'に '+dmg+'の ダメージ！'],afterP);}
  function pHerb(){P.herb--;var mh=maxHpFor(P.lv),before=clamp(P.hp,0,mh);P.hp=clamp(before+20+rnd(6),0,mh);sfx('heal');refresh();
    say(['ゆうしゃは やくそうを つかった！','HPが '+(P.hp-before)+' かいふくした！'],afterP);}
  function pEther(){P.ether--;var mm=maxMpFor(P.lv),before=P.mp;P.mp=clamp(P.mp+12+rnd(6),0,mm);sfx('heal');refresh();
    say(['ゆうしゃは まほうのみずを のんだ！','MPが '+(P.mp-before)+' かいふくした！'],afterP);}
  function pGuard(){guarding=true;say(['ゆうしゃは みを まもっている。'],afterP);}
  function doSkill(key){
    if(key==='meramie'){sfx('magic');P.mp-=6;var d=20+rnd(8);enemy.hp-=d;fx('eSprite','flash');refresh();
      say(['ゆうしゃは メラミ！',enemy.name+'に '+d+'の ダメージ！'],afterP);}
    else if(key==='behoimi'){sfx('heal');P.mp-=5;var mh=maxHpFor(P.lv),b=clamp(P.hp,0,mh);P.hp=clamp(b+38+rnd(8),0,mh);refresh();
      say(['ゆうしゃは ベホイミ！','HPが '+(P.hp-b)+' かいふくした！'],afterP);}
    else if(key==='raidein'){sfx('magic');P.mp-=9;var dd=30+rnd(10);enemy.hp-=dd;fx('eSprite','flash');refresh();
      say(['ゆうしゃは ライデイン！',enemy.name+'に '+dd+'の ダメージ！'],afterP);}
  }

  function afterP(){refresh();if(enemy.hp<=0){victory();return;}familiarStep();}
  function familiarStep(){
    if(P.familiar==='none'){enemyTurn();return;}
    var crit=Math.random()<0.08;var base=famAtkOf(P.familiar)+rnd(3)-enemy.def;if(base<1)base=1;
    var dmg=crit?Math.floor(base*1.8):base;enemy.hp-=dmg;
    fx('fSprite','lungeL');setTimeout(function(){fx('eSprite',crit?'flash':'hit');},120);sfx(crit?'crit':'hit');
    var nm=famDisplayName(P.familiar);
    say([(crit?'かいしんの ':'')+nm+'の えんご こうげき！',enemy.name+'に '+dmg+'の ダメージ！'],function(){
      refresh();if(enemy.hp<=0){victory();return;}enemyTurn();});
  }
  function enemyTurn(){
    if(enemy.metal&&Math.random()<0.40){sfx('flee');say([enemy.name+'は すばやく にげだした！','けいけんちは もらえなかった…'],afterVictory);return;}
    var lines=[],dmg,kind='atk';
    if(enemy.boss){dragonTurn++;if(dragonTurn%3===0||rnd(100)<25)kind='fire';}
    else if(enemy.caster&&rnd(100)<35)kind='cast';
    if(kind==='fire'){dmg=Math.floor((enemy.atk+rnd(5))*1.6);lines.push(enemy.name+'は ほのおを はいた！');}
    else if(kind==='cast'){dmg=Math.floor((enemy.atk+rnd(4))*1.4);lines.push(enemy.name+'は じゅもんを となえた！');}
    else{dmg=enemy.atk+rnd(4);lines.push(enemy.name+'の こうげき！');}
    var def=totalDef();if(kind==='cast')def=Math.floor(def/2);
    dmg-=def;if(guarding)dmg=Math.floor(dmg/2);if(dmg<1)dmg=1;P.hp-=dmg;
    sfx('enemy');fx('eSprite','lungeR');setTimeout(stageShake,150);
    lines.push('ゆうしゃは '+dmg+'の ダメージ！'+(guarding?'（ぼうぎょ）':''));
    say(lines,function(){refresh();if(P.hp<=0){P.hp=0;refresh();returnToBase('lose');return;}showCommands();});
  }

  function rollDrops(e){var out=[];if(!e.drops)return out;
    for(var i=0;i<e.drops.length;i++){if(Math.random()*100<e.drops[i].r)out.push({t:e.drops[i].t,k:e.drops[i].k});}return out;}

  function victory(){
    var cv=document.getElementById('eSprite');cv.style.transition='opacity .5s';cv.style.opacity='0';
    setTimeout(function(){cv.style.opacity='1';cv.style.transition='';},700);
    runExp+=enemy.exp;var g=enemy.gold+rnd(Math.max(1,Math.floor(enemy.gold/3)));runGold+=g;
    var drops=rollDrops(enemy);for(var i=0;i<drops.length;i++)runDrops.push(drops[i]);
    var rec=FAMILIARS[enemy.key]&&Math.random()*100<FAMILIARS[enemy.key].rate;if(rec)runRec.push(enemy.key);
    var lines;
    if(enemy.metal)lines=['はぐれメタルを たおした！','けいけんち +'+enemy.exp+' / '+g+'ゴールド！','すごい！ おおあたり！'];
    else if(enemy.boss)lines=['ドラゴンに とどめの いちげき！','ドラゴンは ほのおを のこして きえた…',g+'ゴールドを てにいれた！'];
    else lines=[enemy.name+'を たおした！','けいけんち +'+enemy.exp+' / '+g+'ゴールド！'];
    drops.forEach(function(dr){var nm=(dr.t==='weapon')?WEAPONS[dr.k].name:(dr.t==='armor')?ARMORS[dr.k].name:RINGS[dr.k].name;
      lines.push(enemy.name+'は '+nm+'を おとした！');});
    if(rec)lines.push('なんと '+enemy.name+'が なついてきた…！');
    var evolved=false;
    if(P.familiar!=='none'){var fk=P.familiar;var fo=P.fam[fk]||(P.fam[fk]={xp:0,lv:1,evolved:false});
      fo.xp++;var nl=Math.min(10,1+Math.floor(fo.xp/3));
      if(nl>fo.lv){fo.lv=nl;lines.push(famDisplayName(fk)+'は つよくなった！（Lv'+fo.lv+'）');}
      if(!fo.evolved&&fo.lv>=5){fo.evolved=true;evolved=true;lines.push(FAMILIARS[fk].name+'は '+EVO[fk]+'に しんかした！');}}
    sfx((enemy.metal||enemy.boss)?'win':'coin');if(evolved)sfx('evolve');
    say(lines,enemy.boss?function(){returnToBase('clear');}:afterVictory);
  }

  function afterVictory(){
    stage++;if(stage>=ENEMIES.length){returnToBase('clear');return;}
    var goNext=function(){
      if(ENEMIES[stage].boss)say(['…どうくつの おくから','すさまじい きはいが ちかづく。'],startBattle);
      else say(['さきへ すすもう。'],startBattle);};
    if(!ENEMIES[stage].boss&&Math.random()<0.5)runEvent(goNext);else goNext();
  }

  // ---------- どうちゅうイベント ----------
  function choices(opts){
    cmdBox.innerHTML='';cursor.style.display='none';
    opts.forEach(function(o){var b=document.createElement('button');b.className='cmd choice';b.textContent=o.label;
      b.addEventListener('click',function(){sfx('select');cmdBox.style.display='none';o.cb();});cmdBox.appendChild(b);});
    cmdBox.style.display='grid';msgEl.textContent='どうする？';
  }
  function hurtSafe(d){P.hp=Math.max(1,clamp(P.hp,0,maxHpFor(P.lv))-d);refresh();}
  function healSafe(h){var mh=maxHpFor(P.lv);P.hp=clamp(clamp(P.hp,0,mh)+h,0,mh);refresh();}

  function runEvent(done){
    enemyBox(false);
    var evs=[evChest,evTrap,evFork,evOldman];
    evs[rnd(evs.length)](done);
  }
  function evChest(done){
    say(['ほこらに たからばこが ある。'],function(){
      choices([
        {label:'あける',cb:function(){
          if(rnd(100)<72){var g=12+rnd(20);runGold+=g;say(['なかには おかねが！',g+'ゴールドを てにいれた！'],done);}
          else{var d=6+rnd(8);hurtSafe(d);say(['しまった ワナだ！','ゆうしゃは '+d+'の ダメージ！'],done);}}},
        {label:'そのまま すすむ',cb:function(){say(['きを つけて とおりすぎた。'],done);}}
      ]);});
  }
  function evTrap(done){
    say(['ゆかが あやしく ひかっている…'],function(){
      choices([
        {label:'とびこえる',cb:function(){
          if(rnd(100)<60)say(['みごとに かわした！'],done);
          else{var d=8+rnd(8);hurtSafe(d);say(['ふみぬいた！','ゆうしゃは '+d+'の ダメージ！'],done);}}},
        {label:'しらべる',cb:function(){
          if(rnd(100)<55){var g=8+rnd(12);runGold+=g;say(['ワナを かいじょした。','なかから '+g+'ゴールド！'],done);}
          else{var d=5+rnd(6);hurtSafe(d);say(['さわったら はじけた！','ゆうしゃは '+d+'の ダメージ！'],done);}}}
      ]);});
  }
  function evFork(done){
    say(['みちが ふたつに わかれている。'],function(){
      choices([
        {label:'あかるい みち',cb:function(){var h=10+rnd(10);healSafe(h);say(['ひだまりで ひとやすみ。','HPが '+h+' かいふく！'],done);}},
        {label:'くらい みち',cb:function(){
          if(rnd(100)<55){var g=15+rnd(20);runGold+=g;say(['たからを みつけた！',g+'ゴールドを てにいれた！'],done);}
          else{var d=9+rnd(9);hurtSafe(d);say(['まものに かまれた！','ゆうしゃは '+d+'の ダメージ！'],done);}}}
      ]);});
  }
  function evOldman(done){
    say(['あやしい ろうじんが こえを かけてきた。'],function(){
      choices([
        {label:'はなしを きく',cb:function(){var r=rnd(100);
          if(r<45){P.herb++;say(['「これを もって いきなされ」','やくそうを 1つ もらった！'],done);}
          else if(r<80){var mh=maxHpFor(P.lv);P.hp=mh;P.mp=maxMpFor(P.lv);refresh();say(['ろうじんの まほうで','HPとMPが ぜんかいした！'],done);}
          else say(['「…なんでも ないわい」','ろうじんは きえた。'],done);}},
        {label:'むしする',cb:function(){say(['ゆうじんを よこめに とおりすぎた。'],done);}}
      ]);});
  }

  // ---------- きょてん ----------
  function returnToBase(reason){
    var beforeLv=P.lv;P.exp+=runExp;var ups=0;
    while(P.exp>=expNeed(P.lv)){P.exp-=expNeed(P.lv);P.lv++;ups++;}
    if(ups>0)sfx('level');
    P.gold+=runGold;
    var newItems=[];
    runDrops.forEach(function(dr){
      if(dr.t==='ring'){
        if(P.rings.indexOf(dr.k)===-1){P.rings.push(dr.k);var req=false;if(P.ring==='none'){P.ring=dr.k;req=true;}
          newItems.push({name:RINGS[dr.k].name,eqd:req});}
        return;
      }
      var cfg=INV[dr.t],store=P[cfg.store],tbl=cfg.table;
      if(store.indexOf(dr.k)===-1){store.push(dr.k);var eqd=false;
        if(dr.t==='weapon'){if(tbl[dr.k].atk>tbl[P.equipped].atk+wPlus()){P.equipped=dr.k;eqd=true;}}
        else{if(tbl[dr.k].def>tbl[P.armor].def+aPlus()){P.armor=dr.k;eqd=true;}}
        newItems.push({name:tbl[dr.k].name,eqd:eqd});
      }else{
        var lvl=(P.enh[dr.t][dr.k]||0)+1;P.enh[dr.t][dr.k]=lvl;
        newItems.push({name:tbl[dr.k].name+'+'+lvl,up:true});
      }
    });
    var newFam=[];
    runRec.forEach(function(k){if(P.familiars.indexOf(k)===-1){P.familiars.push(k);
      if(!P.fam[k])P.fam[k]={xp:0,lv:1,evolved:false};
      var act=false;if(P.familiar==='none'){P.familiar=k;act=true;}newFam.push({name:FAMILIARS[k].name,act:act});}});
    if(reason==='clear')P.clears++;

    var sum=document.getElementById('summary');sum.style.display='block';
    sum.className=(reason==='clear')?'card win':'card lose';
    document.getElementById('sumHead').textContent=(reason==='clear')?('ドラゴンを たおした！（クリア '+P.clears+'かいめ）'):'ゆうしゃは たおれた…';
    var L=[];L.push('けいけんち +'+runExp+' ／ '+runGold+'ゴールド');
    if(ups>0)L.push('レベルが LV'+beforeLv+' → LV'+P.lv+' に あがった！');else L.push('つぎのLVまで のこり '+(expNeed(P.lv)-P.exp));
    newItems.forEach(function(it){if(it.up)L.push('もちものの 「'+it.name+'」に きょうか された！');
      else L.push('「'+it.name+'」を てにいれた！'+(it.eqd?'（そうび）':''));});
    newFam.forEach(function(f){L.push('「'+f.name+'」が なかまに なった！'+(f.act?'（さんか）':''));});
    var box=document.getElementById('sumLines');box.innerHTML='';
    L.forEach(function(t){var dv=document.createElement('div');dv.className='line';dv.textContent='・'+t;box.appendChild(dv);});

    P.hp=maxHpFor(P.lv);P.mp=maxMpFor(P.lv);busy=false;
    if(reason==='lose')sfx('lose');
    renderBase();show('base');try{window.scrollTo(0,0);}catch(e){}
  }

  var curTab='weapon';
  function renderBase(){
    document.getElementById('bLv').textContent=P.lv;
    document.getElementById('bExp').textContent=P.exp+' / '+expNeed(P.lv);
    document.getElementById('bHpMp').textContent=maxHpFor(P.lv)+' / '+maxMpFor(P.lv);
    document.getElementById('bAtkDef').textContent=totalAtk()+' / '+totalDef();
    document.getElementById('bGold').textContent=P.gold+' G';
    document.getElementById('bItems').textContent='やくそう×'+P.herb+'  まほうのみず×'+P.ether;
    document.getElementById('bGear').textContent=wName(P.equipped)+' / '+aName(P.armor);
    document.getElementById('bRF').textContent=(P.ring==='none'?'なし':RINGS[P.ring].name)+' / '+(P.familiar==='none'?'なし':famDisplayName(P.familiar)+' Lv'+famLevelOf(P.familiar));
    document.getElementById('bClears').textContent=P.clears+' かい';
    renderEquip();
    saveGame();
  }
  function renderEquip(){
    var list=document.getElementById('equipList');list.innerHTML='';
    function addItem(label,meta,on,onClick,noClick){var d=document.createElement('div');
      d.className='item'+(on?' eq':'')+(noClick?' no':'');
      d.innerHTML='<span>'+label+(meta?' <span class="meta" style="color:var(--mp)">'+meta+'</span>':'')+'</span>'+
        (noClick?'':'<span class="tag" style="color:'+(on?'var(--gold)':'var(--dim)')+'">'+(on?'そうび中':'タップ')+'</span>');
      if(!noClick)d.addEventListener('click',onClick);list.appendChild(d);}
    if(curTab==='weapon'){['stick','copper','steel','flame','fang'].forEach(function(k){
      if(P.weapons.indexOf(k)===-1)return;addItem(wName(k),'こう+'+(WEAPONS[k].atk+(P.enh.weapon[k]||0)),P.equipped===k,function(){P.equipped=k;renderBase();});});}
    else if(curTab==='armor'){['cloth','leather','chain','plate','dragonmail'].forEach(function(k){
      if(P.armors.indexOf(k)===-1)return;addItem(aName(k),'ぼう+'+(ARMORS[k].def+(P.enh.armor[k]||0)),P.armor===k,function(){P.armor=k;renderBase();});});}
    else if(curTab==='ring'){addItem('（はずす）','',P.ring==='none',function(){P.ring='none';renderBase();});
      ['flame','heal','bolt'].forEach(function(k){if(P.rings.indexOf(k)===-1)return;
        addItem(RINGS[k].name,SKILLS[RINGS[k].skill].label,P.ring===k,function(){P.ring=k;renderBase();});});}
    else if(curTab==='familiar'){addItem('（つれて いかない）','',P.familiar==='none',function(){P.familiar='none';renderBase();});
      P.familiars.forEach(function(k){addItem(famDisplayName(k)+' Lv'+famLevelOf(k),'こう+'+famAtkOf(k),P.familiar===k,function(){P.familiar=k;renderBase();});});
      if(P.familiars.length===0)addItem('まだ なかまが いない','',false,null,true);}
  }
  document.querySelectorAll('.tab').forEach(function(t){t.addEventListener('click',function(){
    curTab=t.dataset.tab;document.querySelectorAll('.tab').forEach(function(x){x.classList.toggle('on',x===t);});renderEquip();});});

  // ---------- みせ・かじや ----------
  function enhCost(curPlus){return (curPlus+1)*20;}
  function renderShop(){
    document.getElementById('shopGold').textContent=P.gold+' G';
    var body=document.getElementById('shopBody');body.innerHTML='';
    function card(title){var c=document.createElement('div');c.className='card';
      var h=document.createElement('h3');h.textContent=title;c.appendChild(h);body.appendChild(c);return c;}
    function buyRow(c,label,meta,cost,can,onClick){var d=document.createElement('div');
      d.className='item'+(can?'':' no');
      d.innerHTML='<span>'+label+(meta?' <span class="meta" style="color:var(--mp)">'+meta+'</span>':'')+'</span>'+
        '<span class="tag gold">'+cost+'G</span>';
      if(can)d.addEventListener('click',onClick);c.appendChild(d);}
    var shopC=card('どうぐや');
    buyRow(shopC,'やくそう','HP かいふく',8,P.gold>=8,function(){P.gold-=8;P.herb++;renderShop();});
    buyRow(shopC,'まほうのみず','MP かいふく',12,P.gold>=12,function(){P.gold-=12;P.ether++;renderShop();});
    var smith=card('かじや（＋1 きょうか）');
    var wc=enhCost(wPlus());var canW=P.gold>=wc&&P.equipped!=='stick';
    buyRow(smith,'ぶき：'+wName(P.equipped),'こう+1',wc,canW,function(){P.gold-=wc;P.enh.weapon[P.equipped]=(P.enh.weapon[P.equipped]||0)+1;renderShop();});
    var ac=enhCost(aPlus());var canA=P.gold>=ac&&P.armor!=='cloth';
    buyRow(smith,'よろい：'+aName(P.armor),'ぼう+1',ac,canA,function(){P.gold-=ac;P.enh.armor[P.armor]=(P.enh.armor[P.armor]||0)+1;renderShop();});
    if(P.equipped==='stick'||P.armor==='cloth'){var note=document.createElement('div');note.className='row';
      note.style.marginTop='2px';note.innerHTML='<b style="font-size:10px;color:var(--dim)">※ きほん そうびは きょうか できない</b>';smith.appendChild(note);}
    saveGame();
  }

  function startRun(){document.getElementById('summary').style.display='none';
    P.hp=maxHpFor(P.lv);P.mp=maxMpFor(P.lv);stage=0;runExp=0;runGold=0;runDrops=[];runRec=[];busy=false;
    show('battle');startBattle();try{window.scrollTo(0,0);}catch(e){}}
  function begin(){resetPlayer();document.getElementById('summary').style.display='none';curTab='weapon';
    document.querySelectorAll('.tab').forEach(function(x){x.classList.toggle('on',x.dataset.tab==='weapon');});
    renderBase();show('base');}
  var hasSave=false,newArmed=false;
  var contBtn=document.getElementById('contBtn'),newBtn=document.getElementById('newBtn');
  newBtn.addEventListener('click',function(){
    if(hasSave&&!newArmed){newArmed=true;newBtn.textContent='きえます！ もういちど タップ';
      setTimeout(function(){newArmed=false;newBtn.textContent='＋ はじめから';},2500);return;}
    begin();
  });
  contBtn.addEventListener('click',function(){renderBase();show('base');try{window.scrollTo(0,0);}catch(e){}});
  document.getElementById('goBtn').addEventListener('click',startRun);
  document.getElementById('shopBtn').addEventListener('click',function(){renderShop();show('shop');try{window.scrollTo(0,0);}catch(e){}});
  document.getElementById('shopBack').addEventListener('click',function(){renderBase();show('base');try{window.scrollTo(0,0);}catch(e){}});

  var sndBtn=document.getElementById('sndBtn');
  function updSnd(){sndBtn.textContent=soundOn?'🔊':'🔇';}
  updSnd();
  sndBtn.addEventListener('click',function(){soundOn=!soundOn;try{localStorage.setItem('rpg_sound',soundOn?'1':'0');}catch(e){}updSnd();if(soundOn)sfx('select');});

  if(!HAS_STORAGE)document.getElementById('saveNote').textContent='※ ここでは セーブできません（ダウンロードして ひらくと セーブされます）。';
  hasSave=loadGame();
  if(hasSave)contBtn.style.display='block';
})();
`;

const HTML='<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n'+
'<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\n'+
'<title>ドラゴンをたおせ</title>\n'+
'<link rel="preconnect" href="https://fonts.googleapis.com">\n'+
'<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'+
'<link href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap" rel="stylesheet">\n'+
'<style>'+CSS+'</style>\n</head>\n<body>\n<div id="game">\n'+BODY+'\n</div>\n<script>'+JS+'</scr'+'ipt>\n</body>\n</html>';

fs.writeFileSync('/home/claude/rpg.html',HTML);
console.log('html written, bytes=',HTML.length);
