import apiClient from "@/api-client";

/* eslint-disable */
class ArticleDataService {
  getArticles(params: any): Promise<any> {
    return apiClient.get("/articles", { params });
  }

  getArticle(id: string): Promise<any> {
    return apiClient.get(`/articles/${id}`);
  }
}

export default new ArticleDataService();
