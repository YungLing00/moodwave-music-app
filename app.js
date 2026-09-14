const traits={O:{name:"開放性",en:"Openness",color:"#9177ff",style:"幻想藝術",role:"概念策展人",desc:"擅長探索新聲音、建立作品概念與跨域靈感。"},C:{name:"盡責性",en:"Conscientiousness",color:"#c8ff62",style:"數位精準",role:"製作統籌",desc:"擅長規劃流程、整理素材並推進作品如期完成。"},E:{name:"外向性",en:"Extraversion",color:"#ff77af",style:"霓虹舞台",role:"表演與溝通者",desc:"擅長帶動能量、表達想法與連結團隊成員。"},A:{name:"親和性",en:"Agreeableness",color:"#65e4db",style:"柔和共感",role:"團隊協調者",desc:"擅長傾聽、整合不同意見並維持合作氛圍。"},N:{name:"情緒敏感性",en:"Neuroticism",color:"#ff8b64",style:"情緒朋克",role:"情感敘事者",desc:"對情緒細節敏銳，能捕捉作品張力與深層感受。"}};
const questions=[
["我是聚會中帶動氣氛的人。","E"],["我不太關心別人的感受。","A",1],["我總是事先做好準備。","C"],["我很容易感到壓力。","N"],["我擁有豐富的詞彙。","O"],
["我平常話不多。","E",1],["我對他人感興趣。","A"],["我常把物品隨處放置。","C",1],["大多數時候我很放鬆。","N",1],["我很難理解抽象的概念。","O",1],
["我和別人相處時感到自在。","E"],["我有時會言語冒犯別人。","A",1],["我會注意細節。","C"],["我常為事情擔心。","N"],["我有生動的想像力。","O"],
["我常待在不顯眼的位置。","E",1],["我能同理別人的感受。","A"],["我有時會把事情弄得一團亂。","C",1],["我很少感到低落。","N",1],["我對抽象概念不感興趣。","O",1],
["我會主動開啟對話。","E"],["我不太在意別人的困擾。","A",1],["我會立刻完成該做的事。","C"],["我很容易受到干擾或不安。","N"],["我常有很棒的點子。","O"],
["我沒有太多話想說。","E",1],["我的心腸柔軟。","A"],["我常忘記把物品放回原位。","C",1],["我很容易感到沮喪或不快。","N"],["我的想像力不太好。","O",1],
["我會在聚會中和許多不同的人交談。","E"],["我其實不太對他人感興趣。","A",1],["我喜歡井然有序。","C"],["我的情緒經常改變。","N"],["我能很快理解事情。","O"],
["我不喜歡引起別人注意。","E",1],["我願意花時間陪伴或幫助別人。","A"],["我有時會逃避自己的職責。","C",1],["我的情緒起伏頻繁。","N"],["我會使用較艱深的詞彙。","O"],
["我不介意成為眾人注意的中心。","E"],["我能感受到別人的情緒。","A"],["我會按照計畫行事。","C"],["我很容易煩躁。","N"],["我會花時間深入思考。","O"],
["面對陌生人時，我通常很安靜。","E",1],["我能讓別人感到自在。","A"],["我對自己的工作要求精確。","C"],["我經常感到低落。","N"],["我腦中充滿各種想法。","O"]];
let state={name:"",avatar:"♪",answers:Array(50).fill(null),q:0,scores:null,persona:0,team:[],members:[],messages:[],activeSpeaker:""};
const screens=["home","profile","quiz","loading","result","team","chat"],$=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
function go(id){$$(".screen").forEach(x=>x.classList.toggle("active",x.id===id));let n=Math.max(0,screens.indexOf(id)-1);$$("#stepNav i").forEach((x,i)=>x.classList.toggle("active",i<=n));scrollTo({top:0,behavior:"smooth"});history.replaceState(null,"","#"+id);if(id==="result"&&state.scores)renderResult();if(id==="team")renderTeam();if(id==="chat")renderChat()}
$$("[data-go]").forEach(b=>b.onclick=()=>go(b.dataset.go));
$$(".avatar-choice").forEach(b=>b.onclick=()=>{$$(".avatar-choice").forEach(x=>x.classList.remove("active"));b.classList.add("active");state.avatar=b.dataset.avatar});
$("#toQuiz").onclick=()=>{let name=$("#userName").value.trim();if(!name){toast("請先輸入名字或暱稱");return $("#userName").focus()}state.name=name;save();go("quiz");renderQuestion()};
function renderQuestion(){let q=state.q;$("#qCount").textContent="QUESTION "+String(q+1).padStart(2,"0")+" / 50";$("#qProgress").style.width=(q+1)/50*100+"%";$("#questionText").textContent=questions[q][0];$$("#likert button").forEach(b=>b.classList.toggle("selected",Number(b.dataset.value)===state.answers[q]));$("#prevQ").disabled=q===0}
$$("#likert button").forEach(b=>b.onclick=()=>answer(Number(b.dataset.value)));
function answer(v){state.answers[state.q]=v;save();renderQuestion();setTimeout(()=>{if(state.q<49){state.q++;renderQuestion()}else finishQuiz()},170)}
$("#prevQ").onclick=()=>{if(state.q>0){state.q--;renderQuestion()}};$("#saveExit").onclick=()=>{save();toast("進度已暫存在這台裝置");go("home")};addEventListener("keydown",e=>{if($("#quiz").classList.contains("active")&&/[1-5]/.test(e.key))answer(Number(e.key))});
function finishQuiz(){let sums={O:0,C:0,E:0,A:0,N:0};questions.forEach((q,i)=>sums[q[1]]+=q[2]?6-state.answers[i]:state.answers[i]);Object.keys(sums).forEach(k=>sums[k]=Math.round((sums[k]-10)/40*100));state.scores=sums;save();go("loading");let p=0,t=setInterval(()=>{p+=4;$("#loadPercent").textContent=p+"%";if(p===44)$("#loadText").textContent="尋找最高的兩項特質…";if(p===76)$("#loadText").textContent="生成音樂角色與協作建議…";if(p>=100){clearInterval(t);setTimeout(()=>go("result"),350)}},45)}
function ranked(){return Object.entries(state.scores).sort((a,b)=>b[1]-a[1])}
function renderResult(){let rank=ranked(),top=rank[0][0],second=rank[1][0],t=traits[top],s=traits[second];$("#resultName").textContent=state.name;$("#personaName").textContent=t.style+"型創作者";$("#personaStyle").textContent=t.en+" × "+s.en;let av=$("#generatedAvatar");av.className="generated-avatar style-"+top;av.querySelector(".avatar-face").textContent=[state.avatar,"✦","◉"][state.persona];$("#avatarSwitch").innerHTML=[0,1,2].map((_,i)=>'<button class="'+(i===state.persona?"active":"")+'" data-i="'+i+'"></button>').join("");$$("#avatarSwitch button").forEach(b=>b.onclick=()=>{state.persona=Number(b.dataset.i);renderResult()});$("#scoreList").innerHTML=rank.map(([k,v])=>'<div class="score-row"><span>'+k+'</span><i><b style="width:'+v+'%;background:'+traits[k].color+'"></b></i><strong>'+v+'</strong></div>').join("");$("#topTraits").textContent=t.name+" × "+s.name;$("#advice").textContent="你以「"+t.name+"」最為突出，同時具備「"+s.name+"」優勢。"+t.desc+s.desc+" 合作時，可主動說明自己的工作節奏，並與夥伴確認角色與期待。";$("#musicRole").textContent=t.role;$("#musicDesc").textContent=t.desc;drawRadar();setupMusic()}
function drawRadar(){let c=$("#radar"),x=c.getContext("2d"),cx=230,cy=195,R=135,keys=["O","C","E","A","N"];x.clearRect(0,0,c.width,c.height);x.font="12px DM Sans";x.textAlign="center";for(let ring=1;ring<=4;ring++){x.beginPath();keys.forEach((k,i)=>{let a=-Math.PI/2+i*Math.PI*2/5,r=R*ring/4,px=cx+Math.cos(a)*r,py=cy+Math.sin(a)*r;i?x.lineTo(px,py):x.moveTo(px,py)});x.closePath();x.strokeStyle="#343440";x.stroke()}keys.forEach((k,i)=>{let a=-Math.PI/2+i*Math.PI*2/5;x.fillStyle=traits[k].color;x.fillText(k+" "+traits[k].name,cx+Math.cos(a)*(R+27),cy+Math.sin(a)*(R+27)+4)});x.beginPath();keys.forEach((k,i)=>{let a=-Math.PI/2+i*Math.PI*2/5,r=R*state.scores[k]/100,px=cx+Math.cos(a)*r,py=cy+Math.sin(a)*r;i?x.lineTo(px,py):x.moveTo(px,py)});x.closePath();x.fillStyle="#c8ff6230";x.fill();x.strokeStyle="#c8ff62";x.lineWidth=2;x.stroke()}
const musicReasons={
 O:["開放性通常與偏好複雜、反思性及新穎聲音呈正相關；這首緩慢變化的氛圍音樂保留探索空間。","較明顯的律動提供新的聲音刺激，適合想切換創作視角時聆聽。","層次與空間變化較豐富，對應開放性常見的美感與想像探索。"],
 C:["穩定且可預期的聲音結構適合作為工作背景，呼應盡責性對秩序與持續投入的傾向。","較清楚的脈動能提供進度感，但不代表所有高盡責性者都偏好相同節奏。","較自由的聲響供切換使用，讓推薦保留使用者自主選擇。"],
 E:["穩定氛圍適合作為社交後的緩衝選項。","三首之中律動感較明顯；外向性在部分研究中與 energetic、rhythmic 音樂偏好呈正相關。","空間感較大的替代選擇，適合團隊共同聆聽。"],
 A:["柔和、低衝突的音色適合作為合作情境背景，這是設計轉譯而非人格定律。","較活躍的選項可用於需要團隊互動與共同節奏時。","較具沉浸感的選項，保留親和性使用者對情緒與情境的自主偏好。"],
 N:["平穩音色可作為低刺激選項，但本系統不宣稱具有情緒治療效果。","若想轉換當下能量，可主動選擇較有脈動感的曲目。","較深沉且有空間感；研究曾發現情緒敏感性與悲傷音樂知覺存在關聯，但關聯不代表固定喜好。"]
};
const musicTracks=[
 {name:"Cylinder Seven",file:"Chris_Zabriskie_-_07_-_Cylinder_Seven.ogg"},
 {name:"Cylinder Three",file:"Chris_Zabriskie_-_03_-_Cylinder_Three.ogg"},
 {name:"Cylinder Eight",file:"Chris_Zabriskie_-_08_-_Cylinder_Eight.ogg"}
];
let selectedTrack=0;
function musicURL(file){return "https://commons.wikimedia.org/wiki/Special:Redirect/file/"+file}
function setupMusic(){
 const audio=$("#musicAudio");if(!audio)return;
 const recommended=state.scores?({O:2,C:0,E:1,A:0,N:2}[ranked()[0][0]]):0;selectedTrack=recommended;
 $("#trackPicks").innerHTML=musicTracks.map((t,i)=>'<button data-track="'+i+'" class="'+(i===selectedTrack?"active":"")+'">'+(i+1).toString().padStart(2,"0")+' '+t.name+'</button>').join("");
 $$("#trackPicks button").forEach(b=>b.onclick=()=>selectTrack(Number(b.dataset.track),true));selectTrack(selectedTrack,false);
 audio.ontimeupdate=()=>{$("#musicProgress").value=audio.duration?audio.currentTime/audio.duration*100:0};
 audio.onended=()=>{$("#previewSound").classList.remove("playing");$("#previewSound").innerHTML="<i>▶</i> 播放推薦音樂"};
 $("#musicProgress").oninput=e=>{if(audio.duration)audio.currentTime=audio.duration*e.target.value/100};
}
function selectTrack(i,play){selectedTrack=i;const audio=$("#musicAudio"),t=musicTracks[i];audio.src=musicURL(t.file);$("#trackName").textContent=t.name;let key=state.scores?ranked()[0][0]:"O";$("#trackReason").textContent=musicReasons[key][i];$$("#trackPicks button").forEach((b,n)=>b.classList.toggle("active",n===i));if(play){audio.play().then(updatePlayButton).catch(()=>toast("瀏覽器暫時無法載入音樂，請點授權來源試聽"))}}
function updatePlayButton(){const playing=!$("#musicAudio").paused;$("#previewSound").classList.toggle("playing",playing);$("#previewSound").innerHTML=playing?"<i>■</i> 暫停音樂":"<i>▶</i> 播放推薦音樂"}
$("#previewSound").onclick=()=>{const a=$("#musicAudio");a.paused?a.play().then(updatePlayButton).catch(()=>toast("音樂載入失敗，請稍後再試")):(a.pause(),updatePlayButton())};
$("#retake").onclick=()=>{if(confirm("確定要清除目前作答並重新測驗嗎？")){state.answers=Array(50).fill(null);state.q=0;state.scores=null;save();go("profile")}};
function makeMember(name,top,avatar){
 const roles={O:"概念／聲音設計",C:"節奏／專案統籌",E:"演出／對外溝通",A:"和聲／團隊協調",N:"詞曲／情感敘事"};
 return {id:Date.now().toString(36)+Math.random().toString(36).slice(2,5),name,avatar:avatar||["✦","♬","♫","♪","◉"][Math.floor(Math.random()*5)],top,second:"A",role:roles[top],me:false};
}
function ensureSelf(){if(!state.scores)return;let r=ranked(),self=makeMember(state.name,r[0][0],[state.avatar,"✦","◉"][state.persona]);self.id="self";self.second=r[1][0];self.role=traits[r[0][0]].role;self.me=true;let others=(state.members||[]).filter(x=>x.id!=="self");state.team=[self,...others]}
function renderTeam(){if(!state.scores)return go("profile");ensureSelf();save();$("#memberGrid").innerHTML=state.team.map(m=>'<article class="member-card"><span>'+(m.me?"YOU":"JOINED")+'</span><div class="member-avatar style-'+m.top+'">'+m.avatar+'</div><h3>'+escapeHTML(m.name)+'</h3><p>'+m.role+'</p><div class="trait-tags"><i>'+m.top+" "+traits[m.top].name+'</i></div>'+(m.me?"":'<button class="remove-member" data-remove="'+m.id+'">移除</button>')+'</article>').join("");$$("#memberGrid [data-remove]").forEach(b=>b.onclick=()=>removeMember(b.dataset.remove));$("#roleMap").innerHTML=state.team.map(m=>'<div><span>'+escapeHTML(m.name)+'</span>'+m.role+'</div>').join("");let unique=new Set(state.team.map(x=>x.top)).size;$("#balanceScore").textContent=state.team.length<2?"等待成員":72+Math.min(unique,4)*6+" / 100";let planner=state.team.find(x=>x.top==="C"),creator=state.team.find(x=>x.top==="O");$("#teamNote").textContent=state.team.length<2?"目前只有你。將房間邀請碼分享給夥伴，或直接在上方加入成員。":"目前有 "+state.team.length+" 位成員、"+unique+" 種主要特質。"+(planner?"可由 "+planner.name+" 協助整理時程。":"團隊可再邀請一位盡責性較突出的夥伴協助規劃。")+(creator?" "+creator.name+" 可協助發展創意概念。":"");}
function addMember(name,top){name=name.trim();if(!name)return toast("請輸入成員名字");if((state.members||[]).some(x=>x.name===name)||name===state.name)return toast("這位成員已經在房間裡");state.members=state.members||[];state.members.push(makeMember(name,top));renderTeam();toast(name+" 已加入團隊")}
function removeMember(id){state.members=(state.members||[]).filter(x=>x.id!==id);state.messages=state.messages.filter(x=>x.memberId!==id);renderTeam();toast("已移除成員")}
$("#joinForm").onsubmit=e=>{e.preventDefault();addMember($("#joinName").value,$("#joinTrait").value);$("#joinName").value=""};
$("#copyInvite").onclick=()=>{navigator.clipboard?.writeText("WAVE-04").then(()=>toast("邀請碼 WAVE-04 已複製")).catch(()=>toast("邀請碼：WAVE-04"))};

function renderChat(){ensureSelf();if(!state.team.length)return go("team");$("#sideMembers").innerHTML=state.team.map(m=>'<div><i class="style-'+m.top+'">'+m.avatar+'</i><span>'+escapeHTML(m.name)+'<small> · '+traits[m.top].name+'</small></span></div>').join("");$("#activeSpeaker").innerHTML=state.team.map(m=>'<option value="'+m.id+'">'+escapeHTML(m.name)+'</option>').join("");state.activeSpeaker=state.activeSpeaker&&state.team.some(x=>x.id===state.activeSpeaker)?state.activeSpeaker:"self";$("#activeSpeaker").value=state.activeSpeaker;$("#activeSpeaker").onchange=e=>{state.activeSpeaker=e.target.value;save()};if(!state.messages.length)state.messages=[{name:"系統",avatar:"4Y",text:"房間已建立。邀請夥伴加入後，每位成員都能切換身分發言。",memberId:"system"}];renderMessages()}
$("#chatJoinBtn").onclick=()=>{let n=$("#chatJoinName").value.trim();if(!n)return toast("請輸入名字");addMember(n,["O","C","E","A","N"][Math.floor(Math.random()*5)]);$("#chatJoinName").value="";renderChat()};
function renderMessages(){$("#messages").innerHTML=state.messages.map(m=>'<div class="message '+(m.memberId===state.activeSpeaker?"mine":"")+'"><i>'+m.avatar+'</i><div class="bubble"><span>'+m.name+'</span>'+escapeHTML(m.text)+'</div></div>').join("");$("#messages").scrollTop=$("#messages").scrollHeight}
$("#chatForm").onsubmit=e=>{e.preventDefault();sendMessage($("#messageInput").value)};$$(".quick-replies button").forEach(b=>b.onclick=()=>sendMessage(b.textContent));
function sendMessage(text){text=text.trim();if(!text)return;let speaker=state.team.find(x=>x.id===state.activeSpeaker)||state.team[0];state.messages.push({name:speaker.name,avatar:speaker.avatar,text,memberId:speaker.id});$("#messageInput").value="";save();renderMessages()}
function escapeHTML(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}function toast(s){let t=$("#toast");t.textContent=s;t.classList.add("show");clearTimeout(t.x);t.x=setTimeout(()=>t.classList.remove("show"),2200)}function save(){localStorage.setItem("4young-state",JSON.stringify(state))}
try{let saved=JSON.parse(localStorage.getItem("4young-state"));if(saved)state={...state,...saved};if(!Array.isArray(state.answers)||state.answers.length!==50){state.answers=Array(50).fill(null);state.q=0;state.scores=null}}catch(e){}$("#userName").value=state.name;let hash=location.hash.slice(1);go(screens.includes(hash)?hash:"home");if(hash==="quiz")renderQuestion();
