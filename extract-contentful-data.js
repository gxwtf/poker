const fs = require('fs');
const path = require('path');

// 读取Contentful导出文件
const contentfulExportPath = path.join(__dirname, 'contentful', 'contentful-export-4tlsutsg5se1-master-2020-10-01T17-48-44.json');
const contentfulData = JSON.parse(fs.readFileSync(contentfulExportPath, 'utf8'));

// 提取所有条目
const entries = contentfulData.entries;

// 分离不同类型的条目
const staticPages = entries.filter(entry => entry.sys.contentType.sys.id === 'staticPage');
const strings = entries.filter(entry => entry.sys.contentType.sys.id === 'string');
const stringLongs = entries.filter(entry => entry.sys.contentType.sys.id === 'stringLong');
const keys = entries.filter(entry => entry.sys.contentType.sys.id === 'key');

// 构建ID到条目的映射
const entryMap = {};
entries.forEach(entry => {
  entryMap[entry.sys.id] = entry;
});

// 提取翻译信息
const translations = {
  de: {},
  en: {}
};

// 处理string和stringLong类型的条目
[strings, stringLongs].forEach(entryList => {
  entryList.forEach(entry => {
    const title = entry.fields.title.en;
    const value = entry.fields.value;
    
    if (value.de) {
      translations.de[title] = value.de;
    }
    if (value.en) {
      translations.en[title] = value.en;
    }
  });
});

// 处理key类型的条目
keys.forEach(keyEntry => {
  const keyName = keyEntry.fields.keyName.en;
  const valueLink = keyEntry.fields.value.en;
  const valueEntry = entryMap[valueLink.sys.id];
  
  if (valueEntry && valueEntry.fields.value) {
    const value = valueEntry.fields.value;
    
    if (value.de) {
      translations.de[keyName] = value.de;
    }
    if (value.en) {
      translations.en[keyName] = value.en;
    }
  }
});

// 提取静态页面数据
const staticPagesData = [];

staticPages.forEach(pageEntry => {
  const title = pageEntry.fields.title;
  const slug = pageEntry.fields.slug.en;
  const contentLink = pageEntry.fields.content.en;
  const contentEntry = entryMap[contentLink.sys.id];
  
  if (contentEntry && contentEntry.fields.value) {
    const content = contentEntry.fields.value;
    
    staticPagesData.push({
      slug: slug,
      title: title,
      content: content.en || content.de || ''
    });
  }
});

// 写入翻译文件
const localesDir = path.join(__dirname, 'client', 'src', 'i18n', 'locales');

// 读取现有的en.json文件，合并翻译
const existingEnPath = path.join(localesDir, 'en.json');
let existingEn = {};
if (fs.existsSync(existingEnPath)) {
  existingEn = JSON.parse(fs.readFileSync(existingEnPath, 'utf8'));
}

const mergedEn = { ...existingEn, ...translations.en };
fs.writeFileSync(path.join(localesDir, 'en.json'), JSON.stringify(mergedEn, null, 2));

// 写入de.json文件
fs.writeFileSync(path.join(localesDir, 'de.json'), JSON.stringify(translations.de, null, 2));

// 写入静态页面数据
const staticPagesPath = path.join(__dirname, 'client', 'src', 'data', 'staticPages.js');
const staticPagesContent = "// 静态页面数据，替代从 Contentful 获取的数据\nconst staticPages = [\n" +
  staticPagesData.map(page => {
    return "  {\n    slug: '" + page.slug + "',\n    title: " + JSON.stringify(page.title) + ",\n    content: " + JSON.stringify(page.content) + "\n  }";
  }).join(',\n') +
  "\n];\n\nexport default staticPages;\n";

fs.writeFileSync(staticPagesPath, staticPagesContent);

console.log('数据提取完成！');
console.log(`已更新翻译文件：`);
console.log(`- ${path.join(localesDir, 'en.json')}`);
console.log(`- ${path.join(localesDir, 'de.json')}`);
console.log(`已更新静态页面数据：`);
console.log(`- ${staticPagesPath}`);
