const HomeController = {
  Index: (req, res) => {
    res.render({title: "Travel Angel" });
  }
};

module.exports = HomeController;