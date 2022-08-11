import http from "@/http-common";

/* eslint-disable */
class ArticleDataService {
  getAll(params: any): Promise<any> {
    return http.get("/articles", { params });
  }

  get(id: string): Promise<any> {
    return http.get(`/articles/${id}`);
  }
}

export default new ArticleDataService();
