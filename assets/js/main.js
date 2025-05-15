$(document).on("click", ".open-menu", function () {
  $("#sidebar").addClass("show");
  $("#content").addClass("shifted");
  $(".open-menu").addClass("d-none");
  $(".close-menu").removeClass("d-none");

  $("#sidebar .nav-tab a").removeClass("show");

  $("#sidebar .nav-tab a").each(function (index) {
    $(this)
      .delay(index * 150)
      .queue(function (next) {
        $(this).addClass("show");
        next();
      });
  });
});

$(document).on("click", ".close-menu", function () {
  $("#sidebar").removeClass("show");
  $("#content").removeClass("shifted");
  $(".open-menu").removeClass("d-none");
  $(".close-menu").addClass("d-none");

  $("#sidebar .nav-tab a").removeClass("show");
});

$(document).on("click", "#sidebar .nav-tab a", function () {
  $("#sidebar").removeClass("show");
  $("#content").removeClass("shifted");
  $(".open-menu").removeClass("d-none");
  $(".close-menu").addClass("d-none");

  $("#sidebar .nav-tab a").removeClass("show");
});
$("a").on("click", function (e) {
  if ($(this).attr("href") === "#") {
    e.preventDefault();
  }
  $("#sidebar").removeClass("show");
  $("#content").removeClass("shifted");
  $(".open-menu").removeClass("d-none");
  $(".close-menu").addClass("d-none");
  $("#sidebar .nav-tab a").removeClass("show");
});
