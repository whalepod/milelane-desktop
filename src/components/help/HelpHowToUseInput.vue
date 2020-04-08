<template>
  <section>
    <h1>milelaneの使い方</h1>
    <h2>タスクを追加する</h2>
    <p>
      タスクを追加するには、画面下部の「なにする？」と書かれている入力欄に、やりたいことを書いてみてください。<br>
      入力が終わったら<code>enter</code>で、タスクが反映されます。
    </p>
    <h2>タスクのタイトルを更新する</h2>
    <p>
      タスクのタイトルを更新するには、まずタスクをクリックして選択状態にします。選択状態になったタスクは、他よりも若干背景色が濃くなります。<br>
      選択状態になったら、<code>enter</code>を押してください。編集モードに切り替わるので、タイトルを書き換えましょう。<br>
      更新内容が確定したタイミングでもう一度<code>enter</code>をすると、タスクが更新されます。
    </p>
    <p>
      なお、選択状態を解除したくなったり、編集途中で編集をキャンセルしたくなった場合は、<code>esc</code>キーを押してください。
    </p>
    <h2>コマンドについて</h2>
    <p>
      milelaneはツリーを扱うという特性上、GUIでがんばると使うのも作るのもつらい(と思う)ので、コマンド入力周辺に今は力を入れて作っています。<br>
      <code>/</code>から始まるコードを、milelaneでは<strong>コマンド</strong>と呼びます。<br>
      この画面を表示するのに使われた<code>/help</code>コマンドの他には、以下のようなコマンドが実装されています。
    </p>
    <h3>
      <code>/add</code>コマンド
    </h3>
    <p>
      使い方: <code>/add [追加したいタスクのタイトル] under [task id]</code><br>
      説明: タスクのタイトルを決めて、特定のタスクのツリーに追加します。<br>
      凡例: <code>/add まずは実装可能か技術調査する under 515</code>
    </p>
    <h3>
      <code>/move</code>コマンド
    </h3>
    <p>
      使い方 その1: <code>/move [task id] under [task id]</code><br>
      説明: 既に作成してあるタスクを、特定のタスクのツリーの配下に移動します。<br>
      凡例: <code>/move 517 under 515</code>
    </p>
    <p>
      使い方 その2: <code>/move [task id] to root</code><br>
      説明: 既に別のツリーの配下に存在するタスクを、最上位の階層に移動します。<br>
      凡例: <code>/move 516 to root</code>
    </p>
    <h3>
      <code>/lanize</code>コマンド
    </h3>
    <p>
      使い方: <code>/lanize [task id]</code><br>
      説明:<br>
      既に作成してあるタスクを、<code>lane</code>タイプに変更します。<br>
      なお、<strong>現在、この操作は不可逆</strong>です。<br>
      凡例: <code>/lanize 515</code>
    </p>
    <h3>
      <code>/focus</code>コマンド
    </h3>
    <p>
      使い方: <code>/focus on [task id]</code><br>
      説明: 特定のタスク及びその配下のツリーのみ表示します。<br>
      凡例: <code>/focus on 517</code>
    </p>
    <h3>
      <code>/unfocus</code>コマンド
    </h3>
    <p>
      使い方: <code>/unfocus</code><br>
      説明: 特定のタスク配下のツリーのみ表示している状態を解除します。<br>
      凡例: <code>/unfocus</code>
    </p>
    <h3>
      <code>/help</code>コマンド
    </h3>
    <p>
      使い方: <code>/help</code><br>
      説明: 現在表示されいるヘルプモーダルを表示します。<br>
      凡例: <code>/help</code>
    </p>
  </section>
</template>
