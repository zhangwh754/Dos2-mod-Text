const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const { create } = require("xmlbuilder2");

async function LsxToXml(inputDir, outputDir) {
  fs.readdir(inputDir, (err, files) => {
    if (err) {
      console.error("读取文件夹失败:", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.resolve(__dirname, inputDir, file);

      if (fs.statSync(filePath).isDirectory()) {
        // 递归
        const newOutputDir = path.resolve(outputDir, file);
        if (!fs.existsSync(newOutputDir)) {
          fs.mkdirSync(newOutputDir);
        }

        LsxToXml(filePath, newOutputDir);

        return;
      }

      const filename = path.basename(filePath, ".lsx");
      const inputContent = fs.readFileSync(filePath, "utf-8");
      const outputPath = path.resolve(__dirname, outputDir, `${filename}.xml`);

      convertLsxToXml(inputContent, outputPath);
    });
  });
}

async function convertLsxToXml(inputContent, outputPath) {
  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(inputContent);

  // 提取所有TranslatedStringKey节点
  const contents = [];
  const regions = result.save.region || [];

  for (const region of regions) {
    if (region.$.id === "TranslatedStringKeys") {
      const rootNodes = region.node || [];
      for (const rootNode of rootNodes) {
        if (rootNode.$.id === "root") {
          const childrenList = rootNode.children || [];
          for (const children of childrenList) {
            const nodes = children.node || [];
            for (const node of nodes) {
              if (node.$.id === "TranslatedStringKey") {
                const contentAttr = (node.attribute || []).find(
                  (attr) => attr.$.id === "Content"
                );

                if (contentAttr && contentAttr.$.handle) {
                  contents.push({
                    uid: contentAttr.$.handle,
                    value: contentAttr.$.value || "",
                  });
                }
              }
            }
          }
        }
      }
    }
  }

  // 创建新XML
  const root = create({ version: "1.0", encoding: "utf-8" }).ele("contentList");

  if (contents.length <= 1) {
    contents.push({ uid: "foo", value: "" }, { uid: "bar", value: "" });
  }

  contents.forEach((content) => {
    root.ele("content", { contentuid: content.uid }).txt(content.value);
  });

  const outputXml = root.end({ prettyPrint: true });

  // 写入输出文件
  fs.writeFileSync(outputPath, outputXml);
  console.log(`${path.basename(outputPath)}转换完成！`);
}

LsxToXml("./Original", "./English");
