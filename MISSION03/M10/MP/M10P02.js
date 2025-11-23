//! CMD interface
const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "output", "messy");
const organizeDir = path.join(__dirname, "output", "organized");

const categories = {
  images: [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"],
  documents: [".pdf", ".doc", ".docx", ".txt", ".rtf"],
  videos: [".mp4", ".avi", ".mkv", ".mov", ".wmv"],
  audio: [".mp3", ".wav", ".aac", ".ogg"],
  code: [
    ".js",
    ".ts",
    ".py",
    ".java",
    ".c",
    ".cpp",
    ".cs",
    ".go",
    ".rs",
    ".html",
    ".css",
  ],
  archives: [".zip", ".rar", ".tar", ".gz", ".7z", ".tar.gz"],
  spreadsheets: [".xls", ".xlsx", ".csv"],
  others: [],
};

const testFiles = [
  "vacation.jpg",
  "report.pdf",
  "presentation.pptx",
  "music.mp3",
  "video.mp4",
  "script.js",
  "data.csv",
  "archive.zip",
  "photo.png",
  "notes.txt",
  "app.py",
  "movie.avi",
  "song.wav",
  "backup.tar.gz",
  "random.xyz",
  "node.js",
  "nodejs.7z",
  "main.go",
  "tsc.ts",
];

//? Utility to create folder safely
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function initializeDirectories() {
  ensureDir(sourceDir);
  //? create test files only if folder was empty
  if (fs.readdirSync(sourceDir).length === 0) {
    testFiles.forEach((file) => {
      fs.writeFileSync(path.join(sourceDir, file), `Content for ${file}`);
    });
    console.log(`Messy files are created successfully!!`);
  }

  ensureDir(organizeDir);
  //? Creating category folder
  Object.keys(categories).forEach((cat) => {
    ensureDir(path.join(organizeDir, cat));
  });
}

function getCategory(filename) {
  const ext = path.extname(filename).toLowerCase();
  //? Special case
  if (filename.endsWith(".tar.gz")) return "archives";

  for (const [category, extensions] of Object.entries(categories)) {
    if (extensions.includes(ext)) return category;
  }
  return "others";
}

function organizeFiles() {
  //? Ensure required dirs exist
  ensureDir(sourceDir);
  ensureDir(organizeDir);

  //? Ensure category dirs exist
  Object.keys(categories).forEach((cat) => {
    ensureDir(path.join(organizeDir, cat));
  });

  const files = fs.readdirSync(sourceDir);
  if (files.length === 0) {
    console.log("No files to organize!");
    return;
  }
  console.log(`Found ${files.length} files...\n`);

  const stats = {
    total: 0,
    byCategory: {},
  };

  files.forEach((file) => {
    const src = path.join(sourceDir, file);
    // console.log("Source PATH: ", src);
    if (fs.statSync(src).isDirectory()) return;

    const category = getCategory(file);
    const dest = path.join(organizeDir, category, file);
    // console.log("Destination PATH: ", dest);

    fs.copyFileSync(src, dest);

    stats.total++;
    stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;
    console.log(`${file} → ${category}`);
  });

  console.log("\n--- SUMMARY ---");
  console.log(stats);
}

function help() {
  console.log(`
Commands:
  init      → create messy files
  org       → organize files

Examples:
  node file-organizer init
  node file-organizer org
  `);
}

const cmd = process.argv[2];
switch (cmd) {
  case "init":
    initializeDirectories();
    break;

  case "org":
    organizeFiles();
    break;

  default:
    help();
}
