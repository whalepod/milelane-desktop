<template>
  <section class="the-help">
    <aside>
      <button
        :class="{ 'the-help-button-selected': isCurrentPage('aboutMilelane') }"
        @click="setCurrentPage('aboutMilelane')"
      >
        milelaneについて
      </button>
      <button
        :class="{ 'the-help-button-selected': isCurrentPage('aboutTask') }"
        @click="setCurrentPage('aboutTask')"
      >
        タスクについて
      </button>
      <button
        :class="{ 'the-help-button-selected': isCurrentPage('howToUseInput') }"
        @click="setCurrentPage('howToUseInput')"
      >
        milelaneの使い方
      </button>
    </aside>
    <article>
      <help-about-milelane v-if="isCurrentPage('aboutMilelane')" />
      <help-about-task v-else-if="isCurrentPage('aboutTask')" />
      <help-how-to-use-input v-else-if="isCurrentPage('howToUseInput')" />
    </article>
  </section>
</template>
<script>
import HelpAboutMilelane from '@/components/help/HelpAboutMilelane'
import HelpAboutTask from '@/components/help/HelpAboutTask'
import HelpHowToUseInput from '@/components/help/HelpHowToUseInput'

export default {
  components: {
    HelpAboutMilelane,
    HelpAboutTask,
    HelpHowToUseInput
  },
  data () {
    return {
      currentPage: 'aboutMilelane'
    }
  },
  methods: {
    isCurrentPage (page) {
      return this.currentPage === page
    },
    setCurrentPage (page) {
      this.currentPage = page
    }
  }
}
</script>
<style>
.the-help {
  height: calc(100vh - 96px);
  overflow: hidden;
}
@media screen and (min-width: 800px) {
  .the-help {
    display: flex;
    min-width: 800px;
  }
}
@media screen and (max-width: 799px) {
  .the-help {
    width: 100%;
  }
}
@media screen and (min-width: 800px) {
  .the-help > aside {
    flex-shrink: 0;
    width: 208px;
    padding: 36px 24px;
  }
}
@media screen and (max-width: 799px) {
  .the-help > aside {
    padding: 20px 24px ;
    border-bottom: 2px solid #cae3ca;
  }
}
.the-help > aside > button {
  height: 32px;
  font-size: 14px;
}
.the-help-button-selected {
  color: #558783;
}
@media screen and (max-width: 799px) {
  .the-help > aside > button {
    height: 24px;
    display: block;
  }
}
.the-help > aside > button:hover {
  color: #558783;
}
.the-help > article {
  max-height: inherit;
  height: 100%;
  padding: 32px 0;
  overflow: scroll;
}
.the-help > article > section {
  margin-bottom: 32px;
}
/*
  .the-help > article > section > * > code
  inherits from base.css `code` styling.
*/
.the-help > article > section > * > strong {
  display: inline-block;
  font-size: inherit;
  font-weight: bold;
  color: #444;
}
.the-help > article > section > h1 {
  padding: 0 24px;
  font-size: 22px;
  margin-bottom: 20px;
}
.the-help > article > section > h2 {
  display: inline-block;
  padding-bottom: 4px;
  margin: 0 24px;
  font-size: 16px;
  margin-bottom: 20px;
  border-bottom: 2px solid #cae3ca;
}
.the-help > article > section > h3 {
  padding: 0 24px;
  font-size: 16px;
  margin-bottom: 20px;
}
.the-help > article > section > p {
  padding: 0 24px;
  margin-bottom: 28px;
  font-size: 14px;
  line-height: 2;
}
.the-help > article > section > ul {
  padding: 0 24px;
  margin-bottom: 24px;
}
.the-help > article > section > ul > li {
  list-style-type: disc;
  font-size: 14px;
  line-height: 1.8;
}
.the-help > article > section > ul > li > span {
  font-size: 12px;
  color: #777;
}
</style>
