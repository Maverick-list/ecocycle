import { Article } from '../types';
import { ACADEMY_ARTICLES } from '../data/articlesData';
import { StorageService } from './storageService';

const BOOKMARKS_KEY = 'ecocycle_bookmarked_articles_v2';

export const AcademyService = {
  getAllArticles(): Article[] {
    return ACADEMY_ARTICLES;
  },

  getArticleById(id: string): Article | undefined {
    return ACADEMY_ARTICLES.find(a => a.id === id);
  },

  getRelatedArticles(currentId: string): Article[] {
    const current = this.getArticleById(currentId);
    if (!current || !current.relatedIds) {
      return ACADEMY_ARTICLES.filter(a => a.id !== currentId).slice(0, 2);
    }
    return ACADEMY_ARTICLES.filter(a => current.relatedIds.includes(a.id));
  },

  getBookmarks(): string[] {
    return StorageService.get<string[]>(BOOKMARKS_KEY, []);
  },

  toggleBookmark(id: string): string[] {
    const bookmarks = this.getBookmarks();
    let updated: string[];
    if (bookmarks.includes(id)) {
      updated = bookmarks.filter(bId => bId !== id);
    } else {
      updated = [...bookmarks, id];
    }
    StorageService.set(BOOKMARKS_KEY, updated);
    return updated;
  }
};
