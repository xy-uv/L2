// console.log("Directory: ", __dirname);
// console.log("File Name: ", __filename);
const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "OUTPUT", "messy-files");
const organizeDir = path.join(__dirname, "OUTPUT", "organized");

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
  archives: [".zip", ".rar", ".tar", ".gz", ".7z"],
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

function initializeDirectories() {
  if (!fs.existsSync(sourceDir)) {
    fs.mkdirSync(sourceDir, { recursive: true });

    testFiles.forEach((file) => {
      try {
        fs.writeFileSync(path.join(sourceDir, file), `Content of ${file}`);
      } catch (error) {
        console.error("ERROR Happened: ", error.message);
      }
    });
    console.log("Messy Files are created!!");
  }
  if (!fs.existsSync(organizeDir)) {
    fs.mkdirSync(organizeDir, { recursive: true });

    Object.keys(categories).forEach((category) => {
      const categoryPath = path.join(organizeDir, category);
      if (!fs.existsSync(categoryPath)) {
        fs.mkdirSync(categoryPath);
      }
    });
  }
}

function getCategory(filename) {
  const ext = path.extname(filename).toLowerCase(); //If there was some mistake
  for (const [category, extensions] of Object.entries(categories)) {
    if (extensions.includes(ext)) {
      return category;
    }
  }
  return "others";
}

function organizeFiles() {
  console.log("file organizer \n");
  console.log("source: ", sourceDir);
  console.log("Destination: ", organizeDir);
  console.log("\n" + "-".repeat(50) + "\n");

  const files = fs.readdirSync(sourceDir);
  //   console.log(files);
  if (files.length === 0) {
    console.log("No files to work on!!");
    return;
  }
  console.log(`found ${files.length} files to organize \n`);

  const stats = {
    total: 0,
    byCategory: {},
  };
  files.forEach((file) => {
    const sourcePath = path.join(sourceDir, file);
    const stat = fs.statSync(sourcePath);
    if (stat.isDirectory()) {
      return;
    }
    const category = getCategory(file);
    const destDir = path.join(organizeDir, category);
    const destPath = path.join(destDir, file);

    fs.copyFileSync(sourcePath, destPath);

    stats.total++;
    stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;

    console.log(`${file}`);
    console.log(`${category}`);
    console.log(`${stat.size}`);
  });
}

function help() {
  console.log(`
        file organizer - usage:

        commands: 
        init - create files
        organize - organize files into categories

        example:
        node file-organizer init
        node file-organizer organize
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
    break;
}
