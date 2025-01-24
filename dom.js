const brandData = {
  labels: ["Haagen Dazs", "Snowee", "Esta", "TRB", "BEAN", "Le Petit"],
  datasets: [
    {
      data: [5000000, 3200000, 4500000, 7000000, 2500000, 6000000],
      backgroundColor: [
        "#ffaa00a9",
        "#ffaa00a9",
        "#ffaa00a9",
        "#ffaa00a9",
        "#ffaa00a9",
        "#ffaa00a9",
      ],
      borderWidth: 1,
    },
  ],
};
let currentChart = null; // Biến lưu trữ đối tượng biểu đồ hiện tại

// Hàm để vẽ lại biểu đồ
function drawChart(data) {
  const ctx = document.getElementById("brandChart").getContext("2d");

  // Nếu biểu đồ hiện tại đã tồn tại, hủy bỏ nó
  if (currentChart !== null) {
    currentChart.destroy(); // Hủy biểu đồ cũ trước khi vẽ lại
  }

  // Tạo biểu đồ mới
  currentChart = new Chart(ctx, {
    type: "bar",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// ___________________
const accessToken =
  "EAAQwS9m6tIABO8ZCZCvO4TtPBXcbilAYn3nwZCZB739B8GtMfy2V2uJmgjHMtvsdKS6XMl7YiBuXqg3BxTdh37H7Vv5qYcsZA7IqVYMLqHX3FhQdxD8fSguISa0sDg1INzOfVtUCt8OoNqh0j6PXvu50rZCgMerGZAJ7NAYgLYuTsPw8NvdOEdF5kRX9C0ctu1ka7CS6VcbbXosWnMM"; // Token của bạn
const adAccountId = "676599667843841"; // ID tài khoản quảng cáo
const apiUrl = `https://graph.facebook.com/v16.0/act_${adAccountId}/campaigns?fields=id,name,status,adsets{campaign_id,name,status,spend,insights.date_preset(today){impressions,reach,spend,actions,cost_per_action_type}}&filtering=[{"field":"spend","operator":"GREATER_THAN","value":0}]&access_token=${accessToken}`;

let allData = [];

async function fetchData(api) {
  allData = [];
  try {
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    if (data.error) {
      console.error("Error from API:", data.error.message);
      return;
    }

    allData = data.data;

    renderTopCampaigns(allData);
    // Store the data to be used later for filtering
    const totals = calculateTotals(allData);

    document.getElementById("total_spend").textContent = formatCurrency(
      Math.round(totals.spend)
    );
    document.getElementById("total_reach").textContent = formatNumber(
      Math.round(totals.reach)
    );
    document.getElementById("total_reaction").textContent = formatNumber(
      Math.round(totals.reaction)
    );
    document.getElementById("total_follows").textContent = formatNumber(
      Math.round(totals.follows)
    );

    const totalSpends = calculateBrandSpending(allData, brandData.labels);
    brandData.datasets[0].data = totalSpends;

    drawChart(brandData); // Thay vì dùng new Chart, giờ gọi drawChart
    processData(allData); // Initial rendering
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

function processData(data) {
  const arrayRender = [];
  let render = ``;
  const dom_detail_tbody = document.querySelector(".dom_detail_tbody ");

  // Hàm tính tổng và cập nhật tfoot
  function updateTotals(rows, selectedCount = 0) {
    let spend = 0;
    let reach = 0;
    let impressions = 0;
    let reactions = 0;
    let follows = 0;
    let result = 0;
    let comments = 0;
    let linkClicks = 0;
    let messengerStart = 0;

    rows.forEach((row) => {
      spend += parseFloat(row.querySelector(".spend").dataset.value) || 0;
      reach += parseInt(row.querySelector(".reach").dataset.value) || 0;
      result += parseInt(row.querySelector(".result").dataset.value) || 0;
      impressions +=
        parseInt(row.querySelector(".impressions").dataset.value) || 0;
      reactions +=
        parseInt(row.querySelector(".postReaction").dataset.value) || 0;
      follows += parseInt(row.querySelector(".follows").dataset.value) || 0;
      comments += parseInt(row.querySelector(".comments").dataset.value) || 0;
      linkClicks +=
        parseInt(row.querySelector(".linkClick").dataset.value) || 0;
      messengerStart +=
        parseInt(row.querySelector(".messengerStart").dataset.value) || 0;
    });

    // Cập nhật tfoot
    const tfootContent = `
      <tr>
        <td class="dom_selected_total" colspan="4">
          ${
            selectedCount > 0
              ? `Total selected ${selectedCount} adsets`
              : "Total all adsets"
          }
        </td>
        <td>${formatCurrency(spend)}</td>
        <td>${formatNumber(reach)}</td>
        <td>${formatNumber(impressions)}</td>
        <td>${formatNumber(result)}</td>
        <td>-</td>
        <td>-</td>
        <td>${formatNumber(reactions)}</td>
        <td>${formatNumber(comments)}</td>
        <td>${formatNumber(follows)}</td>
        <td>${formatNumber(messengerStart)}</td>
        <td>${formatNumber(linkClicks)}</td>
      </tr>
    `;
    document.querySelector("tfoot").innerHTML = tfootContent;
    const viewPerformance = document.querySelector(
      "#dom_contentarea.viewPerformance"
    );
    if (viewPerformance) {
      const total_spend_viewPerformance = document.getElementById(
        "total_spend_viewPerformance"
      );
      const total_reach_viewPerformance = document.getElementById(
        "total_reach_viewPerformance"
      );
      const total_messenger_viewPerformance = document.getElementById(
        "total_messenger_viewPerformance"
      );
      const total_follows_viewPerformance = document.getElementById(
        "total_follows_viewPerformance"
      );
      total_spend_viewPerformance.innerText = formatCurrency(spend);
      total_reach_viewPerformance.innerText = formatNumber(reach);
      total_messenger_viewPerformance.innerText = formatNumber(messengerStart);
      total_follows_viewPerformance.innerText = formatNumber(follows);
    }
  }

  // Lắng nghe sự kiện checkbox
  document.addEventListener("change", (e) => {
    if (e.target.type === "checkbox") {
      const row = e.target.closest("tr");

      // Thêm hoặc loại bỏ class 'checked'
      if (e.target.checked) {
        row.classList.add("checked");
      } else {
        row.classList.remove("checked");
      }

      // Lấy tất cả các hàng được check
      const checkedRows = Array.from(document.querySelectorAll("tr.checked"));

      if (checkedRows.length > 0) {
        updateTotals(checkedRows, checkedRows.length); // Gửi số hàng được chọn
      } else {
        // Nếu không có hàng nào được check, tính tổng toàn bộ
        const allRows = Array.from(document.querySelectorAll("tbody tr"));
        updateTotals(allRows);
      }
    }
  });

  // Render dữ liệu và thêm thuộc tính data-value cho các ô số liệu

  data.forEach((item) => {
    item.adsets.data.forEach((adset) => {
      const insights = adset.insights ? adset.insights.data[0] : {};
      const spend = parseFloat(insights.spend) || 0;

      if (spend > 0) {
        const reach = insights.reach || 0;
        const impressions = insights.impressions || 0;
        const postReaction =
          getValueFromActions(insights.actions, "post_reaction") || 0;
        const follows = getValueFromActions(insights.actions, "like") || 0;
        const comments = getValueFromActions(insights.actions, "comment") || 0;
        const linkClick =
          getValueFromActions(insights.actions, "link_click") || 0;
        const messengerStart =
          getValueFromActions(
            insights.actions,
            "onsite_conversion.messaging_conversation_started_7d"
          ) || 0;

        // Xác định resultType dựa trên campaign name
        let resultType = 0;
        if (item.name.toLowerCase().includes("engagement"))
          resultType = parseInt(postReaction);
        if (item.name.toLowerCase().includes("awareness"))
          resultType = parseInt(reach);
        if (item.name.toLowerCase().includes("message"))
          resultType = parseInt(messengerStart);
        if (item.name.toLowerCase().includes("likepage"))
          resultType = parseInt(follows);

        // Tính CPR
        const costPerResult =
          resultType > 0 ? Math.round(spend / resultType) : 0;

        // Tính CPM
        const cpm =
          impressions > 0 ? Math.round((spend / impressions) * 1000) : 0;

        // Format tiền cho costPerResult và CPM
        const formattedCostPerResult = formatCurrency(costPerResult);
        const formattedCpm = formatCurrency(cpm);

        // Render hàng
        render += `
          <tr>
            <td><input type="checkbox"></td>
            <td>${item.name}</td>
            <td>${adset.name}</td>
            <td class="${
              adset.status === "ACTIVE"
                ? "dom_status_active"
                : "dom_status_inactive"
            }">
              ${formatStatus(adset.status)}
            </td>
            <td class="spend" data-value="${spend}">${formatCurrency(
          spend
        )}</td>
            <td class="reach" data-value="${reach}">${formatNumber(reach)}</td>
            <td class="impressions" data-value="${impressions}">${formatNumber(
          impressions
        )}</td>
            <td class="result" data-value="${resultType}">${
          resultType > 0 ? formatNumber(resultType) : "-"
        }</td>
            <td class="costPerResult" data-value="${costPerResult}">${formattedCostPerResult}</td>
            <td class="cpm" data-value="${cpm}">${formattedCpm}</td>
            <td class="postReaction" data-value="${postReaction}">${formatNumber(
          postReaction
        )}</td>
            <td class="comments" data-value="${comments}">${formatNumber(
          comments
        )}</td>
            <td class="follows" data-value="${follows}">${formatNumber(
          follows
        )}</td>
            <td class="messengerStart" data-value="${messengerStart}">${formatNumber(
          messengerStart
        )}</td>
            <td class="linkClick" data-value="${linkClick}">${formatNumber(
          linkClick
        )}</td>
          </tr>
        `;
      }
    });
  });

  dom_detail_tbody.innerHTML = render;
  sortTableBySpend();
  const allRows = Array.from(document.querySelectorAll("tbody tr"));
  updateTotals(allRows);
  const quickID = localStorage.getItem("quickID");
  if (quickID) {
    const filterItems = document.querySelectorAll(".dom_quick_filter a");
    filterItems[quickID].click();
  }
}
function sortTableBySpend() {
  const tbody = document.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  // Sắp xếp các hàng dựa trên giá trị spend (data-value)
  rows.sort((a, b) => {
    const spendA = parseFloat(a.querySelector(".spend").dataset.value) || 0;
    const spendB = parseFloat(b.querySelector(".spend").dataset.value) || 0;
    return spendB - spendA; // Sắp xếp giảm dần
  });

  // Xóa các hàng cũ và chèn lại theo thứ tự mới
  tbody.innerHTML = "";
  rows.forEach((row) => tbody.appendChild(row));
}

// Gọi hàm sắp xếp sau khi render
const dom_main_menu_a = document.querySelectorAll(".dom_main_menu li a");
const dom_contentarea = document.querySelector("#dom_contentarea");
// Add event listener to the FIND button
document
  .getElementById("dom_detail_find")
  .addEventListener("click", function () {
    const keyword = document
      .getElementById("dom_detail_input")
      .value.toLowerCase()
      .trim();
    clearFilter();
    dom_contentarea.classList.remove("viewPerformance");
    filterData(keyword);
  });

function clearFilter() {
  const activeItem = document.querySelector(".dom_quick_filter a.active");
  if (activeItem) {
    activeItem.classList.remove("active");
  }
  localStorage.removeItem("quickID");
}
function filterData(keyword) {
  const filteredData = allData.filter((item) => {
    const campaignMatch = item.name.toLowerCase().includes(keyword);
    return campaignMatch;
  });

  processData(filteredData); // Render filtered data
}
function formatStatus(status) {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(); // Chỉ viết hoa chữ cái đầu tiên
}

function formatCurrency(value) {
  return value === "-"
    ? "-"
    : new Intl.NumberFormat("vi-VN").format(value) + " ₫";
}

function formatNumber(value) {
  if (value === "-") return "-";
  return new Intl.NumberFormat("de-DE").format(value); // Sử dụng định dạng tiếng Đức, dấu phân cách là "."
}

function getValueFromActions(actions, actionType) {
  if (!actions) return "0";
  const action = actions.find((a) => a.action_type === actionType);
  return action ? action.value : "0";
}
// Hàm tính tổng spend cho từng brand

function calculateBrandSpending(allData, brandLabels) {
  // Khởi tạo mảng tổng spend cho từng brand
  const brandTotals = brandLabels.map(() => 0);

  allData.forEach((campaign) => {
    const campaignName = campaign.name.toLowerCase();
    // Tính tổng spend cho campaign
    const campaignSpend = campaign.adsets.data.reduce((total, adset) => {
      const spend = parseFloat(adset.insights?.data[0]?.spend || 0);
      return total + spend;
    }, 0);

    // Gán tổng spend vào brand tương ứng
    brandLabels.forEach((brand, index) => {
      if (campaignName.includes(brand.toLowerCase())) {
        brandTotals[index] += campaignSpend;
      }
    });
  });

  return brandTotals;
}

// Tính toán tổng spend
function calculateTotals(allData) {
  // Khởi tạo biến lưu tổng
  const totals = {
    spend: 0,
    reach: 0,
    reaction: 0,
    follows: 0,
  };

  // Lặp qua tất cả các campaign
  allData.forEach((campaign) => {
    campaign.adsets.data.forEach((adset) => {
      const insights = adset.insights?.data[0] || {};

      // Cộng dồn các giá trị
      totals.spend += parseFloat(insights.spend || 0);
      totals.reach += parseInt(insights.reach || 0, 10);
      totals.reaction += parseInt(
        getValueFromActions(insights.actions, "post_reaction") || 0,
        10
      );
      totals.follows += parseInt(
        getValueFromActions(insights.actions, "like") || 0,
        10
      );
    });
  });

  return totals;
}
function renderTopCampaigns(allData) {
  // Tính toán tổng chi tiêu của mỗi campaign
  const campaignTotals = allData.map((campaign) => {
    const totalSpend = campaign.adsets.data.reduce(
      (sum, adset) => sum + parseFloat(adset.insights?.data[0]?.spend || 0),
      0
    );
    return {
      name: campaign.name,
      spend: totalSpend,
    };
  });

  // Sắp xếp các campaign theo tổng chi tiêu từ cao đến thấp
  campaignTotals.sort((a, b) => b.spend - a.spend);

  // Lấy phần tử ul để render
  const ulElement = document.querySelector(".dom_chart_most_ul");
  ulElement.innerHTML = ""; // Xóa các phần tử cũ trước khi render

  // Render các campaign vào ul
  campaignTotals.forEach((campaign) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${campaign.name}</span> <span>${formatCurrency(
      campaign.spend
    )}</span>`;
    ulElement.appendChild(li);
  });
}

fetchData(apiUrl);
const dom_choose_day = document.querySelector(".dom_choose_day");
const dom_choosed = document.querySelector(".dom_choosed");
const dom_choosed_day = document.querySelector(".dom_choosed_day");
dom_choose_day.addEventListener("click", function () {
  dom_choose_day.classList.toggle("active");
});

const itemDate = document.querySelectorAll(".dom_choose_day li"); // Select all li items in the dom_choose_day list
itemDate.forEach((item) => {
  item.addEventListener("click", () => {
    // Cập nhật nội dung của dom_choosed với nội dung của mục được chọn
    dom_choosed.innerText = item.innerText;

    // Lấy giá trị data-date
    const datePreset = item.getAttribute("data-date");

    // Lấy khoảng ngày phù hợp
    const formattedDate = getFormattedDateRange(datePreset);
    dom_choosed_day.innerText = formattedDate;

    // Gọi API với ngày đã chọn
    const apiUrl = `https://graph.facebook.com/v16.0/act_${adAccountId}/campaigns?fields=id,name,status,adsets{campaign_id,name,status,spend,insights.date_preset(${datePreset}){impressions,reach,spend,actions,cost_per_action_type}}&filtering=[{"field":"spend","operator":"GREATER_THAN","value":0}]&access_token=${accessToken}`;

    fetchData(apiUrl);
  });
});

// Hàm định dạng ngày thành dd/mm/yyyy
function formatDate(date) {
  const d = new Date(date);
  return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${d.getFullYear()}`;
}

// Hàm lấy khoảng ngày phù hợp theo preset
function getFormattedDateRange(preset) {
  const today = new Date();
  let startDate, endDate;

  switch (preset) {
    case "today":
      startDate = endDate = today;
      break;
    case "yesterday":
      startDate = new Date();
      startDate.setDate(today.getDate() - 1);
      endDate = startDate;
      break;
    case "last_3d":
      startDate = new Date();
      startDate.setDate(today.getDate() - 3);
      endDate = new Date();
      endDate.setDate(today.getDate() - 1);
      break;
    case "last_7d":
      startDate = new Date();
      startDate.setDate(today.getDate() - 7);
      endDate = new Date();
      endDate.setDate(today.getDate() - 1);
      break;
    case "this_month":
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = today;
      break;
    case "last_month":
      startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      endDate = new Date(today.getFullYear(), today.getMonth(), 0);
      break;
    default:
      return "";
  }

  return startDate.getTime() === endDate.getTime()
    ? formatDate(startDate)
    : `${formatDate(startDate)} - ${formatDate(endDate)}`;
}
dom_choosed_day.innerText = getFormattedDateRange("today");

const quick_filter = [
  "Haagen Dazs",
  "Snowee",
  "Esta",
  "TRB",
  "BEAN",
  "Le Petit",
];
const dom_quick_filter = document.querySelector(".dom_quick_filter");
const dom_table_data = document.querySelector(".dom_table_data");

// Render danh sách
quick_filter.forEach((item) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <a class="" data-quick="${item}">
      <i class="fa-solid fa-bolt"></i> <span>${item}</span>
    </a>
  `;
  dom_quick_filter.appendChild(li);
});

const filterItems = document.querySelectorAll(".dom_quick_filter a");

filterItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    // Xóa class active cũ
    dom_main_menu_a[1].click();
    const activeItem = document.querySelector(".dom_quick_filter a.active");
    if (activeItem) {
      activeItem.classList.remove("active");
    }
    localStorage.setItem("quickID", index);
    item.classList.add("active");

    console.log(item.dataset.quick);

    filterData(item.dataset.quick.toLowerCase());
  });
});

dom_main_menu_a.forEach((item, index) => {
  item.addEventListener("click", () => {
    const activeItem = document.querySelector(".dom_main_menu li a.active");
    if (activeItem) {
      activeItem.classList.remove("active");
    }
    item.classList.add("active");
    if (index == 0) {
      clearFilter();
      filterData("");
      dom_contentarea.classList.remove("viewPerformance");
      window.scroll(0, 0);
    }
    if (index == 1) {
      viewPerformance();
    }
  });
});
function viewPerformance() {
  dom_contentarea.classList.add("viewPerformance");
  const ID = localStorage.getItem("quickID");
  if (ID) {
    filterItems[ID].click();
  } else {
    filterItems[0].click();
  }
}
