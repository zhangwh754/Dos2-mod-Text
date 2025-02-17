const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const { create, convert } = require("xmlbuilder2");

function updateLSX(originDir, inputDir, outputDir) {
  fs.readdir(originDir, (err, files) => {
    if (err) {
      console.error("读取文件夹失败:", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.resolve(__dirname, originDir, file);

      if (fs.statSync(filePath).isDirectory()) {
        updateLSX(filePath, inputDir, outputDir);

        return;
      }

      if (path.extname(filePath) === ".lsx") {
        const inputContent = fs.readFileSync(filePath, "utf-8");
        const inputPath = path.resolve(
          __dirname,
          inputDir,
          file.replace(".lsx", ".xml")
        );
        const outputPath = path.resolve(__dirname, outputDir, file);

        convertXmlToLsx(inputContent, inputPath, outputPath);
      }
    });
  });
}

async function convertXmlToLsx(inputContent, translatedFile, outputFile) {
  try {
    const parser = new xml2js.Parser();
    const lsxObj = await parser.parseStringPromise(inputContent);

    // 读取并解析翻译后的XML
    const translatedContent = fs.readFileSync(translatedFile, "utf-8");
    const transParser = new xml2js.Parser({ explicitArray: false });
    const transObj = await transParser.parseStringPromise(translatedContent);

    // 创建翻译内容映射表
    const contentMap = new Map();
    transObj.contentList.content.forEach((item) => {
      contentMap.set(item.$.contentuid, item._);
    });

    const regions = lsxObj.save.region || [];

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

                  contentAttr.$.value = contentMap.get(contentAttr.$.handle);
                }
              }
            }
          }
        }
      }
    }

    // 构建新的XML
    const builder = new xml2js.Builder({
      xmldec: { version: "1.0", encoding: "utf-8" },
      renderOpts: { pretty: true, indent: "  ", newline: "\n" },
    });
    const updatedXml = builder.buildObject(lsxObj);

    // 保存更新后的文件
    fs.writeFileSync(outputFile, updatedXml);
    console.log("更新完成！");
  } catch (err) {
    console.error("处理出错:", err);
  }
}

updateLSX("./Original", "./Chinese", "./Output");
