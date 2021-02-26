// @ts-check
import fs from 'fs-extra';
import { execSync } from 'child_process';
import svgo from 'svgo';
import * as icons from '@icon-park/svg';

const meta = {
  bytemd: {
    heading: () =>
      `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 1V14.33" stroke="currentColor" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.9971 1V14.33" stroke="currentColor" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 7.66498H12.9975" stroke="currentColor" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    h1: icons.H1,
    h2: icons.H2,
    h3: icons.H3,
    h4: icons.LevelFourTitle,
    h5: icons.LevelFiveTitle,
    h6: icons.LevelSixTitle,
    bold: icons.TextBold,
    italic: icons.TextItalic,
    quote: icons.Quote,
    link: icons.LinkOne,
    image: icons.Pic,
    code: icons.Code,
    codeBlock: icons.CodeBrackets,
    ol: icons.OrderedList,
    ul: icons.ListTwo,
    hr: icons.DividingLine,
    info: icons.Info,
    fullscreenOn: icons.FullScreen,
    fullscreenOff: icons.OffScreen,
    help: icons.Helpcenter,
    toc: icons.AlignTextLeftOne,
    close: icons.Close,
    left: icons.LeftExpand,
    right: icons.RightExpand,
    more: icons.More,
  },
  'plugin-gfm': {
    strikethrough: icons.Strikethrough,
    task: icons.CheckCorrect,
    table: icons.InsertTable,
  },
  'plugin-math': {
    math: icons.Formula,
    inline: icons.Inline,
    block: icons.Block,
  },
  'plugin-mermaid': {
    mermaid: icons.ChartGraph,
  },
};

(async () => {
  for (let [p, mapper] of Object.entries(meta)) {
    let obj = {};
    for (let [key, factory] of Object.entries(mapper)) {
      const svg = await svgo.optimize(factory({}));
      obj[key] = svg.data;
    }

    fs.writeFileSync(
      `./packages/${p}/src/icons.ts`,
      `// DO NOT EDIT, generated by scripts/icon.js
      export const icons=${JSON.stringify(obj)}`
    );
  }

  execSync('npx prettier --write packages/**/*.ts');
})();
