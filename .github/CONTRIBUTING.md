## 前言

无论如何，想做出贡献，你需要一个 Github 账户

## 反馈指南

#### Part 1: 如何向我们反馈问题

1. 打开我们仓库的 [Bug 反馈页面](https://github.com/Yuns-Lab/JingHai-Panel/issues/new?assignees=&labels=%C2%B7+Bug%2C%E6%96%B0%E5%8F%8D%E9%A6%88&projects=&template=1bug.yml)
2. 填写反馈标题
3. 认真确认检查项中的内容
4. 填写描述、重现步骤（如果有），并上传包含 Bug 的截图
5. 如果你有意向修复此 Bug 请勾选意向调查中的选项
6. 点击 Submit new issue
7. 等待我们处理

#### Part 2: 如何向我们提出优化/新功能建议
1. 打开我们仓库的 [优化反馈界面](https://github.com/Yuns-Lab/JingHai-Panel/issues/new?assignees=&labels=%C2%B7+%E4%BC%98%E5%8C%96%2C%E6%96%B0%E5%8F%8D%E9%A6%88&projects=&template=2addon.yml) 或 [新功能反馈页面](https://github.com/Yuns-Lab/JingHai-Panel/issues/new?assignees=&labels=%C2%B7+%E6%96%B0%E5%8A%9F%E8%83%BD%2C%E6%96%B0%E5%8F%8D%E9%A6%88&projects=&template=3feature.yml)
2. 填写反馈标题
3. 认真确认检查项中的内容
4. 填写描述和原因
5. 如果你有意向制作此 优化/新功能 请勾选意向调查中的选项
6. 点击 Submit new issue
7. 等待我们处理


#### Part 3: 注意事项
1. 标题的命名请**保证简短且可以有效概括反馈内容**
<details>
<summary>标题命名示例</summary>
<br>

> 此部分引用自 Hex-Dragon/PCL2#1930 的附文\
> 虽然看起来关系不大，但请模仿着下方的正确示例填写标题

- ✔ Mod 管理选择 Mod 后下方按钮显示异常
    - 此标题明了地标明了问题出现位置及问题具体情况。
- ✔ 支持通过快捷键全选 Mod
    - 此标题清晰地表达了对于某内容的期望，并给出了可供参考的解决方案。
- ❌ 游戏崩了
    - 此标题……概括性极强……对……就……挺强的……就
- ❌ 5个建议
    - 请注意，不要一个 Issue 提交多个反馈内容，处理起来真的很头大。

</details>

2. **请认真，认真，认真地确认检查项！** 我们非常不建议无脑勾选检查项\
   如果每个人都认真的检查好了再提交反馈，我们的工作量将大大减少

3. Bug 反馈请尽量提供重现步骤和截图，这能帮助我们更快的定位问题\
   优化/新功能建议请尽量详细的描述你的需求，这能帮助我们更快的判断需要制作的功能

## 贡献指南

#### Part 1: 如何向我们贡献你的代码

1. 来到仓库页面，点击右上角的 Fork 按钮
2. 创建一个仓库副本在你的账户上
3. 提交你想更改的代码到你的副本仓库
4. 来到我们的 [Pull Request 页面](https://github.com/Yuns-Lab/JingHai-Panel/pulls)，点击 New pull requests
5. 选择从你的副本仓库合并到我们的主仓库
6. 填写 Pull Request 标题和描述
7. ~~签署 CLA~~（此项暂无，我们还未设置仓库的 CLA）
8. 点击 Create Pull Request 按钮
9. 等待我们处理 Pull Request

#### Part 2: 注意事项

1. 请尽量使用我们的代码风格，或使用代码格式化工具

   > [!NOTE]
   >
   > - 我们默认使用 4 空格缩进
   > - 通常文件的名字是和其实现功能有关
   >
2. 命名规范

   > [!NOTE]
   >
   > - 文件名：使用小写字母，单词之间使用下划线 `_` 连接
   > - HTML class/id 名：使用小写字母，单词之间使用短横线 `-` 连接
   > - JS中：
   >   \- 变量名：使用小写字母，单词之间使用下划线 `_` 连接
   >   \- 函数名：使用驼峰命名法
   >
3. 特别注意事项

   > [!IMPORTANT]
   >
   > 你通常不应当直接修改 `assets/css/*.css` 文件，而是修改其中的 `*.less` 文件后由插件编译
   >
   > VSCode less编译插件名字：**Easy Less**，其他 IDE 请自行寻找等效插件
   >
