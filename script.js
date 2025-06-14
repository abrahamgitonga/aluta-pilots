const posts = [
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

const container = document.getElementById("blog-posts");

posts.forEach(post => {
  const div = document.createElement("div");
  div.className = "post";
  div.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p><small>${post.date}</small>`;
  container.appendChild(div);
});
