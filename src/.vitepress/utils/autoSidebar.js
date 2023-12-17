//侧边栏
const fs = require("fs");
const path = require("path");

const config = {
  title: "text",
  link: "link",
  items: "items",
  indexFile: "index",
};
const { title, link, items, indexFile } = config;

/**
 * 过滤所要导航的文件
 * 文件名 包含.md 但 不包含  README */
function checkFileType(path) {
  return path.includes(".md") && !path.includes("README");
}

/**
 * 格式化文件路径*/
function prefixPath(basePath, dirPath) {
  // replace用于去除相对路径
  basePath = basePath.replace(/([\.\\\/])(?!([\.]?[\u4E00-\u9FA5A-Za-z0-9]))/g, "");
  // replace用于处理windows电脑的路径用\表示的问题
  return path.join(basePath, dirPath).replace(/\\/g, "/");
}

/**
 * 截取文档路径*/
function getPath(path, ele) {
  let item = prefixPath(path, ele);
  let result = item.split("/");
  result.splice(1, 1);
  return result.join("/");
}

/**
 * 选择数组中已有元素*/
function chooseItem(root, ele) {
  return root.find(({ [title]: text }) => text == ele);
}

/**
 * 递归获取分组信息并排序*/
function getGroupChildren(path, ele, root, excludeList, deep = 0) {
  let palist = fs.readdirSync(path + "/" + ele + "/").sort((a, b) => {
    const isDirA = fs.statSync(path + "/" + ele + "/" + a).isDirectory();
    const isDirB = fs.statSync(path + "/" + ele + "/" + b).isDirectory();

    if (isDirA && !isDirB) {
      return -1; // 目录排在文件前面
    } else if (!isDirA && isDirB) {
      return 1; // 文件排在目录前面
    } else {
      // 目录和文件内部按照你的顺序排序
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    }
  });
  palist.forEach((item) => {
    // 在排除列表中的目录将被跳过
    for (var i = 0; i < excludeList.length; i++) {
      if (item.includes(excludeList[i]) || item.startsWith(excludeList[i]) || item.endsWith(excludeList[i])) {
        return;
      }
    }
    let group = {};
    if (item.includes(indexFile)) {
      group[title] = "开始"; // item.replace(".md", "");
      group[link] = getPath(path + "/" + ele, item).replace(".md", ".html");
      const getItem = chooseItem(root, ele);
      if (getItem) return getItem[items].splice(0, 0, group);

      return root.splice(0, 0, group);
    }
    let info = fs.statSync(path + "/" + ele + "/" + item);
    if (info.isDirectory()) {
      let children = [];
      group[title] = item;
      group.collapsed = true
      getGroupChildren(path + "/" + ele, item, children, excludeList, deep + 1);
      // group.children = children;
      group[items] = children;
      return root.push(group);
    } else if (checkFileType(item)) {
      group[title] = item.replace(".md", "");
      group[link] = getPath(path + "/" + ele, item).replace(".md", "");
      if (deep) return root.push(group);
      const getItem = chooseItem(root, ele);
      if (getItem) return getItem[items].push(group);
      return root.push(group);
    }
  });
}
/**
 * 初始化*/
function getChildren(path, ele) {
  var root = [];
  // 需要排除的文件夹目录名称
  var excludeList = ["media", "image", "file"];
  getGroupChildren(path, ele, root, excludeList);
  // 排序字段
  var sortFieldList = [
    "开始",
    "系统介绍",
  ];
  // 字段排序
  recursiveSort(root, sortFieldList)
  return root;
}

/**
 * 字段排序
 */
function sortByTextOrder(items, sortOrder) {
  return items.sort((a, b) => {
    const indexA = sortOrder.indexOf(a.text);
    const indexB = sortOrder.indexOf(b.text);

    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    } else if (indexA !== -1) {
      return -1; // a 在排序字段中，优先放在前面
    } else if (indexB !== -1) {
      return 1; // b 在排序字段中，优先放在前面
    } else {
      return 0; // a 和 b 都不在排序字段中，保持默认排序顺序
    }
  });
}

function recursiveSort(items, sortOrder) {
  items.sort((a, b) => {
    const indexA = sortOrder.indexOf(a.text);
    const indexB = sortOrder.indexOf(b.text);

    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    } else if (indexA !== -1) {
      return -1;
    } else if (indexB !== -1) {
      return 1;
    } else {
      return 0;
    }
  });

  items.forEach(item => {
    if (item.items && item.items.length > 0) {
      item.items = recursiveSort(item.items, sortOrder);
    }
  });

  return items;
}
 
module.exports = { getChildren };
