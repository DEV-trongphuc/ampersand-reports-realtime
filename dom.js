const quick_filter=["Haagen Dazs","Snowee","Esta","TRB","BEAN","Le Petit"],brandData={labels:quick_filter,datasets:[{data:[],backgroundColor:["#ffa900db","#ffa900db","#ffa900db","#ffa900db","#ffa900db","#ffa900db"],borderWidth:1}]};let startDateGlobal="",endDateGlobal="",currentChart=null;function drawChart(e){const t=document.getElementById("brandChart").getContext("2d");null!==currentChart&&currentChart.destroy(),currentChart=new Chart(t,{type:"bar",data:e,options:{responsive:!0,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0}}}})}const accessToken="EAAQwS9m6tIABO8ZCZCvO4TtPBXcbilAYn3nwZCZB739B8GtMfy2V2uJmgjHMtvsdKS6XMl7YiBuXqg3BxTdh37H7Vv5qYcsZA7IqVYMLqHX3FhQdxD8fSguISa0sDg1INzOfVtUCt8OoNqh0j6PXvu50rZCgMerGZAJ7NAYgLYuTsPw8NvdOEdF5kRX9C0ctu1ka7CS6VcbbXosWnMM",adAccountId="676599667843841",apiUrl=`https://graph.facebook.com/v16.0/act_${adAccountId}/insights?level=adset&fields=campaign_name,adset_name,spend,impressions,reach,actions&date_preset=this%5fmonth&filtering=[{"field":"spend","operator":"GREATER_THAN","value":0}]&access_token=${accessToken}&limit=100`;let allData=[];async function fetchData(e){const t=localStorage.getItem("query"),a=localStorage.getItem("iview");t||localStorage.setItem("query",quick_filter[0]),a&&dom_main_menu_a[a].classList.add("active"),allData=[];let o=e;const n=document.querySelector(".loading");n&&n.classList.add("active");try{for(;o;){const e=await fetch(o);if(!e.ok)throw new Error(`Network error: ${e.statusText}`);const t=await e.json();if(t.error)return;allData=[...allData,...t.data||[]],o=t.paging&&t.paging.next?t.paging.next:null}"function"==typeof renderTopCampaigns&&renderTopCampaigns(allData);const e=calculateTotals(allData);document.getElementById("total_spend").textContent=formatCurrency(Math.round(e.spend)),document.getElementById("total_reach").textContent=formatNumber(Math.round(e.reach)),document.getElementById("total_reaction").textContent=formatNumber(Math.round(e.reaction)),document.getElementById("total_follows").textContent=formatNumber(Math.round(e.follows));const a=calculateBrandSpending(allData,brandData.labels);brandData.datasets[0].data=a,drawChart(brandData),processData(allData),document.querySelector(".loading").classList.remove("active");localStorage.getItem("quickID")&&t&&renderReportPerformance(localStorage.getItem("query"))}catch(e){}n&&n.classList.remove("active")}const dom_reach_unit=document.getElementById("dom_reach_unit"),dom_reaction_unit=document.getElementById("dom_reaction_unit"),dom_mess_unit=document.getElementById("dom_mess_unit"),dom_like_unit=document.getElementById("dom_like_unit");function processData(e,t){e.length>0?dom_contentarea.classList.remove("no_data"):(dom_contentarea.classList.add("no_data"),dom_not_data.scrollIntoView());let a="";const o=document.querySelector(".dom_detail_tbody ");function n(e,t=0){let a=0,o=0,n=0,r=0,s=0,c=0,i=0,l=0,d=0,m=0;e.forEach((e=>{a+=parseFloat(e.querySelector(".spend").dataset.value)||0,o+=parseInt(e.querySelector(".reach").dataset.value)||0,i+=parseInt(e.querySelector(".result").dataset.value)||0,n+=parseInt(e.querySelector(".impressions").dataset.value)||0,r+=parseInt(e.querySelector(".engagement").dataset.value)||0,s+=parseInt(e.querySelector(".postReaction").dataset.value)||0,c+=parseInt(e.querySelector(".follows").dataset.value)||0,l+=parseInt(e.querySelector(".comments").dataset.value)||0,d+=parseInt(e.querySelector(".linkClick").dataset.value)||0,m+=parseInt(e.querySelector(".messengerStart").dataset.value)||0}));const u=`\n        <tr>\n          <td class="dom_selected_total" colspan="3">\n            ${t>0?`TOTAL x${t} adsets`:"TOTAL ALL ADSETS"}\n          </td>\n          <td>${formatCurrency(a)}</td>\n          <td>${formatNumber(o)}</td>\n          <td>${formatNumber(n)}</td>\n          <td>${formatNumber(i)}</td>\n          <td>${i?formatCurrency(Math.floor(a/i)):"-"}</td>\n          <td>${formatNumber(c)}</td>\n          <td>${formatNumber(s)}</td>\n          <td>${formatNumber(m)}</td>\n          <td>${formatNumber(0)}</td>\n          <td>-</td>\n          <td>${formatNumber(r)}</td>\n          <td>${formatNumber(l)}</td>\n          <td>${formatNumber(d)}</td>\n        </tr>\n      `;document.querySelector("tfoot").innerHTML=u;if(document.querySelector("#dom_contentarea.viewPerformance")){const e=document.getElementById("total_spend_viewPerformance"),t=document.getElementById("total_reaction_viewPerformance"),n=document.getElementById("total_engagement_viewPerformance"),i=document.getElementById("total_reach_viewPerformance"),u=document.getElementById("total_messenger_viewPerformance"),g=document.getElementById("total_follows_viewPerformance"),p=document.getElementById("total_comment_viewPerformance"),f=document.getElementById("total_link_viewPerformance");e.innerText=formatCurrency(a),i.innerText=formatNumber(o),u.innerText=formatNumber(m),g.innerText=formatNumber(c),t.innerText=formatNumber(s),n.innerText=formatNumber(r),p.innerText=formatNumber(l),f.innerText=formatNumber(d)}}document.addEventListener("change",(e=>{if("checkbox"===e.target.type){const t=e.target.closest("tr");e.target.checked?t.classList.add("checked"):t.classList.remove("checked");const a=Array.from(document.querySelectorAll("tr.checked"));if(a.length>0)n(a,a.length);else{n(Array.from(document.querySelectorAll("tbody tr")))}}}));let r=0,s=0,c=0,i=0,l=0,d=0,m=0,u=0,g=0,p=0,f=0;e.forEach((e=>{const o=parseFloat(e.spend)||0;if(o>0){const n=e.reach||0,_=e.impressions||0,h=getValueFromActions(e.actions,"post_engagement")||0,y=getValueFromActions(e.actions,"post_reaction")||0,v=getValueFromActions(e.actions,"like")||0,b=getValueFromActions(e.actions,"lead")||0,w=getValueFromActions(e.actions,"comment")||0,C=getValueFromActions(e.actions,"link_click")||0,k=getValueFromActions(e.actions,"onsite_conversion.messaging_conversation_started_7d")||0;"true"===t&&(e.campaign_name.toLowerCase().includes("awareness")&&(r+=parseFloat(e.spend)||0,s+=parseInt(e.reach)||0),e.campaign_name.toLowerCase().includes("traffic")&&(u+=parseFloat(e.spend)||0),e.campaign_name.toLowerCase().includes("engagement")&&(c+=parseFloat(e.spend)||0,i+=getValueFromActions(e.actions,"post_reaction")||0),e.campaign_name.toLowerCase().includes("message")&&(l+=o,d+=getValueFromActions(e.actions,"onsite_conversion.messaging_conversation_started_7d")||0),e.campaign_name.toLowerCase().includes("likepage")&&(m+=o,g+=getValueFromActions(e.actions,"like")||0),e.campaign_name.toLowerCase().includes("lead")&&(p+=o,f+=getValueFromActions(e.actions,"lead")||0));let D=0;e.campaign_name.toLowerCase().includes("engagement")&&(D=parseInt(y)),e.campaign_name.toLowerCase().includes("awareness")&&(D=parseInt(n)),e.campaign_name.toLowerCase().includes("traffic")&&(D=parseInt(C)),e.campaign_name.toLowerCase().includes("lead")&&(D=parseInt(b)),e.campaign_name.toLowerCase().includes("message")&&(D=parseInt(k)),e.campaign_name.toLowerCase().includes("likepage")&&(D=parseInt(v));let S=D>0?Math.round(o/D):"-";e.campaign_name.toLowerCase().includes("awareness")&&(S=D>0?(o/D).toFixed(1):"-");const I=_>0?Math.round(o/_*1e3):0,L=formatCurrency(S),q=formatCurrency(I),A=formatNumber(h);a+=`\n            <tr>\n              <td><input type="checkbox"></td>\n              <td>${e.campaign_name}</td>\n              <td>${e.adset_name}</td>\n              <td class="spend" data-value="${o}">${formatCurrency(o)}</td>\n              <td class="reach" data-value="${n}">${formatNumber(n)}</td>\n              <td class="impressions" data-value="${_}">${formatNumber(_)}</td>\n              <td class="result" data-value="${D}">${D>0?formatNumber(D):"-"}</td>\n              <td class="costPerResult" data-value="${S}">${L}</td>\n    <td class="follows" data-value="${v}">${formatNumber(v)}</td>\n       <td class="postReaction" data-value="${y}">${formatNumber(y)}</td>\n              <td class="messengerStart" data-value="${k}">${formatNumber(k)}</td>\n              <td class="lead" data-value="${b}">${formatNumber(b)}</td>\n              <td class="cpm" data-value="${I}">${q}</td>\n              <td class="engagement" data-value="${h}">${A}</td>\n              <td class="comments" data-value="${w}">${formatNumber(w)}</td>\n              <td class="linkClick" data-value="${C}">${formatNumber(C)}</td>\n            </tr>\n          `}})),"true"===t&&(updateProgressBar(r,c,m,l,u),dom_reach_unit.innerText=s>0?formatCurrency((r/s).toFixed(1)):"-",dom_reaction_unit.innerText=i>0?formatCurrency((c/i).toFixed(0)):"-",dom_mess_unit.innerText=d>0?formatCurrency((l/d).toFixed(0)):"-",dom_like_unit.innerText=m>0?formatCurrency((m/g).toFixed(0)):"-"),o.innerHTML=a;n(Array.from(document.querySelectorAll("tbody tr")))}function sortTableBySpend(){const e=document.querySelector("tbody"),t=Array.from(e.querySelectorAll("tr"));t.sort(((e,t)=>{const a=parseFloat(e.querySelector(".spend").dataset.value)||0;return(parseFloat(t.querySelector(".spend").dataset.value)||0)-a})),e.innerHTML="",t.forEach((t=>e.appendChild(t)))}let impressionDoughnutChart;const dom_main_menu_a=document.querySelectorAll(".dom_main_menu li a"),dom_contentarea=document.querySelector("#dom_contentarea");document.getElementById("dom_detail_find").addEventListener("click",(function(){const e=document.getElementById("dom_detail_input").value.toLowerCase().trim();clearFilter(),dom_contentarea.classList.remove("viewPerformance"),filterData(e)}));const dom_not_data=document.querySelector(".dom_not_data");function clearFilter(){const e=document.querySelector(".dom_quick_filter a.active");e&&e.classList.remove("active"),localStorage.removeItem("quickID")}function filterData(e,t=""){e=e.toLowerCase(),t=t.toLowerCase(),processData(allData.filter((a=>{const o=a.campaign_name.toLowerCase().includes(e),n=!t||a.adset_name.toLowerCase()===t;return o&&n})),"true")}function formatStatus(e){return e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()}function formatCurrency(e){return"-"===e?"-":new Intl.NumberFormat("vi-VN").format(e)+" ₫"}function formatNumber(e){return"-"===e?"-":new Intl.NumberFormat("de-DE").format(e)}function getValueFromActions(e,t){if(!e)return 0;const a=e.find((e=>e.action_type===t));return a?1*a.value:0}function calculateBrandSpending(e,t){const a=t.map((()=>0));return e.forEach((e=>{const o=e.campaign_name?.toLowerCase()||"",n=parseFloat(e.spend||0);t.forEach(((e,t)=>{o.includes(e.toLowerCase())&&(a[t]+=n)}))})),a}function calculateTotals(e){const t={spend:0,reach:0,reaction:0,follows:0,lead:0};return e.forEach((e=>{t.spend+=parseFloat(e.spend||0),t.reach+=parseInt(e.reach||0),t.reaction+=parseInt(getValueFromActions(e.actions,"post_reaction")||0),t.follows+=parseInt(getValueFromActions(e.actions,"like")||0),t.lead+=parseInt(getValueFromActions(e.actions,"lead")||0)})),t}function renderTopCampaigns(e){const t=e.reduce(((e,t)=>{const a=t.campaign_name||"Unknown Campaign",o=parseFloat(t.spend)||0,n=e.find((e=>e.name===a));return n?n.spend+=o:e.push({name:a,spend:o}),e}),[]);t.sort(((e,t)=>t.spend-e.spend));const a=document.querySelector(".dom_chart_most_ul");a.innerHTML="",t.forEach((e=>{const t=document.createElement("li");t.innerHTML=`<span>${e.name}</span> <span>${formatCurrency(e.spend)}</span>`,a.appendChild(t)}))}fetchData(apiUrl);const dom_choose_day=document.querySelector(".dom_choose_day"),dom_choosed=document.querySelector(".dom_choosed"),dom_choosed_day=document.querySelector(".dom_choosed_day");dom_choose_day.addEventListener("click",(function(e){dom_choose_day.querySelector("li:last-child").contains(e.target)||dom_choose_day.classList.toggle("active")})),dom_choosed_day.addEventListener("click",(function(e){dom_choose_day.classList.toggle("active")}));let preset="this%5fmonth";const itemDate=document.querySelectorAll(".dom_choose_day li"),radio_choose_date=document.querySelectorAll(".dom_choose_day li .radio_box");function formatDate(e){const t=new Date(e);return`${t.getDate().toString().padStart(2,"0")}/${(t.getMonth()+1).toString().padStart(2,"0")}/${t.getFullYear()}`}function getFormattedDateRange(e){const t=new Date;let a,o;switch(e){case"today":a=o=t;break;case"yesterday":a=new Date,a.setDate(t.getDate()-1),o=a;break;case"last%5f3d":a=new Date,a.setDate(t.getDate()-3),o=new Date,o.setDate(t.getDate()-1);break;case"last%5f7d":a=new Date,a.setDate(t.getDate()-7),o=new Date,o.setDate(t.getDate()-1);break;case"last%5f30d":a=new Date,a.setDate(t.getDate()-30),o=new Date,o.setDate(t.getDate()-1);break;case"this%5fmonth":a=new Date(t.getFullYear(),t.getMonth(),1),o=t;break;case"last%5fmonth":a=new Date(t.getFullYear(),t.getMonth()-1,1),o=new Date(t.getFullYear(),t.getMonth(),0);break;case"this%5fweek%5fmon%5ftoday":const e=t.getDay(),n=0===e?6:e-1;a=new Date(t),a.setDate(t.getDate()-n),o=t;break;case"last%5fweek%5fmon%5fsun":const r=new Date(t);r.setDate(t.getDate()-(t.getDay()+6)),a=r;const s=new Date(t);s.setDate(t.getDate()-(t.getDay()+0)),o=s;break;case"this%5fquarter":a=new Date(t.getFullYear(),3*Math.floor(t.getMonth()/3),1),o=t;break;case"last%5fquarter":const c=new Date(t.getFullYear(),3*Math.floor(t.getMonth()/3),0);a=new Date(t.getFullYear(),3*Math.floor(t.getMonth()/3)-3,1),o=c;break;default:return""}return a.getTime()===o.getTime()?formatDate(a):`${formatDate(a)} - ${formatDate(o)}`}radio_choose_date[7].classList.add("active"),itemDate.forEach(((e,t)=>{e.addEventListener("click",(()=>{if(e.dataset.date!=preset&&t<itemDate.length-1){const a=localStorage.getItem("query");dom_view_campaign.innerText="Data for all campaigns";const o=document.querySelector(".view_adset.active");o&&o.classList.remove("active"),renderReportPerformance(a),startDateGlobal="",endDateGlobal="";const n=document.querySelector(".dom_choose_day li .radio_box.active");n&&n.classList.remove("active"),radio_choose_date[t].classList.add("active"),dom_choosed.innerText=e.innerText;const r=e.getAttribute("data-date"),s=getFormattedDateRange(r);dom_choosed_day.innerText=s;const c=`https://graph.facebook.com/v16.0/act_${adAccountId}/insights?level=adset&fields=campaign_name,adset_name,spend,impressions,reach,actions&date_preset=${r}&filtering=[{"field":"spend","operator":"GREATER_THAN","value":0}]&access_token=${accessToken}&limit=100`;preset=r,fetchData(c)}}))})),document.querySelector(".apply_custom_date").addEventListener("click",(function(){const e=localStorage.getItem("query");dom_view_campaign.innerText="Data for all campaigns";const t=document.querySelector(".view_adset.active");t&&t.classList.remove("active"),renderReportPerformance(e);const a=document.getElementById("start").value,o=document.getElementById("end").value;if(startDateGlobal=a,endDateGlobal=o,!a||!o)return void alert("Please select both start and end dates.");if(new Date(a)>new Date(o))return void alert("Start date cannot be later than the end date.");const n=`https://graph.facebook.com/v16.0/act_${adAccountId}/insights?level=adset&fields=campaign_name,adset_name,spend,impressions,reach,actions&time_range={"since":"${a}","until":"${o}"}&filtering=[{"field":"spend","operator":"GREATER_THAN","value":0}]&access_token=${accessToken}&limit=100`;preset=null,fetchData(n),dom_choose_day.classList.remove("active"),dom_choosed_day.innerText=`${formatDate(a)} - ${formatDate(o)}`,dom_choosed.innerText="Custom time range"})),dom_choosed_day.innerText=getFormattedDateRange(preset);const dom_quick_filter=document.querySelector(".dom_quick_filter"),dom_table_data=document.querySelector(".dom_table_data");quick_filter.forEach((e=>{const t=document.createElement("li");t.innerHTML=`\n      <a class="" data-quick="${e}">\n        <i class="fa-solid fa-bolt"></i> <span>${e}</span>\n      </a>\n    `,dom_quick_filter.appendChild(t)}));const filterItems=document.querySelectorAll(".dom_quick_filter a");function createApiUrl(e,t,a,o,n){return startDateGlobal&&endDateGlobal?`https://graph.facebook.com/v16.0/act_${t}/insights?fields=${e}&filtering=${a}&time_range={"since":"${startDateGlobal}","until":"${endDateGlobal}"}&access_token=${n}`:`https://graph.facebook.com/v16.0/act_${t}/insights?fields=${e}&filtering=${a}&date_preset=${o}&access_token=${n}`}const dom_view_campaign=document.querySelector(".dom_view_campaign"),daily_title=document.querySelector(".daily_title"),view_adset=document.querySelector(".view_adset");function renderReportPerformance(e,t=""){renderTitleReport();const a=document.querySelector(".dom_title_report h2"),o=localStorage.getItem("iview"),n=localStorage.getItem("query"),r=document.querySelector(".dom_quick_filter a.active");r&&r.classList.remove("active"),a.innerText=`Report for ${n}`,o&&dom_main_menu_a[1*o].click(),daily_title.innerText=`Daily Line Chart - ${e}`;let s=JSON.stringify([{field:"campaign.name",operator:"CONTAIN",value:e},{field:"spend",operator:"GREATER_THAN",value:0}]);t&&(s=JSON.stringify([{field:"campaign.name",operator:"CONTAIN",value:e},{field:"spend",operator:"GREATER_THAN",value:0},{field:"adset.name",operator:"EQUAL",value:t}]));const c={platform:createApiUrl("campaign_name,reach&breakdowns=publisher_platform",adAccountId,s,preset,accessToken),age:createApiUrl("campaign_name,reach&breakdowns=age,gender",adAccountId,s,preset,accessToken),region:createApiUrl("campaign_name,reach&breakdowns=region",adAccountId,s,preset,accessToken),gender:createApiUrl("campaign_name,reach&breakdowns=gender",adAccountId,s,preset,accessToken),daily:createApiUrl("spend,reach,actions,date_start&time_increment=1",adAccountId,s,preset,accessToken),device:createApiUrl("campaign_name,impressions&breakdowns=impression_device",adAccountId,s,preset,accessToken),hourly:createApiUrl("campaign_name,impressions,spend&breakdowns=hourly_stats_aggregated_by_advertiser_time_zone",adAccountId,s,preset,accessToken)};fetchDataFlat(c.platform),fetchDataAge(c.age),fetchRegionData(c.region),fetchGenderData(c.gender),fetchDailyInsights(c.daily),fetchImpressionData(c.device),fetchHourlyData(c.hourly);filterData(localStorage.getItem("iview")?e.toLowerCase():"")}function viewDemographic(){dom_contentarea.classList.add("viewDemographic"),dom_contentarea.classList.remove("viewPerformance")}function viewPerformance(){dom_contentarea.classList.add("viewPerformance"),dom_contentarea.classList.remove("viewDemographic")}async function fetchDataAge(e){try{let t=[],a=e;for(;a;){const e=await fetch(a);if(!e.ok)throw new Error("Network response was not ok");const o=await e.json();if(o.error)return;t=[...t,...o.data],a=o.paging&&o.paging.next?o.paging.next:null}let o={};t.forEach((e=>{const t=e.age||"Unknown",a=e.gender||"Unknown",n=e.reach||0,r=`${t}_${a}`;o[r]||(o[r]=0),o[r]+=n}));const n=[...new Set(t.map((e=>e.age)))].sort(),r=n.map((e=>o[`${e}_male`]||0)),s=n.map((e=>o[`${e}_female`]||0));drawAgeGenderChart(n,r,s)}catch(e){}}async function fetchDataFlat(e){try{let t=[],a=e;for(;a;){const e=await fetch(a);if(!e.ok)throw new Error("Network response was not ok");const o=await e.json();if(o.error)return;t=[...t,...o.data],a=o.paging&&o.paging.next?o.paging.next:null}let o={};t.forEach((e=>{const t=e.publisher_platform||"Unknown",a=e.reach||0;o[t]||(o[t]=0),o[t]+=a})),drawChart2(o)}catch(e){}}function capitalizeFirstLetter(e){return e.replace(/\b\w/g,(e=>e.toUpperCase()))}filterItems.forEach(((e,t)=>{e.addEventListener("click",(()=>{e.classList.add("active");document.querySelectorAll(".dom_quick_filter li a").forEach((e=>e.classList.remove("active")));const a=document.querySelector(".view_adset.active");a&&a.classList.remove("active");const o=localStorage.getItem("iview");o?dom_main_menu_a[1*o].click():dom_main_menu_a[0].click();if(localStorage.getItem("quickID")!=t){localStorage.setItem("quickID",t);const a=e.dataset.quick;localStorage.setItem("query",a),dom_view_campaign.innerText="Data for all campaigns",renderReportPerformance(a,"")}}))})),dom_main_menu_a.forEach(((e,t)=>{e.addEventListener("click",(()=>{document.querySelector(".dom_main_menu li a.active")?.classList.remove("active"),e.classList.add("active");if([()=>{processData(allData),dom_contentarea.classList.remove("viewPerformance","viewDemographic"),localStorage.removeItem("iview");document.querySelector(".dom_quick_filter a.active").classList.remove("active")},viewPerformance,viewDemographic][t]?.(),0!=t){localStorage.setItem("iview",t);const e=localStorage.getItem("quickID"),a=localStorage.getItem("iview");document.querySelector(".dom_quick_filter a.active")||e||!a?filterItems[1*e].classList.add("active"):(filterItems[0].classList.add("active"),renderReportPerformance(quick_filter[0]),localStorage.setItem("quickID","0"));const o=document.querySelector(".dom_view_campaign"),n=document.querySelector(".dom_view_campaign.adset"),r=o?.innerText||"",s=n?.innerText||"",c=localStorage.getItem("query")||"";filterData("Data for all campaigns"===r?c:r,"Data for all adsets"!==s?s:"")}}))}));let ageGenderChartInstance,regionChartInstance,genderChartInstance,dailyChartInstance,reachChartInstance=null;function drawChart2(e){const t=document.getElementById("reachChart").getContext("2d"),a=["audience_network","facebook","instagram","messenger"].reduce(((t,a)=>(e[a]&&(t[a]=e[a]),t)),{}),o=Object.keys(a).map((e=>capitalizeFirstLetter(e))),n=Object.values(a);reachChartInstance&&reachChartInstance.destroy(),reachChartInstance=new Chart(t,{type:"pie",data:{labels:o,datasets:[{label:"Total Reach",data:n,backgroundColor:["#262a53","#ffab00","#cccccc","#ffc756"],hoverOffset:4}]},options:{responsive:!0,plugins:{legend:{position:"bottom",align:"center",labels:{boxWidth:20,padding:15,maxWidth:200,usePointStyle:!0}},title:{display:!1}}}})}async function fetchRegionData(e){try{let t=[],a=e;for(;a;){const e=await fetch(a);if(!e.ok)throw new Error("Network response was not ok");const o=await e.json();if(o.error)return;t=[...t,...o.data],a=o.paging&&o.paging.next?o.paging.next:null}let o={};t.forEach((e=>{const t=e.region||"Unknown",a=e.reach||0;o[t]||(o[t]=0),o[t]+=a})),drawRegionChart(o)}catch(e){}}function drawAgeGenderChart(e,t,a){const o=document.getElementById("ageGenderChart").getContext("2d");ageGenderChartInstance&&ageGenderChartInstance.destroy(),ageGenderChartInstance=new Chart(o,{type:"bar",data:{labels:e,datasets:[{label:"Male",data:t,backgroundColor:"#202449ed",borderColor:"#262a53",borderWidth:1},{label:"Female",data:a,backgroundColor:"#ffab00e3",borderColor:"#ffab00",borderWidth:1}]},options:{responsive:!0,plugins:{legend:{position:"top"},title:{display:!1}},scales:{x:{stacked:!1},y:{beginAtZero:!0}}}})}function drawRegionChart(e){const t=document.getElementById("regionChart").getContext("2d"),a=.015*Object.values(e).reduce(((e,t)=>e+1*t),0),o=Object.entries(e).filter((([,e])=>e>=a));if(0===o.length)return;const n=o.map((([e])=>e)),r=o.map((([,e])=>e));regionChartInstance&&regionChartInstance.destroy(),regionChartInstance=new Chart(t,{type:"bar",data:{labels:n,datasets:[{data:r,backgroundColor:["#ffab00","#ffab00","#ffab00","#ffab00","#ffab00"],borderWidth:1}]},options:{responsive:!0,plugins:{legend:{position:"top",display:!1}},scales:{y:{beginAtZero:!0}}}})}async function fetchGenderData(e){try{let t=[],a=e;for(;a;){const e=await fetch(a);if(!e.ok)throw new Error("Network response was not ok");const o=await e.json();if(o.error)return;t=[...t,...o.data],a=o.paging&&o.paging.next?o.paging.next:null}let o={};t.forEach((e=>{const t=e.gender||"Unknown",a=e.reach||0;o[t]||(o[t]=0),o[t]+=a})),drawGenderChart(o)}catch(e){}}function drawGenderChart(e){const t=document.getElementById("genderChart").getContext("2d"),a=Object.keys(e).map((e=>capitalizeFirstLetter(e))),o=Object.values(e);genderChartInstance&&genderChartInstance.destroy(),genderChartInstance=new Chart(t,{type:"pie",data:{labels:a,datasets:[{label:"Lượt Reach theo giới tính",data:o,backgroundColor:["#ffab00","#262a53","#cccccc"],hoverOffset:4}]},options:{responsive:!0,plugins:{legend:{position:"bottom",align:"center",labels:{boxWidth:20,padding:15,maxWidth:200,usePointStyle:!0}}}}})}const view_selected=document.querySelector(".view_selected"),dom_select_view=document.querySelector(".dom_select_view"),dom_select_li=document.querySelectorAll(".dom_select_view ul li");let allDatasets=[];function updateChart(e){if(dailyChartInstance){const t=allDatasets.filter((t=>t.label===e));t.length>0&&(dailyChartInstance.data.datasets=t,dailyChartInstance.update())}}function drawDailyChart(e,t,a,o,n,r,s,c){const i=document.getElementById("dailyChart").getContext("2d"),l=i.createLinearGradient(0,0,0,400);l.addColorStop(0,"rgba(255, 171, 0,0.7)"),l.addColorStop(1,"rgba(255, 171, 0, 0.1)"),dailyChartInstance&&dailyChartInstance.destroy(),allDatasets=[{label:"Post Engagement",data:s,backgroundColor:l,borderColor:"rgba(255, 171, 0, 1)",fill:!0,tension:.2},{label:"Link Click",data:c,backgroundColor:l,borderColor:"rgba(255, 171, 0, 1)",fill:!0,tension:.2},{label:"Spend",data:t,backgroundColor:l,borderColor:"rgba(255, 171, 0, 1)",fill:!0,tension:.2},{label:"Reach",data:a,backgroundColor:l,borderColor:"rgba(255, 171, 0, 1)",fill:!0,tension:.2},{label:"Messaging Conversations",data:o,backgroundColor:l,borderColor:"rgba(255, 171, 0, 1)",fill:!0,tension:.2},{label:"Post Reactions",data:n,backgroundColor:l,borderColor:"rgba(255, 171, 0, 1)",fill:!0,tension:.2},{label:"Page Likes",data:r,backgroundColor:l,borderColor:"rgba(255, 171, 0, 1)",fill:!0,tension:.2}],dailyChartInstance=new Chart(i,{type:"line",data:{labels:e,datasets:allDatasets.filter((e=>"Spend"===e.label))},options:{responsive:!0,plugins:{legend:{position:"top",display:!1}},scales:{y:{beginAtZero:!0}}}})}async function fetchImpressionData(e){try{const t=await fetch(e),a=await t.json();if(!a.data||!Array.isArray(a.data))return;drawDoughnutChart(a.data.reduce(((e,t)=>{const a=t.impression_device,o=parseInt(t.impressions,10);return e[a]=(e[a]||0)+o,e}),{}))}catch(e){}}dom_select_view.addEventListener("click",(()=>{dom_select_view.classList.toggle("active")})),dom_select_li.forEach((e=>{e.addEventListener("click",(function(){const e=this.getAttribute("data-view");view_selected.innerText=e,updateChart(e)}))}));const formatLabel=e=>e.split("_").map((e=>e.charAt(0).toUpperCase()+e.slice(1))).join(" "),deviceColors={android_smartphone:"#262a53",android_tablet:"#66b3ff",desktop:"#99ff99",ipad:"#ffcc99",iphone:"#ffab00",other:"#c2f0c2"};function drawDoughnutChart(e){impressionDoughnutChart&&impressionDoughnutChart.destroy();const t=document.getElementById("impressionDoughnutChart")?.getContext("2d");if(!t)return;const a=Object.keys(e).map((e=>deviceColors[e]||"#999999"));impressionDoughnutChart=new Chart(t,{type:"bar",data:{labels:Object.keys(e).map(formatLabel),datasets:[{label:"Impressions",data:Object.values(e),backgroundColor:a,borderWidth:0}]},options:{responsive:!0,plugins:{legend:{position:"bottom",align:"center",display:!1}}}})}async function fetchDailyInsights(e){document.querySelector(".loading").classList.add("active");try{let t=[],a=e;for(;a;){const e=await fetch(a);if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);const o=await e.json();if(!o||"object"!=typeof o)throw new Error("Invalid API response format");if(!o.hasOwnProperty("data"))throw new Error("Response does not contain 'data'");if(o.error)return;if(!Array.isArray(o.data))break;t=[...t,...o.data],a=o.paging?.next||null}if(0===t.length)return;let o=[],n=[],r=[],s=[],c=[],i=[],l=[],d=[];if(t.forEach((e=>{const t=e?.date_start||"Unknown Date",a=parseFloat(e?.spend)||0,m=parseFloat(e?.reach)||0;let u=0,g=0,p=0,f=0,_=0;e.actions&&Array.isArray(e.actions)&&e.actions.forEach((e=>{"onsite_conversion.messaging_conversation_started_7d"===e?.action_type&&(u=e?.value||0),"post_reaction"===e?.action_type&&(g=e?.value||0),"like"===e?.action_type&&(p=e?.value||0),"post_engagement"===e?.action_type&&(f=e?.value||0),"link_click"===e?.action_type&&(_=e?.value||0)})),o.push(t),n.push(a),r.push(m),s.push(u),c.push(g),i.push(p),l.push(f),d.push(_)})),0===o.length)return;drawDailyChart(o,n,r,s,c,i,l,d),document.querySelector(".loading").classList.remove("active")}catch(e){document.querySelector(".loading").classList.remove("active")}}const downloadButtons=document.querySelectorAll(".download_btn");function downloadElementAsPNG(e,t){const a=document.getElementById(e);html2canvas(a).then((e=>{const a=document.createElement("a");a.href=e.toDataURL("image/png"),a.download=t,a.click()}))}downloadButtons.forEach((e=>{e.addEventListener("click",(()=>{const t=e.getAttribute("data-id");let a=e.getAttribute("data-name")||"screenshot.png";const o=localStorage.getItem("query");o&&(a=`${a} - ${o}`),downloadElementAsPNG(t,`${a}.png`)}))}));const dom_bar=document.querySelector(".dom_bar"),dom_bar_close=document.querySelector(".dom_bar_close"),dom_zoom=document.querySelector(".dom_zoom"),dom_sidebar=document.querySelector("#dom_sidebar");dom_bar.addEventListener("click",(()=>{dom_sidebar.classList.add("active")})),dom_bar_close.addEventListener("click",(()=>{dom_sidebar.classList.toggle("active")})),dom_sidebar.addEventListener("click",(()=>{dom_sidebar.classList.remove("active")})),dom_zoom.addEventListener("click",(()=>{dom_sidebar.classList.toggle("zoom"),dom_contentarea.classList.toggle("zoom")}));const segment_legend=document.querySelector(".segment_legend"),progressBar=document.querySelector(".progress-bar");function updateProgressBar(e,t,a,o,n){const r=e+t+a+o+n,s=["#ffa900","rgb(180, 123, 0)","rgb(116, 79, 0)","rgb(57, 39, 0)","rgb(127, 127, 127)","#ffae00"],c=[{name:"reach",value:e/r*100},{name:"engagement",value:t/r*100},{name:"likepage",value:a/r*100},{name:"traffic",value:n/r*100},{name:"message",value:o/r*100}];let i=[],l=0;progressBar.innerHTML="",c.forEach((({name:e,value:t})=>{if(t>0){const a=document.createElement("div");a.classList.add("segment"),a.style.width=`${t}%`,a.style.backgroundColor=s[l],progressBar.appendChild(a),i.push(`${e.charAt(0).toUpperCase()+e.slice(1)}: <b>${t.toFixed(0)}%</b>`),l++}})),segment_legend.innerHTML=i.join(" | ")}const dom_title_report_list=document.querySelector(".dom_title_report_list > div");function filterCampaignQuery(){let e=localStorage.getItem("query")?.toLowerCase()||"";const t=allData.filter((t=>t.campaign_name.toLowerCase().includes(e)));return["Data for all campaigns",...new Set(t.map((e=>e.campaign_name)))]}function filterAdsetByCampaign(e){let t=["Data for all adsets"];if(e&&"Data for all campaign"!==e){const a=allData.filter((t=>t.campaign_name.toLowerCase()===e.toLowerCase()));t=[...t,...new Set(a.map((e=>e.adset_name)))]}else t=[...t,...new Set(allData.map((e=>e.adset_name)))];return t}const viewAdsetUl=document.querySelector(".view_adset ul"),viewAdsetTitle=document.querySelector(".dom_view_campaign.adset"),viewAdsetUlList=document.querySelector(".view_adset .dom_title_report_list > div");function renderTitleReport(){const e=filterCampaignQuery(),t=document.querySelector(".dom_title_report_list  ul");let a="";e.forEach(((e,t)=>{a+=`\n    <li data-campaign="${e}"><span class="radio_box"></span> <span>${e}</span></li>\n    `})),t.innerHTML=a;document.querySelectorAll(".dom_title_report_list.campaign  ul li").forEach(((e,t)=>{const a=document.querySelector(".dom_view_campaign")?.innerText||"";document.querySelectorAll(".dom_title_report_list.campaign ul li").forEach((e=>{const t=e.querySelector(".radio_box");e.innerText.trim()===a?t?.classList.add("active"):t?.classList.remove("active")})),e.addEventListener("click",(()=>{let a=localStorage.getItem("query")||"";const o=document.querySelector(".dom_view_campaign");if(e.dataset.campaign!=o.innerText)if(t>0){const a=e.dataset.campaign;dom_view_campaign.innerText=a,renderReportPerformance(a),view_adset.classList.add("active"),viewAdset(a,t)}else dom_view_campaign.innerText="Data for all campaigns",renderReportPerformance(a),view_adset.classList.remove("active")}))}))}function viewAdset(e,t){const a=document.querySelector(".dom_title_report_list.campaign  ul li .radio_box.active");a&&a.classList.remove("active");const o=document.querySelectorAll(".dom_title_report_list.campaign  ul li .radio_box"),n=filterAdsetByCampaign(e);viewAdsetTitle.innerText=n[0];let r="";n.forEach(((e,t)=>{r+=`\n    <li data-adsetname="${t>0?e:""}"><span class="radio_box"></span> <span>${e}</span></li>\n    `})),viewAdsetUl.innerHTML=r;document.querySelectorAll(".view_adset ul li").forEach(((t,a)=>{t.addEventListener("click",(()=>{let o=t.innerText;o!=viewAdsetTitle.innerText&&(a>0?(renderReportPerformance(e,o),filterData(e,o)):(renderReportPerformance(e),filterData(e)),viewAdsetTitle.innerText=o)}))})),o[t].classList.add("active")}function filterUniqueCampaigns(e){const t=new Map;return e.forEach((e=>{const a=e.campaign_name.toLowerCase();t.has(a)||t.set(a,e.campaign_name)})),Array.from(t.values())}async function fetchHourlyData(e){try{const t=await fetch(e);processHourlyData((await t.json()).data)}catch(e){}}function processHourlyData(e){const t=[],a=[],o=[];e.forEach((e=>{const n=e.hourly_stats_aggregated_by_advertiser_time_zone.split(":")[0];t.push(1*n+"h"),a.push(e.impressions),o.push(e.spend)})),drawHourlyChart(t,a,o)}function drawHourlyChart(e,t,a){const o=document.getElementById("hourlyChart").getContext("2d"),n=o.createLinearGradient(0,0,0,400);n.addColorStop(0,"rgba(48, 51, 86, 0.7)"),n.addColorStop(1,"rgba(48, 51, 86, 0.1)");const r=o.createLinearGradient(0,0,0,400);r.addColorStop(0,"rgba(255, 171, 0,0.7)"),r.addColorStop(1,"rgba(255, 171, 0, 0.1)"),window.hourlyChartInstance&&window.hourlyChartInstance.destroy(),window.hourlyChartInstance=new Chart(o,{type:"line",data:{labels:e,datasets:[{label:"Impressions",data:t,backgroundColor:n,borderColor:"rgba(48, 51, 86, 1)",borderWidth:2,tension:.3,fill:!0},{label:"Spend",data:a,backgroundColor:r,borderColor:"rgba(255, 171, 0, 1)",borderWidth:2,tension:.3,fill:!0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"}},scales:{x:{title:{display:!1,text:"Giờ trong ngày"},ticks:{min:0,max:23,stepSize:1}},y:{beginAtZero:!0,title:{display:!1,text:"Số lượng"}}}}})}viewAdsetUlList.addEventListener("click",(()=>{viewAdsetUlList.classList.toggle("active")})),document.querySelectorAll(".dom_title_report_list.campaign > div").forEach((e=>{e.addEventListener("click",(()=>{document.querySelectorAll(".dom_title_report_list.adset > div.active").forEach((e=>e.classList.remove("active")))}))})),document.querySelectorAll(".dom_title_report_list.adset > div").forEach((e=>{e.addEventListener("click",(()=>{document.querySelectorAll(".dom_title_report_list.campaign > div.active").forEach((e=>e.classList.remove("active")))}))})),dom_title_report_list.addEventListener("click",(()=>{dom_title_report_list.classList.toggle("active")}));const fixapp=document.querySelector("#fixapp");fixapp.addEventListener("click",(()=>{localStorage.clear(),location.reload()}));
