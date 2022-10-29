import { PathOrFileDescriptor, readFileSync, writeFileSync } from "fs";
import { format } from "prettier";

const CSS_ROOT_REGEXP = /\:root \{.*?\}/s;
const CSS_PROPERTY_REGEXP = /.*?\;/g;
const TS_PROPERTY_REGEXP = /\{.*?\}/s;

const PATH = process.cwd();
const GLOBALS_CSS_PATH = `${PATH}/styles/globals.css`;
const STYLE_TS_PATH = `${PATH}/utils/style.ts`;

const read = (path: PathOrFileDescriptor) => {
  return readFileSync(path, {
    encoding: "utf8",
  });
};

const write = (path: PathOrFileDescriptor, data: string) => {
  writeFileSync(
    path,
    format(data, {
      parser: "typescript",
    }),
  );
};

const globalsCssFile = read(GLOBALS_CSS_PATH);

const root = globalsCssFile.match(CSS_ROOT_REGEXP)?.[0];

if (!root) {
  throw "ROOT_REGEXP not match";
}

const formattedProperty = root.replace(CSS_PROPERTY_REGEXP, (match) => {
  const [key, value] = match?.split(":");
  return `"${key.trim()}":"${value?.replace(";", "")}",`;
});

const styleTsFile = read(STYLE_TS_PATH);

const newTsFile = styleTsFile.replace(
  TS_PROPERTY_REGEXP,
  formattedProperty.match(TS_PROPERTY_REGEXP)?.[0] ?? "",
);

write(STYLE_TS_PATH, newTsFile);
