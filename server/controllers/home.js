export const Home = {
  Index: (req, res) => {
    res.render("home/index", { title: "Travel Angel" });
  },

  Timeline: (req, res) => {
    const user = (req.session.user)
  }
};
