// Configuration
const POSTS_PER_PAGE = 5;
let currentPage = 1;
let combinedPosts = [];

const localPosts = [
  {
    title: "Kijana Wa Mtaani",
    content: "Leo kwa corner ya Githurai, msee aliyekuwa mrefu kama miwa alikuwa akihutubia vijana kuhusu hasla na jaba...",
    date: "2025-06-14"
  },
  {
    title: "Mtaa Chronicles",
    content: "Pale kwa base ya Umoja 2, jaba session huanza saa kumi na mbili asubuhi. Kila mmoja ana story ya life...",
    date: "2025-06-13"
  }
];

const localContainer = document.getElementById("local-posts");
const newsContainer = document.getElementById("news-posts");
const paginationContainer = document.getElementById("pagination");

// Show loading animation
function showLoading() {
  newsContainer.innerHTML = `<div class="loader">Loading stories...</div>`;
}

// Render posts with pagination
function renderPosts(page = 1) {
  newsContainer.innerHTML = "";
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const pagedPosts = combinedPosts.slice(start, end);

  if (pagedPosts.length === 0) {
    newsContainer.innerHTML = "<p>No stories to display.</p>";
    return;
  }

  pagedPosts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post fade-in";
    div.innerHTML = `<h3>${post.title || "Untitled"}</h3><p>${post.content || "No content."}</p><small>${post.date || "Unknown date"}</small>`;
    newsContainer.appendChild(div);
  });

  renderPagination();
}

// Render pagination controls
function renderPagination() {
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(combinedPosts.length / POSTS_PER_PAGE);
  if (totalPages <= 1) return;

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Prev";
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    currentPage--;
    renderPosts(currentPage);
  };

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
    currentPage++;
    renderPosts(currentPage);
  };

  paginationContainer.appendChild(prevBtn);
  const pageInfo = document.createElement("span");
  pageInfo.textContent = ` Page ${currentPage} of ${totalPages} `;
  paginationContainer.appendChild(pageInfo);
  paginationContainer.appendChild(nextBtn);
}

// Render local posts immediately
localPosts.forEach(post => {
  const div = document.createElement("div");
  div.className = "post fade-in";
  div.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p><small>${post.date}</small>`;
  localContainer.appendChild(div);
});

// Fetch external posts
showLoading();
fetch("/api/news")
  .then(res => res.json())
  .then(data => {
    const fetched = [
      ...(data.standard || []),
      ...(data.nyt || [])
    ];
    combinedPosts = fetched;
    renderPosts(currentPage);
  })
  .catch(err => {
    console.error("Error loading posts:", err);
    newsContainer.innerHTML = `<p style="color:red;">Failed to load news. Please try again later.</p>`;
  });
