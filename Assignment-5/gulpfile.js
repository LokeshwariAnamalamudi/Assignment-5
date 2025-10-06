// gulpfile.js
const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

// del@8 exposes deleteAsync via ESM import
async function clean() {
  const { deleteAsync } = await import("del");
  return deleteAsync(["dist"]);
}

const paths = {
  entry: "src/scss/main.scss",
  scss: "src/scss/**/*.scss",
  out: "dist/css",
};

function styles() {
  return src(paths.entry)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.out));
}

function dev() {
  watch(paths.scss, styles);
}

exports.clean = clean;
exports.styles = styles;
exports.dev = series(styles, dev);
exports.default = series(clean, styles);
