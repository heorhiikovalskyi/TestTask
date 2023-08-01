import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const fileName = "info.json";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isDirectory = (dirElement) => {
  return fs.lstatSync(dirElement).isDirectory();
};

const getDirElements = (dirName) => {
  const dirElements = fs.readdirSync(dirName).map((fileName) => {
    return path.join(dirName, fileName);
  });
  return dirElements;
};

const deleteFiles = (dirName) => {
  const dirElements = getDirElements(dirName);
  const folders = dirElements.filter(isDirectory);
  const filePath = path.join(dirName, fileName);
  fs.unlink(filePath, (err) => {
    if (err) console.log(err);
  });
  folders.forEach((folder) => deleteFiles(folder));
};

const createFiles = (dirName) => {
  const dirElements = getDirElements(dirName);
  const folders = dirElements.filter(isDirectory);
  const filePath = path.join(dirName, fileName);
  const foldersCount = folders.length;
  const filesCount = dirElements.length - foldersCount + 1;
  const folderInfo = { filePath, foldersCount, filesCount };
  fs.writeFile(filePath, JSON.stringify(folderInfo), (err) => {
    if (err) console.log(err);
  });
  folders.forEach((folder) => createFiles(folder));
};

//createFiles(__dirname);
//deleteFiles(__dirname);
