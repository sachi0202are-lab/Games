// 24x24 スプライト（かくとうゲーム版）座標指定で生成、左右対称はミラー
const N=24;
function mk(){return Array.from({length:N},()=>Array(N).fill('.'));}
function S(g,x,y,c){if(x>=0&&x<N&&y>=0&&y<N)g[y][x]=c;}
function row(g,y,x0,x1,c){for(let x=x0;x<=x1;x++)S(g,x,y,c);}
function rect(g,x0,y0,x1,y1,c){for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++)S(g,x,y,c);}
function mirror(g){for(let y=0;y<N;y++)for(let x=0;x<12;x++){if(g[y][x]!=='.')g[y][N-1-x]=g[y][x];}}
function rows(g){return g.map(r=>r.join(''));}

const SPR={};

// ---------- きほんの かくとうか（ファイティングポーズ） ----------
// 左半分を かき、ミラーして 顔を のせる
function fighter(o){
  const g=mk();
  const sk=o.sk||'s';                 // はだ
  const hair=o.hair;                  // かみ（null=ぼうず）
  const band=o.band;                  // ハチマキ
  const top=o.top;                    // うわぎ（null=はだか）
  const trunk=o.trunk||'b';           // トランクス
  const glove=o.glove||'r';           // グローブ（はだいろなら すで）
  const belt=o.belt||'k';             // ベルト
  const shoe=o.shoe||'k';             // くつ
  const tc=top||sk;
  // かみ
  if(hair){row(g,3,9,11,hair);row(g,4,8,11,hair);S(g,8,5,hair);}
  // あたま（はだ）
  for(let y=5;y<=10;y++)row(g,y,8,11,sk);
  // ハチマキ
  if(band){row(g,4,8,11,band);S(g,8,5,band);}
  // くび
  row(g,11,9,11,sk);
  // どう
  for(let y=12;y<=15;y++)row(g,y,6,11,tc);
  // ベルト
  row(g,16,6,11,belt);
  // トランクス
  for(let y=17;y<=19;y++)row(g,y,6,11,trunk);
  // あし
  for(let y=20;y<=22;y++)row(g,y,7,9,sk);
  row(g,23,7,9,shoe);
  // うで＋かまえた こぶし
  rect(g,5,12,6,14,tc);
  S(g,5,11,sk);S(g,6,11,sk);
  rect(g,4,9,6,11,glove);
  mirror(g);
  // かお
  S(g,9,7,'e');S(g,14,7,'e');
  row(g,9,10,13,'k');
  return g;
}

// ===== しゅじんこう 3にん =====
// ジン（ながれの からてか・リュウ風）
(function(){
  const g=fighter({sk:'s',hair:'k',band:'r',top:'n',trunk:'n',glove:'s',belt:'k',shoe:'s'});
  // ハチマキの たれ
  S(g,5,4,'r');S(g,4,5,'r');S(g,18,4,'r');S(g,19,5,'r');
  // どうぎの あわせ
  for(let y=12;y<=15;y++){S(g,11,y,'c');S(g,12,y,'c');}
  SPR.jin=rows(g);
})();

// ダンディ（えいこくの しんしボクサー・ダッドリー風）
(function(){
  const g=fighter({sk:'s',hair:'d',top:null,trunk:'B',glove:'r',belt:'S',shoe:'R'});
  // くしけずった まえがみ
  row(g,4,8,15,'d');S(g,8,5,'d');S(g,15,5,'d');
  // ひげ（しんしの あかし）
  row(g,8,9,14,'k');
  // ちょうネクタイ
  S(g,11,11,'r');S(g,12,11,'r');S(g,11,12,'R');S(g,12,12,'R');
  SPR.dandy=rows(g);
})();

// ネオ（サイコパワーの しょうねんボクサー・エド風）
(function(){
  const g=fighter({sk:'s',hair:'y',top:'w',trunk:'b',glove:'r',belt:'k',shoe:'w'});
  // ひかる め（サイコ）
  S(g,9,7,'r');S(g,14,7,'r');S(g,9,6,'r');S(g,14,6,'r');
  // サイコの オーラ
  S(g,3,8,'p');S(g,20,8,'p');S(g,2,11,'p');S(g,21,11,'p');S(g,4,14,'p');S(g,19,14,'p');
  SPR.neo=rows(g);
})();

// ===== ざこ ファイター 8たい =====
// チンピラ
(function(){
  const g=fighter({sk:'s',hair:'k',top:'p',trunk:'B',glove:'s',belt:'k',shoe:'w'});
  // モヒカン
  S(g,11,2,'k');S(g,12,2,'k');S(g,11,3,'k');S(g,12,3,'k');
  SPR.punk=rows(g);
})();

// からてか（どうじょうやぶり）
(function(){
  const g=fighter({sk:'s',hair:'k',top:'d',trunk:'d',glove:'s',belt:'k',shoe:'s'});
  for(let y=12;y<=15;y++){S(g,11,y,'k');S(g,12,y,'k');}
  SPR.karateka=rows(g);
})();

// ムエタイし
(function(){
  const g=fighter({sk:'d',hair:'k',band:'y',top:null,trunk:'r',glove:'S',belt:'r',shoe:'d'});
  // モンコン（あたまの わ）
  row(g,3,8,15,'y');
  SPR.muay=rows(g);
})();

// ボクサー
(function(){
  const g=fighter({sk:'s',hair:null,top:null,trunk:'g',glove:'r',belt:'S',shoe:'R'});
  // ぼうず＋おおきな グローブ
  rect(g,4,9,6,12,'r');rect(g,17,9,19,12,'r');
  SPR.boxer=rows(g);
})();

// レスラー（マスクマン・たかぼうぎょ）
(function(){
  const g=fighter({sk:'s',hair:null,top:'r',trunk:'B',glove:'s',belt:'y',shoe:'r'});
  // あかい マスク
  rect(g,8,5,15,10,'r');
  // めの あな
  rect(g,9,7,10,8,'w');rect(g,13,7,14,8,'w');S(g,9,7,'e');S(g,14,7,'e');
  // くちの ライン
  row(g,9,10,13,'k');
  // マスクの しろライン
  row(g,6,8,15,'w');
  // ぶあつい かた
  rect(g,4,12,4,16,'r');rect(g,19,12,19,16,'r');
  SPR.wrestler=rows(g);
})();

// すもうとり（たかぼうぎょ・おもおも）
(function(){
  const g=mk();
  // まげ
  rect(g,10,2,11,4,'k');
  // あたま
  for(let y=5;y<=10;y++)row(g,y,8,11,'s');
  row(g,11,9,11,'s');
  // でっぷり どう
  for(let y=12;y<=19;y++)row(g,y,4,11,'s');
  // まわし
  for(let y=18;y<=20;y++)row(g,y,4,11,'w');
  S(g,11,21,'w');
  // ふとい あし
  for(let y=21;y<=22;y++)row(g,y,6,9,'s');
  row(g,23,6,9,'k');
  // はりだした うで
  rect(g,2,12,3,16,'s');
  mirror(g);
  // かお
  S(g,9,7,'e');S(g,14,7,'e');row(g,9,10,13,'k');
  // はらの かげ
  row(g,14,9,14,'d');row(g,16,8,15,'d');
  SPR.sumo=rows(g);
})();

// にんじゃ（じゅもん＝とびどうぐ）
(function(){
  const g=mk();
  // ずきん
  for(let y=3;y<=11;y++)row(g,y,8,11,'B');
  // どう
  for(let y=12;y<=16;y++)row(g,y,6,11,'B');
  row(g,16,6,11,'S');
  // あし＋たび
  for(let y=17;y<=22;y++)row(g,y,7,9,'B');
  row(g,23,7,9,'k');
  // こぶし
  rect(g,4,9,6,11,'B');rect(g,5,12,6,15,'B');
  row(g,9,4,6,'S');
  mirror(g);
  // めの すきま（ひかる）
  row(g,7,9,14,'k');
  S(g,9,7,'y');S(g,14,7,'y');
  // ハチマキの たれ
  S(g,2,5,'r');S(g,1,6,'r');S(g,2,6,'r');
  SPR.ninja=rows(g);
})();

// ヨガぎょうじゃ（じゅもん＝かえん）
(function(){
  const g=mk();
  // ターバン
  for(let y=2;y<=4;y++)row(g,y,8,11,'w');
  S(g,10,3,'r');
  // あたま（はだ こい）
  for(let y=5;y<=9;y++)row(g,y,9,11,'d');
  // ひげ
  for(let y=10;y<=13;y++)row(g,y,9,11,'n');
  // ほそい どう
  for(let y=12;y<=18;y++)row(g,y,9,11,'d');
  row(g,12,9,11,'y');
  // こしまき
  for(let y=17;y<=19;y++)row(g,y,8,11,'y');
  // ほそい あし
  for(let y=19;y<=23;y++)row(g,y,9,10,'d');
  // ながい うで（ヨガポーズ）
  row(g,8,6,8,'d');rect(g,6,8,6,12,'d');
  mirror(g);
  // め
  S(g,10,7,'e');S(g,13,7,'e');
  SPR.yoga=rows(g);
})();

// ===== ボス 3たい =====
// ストリートキング（たいかい1ボス）
(function(){
  const g=fighter({sk:'s',hair:'k',top:'R',trunk:'k',glove:'s',belt:'y',shoe:'k'});
  // サングラス
  row(g,6,8,15,'k');row(g,7,8,15,'e');
  // きんの ネックレス
  row(g,12,7,14,'y');
  // ぶあつい うで
  rect(g,4,12,4,16,'R');rect(g,19,12,19,16,'R');
  SPR.streetking=rows(g);
})();

// アンダーキング（たいかい2ボス・マスクド おうじゃ）
(function(){
  const g=fighter({sk:'s',hair:null,top:'b',trunk:'R',glove:'y',belt:'y',shoe:'y'});
  // きんの マスク
  rect(g,8,5,15,10,'y');
  rect(g,9,7,10,8,'e');rect(g,13,7,14,8,'e');
  row(g,4,8,15,'R');
  row(g,9,10,13,'R');
  // チャンピオンベルト
  row(g,16,5,18,'y');S(g,11,16,'r');S(g,12,16,'r');
  rect(g,4,12,4,16,'b');rect(g,19,12,19,16,'b');
  SPR.undermaster=rows(g);
})();

// はおう（ラスボス・あんこくの けんせい）
(function(){
  const g=fighter({sk:'s',hair:'R',top:'P',trunk:'P',glove:'R',belt:'k',shoe:'k'});
  // とがった かみ
  S(g,8,3,'R');S(g,15,3,'R');S(g,7,4,'R');S(g,16,4,'R');
  // あかく ひかる め
  S(g,9,7,'r');S(g,14,7,'r');S(g,9,6,'r');S(g,14,6,'r');
  // きばの わらい
  row(g,9,10,13,'w');S(g,10,9,'r');S(g,13,9,'r');
  // あんこくの オーラ
  S(g,2,4,'r');S(g,21,4,'r');S(g,1,10,'R');S(g,22,10,'R');
  S(g,3,18,'r');S(g,20,18,'r');S(g,0,7,'R');S(g,23,7,'R');
  SPR.grandmaster=rows(g);
})();

// 出力（検証）
let bad=0;
Object.keys(SPR).forEach(n=>{
  const r=SPR[n];
  const ws=[...new Set(r.map(s=>s.length))];
  if(r.length!==24||ws.length!==1||ws[0]!==24){console.log('BAD',n,r.length,ws);bad++;}
});
console.log(bad?('BAD '+bad):'ALL 24x24 OK ('+Object.keys(SPR).length+' sprites)');

// ASCII プレビュー
Object.keys(SPR).forEach(n=>{
  console.log('--- '+n+' ---');
  SPR[n].forEach(r=>console.log(r.replace(/\./g,' ')));
});

// JS リテラル出力（HTML 埋め込み用）
const lit='var SPR={\n'+Object.keys(SPR).map(n=>{
  return '  '+n+':['+SPR[n].map(r=>JSON.stringify(r)).join(',')+']';
}).join(',\n')+'\n};';
require('fs').writeFileSync(require('path').join(__dirname,'spr_literal.txt'),lit);
console.log('\nliteral written');
