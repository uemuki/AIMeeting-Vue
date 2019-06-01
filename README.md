# zhoufan

### bug

```
ERROR in /Users/zhoufan/Documents/AIMeeting-Vue/node_modules/element-ui/types/element-ui.d.ts
331:30 Cannot find name 'PluginObject'.
    329 |
    330 | /** InfiniteScroll Directive */
  > 331 | export const InfiniteScroll: PluginObject<ElInfiniteScroll>;
        |                              ^
    332 |
    333 | /** PageHeader Component */
    334 | export class PageHeader extends ElPageHeader {}
Version: typescript 3.5.1
Time: 3276ms
```

临时解决方案：
issue 见：https://github.com/ElemeFE/element/issues/15802 还没发布

修改这个文件 node_modules/element-ui/types/element-ui.d.ts

```
import Vue, { PluginObject } from 'vue'
```

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```
