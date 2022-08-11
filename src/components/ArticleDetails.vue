<template>
  <div class="list row">
    <div class="col-md-6">
      <div v-if="currentArticle.articleId">
        <h4>Article Details</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentArticle.title }}
        </div>
        <div>
          <label><strong>Summary:</strong></label>
          {{ currentArticle.summary }}
        </div>
        <div>
          <label><strong>Body:</strong></label>
          {{ currentArticle.body }}
        </div>
        <div>
          <img v-bind:src="currentArticle.imageURL" />
        </div>
      </div>
      <div v-else>
        <br />
        <p>No article found...</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArticleDataService from "@/services/ArticleDataService";
import Article from "@/types/Article";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "article",
  data() {
    return {
      currentArticle: {} as Article,
      message: "",
    };
  },
  methods: {
    getArticle(id: any) {
      ArticleDataService.get(id)
        .then((response: ResponseData) => {
          this.currentArticle = response.data.message;
          console.log(response.data.message);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getArticle(this.$route.params.id);
  },
});
</script>

<style>
</style>
