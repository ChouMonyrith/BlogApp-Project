import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let posts = [];

app.get("/", (req, res) => {
  res.render("pages/home.ejs", { posts });
});

app.get("/create", (req, res) => {
  res.render("pages/create.ejs");
});

app.get("/post/:id", (req, res) => {
  const post = posts.find((p) => p.id == req.params.id);
  if (post) {
    res.render("pages/post", { post });
  } else {
    res.status(404).send("Post Not Found");
  }
});

app.post("/create", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
  };
  posts.push(newPost);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} `);
});
