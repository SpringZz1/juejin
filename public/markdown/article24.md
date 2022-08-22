---
title: ���㿪ʼ����һ��node-cli����
date: 2022-08-01T14:45:04.000Z
comments: true
categories:
  - node
tags:
  - node
theme: smartblue
---

## ʲô��CLI

�����н��棨Ӣ�command-line interface����д��CLI������ͼ���û�����õ��ռ�֮ǰʹ����Ϊ�㷺���û����棬��ͨ����֧����꣬�û�ͨ����������ָ���������յ�ָ�������ִ�С�Ҳ���˳�֮Ϊ�ַ��û����棨character user interface, CUI����

## CLI����ʲô

��������Ŀ����ʱ���������õ�һЩcli���ߣ�����`vue-cli`��`npm init`�ȵȣ���ЩCLI�������ǳ���������Ŀ��ʼ���������顢ģ�崴���Ƚ�����Լ򵥣����ظ��Խ϶�Ĺ�����

## ׼������

ʵ��CLI���߿����ķ�ʽ�������кܶ࣬����ֻ���ܻ���node��ʵ�ַ�����

### Hello World

���չ��������ǵ�һ�����Ǵ�`Hello World`��ʼ��

���ȣ����빤������������������ĿĿ¼`hello-cli`��ִ��`npm`��ʼ�����

```bash
mkdir hello-cli
cd hello-cli
npm init
```

�����ѡ��һϵ����Ŀ����

```bash
package name: (hello-cli) 
version: (1.0.0) 
description: hello world
entry point: (index.js) 
test command: test
git repository: 
keywords: cli
author: mulianju
license: (ISC) 
```

`npm`���Զ���������Ŀ�����ļ�`package.json`

```json
{
  "name": "hello-cli",
  "version": "1.0.0",
  "description": "hello world",
  "main": "index.js",
  "scripts": {
    "test": "test"
  },
  "keywords": [
    "cli"
  ],
  "author": "mulianju",
  "license": "ISC"
}
```

����Ŀ��Ŀ¼������`bin`�ļ��У�����`bin`�ļ����ڴ���`hello-cli.js`�ļ����ļ���д�룺

```javascript
#!/usr/bin/env node
console.log('Hello World!')
```

> ע���ļ���һ�еġ�**ע��**�������С�ע�͡���������ͨ�ġ�ע�͡�����������������CLI���ߵĿ������ԣ�����ǧ��Ҫɾ����

��`package.json`�����`bin`�ֶΣ���������һ���������������ָ���ִ���ļ����ɣ�

```json
"bin": {
  "hello-cli": "bin/hello-cli.js"
},
```

ִ�б��ذ�װ��

```bash
npm link
```

���ˣ����ǵĵ�һ��CLI���߾Ϳ�������ˡ������½����ն˴��ڣ�ִ�������Զ����������ɿ���Ч����

```bash
hello-cli
```

��������

```bash
Hello World!
```

### CLI����

CLI������ؼ���һ���㣬�����û��������򵥵Ľ������Լ�����չ���ǵ�CLI���������������������õ���`npm init`��һЩ��Ŀ��Ϣ����Ҫ�����ǳ�ʼ����Ŀ�����У�ͨ��CLI�����ѡ��

����ʵ��CLI�����ģ���Ҫ����������������

- `commander`:������`node.js`�����н��������[��ϸ����](https://github.com/tj/commander.js)
- `inquirer`:��������ʽ�������û�����ļ��ϡ�[��ϸ����](https://github.com/SBoudrias/Inquirer.js)

> **ע��:**`inquirer`��`9.0.0`�汾��ʼ��ģ�黯��ʽ��Ϊ`native esm modules`������֮�⣬��������Ŀ��ʹ�õ���`CMD`ģ�黯��ʽ������Ҫ����`inquirer`�İ汾����`9.0.0`�����򽫻��׳����´���

```bash
internal/modules/cjs/loader.js:1102
      throw new ERR_REQUIRE_ESM(filename, parentPath, packageJsonPath);
      ^

Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: /mnt/d/work/work/2022/08/hello-cli/node_modules/inquirer/lib/inquirer.js
require() of ES modules is not supported.
require() of /mnt/d/work/work/2022/08/hello-cli/node_modules/inquirer/lib/inquirer.js from /mnt/d/work/work/2022/08/hello-cli/bin/hello-cli.js is an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which defines all .js files in that package scope as ES modules.
Instead rename inquirer.js to end in .cjs, change the requiring code to use import(), or remove "type": "module" from /mnt/d/work/work/2022/08/hello-cli/node_modules/inquirer/package.json.

    at new NodeError (internal/errors.js:322:7)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1102:13)
    at Module.load (internal/modules/cjs/loader.js:950:32)
    at Function.Module._load (internal/modules/cjs/loader.js:790:12)
    at Module.require (internal/modules/cjs/loader.js:974:19)
    at require (internal/modules/cjs/helpers.js:101:18)
    at Object.<anonymous> (/mnt/d/work/work/2022/08/hello-cli/bin/hello-cli.js:3:18)
    at Module._compile (internal/modules/cjs/loader.js:1085:14)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1114:10)
    at Module.load (internal/modules/cjs/loader.js:950:32) {
  code: 'ERR_REQUIRE_ESM'
}
```

���������������ĸ�����ܣ�����ƪ��ԭ����������Ͳ���ϸչ����˵�ˣ���������ֻ��һ����򵥵�Ӧ�ã������Ĺ��ܣ���������ȥ����~

### ��Ŀʵ��

����Ӧ������ˣ�ͨ���û��������Ŀ��Ϣ��һЩĬ����Ϣ������ʼ��һ��`package.json`��Ŀ�����ļ��Ĺ��ܣ�

```javascript
#!/usr/bin/env node

const { program } = require("commander")
const inquire = require("inquirer")
const fs = require("fs")

const projectInfo = [
  {
    type: "input",
    message: "��������Ŀ����",
    name: "name",
    default: "project",
  },
  {
    type: "input",
    message: "��������Ŀ����",
    name: "description",
  },
  {
    type: "input",
    message: "��������Ŀ����",
    name: "author",
  },
  {
    type: "input",
    message: "��������Ŀgit�ֿ�",
    name: "git",
  },
  {
    type: "list",
    message: "��ѡ��ԴЭ��",
    name: "license",
    choices: ["ISC", "BSD", "GPL", "Apache Licence 2.0", "LGPL", "MIT"],
    default: "GPL",
  },
]

const defaultInfo = {
  version: "1.0.0",
  scripts: {},
}

const initAction = () => {
  inquire.prompt(projectInfo).then((answers) => {
    const info = Object.assign({}, defaultInfo, answers)
    fs.writeFile("package.json", JSON.stringify(info), function (err) {
      if (err) {
        res.status(500).send("д�����")
      } else {
        console.log("��Ŀ��ʼ���ɹ���������Ŀ��ϢΪ��\n", info)
      }
    })
  })
}

switch (process.argv[2]) {
  case "init":
    program
      .command("init")
      .description("��ʼ����Ŀ")
      .action(initAction)
      .parse(process.argv)
    break
  default:
    program
      .usage("<command>")
      .command("init", "��ʼ����Ŀ")
      .parse(process.argv)
    break
}

```

### ��չ����

�������ӣ�����ʵ�����Զ�����`package.json`�ļ���`CLI`��Ȼ��ֻ������ͣ�����һЩ`npm`�������ǻ�����ʵ�ָ��ḻ�Ĺ��ܡ�

#### �Զ���¡Զ��git�ֿ�

���ȣ���װ��������:

```bash
npm install shelljs --save
```

��д���ܣ�

```javascript
const inquire = require("inquirer")
const shell = require("shelljs")

const projectInfo = [
  {
    type: "input",
    message: "��������Ŀ����",
    name: "name",
    default: "project",
  }
]

const gitRepository = 'https://github.com/mulianju/hello-cli.git'

const initWithGit = () => {
  inquire.prompt(projectInfo).then((answers) => {
    console.log('��Ŀ���ڴ���...')
    const { name = 'project' } = answers
    shell.exec(`
      rm -rf ./hello-cli
      git clone ${gitRepository}
      rm -rf ./hello-cli/.git
      mv hello-cli ${name}
      cd ${name};
    `)
  })
}

module.exports = {
  initWithGit
}

```

���У�

```bash
hello-cli initWithGit

## CLI���������
? ��������Ŀ���� project
��Ŀ���ڴ���...
Cloning into 'hello-cli'...

```


#### �Զ�����ģ��

���ȣ���װ��������:

```bash
npm install art-template chalk --save
```

> **ע��:**`chalk`��`5.0.0`�汾��ʼ��ģ�黯��ʽҲ����ˣ���`inquirer`���ƣ�[�ο�](https://github.com/chalk/chalk#install)

��д���ܣ�

```javascript
const inquirer = require("inquirer")
const fs = require("fs")
const template = require("art-template")
const chalk = require("chalk")
const path = require('path')
const {
  capitalize,
  camelize,
  mkdirsSync
} = require('./utils')

const rootDir = '../../../..'

const choices = [
  {
    title: "ҳ��(page)",
    value: "page",
  },
  { title: "���(component)", value: "component" },
]

const promptInfo = [
  {
    type: "list",
    name: "type",
    message: "��ѡ����Ҫ����������?",
    prefix: "[?]",
    choices: choices.map((item) => item.title),
    filter(val) {
      return choices.find((item) => item.title == val).value
    },
  },
  {
    type: "input",
    name: "name",
    message: `����������(֧�ֶ༶·��, ��:xxx/xxx)?`,
    prefix: "[?]",
    default: "index",
  },
]

const checkTemplatesExistsSync = async () => {
  console.log(__dirname)
  const results = [
    fs.existsSync(path.resolve(__dirname, rootDir, './templates/component.vue.art')),
    fs.existsSync(path.resolve(__dirname, rootDir, './templates/page.vue.art')),
  ]
    .filter((isExist) => !isExist)
    .map((_, index) => choices[index].title)

  if (results.length) {
    console.log(
      `${chalk.green(results.join(","))}${chalk.red(
        "ģ�岻���ڣ����ȴ���ģ��"
      )}`
    )
  } else {
    return true
  }
}

const add = async () => {
  if (await checkTemplatesExistsSync()) {
    inquirer
      .prompt(promptInfo)
      .then(async (answers) => {
        const { type, name: inputName } = answers

        const nameMap = inputName.split('/')
        const name = capitalize(camelize(nameMap.pop()))
        const dirname = path.resolve(__dirname, rootDir, `./${type}s/${nameMap.join('/')}`)
        const templateDir = path.resolve(__dirname, rootDir, `./templates/${type}.vue.art`)

        if (!fs.existsSync(path.resolve(dirname, `./${name}.vue`))) {
          mkdirsSync(dirname)
          fs.writeFileSync(path.resolve(dirname, `./${name}.vue`), template(templateDir, {
            name
          }), 'utf8')
        } else {
          const role = choices.find(item => item.value == type)
          console.log(`${chalk.red(role.title)}: ${chalk.green(name)} ${chalk.red('�Ѿ����ڣ��������������԰�')}`)
        }
        console.log(answers)
      })
  }
}

module.exports = {
  add
}
```

���У�

```bash
## ע�⣺��ʹ�ô˹��ܣ��뽫hello-cli��Ŀ���õ���Ŀnode_modules�ļ��У���ִ��npm link���ذ�װ
## ������Ŀ��Ŀ¼�贴��templates�ļ���
## �����component.vue.art��page.vue.art����art-templateģ���ļ�
hello-cli add

## CLI����
[?] ��ѡ����Ҫ����������? ���(component)
[?] ����������(֧�ֶ༶·��, ��:xxx/xxx)? index/test_component

```

���к󣬻�����Ŀ��Ŀ¼�Զ�����`components/index/TestComponent.vue`�ļ�

���ϣ������������ӣ����๦���ڴ�����̽��

## ����

���İ�����������ڿ�Դ��Ŀ: [hello-cli](https://github.com/mulianju/hello-cli)

�������õ�ַ��[���㿪ʼ����һ��node-cli����](https://www.mulianju.com/develop-node-cli/)
