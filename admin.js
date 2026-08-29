const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const defaults = [
  { number:"01", title:"Sales Data Dashboard", description:"Interactive Power BI and Excel dashboard visualizing regional sales trends, revenue growth, and profit margins.", tags:["Power BI","Excel","Data Viz"], iconClass:"fa-solid fa-chart-line", cardColorClass:"", link:"#" },
  { number:"02", title:"Customer Churn Analysis", description:"Exploratory Data Analysis using Python (Pandas/Seaborn) to identify key factors behind customer retention and loss.", tags:["Python","Pandas","Statistics"], iconClass:"fa-solid fa-magnifying-glass-chart", cardColorClass:"purple-card", link:"#" },
  { number:"03", title:"SEO Content Strategy Report", description:"Data-backed keyword research and structured content mapping that increased organic site traffic by 40%.", tags:["SEO Writing","Keyword Research","Analytics"], iconClass:"fa-solid fa-file-contract", cardColorClass:"green-card", link:"#" }
];
let projects = JSON.parse(localStorage.getItem("aounProjects") || "null") || defaults;
const $ = (id) => document.getElementById(id);
function render() { $("projects").innerHTML = projects.map((p, i) => `<div class="project-row" data-index="${i}"><input data-key="number" value="${p.number}"><input data-key="title" value="${p.title}"><textarea data-key="description">${p.description}</textarea><button class="danger remove">Remove</button></div>`).join(""); }
$("loginBtn").onclick = async () => {
  const { error } = await supabaseClient.auth.signInWithPassword({ email: "syedaoun07@gmail.com", password: $("password").value });
  if (!error) { $("login").style.display="none"; $("editor").style.display="block"; render(); }
  else $("loginError").textContent = "Login failed. Email/password check karein.";
};
$("addProject").onclick = () => { projects.push({number:String(projects.length+1).padStart(2,"0"),title:"New Project",description:"Describe this project.",tags:[],iconClass:"fa-solid fa-star",cardColorClass:"",link:"#"}); render(); };
$("projects").onclick = (e) => { if (e.target.classList.contains("remove")) { projects.splice(Number(e.target.closest("[data-index]").dataset.index),1); render(); } };
$("save").onclick = () => { document.querySelectorAll("[data-index]").forEach(row => row.querySelectorAll("[data-key]").forEach(input => projects[Number(row.dataset.index)][input.dataset.key] = input.value)); localStorage.setItem("aounProjects", JSON.stringify(projects)); $("status").textContent="Saved. Open the homepage in this same browser to see changes."; };
$("reset").onclick = () => { projects = structuredClone(defaults); localStorage.removeItem("aounProjects"); render(); $("status").textContent="Defaults restored."; };
