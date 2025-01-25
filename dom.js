const brandData={labels:["Haagen Dazs","Snowee","Esta","TRB","BEAN","Le Petit"],datasets:[{data:[],backgroundColor:["#ffa900","#ffa900","#ffa900","#ffa900","#ffa900","#ffa900"],borderWidth:1}]};let currentChart=null;function drawChart(e){const t=document.getElementById("brandChart").getContext("2d");null!==currentChart&&currentChart.destroy(),currentChart=new Chart(t,{type:"bar",data:e,options:{responsive:!0,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0}}}})}const accessToken="EAAQwS9m6tIABO8ZCZCvO4TtPBXcbilAYn3nwZCZB739B8GtMfy2V2uJmgjHMtvsdKS6XMl7YiBuXqg3BxTdh37H7Vv5qYcsZA7IqVYMLqHX3FhQdxD8fSguISa0sDg1INzOfVtUCt8OoNqh0j6PXvu50rZCgMerGZAJ7NAYgLYuTsPw8NvdOEdF5kRX9C0ctu1ka7CS6VcbbXosWnMM",adAccountId="676599667843841",apiUrl=`https://graph.facebook.com/v16.0/act_${adAccountId}/campaigns?fields=id,name,status,adsets{campaign_id,name,status,spend,insights.date_preset(last%5f7d){impressions,reach,spend,actions,cost_per_action_type}}&filtering=[{"field":"spend","operator":"GREATER_THAN","value":0}]&access_token=${accessToken}`;let allData=[];async function fetchData(e){document.querySelector(".loading").classList.add("active"),allData=[];try{const t=await fetch(e);if(!t.ok)throw new Error("Network response was not ok");const a=await t.json();if(a.error)return;allData=a.data,renderTopCampaigns(allData);const n=calculateTotals(allData);document.getElementById("total_spend").textContent=formatCurrency(Math.round(n.spend)),document.getElementById("total_reach").textContent=formatNumber(Math.round(n.reach)),document.getElementById("total_reaction").textContent=formatNumber(Math.round(n.reaction)),document.getElementById("total_follows").textContent=formatNumber(Math.round(n.follows));const r=calculateBrandSpending(allData,brandData.labels);brandData.datasets[0].data=r,document.querySelector(".loading").classList.remove("active"),drawChart(brandData),processData(allData),renderReportPerformance(1*localStorage.getItem("quickID"))}catch(e){}}const dom_reach_unit=document.getElementById("dom_reach_unit"),dom_reaction_unit=document.getElementById("dom_reaction_unit"),dom_mess_unit=document.getElementById("dom_mess_unit"),dom_like_unit=document.getElementById("dom_like_unit");function processData(e,t){let a="";const n=document.querySelector(".dom_detail_tbody ");function r(e,t=0){let a=0,n=0,r=0,o=0,s=0,c=0,d=0,i=0,l=0,m=0;e.forEach((e=>{a+=parseFloat(e.querySelector(".spend").dataset.value)||0,n+=parseInt(e.querySelector(".reach").dataset.value)||0,d+=parseInt(e.querySelector(".result").dataset.value)||0,r+=parseInt(e.querySelector(".impressions").dataset.value)||0,o+=parseInt(e.querySelector(".engagement").dataset.value)||0,s+=parseInt(e.querySelector(".postReaction").dataset.value)||0,c+=parseInt(e.querySelector(".follows").dataset.value)||0,i+=parseInt(e.querySelector(".comments").dataset.value)||0,l+=parseInt(e.querySelector(".linkClick").dataset.value)||0,m+=parseInt(e.querySelector(".messengerStart").dataset.value)||0}));const u=`\n      <tr>\n        <td class="dom_selected_total" colspan="4">\n          ${t>0?`Total selected ${t} adsets`:"Total all adsets"}\n        </td>\n        <td>${formatCurrency(a)}</td>\n        <td>${formatNumber(n)}</td>\n        <td>${formatNumber(r)}</td>\n        <td>${formatNumber(d)}</td>\n        <td>${d?formatCurrency(Math.floor(a/d)):"-"}</td>\n        <td>-</td>\n        <td>${formatNumber(o)}</td>\n        <td>${formatNumber(s)}</td>\n        <td>${formatNumber(i)}</td>\n        <td>${formatNumber(c)}</td>\n        <td>${formatNumber(m)}</td>\n        <td>${formatNumber(l)}</td>\n      </tr>\n    `;document.querySelector("tfoot").innerHTML=u;if(document.querySelector("#dom_contentarea.viewPerformance")){const e=document.getElementById("total_spend_viewPerformance"),t=document.getElementById("total_reaction_viewPerformance"),r=document.getElementById("total_engagement_viewPerformance"),d=document.getElementById("total_reach_viewPerformance"),u=document.getElementById("total_messenger_viewPerformance"),f=document.getElementById("total_follows_viewPerformance"),g=document.getElementById("total_comment_viewPerformance"),p=document.getElementById("total_link_viewPerformance");e.innerText=formatCurrency(a),d.innerText=formatNumber(n),u.innerText=formatNumber(m),f.innerText=formatNumber(c),t.innerText=formatNumber(s),r.innerText=formatNumber(o),g.innerText=formatNumber(i),p.innerText=formatNumber(l)}}document.addEventListener("change",(e=>{if("checkbox"===e.target.type){const t=e.target.closest("tr");e.target.checked?t.classList.add("checked"):t.classList.remove("checked");const a=Array.from(document.querySelectorAll("tr.checked"));if(a.length>0)r(a,a.length);else{r(Array.from(document.querySelectorAll("tbody tr")))}}}));let o=0,s=0,c=0,d=0,i=0,l=0,m=0,u=0;e.forEach((e=>{e.adsets.data.forEach((n=>{const r=n.insights?n.insights.data[0]:{},f=parseFloat(r.spend)||0;if(f>0){const g=r.reach||0,p=r.impressions||0,h=getValueFromActions(r.actions,"post_engagement")||0,_=getValueFromActions(r.actions,"post_reaction")||0,y=getValueFromActions(r.actions,"like")||0,b=getValueFromActions(r.actions,"comment")||0,C=getValueFromActions(r.actions,"link_click")||0,w=getValueFromActions(r.actions,"onsite_conversion.messaging_conversation_started_7d")||0;"true"===t&&(e.name.toLowerCase().includes("awareness")&&(o+=parseFloat(r.spend)||0,s+=parseInt(r.reach)||0),e.name.toLowerCase().includes("engagement")&&(c+=parseFloat(r.spend)||0,d+=getValueFromActions(r.actions,"post_reaction")||0),e.name.toLowerCase().includes("message")&&(i+=f,l+=getValueFromActions(r.actions,"onsite_conversion.messaging_conversation_started_7d")||0),e.name.toLowerCase().includes("likepage")&&(m+=f,u+=getValueFromActions(r.actions,"like")||0));let k=0;e.name.toLowerCase().includes("engagement")&&(k=parseInt(_)),e.name.toLowerCase().includes("awareness")&&(k=parseInt(g)),e.name.toLowerCase().includes("message")&&(k=parseInt(w)),e.name.toLowerCase().includes("likepage")&&(k=parseInt(y));const v=k>0?Math.round(f/k):"-",I=p>0?Math.round(f/p*1e3):0,D=formatCurrency(v),E=formatCurrency(I),S=formatNumber(h);a+=`\n          <tr>\n            <td><input type="checkbox"></td>\n            <td>${e.name}</td>\n            <td>${n.name}</td>\n            <td class="${"ACTIVE"===n.status?"dom_status_active":"dom_status_inactive"}">\n              ${formatStatus(n.status)}\n            </td>\n            <td class="spend" data-value="${f}">${formatCurrency(f)}</td>\n            <td class="reach" data-value="${g}">${formatNumber(g)}</td>\n            <td class="impressions" data-value="${p}">${formatNumber(p)}</td>\n            <td class="result" data-value="${k}">${k>0?formatNumber(k):"-"}</td>\n            <td class="costPerResult" data-value="${v}">${D}</td>\n            <td class="cpm" data-value="${I}">${E}</td>\n            <td class="engagement" data-value="${h}">${S}</td>\n            <td class="postReaction" data-value="${_}">${formatNumber(_)}</td>\n            <td class="comments" data-value="${b}">${formatNumber(b)}</td>\n            <td class="follows" data-value="${y}">${formatNumber(y)}</td>\n            <td class="messengerStart" data-value="${w}">${formatNumber(w)}</td>\n            <td class="linkClick" data-value="${C}">${formatNumber(C)}</td>\n          </tr>\n        `}}))})),"true"===t&&(dom_reach_unit.innerText=s>0?formatCurrency((o/s).toFixed(1)):"-",dom_reaction_unit.innerText=d>0?formatCurrency((c/d).toFixed(0)):"-",dom_mess_unit.innerText=l>0?formatCurrency((i/l).toFixed(0)):"-",dom_like_unit.innerText=u>0?formatCurrency((m/u).toFixed(0)):"-"),n.innerHTML=a,sortTableBySpend();r(Array.from(document.querySelectorAll("tbody tr")));const f=localStorage.getItem("quickID");if(f){document.querySelectorAll(".dom_quick_filter a")[f].click()}}function sortTableBySpend(){const e=document.querySelector("tbody"),t=Array.from(e.querySelectorAll("tr"));t.sort(((e,t)=>{const a=parseFloat(e.querySelector(".spend").dataset.value)||0;return(parseFloat(t.querySelector(".spend").dataset.value)||0)-a})),e.innerHTML="",t.forEach((t=>e.appendChild(t)))}const dom_main_menu_a=document.querySelectorAll(".dom_main_menu li a"),dom_contentarea=document.querySelector("#dom_contentarea");function clearFilter(){const e=document.querySelector(".dom_quick_filter a.active");e&&e.classList.remove("active"),localStorage.removeItem("quickID")}function filterData(e){processData(allData.filter((t=>t.name.toLowerCase().includes(e))),"true")}function formatStatus(e){return e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()}function formatCurrency(e){return"-"===e?"-":new Intl.NumberFormat("vi-VN").format(e)+" ₫"}function formatNumber(e){return"-"===e?"-":new Intl.NumberFormat("de-DE").format(e)}function getValueFromActions(e,t){if(!e)return"0";const a=e.find((e=>e.action_type===t));return a?a.value:"0"}function calculateBrandSpending(e,t){const a=t.map((()=>0));return e.forEach((e=>{const n=e.name.toLowerCase(),r=e.adsets.data.reduce(((e,t)=>e+parseFloat(t.insights?.data[0]?.spend||0)),0);t.forEach(((e,t)=>{n.includes(e.toLowerCase())&&(a[t]+=r)}))})),a}function calculateTotals(e){const t={spend:0,reach:0,reaction:0,follows:0};return e.forEach((e=>{e.adsets.data.forEach((e=>{const a=e.insights?.data[0]||{};t.spend+=parseFloat(a.spend||0),t.reach+=parseInt(a.reach||0),t.reaction+=parseInt(getValueFromActions(a.actions,"post_reaction")||0,10),t.follows+=parseInt(getValueFromActions(a.actions,"like")||0,10)}))})),t}function renderTopCampaigns(e){const t=e.map((e=>{const t=e.adsets.data.reduce(((e,t)=>e+parseFloat(t.insights?.data[0]?.spend||0)),0);return{name:e.name,spend:t}}));t.sort(((e,t)=>t.spend-e.spend));const a=document.querySelector(".dom_chart_most_ul");a.innerHTML="",t.forEach((e=>{const t=document.createElement("li");t.innerHTML=`<span>${e.name}</span> <span>${formatCurrency(e.spend)}</span>`,a.appendChild(t)}))}document.getElementById("dom_detail_find").addEventListener("click",(function(){const e=document.getElementById("dom_detail_input").value.toLowerCase().trim();clearFilter(),dom_contentarea.classList.remove("viewPerformance"),filterData(e)})),fetchData(apiUrl);const dom_choose_day=document.querySelector(".dom_choose_day"),dom_choosed=document.querySelector(".dom_choosed"),dom_choosed_day=document.querySelector(".dom_choosed_day");dom_choose_day.addEventListener("click",(function(){dom_choose_day.classList.toggle("active")}));let preset="last%5f7d";const itemDate=document.querySelectorAll(".dom_choose_day li");function formatDate(e){const t=new Date(e);return`${t.getDate().toString().padStart(2,"0")}/${(t.getMonth()+1).toString().padStart(2,"0")}/${t.getFullYear()}`}function getFormattedDateRange(e){const t=new Date;let a,n;switch(e){case"today":a=n=t;break;case"yesterday":a=new Date,a.setDate(t.getDate()-1),n=a;break;case"last%5f3d":a=new Date,a.setDate(t.getDate()-3),n=new Date,n.setDate(t.getDate()-1);break;case"last%5f7d":a=new Date,a.setDate(t.getDate()-7),n=new Date,n.setDate(t.getDate()-1);break;case"last%5f30d":a=new Date,a.setDate(t.getDate()-30),n=new Date,n.setDate(t.getDate()-1);break;case"this%5fmonth":a=new Date(t.getFullYear(),t.getMonth(),1),n=t;break;case"last%5fmonth":a=new Date(t.getFullYear(),t.getMonth()-1,1),n=new Date(t.getFullYear(),t.getMonth(),0);break;default:return""}return a.getTime()===n.getTime()?formatDate(a):`${formatDate(a)} - ${formatDate(n)}`}itemDate.forEach((e=>{e.addEventListener("click",(()=>{dom_choosed.innerText=e.innerText;const t=e.getAttribute("data-date"),a=getFormattedDateRange(t);dom_choosed_day.innerText=a;const n=`https://graph.facebook.com/v16.0/act_${adAccountId}/campaigns?fields=id,name,status,adsets{campaign_id,name,status,spend,insights.date_preset(${t}){impressions,reach,spend,actions,cost_per_action_type}}&filtering=[{"field":"spend","operator":"GREATER_THAN","value":0}]&access_token=${accessToken}`;preset=t,fetchData(n)}))})),dom_choosed_day.innerText=getFormattedDateRange("last%5f7d");const quick_filter=["Haagen Dazs","Snowee","Esta","TRB","BEAN","Le Petit"],dom_quick_filter=document.querySelector(".dom_quick_filter"),dom_table_data=document.querySelector(".dom_table_data");quick_filter.forEach((e=>{const t=document.createElement("li");t.innerHTML=`\n    <a class="" data-quick="${e}">\n      <i class="fa-solid fa-bolt"></i> <span>${e}</span>\n    </a>\n  `,dom_quick_filter.appendChild(t)}));const filterItems=document.querySelectorAll(".dom_quick_filter a");function createApiUrl(e,t,a,n,r){return`https://graph.facebook.com/v16.0/act_${t}/insights?fields=${e}&filtering=${a}&date_preset=${n}&access_token=${r}`}const daily_title=document.querySelector(".daily_title");function renderReportPerformance(e){dom_main_menu_a[1].click();const t=document.querySelector(".dom_quick_filter a.active");t&&t.classList.remove("active");const a=filterItems[e].dataset.quick;localStorage.setItem("quickID",e),localStorage.setItem("query",a),filterItems[e].classList.add("active"),daily_title.innerText=`Daily logs - ${a}`;const n=JSON.stringify([{field:"campaign.name",operator:"CONTAIN",value:a}]),r={platform:createApiUrl("campaign_id,campaign_name,reach&breakdowns=publisher_platform",adAccountId,n,preset,accessToken),age:createApiUrl("campaign_id,campaign_name,reach&breakdowns=age",adAccountId,n,preset,accessToken),region:createApiUrl("campaign_id,campaign_name,reach&breakdowns=region",adAccountId,n,preset,accessToken),gender:createApiUrl("campaign_id,campaign_name,reach&breakdowns=gender",adAccountId,n,preset,accessToken),daily:createApiUrl("spend,reach,actions,date_start&time_increment=1",adAccountId,n,preset,accessToken)};fetchDataFlat(r.platform),fetchDataAge(r.age),fetchRegionData(r.region),fetchGenderData(r.gender),fetchDailyInsights(r.daily),filterData(a.toLowerCase())}function viewPerformance(){dom_contentarea.classList.add("viewPerformance");localStorage.getItem("quickID")||filterItems[0].click()}async function fetchDataAge(e){try{const t=await fetch(e);if(!t.ok)throw new Error("Network response was not ok");const a=await t.json();if(a.error)return;let n={};a.data.forEach((e=>{const t=e.age||"Unknown",a=e.reach||0;n[t]||(n[t]=0),n[t]+=a})),drawAgeChart3(n)}catch(e){}}async function fetchDataFlat(e){try{const t=await fetch(e);if(!t.ok)throw new Error("Network response was not ok");const a=await t.json();if(a.error)return;let n={};a.data.forEach((e=>{const t=e.publisher_platform||"Unknown",a=e.reach||0;n[t]||(n[t]=0),n[t]+=a})),drawChart2(n)}catch(e){}}function capitalizeFirstLetter(e){return e.replace(/\b\w/g,(e=>e.toUpperCase()))}filterItems.forEach(((e,t)=>{e.addEventListener("click",(()=>{localStorage.getItem("quickID")!=t&&renderReportPerformance(t)}))})),dom_main_menu_a.forEach(((e,t)=>{e.addEventListener("click",(()=>{const a=document.querySelector(".dom_main_menu li a.active");a&&a.classList.remove("active"),e.classList.add("active"),0==t&&(clearFilter(),filterData(""),dom_contentarea.classList.remove("viewPerformance"),window.scroll(0,0)),1==t&&viewPerformance()}))}));let ageChartInstance,regionChartInstance,genderChartInstance,dailyChartInstance,reachChartInstance=null;function drawChart2(e){const t=document.getElementById("reachChart").getContext("2d"),a=["audience_network","facebook","instagram","messenger"].reduce(((t,a)=>(e[a]&&(t[a]=e[a]),t)),{}),n=Object.keys(a).map((e=>capitalizeFirstLetter(e))),r=Object.values(a);reachChartInstance&&reachChartInstance.destroy(),reachChartInstance=new Chart(t,{type:"pie",data:{labels:n,datasets:[{label:"Total Reach",data:r,backgroundColor:["#cccccc","#ffab00","#ffc756","#262a53"],hoverOffset:4}]},options:{responsive:!0,plugins:{legend:{position:"top"},title:{display:!1}}}})}function drawAgeChart3(e){const t=document.getElementById("ageChart").getContext("2d"),a=Object.keys(e),n=Object.values(e);ageChartInstance&&ageChartInstance.destroy(),ageChartInstance=new Chart(t,{type:"bar",data:{labels:a,datasets:[{data:n,backgroundColor:["#ffab00","#ffab00","#ffab00","#ffab00","#ffab00"],borderWidth:1}]},options:{responsive:!0,plugins:{legend:{position:"top",display:!1}},scales:{y:{beginAtZero:!0}}}})}async function fetchRegionData(e){try{const t=await fetch(e);if(!t.ok)throw new Error("Network response was not ok");const a=await t.json();if(a.error)return;let n={};a.data.forEach((e=>{const t=e.region||"Unknown",a=e.reach||0;n[t]||(n[t]=0),n[t]+=a})),drawRegionChart(n)}catch(e){}}function drawRegionChart(e){const t=document.getElementById("regionChart").getContext("2d"),a=Object.keys(e),n=Object.values(e);regionChartInstance&&regionChartInstance.destroy(),regionChartInstance=new Chart(t,{type:"bar",data:{labels:a,datasets:[{data:n,backgroundColor:["#ffab00","#ffab00","#ffab00","#ffab00","#ffab00"],borderWidth:1}]},options:{responsive:!0,plugins:{legend:{position:"top",display:!1}},scales:{y:{beginAtZero:!0}}}})}async function fetchGenderData(e){try{const t=await fetch(e);if(!t.ok)throw new Error("Network response was not ok");const a=await t.json();if(a.error)return;let n={};a.data.forEach((e=>{const t=e.gender||"Unknown",a=e.reach||0;n[t]||(n[t]=0),n[t]+=a})),drawGenderChart(n)}catch(e){}}function drawGenderChart(e){const t=document.getElementById("genderChart").getContext("2d"),a=Object.keys(e).map((e=>capitalizeFirstLetter(e))),n=Object.values(e);genderChartInstance&&genderChartInstance.destroy(),genderChartInstance=new Chart(t,{type:"pie",data:{labels:a,datasets:[{label:"Lượt Reach theo giới tính",data:n,backgroundColor:["#262a53","#ffab00","#cccccc"],hoverOffset:4}]},options:{responsive:!0,plugins:{legend:{position:"top"}}}})}async function fetchDailyInsights(e){document.querySelector(".loading").classList.add("active");try{const t=await fetch(e),a=await t.json();if(a.error)return;let n=[],r=[],o=[],s=[],c=[],d=[];a.data.forEach((e=>{const t=e.date_start,a=parseFloat(e.spend)||0,i=parseFloat(e.reach)||0;let l=0,m=0,u=0;e.actions&&e.actions.forEach((e=>{"onsite_conversion.messaging_conversation_started_7d"===e.action_type&&(l=e.value||0),"post_reaction"===e.action_type&&(m=e.value||0),"like"===e.action_type&&(u=e.value||0)})),n.push(t),r.push(a),o.push(i),s.push(l),c.push(m),d.push(u)})),drawDailyChart(n,r,o,s,c,d),document.querySelector(".loading").classList.remove("active")}catch(e){}}function drawDailyChart(e,t,a,n,r,o){const s=document.getElementById("dailyChart").getContext("2d");dailyChartInstance&&dailyChartInstance.destroy(),dailyChartInstance=new Chart(s,{type:"line",data:{labels:e,datasets:[{label:"Spend",data:t,borderColor:"#FFCE56",backgroundColor:"rgba(255, 206, 86, 0.2)",fill:!0,tension:.2},{label:"Reach",data:a,borderColor:"#FFCE56",backgroundColor:"rgba(255, 206, 86, 0.2)",fill:!0,tension:.2},{label:"Messaging Conversations",data:n,borderColor:"#FFCE56",backgroundColor:"rgba(255, 206, 86, 0.2)",fill:!0,tension:.2},{label:"Post Reactions",data:r,borderColor:"#FFCE56",backgroundColor:"rgba(255, 206, 86, 0.2)",fill:!0,tension:.2},{label:"Page Likes",data:o,borderColor:"#FFCE56",backgroundColor:"rgba(255, 206, 86, 0.2)",fill:!0,tension:.4}]},options:{responsive:!0,plugins:{legend:{position:"top"},title:{display:!1}},scales:{y:{beginAtZero:!0,ticks:{maxTicksLimit:8}}}}})}
