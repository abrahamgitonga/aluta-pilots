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

localPosts.forEach(post => {
  const div = document.createElement("div");
  div.className = "post";
  div.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p><small>${post.date}</small>`;
  localContainer.appendChild(div);
});

// fetch("/api/news")
//   .then(res => res.json())
//   .then(data => {
//     [...data.standard, ...data.nyt].forEach(article => {
//       const div = document.createElement("div");
//       div.className = "post";
//       div.innerHTML = `<h3><a href="${article.link}" target="_blank">${article.title}</a></h3><p>${article.contentSnippet}</p><small>${article.pubDate}</small>`;
//       newsContainer.appendChild(div);
//     });
//   });

  fetch("/api/news")
  .then(res => res.json())
  .then(data => {
    data.forEach(post => {
      const div = document.createElement("div");
      div.className = "post";
      div.innerHTML = `
        <h2>${post.title}</h2>
        <p><a href="${post.link}" target="_blank">${post.source}</a></p>
        <small>${new Date(post.pubDate).toLocaleDateString()}</small>`;
      document.getElementById("blog-posts").appendChild(div);
    });
  })
  .catch(err => console.error("Error loading posts", err));

