*,
*:before,
*:after {
  box-sizing: border-box;
}
* {
  margin: 0;
  padding: 0;
  font: inherit;
}
img,
picture,
svg,
video {
  display: block;
  max-width: 100%;
}
input,
select,
textarea {
  background-color: transparent;
  outline: none;
}
button {
  cursor: pointer;
  background-color: transparent;
  outline: none;
  border: 0;
}
html {
  font-size: 62.5%;
  overflow-x: hidden;
}
:root {
  --mainClr: #ffa900;
  --textClr: #303030;
  --buttonFadeClr: #dcdcdc;
  --fadeClr: #f1f1f1;
  --fadeText: #3e3e3e;
}
body {
  /* min-height: 100vh; */
  font-weight: 400;
  line-height: 1;
  font-size: 1.4rem;
  /* font-family: sans-serif; */
  /* font-family: "Exo 2", sans-serif; */
  font-family: "Roboto", sans-serif;
  color: var(--textClr);
  background-color: var(--fadeClr);
  overflow-y: auto;
  overflow-x: hidden;
}

#dom_sidebar {
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  width: 28rem;
  height: 100vh;
  overflow-y: auto;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}
::-webkit-scrollbar {
  width: 5px;
}
body::-webkit-scrollbar {
  width: 15px;
}
#dom_contentarea::-webkit-scrollbar {
  width: 15px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(128, 128, 128, 0.074);
  border-radius: 9px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 9px;
}
#dom_contentarea::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.16);
}
body::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.16);
}
.dom_logo {
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  position: relative;
}
.dom_logo img {
  width: 16rem;
}
.dom_adsid {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 9px;
  background-color: var(--fadeClr);
  gap: 1rem;
  cursor: pointer;
}
.dom_adsid > div {
  display: flex;
  gap: 1rem;
}
.dom_adsid > i {
  justify-self: flex-end;
}
.dom_adsid > div > div {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  justify-self: start;
}
.dom_adsid > div > img {
  width: 35px;
  height: 35px;
  border-radius: 5px;
}
.dom_adsid > div > div > p:nth-child(1) {
  font-weight: bold;
  font-size: 1.4rem;
}
.dom_adsid > div > div > p:nth-child(2) {
  font-size: 1.2rem;
}
.dom_adsid > i {
  font-size: 1.3rem;
  opacity: 0.8;
}
#dom_sidebar > p {
  font-size: 1rem;
  padding-left: 1rem;
  color: var(--fadeText);
}

#dom_sidebar ul {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  list-style: none;
  width: 100%;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
}
#dom_sideber ul li {
  width: 100%;
}
#dom_sidebar ul li a i {
  font-size: 2rem;
}
#dom_sidebar ul li a {
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border-radius: 9px;
  transition: 0.3s;
  color: rgba(0, 0, 0, 0.726);
  cursor: pointer;
}
#dom_sidebar ul li a.active,
#dom_sidebar ul li a:hover {
  background-color: var(--fadeClr);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  color: var(--fadeText);
}
#dom_sidebar ul:nth-of-type(2) li a.active i {
  color: var(--mainClr);
}
.dom_total.viewPerformance,
.dom_chart_total.viewPerformance {
  display: none;
}

#dom_contentarea {
  width: calc(100vw - 28rem);
  /* height: 100vh; */
  margin-left: 28rem;
  padding: 8rem 2rem;
  overflow-x: hidden;
  transition: 0.2s;
  position: relative;
}
#dom_contentarea.viewQuickAdset {
  position: fixed;
  width: calc(100%-28rem);
  top: 0;
  right: 0;
  height: 100vh;
  background-color: var(--fadeClr);
  overflow-y: auto;
  z-index: 99999;
  padding-top: 0rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
#dom_contentarea.viewQuickAdset .dom_header,
#dom_contentarea.viewQuickAdset .view_adset > span,
#dom_contentarea.viewQuickAdset .dom_detail_head > div,
#dom_contentarea.viewQuickAdset .dom_table_data tfoot {
  display: none;
}

.dom_quickadset_overlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
  isolation: isolate;
  pointer-events: none;
  transition: 0.3s;
  z-index: 99998;
}
#dom_contentarea.viewQuickAdset ~ .dom_quickadset_overlay {
  opacity: 1;
  pointer-events: all;
}
#dom_contentarea.viewPerformance .dom_chart_total,
#dom_contentarea.viewPerformance .dom_total,
#dom_contentarea.viewDemographic .dom_chart_total,
#dom_contentarea.viewDemographic .dom_total,
#dom_contentarea .viewDemographic {
  display: none;
}

#dom_contentarea.viewPerformance .dom_total.viewPerformance,
#dom_contentarea.viewPerformance .dom_chart_total.viewPerformance,
#dom_contentarea.viewDemographic .dom_total.viewDemographic,
#dom_contentarea.viewDemographic .dom_chart_total.viewDemographic,
#dom_contentarea.viewDemographic .viewDemographic {
  display: flex;
}

.dom_header {
  position: fixed;
  top: 0;
  left: 30rem;
  right: 0;
  background-color: white;
  height: 8rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 9px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;
  z-index: 999;
  width: calc(100vw - 32rem);
  transition: 0.2s;
}

.dom_header_date {
  display: flex;
  align-items: center;
  gap: 2rem;
}
#dom_contentarea.zoom > .dom_header {
  left: 2rem;
  width: calc(100vw - 5.5rem);
}
.dom_header_date .dom_choose_day {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  padding: 1rem 2rem;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 25rem;
  position: relative;
  cursor: pointer;
}

.dom_choose_day ul {
  opacity: 0;
  transition: 0.3s;
  top: 4rem;
  position: absolute;
  left: 0;
  list-style: none;
  width: 100%;
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  border-radius: 9px;
  z-index: -1;
  pointer-events: none;
}
.dom_choose_day ul::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 10px;
  top: -5px;
  left: 0;
}
.dom_choose_day.active > ul {
  opacity: 1;
  z-index: 998;
  pointer-events: all;
}
.dom_choose_day.active > ul li {
  display: flex;
  gap: 1.2rem;
}
.radio_box {
  width: 16px;
  height: 16px;
  border: 2px solid var(--mainClr);
  border-radius: 50%;
  display: inline-block;
  position: relative;
  transition: all 0.3s ease;
}
.radio_box::after {
  content: "";
  width: 8px;
  height: 8px;
  background-color: var(--mainClr);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: 0.3s;
  opacity: 0;
}
.radio_box.active::after {
  opacity: 1;
}
.dom_choose_day.active > ul li:hover > .radio_box::after {
  opacity: 1;
}
.dom_choose_day ul li {
  padding: 1.5rem 2rem;
  transition: 0.3s;
}
.dom_choose_day ul li:last-child {
  position: relative;
}
.dom_choose_day ul li:last-child:hover .custom_date {
  opacity: 1;
}
.dom_choose_day ul li:hover {
  background-color: rgba(130, 130, 130, 0.09);
}
.dom_header_date > i {
  font-size: 2rem;
  opacity: 0.8;
}

.dom_header_date p i {
  opacity: 0.8;
  margin-left: 1rem;
}
#save_date {
  background-color: var(--mainClr);
  color: white;
  padding: 1rem 2rem;
  border-radius: 9px;
  cursor: pointer;
  transition: 0.3s;
}
#save_date:hover {
  opacity: 0.8;
}

.custom_date {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  position: absolute;
  right: -100%;
  width: 100%;
  top: -9rem;
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  border-radius: 9px;
  opacity: 0;
  transition: 0.3s;
}
.custom_date::after {
  position: absolute;
  content: "";
  width: 30vw;
  height: 75vh;
  top: -230%;
  left: 0rem;
  z-index: -1;
}
.custom_date > p {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dom_choosed_day {
  font-weight: bold;
  color: #656565;
  font-size: 1.5rem;
  cursor: pointer;
  transition: 0.3s;
  user-select: none;
  position: relative;
}
/* Live indicator container */
.live-indicator {
  display: flex;
  align-items: center;
  gap: 5px;
}

/* Red dot animation */
.live-dot {
  width: 10px;
  height: 10px;
  background-color: var(--mainClr);
  border-radius: 50%;
  margin-right: 2px;
  animation: pulse 1.5s infinite;
}

/* Live text */

/* Keyframes for pulsing red dot */
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.7;
  }
}

/* Keyframes for fade-in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dom_choosed_day:hover {
  color: var(--mainClr);
}
.custom_date > p > span {
  display: inline-block;
  padding: 5px 1rem;
  width: 5rem;
  border-radius: 9px;
  background: var(--fadeClr);
  font-size: 1.2rem;
}
.custom_date > p > input {
  border: none;
  font-size: 1.4rem;
}
.apply_custom_date {
  width: 100%;
  background-color: var(--mainClr);
  text-align: center;
  padding: 1rem;
  border-radius: 9px;
  color: white;
}

.dom_user {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  cursor: pointer;
  position: relative;
}

.dom_user ul {
  position: absolute;
  list-style: none;
  top: 5.5rem;
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  width: 100%;
  left: 50%;
  min-width: 15rem;
  transform: translateX(-50%);
  border-radius: 5px;
  opacity: 0;
  pointer-events: none;
  transition: 0.3s;
}
.dom_user ul::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 3rem;
  top: -3rem;
  left: 0;
}
.dom_user:hover > ul {
  opacity: 1;
  pointer-events: all;
}
.dom_user ul li a {
  padding: 1.5rem;
  display: flex;
  transition: 0.3s;
  text-decoration: unset;
  color: unset;
  gap: 1rem;
}
.dom_user ul > li:hover {
  background-color: var(--fadeClr);
}
.dom_user p {
  font-weight: bold;
}
.dom_user img {
  width: 35px;
  height: 35px;
  border-radius: 5px;
}

.dom_total {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.dom_total_item {
  width: calc(100% / 4 - 1.5rem);
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  border-radius: 9px;
  display: flex;
  height: max-content;
  flex-direction: column;
  overflow: hidden;
}
.dom_total_item > div:last-child {
  display: flex;
  justify-content: space-between;
}
.dom_total_item > div:last-child > p:first-child {
  font-weight: bold;
  font-size: 1.5rem;
}
.dom_total_item > div:last-child > p:last-child {
  display: flex;
  gap: 1rem;
  cursor: pointer;
}
.dom_total_item > div:last-child > p:last-child > span {
  text-decoration: underline;
}
.dom_total_item > div:last-child > p:last-child > i {
  color: #3a3a3ab7;
}
.dom_total_percent {
  display: flex;
  gap: 1rem;
}

.dom_total.first_block .dom_total_item > div:nth-child(1) {
  border: unset;
  padding: 2.5rem;
}
.dom_total_percent_number {
  color: green;
  font-weight: bold;
}
.dom_total_item > div {
  padding: 2rem;
}
.dom_total_item > div:nth-child(1) {
  display: flex;
  justify-content: space-between;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
}
.dom_total_item > div:nth-child(2) {
  background-color: #f2f2f291;
}
.dom_total_title {
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 2rem;
  opacity: 0.8;
}

#dailyChart {
  max-height: 40rem !important;
  padding: 0 1rem;
}
.dom_select_view {
  margin-bottom: 2rem;
  font-weight: bold;
  position: relative;
  width: max-content;
  min-width: 23rem;
}
.dom_select_view > p {
  cursor: pointer;
  font-weight: bold;
  padding: 1rem 2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
}

.dom_total_number {
  font-weight: bold;
  font-size: 2.5rem;
}
.dom_select_view > ul {
  position: absolute;
  width: 100%;
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  list-style: none;
  display: flex;
  top: 3.5rem;
  flex-direction: column;
  opacity: 0;
  pointer-events: none;
}
.dom_select_view.active > ul {
  opacity: 1;
  pointer-events: all;
}
.dom_select_view > ul li {
  padding: 1.5rem 2rem;
  transition: 0.3s;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1.2rem;
}
.dom_select_view > ul li:hover {
  background: var(--fadeClr);
}
.dom_select_view > ul li:hover > .radio_box::after {
  opacity: 1;
}

.dom_total_item > div > i {
  background-color: var(--fadeClr);
  height: max-content;
  padding: 1rem;
  font-size: 1.5rem;
  color: #4d4d4d;
  border-radius: 9px;
  transition: 0.3s;
  /* transform: translateY(-10px); */
}
.dom_total_item > div > i:hover {
  color: var(--mainClr);
}
.daily_title_wrap {
  display: flex;
  justify-content: space-between;
}
.daily_title_wrap i {
  font-size: 2rem;
  opacity: 0.7;
  transition: 0.3s;
  cursor: pointer;
}
.daily_title_wrap i:hover {
  opacity: 1;
  color: var(--mainClr);
}
.dom_chart_total {
  margin-top: 2rem;
  gap: 2rem;
  display: flex;
}
.dom_chart_item {
  width: calc(50% - 1rem);
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 9px;
  padding: 3rem;
}
.dom_chart_total.dailyChart_Account .dom_chart_item {
  width: 100%;
  height: 45rem !important;
  padding-bottom: 13rem;
}

.dom_chart_item h2 {
  font-weight: bold;
  font-size: 2rem;
  padding-bottom: 2rem;
}
.dom_chart_item.circle {
  width: calc(25% - 1.5rem);
}
#brandChart {
  min-height: 30rem !important;
}
.dom_chart_item.list {
  width: calc(50% - 1rem);
  padding: 3rem;
}
.dom_chart_most_title {
  display: flex;
  justify-content: space-between;
  background: #cccccc44;
  padding: 1.5rem 2rem;
  border-radius: 9px 5px 0 0;
  font-weight: bold;
  display: none;
}
.dom_chart_most_title > span:last-child {
  padding: 0 1rem;
}
.dom_chart_item.list ul {
  width: 100%;
  height: 100%;
  max-height: 30rem;
  overflow-y: auto;
  padding-right: 1rem;
}

.dom_chart_item.list ul li {
  padding: 1rem 0rem;
  display: flex;
  justify-content: space-between;
  transition: 0.3s;
}

.dom_chart_item.list ul li span:nth-child(1) {
  width: 80%;
}
.dom_table_data {
  width: 100%;
  height: auto;
  background-color: white;
  margin-top: 2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  border-radius: 9px;
  padding: 0 4rem;
  padding-bottom: 4rem;
  scroll-margin-top: 9rem;
}
.dom_detail_head {
  padding: 4rem 0rem;
  display: flex;
  justify-content: space-between;
  height: 10rem;
}
.dom_detail_head > h2 {
  font-size: 2rem;
  font-weight: bold;
}
.dom_detail_head > div {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  align-items: center;
  width: 50%;
}
.dom_detail_head > div > #dom_detail_input::placeholder {
  opacity: 0.7;
  transition: 0.3s;
}
.dom_detail_head > div > #dom_detail_input:focus::placeholder {
  opacity: 1;
}
.dom_detail_head > div > #dom_detail_input {
  padding: 8px 1rem;
  width: 100%;
  border: none;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.55);
  border-radius: 9px;
  border: 2px solid #ffa90000;
  transition: 0.3s;
}
.dom_detail_head > div > #dom_detail_input:focus {
  border: 2px solid #ffaa0090;
  box-shadow: 0 0 2px #ffaa0090;
}
#dom_detail_find {
  background-color: var(--mainClr);
  padding: 1.3rem 2rem;
  cursor: pointer;
  color: white;
  font-weight: bold;
  border-radius: 9px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.dom_detail_table {
  width: 100%;
}
.dom_detail_table thead tr th {
  padding: 1rem;
}
.dom_table_container {
  padding: 2rem;
  border-radius: 9px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
}
.dom_table_container > div {
  max-height: 55rem;
  overflow-y: auto;
}
.dom_detail_table tbody {
  text-align: center;
}
.dom_detail_table tbody tr td {
  padding: 1rem;
  line-height: 1.6;
}
input[type="checkbox"] {
  appearance: none; /* Ẩn checkbox mặc định */
  width: 2.5rem;
  height: 2.5rem;
  border: 2px solid var(--mainClr); /* Màu viền vàng */
  background-color: white;
  cursor: pointer;
  border-radius: 5px;
  outline: none;
  display: inline-block;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  position: relative;
}

input[type="checkbox"]:checked {
  background-color: var(--mainClr); /* Màu nền vàng khi được chọn */
  border-color: var(--mainClr);
}

input[type="checkbox"]::before {
  content: "";
  font-family: "Font Awesome 6 Free";
  font-weight: 900;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

input[type="checkbox"]:checked::before {
  content: "\f00c";
}
.dom_detail_table {
  border-collapse: collapse; /* Đảm bảo các đường viền của các ô không bị chồng lên nhau */
  width: 200%; /* Đảm bảo bảng chiếm toàn bộ chiều rộng */
  overflow: auto; /* Ẩn phần cuộn nếu có */
  max-height: 400px; /* Giới hạn chiều cao của bảng để có thể cuộn */
}
.dom_table_container > div::-webkit-scrollbar {
  height: 20px; /* Chiều cao của thanh cuộn ngang */
}

.dom_table_container > div::-webkit-scrollbar-thumb {
  background-color: #88888833; /* Màu sắc của thanh cuộn */
  border-radius: 0px; /* Làm tròn các góc của thanh cuộn */
  cursor: pointer;
}

.dom_table_container > div::-webkit-scrollbar-thumb:hover {
  background-color: var(--mainClr); /* Màu khi hover vào thanh cuộn */
}

.dom_detail_table td,
.dom_detail_table th {
  background: linear-gradient(
    to right,
    #cccccc48 1px,
    transparent 1px
  ); /* Đường viền dọc cho td */
  background-size: 100% 100%; /* Chỉ áp dụng đường viền dọc */
  padding: 8px;
}
.dom_detail_table tbody tr:nth-child(even) {
  background-color: #f2f2f270; /* Màu nền cho các hàng chẵn */
}
.dom_chart_total.viewPerformance > .dom_chart_item {
  width: calc(28% - 1.5rem);
}

.dom_chart_total.viewDemographic > .dom_chart_item {
  width: calc(25% - 1.5rem);
}
.dom_chart_total.viewDemographic.fullsize > .dom_chart_item {
  width: 100%;
  height: 45rem !important;
  padding-bottom: 8rem;
}
.dom_chart_total.viewDemographic > .dom_chart_item.impression_chart {
  width: calc(50% - 1rem);
}
#budgetChart {
  height: 5rem;
  width: 100%;
}

.dom_chart_total.viewPerformance.dailyChart > .dom_chart_item:nth-child(1) {
  width: 100%;
  height: 45rem;
  padding-bottom: 13rem;
}
.dom_chart_total.viewPerformance.percentChart > .dom_chart_item:nth-child(1) {
  width: 70%;
}
.percentChart_inner {
  height: 25rem;
  padding-bottom: 0rem;
}

.dom_chart_total.viewPerformance.percentChart > .dom_chart_item:nth-child(1) {
  width: 70%;
  height: 35rem;
  padding-bottom: 6rem;
}
.dom_chart_total.viewPerformance.percentChart > .dom_event_ul {
  width: 50%;
}
.dom_cpm_wrapper {
  background: var(--fadeClr);
  box-shadow: unset;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0;
}
.dom_cpm_wrapper > div {
  display: block;
  background: white;
  width: 100%;
  padding: 3rem;
  border-radius: 10px;
  height: 100%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  position: relative;
}
.dom_cpm_wrapper h2 {
  font-size: 1.5rem;
  opacity: 0.8;
}
.dom_cpm_number {
  font-size: 2.5rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 58%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.dom_event_ul {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
}
.dom_event_ul ul {
  height: 22rem;
  overflow-y: auto;
  padding-right: 1rem;
}
.dom_event_ul li {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  margin-bottom: 1rem;
}
.dom_event_ul li > p:nth-child(1) {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.3rem;
}
.dom_event_ul li > p:nth-child(1) > span:last-child {
  font-weight: bold;
}
.dom_event_ul li > p:nth-child(2) {
  width: 100%;
  background: var(--fadeClr);
  height: 8px;
  position: relative;
}
.dom_event_ul li > p:nth-child(2) > span {
  background: var(--mainClr);
  height: 8px;
  display: inline-block;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 0 10px 10px 0;
}
.dom_chart_item.dom_view_adset {
  display: none;
}
.percentChart.adset .dom_chart_item.dom_view_adset {
  display: flex;
}
.percentChart.adset .percentChart_wrapper {
  display: none;
}
#dom_contentarea.viewQuickAdset .percentChart .dom_chart_item.dom_view_adset {
  display: flex;
}
#dom_contentarea.viewQuickAdset .percentChart .percentChart_wrapper {
  display: none;
}
.dom_chart_total.viewPerformance.percentChart > .dom_chart_item.frequency {
  width: 30%;
  max-height: 35rem;
}
.dom_chart_total.viewDemographic.w50 > .dom_chart_item:nth-child(1) {
  width: calc(50% - 1rem);
}
.dom_chart_total.viewDemographic.w50 > .dom_chart_item:nth-child(2) {
  width: calc(50% - 1rem);
}
.dom_chart_total.viewPerformance.budgetChart > .dom_chart_item:nth-child(1) {
  width: calc(50% - 1rem);
}
/* Màu nền cho các hàng lẻ */
.dom_detail_table tbody tr:nth-child(odd) {
  background-color: #ffffff; /* Màu nền cho các hàng lẻ */
}
.dom_detail_table tbody td {
  text-align: right;
}

.dom_detail_table tbody td:nth-child(1) {
  text-align: center;
}

.dom_detail_table tbody td:nth-child(10) {
  text-align: left;
}
.dom_detail_table tbody td:nth-child(2),
.dom_detail_table tbody td:nth-child(3) {
  text-align: left;
  padding-left: 1rem;
}
.dom_detail_table tbody td:nth-child(2) {
  min-width: 20rem;
}
.dom_detail_table tbody td:nth-child(3) {
  min-width: 30rem;
}
.dom_detail_table tbody td {
  min-width: 12rem;
}
.dom_detail_table tbody td:nth-child(4) {
  text-align: right;
}
.dom_detail_table tbody td:nth-child(10) {
  margin-left: 2rem;
  padding-left: 4rem;
  padding-right: 2rem;
  min-width: 18rem;
  position: relative;
}
.dom_detail_table tbody td:nth-child(10)::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 15%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background-color: var(--mainClr);
  border-radius: 9px;
}
.dom_detail_table tbody td:nth-child(4) {
  text-align: center;
  cursor: pointer;
  font-size: 2rem;
  color: var(--mainClr);
}
#dom_contentarea.viewQuickAdset .dom_detail_table td:nth-child(4),
#dom_contentarea.viewQuickAdset .dom_detail_table th:nth-child(4) {
  display: none;
}

.dom_detail_table thead {
  border-top: 1px solid #f2f2f270; /* Đường viền trên của các th */
  position: sticky; /* Đảm bảo th cố định khi cuộn */
  top: 0; /* Cố định ở trên cùng */
  z-index: 115; /* Đảm bảo th nằm trên cùng */
  background-color: #f1f1f1;
  font-weight: bold;
}
.dom_detail_table tfoot {
  z-index: 115 !important;
}
.dom_detail_table thead::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: white;
  top: -2px;
}
.dom_detail_table tfoot {
  position: sticky; /* Cố định footer */
  bottom: 0; /* Đảm bảo footer luôn ở dưới cùng */
  background-color: #ffdd98; /* Đảm bảo nền của footer là trắng */
  border-top: 1px solid #ccc; /* Đặt đường viền trên cho footer */
  z-index: 1; /* Đảm bảo footer nằm trên các hàng dữ liệu */
  color: black;
  text-align: center;
}

.dom_detail_table tfoot td {
  font-weight: bold;
  padding: 15px 8px;
}
.dom_detail_table tbody tr {
  transition: 0.2s;
}
.dom_detail_table tbody tr:hover {
  background-color: #fff4dd;
}
.dom_detail_table tbody tr.checked {
  background-color: #fff4dd;
}
.dom_detail_table tfoot td {
  text-align: right;
}
.dom_selected_total {
  text-align: center !important;
}

.loading {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.232);
  opacity: 0;
  pointer-events: none;
  transform: 0.3s;
}
.loading.active {
  opacity: 1;
  pointer-events: all;
}
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85px;
  height: 50px;
  background-repeat: no-repeat;
  background-image: linear-gradient(#fff 50px, transparent 0),
    linear-gradient(#fff 50px, transparent 0),
    linear-gradient(#fff 50px, transparent 0),
    linear-gradient(#fff 50px, transparent 0),
    linear-gradient(#fff 50px, transparent 0),
    linear-gradient(#fff 50px, transparent 0);
  background-position: 0px center, 15px center, 30px center, 45px center,
    60px center, 75px center, 90px center;
  animation: rikSpikeRoll 0.65s linear infinite alternate;
}

@keyframes rikSpikeRoll {
  0% {
    background-size: 10px 3px;
  }
  16% {
    background-size: 10px 50px, 10px 3px, 10px 3px, 10px 3px, 10px 3px, 10px 3px;
  }
  33% {
    background-size: 10px 30px, 10px 50px, 10px 3px, 10px 3px, 10px 3px,
      10px 3px;
  }
  50% {
    background-size: 10px 10px, 10px 30px, 10px 50px, 10px 3px, 10px 3px,
      10px 3px;
  }
  66% {
    background-size: 10px 3px, 10px 10px, 10px 30px, 10px 50px, 10px 3px,
      10px 3px;
  }
  83% {
    background-size: 10px 3px, 10px 3px, 10px 10px, 10px 30px, 10px 50px,
      10px 3px;
  }
  100% {
    background-size: 10px 3px, 10px 3px, 10px 3px, 10px 10px, 10px 30px,
      10px 50px;
  }
}

.progress-bar {
  display: flex;
  width: 100%;
  height: 15px; /* Chiều cao của thanh */
  background-color: #e0e0e0; /* Màu nền của thanh */
  border-radius: 10px;
  overflow: hidden;
}

.segment {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  height: 100%;
  font-size: 1.2rem;
  text-align: center;
}
.segment_legend {
  margin-top: 2rem;
  font-size: 1.2rem;
}
.segment_legend b {
  font-weight: bold;
}
.segment p {
  margin: 0;
  font-weight: bold;
}

#download_data {
  font-size: 2rem;
  opacity: 0.8;
  color: #656565;
}
.dom_bar {
  display: none;
}
.dom_bar_close {
  display: none;
}
.dom_zoom {
  padding: 2rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  opacity: 0.8;
  transition: 0.3s;
  rotate: 180deg;
}
.dom_zoom:hover {
  color: var(--mainClr);
  cursor: pointer;
}
#dom_sidebar {
  transition: 0.2s;
}
#dom_sidebar.zoom {
  left: -100%;
  overflow: unset;
  z-index: 999999;
}
#dom_sidebar {
  overflow-x: unset;
}
#dom_sidebar.zoom .dom_zoom {
  position: fixed;
  left: 0;
  top: 5rem;
  background-color: white;
  border-radius: 10px 0 0 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  width: max-content;
}
#dom_sidebar.zoom .dom_zoom > i {
  rotate: 180deg;
}
#dom_contentarea.zoom {
  margin-left: 0;
  width: 100%;
}

#dom_contentarea.viewDemographic .dom_table_data {
  display: none;
}

.dom_title_report {
  padding: 2rem 1rem;
  margin-top: 1rem;
  font-weight: bold;
  margin-bottom: -1rem;
  display: none;
  gap: 1rem;
  font-size: 1.6rem;
  position: relative;
  padding-right: 3rem;
  align-items: center;
}
.dom_title_report_list {
  cursor: pointer;
  transition: 0.3s;
  position: relative;
  user-select: none;
}
.dom_title_report_list::before {
  content: "";
  position: absolute;
  width: 120%;
  height: 250%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.dom_choosed_day::before {
  content: "";
  position: absolute;
  width: 120%;
  height: 250%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.dom_title_report_list > div {
  position: relative;
}
.dom_title_report_list > div > ul {
  position: absolute;
  width: max-content;
  list-style: none;
  height: auto;
  background-color: white;
  top: 3rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  left: 0;
  border-radius: 5px;
  opacity: 0;
  pointer-events: none;
  transition: 0.3s;
  max-height: 60vh;
  overflow-y: auto;
}
.dom_title_report_list > div.active ul {
  pointer-events: all;
  opacity: 1;
  z-index: 9;
}
.dom_title_report_list > div > ul > li {
  padding: 1.5rem 2rem;
  font-weight: normal;
  transition: 0.3s;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.dom_title_report_list > div > ul > li:hover {
  background-color: #0000000a;
}
.dom_title_report_list > div > ul > li:hover > .radio_box::after {
  opacity: 1;
}
.dom_title_report_list i {
  transform: translateY(-2.5px);
  margin-left: 5px;
}
.dom_title_report h2 {
  position: relative;
}

#dom_contentarea.viewDemographic .dom_title_report,
#dom_contentarea.viewPerformance .dom_title_report {
  display: flex;
}
.view_adset {
  display: none;
}
.view_adset.active {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.dom_not_data img {
  width: 20rem;
}
#dom_contentarea .dom_not_data {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: var(--fadeClr);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  display: none;
  pointer-events: none;
}
#dom_contentarea.no_data .dom_not_data {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
#dom_contentarea.no_data {
  height: 100vh;
  overflow: hidden;
}

.dom_chart_most_ul li {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  margin-bottom: 1rem;
}
.dom_chart_most_ul li > p:nth-child(1) {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.3rem;
}
.dom_chart_most_ul li > p:nth-child(1) > span:last-child {
  font-weight: bold;
}
.dom_chart_most_ul li > p:nth-child(2) {
  width: 100%;
  background: var(--fadeClr);
  height: 8px;
  position: relative;
}
.dom_chart_most_ul li > p:nth-child(2) > span {
  background: var(--mainClr);
  height: 8px;
  display: inline-block;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 0 10px 10px 0;
}
.dom_role_container {
  position: fixed;
  width: 95%;
  max-width: 50rem;
  height: auto;
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99999;
  padding: 4rem;
  max-height: 60rem;
  overflow-y: auto;
  opacity: 0;
  pointer-events: none;
  transition: 0.3s;
}
.dom_role_container > img {
  width: 60%;
  margin: 0 auto;
  padding-bottom: 2rem;
}
.dom_role_container > i {
  position: absolute;
  right: 0rem;
  top: 0rem;
  padding: 2rem;
  font-size: 2rem;
  cursor: pointer;
}
.dom_role_container.active {
  opacity: 1;
  pointer-events: all;
}
.dom_role_container h2 {
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
}
.dom_role_container b {
  font-weight: bold;
}

.dom_role_container ul {
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  line-height: 1.8;
}
.dom_role_container ul li i {
  color: var(--mainClr);
  margin-right: 5px;
}

.dom_role_container_overlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.19);
  top: 0;
  left: 0;
  z-index: 99998;
  opacity: 0;
  transition: 0.3s;
  pointer-events: none;
}
.dom_role_container.active ~ .dom_role_container_overlay {
  opacity: 1;
  pointer-events: all;
}
.frequency > div {
  margin: 0 auto;
  margin-top: 3rem;
}

.semi-donut {
  --percentage: 0;
  --fill: #ff0;
  width: 24rem;
  height: 12rem;
  position: relative;
  color: #fff;
  font-size: 22px;
  font-weight: 600;
  overflow: hidden;
  color: var(--fill);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  box-sizing: border-box;
  transform: translateY(-2rem);
}
.semi-donut::after {
  content: "";
  width: 24rem;
  height: 24rem;
  border: 40px solid;
  border-color: rgba(0, 0, 0, 0.15) rgba(0, 0, 0, 0.15) var(--fill) var(--fill);
  position: absolute;
  border-radius: 50%;
  left: 0;
  top: 0;
  box-sizing: border-box;
  transform: rotate(calc(1deg * (-45 + var(--percentage) * 1.8)));
  animation: fillAnimation 1s ease-in;
}
.frequency_number {
  transform: translateY(-1rem);
  color: var(--textClr) !important;
  font-size: 3rem;
}
.frequency_number_label {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  font-size: 1.8rem;
  max-width: 26rem;
  transform: translateY(-4rem);
}
.dom_frequency_label {
  display: flex;
  justify-content: space-between;
  transform: translateY(-5rem);
  max-width: 26rem;
  gap: 1rem;
  font-size: 1.2rem;
}
.dom_frequency_label span {
  font-weight: bold;
}
.impression_chart_ul {
  display: flex;
  list-style: none;
  flex-direction: column;
  gap: 2rem;
  max-height: 20rem;
  overflow-y: auto;
  padding-right: 1rem;
}
.impression_chart_ul li {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.impression_chart_ul li > p:nth-child(1) {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.impression_chart_ul li > p:nth-child(1) > span:nth-child(2) {
  font-weight: bold;
}
.impression_chart_ul li > p:nth-child(2) {
  width: 100%;
  height: 8px;
  background-color: var(--fadeClr);
  position: relative;
}
.impression_chart_ul li > p:nth-child(2) span {
  /* width: 50%; */
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--mainClr);
  height: 8px;
  border-radius: 0 10px 10px 0;
}
.dom_quick_close {
  display: none;
  font-size: 3rem;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
}
#dom_contentarea.viewQuickAdset .dom_title_report_list,
#dom_contentarea.viewQuickAdset .dom_title_report > span {
  display: none;
}
#dom_contentarea.viewQuickAdset .dom_table_data {
  display: block;
}
#dom_contentarea.viewQuickAdset .dom_quick_close {
  display: inline-block;
}
.dom_highest_switch {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;
}
.dom_highest_switch > div {
  display: flex;
  align-items: center;
}
.dom_highest_switch h2 {
  padding: 0;
}
.dom_highest_switch > div p {
  background-color: var(--fadeClr);
  padding: 1rem 2rem;
  margin-left: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}
.dom_highest_switch > div p.active {
  background-color: var(--mainClr);
  color: white;
}

@media (max-width: 768px) {
  .percentChart .dom_chart_item.dom_view_adset.dom_event_ul {
    width: 100%;
  }
  .dom_cpm_wrapper > div {
    height: 15rem;
  }
  .percentChart .dom_chart_item.dom_view_adset.dom_event_ul ul {
    height: auto;
  }
  .dom_chart_total.viewPerformance.dailyChart > .dom_chart_item:nth-child(1) {
    height: 35rem;
  }
  .dom_total_item > div > i {
    transform: translate(0);
  }
  #dom_contentarea.viewQuickAdset {
    width: 98%;
    left: 50%;
    transform: translateX(-50%);
  }
  .dom_chart_total.viewPerformance.percentChart > .dom_chart_item:nth-child(1),
  .dom_chart_total.viewPerformance.percentChart > .dom_chart_item.frequency {
    width: 100%;
    height: 30rem;
  }
  .dom_chart_total.dailyChart_Account .dom_chart_item {
    width: 100%;
    height: 35rem !important;
    padding-bottom: 10rem;
  }
  .live-indicator {
    transform: translateY(-1px);
    margin-right: -5px;
  }
  .dom_title_report {
    font-size: 1.2rem;
    flex-wrap: wrap;
    line-height: 2rem;
  }
  .dom_detail_table tbody td:nth-child(10)::after {
    left: 10%;
  }
  .view_adset > span {
    display: none;
  }
  .dom_zoom {
    display: none;
  }
  .dom_table_container {
    margin-top: 4rem;
  }
  .dom_table_container > div::-webkit-scrollbar {
    height: 5px; /* Chiều cao của thanh cuộn ngang */
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  #dom_contentarea {
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    flex-direction: column;
    padding-bottom: 10rem;
  }
  #dom_daily_chart {
    order: 1;
  }
  .dom_chart_total.viewPerformance.percentChart {
    order: 1;
  }
  .impression_chart_ul {
    max-height: unset;
  }
  .dom_chart_item_highest {
    padding: 0;
  }
  .dom_table_data {
    order: 3;
  }
  .dom_chart_total.viewPerformance.w50,
  .dom_chart_total.viewPerformance.circle {
    order: 0;
  }
  .dom_bar_close {
    display: block;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(80%);
    rotate: 180deg;
    font-size: 2rem;
    padding: 0 2rem;
    padding-left: 0rem;
    opacity: 0.8;
  }
  .dom_bar {
    display: block;
    padding: 1rem;
    font-size: 2rem;
  }
  .segment_legend {
    font-size: 1.1rem;
  }
  .li_custom_date {
    display: none;
  }
  body {
    font-size: 1.2rem;
  }
  .custom_date {
    left: -145%;
    width: max-content;
  }
  #dom_sidebar {
    left: -100%;
    transition: 0.3s;
    z-index: 99999;
    background-color: white;
    overflow-y: auto;
    overflow-x: hidden;
  }
  #dom_sidebar::before {
    content: "";
    position: absolute;
    width: 500vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.125);
    top: 0;
    opacity: 0;
    z-index: -1;
    left: 100%;
    pointer-events: none;
  }
  #dom_sidebar.active::before {
    opacity: 1;
    pointer-events: all;
  }
  #dom_sidebar.active {
    left: 0%;
  }
  #dom_contentarea {
    margin-left: 0;
    width: 100vw;
    padding: 1rem;
    padding-top: 8rem;
    padding-bottom: 10rem;
  }
  #dom_contentarea.viewQuickAdset .dom_title_report h2 {
    width: 75vw;
  }

  .dom_title_report_list > div > ul {
    right: 0;
    left: unset;
  }
  .dom_header {
    left: 1rem;
    padding: 1rem;
    padding-right: 2rem;
    width: 95%;
  }
  p.dom_choosed_day,
  .dom_user {
    display: none;
  }
  .dom_header_date .dom_choose_day {
    width: 15rem;
  }
  .dom_total {
    flex-direction: column;
  }
  .dom_total_item {
    width: 100%;
  }
  .dom_chart_item,
  .dom_chart_item.list {
    width: 100%;
  }
  .dom_chart_total {
    flex-direction: column;
  }
  .dom_chart_total.viewDemographic.w50 > .dom_chart_item:nth-child(1),
  .dom_chart_total.viewDemographic.w50 > .dom_chart_item:nth-child(2),
  .dom_chart_total.viewDemographic > .dom_chart_item,
  .dom_chart_total.viewDemographic > .dom_chart_item.impression_chart {
    width: 100%;
  }
  #dom_contentarea.viewDemographic .dom_title_report,
  #dom_contentarea.viewPerformance .dom_title_report {
    width: 100%;
  }

  #brandChart {
    min-height: unset !important;
  }
  .dom_chart_item h2 {
    font-size: 1.5rem;
  }
  .dom_chart_most_ul {
    font-size: 1rem;
  }
  .dom_chart_item.list ul li span:nth-child(1) {
    width: 70%;
  }
  .dom_table_data {
    padding: 1rem;
  }
  .dom_total_title {
    font-size: 1.5rem;
  }
  .dom_detail_head {
    flex-direction: column;
    gap: 2rem;
    /* margin-bottom: 5rem; */
  }
  .dom_detail_head h2 {
    padding-left: 1rem;
  }
  .dom_detail_head > div {
    width: 95%;
    margin: 0 auto;
  }
  .dom_detail_input {
    width: 100%;
    display: inline-block;
  }
  .dom_detail_table {
    width: 700%;
    font-size: 0.9rem !important;
  }
  .dom_detail_table tbody td {
    min-width: max-content;
  }
  .dom_detail_table tbody td:nth-child(2) {
    min-width: unset;
    max-width: 10rem;
  }

  .dom_detail_table tbody td:nth-child(3) {
    min-width: unset;
    max-width: 15rem;
  }
  .dom_detail_table tbody td {
    min-width: max-content;
  }
  input[type="checkbox"] {
    width: 1.8rem;
    height: 1.8rem;
  }

  .progress-bar {
    height: 8px;
  }
  .dom_chart_total.viewPerformance.w50 > .dom_chart_item:nth-child(1),
  .dom_chart_total.viewPerformance.w50 > .dom_chart_item:nth-child(2) {
    width: 100%;
  }
  .dom_chart_total.viewPerformance > .dom_chart_item {
    width: 100%;
  }
}
