<template>
  <div class="list row">
    <div class="col-md-12">
      <div class="mb-3">
        Articles per Page:
        <select v-model="pageSize" @change="pageSizeChange($event)">
          <option v-for="size in pageSizes" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </div>

      <b-pagination
        v-model="page"
        :total-rows="totalItems"
        :per-page="pageSize"
        prev-text="Prev"
        next-text="Next"
        @click="pageChange"
      ></b-pagination>
    </div>

    <div class="col-md-6">
      <h4>Articles List</h4>
      <ul class="list-group" id="aricles-list">
        <li
          class="list-group-item"
          :class="{ active: index == currentArticleIndex }"
          v-for="(article, index) in articles"
          :key="index"
          @click="setActiveArticle(article, index)"
        >
          Title: {{ article.title }}
          <br />
          Summary: {{ article.summary }}
          <br />
          <img v-bind:src="article.imageURL" />
        </li>
      </ul>
    </div>

    <div class="col-md-6">
      <div v-if="currentArticle.articleId">
        <h4>Article Preview</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentArticle.title }}
        </div>
        <div>
          <label><strong>Summary:</strong></label>
          {{ currentArticle.summary }}
        </div>

        <router-link
          :to="'/articles/' + currentArticle.articleId"
          target="_blank"
          >View Article Details</router-link
        >
      </div>
      <div v-else>
        <br />
        <p>Please click on an Article...</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArticleDataService from "@/services/ArticleDataService";
import Article from "@/types/Article";

export default defineComponent({
  name: "articles-list",
  data() {
    return {
      articles: [] as Article[],
      currentArticle: {} as Article,

      page: 1,
      totalItems: 0,
      pageSize: 5,
      pageSizes: [5, 10, 15], // page size options
      currentArticleIndex: -1,
    };
  },
  methods: {
    getRequestParams(page: number, pageSize: number) {
      let params = {
        page: 0,
        size: 0,
      };
      if (page) {
        params["page"] = page;
      }
      if (pageSize) {
        params["size"] = pageSize;
      }
      return params;
    },
    getArticles() {
      console.log("getting articles");
      const params = this.getRequestParams(this.page, this.pageSize);
      console.log(params);
      ArticleDataService.getArticles(params)
        .then((response) => {
          this.articles = response.data.message.data;
          this.totalItems = response.data.message.totalItems;
          console.log(response.data.message);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    pageChange(value) {
      const temp = value.target.innerHTML;
      if (temp == "Next" || temp == "»") {
        this.page = this.page + 1 - 1;
      } else {
        this.page = Number(value.target.innerHTML);
      }
      this.getArticles();
    },

    pageSizeChange(event) {
      this.pageSize = Number(event.target.value);
      this.page = 1;
      this.getArticles();
    },

    setActiveArticle(article: Article, index = -1) {
      this.currentArticle = article;
      this.currentArticleIndex = index;
    },
  },
  mounted() {
    this.getArticles();
  },
});
</script>

<style>
.list {
  text-align: left;
  max-width: 900px;
  margin: auto;
}
</style>
